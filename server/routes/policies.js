// ============================================================
// Floor — Policies API Routes
// ============================================================
const express = require("express");
const router = express.Router();
const Policy = require("../models/Policy");

const PLAN_CONFIG = {
  basic:    { coverageAmount: 2000, maxPayoutPerEvent: 800,  coverageHoursPerWeek: 20, basePremium: 59 },
  standard: { coverageAmount: 3500, maxPayoutPerEvent: 1200, coverageHoursPerWeek: 30, basePremium: 89 },
  premium:  { coverageAmount: 5000, maxPayoutPerEvent: 1800, coverageHoursPerWeek: 42, basePremium: 129 },
};

// GET all policies
router.get("/", async (req, res) => {
  try {
    const policies = await Policy.find().populate("workerId", "name phone city zone").sort({ createdAt: -1 });
    res.json(policies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET policies for a specific worker
router.get("/worker/:workerId", async (req, res) => {
  try {
    const policies = await Policy.find({ workerId: req.params.workerId });
    res.json(policies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create policy
router.post("/", async (req, res) => {
  try {
    const config = PLAN_CONFIG[req.body.plan] || PLAN_CONFIG.standard;
    const policy = new Policy({
      ...req.body,
      ...config,
      weeklyPremium: req.body.weeklyPremium || config.basePremium,
    });
    await policy.save();
    res.status(201).json(policy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH pause/resume/upgrade
router.patch("/:id", async (req, res) => {
  try {
    const policy = await Policy.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!policy) return res.status(404).json({ error: "Policy not found" });
    res.json(policy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
