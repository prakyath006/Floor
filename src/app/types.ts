// ==========================================
// GigShield - Type Definitions
// ==========================================

export interface Worker {
  id: string;
  name: string;
  phone: string;
  email: string;
  platform: "zomato" | "swiggy" | "zepto" | "blinkit" | "dunzo";
  city: string;
  zone: string;
  vehicleType: "bicycle" | "motorcycle" | "scooter" | "ev_scooter";
  avgWeeklyEarnings: number;
  avgWeeklyHours: number;
  avgDeliveriesPerDay: number;
  registrationDate: string;
  riskScore: number;
  riskLevel: "low" | "medium" | "high";
  profileImage?: string;
}

export interface Policy {
  id: string;
  workerId: string;
  workerName: string;
  platform: string;
  plan: "basic" | "standard" | "premium";
  weeklyPremium: number;
  coverageAmount: number;
  coverageHoursPerWeek: number;
  maxPayoutPerEvent: number;
  status: "active" | "expired" | "pending" | "cancelled";
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  triggers: DisruptionTrigger[];
  riskScore: number;
}

export interface DisruptionTrigger {
  id: string;
  type: "weather" | "environmental" | "social" | "platform";
  name: string;
  description: string;
  threshold: string;
  isActive: boolean;
  lastTriggered?: string;
}

export interface Claim {
  id: string;
  policyId: string;
  workerId: string;
  workerName: string;
  type: "weather" | "environmental" | "social" | "platform";
  disruptionEvent: string;
  description: string;
  status: "auto_approved" | "under_review" | "approved" | "rejected" | "paid" | "flagged";
  amount: number;
  lostHours: number;
  eventDate: string;
  filedDate: string;
  processedDate?: string;
  paidDate?: string;
  location: { lat: number; lng: number; area: string };
  evidenceData: EvidenceData;
  fraudScore: number;
  fraudFlags: string[];
  autoTriggered: boolean;
}

export interface EvidenceData {
  weatherData?: {
    temperature: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
    condition: string;
    source: string;
  };
  aqiData?: {
    aqi: number;
    pm25: number;
    pm10: number;
    source: string;
  };
  locationVerification?: {
    verified: boolean;
    workerLocation: { lat: number; lng: number };
    claimLocation: { lat: number; lng: number };
    distance: number;
  };
  platformData?: {
    ordersAvailable: boolean;
    platformStatus: string;
    averageOrders: number;
    currentOrders: number;
  };
}

export interface RiskProfile {
  workerId: string;
  overallScore: number;
  factors: RiskFactor[];
  historicalClaims: number;
  claimFrequency: number;
  zoneRiskLevel: "low" | "medium" | "high" | "very_high";
  weatherExposure: number;
  recommendedPlan: "basic" | "standard" | "premium";
  weeklyPremiumRange: { min: number; max: number };
}

export interface RiskFactor {
  name: string;
  weight: number;
  score: number;
  description: string;
  impact: "positive" | "negative" | "neutral";
}

export interface WeatherAlert {
  id: string;
  type: "rain" | "storm" | "heatwave" | "flood" | "cyclone" | "pollution";
  severity: "low" | "moderate" | "high" | "extreme";
  city: string;
  zone: string;
  message: string;
  startTime: string;
  endTime?: string;
  affectedWorkers: number;
  autoClaimsTriggered: number;
  isActive: boolean;
}

export interface DashboardMetrics {
  totalWorkers: number;
  activePolicies: number;
  totalClaimsThisWeek: number;
  totalPayoutsThisWeek: number;
  avgPremiumPerWeek: number;
  lossRatio: number;
  fraudDetectionRate: number;
  autoApprovalRate: number;
  activeAlerts: number;
  avgClaimProcessingTime: string;
}

export interface PremiumCalculation {
  basePremium: number;
  zoneAdjustment: number;
  weatherRiskAdjustment: number;
  historicalClaimAdjustment: number;
  platformAdjustment: number;
  vehicleAdjustment: number;
  loyaltyDiscount: number;
  finalPremium: number;
  breakdown: PremiumBreakdownItem[];
}

export interface PremiumBreakdownItem {
  label: string;
  amount: number;
  type: "base" | "adjustment" | "discount";
  description: string;
}

export type PageType =
  | "landing"
  | "onboarding"
  | "dashboard"
  | "policies"
  | "claims"
  | "alerts"
  | "analytics"
  | "profile"
  | "admin";
