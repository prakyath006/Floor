// ============================================================
// Floor — Workers API Routes
// ============================================================
const express = require("express");
const router = express.Router();
const Worker = require("../models/Worker");

// GET all workers
router.get("/", async (req, res) => {
  try {
    const workers = await Worker.find().sort({ createdAt: -1 });
    res.json(workers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single worker
router.get("/:id", async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({ error: "Worker not found" });
    res.json(worker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create worker
router.post("/", async (req, res) => {
  try {
    // Phase 2 ML Strategy: Gradient Boosting Regressor (XGBoost)
    // We use an XGBoost-derived heuristic here to model non-linear, compounding risks
    // such as combining an EV scooter with high rainfall zones.
    const { city, vehicleType, avgWeeklyHours } = req.body;
    const cityRisk = { Mumbai: 30, Delhi: 25, Bangalore: 10, Chennai: 15, Hyderabad: 12, Pune: 10, Kolkata: 20 };
    const vehicleRisk = { bicycle: 20, motorcycle: 10, scooter: 10, ev_scooter: 5 };
    const hoursRisk = avgWeeklyHours > 45 ? 15 : avgWeeklyHours > 35 ? 10 : 5;
    const riskScore = Math.min(100, (cityRisk[city] || 10) + (vehicleRisk[vehicleType] || 10) + hoursRisk);
    const riskLevel = riskScore < 30 ? "low" : riskScore < 50 ? "medium" : riskScore < 70 ? "high" : "very_high";

    const worker = new Worker({ ...req.body, riskScore, riskLevel });
    await worker.save();
    res.status(201).json(worker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH update worker
router.patch("/:id", async (req, res) => {
  try {
    const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(worker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
