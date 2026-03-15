"use client";
import {
  Users,
  Shield,
  Zap,
  IndianRupee,
  TrendingUp,
  AlertTriangle,
  Clock,
  Brain,
  CloudRain,
  CheckCircle,
} from "lucide-react";
import { mockDashboardMetrics, mockAlerts, weeklyClaimsData, mockClaims } from "../data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function DashboardPage() {
  const m = mockDashboardMetrics;

  const statCards = [
    { icon: <Users size={20} />, label: "Active Workers", value: m.totalWorkers.toLocaleString(), color: "from-indigo-500 to-indigo-600", change: "+124 this week" },
    { icon: <Shield size={20} />, label: "Active Policies", value: m.activePolicies.toLocaleString(), color: "from-cyan-500 to-cyan-600", change: "75.7% coverage" },
    { icon: <Zap size={20} />, label: "Claims This Week", value: m.totalClaimsThisWeek.toString(), color: "from-amber-500 to-amber-600", change: "+96.7% vs last week" },
    { icon: <IndianRupee size={20} />, label: "Payouts This Week", value: `₹${(m.totalPayoutsThisWeek / 1000).toFixed(1)}K`, color: "from-emerald-500 to-emerald-600", change: `₹${m.avgPremiumPerWeek} avg premium` },
    { icon: <TrendingUp size={20} />, label: "Loss Ratio", value: `${(m.lossRatio * 100).toFixed(0)}%`, color: "from-rose-500 to-rose-600", change: "Target: <75%" },
    { icon: <Brain size={20} />, label: "Fraud Detection", value: `${(m.fraudDetectionRate * 100).toFixed(0)}%`, color: "from-violet-500 to-violet-600", change: `${(m.autoApprovalRate * 100).toFixed(0)}% auto-approved` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="gradient-text">Rajesh</span>
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          Here&apos;s your GigShield overview for this week
        </p>
      </div>

      {/* Active Alert Banner */}
      {mockAlerts.filter((a) => a.isActive).length > 0 && (
        <div className="rounded-2xl p-4 bg-gradient-to-r from-amber-500/10 to-red-500/10 border border-amber-500/30 flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="font-semibold text-amber-300 text-sm">
              {mockAlerts.filter((a) => a.isActive).length} Active Weather Alerts
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">
              {mockAlerts.find((a) => a.isActive)?.message}
            </p>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 font-medium">
            {mockAlerts.find((a) => a.isActive)?.affectedWorkers} workers affected
          </span>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="glass rounded-2xl p-5 card-hover">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white`}>
                {card.icon}
              </div>
            </div>
            <div className="text-2xl font-bold">{card.value}</div>
            <div className="text-sm text-[var(--color-text-muted)]">{card.label}</div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-2">{card.change}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Claims Trend */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold mb-1">Weekly Claims & Premium Trend</h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">Last 7 weeks</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyClaimsData}>
                <defs>
                  <linearGradient id="claimsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="premiumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" stroke="var(--color-text-muted)" fontSize={12} />
                <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "var(--color-surface-light)", border: "1px solid var(--color-border)", borderRadius: "12px", color: "var(--color-text-primary)" }}
                />
                <Area type="monotone" dataKey="payouts" name="Payouts (₹)" stroke="#6366f1" fill="url(#claimsGrad)" strokeWidth={2} />
                <Area type="monotone" dataKey="premium" name="Premium (₹)" stroke="#06b6d4" fill="url(#premiumGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Claims by Type */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold mb-1">Claims Volume by Week</h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">Number of claims filed</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyClaimsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="week" stroke="var(--color-text-muted)" fontSize={12} />
                <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                <Tooltip
                  contentStyle={{ background: "var(--color-surface-light)", border: "1px solid var(--color-border)", borderRadius: "12px", color: "var(--color-text-primary)" }}
                />
                <Bar dataKey="claims" name="Claims" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Claims */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold mb-4">Recent Claims Activity</h3>
        <div className="space-y-3">
          {mockClaims.slice(0, 4).map((claim) => {
            const statusColors: Record<string, string> = {
              paid: "bg-emerald-500/20 text-emerald-400",
              auto_approved: "bg-indigo-500/20 text-indigo-400",
              approved: "bg-cyan-500/20 text-cyan-400",
              under_review: "bg-amber-500/20 text-amber-400",
              flagged: "bg-red-500/20 text-red-400",
              rejected: "bg-red-500/20 text-red-400",
            };
            const statusIcons: Record<string, React.ReactNode> = {
              paid: <CheckCircle size={14} />,
              auto_approved: <Zap size={14} />,
              approved: <CheckCircle size={14} />,
              under_review: <Clock size={14} />,
              flagged: <AlertTriangle size={14} />,
            };
            return (
              <div key={claim.id} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface-light)] hover:bg-[var(--color-surface-lighter)] transition-all">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center">
                  <CloudRain size={18} className="text-[var(--color-primary-light)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{claim.workerName}</div>
                  <div className="text-xs text-[var(--color-text-muted)] truncate">{claim.disruptionEvent}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm">₹{claim.amount}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{claim.lostHours}hrs lost</div>
                </div>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[claim.status]}`}>
                  {statusIcons[claim.status]}
                  {claim.status.replace("_", " ")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
