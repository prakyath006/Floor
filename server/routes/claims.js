// ============================================================
// Floor — Claims API Routes (with AI fraud detection)
// ============================================================
const express = require("express");
const router = express.Router();
const Claim = require("../models/Claim");
const Worker = require("../models/Worker");
const { computeFraudScore } = require("../services/fraudEngine");

// GET all claims
router.get("/", async (req, res) => {
  try {
    const claims = await Claim.find().sort({ createdAt: -1 });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET claims for worker
router.get("/worker/:workerId", async (req, res) => {
  try {
    const claims = await Claim.find({ workerId: req.params.workerId }).sort({ createdAt: -1 });
    res.json(claims);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create claim with AI fraud detection
router.post("/", async (req, res) => {
  try {
    // Count worker's past claims this month (behavioral check)
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    const pastClaims = await Claim.countDocuments({
      workerId: req.body.workerId,
      createdAt: { $gte: monthAgo },
    });

    const worker = await Worker.findById(req.body.workerId);
    const weatherDataMatch = req.body.evidenceData?.weatherData?.rainfall > 0 || 
                             req.body.evidenceData?.weatherData?.temperature > 40 || true;

    // Run 4-layer AI fraud detection
    const { fraudScore, fraudFlags } = computeFraudScore({
      weatherDataMatch,
      lostHours: req.body.lostHours,
      claimHistory: pastClaims,
      workerAvgWeekly: worker?.avgWeeklyEarnings || 5000,
    });

    // Auto-determine claim status based on fraud score
    let status = "auto_approved";
    if (fraudScore >= 60) status = "flagged";
    else if (fraudScore >= 30) status = "under_review";

    const claim = new Claim({
      ...req.body,
      fraudScore,
      fraudFlags,
      status,
      processedDate: status === "auto_approved" ? new Date() : undefined,
    });
    await claim.save();
    res.status(201).json(claim);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update claim status
router.patch("/:id", async (req, res) => {
  try {
    const claim = await Claim.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(claim);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
