import React, { useState, useEffect } from 'react';
import DriverLedgerLogo from './DriverLedgerLogo';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

export default function AppSplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onFinish(), 250);
          return 100;
        }
        return prev + 12;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black p-6 select-none animate-fadeIn">
      {/* Top subtle bar */}
      <div className="w-full flex justify-between items-center text-[10px] text-slate-500 font-bold uppercase tracking-widest pt-2">
        <span>Yango Driver Pro</span>
        <span className="text-amber-400">v1.4</span>
      </div>

      {/* Center Brand Hero */}
      <div className="flex flex-col items-center justify-center my-auto">
        <div className="animate-scaleIn">
          <DriverLedgerLogo variant="splash" />
        </div>

        <p className="mt-4 text-xs sm:text-sm font-semibold text-slate-400 text-center max-w-xs leading-relaxed">
          Daily Income, Operating Expenses & Target Plan Performance for Yango Drivers
        </p>

        {/* Feature Badges */}
        <div className="mt-5 flex items-center space-x-2">
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-amber-400 border border-amber-500/30">
            Native ETB (Br)
          </span>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-emerald-400 border border-emerald-500/30">
            CBE • Telebirr • Cash
          </span>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-900 text-sky-400 border border-sky-500/30">
            Excel Backup (.xlsx)
          </span>
        </div>
      </div>

      {/* Bottom Loading Bar and Enter Button */}
      <div className="w-full max-w-xs space-y-3 pb-6">
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center text-xs">
          <span className="text-[11px] text-slate-500 font-medium">Starting Driver Ledger...</span>
          <button
            onClick={onFinish}
            className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center space-x-1 cursor-pointer"
          >
            <span>Skip</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
