import React from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator.js';
import { 
  Sparkles, 
  Smartphone, 
  Maximize2, 
  Sliders, 
  Car
} from 'lucide-react';

export default function Header() {
  const { 
    targets, 
    currency, 
    theme, 
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          {/* Driver Avatar */}
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white font-black shadow-md shadow-emerald-500/20">
              <Car className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-bold text-base leading-tight">Yango Driver</h1>
              {/* Version 1.3 Badge */}
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 rounded-full border border-emerald-300/40">
                v1.3
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Goal: <strong className="font-mono-num text-slate-700 dark:text-slate-200">{formatCurrency(targets.monthlyIncome, currency)}</strong>/mo
            </p>
          </div>
        </div>

        {/* Right utility buttons */}
        <div className="flex items-center space-x-1.5">
          {/* Fam Fund Figma Template Badge */}
          <button
            onClick={() => setActiveModal('figmaSync')}
            title="Fam Fund Figma Template Settings"
            className="flex items-center space-x-1 px-2.5 py-1.5 bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-xl text-xs font-semibold transition border border-purple-200 dark:border-purple-800"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="hidden sm:inline">Fam Fund</span> UI
          </button>

          {/* Target Config Quick Button */}
          <button
            onClick={() => setActiveModal('targetSettings')}
            title="Edit Daily/Weekly/Monthly Plan"
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          >
            <Sliders className="w-4 h-4 text-emerald-500" />
          </button>

          {/* View mode toggle (Mobile Shell vs Fullscreen) on desktop */}
          <button
            onClick={() => setViewMode(viewMode === 'mobile' ? 'responsive' : 'mobile')}
            title={viewMode === 'mobile' ? "Switch to Fullscreen" : "Switch to Android Phone Mockup"}
            className="hidden md:flex p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
          >
            {viewMode === 'mobile' ? <Maximize2 className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
