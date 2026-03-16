"use client";
import { Shield, ChevronRight, CheckCircle, Clock, XCircle, RefreshCw } from "lucide-react";
import { mockPolicies, defaultTriggers } from "../data";

export default function PoliciesPage() {
  const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
    active: { color: "bg-emerald-500/20 text-emerald-400", icon: <CheckCircle size={14} /> },
    expired: { color: "bg-red-500/20 text-red-400", icon: <XCircle size={14} /> },
    pending: { color: "bg-amber-500/20 text-amber-400", icon: <Clock size={14} /> },
    cancelled: { color: "bg-gray-500/20 text-gray-400", icon: <XCircle size={14} /> },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Insurance <span className="gradient-text">Policies</span></h1>
          <p className="text-[var(--color-text-secondary)] mt-1">Manage weekly income protection policies</p>
        </div>
        <button className="btn-primary inline-flex items-center gap-2">
          <Shield size={16} /> New Policy
        </button>
      </div>

      {/* Policy Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {mockPolicies.map((policy) => (
          <div key={policy.id} className="glass rounded-2xl p-6 card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${
                  policy.plan === "premium" ? "bg-gradient-to-br from-violet-500 to-violet-600" :
                  policy.plan === "standard" ? "bg-gradient-to-br from-indigo-500 to-indigo-600" :
                  "bg-gradient-to-br from-cyan-500 to-cyan-600"
                }`}>
                  <Shield size={18} />
                </div>
                <div>
                  <div className="font-semibold">{policy.workerName}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{policy.id}</div>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusConfig[policy.status]?.color}`}>
                {statusConfig[policy.status]?.icon}
                {policy.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-[var(--color-surface)]">
                <div className="text-xs text-[var(--color-text-muted)]">Premium</div>
                <div className="font-bold">₹{policy.weeklyPremium}<span className="text-xs font-normal text-[var(--color-text-muted)]">/wk</span></div>
              </div>
              <div className="p-3 rounded-xl bg-[var(--color-surface)]">
                <div className="text-xs text-[var(--color-text-muted)]">Coverage</div>
                <div className="font-bold">₹{policy.coverageAmount.toLocaleString()}</div>
              </div>
              <div className="p-3 rounded-xl bg-[var(--color-surface)]">
                <div className="text-xs text-[var(--color-text-muted)]">Max Payout</div>
                <div className="font-bold">₹{policy.maxPayoutPerEvent.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)]">
              <span>Plan: <span className="text-[var(--color-text-primary)] capitalize">{policy.plan}</span></span>
              <span>Platform: <span className="text-[var(--color-text-primary)] capitalize">{policy.platform}</span></span>
              <span className="inline-flex items-center gap-1">
                {policy.autoRenew ? <><RefreshCw size={12} className="text-emerald-400" /> Auto-renew</> : "Manual"}
              </span>
            </div>

            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <div className="text-xs text-[var(--color-text-muted)] mb-2">Active Triggers ({policy.triggers.filter(t => t.isActive).length})</div>
              <div className="flex flex-wrap gap-1">
                {policy.triggers.filter(t => t.isActive).slice(0, 4).map((trigger) => (
                  <span key={trigger.id} className="px-2 py-0.5 rounded-full text-xs bg-[var(--color-surface)] text-[var(--color-text-secondary)]">
                    {trigger.name}
                  </span>
                ))}
                {policy.triggers.filter(t => t.isActive).length > 4 && (
                  <span className="px-2 py-0.5 rounded-full text-xs bg-[var(--color-primary)]/20 text-[var(--color-primary-light)]">
                    +{policy.triggers.filter(t => t.isActive).length - 4} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Triggers Reference */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Parametric Disruption Triggers</h3>
        <div className="grid md:grid-cols-2 gap-3">
          {defaultTriggers.map((trigger) => (
            <div key={trigger.id} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface)]">
              <div className={`w-2 h-8 rounded-full ${trigger.isActive ? "bg-emerald-400" : "bg-gray-600"}`} />
              <div className="flex-1">
                <div className="text-sm font-medium flex items-center gap-2">
                  {trigger.name}
                  <span className={`text-xs px-1.5 py-0.5 rounded ${trigger.type === "weather" ? "bg-blue-500/20 text-blue-400" : trigger.type === "environmental" ? "bg-amber-500/20 text-amber-400" : trigger.type === "social" ? "bg-red-500/20 text-red-400" : "bg-violet-500/20 text-violet-400"}`}>
                    {trigger.type}
                  </span>
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">{trigger.description} — Threshold: {trigger.threshold}</div>
              </div>
              <div className={`w-3 h-3 rounded-full ${trigger.isActive ? "bg-emerald-400 animate-pulse-glow" : "bg-gray-600"}`} style={{ boxShadow: "none" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
