// ============================================================
// Floor — Backend API Service Layer
// Connects the Next.js frontend to the Express backend
// ============================================================

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ─── Health Check ────────────────────────────────────────────
export async function checkBackendHealth(): Promise<{ status: string; service: string } | null> {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── Weather & Triggers ──────────────────────────────────────
export interface LiveWeatherResponse {
  weather: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    rainfall: number;
    windSpeed: number | string;
    condition: string;
    city: string;
    source: string;
  };
  aqi: {
    aqi: number;
    aqiCategory: string;
    city: string;
    source: string;
  };
  triggeredEvents: Array<{
    name: string;
    type: string;
    severity: string;
    threshold: string;
    value: number | string;
  }>;
}

export async function fetchLiveWeather(city: string): Promise<LiveWeatherResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/triggers/weather/${encodeURIComponent(city)}`, {
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── Trigger Simulation ──────────────────────────────────────
export interface TriggerSimulationRequest {
  city: string;
  triggerType: string;
  triggerName: string;
  severity?: "high" | "medium" | "low";
}

export interface TriggerSimulationResponse {
  message: string;
  triggeredWorkers: number;
  activePolicies: number;
  claims: Array<{
    _id: string;
    workerName: string;
    amount: number;
    lostHours: number;
    fraudScore: number;
    status: string;
  }>;
}

export async function simulateTrigger(data: TriggerSimulationRequest): Promise<TriggerSimulationResponse | null> {
  try {
    const res = await fetch(`${API_BASE}/triggers/simulate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── Workers ─────────────────────────────────────────────────
export async function fetchWorkers() {
  try {
    const res = await fetch(`${API_BASE}/workers`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function createWorker(workerData: Record<string, unknown>) {
  try {
    const res = await fetch(`${API_BASE}/workers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workerData),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── Claims ──────────────────────────────────────────────────
export async function fetchClaims() {
  try {
    const res = await fetch(`${API_BASE}/claims`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── Policies ────────────────────────────────────────────────
export async function fetchPolicies() {
  try {
    const res = await fetch(`${API_BASE}/policies`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function createPolicy(policyData: Record<string, unknown>) {
  try {
    const res = await fetch(`${API_BASE}/policies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(policyData),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ─── Dashboard ────────────────────────────────────────────────
export async function fetchDashboardMetrics() {
  try {
    const res = await fetch(`${API_BASE}/dashboard`, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
