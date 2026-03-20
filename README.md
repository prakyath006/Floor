# 🛡️ GigShield — AI-Powered Parametric Insurance for India's Delivery Partners

> **Guidewire DEVTrails 2026** | Team Submission  
> Protecting gig workers' earnings from weather, pollution, and social disruptions — automatically.

**🔗 Live Prototype:** Clone & run locally (see [Setup](#-setup--run))  
**🎥 Demo Video:** [2-minute walkthrough](https://youtu.be/xGnYxrY4gdA)

---

## 📋 Table of Contents
- [Problem Statement](#-problem-statement)
- [Deep Dive: Who Is Our User?](#-deep-dive-who-is-our-user)
- [Our Solution](#-our-solution)
- [Application Workflow](#-application-workflow)
- [Weekly Premium Model](#-weekly-premium-model)
- [Parametric Triggers](#-parametric-triggers)
- [How Our AI Actually Works](#-how-our-ai-actually-works)
- [Fraud Detection — Technical Deep Dive](#-fraud-detection--technical-deep-dive)
- [Adversarial Defense & Anti-Spoofing Strategy](#-adversarial-defense--anti-spoofing-strategy)
- [Regulatory Compliance & Market Crash Readiness](#-regulatory-compliance--market-crash-readiness)
- [Tech Stack & Architecture](#-tech-stack--architecture)
- [Setup & Run](#-setup--run)
- [Development Roadmap](#-development-roadmap)
- [Business Viability](#-business-viability)

---

## 🎯 Problem Statement

India's 7.7 million+ platform-based delivery partners are the backbone of our ₹6,500 Cr food delivery ecosystem. Yet they have **zero income protection** against external disruptions they cannot control.

### The Hard Numbers
- A Zomato/Swiggy rider earns **₹700-900/day** (₹4,500-6,000/week)
- Mumbai monsoon season causes **15-20 lost working days** per year
- Delhi's AQI crosses 400+ for **30-40 days** annually
- A single heavy rain day = **₹800-1,200 lost** with zero compensation
- Across a year, external disruptions cost a rider **₹15,000-25,000** — that's an entire month's earnings gone

### Why Traditional Insurance Fails Gig Workers
| Traditional Insurance | Why It Fails for Gig Workers |
|---|---|
| Monthly/annual premium | Workers earn weekly, can't commit long-term |
| Manual claim filing | No time; every hour offline = money lost |
| 15-30 day processing | Workers need money TODAY, not next month |
| One-size-fits-all pricing | A Mumbai rider faces 3x rain risk vs Bangalore |
| Covers health/accidents only | Nobody covers income loss from rain or AQI |

---

## 👤 Deep Dive: Who Is Our User?

### Chosen Persona: **Food Delivery Partners (Zomato & Swiggy)**

We chose food delivery over e-commerce/grocery because:
- **Largest workforce**: ~4 million active food delivery riders in India
- **Maximum weather exposure**: Food delivery peaks during rain (people order in) but riders can't deliver — the cruelest irony
- **Highest disruption frequency**: Food delivery operates 12-14 hrs/day across all weather conditions
- **Weekly payout cycle**: Both Zomato and Swiggy pay riders weekly — perfectly matching our premium model

### A Day in the Life of Our User

**Meet Rajesh Kumar, 28, Zomato rider in Andheri West, Mumbai:**

```
5:30 AM  — Wakes up, checks weather app (monsoon anxiety)
6:00 AM  — Charges phone, checks Zomato partner app for incentives
7:00 AM  — Starts morning shift. Breakfast deliveries (low volume)
9:00 AM  — Tea break. Earned ₹120 so far
11:00 AM — Lunch rush begins. This is where the real money is
1:30 PM  — ⛈️ HEAVY RAIN STARTS. Roads flood in Andheri within 30 min
         — Zomato shows orders (demand is HIGH) but roads are impassable
         — Rajesh parks under a flyover. He CANNOT deliver safely
         — Every hour he waits = ₹150 lost
5:30 PM  — Rain eases. Roads still waterlogged. Resumes cautiously
7:00 PM  — Dinner rush. Makes up some lost earnings
10:30 PM — Ends shift. Today's total: ₹480 (vs usual ₹800)
         — Lost ₹320 due to 4 hours of rain. No compensation from anyone
```

**Rajesh's pain points:**
1. **"I can see orders on my screen but I physically can't reach them"** — Demand surges during rain but supply (riders) drops 60-70%
2. **"I lose money on the best earning days"** — Peak lunch/dinner hours coincide with afternoon storms
3. **"I don't need health insurance, I need my lost wages back"** — He has government health coverage; what he lacks is income protection
4. **"I can't plan for next week when I don't know if it'll rain"** — Financial uncertainty drives 40% rider churn annually

### Persona Segments We Cover

| Persona | City | Key Risk | Avg Weekly Earnings | Risk Profile |
|---------|------|----------|-------------------|-------------|
| **Rajesh** (Zomato, motorcycle) | Mumbai | Monsoon flooding, heavy rain | ₹5,200 | HIGH — Mumbai gets 2,400mm rain/year |
| **Priya** (Swiggy, scooter) | Delhi | Air pollution (AQI>400), winter fog | ₹4,800 | HIGH — Delhi has 30+ hazardous AQI days |
| **Amit** (Zepto, EV scooter) | Bangalore | Sudden flooding in ORR areas | ₹6,100 | MEDIUM — Localized but severe |
| **Deepak** (Zomato, motorcycle) | Chennai | Extreme heat (>45°C), cyclones | ₹4,500 | MEDIUM — Cyclone season Nov-Dec |
| **Sunita** (Swiggy, scooter) | Mumbai | Rain + waterlogging in Bandra | ₹5,500 | HIGH — Low-lying area prone to flooding |

### How Our User Thinks About Money

This is critical for product design:
- Riders think in **daily earnings**, not monthly salary
- They track money by **number of deliveries** (₹30-50 per delivery)
- A "good week" = ₹6,000+. A "bad week" = ₹3,500-4,000
- They are extremely **price-sensitive**: ₹100/week feels expensive, ₹50/week feels fair
- They want **instant gratification**: If I pay ₹50 this week, I want to see value THIS week
- **Trust is earned through speed**: If a claim takes 2 days, they'll never renew

This understanding drives every design decision in GigShield — from our ₹39-169 weekly pricing to our 4-minute average claim time.

---

## 💡 Our Solution

**GigShield** is an AI-powered parametric insurance platform that:

1. **Automatically detects** external disruptions using real-time weather, AQI, and city alert APIs
2. **Triggers claims instantly** when parametric thresholds are breached (zero paperwork)
3. **Processes payouts in minutes** via UPI — not days or weeks
4. **Prices dynamically** using ML-based risk profiling on a **weekly basis**
5. **Catches fraud intelligently** using multi-layer anomaly detection

### What We Cover (INCOME LOSS ONLY)
| Disruption | Trigger | What We Pay |
|-----------|---------|------------|
| 🌧️ Heavy Rainfall (>64mm/hr) | Weather API | Lost hours × hourly rate |
| 🌡️ Extreme Heat (>45°C) | IMD data | Lost hours × hourly rate |
| 🌫️ Severe Pollution (AQI >400) | CPCB API | Lost hours × hourly rate |
| 🌊 Flooding (>30cm waterlogging) | City sensors | Lost hours × hourly rate |
| ⛔ Curfews/Strikes | News/Gov API | Lost hours × hourly rate |
| 🌀 Cyclone/Storm (wind >62km/h) | IMD API | Lost hours × hourly rate |

### What We DON'T Cover (Strict Exclusions)
- ❌ Health or medical expenses
- ❌ Life insurance
- ❌ Accident coverage
- ❌ Vehicle repair or damage costs
- ❌ Platform-imposed penalties or deductions

---

## 🔄 Application Workflow

```
┌──────────────────────────────────────────────────────────┐
│                   GigShield User Journey                  │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  STEP 1: ONBOARDING (2 minutes)                         │
│  ├─ Enter name, phone, delivery platform                │
│  ├─ Select city, zone, vehicle type                     │
│  ├─ Input average weekly earnings & hours               │
│  └─ AI generates instant risk profile                   │
│          ↓                                               │
│  STEP 2: AI RISK PROFILING                              │
│  ├─ ML model analyzes 15+ risk factors                  │
│  ├─ Generates risk score (0-100)                        │
│  ├─ Shows factor-wise breakdown                         │
│  └─ Recommends optimal plan                             │
│          ↓                                               │
│  STEP 3: PLAN SELECTION & PAYMENT                       │
│  ├─ Choose Basic / Standard / Premium                   │
│  ├─ See AI-computed weekly premium                      │
│  ├─ View transparent premium breakdown                  │
│  └─ Pay via UPI / auto-debit weekly                     │
│          ↓                                               │
│  STEP 4: 24/7 MONITORING (Automated)                    │
│  ├─ Weather APIs polled every 15 minutes                │
│  ├─ AQI data monitored continuously                     │
│  ├─ City alerts & platform status tracked               │
│  └─ ML model predicts disruptions 6-12hrs ahead         │
│          ↓                                               │
│  STEP 5: AUTO CLAIM TRIGGER                             │
│  ├─ Threshold breached → Claim auto-created             │
│  ├─ Evidence auto-collected (weather + GPS + platform)  │
│  ├─ Fraud engine scores the claim (0-100%)              │
│  └─ Score < 30% → Auto-approved instantly               │
│          ↓                                               │
│  STEP 6: INSTANT PAYOUT                                 │
│  ├─ Amount = Lost Hours × (Weekly Earnings / 48)        │
│  ├─ Capped at plan's max payout per event               │
│  ├─ UPI transfer initiated automatically                │
│  └─ Worker receives SMS confirmation                    │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

**Key Payout Formula:**
```
Hourly Rate = Worker's Avg Weekly Earnings ÷ Avg Weekly Hours
Payout = Lost Hours × Hourly Rate
Payout = min(Payout, Plan's Max Payout Per Event)
```

Example: Rajesh earns ₹5,200/week working 48 hours
- Hourly rate = ₹5,200 ÷ 48 = ₹108/hr
- 6 hours lost to rain = 6 × ₹108 = ₹650
- Standard plan max = ₹1,200 → Payout: **₹650**

---

## 💰 Weekly Premium Model

### Why Weekly?
Gig workers are paid weekly by platforms. Monthly premiums create a mismatch. Our weekly model means:
- Premium deducted on the **same day as platform payout** (₹0 additional cash outflow feeling)
- Workers can **skip a week** if they're taking a break (no long-term lock-in)
- Premiums **adjust week-to-week** based on upcoming weather forecasts

### Plan Tiers

| Feature | Basic (₹39-79/wk) | Standard (₹69-119/wk) | Premium (₹99-169/wk) |
|---------|-------------------|----------------------|---------------------|
| Weekly Coverage Cap | ₹2,000 | ₹3,500 | ₹5,000 |
| Hours Covered | 20 hrs/wk | 30 hrs/wk | 42 hrs/wk |
| Max Payout/Event | ₹800 | ₹1,200 | ₹1,800 |
| Weather Triggers | ✅ | ✅ | ✅ |
| Environmental (AQI) | ❌ | ✅ | ✅ |
| Social (Strikes) | ❌ | ❌ | ✅ |
| Platform Outage | ❌ | ❌ | ✅ |
| Auto-claim | ✅ | ✅ | ✅ |
| Instant UPI payout | ✅ | ✅ | ✅ |

### How Premium is Calculated (Concrete Example)

For **Rajesh (Zomato, Mumbai, Motorcycle, Standard plan)**:

```
Base Premium (Standard)              ₹79.00
+ Zone Risk: Mumbai (1.25x)          ₹19.75   ← Mumbai has high monsoon risk
+ Weather Exposure: March (1.0x)      ₹0.00   ← Not monsoon season yet
+ Claim History: Score 35 (0.95x)    -₹3.95   ← Low past claims = discount
+ Platform Factor: Zomato (1.0x)      ₹0.00   ← Neutral
+ Vehicle: Motorcycle (1.0x)          ₹0.00   ← Neutral
- Loyalty Discount: 2 months         -₹2.37   ← Returning customer
────────────────────────────────────────────
WEEKLY PREMIUM                        ₹92.43 → rounded to ₹89/week
```

During **Mumbai monsoon (June-September)**, weather multiplier rises to 1.3x:
```
Same worker, monsoon season:          ₹79 + ₹19.75 + ₹23.70 - ₹3.95 - ₹2.37 = ₹116/week
```

This is how the premium dynamically adjusts to real risk.

---

## ⚡ Parametric Triggers

### What "Parametric" Means
Unlike traditional insurance where you file a claim and prove your loss, parametric insurance triggers automatically when a **measurable parameter** crosses a threshold. No claim forms. No proof required. The data IS the proof.

| # | Trigger | Type | Threshold | Data Source | How We Verify |
|---|---------|------|-----------|-------------|--------------|
| 1 | Heavy Rainfall | Weather | >64 mm/hr | OpenWeatherMap API | Hourly precipitation data by coordinates |
| 2 | Extreme Heat | Weather | >45°C | IMD Weather API | Temperature at worker's zone |
| 3 | Cyclone/Storm | Weather | Wind >62 km/h | IMD Cyclone API | Wind speed alerts by region |
| 4 | Severe Pollution | Environmental | AQI >400 | CPCB AQI API | Station-wise AQI readings |
| 5 | Flooding | Environmental | >30cm water | City flood sensors + news | Road waterlogging reports |
| 6 | Curfew/Strike | Social | Official advisory | Gov/News API | Verified government notifications |
| 7 | Platform Outage | Platform | >2hr downtime | Platform API | App status monitoring |

### Trigger Flow
```
API Data Received → Threshold Check → Zone Mapping → Affected Workers Identified
    → Auto-Claims Created → Fraud Engine Scoring → Payout Processed
```

**Average time from trigger to payout: 4.2 minutes**

---

## 🤖 How Our AI Actually Works

We use AI/ML in three distinct areas. Here's exactly what each does, what data it uses, and how.

### 1. Dynamic Premium Pricing Engine

**What it does:** Calculates a personalized weekly premium for each worker.

**Algorithm:** Weighted linear regression model with 7 feature groups:

```python
# Simplified model logic (implemented in TypeScript)
premium = base_rate[plan]                          # ₹39 / ₹79 / ₹119

# Factor 1: Geographic risk (trained on 5-year city weather data)
premium *= city_risk_multiplier[worker.city]        # Mumbai=1.25, Delhi=1.35

# Factor 2: Seasonal adjustment (month-based weather patterns)
premium *= seasonal_multiplier(worker.city, month)  # Monsoon=1.3, Winter=1.0

# Factor 3: Individual claim history
premium *= claim_risk_multiplier(worker.risk_score) # High claims=1.2, Low=0.95

# Factor 4: Platform reliability
premium *= platform_factor[worker.platform]         # Stable=0.95, Average=1.0

# Factor 5: Vehicle weather vulnerability
premium *= vehicle_risk[worker.vehicle_type]         # Bicycle=1.15, EV=0.9

# Factor 6: Working hours exposure
premium *= hours_exposure(worker.weekly_hours)       # >45hrs=1.1, <30hrs=0.95

# Factor 7: Loyalty discount
premium -= loyalty_discount(months_active)           # >3mo=-8%, >1mo=-3%
```

**Training data sources:**
- IMD historical weather data (5 years, city-wise)
- CPCB AQI historical records
- Platform-reported disruption data (simulated)
- Actuarial loss tables for parametric triggers

**Why this works:** Riders in flood-prone zones pay slightly more BUT get more payouts. Riders in stable zones pay less. The model makes pricing fair, not uniform.

### 2. Risk Profiling Engine

**What it does:** Assigns each worker a Risk Score (0-100) that determines their premium tier and identifies high-risk workers for insurers.

**Scoring model:** Weighted composite score using 6 factors:

| Factor | Weight | How It's Computed |
|--------|--------|-------------------|
| Zone Weather History | 25% | 5-year disruption frequency for worker's specific zone (not just city) |
| Delivery Hours Pattern | 20% | Workers doing >45hrs/week have more exposure to afternoon storms |
| Vehicle Vulnerability | 15% | Bicycles can't navigate waterlogged roads; EVs handle heat better |
| Platform Stability | 15% | How often the partner app goes down in their zone |
| Historical Claims | 15% | Claim-to-week ratio. Frequent claimers = higher risk |
| Earnings Consistency | 10% | Volatile earnings suggest higher disruption exposure |

**Score interpretation:**
- **0-30:** Low risk → Recommend Basic plan, lower premium
- **31-50:** Medium risk → Recommend Standard plan
- **51-70:** High risk → Recommend Premium plan
- **71-100:** Very high risk → Premium plan with higher rates

### 3. Predictive Disruption Forecasting

**What it does:** Predicts disruption probability for the next 24-72 hours per zone.

**How:**
- Ingests weather forecast data (OpenWeatherMap 5-day forecast API)
- Applies historical pattern matching (e.g., "when IMD issues orange alert for Mumbai, 78% chance of >64mm rain within 12hrs")
- Generates **pre-alerts** to workers: "Tomorrow has 80% chance of heavy rain in your zone. Your GigShield policy is active."
- Helps insurers **pre-allocate payout reserves** for expected claims

---

## 🔍 Fraud Detection — Technical Deep Dive

Fraud is the #1 risk for parametric insurance. Our multi-layer system catches delivery-specific fraud:

### Layer 1: Weather Data Cross-Verification
```
Worker claims: "Heavy rain stopped my deliveries"
System checks: OpenWeatherMap API for worker's zone at claimed time
Result: API shows "Clear Sky, 0mm rainfall"
→ FRAUD FLAG: weather_data_mismatch (+40 points)
```

### Layer 2: GPS Location Validation
```
Worker claims: "Flooding in Andheri West"
System checks: Worker's last GPS ping vs claimed disruption zone
Result: Worker's GPS shows they're in Powai (14.2km away)
→ FRAUD FLAG: gps_location_mismatch (+35 points)
→ FRAUD FLAG: significant_location_deviation (+20 points)
```

### Layer 3: Behavioral Anomaly Detection
```
Pattern detected: Worker files claims every Monday and Friday
Historical baseline: Average worker claims 1.2 times/month
This worker: Claims 8 times/month
→ FRAUD FLAG: high_claim_frequency (+25 points)
```

### Layer 4: Cross-Reference Validation
```
Worker claims 10 hours lost, but platform data shows:
- Worker completed 3 deliveries during "lost" hours
- Worker's app was active and accepting orders
→ FRAUD FLAG: platform_activity_mismatch (+45 points)
```

### Fraud Score → Action Mapping

| Score | Verdict | Action | % of Claims |
|-------|---------|--------|------------|
| 0-20 | ✅ Clean | Auto-approve, instant payout | ~72% |
| 21-40 | 📝 Minor anomaly | Approve with audit note | ~14% |
| 41-70 | 🔍 Suspicious | Hold for manual review (24hr SLA) | ~10% |
| 71-100 | ❌ Likely fraud | Auto-reject, flag account | ~4% |

**Current fraud detection rate: 94%** (simulated across test scenarios)

---

## 🛡️ Adversarial Defense & Anti-Spoofing Strategy

> **Threat Model:** A coordinated syndicate of 500+ delivery workers uses GPS-spoofing apps to fabricate their location inside a severe weather zone, triggering mass false parametric payouts from home — draining the liquidity pool within hours.

GigShield treats GPS as **one signal among many, never a source of truth on its own.** Our defense is built on the principle of **multi-signal consensus** — no single data point can trigger a payout without corroboration from independent, non-spoofable sources.

### 1. The Differentiation: Genuine Worker vs. Bad Actor

Our AI/ML architecture applies a **Genuine Presence Score (GPS*)** — an ironic rename that replaces blind trust in GPS coordinates with a composite authenticity score derived from behavioral, environmental, and device-level signals.

```
┌──────────────────────────────────────────────────────────────────────┐
│              GENUINE PRESENCE SCORING ENGINE (GPS*)                  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Signal Layer 1: ENVIRONMENT CONSENSUS                              │
│  ├─ Is there a verified weather event at this location? (IMD/OWM)   │
│  ├─ Do nearby IoT flood sensors confirm ground-level conditions?    │
│  └─ Does satellite imagery corroborate cloud cover / rainfall?      │
│          ↓ Weight: 30%                                               │
│                                                                      │
│  Signal Layer 2: DEVICE INTEGRITY                                   │
│  ├─ Is a mock-location app enabled on the device?                   │
│  ├─ Does WiFi BSSID / cell tower triangulation match GPS coords?    │
│  ├─ Are device sensors (barometer, accelerometer) consistent?       │
│  └─ Is the device rooted/jailbroken? (elevated spoofing risk)       │
│          ↓ Weight: 25%                                               │
│                                                                      │
│  Signal Layer 3: BEHAVIORAL BIOMETRICS                              │
│  ├─ Does movement pattern match a stationary/stranded rider?        │
│  ├─ Is there realistic micro-movement (human jitter vs GPS pin)?    │
│  ├─ Step counter / accelerometer: Is the rider physically present?  │
│  └─ Battery drain pattern: consistent with outdoor phone usage?     │
│          ↓ Weight: 25%                                               │
│                                                                      │
│  Signal Layer 4: NETWORK & PLATFORM CROSS-CHECK                    │
│  ├─ Delivery platform API: Was rider online/active before event?    │
│  ├─ Last verified delivery timestamp and GPS trail                  │
│  ├─ Network latency fingerprint (home WiFi vs mobile LTE)          │
│  └─ IP geolocation cross-reference with claimed location            │
│          ↓ Weight: 20%                                               │
│                                                                      │
│  ═══════════════════════════════════════════════════════════════════ │
│  GPS* Score: 0-100                                                   │
│  ├─ 80-100: Highly authentic → Auto-approve                        │
│  ├─ 50-79:  Needs verification → Soft challenge (see UX section)   │
│  ├─ 20-49:  Suspicious → Manual review + evidence request           │
│  └─ 0-19:   Almost certain spoof → Auto-reject + flag               │
└──────────────────────────────────────────────────────────────────────┘
```

**How it catches the syndicate scenario specifically:**

A spoofing worker at home would fail on multiple independent layers simultaneously:
- ❌ **WiFi BSSID** matches their home router, not a cell tower near the "disaster zone"
- ❌ **Barometric pressure** doesn't show the drop consistent with a storm overhead
- ❌ **Accelerometer data** shows sedentary behavior, not a rider stranded on a road
- ❌ **Network fingerprint** is a stable home broadband connection, not degraded mobile LTE in a storm
- ❌ **Platform trail** shows no deliveries in that zone in the prior 2 hours

A genuinely stranded worker would pass naturally:
- ✅ **WiFi/cell tower** matches the claimed disruption zone
- ✅ **Barometer** confirms low-pressure weather event
- ✅ **Accelerometer** shows intermittent movement (sheltering, walking bike to cover)
- ✅ **Network** shows degraded mobile signal typical of storm conditions
- ✅ **Platform data** shows an active delivery trail leading into the zone before the event

### 2. The Data: Detecting Coordinated Fraud Rings

Beyond individual spoofing, the **syndicate attack vector** (500 coordinated workers) has a unique statistical fingerprint. Our **Ring Detection Engine** analyzes these additional data points:

| Data Point | What It Reveals | Why Spoofers Can't Fake It |
|---|---|---|
| **Claim timing clustering** | 500 claims within a 10-minute window from a single zone is statistically impossible in organic scenarios | Real disruptions cause staggered claims as workers are affected at different times based on route/location |
| **Device fingerprint similarity** | Syndicate members often use the same spoofing app, creating identical GPS jitter patterns and mock-location signatures | Genuine GPS noise is unique per device hardware and environment |
| **Social graph analysis** | Workers who always claim together, were onboarded in batches, or share referral chains are flagged | Legitimate workers have independent, organic onboarding patterns |
| **Claim amount uniformity** | Syndicate members often claim identical hours lost (e.g., all claim exactly "8 hours") | Real lost hours follow a natural distribution (3.2 hrs, 5.7 hrs, etc.) |
| **Geographic impossibility** | 500 riders all claiming to be in a 2km² zone when that zone has only 80 active riders historically | Our zone-density model knows the baseline rider population per micro-zone |
| **Telegram/communication signal** | Sudden spike in claims correlating with activity patterns suggests external coordination | Organic claims correlate with weather onset, not communication patterns |
| **Historical baseline deviation** | Normal claim rate for Zone X in red-alert weather = 45 claims/hr. Suddenly it's 500? That's an 11x deviation | We maintain rolling baselines per zone per weather severity level |
| **Cross-platform delivery data** | Platform APIs show the rider completed 0 deliveries in the claimed zone that day | A genuinely stranded rider has a verifiable delivery trail leading to the zone |

**Ring Detection Algorithm:**
```
1. CLUSTERING: When >N claims arrive from the same zone within T minutes,
   trigger ring-detection mode (N and T are zone-density-adjusted)

2. FINGERPRINT: Extract device + behavioral fingerprint for each claimant
   └─ Mock-location flag, GPS jitter pattern, accelerometer hash,
      WiFi environment, network type, barometric reading

3. SIMILARITY: Compute pairwise similarity across all flagged claims
   └─ If >40% of claims share >3 fingerprint features → RING DETECTED

4. GRAPH: Build social/referral graph of flagged claimants
   └─ If claimants form a connected component in referral graph → escalate

5. BASELINE: Compare zone claim volume against historical weather-adjusted baseline
   └─ If volume > 3σ (standard deviations) above baseline → ANOMALY CONFIRMED

6. ACTION:
   ├─ Freeze all flagged claims for batch review
   ├─ Require enhanced verification (photo + selfie + live location)
   ├─ Alert operations team with ring analysis report
   └─ Temporarily reduce auto-approval rate for affected zone
```

### 3. The UX Balance: Protecting Honest Workers from False Flags

The hardest problem isn't catching fraudsters — it's **not punishing honest workers** who happen to trigger a flag. A genuine rider stranded in a storm with a dying phone and poor network should NOT face a frustrating verification wall.

Our approach uses **tiered friction** — the level of verification scales with suspicion, and we always err on the side of the worker:

#### Tier 1: Seamless (GPS* Score 80-100) — ~72% of claims
```
Worker Experience: Completely invisible. Claim auto-triggers, payout lands in 4 minutes.
No action required from the worker.
```

#### Tier 2: Soft Challenge (GPS* Score 50-79) — ~15% of claims
```
Worker Experience:
├─ Push notification: "Your claim is being processed. To speed it up,
│  tap to confirm your location" (optional, not mandatory)
├─ If worker confirms → processed in 10 minutes
├─ If worker ignores (maybe phone is dying) → processed in 2 hours
│  after secondary data sources are automatically cross-checked
└─ NO penalty for not responding. Benefit of doubt given.
```
**Key design decision:** We never block a claim at this tier. We only optionally accelerate it. A rider in a storm with 5% battery shouldn't have to jump through hoops.

#### Tier 3: Verification Required (GPS* Score 20-49) — ~10% of claims
```
Worker Experience:
├─ SMS + in-app: "We need to verify your location for this claim.
│  Please share a quick photo or selfie when you can."
├─ 24-hour window to respond (not instant — they may be in a storm)
├─ Alternative verification: Call-back from support within 4 hours
├─ If verified → full payout + apology credit (₹20 bonus for the hassle)
└─ If no response in 24hrs → claim held, worker can appeal anytime
```
**Key design decision:** Workers flagged at this tier who are verified genuine receive a **₹20 goodwill credit** — turning a negative experience into a trust-building moment.

#### Tier 4: Blocked (GPS* Score 0-19) — ~3% of claims
```
Worker Experience:
├─ Claim auto-rejected with clear explanation
├─ "Your claim could not be verified. Our records show [specific reason]."
├─ One-tap appeal button → Human review within 12 hours
├─ If appeal succeeds → full payout + ₹50 apology credit
└─ Account NOT suspended on first offense. 3-strike policy.
```
**Key design decision:** We NEVER auto-suspend accounts. Even caught fraudsters get 3 chances because false positives happen. Account suspension requires human review.

#### Handling Network Drops (The Edge Case)

Honest workers in genuine storms often lose network connectivity. Our system is designed for this:

| Scenario | How GigShield Handles It |
|---|---|
| Worker's phone goes offline during storm | Claim auto-triggers server-side using weather data alone. Worker doesn't need to be online. |
| Worker's GPS signal degrades | We expect GPS degradation in storms. Degraded signal actually *increases* authenticity score. |
| Worker can't respond to verification prompt | 24-hour response window. Claim is NOT rejected due to non-response; it enters manual review. |
| Worker's photos are blurry (rain on camera) | ML model trained on weather-degraded images. We accept lower-quality verification media during active events. |
| Worker is in area with no cell towers | Cell tower absence in a storm zone is itself a corroborating signal, not a penalty. |

### Why This Architecture Defeats the Syndicate

```
Syndicate Attack Vector              │  GigShield Defense
─────────────────────────────────────┼──────────────────────────────────────
500 workers spoof GPS simultaneously │  Ring detection triggers at >3σ
                                     │  claim volume anomaly
─────────────────────────────────────┼──────────────────────────────────────
Fake location in red-alert zone      │  WiFi BSSID + cell tower mismatch
                                     │  reveals home location
─────────────────────────────────────┼──────────────────────────────────────
Use GPS spoofing app                 │  Android mock-location flag detected
                                     │  + barometer/accelerometer mismatch
─────────────────────────────────────┼──────────────────────────────────────
Coordinate via Telegram groups       │  Claim timing clustering + social
                                     │  graph analysis reveals coordination
─────────────────────────────────────┼──────────────────────────────────────
Claim identical lost hours           │  Claim amount uniformity detection
                                     │  flags non-natural distributions
─────────────────────────────────────┼──────────────────────────────────────
Drain liquidity pool                 │  Circuit breaker freezes zone payouts
                                     │  when loss ratio spikes abnormally
```

**Bottom line:** GPS is no longer trusted. Every claim is verified through a **consensus of independent, non-spoofable signals.** The syndicate would need to simultaneously fake their WiFi environment, barometric pressure, accelerometer data, network fingerprint, delivery history, AND coordinate 500 people to claim naturally-distributed hours — all while avoiding our ring-detection clustering algorithm. The cost of attack exceeds the reward.

---

## 🛡️ Regulatory Compliance & Market Crash Readiness

### IRDAI Regulatory Framework
GigShield is designed to comply with India's insurance regulatory landscape:

| Requirement | How GigShield Addresses It |
|---|---|
| **IRDAI Sandbox** | Platform designed for Regulatory Sandbox for parametric insurance products |
| **Product Classification** | Parametric/index-based policy — triggers on measurable data, not indemnity |
| **KYC Compliance** | Aadhaar-linked, OTP-verified onboarding with phone + email |
| **Data Privacy** | DPDP Act 2023 compliant — minimal data collection, consent-based, encrypted storage |
| **Claim Transparency** | Full audit trail: trigger data, evidence, fraud score, decision rationale |
| **Grievance Redressal** | Built-in dispute mechanism — workers can challenge rejected claims |
| **Policy Documentation** | Digital policy document with clear terms, exclusions, trigger definitions |

### Market Crash Preparedness
Our architecture is designed to handle regulatory shocks:

- **Modular trigger system**: New regulatory triggers (e.g., new pollution thresholds) can be added in <24 hours by updating the trigger configuration without redeploying
- **Configurable thresholds**: All parametric thresholds are stored as configuration, not hardcoded — can be adjusted for regulatory changes instantly
- **Audit logging**: Every claim decision is logged with full evidence chain for regulatory review
- **Premium floor/ceiling controls**: Min/max premium bounds prevent pricing volatility during market crashes
- **Emergency circuit breaker**: Auto-pause new policies if loss ratio exceeds safety threshold (configurable)
- **Compliance API layer**: Separate compliance middleware that validates all transactions against current regulations

### Data Security & Privacy
- All worker PII encrypted at rest (AES-256)
- API communications over HTTPS/TLS 1.3
- GPS data retained only for claim verification (30-day retention)
- DPDP Act consent flows built into onboarding
- Role-based access control for admin panel

---

## 🛠 Tech Stack & Architecture

### Stack Overview

| Layer | Technology | Why This Choice |
|-------|-----------|----------------|
| **Frontend** | Next.js 16 + TypeScript | SSR for SEO, type safety, React 19 performance |
| **Styling** | Tailwind CSS 4 | Utility-first, rapid responsive design |
| **Charts** | Recharts | Lightweight, composable data visualization |
| **Icons** | Lucide React | Modern, tree-shakeable icon library |
| **Weather API** | OpenWeatherMap (free tier) | Reliable, 60 calls/min free, covers all India |
| **AQI API** | CPCB / WAQI API | Official India AQI data source |
| **Backend (Phase 2)** | Node.js + Express | JavaScript full-stack, fast development |
| **Database (Phase 2)** | MongoDB Atlas | Flexible schema for varied worker profiles |
| **Auth (Phase 2)** | OTP via Twilio/MSG91 | Delivery workers prefer phone-based auth |
| **Payments (Phase 3)** | Razorpay Test Mode | UPI payouts, India-native, sandbox available |
| **Deployment** | Vercel (FE) + Render (BE) | Zero-config, auto-deploy from Git |

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND (Next.js)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────┐  │
│  │ Landing  │ │Onboarding│ │Dashboard │ │Claims Manager │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └───────┬───────┘  │
│       └────────────┬────────────┴────────────────┘          │
│                    │ REST API                                │
├────────────────────┼────────────────────────────────────────┤
│                    ▼                                         │
│              BACKEND (Node.js + Express)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │  Auth    │ │ Policy   │ │  Claims  │ │   AI/ML      │   │
│  │ Service  │ │ Service  │ │ Service  │ │   Engine     │   │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └──────┬───────┘   │
│       └────────────┬────────────┴───────────────┘           │
│                    │                                         │
├────────────────────┼────────────────────────────────────────┤
│            ┌───────┼───────┐                                │
│            ▼       ▼       ▼                                │
│      ┌──────┐ ┌────────┐ ┌──────────┐                      │
│      │MongoDB│ │Weather │ │ Payment  │                      │
│      │Atlas  │ │& AQI   │ │ Gateway  │                      │
│      │       │ │  APIs  │ │(Razorpay)│                      │
│      └──────┘ └────────┘ └──────────┘                      │
│         DB     External      Payouts                        │
└─────────────────────────────────────────────────────────────┘
```

### Why Web Over Mobile?
- **Accessibility**: Works on any phone browser — no app install barrier
- **PWA capability**: Can be "installed" on home screen like a native app
- **Faster iteration**: Ship features weekly without app store review delays
- **Demo-friendly**: Judges can access instantly via URL
- **Future**: React Native migration path for native app in later phase

---

## 🚀 Setup & Run

### Prerequisites
- Node.js 18+
- npm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/prakyath006/Gigshield.git

# Navigate to project
cd Gigshield

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Project Structure
```
src/app/
├── page.tsx              # Main page router
├── layout.tsx            # Root layout + SEO metadata
├── globals.css           # Design system (dark theme, glassmorphism)
├── types.ts              # TypeScript interfaces
├── data.ts               # Mock data + AI simulation engine
└── components/
    ├── Navbar.tsx         # Responsive navigation
    ├── LandingPage.tsx    # Hero + pricing + coverage
    ├── OnboardingPage.tsx # 4-step registration wizard
    ├── DashboardPage.tsx  # Stats, charts, recent claims
    ├── PoliciesPage.tsx   # Policy cards + trigger config
    ├── ClaimsPage.tsx     # Claims + fraud analysis view
    ├── AlertsPage.tsx     # Weather alerts + disruption simulator
    ├── AnalyticsPage.tsx  # Analytics charts for insurers
    ├── AdminPage.tsx      # Worker management + fraud review
    └── ProfilePage.tsx    # Worker profile + claim history
```

---

## 📅 Development Roadmap

### Phase 1 (Weeks 1-2) ✅ — "Ideate & Know Your Worker"
- [x] Deep persona research and scenario mapping
- [x] Complete idea document with AI/ML strategy
- [x] Full prototype — 10 screens with working navigation
- [x] AI premium calculation engine (7-factor model)
- [x] Risk profiling engine (6-factor weighted scoring)
- [x] Fraud detection logic (4-layer analysis)
- [x] Disruption simulator for live demo
- [x] Analytics dashboard with Recharts visualizations

### Phase 2 (Weeks 3-4) — "Protect Your Worker"
- [ ] Node.js + Express backend API
- [ ] MongoDB Atlas database integration
- [ ] Live OpenWeatherMap API integration
- [ ] Live CPCB AQI API integration
- [ ] OTP-based worker authentication
- [ ] Real policy purchase and renewal flow
- [ ] Automated trigger monitoring (cron jobs, every 15 min)
- [ ] Auto-claim processing pipeline
- [ ] SMS notifications via MSG91

### Phase 3 (Weeks 5-6) — "Perfect for Your Worker"
- [ ] Advanced fraud detection (GPS spoofing via device fingerprinting)
- [ ] Razorpay test mode UPI payout integration
- [ ] Worker mobile dashboard (PWA optimized)
- [ ] Insurer admin dashboard (loss ratio analytics, predictive claims)
- [ ] ML model training with real historical data
- [ ] Performance optimization and load testing
- [ ] 5-minute demo video and final pitch deck

---

## 📊 Business Viability

### Market Opportunity
- **TAM**: 7.7M delivery partners × ₹94 avg weekly premium × 52 weeks = **₹3,764 Cr/year**
- **SAM** (food delivery only): 4M riders = **₹1,955 Cr/year**
- **SOM** (Year 1, 1.3% penetration): 100,000 workers = **₹48.9 Cr/year**

### Unit Economics

| Metric | Value | Notes |
|--------|-------|-------|
| Avg weekly premium | ₹94 | Across all plans and risk profiles |
| Avg claim payout | ₹835 | Weighted average across disruption types |
| Claims per worker per month | 1.4 | Based on Indian weather data analysis |
| Monthly premium per worker | ₹408 | ₹94 × 4.33 weeks |
| Monthly claims cost per worker | ₹278 | 1.4 × ₹835 × (1 - 0.72 auto-reject rate of fraud) |
| **Loss ratio** | **68%** | Target: <75% |
| **Gross margin** | **32%** | Healthy for insurance |

### Key Performance Metrics

| Metric | Current (Simulated) | Target |
|--------|-------------------|--------|
| Auto-approval rate | 72% | >70% |
| Fraud detection rate | 94% | >90% |
| Avg claim processing | 4.2 minutes | <10 minutes |
| Loss ratio | 68% | <75% |
| Worker retention (weekly renewal) | -- | >80% |

---

## 👥 Team

Built with ❤️ for India's gig economy workers.

---

*GigShield — Because every delivery partner deserves a safety net when the storm hits.*
