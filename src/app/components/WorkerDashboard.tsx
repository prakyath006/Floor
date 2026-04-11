"use client";
import { useState, useEffect } from "react";
import {
  Shield, IndianRupee, TrendingUp, Zap, Clock, CheckCircle,
  AlertTriangle, Wallet, ArrowUpRight, Loader2, X, ExternalLink,
  Copy, Check,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const API = "http://localhost:5000/api";

interface PayoutResult {
  success: boolean;
  message: string;
  payout?: any;
  gateway?: any;
}

interface PayoutModalProps {
  claim: any;
  onClose: () => void;
  onSuccess: (result: PayoutResult) => void;
}

// ── Razorpay Payout simulation modal ──────────────────────────
function PayoutModal({ claim, onClose, onSuccess }: PayoutModalProps) {
  const [step, setStep] = useState<"confirm" | "processing" | "done">("confirm");
  const [result, setResult] = useState<PayoutResult | null>(null);
  const [copied, setCopied]  = useState(false);
  const derivedUPI = `${claim.workerName?.toLowerCase().replace(/\s/g, "").slice(0, 8)}@upi`;

  async function initiatePayout() {
    setStep("processing");
    try {
      const res = await fetch(`${API}/payouts/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claimId: claim._id, upiId: derivedUPI }),
      });
      const data = await res.json();
      setResult(data);
      setStep("done");
      if (data.success) onSuccess(data);
    } catch {
      setResult({ success: false, message: "Network error — backend may be offline" });
      setStep("done");
    }
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass rounded-3xl w-full max-w-md p-6 space-y-5 border border-[var(--color-border)]">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
              <Wallet size={20} className="text-white" />
            </div>
            <div>
              <div className="font-bold">Instant UPI Payout</div>
              <div className="text-xs text-[var(--color-text-muted)]">Powered by Razorpay Sandbox</div>
            </div>
          </div>
          {step !== "processing" && (
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-[var(--color-surface-light)] transition-all border-none cursor-pointer">
              <X size={16} className="text-[var(--color-text-muted)]" />
            </button>
          )}
        </div>

        {/* Confirm Step */}
        {step === "confirm" && (
          <>
            <div className="rounded-2xl bg-[var(--color-surface-light)] p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Beneficiary</span>
                <span className="font-semibold">{claim.workerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">UPI ID</span>
                <span className="font-mono text-[var(--color-primary-light)]">{derivedUPI}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">Claim Reason</span>
                <span className="font-medium">{claim.disruptionEvent}</span>
              </div>
              <div className="border-t border-[var(--color-border)] pt-3 flex justify-between">
                <span className="text-[var(--color-text-muted)]">Payout Amount</span>
                <span className="text-2xl font-bold text-emerald-400">₹{claim.amount}</span>
              </div>
            </div>
            <div className="rounded-xl p-3 bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
              <strong>Razorpay Sandbox Mode</strong> — This simulates a real UPI transfer using Razorpay test APIs. 
              In production, ₹{claim.amount} would hit the worker's registered UPI in ~2 seconds.
            </div>
            <button onClick={initiatePayout} className="w-full py-3 rounded-xl font-bold btn-primary flex items-center justify-center gap-2">
              <Zap size={16} /> Send ₹{claim.amount} via UPI Now
            </button>
          </>
        )}

        {/* Processing Step */}
        {step === "processing" && (
          <div className="py-10 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Wallet size={24} className="text-indigo-400" />
              </div>
            </div>
            <div className="text-center space-y-1">
              <div className="font-bold">Processing via Razorpay UPI</div>
              <div className="text-sm text-[var(--color-text-muted)]">Creating order → Initiating transfer → Verifying...</div>
            </div>
            <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <Loader2 size={12} className="animate-spin" />
              Contacting payment gateway...
            </div>
          </div>
        )}

        {/* Done Step */}
        {step === "done" && result && (
          <div className="space-y-4">
            <div className={`rounded-2xl p-4 ${result.success ? "bg-emerald-500/10 border border-emerald-500/30" : "bg-red-500/10 border border-red-500/30"}`}>
              <div className="flex items-center gap-3 mb-3">
                {result.success
                  ? <CheckCircle size={24} className="text-emerald-400" />
                  : <AlertTriangle size={24} className="text-red-400" />}
                <div>
                  <div className={`font-bold ${result.success ? "text-emerald-300" : "text-red-300"}`}>
                    {result.success ? "Payment Successful!" : "Payment Failed"}
                  </div>
                  <div className="text-xs text-[var(--color-text-muted)]">
                    {result.success ? `₹${claim.amount} credited to ${derivedUPI}` : result.message}
                  </div>
                </div>
              </div>
              {result.success && result.payout && (
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--color-text-muted)]">Payment ID</span>
                    <div className="flex items-center gap-1">
                      <span className="text-emerald-300">{result.payout.gatewayPaymentId}</span>
                      <button onClick={() => copyToClipboard(result.payout.gatewayPaymentId)} className="border-none bg-transparent cursor-pointer">
                        {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} className="text-[var(--color-text-muted)]" />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-muted)]">Order ID</span>
                    <span className="text-[var(--color-text-secondary)]">{result.payout.gatewayOrderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-muted)]">Processing Time</span>
                    <span className="text-amber-300 font-bold">{result.payout.processingMs}ms ⚡</span>
                  </div>
                </div>
              )}
            </div>
            <button onClick={onClose} className="w-full py-2.5 rounded-xl font-semibold border border-[var(--color-border)] hover:bg-[var(--color-surface-light)] transition-all bg-transparent text-[var(--color-text-primary)] cursor-pointer">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Worker Dashboard ──────────────────────────────────────
export default function WorkerDashboard() {
  const { currentWorker } = useApp();
  const [analytics, setAnalytics]   = useState<any>(null);
  const [loading, setLoading]        = useState(true);
  const [payoutClaim, setPayoutClaim] = useState<any>(null);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!currentWorker) return;

    async function loadData() {
      // First try to resolve the real MongoDB _id by matching phone number
      // This handles the case where AppContext has mock data with id="WRK-001"
      let mongoId = (currentWorker as any)._id;

      if (!mongoId) {
        try {
          const workers = await fetch(`${API}/workers`).then(r => r.json());
          const phone = (currentWorker as any).phone;
          const match = workers?.find((w: any) =>
            w.phone === phone ||
            w.name === currentWorker.name
          );
          mongoId = match?._id;
        } catch {}
      }

      if (!mongoId) {
        setLoading(false);
        return;
      }

      const [analyticsData, payoutsData] = await Promise.all([
        fetch(`${API}/analytics/worker/${mongoId}`).then(r => r.json()).catch(() => null),
        fetch(`${API}/payouts/worker/${mongoId}`).then(r => r.json()).catch(() => []),
      ]);
      setAnalytics(analyticsData);
      setPaymentHistory(Array.isArray(payoutsData) ? payoutsData : []);
      setLoading(false);
    }

    loadData();
  }, [currentWorker]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 size={32} className="text-indigo-400 animate-spin" />
      </div>
    );
  }

  // Fallback values if backend offline
  const cov = analytics?.coverage || {
    activePolicies: 0, totalWeeklyCoverage: 0, weeklyPremiumPaid: 0,
    weeklyProtectionRatio: 0, earningsProtected: "₹0 / week",
  };
  const clm = analytics?.claims || { total: 0, paid: 0, pending: 0, flagged: 0, totalReceived: 0, recentClaims: [] };
  const workerInfo = analytics?.worker || currentWorker;

  const protectionCards = [
    {
      icon: <Shield size={20} />,
      label: "Earnings Protected",
      value: cov.earningsProtected,
      sub: `${cov.weeklyProtectionRatio}% of weekly income`,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      icon: <IndianRupee size={20} />,
      label: "Weekly Premium Paid",
      value: `₹${cov.weeklyPremiumPaid}`,
      sub: `${cov.activePolicies} active plan${cov.activePolicies !== 1 ? "s" : ""}`,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      icon: <Zap size={20} />,
      label: "Payouts Received",
      value: `₹${clm.totalReceived.toLocaleString("en-IN")}`,
      sub: `${clm.paid} claims paid`,
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: <Clock size={20} />,
      label: "Pending Claims",
      value: clm.pending.toString(),
      sub: `${clm.total} total filed`,
      color: "from-amber-500 to-amber-600",
    },
  ];

  const statusColors: Record<string, string> = {
    paid:           "bg-emerald-500/20 text-emerald-400",
    auto_approved:  "bg-indigo-500/20 text-indigo-400",
    approved:       "bg-cyan-500/20 text-cyan-400",
    under_review:   "bg-amber-500/20 text-amber-400",
    flagged:        "bg-red-500/20 text-red-400",
    rejected:       "bg-red-500/20 text-red-400",
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Payout Modal */}
      {payoutClaim && (
        <PayoutModal
          claim={payoutClaim}
          onClose={() => setPayoutClaim(null)}
          onSuccess={(r) => {
            setPaymentHistory(prev => [r.payout, ...prev]);
            setPayoutClaim(null);
          }}
        />
      )}

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          My <span className="gradient-text">Income Protection</span>
        </h1>
        <p className="text-[var(--color-text-secondary)] mt-1">
          {workerInfo?.name} · {workerInfo?.platform} · {workerInfo?.city}
        </p>
      </div>

      {/* Protection Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {protectionCards.map((card, i) => (
          <div key={i} className="glass rounded-2xl p-5 card-hover">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-3`}>
              {card.icon}
            </div>
            <div className="text-xl font-bold">{card.value}</div>
            <div className="text-xs text-[var(--color-text-muted)]">{card.label}</div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-1">{card.sub}</div>
          </div>
        ))}
      </div>

      {/* Protection Gauge */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold">Weekly Income Protection</h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Your active coverage vs average weekly earnings
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-400">{cov.weeklyProtectionRatio}%</div>
            <div className="text-xs text-[var(--color-text-muted)]">protected</div>
          </div>
        </div>
        <div className="h-3 rounded-full bg-[var(--color-surface-lighter)] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-1000"
            style={{ width: `${Math.min(cov.weeklyProtectionRatio, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-2">
          <span>₹0</span>
          <span>₹{(workerInfo?.avgWeeklyEarnings || 0).toLocaleString("en-IN")} avg/week</span>
        </div>
      </div>

      {/* Recent Claims + Trigger Payout */}
      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Zap size={16} className="text-amber-400" />
          Recent Claims
        </h3>
        {clm.recentClaims.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-text-muted)] text-sm">
            No claims yet. Stay covered!
          </div>
        ) : (
          <div className="space-y-3">
            {clm.recentClaims.map((claim: any) => (
              <div key={claim._id} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface-light)]">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{claim.disruptionEvent}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">
                    {claim.lostHours}hrs · {new Date(claim.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">₹{claim.amount}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[claim.status] || "bg-gray-500/20 text-gray-400"}`}>
                  {claim.status.replace("_", " ")}
                </span>
                {/* Trigger payout for approved claims */}
                {["auto_approved", "approved"].includes(claim.status) && (
                  <button
                    onClick={() => setPayoutClaim(claim)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold btn-primary flex items-center gap-1 border-none cursor-pointer"
                  >
                    <Wallet size={12} /> Pay
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* UPI Payment History */}
      {paymentHistory.length > 0 && (
        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-400" />
            UPI Payout History
          </h3>
          <div className="space-y-3">
            {paymentHistory.slice(0, 5).map((payout: any) => (
              <div key={payout._id} className="flex items-center gap-4 p-3 rounded-xl bg-[var(--color-surface-light)]">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${payout.status === "success" ? "bg-emerald-500/20" : "bg-red-500/20"}`}>
                  {payout.status === "success"
                    ? <CheckCircle size={16} className="text-emerald-400" />
                    : <AlertTriangle size={16} className="text-red-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{payout.disruptionEvent}</div>
                  <div className="text-xs font-mono text-[var(--color-text-muted)] truncate">{payout.upiId}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-emerald-400">₹{payout.amount}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{payout.processingMs}ms</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
