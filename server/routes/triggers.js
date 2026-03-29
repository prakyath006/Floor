// ============================================================
// Floor — Parametric Triggers API Routes
// ============================================================
const express = require("express");
const router = express.Router();
const Worker = require("../models/Worker");
const Policy = require("../models/Policy");
const Claim = require("../models/Claim");
const { getWeatherData, getAQIData, checkTriggers } = require("../services/weatherService");
const { computeFraudScore } = require("../services/fraudEngine");

// GET live weather data for a city
router.get("/weather/:city", async (req, res) => {
  try {
    const weather = await getWeatherData(req.params.city);
    const aqi = await getAQIData(req.params.city);
    const triggeredEvents = checkTriggers(weather, aqi);
    res.json({ weather, aqi, triggeredEvents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST simulate a parametric trigger — auto-generates claims for all affected workers
router.post("/simulate", async (req, res) => {
  try {
    const { city, triggerType, triggerName, severity = "high" } = req.body;

    // 1. Find all active policies for workers in this city
    const workers = await Worker.find({ city });
    if (!workers.length) {
      return res.json({ message: `No workers found in ${city}`, claims: [] });
    }

    const workerIds = workers.map((w) => w._id);
    const activePolicies = await Policy.find({ workerId: { $in: workerIds }, status: "active" });

    const generatedClaims = [];
    const lostHoursMap = { high: 6, medium: 3, low: 1.5 };
    const lostHours = lostHoursMap[severity] || 4;

    // 2. Auto-generate a claim per active policy
    for (const policy of activePolicies) {
      const worker = workers.find((w) => w._id.equals(policy.workerId));
      if (!worker) continue;

      const hourlyRate = worker.avgWeeklyEarnings / worker.avgWeeklyHours;
      const rawAmount = lostHours * hourlyRate;
      const amount = Math.min(Math.round(rawAmount), policy.maxPayoutPerEvent || 1500);

      // 3. Run fraud detection (auto-triggered claims start low-risk)
      const { fraudScore, fraudFlags } = computeFraudScore({
        weatherDataMatch: true,  // API-confirmed event
        lostHours,
        claimHistory: 1,         // auto-triggers treated as legitimate
        workerAvgWeekly: worker.avgWeeklyEarnings,
      });

      const status = fraudScore < 30 ? "auto_approved" : "under_review";

      const claim = new Claim({
        workerId: worker._id,
        policyId: policy._id,
        workerName: worker.name,
        type: triggerType || "weather",
        disruptionEvent: triggerName || "Parametric Trigger",
        description: `Auto-triggered by ${triggerName} in ${city}. Severity: ${severity}.`,
        amount,
        lostHours,
        location: { city: worker.city, zone: worker.zone },
        autoTriggered: true,
        fraudScore,
        fraudFlags,
        status,
        processedDate: status === "auto_approved" ? new Date() : undefined,
      });

      await claim.save();
      generatedClaims.push(claim);
    }

    res.json({
      message: `✅ Trigger fired: ${triggerName} in ${city}. ${generatedClaims.length} zero-touch claims generated.`,
      triggeredWorkers: workers.length,
      activePolicies: activePolicies.length,
      claims: generatedClaims,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
