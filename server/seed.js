// ============================================================
// Floor — Database Seeder (Phase 3)
// Populates MongoDB with realistic insurtech data + payouts
// ============================================================
require("dotenv").config();
const mongoose = require("mongoose");
const crypto   = require("crypto");
const bcrypt   = require("bcryptjs");
const Worker   = require("./models/Worker");
const Policy   = require("./models/Policy");
const Claim    = require("./models/Claim");
const Payout   = require("./models/Payout");
const User     = require("./models/User");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/floor";

const WORKERS_DATA = [
  { name: "Rajesh Kumar", phone: "+919876543210", email: "rajesh.k@email.com", platform: "zomato", city: "Mumbai", zone: "Andheri", vehicleType: "motorcycle", avgWeeklyEarnings: 5200, avgWeeklyHours: 48, avgDeliveriesPerDay: 22 },
  { name: "Priya Sharma", phone: "+919876543211", email: "priya.s@email.com", platform: "swiggy", city: "Mumbai", zone: "Bandra", vehicleType: "scooter", avgWeeklyEarnings: 4800, avgWeeklyHours: 42, avgDeliveriesPerDay: 18 },
  { name: "Amit Patel", phone: "+919876543212", email: "amit.p@email.com", platform: "zepto", city: "Delhi", zone: "Connaught Place", vehicleType: "ev_scooter", avgWeeklyEarnings: 6100, avgWeeklyHours: 50, avgDeliveriesPerDay: 25 },
  { name: "Sunita Devi", phone: "+919876543213", email: "sunita.d@email.com", platform: "blinkit", city: "Bangalore", zone: "Koramangala", vehicleType: "scooter", avgWeeklyEarnings: 4200, avgWeeklyHours: 38, avgDeliveriesPerDay: 16 },
  { name: "Vikram Singh", phone: "+919876543214", email: "vikram.s@email.com", platform: "zomato", city: "Delhi", zone: "Karol Bagh", vehicleType: "motorcycle", avgWeeklyEarnings: 5800, avgWeeklyHours: 52, avgDeliveriesPerDay: 24 },
  { name: "Meena Kumari", phone: "+919876543215", email: "meena.k@email.com", platform: "swiggy", city: "Chennai", zone: "T. Nagar", vehicleType: "bicycle", avgWeeklyEarnings: 3200, avgWeeklyHours: 35, avgDeliveriesPerDay: 12 },
  { name: "Ravi Verma", phone: "+919876543216", email: "ravi.v@email.com", platform: "dunzo", city: "Hyderabad", zone: "Banjara Hills", vehicleType: "motorcycle", avgWeeklyEarnings: 4600, avgWeeklyHours: 44, avgDeliveriesPerDay: 19 },
  { name: "Anita Gupta", phone: "+919876543217", email: "anita.g@email.com", platform: "zomato", city: "Pune", zone: "Kothrud", vehicleType: "ev_scooter", avgWeeklyEarnings: 3900, avgWeeklyHours: 36, avgDeliveriesPerDay: 15 },
];

const PLAN_CONFIG = {
  basic:    { coverageAmount: 2000, maxPayoutPerEvent: 800,  coverageHoursPerWeek: 20, basePremium: 59 },
  standard: { coverageAmount: 3500, maxPayoutPerEvent: 1200, coverageHoursPerWeek: 30, basePremium: 89 },
  premium:  { coverageAmount: 5000, maxPayoutPerEvent: 1800, coverageHoursPerWeek: 42, basePremium: 129 },
};

const DEFAULT_TRIGGERS = {
  basic: [
    { name: "Heavy Rainfall", type: "weather", threshold: "> 64 mm/hr", isActive: true },
    { name: "Extreme Heat", type: "weather", threshold: "> 45°C", isActive: true },
  ],
  standard: [
    { name: "Heavy Rainfall", type: "weather", threshold: "> 64 mm/hr", isActive: true },
    { name: "Extreme Heat", type: "weather", threshold: "> 45°C", isActive: true },
    { name: "Hazardous AQI", type: "environmental", threshold: "> 400 AQI", isActive: true },
    { name: "Urban Flooding", type: "environmental", threshold: "> 30cm water", isActive: true },
  ],
  premium: [
    { name: "Heavy Rainfall", type: "weather", threshold: "> 64 mm/hr", isActive: true },
    { name: "Extreme Heat", type: "weather", threshold: "> 45°C", isActive: true },
    { name: "Hazardous AQI", type: "environmental", threshold: "> 400 AQI", isActive: true },
    { name: "Urban Flooding", type: "environmental", threshold: "> 30cm water", isActive: true },
    { name: "Platform Outage", type: "platform", threshold: "> 2hr downtime", isActive: true },
  ],
};

const DISRUPTION_EVENTS = [
  { type: "weather", event: "Heavy Rainfall — 78mm/hr", condition: "Heavy Rain" },
  { type: "weather", event: "Extreme Heat Wave — 47°C", condition: "Extreme Heat" },
  { type: "environmental", event: "Severe Air Pollution — AQI 485", condition: "Severe Pollution" },
  { type: "weather", event: "Cyclone Michhong — 95km/h winds", condition: "Cyclone" },
  { type: "platform", event: "Zomato Server Outage — 3.5 hours", condition: "Platform Outage" },
];

function randomId(prefix, len = 14) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const suffix = Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${prefix}_${suffix}`;
}

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Worker.deleteMany({});
    await Policy.deleteMany({});
    await Claim.deleteMany({});
    await Payout.deleteMany({});
    await User.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create workers with risk scoring
    const workers = [];
    for (const data of WORKERS_DATA) {
      const cityRisk = { Mumbai: 30, Delhi: 25, Bangalore: 10, Chennai: 15, Hyderabad: 12, Pune: 10 };
      const vehicleRisk = { bicycle: 20, motorcycle: 10, scooter: 10, ev_scooter: 5 };
      const hoursRisk = data.avgWeeklyHours > 45 ? 15 : data.avgWeeklyHours > 35 ? 10 : 5;
      const riskScore = Math.min(100, (cityRisk[data.city] || 10) + (vehicleRisk[data.vehicleType] || 10) + hoursRisk);
      const riskLevel = riskScore < 30 ? "low" : riskScore < 50 ? "medium" : riskScore < 70 ? "high" : "very_high";

      const worker = new Worker({ ...data, riskScore, riskLevel });
      await worker.save();
      workers.push(worker);
    }
    console.log(`👷 Created ${workers.length} workers`);

    // Create policies
    const plans = ["premium", "standard", "premium", "basic", "premium", "standard", "standard", "basic"];
    const policies = [];
    for (let i = 0; i < workers.length; i++) {
      const plan = plans[i];
      const config = PLAN_CONFIG[plan];
      const riskMultiplier = 1 + (workers[i].riskScore / 200);
      const weeklyPremium = Math.round(config.basePremium * riskMultiplier);

      const startDate = new Date();
      startDate.setDate(startDate.getDate() - Math.floor(Math.random() * 21));
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 7);

      const policy = new Policy({
        workerId: workers[i]._id,
        workerName: workers[i].name,
        plan,
        platform: workers[i].platform,
        weeklyPremium,
        ...config,
        triggers: DEFAULT_TRIGGERS[plan],
        startDate,
        endDate,
        status: "active",
      });
      await policy.save();
      policies.push(policy);
    }
    console.log(`📋 Created ${policies.length} policies`);

    // Create historical claims
    const claims = [];
    const statuses = ["paid", "paid", "auto_approved", "paid", "under_review"];
    for (let i = 0; i < 5; i++) {
      const worker = workers[i];
      const policy = policies[i];
      const disruption = DISRUPTION_EVENTS[i];
      const lostHours = Math.floor(3 + Math.random() * 5);
      const hourlyRate = worker.avgWeeklyEarnings / worker.avgWeeklyHours;
      const amount = Math.min(Math.round(lostHours * hourlyRate), policy.maxPayoutPerEvent);
      const fraudScore = Math.floor(Math.random() * 18);

      const eventDate = new Date();
      eventDate.setDate(eventDate.getDate() - Math.floor(1 + Math.random() * 6));

      const claim = new Claim({
        workerId: worker._id,
        policyId: policy._id,
        workerName: worker.name,
        type: disruption.type,
        disruptionEvent: disruption.event,
        description: `${disruption.event}. ${worker.zone}, ${worker.city} area affected. Deliveries halted for ${lostHours} hours.`,
        amount,
        lostHours,
        status: statuses[i],
        location: { city: worker.city, zone: worker.zone },
        autoTriggered: true,
        fraudScore,
        fraudFlags: fraudScore > 10 ? ["Slightly elevated claim frequency"] : [],
        evidenceData: {
          weatherData: {
            temperature: 30 + Math.floor(Math.random() * 18),
            rainfall: disruption.type === "weather" ? 60 + Math.floor(Math.random() * 50) : 0,
            windSpeed: 10 + Math.floor(Math.random() * 20),
            humidity: 60 + Math.floor(Math.random() * 35),
            condition: disruption.condition,
            source: "OpenWeatherMap",
          },
          locationVerification: { verified: true, distance: +(Math.random() * 0.5).toFixed(2) },
        },
        eventDate,
        processedDate: statuses[i] !== "under_review" ? new Date() : undefined,
        paidDate: statuses[i] === "paid" ? new Date() : undefined,
      });
      await claim.save();
      claims.push(claim);
    }
    console.log(`⚡ Created ${claims.length} claims`);

    // Phase 3: Create seeded payouts for all "paid" claims
    const payouts = [];
    for (const claim of claims) {
      if (claim.status !== "paid") continue;
      const worker = workers.find(w => w._id.equals(claim.workerId));
      if (!worker) continue;

      const orderId   = randomId("order");
      const paymentId = randomId("pay");
      const secret    = "floor_razorpay_test_secret_key";
      const signature = crypto.createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
      const processingMs = 800 + Math.floor(Math.random() * 1700);
      const upiSuffixes  = { zomato: "zomato", swiggy: "oksbi", zepto: "paytm", blinkit: "ybl", dunzo: "apl" };
      const upiId = `${worker.phone.replace(/\D/g, "").slice(-10)}@${upiSuffixes[worker.platform] || "upi"}`;

      const payout = new Payout({
        claimId:          claim._id,
        workerId:         worker._id,
        policyId:         claim.policyId,
        workerName:       worker.name,
        amount:           claim.amount,
        method:           "upi",
        status:           "success",
        gatewayOrderId:   orderId,
        gatewayPaymentId: paymentId,
        gatewaySignature: signature,
        upiId,
        processingMs,
        processedAt:      claim.paidDate || new Date(),
        settledAt:        claim.paidDate || new Date(),
        disruptionEvent:  claim.disruptionEvent,
        city:             claim.location?.city || worker.city,
      });
      await payout.save();
      payouts.push(payout);
    }
    console.log(`💳 Created ${payouts.length} UPI payouts`);

    // Create demo user accounts (password: floor123) for all seeded workers
    const DEMO_PASSWORD = "floor123";
    const passwordHash  = await bcrypt.hash(DEMO_PASSWORD, 12);
    let userCount = 0;
    for (const worker of workers) {
      await new User({
        email:        worker.email,
        passwordHash,
        name:         worker.name,
        workerId:     worker._id,
        role:         "worker",
      }).save();
      userCount++;
    }
    console.log(`🔐 Created ${userCount} user accounts (password: ${DEMO_PASSWORD})`);

    console.log("\n🚀 Seed complete! Floor database is ready.");
    console.log(`   Workers:  ${workers.length}`);
    console.log(`   Policies: ${policies.length}`);
    console.log(`   Claims:   ${claims.length}`);
    console.log(`   Payouts:  ${payouts.length}`);
    console.log(`   Users:    ${userCount} (password: ${DEMO_PASSWORD})`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

seed();
