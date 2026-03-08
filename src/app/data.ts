// ==========================================
// GigShield - Mock Data & AI Simulation
// ==========================================

import {
  Worker,
  Policy,
  Claim,
  WeatherAlert,
  DashboardMetrics,
  RiskProfile,
  PremiumCalculation,
  DisruptionTrigger,
} from "./types";

// ==========================================
// DISRUPTION TRIGGERS
// ==========================================

export const defaultTriggers: DisruptionTrigger[] = [
  {
    id: "t1",
    type: "weather",
    name: "Heavy Rainfall",
    description: "Rainfall exceeds 64mm/hr — deliveries halted",
    threshold: ">64mm/hr",
    isActive: true,
    lastTriggered: "2026-03-18T14:30:00",
  },
  {
    id: "t2",
    type: "weather",
    name: "Extreme Heat",
    description: "Temperature exceeds 45°C — outdoor work unsafe",
    threshold: ">45°C",
    isActive: true,
  },
  {
    id: "t3",
    type: "weather",
    name: "Cyclone / Storm",
    description: "Wind speed exceeds 62 km/h — movement restricted",
    threshold: ">62 km/h winds",
    isActive: true,
  },
  {
    id: "t4",
    type: "environmental",
    name: "Severe Pollution (AQI)",
    description: "AQI exceeds 400 — hazardous outdoor conditions",
    threshold: "AQI > 400",
    isActive: true,
    lastTriggered: "2026-03-15T08:00:00",
  },
  {
    id: "t5",
    type: "social",
    name: "Unplanned Curfew / Strike",
    description: "Local curfew or bandh restricting movement",
    threshold: "Official advisory issued",
    isActive: true,
  },
  {
    id: "t6",
    type: "environmental",
    name: "Flooding / Waterlogging",
    description: "Water level exceeds 30cm on roads",
    threshold: ">30cm waterlogging",
    isActive: true,
    lastTriggered: "2026-03-12T16:00:00",
  },
  {
    id: "t7",
    type: "platform",
    name: "Platform Outage",
    description: "Partner app downtime exceeding 2 hours",
    threshold: ">2hr downtime",
    isActive: false,
  },
];

// ==========================================
// MOCK WORKERS
// ==========================================

export const mockWorkers: Worker[] = [
  {
    id: "W001",
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    email: "rajesh.k@email.com",
    platform: "zomato",
    city: "Mumbai",
    zone: "Andheri West",
    vehicleType: "motorcycle",
    avgWeeklyEarnings: 5200,
    avgWeeklyHours: 48,
    avgDeliveriesPerDay: 22,
    registrationDate: "2026-01-15",
    riskScore: 35,
    riskLevel: "low",
  },
  {
    id: "W002",
    name: "Priya Sharma",
    phone: "+91 87654 32109",
    email: "priya.s@email.com",
    platform: "swiggy",
    city: "Delhi",
    zone: "Connaught Place",
    vehicleType: "scooter",
    avgWeeklyEarnings: 4800,
    avgWeeklyHours: 42,
    avgDeliveriesPerDay: 18,
    registrationDate: "2026-02-01",
    riskScore: 52,
    riskLevel: "medium",
  },
  {
    id: "W003",
    name: "Amit Singh",
    phone: "+91 76543 21098",
    email: "amit.singh@email.com",
    platform: "zepto",
    city: "Bangalore",
    zone: "Koramangala",
    vehicleType: "ev_scooter",
    avgWeeklyEarnings: 6100,
    avgWeeklyHours: 52,
    avgDeliveriesPerDay: 28,
    registrationDate: "2025-11-20",
    riskScore: 28,
    riskLevel: "low",
  },
  {
    id: "W004",
    name: "Deepak Yadav",
    phone: "+91 65432 10987",
    email: "deepak.y@email.com",
    platform: "zomato",
    city: "Chennai",
    zone: "T. Nagar",
    vehicleType: "motorcycle",
    avgWeeklyEarnings: 4500,
    avgWeeklyHours: 40,
    avgDeliveriesPerDay: 20,
    registrationDate: "2026-03-01",
    riskScore: 68,
    riskLevel: "high",
  },
  {
    id: "W005",
    name: "Sunita Devi",
    phone: "+91 54321 09876",
    email: "sunita.d@email.com",
    platform: "swiggy",
    city: "Mumbai",
    zone: "Bandra",
    vehicleType: "scooter",
    avgWeeklyEarnings: 5500,
    avgWeeklyHours: 45,
    avgDeliveriesPerDay: 24,
    registrationDate: "2025-12-10",
    riskScore: 42,
    riskLevel: "medium",
  },
  {
    id: "W006",
    name: "Mohammed Rafi",
    phone: "+91 43210 98765",
    email: "rafi.m@email.com",
    platform: "blinkit",
    city: "Hyderabad",
    zone: "Jubilee Hills",
    vehicleType: "motorcycle",
    avgWeeklyEarnings: 5800,
    avgWeeklyHours: 50,
    avgDeliveriesPerDay: 26,
    registrationDate: "2026-01-28",
    riskScore: 45,
    riskLevel: "medium",
  },
  {
    id: "W007",
    name: "Vikram Patel",
    phone: "+91 32109 87654",
    email: "vikram.p@email.com",
    platform: "dunzo",
    city: "Pune",
    zone: "Kothrud",
    vehicleType: "bicycle",
    avgWeeklyEarnings: 3200,
    avgWeeklyHours: 35,
    avgDeliveriesPerDay: 14,
    registrationDate: "2026-02-14",
    riskScore: 58,
    riskLevel: "medium",
  },
  {
    id: "W008",
    name: "Ananya Reddy",
    phone: "+91 21098 76543",
    email: "ananya.r@email.com",
    platform: "zomato",
    city: "Delhi",
    zone: "Dwarka",
    vehicleType: "ev_scooter",
    avgWeeklyEarnings: 4900,
    avgWeeklyHours: 44,
    avgDeliveriesPerDay: 21,
    registrationDate: "2025-10-05",
    riskScore: 72,
    riskLevel: "high",
  },
];

// ==========================================
// MOCK POLICIES
// ==========================================

export const mockPolicies: Policy[] = [
  {
    id: "POL-2026-001",
    workerId: "W001",
    workerName: "Rajesh Kumar",
    platform: "zomato",
    plan: "standard",
    weeklyPremium: 89,
    coverageAmount: 3500,
    coverageHoursPerWeek: 30,
    maxPayoutPerEvent: 1200,
    status: "active",
    startDate: "2026-03-10",
    endDate: "2026-03-17",
    autoRenew: true,
    triggers: defaultTriggers.filter((t) => t.isActive),
    riskScore: 35,
  },
  {
    id: "POL-2026-002",
    workerId: "W002",
    workerName: "Priya Sharma",
    platform: "swiggy",
    plan: "premium",
    weeklyPremium: 129,
    coverageAmount: 5000,
    coverageHoursPerWeek: 42,
    maxPayoutPerEvent: 1800,
    status: "active",
    startDate: "2026-03-10",
    endDate: "2026-03-17",
    autoRenew: true,
    triggers: defaultTriggers,
    riskScore: 52,
  },
  {
    id: "POL-2026-003",
    workerId: "W003",
    workerName: "Amit Singh",
    platform: "zepto",
    plan: "basic",
    weeklyPremium: 49,
    coverageAmount: 2000,
    coverageHoursPerWeek: 20,
    maxPayoutPerEvent: 800,
    status: "active",
    startDate: "2026-03-10",
    endDate: "2026-03-17",
    autoRenew: false,
    triggers: defaultTriggers.filter((t) => t.type === "weather"),
    riskScore: 28,
  },
  {
    id: "POL-2026-004",
    workerId: "W004",
    workerName: "Deepak Yadav",
    platform: "zomato",
    plan: "premium",
    weeklyPremium: 149,
    coverageAmount: 5000,
    coverageHoursPerWeek: 40,
    maxPayoutPerEvent: 1800,
    status: "active",
    startDate: "2026-03-10",
    endDate: "2026-03-17",
    autoRenew: true,
    triggers: defaultTriggers,
    riskScore: 68,
  },
  {
    id: "POL-2026-005",
    workerId: "W005",
    workerName: "Sunita Devi",
    platform: "swiggy",
    plan: "standard",
    weeklyPremium: 99,
    coverageAmount: 3500,
    coverageHoursPerWeek: 30,
    maxPayoutPerEvent: 1200,
    status: "expired",
    startDate: "2026-03-03",
    endDate: "2026-03-10",
    autoRenew: false,
    triggers: defaultTriggers.filter((t) => t.isActive),
    riskScore: 42,
  },
  {
    id: "POL-2026-006",
    workerId: "W006",
    workerName: "Mohammed Rafi",
    platform: "blinkit",
    plan: "standard",
    weeklyPremium: 95,
    coverageAmount: 3500,
    coverageHoursPerWeek: 35,
    maxPayoutPerEvent: 1200,
    status: "active",
    startDate: "2026-03-10",
    endDate: "2026-03-17",
    autoRenew: true,
    triggers: defaultTriggers.filter((t) => t.isActive),
    riskScore: 45,
  },
];

// ==========================================
// MOCK CLAIMS
// ==========================================

export const mockClaims: Claim[] = [
  {
    id: "CLM-2026-001",
    policyId: "POL-2026-001",
    workerId: "W001",
    workerName: "Rajesh Kumar",
    type: "weather",
    disruptionEvent: "Heavy Rainfall — Mumbai",
    description:
      "Severe rainfall (78mm/hr) in Andheri West area. Roads waterlogged, deliveries halted for 6 hours.",
    status: "paid",
    amount: 850,
    lostHours: 6,
    eventDate: "2026-03-18",
    filedDate: "2026-03-18",
    processedDate: "2026-03-18",
    paidDate: "2026-03-18",
    location: { lat: 19.1364, lng: 72.8296, area: "Andheri West, Mumbai" },
    evidenceData: {
      weatherData: {
        temperature: 26,
        humidity: 95,
        rainfall: 78,
        windSpeed: 35,
        condition: "Heavy Rain",
        source: "OpenWeatherMap API",
      },
      locationVerification: {
        verified: true,
        workerLocation: { lat: 19.1364, lng: 72.8296 },
        claimLocation: { lat: 19.1364, lng: 72.8296 },
        distance: 0.2,
      },
    },
    fraudScore: 8,
    fraudFlags: [],
    autoTriggered: true,
  },
  {
    id: "CLM-2026-002",
    policyId: "POL-2026-002",
    workerId: "W002",
    workerName: "Priya Sharma",
    type: "environmental",
    disruptionEvent: "Severe Air Pollution — Delhi",
    description:
      "AQI reached 485 in Connaught Place area. Hazardous air quality advisory issued. Outdoor work suspended.",
    status: "auto_approved",
    amount: 1100,
    lostHours: 8,
    eventDate: "2026-03-15",
    filedDate: "2026-03-15",
    processedDate: "2026-03-15",
    location: { lat: 28.6315, lng: 77.2167, area: "Connaught Place, Delhi" },
    evidenceData: {
      aqiData: {
        aqi: 485,
        pm25: 312,
        pm10: 478,
        source: "CPCB AQI API",
      },
      locationVerification: {
        verified: true,
        workerLocation: { lat: 28.6322, lng: 77.218 },
        claimLocation: { lat: 28.6315, lng: 77.2167 },
        distance: 0.15,
      },
    },
    fraudScore: 5,
    fraudFlags: [],
    autoTriggered: true,
  },
  {
    id: "CLM-2026-003",
    policyId: "POL-2026-004",
    workerId: "W004",
    workerName: "Deepak Yadav",
    type: "weather",
    disruptionEvent: "Extreme Heat Wave — Chennai",
    description:
      "Temperature reached 47°C in T. Nagar. IMD issued red alert. Outdoor work deemed unsafe.",
    status: "approved",
    amount: 950,
    lostHours: 7,
    eventDate: "2026-03-16",
    filedDate: "2026-03-16",
    processedDate: "2026-03-17",
    location: { lat: 13.0418, lng: 80.2341, area: "T. Nagar, Chennai" },
    evidenceData: {
      weatherData: {
        temperature: 47,
        humidity: 45,
        rainfall: 0,
        windSpeed: 12,
        condition: "Extreme Heat",
        source: "IMD Weather API",
      },
      locationVerification: {
        verified: true,
        workerLocation: { lat: 13.042, lng: 80.234 },
        claimLocation: { lat: 13.0418, lng: 80.2341 },
        distance: 0.03,
      },
    },
    fraudScore: 12,
    fraudFlags: [],
    autoTriggered: false,
  },
  {
    id: "CLM-2026-004",
    policyId: "POL-2026-006",
    workerId: "W006",
    workerName: "Mohammed Rafi",
    type: "social",
    disruptionEvent: "Unplanned Bandh — Hyderabad",
    description:
      "Sudden market closure and transport strike in Jubilee Hills. All deliveries canceled for the day.",
    status: "under_review",
    amount: 1350,
    lostHours: 10,
    eventDate: "2026-03-17",
    filedDate: "2026-03-17",
    location: {
      lat: 17.4318,
      lng: 78.4071,
      area: "Jubilee Hills, Hyderabad",
    },
    evidenceData: {
      locationVerification: {
        verified: true,
        workerLocation: { lat: 17.432, lng: 78.407 },
        claimLocation: { lat: 17.4318, lng: 78.4071 },
        distance: 0.05,
      },
      platformData: {
        ordersAvailable: false,
        platformStatus: "suspended_in_zone",
        averageOrders: 180,
        currentOrders: 0,
      },
    },
    fraudScore: 22,
    fraudFlags: ["high_payout_amount"],
    autoTriggered: false,
  },
  {
    id: "CLM-2026-005",
    policyId: "POL-2026-002",
    workerId: "W002",
    workerName: "Priya Sharma",
    type: "weather",
    disruptionEvent: "Suspected Fraudulent Claim",
    description:
      "Claimed heavy rain disruption but weather data shows clear skies. GPS location mismatch detected.",
    status: "flagged",
    amount: 1500,
    lostHours: 10,
    eventDate: "2026-03-14",
    filedDate: "2026-03-14",
    location: { lat: 28.6315, lng: 77.2167, area: "Connaught Place, Delhi" },
    evidenceData: {
      weatherData: {
        temperature: 32,
        humidity: 40,
        rainfall: 0,
        windSpeed: 8,
        condition: "Clear Sky",
        source: "OpenWeatherMap API",
      },
      locationVerification: {
        verified: false,
        workerLocation: { lat: 28.7041, lng: 77.1025 },
        claimLocation: { lat: 28.6315, lng: 77.2167 },
        distance: 14.2,
      },
    },
    fraudScore: 92,
    fraudFlags: [
      "weather_data_mismatch",
      "gps_location_mismatch",
      "high_claim_frequency",
    ],
    autoTriggered: false,
  },
];

// ==========================================
// MOCK WEATHER ALERTS
// ==========================================

export const mockAlerts: WeatherAlert[] = [
  {
    id: "ALT-001",
    type: "rain",
    severity: "high",
    city: "Mumbai",
    zone: "Western Suburbs",
    message:
      "Heavy rainfall warning. Expected 70-90mm/hr. Roads may waterlog. Delivery disruptions likely in Andheri, Bandra, Goregaon.",
    startTime: "2026-03-19T14:00:00",
    endTime: "2026-03-19T22:00:00",
    affectedWorkers: 342,
    autoClaimsTriggered: 28,
    isActive: true,
  },
  {
    id: "ALT-002",
    type: "pollution",
    severity: "extreme",
    city: "Delhi",
    zone: "Central Delhi",
    message:
      "AQI forecast to exceed 450. GRAP Stage IV restrictions likely. Outdoor deliveries may be suspended.",
    startTime: "2026-03-20T06:00:00",
    endTime: "2026-03-20T18:00:00",
    affectedWorkers: 518,
    autoClaimsTriggered: 0,
    isActive: true,
  },
  {
    id: "ALT-003",
    type: "heatwave",
    severity: "moderate",
    city: "Chennai",
    zone: "South Chennai",
    message:
      "Temperature expected to reach 44°C. IMD yellow alert issued. Reduced work hours advised.",
    startTime: "2026-03-19T10:00:00",
    endTime: "2026-03-19T16:00:00",
    affectedWorkers: 156,
    autoClaimsTriggered: 12,
    isActive: true,
  },
  {
    id: "ALT-004",
    type: "flood",
    severity: "high",
    city: "Bangalore",
    zone: "Outer Ring Road",
    message:
      "Waterlogging reported in ORR, Silk Board, Marathahalli areas. Delivery routes affected.",
    startTime: "2026-03-18T16:00:00",
    endTime: "2026-03-18T23:00:00",
    affectedWorkers: 234,
    autoClaimsTriggered: 45,
    isActive: false,
  },
];

// ==========================================
// MOCK DASHBOARD METRICS
// ==========================================

export const mockDashboardMetrics: DashboardMetrics = {
  totalWorkers: 2847,
  activePolicies: 2156,
  totalClaimsThisWeek: 187,
  totalPayoutsThisWeek: 156400,
  avgPremiumPerWeek: 94,
  lossRatio: 0.68,
  fraudDetectionRate: 0.94,
  autoApprovalRate: 0.72,
  activeAlerts: 3,
  avgClaimProcessingTime: "4.2 mins",
};

// ==========================================
// AI SIMULATION FUNCTIONS
// ==========================================

export function calculateDynamicPremium(
  worker: Worker,
  plan: "basic" | "standard" | "premium"
): PremiumCalculation {
  const basePremiums = { basic: 39, standard: 79, premium: 119 };
  const basePremium = basePremiums[plan];

  // City-based zone risk multiplier
  const cityRisk: Record<string, number> = {
    Mumbai: 1.25,
    Delhi: 1.35,
    Chennai: 1.15,
    Bangalore: 1.1,
    Hyderabad: 1.05,
    Pune: 1.0,
    Kolkata: 1.2,
  };
  const zoneMultiplier = cityRisk[worker.city] || 1.0;
  const zoneAdjustment = Math.round(basePremium * (zoneMultiplier - 1));

  // Weather risk — monsoon season / pollution season adjustments
  const month = new Date().getMonth();
  const isMonsooon = month >= 5 && month <= 9;
  const isPollutionSeason = month >= 9 && month <= 11;
  let weatherMultiplier = 1.0;
  if (isMonsooon && (worker.city === "Mumbai" || worker.city === "Chennai"))
    weatherMultiplier = 1.3;
  else if (isPollutionSeason && worker.city === "Delhi")
    weatherMultiplier = 1.4;
  else if (isMonsooon) weatherMultiplier = 1.15;
  const weatherRiskAdjustment = Math.round(
    basePremium * (weatherMultiplier - 1)
  );

  // Historical claim adjustment
  const claimMultiplier = worker.riskScore > 60 ? 1.2 : worker.riskScore > 40 ? 1.05 : 0.95;
  const historicalClaimAdjustment = Math.round(
    basePremium * (claimMultiplier - 1)
  );

  // Platform adjustment
  const platformRisk: Record<string, number> = {
    zomato: 1.0,
    swiggy: 1.0,
    zepto: 0.95,
    blinkit: 0.95,
    dunzo: 1.05,
  };
  const platformMultiplier = platformRisk[worker.platform] || 1.0;
  const platformAdjustment = Math.round(
    basePremium * (platformMultiplier - 1)
  );

  // Vehicle type adjustment
  const vehicleRisk: Record<string, number> = {
    bicycle: 1.15,
    motorcycle: 1.0,
    scooter: 0.95,
    ev_scooter: 0.9,
  };
  const vehicleMultiplier = vehicleRisk[worker.vehicleType] || 1.0;
  const vehicleAdjustment = Math.round(
    basePremium * (vehicleMultiplier - 1)
  );

  // Loyalty discount
  const regDate = new Date(worker.registrationDate);
  const monthsActive = Math.floor(
    (Date.now() - regDate.getTime()) / (30 * 24 * 60 * 60 * 1000)
  );
  const loyaltyDiscount = monthsActive > 3 ? -Math.round(basePremium * 0.08) : monthsActive > 1 ? -Math.round(basePremium * 0.03) : 0;

  const finalPremium = Math.max(
    29,
    basePremium +
      zoneAdjustment +
      weatherRiskAdjustment +
      historicalClaimAdjustment +
      platformAdjustment +
      vehicleAdjustment +
      loyaltyDiscount
  );

  return {
    basePremium,
    zoneAdjustment,
    weatherRiskAdjustment,
    historicalClaimAdjustment,
    platformAdjustment,
    vehicleAdjustment,
    loyaltyDiscount,
    finalPremium,
    breakdown: [
      {
        label: "Base Premium",
        amount: basePremium,
        type: "base",
        description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} plan base rate`,
      },
      {
        label: "Zone Risk (City)",
        amount: zoneAdjustment,
        type: "adjustment",
        description: `${worker.city} risk factor (${zoneMultiplier}x)`,
      },
      {
        label: "Weather Exposure",
        amount: weatherRiskAdjustment,
        type: "adjustment",
        description: `Seasonal weather risk for ${worker.city}`,
      },
      {
        label: "Claim History",
        amount: historicalClaimAdjustment,
        type: "adjustment",
        description: `Risk score: ${worker.riskScore}/100`,
      },
      {
        label: "Platform Factor",
        amount: platformAdjustment,
        type: "adjustment",
        description: `${worker.platform.charAt(0).toUpperCase() + worker.platform.slice(1)} platform adjustment`,
      },
      {
        label: "Vehicle Type",
        amount: vehicleAdjustment,
        type: "adjustment",
        description: `${worker.vehicleType.replace("_", " ")} risk factor`,
      },
      {
        label: "Loyalty Discount",
        amount: loyaltyDiscount,
        type: "discount",
        description: `${monthsActive} months active member`,
      },
    ],
  };
}

export function generateRiskProfile(worker: Worker): RiskProfile {
  const zoneRiskMap: Record<string, "low" | "medium" | "high" | "very_high"> = {
    Mumbai: "high",
    Delhi: "very_high",
    Chennai: "medium",
    Bangalore: "medium",
    Hyderabad: "low",
    Pune: "low",
    Kolkata: "high",
  };

  const factors = [
    {
      name: "Zone Weather History",
      weight: 0.25,
      score: worker.city === "Mumbai" ? 72 : worker.city === "Delhi" ? 85 : 45,
      description: `${worker.city} — ${worker.zone} weather disruption frequency`,
      impact: (worker.city === "Mumbai" || worker.city === "Delhi" ? "negative" : "positive") as "positive" | "negative" | "neutral",
    },
    {
      name: "Delivery Hours Pattern",
      weight: 0.2,
      score: worker.avgWeeklyHours > 45 ? 60 : 35,
      description: `${worker.avgWeeklyHours}hrs/week — ${worker.avgWeeklyHours > 45 ? "high" : "moderate"} exposure`,
      impact: (worker.avgWeeklyHours > 45 ? "negative" : "positive") as "positive" | "negative" | "neutral",
    },
    {
      name: "Vehicle Vulnerability",
      weight: 0.15,
      score: worker.vehicleType === "bicycle" ? 80 : worker.vehicleType === "motorcycle" ? 50 : 30,
      description: `${worker.vehicleType.replace("_", " ")} — weather vulnerability`,
      impact: (worker.vehicleType === "bicycle" ? "negative" : "positive") as "positive" | "negative" | "neutral",
    },
    {
      name: "Platform Stability",
      weight: 0.15,
      score: 35,
      description: `${worker.platform} operational stability index`,
      impact: "positive" as const,
    },
    {
      name: "Historical Claim Frequency",
      weight: 0.15,
      score: worker.riskScore,
      description: `Past claim patterns and disruption frequency`,
      impact: (worker.riskScore > 50 ? "negative" : "positive") as "positive" | "negative" | "neutral",
    },
    {
      name: "Earnings Consistency",
      weight: 0.1,
      score: worker.avgWeeklyEarnings > 5000 ? 30 : 55,
      description: `₹${worker.avgWeeklyEarnings}/week consistency`,
      impact: (worker.avgWeeklyEarnings > 5000 ? "positive" : "neutral") as "positive" | "negative" | "neutral",
    },
  ];

  const overallScore = Math.round(
    factors.reduce((sum, f) => sum + f.score * f.weight, 0)
  );

  return {
    workerId: worker.id,
    overallScore,
    factors,
    historicalClaims: Math.floor(Math.random() * 5),
    claimFrequency: Math.random() * 0.3,
    zoneRiskLevel: zoneRiskMap[worker.city] || "medium",
    weatherExposure: worker.avgWeeklyHours / 60,
    recommendedPlan: overallScore > 60 ? "premium" : overallScore > 40 ? "standard" : "basic",
    weeklyPremiumRange: {
      min: overallScore > 60 ? 99 : overallScore > 40 ? 69 : 39,
      max: overallScore > 60 ? 169 : overallScore > 40 ? 119 : 79,
    },
  };
}

export function detectFraud(claim: Claim): {
  score: number;
  flags: string[];
  recommendation: string;
} {
  const flags: string[] = [];
  let score = 0;

  // Check weather data consistency
  if (claim.evidenceData.weatherData) {
    const weather = claim.evidenceData.weatherData;
    if (claim.type === "weather" && weather.rainfall === 0 && weather.condition === "Clear Sky") {
      flags.push("weather_data_mismatch");
      score += 40;
    }
    if (claim.type === "weather" && weather.temperature < 40 && claim.disruptionEvent.includes("Heat")) {
      flags.push("temperature_below_threshold");
      score += 30;
    }
  }

  // Check location verification
  if (claim.evidenceData.locationVerification) {
    const loc = claim.evidenceData.locationVerification;
    if (!loc.verified || loc.distance > 5) {
      flags.push("gps_location_mismatch");
      score += 35;
    }
    if (loc.distance > 10) {
      flags.push("significant_location_deviation");
      score += 20;
    }
  }

  // Check claim amount vs average
  if (claim.amount > 1400) {
    flags.push("high_payout_amount");
    score += 10;
  }

  // Check duplicate/frequency
  if (claim.lostHours > 8) {
    flags.push("excessive_hours_claimed");
    score += 15;
  }

  score = Math.min(100, score);

  let recommendation = "Approve — Low fraud risk";
  if (score > 70) recommendation = "Reject — High fraud indicators detected";
  else if (score > 40) recommendation = "Manual Review — Moderate fraud risk";
  else if (score > 20) recommendation = "Approve with Note — Minor anomalies";

  return { score, flags, recommendation };
}

// ==========================================
// CHART DATA
// ==========================================

export const weeklyClaimsData = [
  { week: "W1 Feb", claims: 42, payouts: 38200, premium: 45600 },
  { week: "W2 Feb", claims: 38, payouts: 31500, premium: 45100 },
  { week: "W3 Feb", claims: 55, payouts: 48900, premium: 46200 },
  { week: "W4 Feb", claims: 61, payouts: 55200, premium: 46800 },
  { week: "W1 Mar", claims: 78, payouts: 72100, premium: 47500 },
  { week: "W2 Mar", claims: 95, payouts: 89400, premium: 48200 },
  { week: "W3 Mar", claims: 187, payouts: 156400, premium: 49100 },
];

export const disruptionTypeData = [
  { name: "Heavy Rain", value: 42, color: "#6366f1" },
  { name: "Extreme Heat", value: 28, color: "#f59e0b" },
  { name: "Air Pollution", value: 18, color: "#ef4444" },
  { name: "Flooding", value: 8, color: "#06b6d4" },
  { name: "Strikes/Curfews", value: 4, color: "#10b981" },
];

export const cityDistributionData = [
  { city: "Mumbai", workers: 845, claims: 62, premium: 14200 },
  { city: "Delhi", workers: 712, claims: 54, premium: 13800 },
  { city: "Bangalore", workers: 534, claims: 28, premium: 9200 },
  { city: "Chennai", workers: 389, claims: 22, premium: 7100 },
  { city: "Hyderabad", workers: 267, claims: 15, premium: 4800 },
  { city: "Pune", workers: 100, claims: 6, premium: 1800 },
];

export const riskScoreDistribution = [
  { range: "0-20", count: 342, label: "Very Low" },
  { range: "21-40", count: 856, label: "Low" },
  { range: "41-60", count: 1024, label: "Medium" },
  { range: "61-80", count: 478, label: "High" },
  { range: "81-100", count: 147, label: "Very High" },
];

export const hourlyDisruptionPattern = [
  { hour: "6AM", disruptions: 2 },
  { hour: "8AM", disruptions: 5 },
  { hour: "10AM", disruptions: 8 },
  { hour: "12PM", disruptions: 15 },
  { hour: "2PM", disruptions: 22 },
  { hour: "4PM", disruptions: 28 },
  { hour: "6PM", disruptions: 18 },
  { hour: "8PM", disruptions: 12 },
  { hour: "10PM", disruptions: 6 },
];

export function getRandomWeatherData() {
  const conditions = [
    { condition: "Clear", temp: 32, humidity: 45, rainfall: 0, wind: 8, aqi: 120 },
    { condition: "Partly Cloudy", temp: 30, humidity: 55, rainfall: 0, wind: 12, aqi: 145 },
    { condition: "Heavy Rain", temp: 26, humidity: 95, rainfall: 78, wind: 35, aqi: 80 },
    { condition: "Thunderstorm", temp: 24, humidity: 98, rainfall: 95, wind: 55, aqi: 65 },
    { condition: "Extreme Heat", temp: 47, humidity: 30, rainfall: 0, wind: 5, aqi: 180 },
    { condition: "Haze/Pollution", temp: 28, humidity: 60, rainfall: 0, wind: 4, aqi: 485 },
  ];
  return conditions[Math.floor(Math.random() * conditions.length)];
}
