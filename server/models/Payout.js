const mongoose = require("mongoose");

const payoutSchema = new mongoose.Schema({
  claimId:     { type: mongoose.Schema.Types.ObjectId, ref: "Claim", required: true },
  workerId:    { type: mongoose.Schema.Types.ObjectId, ref: "Worker", required: true },
  policyId:    { type: mongoose.Schema.Types.ObjectId, ref: "Policy" },
  workerName:  String,
  amount:      { type: Number, required: true },
  method:      { type: String, enum: ["upi", "razorpay", "bank_transfer", "wallet"], default: "upi" },
  status:      { type: String, enum: ["initiated", "processing", "success", "failed", "reversed"], default: "initiated" },
  // Razorpay sandbox fields
  gatewayOrderId:   String,
  gatewayPaymentId: String,
  gatewaySignature: String,
  upiId:            String,
  // Timing
  initiatedAt:  { type: Date, default: Date.now },
  processedAt:  Date,
  settledAt:    Date,
  processingMs: Number,  // how fast the payout was (our "instant" claim)
  // Metadata
  disruptionEvent: String,
  city:            String,
  notes:           String,
}, { timestamps: true });

module.exports = mongoose.model("Payout", payoutSchema);
