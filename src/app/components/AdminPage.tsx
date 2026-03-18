"use client";
import { Shield, Users, Search, CheckCircle, XCircle, Clock, AlertTriangle, Brain, Zap } from "lucide-react";
import { mockWorkers, mockClaims, mockPolicies, mockDashboardMetrics } from "../data";

export default function AdminPage() {
  const m = mockDashboardMetrics;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin <span className="gradient-text">Panel</span></h1>
        <p className="text-[var(--color-text-secondary)] mt-1">Insurer admin dashboard — worker management & fraud oversight</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Workers", value: m.totalWorkers.toLocaleString(), icon: <Users size={18} />, color: "from-indigo-500 to-indigo-600" },
          { label: "Loss Ratio", value: `${(m.lossRatio * 100).toFixed(0)}%`, icon: <AlertTriangle size={18} />, color: "from-amber-500 to-amber-600" },
          { label: "Fraud Catch Rate", value: `${(m.fraudDetectionRate * 100).toFixed(0)}%`, icon: <Brain size={18} />, color: "from-violet-500 to-violet-600" },
          { label: "Auto-Approval", value: `${(m.autoApprovalRate * 100).toFixed(0)}%`, icon: <Zap size={18} />, color: "from-emerald-500 to-emerald-600" },
        ].map((card, i) => (
          <div key={i} className="glass rounded-2xl p-4 card-hover">
            <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-2`}>{card.icon}</div>
            <div className="text-xl font-bold">{card.value}</div>
            <div className="text-xs text-[var(--color-text-muted)]">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Workers Table */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Registered Workers</h3>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input className="input-field pl-9 w-60" placeholder="Search workers..." />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-text-muted)] border-b border-[var(--color-border)]">
                <th className="py-3 px-3 font-medium">Worker</th>
                <th className="py-3 px-3 font-medium">Platform</th>
                <th className="py-3 px-3 font-medium">City</th>
                <th className="py-3 px-3 font-medium">Earnings/wk</th>
                <th className="py-3 px-3 font-medium">Risk Score</th>
                <th className="py-3 px-3 font-medium">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {mockWorkers.map((worker) => (
                <tr key={worker.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-surface-light)] transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-medium">{worker.name}</div>
                    <div className="text-xs text-[var(--color-text-muted)]">{worker.id}</div>
                  </td>
                  <td className="py-3 px-3 capitalize">{worker.platform}</td>
                  <td className="py-3 px-3">
                    <div>{worker.city}</div>
                    <div className="text-xs text-[var(--color-text-muted)]">{worker.zone}</div>
                  </td>
                  <td className="py-3 px-3 font-medium">₹{worker.avgWeeklyEarnings.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-[var(--color-surface-lighter)] overflow-hidden">
                        <div className={`h-full rounded-full ${worker.riskScore > 60 ? "bg-red-500" : worker.riskScore > 40 ? "bg-amber-500" : "bg-emerald-500"}`}
                          style={{ width: `${worker.riskScore}%` }} />
                      </div>
                      <span className="text-xs">{worker.riskScore}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      worker.riskLevel === "low" ? "bg-emerald-500/20 text-emerald-400" :
                      worker.riskLevel === "medium" ? "bg-amber-500/20 text-amber-400" :
                      "bg-red-500/20 text-red-400"
                    }`}>
                      {worker.riskLevel}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Flagged Claims */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-400" /> Flagged Claims — Fraud Review
        </h3>
        <div className="space-y-3">
          {mockClaims.filter(c => c.fraudScore > 20).map((claim) => (
            <div key={claim.id} className={`p-4 rounded-xl border ${claim.fraudScore > 70 ? "border-red-500/30 bg-red-500/5" : "border-amber-500/30 bg-amber-500/5"}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="font-medium">{claim.workerName}</div>
                  <span className="text-xs text-[var(--color-text-muted)]">{claim.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">Fraud: {claim.fraudScore}%</span>
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-all cursor-pointer border-none">
                      <CheckCircle size={14} />
                    </button>
                    <button className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all cursor-pointer border-none">
                      <XCircle size={14} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-sm text-[var(--color-text-secondary)]">{claim.description}</div>
              {claim.fraudFlags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {claim.fraudFlags.map((flag, i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-red-500/20 text-red-400">⚠ {flag.replace(/_/g, " ")}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
