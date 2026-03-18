"use client";
import { Shield, User, MapPin, Bike, IndianRupee, Clock, Zap, CheckCircle } from "lucide-react";
import { mockWorkers, mockPolicies, mockClaims } from "../data";

export default function ProfilePage() {
  const worker = mockWorkers[0];
  const policy = mockPolicies[0];
  const workerClaims = mockClaims.filter(c => c.workerId === worker.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <h1 className="text-3xl font-bold">My <span className="gradient-text">Profile</span></h1>

      {/* Profile Card */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center text-white text-2xl font-bold">
            {worker.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold">{worker.name}</h2>
            <div className="text-sm text-[var(--color-text-secondary)]">{worker.phone} • {worker.email}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/20 text-indigo-400 capitalize">{worker.platform}</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400">{worker.city}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: <MapPin size={16} />, label: "Zone", value: worker.zone },
            { icon: <Bike size={16} />, label: "Vehicle", value: worker.vehicleType.replace("_", " ") },
            { icon: <IndianRupee size={16} />, label: "Avg Earnings", value: `₹${worker.avgWeeklyEarnings}/wk` },
            { icon: <Clock size={16} />, label: "Avg Hours", value: `${worker.avgWeeklyHours}hrs/wk` },
          ].map((item, i) => (
            <div key={i} className="p-3 rounded-xl bg-[var(--color-surface)]">
              <div className="text-[var(--color-primary-light)] mb-1">{item.icon}</div>
              <div className="text-xs text-[var(--color-text-muted)]">{item.label}</div>
              <div className="text-sm font-semibold capitalize">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Policy */}
      {policy && (
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Shield size={16} /> Active Policy</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-[var(--color-surface)]">
              <div className="text-xs text-[var(--color-text-muted)]">Plan</div>
              <div className="font-bold capitalize">{policy.plan}</div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--color-surface)]">
              <div className="text-xs text-[var(--color-text-muted)]">Premium</div>
              <div className="font-bold">₹{policy.weeklyPremium}/wk</div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--color-surface)]">
              <div className="text-xs text-[var(--color-text-muted)]">Coverage</div>
              <div className="font-bold">₹{policy.coverageAmount.toLocaleString()}</div>
            </div>
            <div className="p-3 rounded-xl bg-[var(--color-surface)]">
              <div className="text-xs text-[var(--color-text-muted)]">Status</div>
              <div className="font-bold text-emerald-400 flex items-center gap-1"><CheckCircle size={14} /> Active</div>
            </div>
          </div>
          <div className="text-xs text-[var(--color-text-muted)]">
            Period: {policy.startDate} to {policy.endDate} • Covered hours: {policy.coverageHoursPerWeek}hrs/week
          </div>
        </div>
      )}

      {/* Claim History */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2"><Zap size={16} /> My Claims</h3>
        {workerClaims.length > 0 ? (
          <div className="space-y-3">
            {workerClaims.map((claim) => (
              <div key={claim.id} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface)]">
                <div className="flex-1">
                  <div className="font-medium text-sm">{claim.disruptionEvent}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{claim.eventDate} • {claim.lostHours}hrs lost</div>
                </div>
                <div className="text-right">
                  <div className="font-bold">₹{claim.amount}</div>
                  <span className={`text-xs ${claim.status === "paid" ? "text-emerald-400" : "text-amber-400"}`}>
                    {claim.status.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--color-text-muted)]">No claims filed yet</p>
        )}

        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20">
          <div className="text-sm font-semibold text-emerald-400">💰 Total Earnings Protected</div>
          <div className="text-2xl font-bold mt-1">₹{workerClaims.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}</div>
          <div className="text-xs text-[var(--color-text-muted)]">across {workerClaims.length} claims this month</div>
        </div>
      </div>
    </div>
  );
}
