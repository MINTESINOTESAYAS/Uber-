import React from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator.js';
import { 
  Car, 
  Sliders, 
  GitBranch, 
  ShieldCheck 
} from 'lucide-react';

export default function Header() {
  const { 
    targets, 
    currency, 
    activeVersion, 
    setActiveModal 
  } = useApp();

  return (
    <header className="px-4 pt-4 pb-3 bg-slate-900 border-b border-slate-800 text-white">
      <div className="flex items-center justify-between">
        {/* Left: Driver Title and Yango Badge */}
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white font-black shadow-md shadow-red-600/20">
            <Car className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="font-extrabold text-sm tracking-tight text-white leading-tight">
                Yango Driver Ledger
              </h1>
              {/* Version Pill (v1.2 vs v1.1) */}
              <button
                type="button"
                onClick={() => setActiveModal('versionInfo')}
                className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full hover:bg-emerald-500/30 transition flex items-center gap-1 cursor-pointer"
                title="View Version 1.1 & 1.2 Info"
              >
                <span>v{activeVersion}</span>
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Monthly Goal: <strong className="text-white font-mono-num">{formatCurrency(targets.monthlyIncome, currency)}</strong>
            </p>
          </div>
        </div>

        {/* Right Action: Target Settings */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setActiveModal('targetSettings')}
            title="Configure Target Plan"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition flex items-center space-x-1 cursor-pointer"
          >
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold hidden sm:inline">Plan</span>
          </button>
        </div>
      </div>
    </header>
  );
}
