"use client";
import { useState } from "react";
import { PageType } from "../types";
import {
  Shield,
  LayoutDashboard,
  FileText,
  AlertTriangle,
  BarChart3,
  User,
  Settings,
  Menu,
  X,
  Zap,
} from "lucide-react";

interface NavbarProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const navItems: { page: PageType; label: string; icon: React.ReactNode }[] = [
  { page: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { page: "policies", label: "Policies", icon: <FileText size={18} /> },
  { page: "claims", label: "Claims", icon: <Zap size={18} /> },
  { page: "alerts", label: "Alerts", icon: <AlertTriangle size={18} /> },
  { page: "analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
  { page: "admin", label: "Admin", icon: <Settings size={18} /> },
];

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50 border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate("landing")}
            className="flex items-center gap-2 cursor-pointer bg-transparent border-none"
          >
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">GigShield</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer border-none ${
                  currentPage === item.page
                    ? "gradient-bg text-white"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-light)] bg-transparent"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* Profile */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => onNavigate("profile")}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-transparent border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary)] transition-all cursor-pointer text-sm"
            >
              <User size={16} />
              Rajesh K.
            </button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden bg-transparent border-none text-[var(--color-text-primary)] cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden glass-light border-t border-[var(--color-border)] animate-slide-up">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer border-none ${
                  currentPage === item.page
                    ? "gradient-bg text-white"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-light)] bg-transparent"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
