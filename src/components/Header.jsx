import React from 'react';
import { useApp } from '../context/AppContext';
import { CURRENCIES } from '../constants';
import { 
  Sparkles, 
  Smartphone, 
  Maximize2, 
  Layers, 
  Sliders, 
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';

export default function Header() {
  const { 
    targets, 
    currency, 
    setCurrency, 
    theme, 
    setTheme, 
    viewMode, 
    setViewMode, 
    setActiveModal 
  } = useApp();

  const isDark = theme === 'dark' || theme === 'noir';

  return (
    <header className={`px-4 pt-4 pb-3 transition-colors ${
      isDark ? 'bg-slate-900 border-b border-slate-800 text-white' : 'bg-white border-b border-slate-100 text-slate-900'
    }`}>
      {/* Top row: Brand & Tool controls */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          {/* Driver Avatar / Badge */}
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
              DL
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-bold text-base leading-tight">Driver Ledger</h1>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 rounded-full">
                Pro
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <span>Goal: {currency.symbol}{Number(targets.monthlyIncome).toLocaleString()}/mo</span>
            </p>
          </div>
        </div>

        {/* Right utility buttons */}
        <div className="flex items-center space-x-1.5">
          {/* Figma Template Badge Button */}
          <button
            onClick={() => setActiveModal('figmaSync')}
            title="Fam Fund Figma Template Settings"
            className="flex items-center space-x-1 px-2.5 py-1.5 bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-xl text-xs font-semibold transition border border-purple-200 dark:border-purple-800"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">Fam Fund</span> UI
          </button>

          {/* Currency Dropdown */}
          <select
            value={currency.code}
            onChange={(e) => {
              const selected = CURRENCIES.find(c => c.code === e.target.value);
              if (selected) setCurrency(selected);
            }}
            className="text-xs font-semibold px-2 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl border-none outline-none cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            {CURRENCIES.map(c => (
              <option key={c.code} value={c.code}>
                {c.code} ({c.symbol.trim()})
              </option>
            ))}
          </select>

          {/* Target Config Quick Button */}
          <button
            onClick={() => setActiveModal('targetSettings')}
            title="Edit Daily/Weekly/Monthly Plan"
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* View mode toggle (Mobile Shell vs Fullscreen) on desktop */}
          <button
            onClick={() => setViewMode(viewMode === 'mobile' ? 'responsive' : 'mobile')}
            title={viewMode === 'mobile' ? "Switch to Fullscreen" : "Switch to Android Phone Mockup"}
            className="hidden md:flex p-1.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          >
            {viewMode === 'mobile' ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
