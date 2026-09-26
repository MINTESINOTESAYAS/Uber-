import React from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator.js';
import DriverLedgerLogo from './DriverLedgerLogo';
import { 
  Sparkles, 
  Smartphone, 
  Maximize2, 
  Sliders 
} from 'lucide-react';

export default function Header({ onReopenSplash }) {
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
    <header className={`px-4 pt-3.5 pb-3 transition-colors ${
      isDark ? 'bg-slate-900 border-b border-slate-800 text-white' : 'bg-white border-b border-slate-100 text-slate-900'
    }`}>
      <div className="flex items-center justify-between">
        {/* Left top side: Official Driver Ledger Logo */}
        <div 
          onClick={onReopenSplash}
          className="flex items-center space-x-2.5 cursor-pointer group select-none"
          title="Click to view Driver Ledger Opening Screen"
        >
          {/* Driver Ledger Logo Mark */}
          <DriverLedgerLogo 
            className="w-10 h-10 group-hover:scale-105 transition-transform" 
            variant="icon"
          />

          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-base tracking-tight leading-tight flex items-center">
                <span className="text-white">Driver</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500 ml-1">
                  Ledger
                </span>
              </span>
              {/* Version 1.4 Badge */}
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                v1.4
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Yango ETB Goal: <strong className="font-mono-num text-slate-200">{formatCurrency(targets.monthlyIncome, currency)}</strong>
            </p>
          </div>
        </div>

        {/* Right utility buttons */}
        <div className="flex items-center space-x-1.5">
          {/* Fam Fund UI Badge */}
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
            title="Edit Daily/Weekly/Monthly Target Plan"
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
