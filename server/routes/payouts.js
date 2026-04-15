// ============================================================
// Floor — Payout API Routes (Razorpay Sandbox)
// Phase 3: Instant UPI payout simulation
// ============================================================
const express = require("express");
const router  = express.Router();
const Payout  = require("../models/Payout");
const Claim   = require("../models/Claim");
const Worker  = require("../models/Worker");
const Policy  = require("../models/Policy");
const { initiateUPIPayout, verifyPayoutSignature, deriveUPIId } = require("../services/payoutService");

// GET — list all payouts (admin view)
router.get("/", async (req, res) => {
  try {
    const payouts = await Payout.find().sort({ createdAt: -1 }).limit(50);
    res.json(payouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET — payouts for a specific worker
router.get("/worker/:workerId", async (req, res) => {
  try {
    const payouts = await Payout.find({ workerId: req.params.workerId }).sort({ createdAt: -1 });
    res.json(payouts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST — initiate instant payout for an approved claim
// This simulates calling Razorpay's Payout API
router.post("/initiate", async (req, res) => {
  try {
    const { claimId } = req.body;

    // 1. Fetch claim
    const claim = await Claim.findById(claimId);
    if (!claim) return res.status(404).json({ error: "Claim not found" });
    if (!["auto_approved", "approved"].includes(claim.status)) {
      return res.status(400).json({ error: `Cannot payout claim with status: ${claim.status}` });
    }

    // 2. Fetch worker for UPI details
    const worker = await Worker.findById(claim.workerId);
    if (!worker) return res.status(404).json({ error: "Worker not found" });

    // 3. Derive UPI ID from phone (or use provided)
    const upiId = req.body.upiId || deriveUPIId(worker.phone, worker.platform);

    // 4. Create payout record in DB (status: initiated)
    const payoutRecord = new Payout({
      claimId:         claim._id,
      workerId:        worker._id,
      policyId:        claim.policyId,
      workerName:      worker.name,
      amount:          claim.amount,
      method:          "upi",
      status:          "initiated",
      upiId,
      disruptionEvent: claim.disruptionEvent,
      city:            claim.location?.city || worker.city,
    });
    await payoutRecord.save();

    // 5. Mark claim as "processing"
    await Claim.findByIdAndUpdate(claimId, { status: "under_review" });

    // 6. Simulate Razorpay UPI payout (async — takes ~1-2.5s)
    const gatewayResult = await initiateUPIPayout({
      amount:  claim.amount,
      upiId,
      name:    worker.name,
      purpose: `floor_claim_${claimId}`,
    });

    // 7. Update payout record with gateway response
    const finalStatus = gatewayResult.success ? "success" : "failed";
    await Payout.findByIdAndUpdate(payoutRecord._id, {
      status:           finalStatus,
      gatewayOrderId:   gatewayResult.gatewayOrderId,
      gatewayPaymentId: gatewayResult.gatewayPaymentId,
      gatewaySignature: gatewayResult.gatewaySignature,
      processingMs:     gatewayResult.processingMs,
      processedAt:      gatewayResult.processedAt,
      settledAt:        gatewayResult.success ? new Date() : null,
    });

    // 8. Update claim status to "paid" if successful
    if (gatewayResult.success) {
      await Claim.findByIdAndUpdate(claimId, {
        status:    "paid",
        paidDate:  new Date(),
      });
    } else {
      await Claim.findByIdAndUpdate(claimId, { status: "auto_approved" }); // revert
    }

    res.json({
      payout: await Payout.findById(payoutRecord._id),
      gateway: gatewayResult.gatewayResponse,
      success: gatewayResult.success,
      message: gatewayResult.success
        ? `✅ ₹${claim.amount} paid to ${upiId} in ${gatewayResult.processingMs}ms via Razorpay UPI`
        : `❌ Payout failed: ${gatewayResult.gatewayResponse?.error_description}`,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST — verify payout signature (Razorpay webhook simulation)
router.post("/verify", async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  const valid = verifyPayoutSignature(orderId, paymentId, signature);
  res.json({
    valid,
    message: valid ? "Signature verified — payout authentic" : "Signature mismatch — potential tampering",
  });
});

// GET — payout analytics (admin)
router.get("/analytics", async (req, res) => {
  try {
    const [total, success, failed, totalAmountResult] = await Promise.all([
      Payout.countDocuments(),
      Payout.countDocuments({ status: "success" }),
      Payout.countDocuments({ status: "failed" }),
      Payout.aggregate([{ $group: { _id: null, sum: { $sum: "$amount" }, avgMs: { $avg: "$processingMs" } } }]),
    ]);
    const totalAmount = totalAmountResult[0]?.sum || 0;
    const avgProcessingMs = totalAmountResult[0]?.avgMs || 0;
    res.json({
      total, success, failed,
      successRate: total > 0 ? ((success / total) * 100).toFixed(1) : 0,
      totalAmountPaid: totalAmount,
      avgProcessingMs: Math.round(avgProcessingMs),
      avgProcessingSeconds: (avgProcessingMs / 1000).toFixed(2),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
