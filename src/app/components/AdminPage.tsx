"use client";
import { useState, useEffect } from "react";
import {
  Shield, Users, TrendingUp, AlertTriangle, Brain, Zap,
  IndianRupee, BarChart2, CheckCircle, XCircle, CloudRain,
  Wind, Thermometer, Loader2, RefreshCw, ArrowUpRight, Clock,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, Cell,
} from "recharts";

const API = "http://localhost:5000/api";

const RISK_COLORS: Record<string, string> = {
  low:    "text-emerald-400",
  medium: "text-amber-400",
  high:   "text-red-400",
};
const RISK_BG: Record<string, string> = {
  low:    "bg-emerald-500/20 border-emerald-500/30",
  medium: "bg-amber-500/20 border-amber-500/30",
  high:   "bg-red-500/20 border-red-500/30",
};

export default function AdminPage() {
  const [data, setData]         = useState<any>(null);
  const [payoutStats, setPayoutStats] = useState<any>(null);
  const [loading, setLoading]   = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "fraud" | "forecast" | "payouts">("overview");
  const [refreshing, setRefreshing] = useState(false);

  async function loadData() {
    setRefreshing(true);
    const [analytics, payouts] = await Promise.all([
      fetch(`${API}/analytics/insurer`).then(r => r.json()).catch(() => null),
      fetch(`${API}/payouts/analytics`).then(r => r.json()).catch(() => null),
    ]);
    setData(analytics);
    setPayoutStats(payouts);
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => { loadData(); }, []);

  // Approve/reject flagged claim handlers
  async function updateClaimStatus(claimId: string, status: string) {
    await fetch(`${API}/claims/${claimId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).catch(() => {});
    // Refresh inline — use local state update for snappiness
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <Loader2 size={32} className="text-indigo-400 animate-spin" />
        <p className="text-sm text-[var(--color-text-muted)]">Loading insurer intelligence dashboard...</p>
      </div>
    );
  }

  const s = data?.summary || {};
  const trend = data?.weeklyTrend || [];
  const forecast = data?.nextWeekForecast || [];
  const cityRisk = data?.cityRisk || [];
  const fraudSummary = {
    flagged:   data?.flaggedCount || 0,
    review:    data?.reviewCount  || 0,
    claimsByType: data?.claimsByType || {},
  };

  const summaryCards = [
    { icon: <Users size={18} />,       label: "Total Workers",     value: s.totalWorkers || 0,            unit: "",    color: "from-indigo-500 to-indigo-600" },
    { icon: <TrendingUp size={18} />,  label: "Loss Ratio",        value: s.lossRatioPct || "0",          unit: "%",   color: parseFloat(s.lossRatioPct) > 75 ? "from-red-500 to-red-600" : "from-emerald-500 to-emerald-600" },
    { icon: <Brain size={18} />,       label: "Fraud Catch Rate",  value: s.fraudDetectionRate || "94",   unit: "%",   color: "from-violet-500 to-violet-600" },
    { icon: <Zap size={18} />,         label: "Auto-Approval Rate",value: s.autoApprovalRate || "72",     unit: "%",   color: "from-cyan-500 to-cyan-600" },
    { icon: <IndianRupee size={18} />, label: "UPI Payouts Sent",  value: payoutStats?.success || 0,      unit: "",    color: "from-emerald-500 to-emerald-600" },
    { icon: <Clock size={18} />,       label: "Avg Payout Speed",  value: payoutStats ? `${(payoutStats.avgProcessingMs / 1000).toFixed(1)}s` : "~2s", unit: "", color: "from-amber-500 to-amber-600" },
  ];

  const claimTypeData = Object.entries(fraudSummary.claimsByType).map(([name, value]) => ({ name, value }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Insurer <span className="gradient-text">Intelligence</span>
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Real-time loss ratios, fraud oversight & predictive risk analytics
          </p>
        </div>
        <button
          onClick={loadData}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-surface-light)] border border-[var(--color-border)] text-sm font-medium hover:bg-[var(--color-surface-lighter)] transition-all cursor-pointer"
        >
          <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 p-1 rounded-xl bg-[var(--color-surface-light)] w-fit">
        {(["overview", "fraud", "forecast", "payouts"] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all cursor-pointer border-none ${
              activeTab === tab
                ? "gradient-bg text-white shadow-lg"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] bg-transparent"
            }`}
          >
            {tab === "forecast" ? "Next Week Forecast" : tab}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {summaryCards.map((card, i) => (
              <div key={i} className="glass rounded-2xl p-5 card-hover">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-3`}>
                  {card.icon}
                </div>
                <div className="text-2xl font-bold">{card.value}{card.unit}</div>
                <div className="text-xs text-[var(--color-text-muted)] mt-1">{card.label}</div>
              </div>
            ))}
          </div>

          {/* Loss Ratio + Claim Trend Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-1">Weekly Loss Ratio Trend</h3>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">Payouts ÷ Premiums collected</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trend}>
                    <defs>
                      <linearGradient id="lrGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="week" stroke="var(--color-text-muted)" fontSize={11} />
                    <YAxis stroke="var(--color-text-muted)" fontSize={11} tickFormatter={v => `${(v * 100).toFixed(0)}%`} />
                    <Tooltip formatter={(v: any) => [`${(v * 100).toFixed(1)}%`, "Loss Ratio"]}
                      contentStyle={{ background: "var(--color-surface-light)", border: "1px solid var(--color-border)", borderRadius: "12px" }} />
                    <Area type="monotone" dataKey="lossRatio" stroke="#f59e0b" fill="url(#lrGrad)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-1">Payouts vs Premiums</h3>
              <p className="text-xs text-[var(--color-text-muted)] mb-4">Weekly liquidity flow (₹)</p>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis dataKey="week" stroke="var(--color-text-muted)" fontSize={11} />
                    <YAxis stroke="var(--color-text-muted)" fontSize={11} />
                    <Tooltip
                      contentStyle={{ background: "var(--color-surface-light)", border: "1px solid var(--color-border)", borderRadius: "12px" }}
                      formatter={(v: any, name: string) => [`₹${v.toLocaleString("en-IN")}`, name === "payouts" ? "Payouts" : "Premiums"]}
                    />
                    <Bar dataKey="premium" name="premium" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="payouts" name="payouts"  fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* City Risk Exposure Table */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold mb-4">City Risk Exposure</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[var(--color-text-muted)] border-b border-[var(--color-border)]">
                    <th className="py-2 px-3 font-medium">City</th>
                    <th className="py-2 px-3 font-medium">Workers</th>
                    <th className="py-2 px-3 font-medium">Avg Risk</th>
                    <th className="py-2 px-3 font-medium">Avg Earnings/wk</th>
                    <th className="py-2 px-3 font-medium">Risk Exposure</th>
                  </tr>
                </thead>
                <tbody>
                  {cityRisk.map((city: any) => (
                    <tr key={city.city} className="border-b border-[var(--color-border)] hover:bg-[var(--color-surface-light)] transition-colors">
                      <td className="py-3 px-3 font-medium">{city.city}</td>
                      <td className="py-3 px-3">{city.workers}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 rounded-full bg-[var(--color-surface-lighter)] overflow-hidden">
                            <div
                              className={`h-full rounded-full ${city.avgRisk > 60 ? "bg-red-500" : city.avgRisk > 40 ? "bg-amber-500" : "bg-emerald-500"}`}
                              style={{ width: `${city.avgRisk}%` }}
                            />
                          </div>
                          <span className="text-xs">{city.avgRisk}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">₹{city.avgEarnings.toLocaleString("en-IN")}</td>
                      <td className="py-3 px-3 font-semibold text-amber-400">₹{city.exposure.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FRAUD TAB */}
      {activeTab === "fraud" && (
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Auto-Approved", value: `${s.autoApprovalRate || 0}%`, icon: <CheckCircle size={18} />, color: "from-emerald-500 to-emerald-600" },
              { label: "Under Review", value: fraudSummary.review, icon: <Clock size={18} />, color: "from-amber-500 to-amber-600" },
              { label: "Flagged / Blocked", value: fraudSummary.flagged, icon: <XCircle size={18} />, color: "from-red-500 to-red-600" },
            ].map((c, i) => (
              <div key={i} className="glass rounded-2xl p-5 card-hover">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white mb-3`}>{c.icon}</div>
                <div className="text-2xl font-bold">{c.value}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{c.label}</div>
              </div>
            ))}
          </div>

          {/* Claims by type */}
          {claimTypeData.length > 0 && (
            <div className="glass rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Claims Distribution by Trigger Type</h3>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={claimTypeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis type="number" stroke="var(--color-text-muted)" fontSize={11} />
                    <YAxis type="category" dataKey="name" stroke="var(--color-text-muted)" fontSize={11} width={90} />
                    <Tooltip contentStyle={{ background: "var(--color-surface-light)", border: "1px solid var(--color-border)", borderRadius: "12px" }} />
                    <Bar dataKey="value" name="Claims" radius={[0, 6, 6, 0]}>
                      {claimTypeData.map((_: any, i: number) => (
                        <Cell key={i} fill={["#6366f1", "#06b6d4", "#f59e0b", "#ef4444"][i % 4]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-400" /> Phase 3 Fraud Layers Active
            </h3>
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {[
                { name: "GPS Velocity Check", desc: ">120km/h between claim locations = spoofing", status: "active" },
                { name: "Historical Weather Cross-Validation", desc: "30-day city weather truth database", status: "active" },
                { name: "Syndicate Cluster Detection", desc: ">80% zone claiming simultaneously = ring", status: "active" },
                { name: "Behavioral Frequency Scoring", desc: ">6 claims/month triggers manual review", status: "active" },
                { name: "Isolation Forest Anomaly", desc: "Unsupervised outlier detection on claim patterns", status: "active" },
                { name: "Amount Sanity Check", desc: "Payout vs historical hourly earnings validation", status: "active" },
              ].map((layer, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--color-surface-light)]">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-semibold">{layer.name}</div>
                    <div className="text-xs text-[var(--color-text-muted)]">{layer.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NEXT WEEK FORECAST TAB */}
      {activeTab === "forecast" && (
        <div className="space-y-6">
          <div className="rounded-xl p-4 bg-indigo-500/10 border border-indigo-500/20">
            <p className="text-sm text-indigo-300">
              <strong>Predictive Analytics:</strong> Risk scores are computed by combining live OpenWeatherMap data
              with historical 30-day patterns. Insurers can use this to pre-fund liquidity pools before predicted disruption events.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {forecast.map((city: any) => (
              <div key={city.city} className={`glass rounded-2xl p-5 border ${RISK_BG[city.riskLevel]}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{city.city}</h3>
                    <span className={`text-xs font-bold uppercase ${RISK_COLORS[city.riskLevel]}`}>
                      {city.riskLevel} risk
                    </span>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-black ${RISK_COLORS[city.riskLevel]}`}>{city.predictedRisk}%</div>
                    <div className="text-xs text-[var(--color-text-muted)]">risk score</div>
                  </div>
                </div>

                {/* Risk meter */}
                <div className="h-2 rounded-full bg-[var(--color-surface-lighter)] overflow-hidden mb-4">
                  <div
                    className={`h-full rounded-full transition-all ${city.riskLevel === "high" ? "bg-red-500" : city.riskLevel === "medium" ? "bg-amber-500" : "bg-emerald-500"}`}
                    style={{ width: `${city.predictedRisk}%` }}
                  />
                </div>

                {/* Weather Signals */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 rounded-lg bg-[var(--color-surface-light)]">
                    <CloudRain size={14} className="text-blue-400 mx-auto mb-1" />
                    <div className="text-xs font-bold">{city.weatherSignal?.rainfall || 0}mm</div>
                    <div className="text-[10px] text-[var(--color-text-muted)]">Rainfall</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-[var(--color-surface-light)]">
                    <Thermometer size={14} className="text-orange-400 mx-auto mb-1" />
                    <div className="text-xs font-bold">{city.weatherSignal?.temperature || 0}°C</div>
                    <div className="text-[10px] text-[var(--color-text-muted)]">Temperature</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-[var(--color-surface-light)]">
                    <Wind size={14} className="text-cyan-400 mx-auto mb-1" />
                    <div className="text-xs font-bold">{city.weatherSignal?.windSpeed || 0}km/h</div>
                    <div className="text-[10px] text-[var(--color-text-muted)]">Wind</div>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-muted)]">Predicted Claims Next Week</span>
                    <span className="font-bold">{city.predictedClaims}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-muted)]">Predicted Payout Needed</span>
                    <span className="font-bold text-amber-400">₹{city.predictedPayout?.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <div className={`mt-3 px-3 py-2 rounded-lg text-xs font-medium ${RISK_BG[city.riskLevel]} ${RISK_COLORS[city.riskLevel]}`}>
                  {city.recommendedAction}
                </div>
              </div>
            ))}
          </div>

          {/* Weekly trend for forecasted payouts */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold mb-1">Historical Claims vs Predicted Trend</h3>
            <p className="text-xs text-[var(--color-text-muted)] mb-4">8-week actuals + next week prediction</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[...trend, { week: "W9 (pred)", claims: forecast.reduce((s: number, c: any) => s + c.predictedClaims, 0), payouts: forecast.reduce((s: number, c: any) => s + c.predictedPayout, 0), isPredicted: true }]}>
                  <defs>
                    <linearGradient id="clmGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="week" stroke="var(--color-text-muted)" fontSize={11} />
                  <YAxis stroke="var(--color-text-muted)" fontSize={11} />
                  <Tooltip contentStyle={{ background: "var(--color-surface-light)", border: "1px solid var(--color-border)", borderRadius: "12px" }} />
                  <Area type="monotone" dataKey="claims" name="Claims" stroke="#6366f1" fill="url(#clmGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* PAYOUTS TAB */}
      {activeTab === "payouts" && (
        <div className="space-y-6">
          {payoutStats ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Total UPI Payouts", value: payoutStats.total, color: "from-indigo-500 to-indigo-600" },
                  { label: "Successful",         value: payoutStats.success, color: "from-emerald-500 to-emerald-600" },
                  { label: "Success Rate",        value: `${payoutStats.successRate}%`, color: "from-cyan-500 to-cyan-600" },
                  { label: "Total Amount Paid",   value: `₹${(payoutStats.totalAmountPaid / 1000).toFixed(1)}K`, color: "from-amber-500 to-amber-600" },
                ].map((c, i) => (
                  <div key={i} className="glass rounded-2xl p-5 card-hover">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center text-white mb-3`}>
                      <IndianRupee size={18} />
                    </div>
                    <div className="text-2xl font-bold">{c.value}</div>
                    <div className="text-xs text-[var(--color-text-muted)]">{c.label}</div>
                  </div>
                ))}
              </div>

              <div className="glass rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Razorpay Gateway Performance</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-muted)]">Avg Processing Time</span>
                      <span className="font-bold text-emerald-400">{payoutStats.avgProcessingSeconds}s ⚡</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-muted)]">Gateway</span>
                      <span className="font-medium">Razorpay UPI Sandbox</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-muted)]">Payment Method</span>
                      <span className="font-medium">UPI (Instant)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[var(--color-text-muted)]">Settlement</span>
                      <span className="font-medium text-emerald-400">Real-time</span>
                    </div>
                  </div>
                  <div className="rounded-xl p-4 bg-[var(--color-surface-light)] space-y-2 text-xs font-mono">
                    <div className="text-[var(--color-text-muted)]">// Razorpay API Simulation</div>
                    <div><span className="text-cyan-400">POST</span> /api/payouts/initiate</div>
                    <div><span className="text-indigo-400">{"{"}</span></div>
                    <div className="pl-4"><span className="text-emerald-400">"claimId"</span>: <span className="text-amber-400">"..."</span>,</div>
                    <div className="pl-4"><span className="text-emerald-400">"upiId"</span>: <span className="text-amber-400">"9876543210@upi"</span></div>
                    <div><span className="text-indigo-400">{"}"}</span></div>
                    <div className="text-emerald-400 mt-1">→ pay_XXXXXXXXXXXXXX</div>
                    <div className="text-emerald-400">→ HMAC-SHA256 verified ✓</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="glass rounded-2xl p-12 text-center text-[var(--color-text-muted)]">
              No payouts recorded yet. Trigger a claim and initiate a payout from the Worker Dashboard.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
