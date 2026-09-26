import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plus, 
  Minus, 
  FileSpreadsheet, 
  Target 
} from 'lucide-react';

export default function QuickActions() {
  const { setActiveModal, theme } = useApp();
  const isDark = theme === 'dark' || theme === 'noir';

  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-4 gap-2.5">
        {/* + Add Income */}
        <button
          onClick={() => setActiveModal('addIncome')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white shadow-md shadow-emerald-500/20 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-[11px] font-bold text-center leading-tight">Yango</span>
          <span className="text-[9px] text-emerald-100 opacity-80">+ Income</span>
        </button>

        {/* - Add Expense */}
        <button
          onClick={() => setActiveModal('addExpense')}
          className="flex flex-col items-center justify-center p-3 rounded-2xl bg-rose-500 hover:bg-rose-600 active:scale-95 text-white shadow-md shadow-rose-500/20 transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
            <Minus className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-[11px] font-bold text-center leading-tight">Expense</span>
          <span className="text-[9px] text-rose-100 opacity-80">Fuel/Cost</span>
        </button>

        {/* Plan & Targets */}
        <button
          onClick={() => setActiveModal('targetSettings')}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl active:scale-95 transition-all cursor-pointer group ${
            isDark 
              ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700' 
              : 'bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
            <Target className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-bold text-center leading-tight">Plan</span>
          <span className="text-[9px] text-slate-400">Milestones</span>
        </button>

        {/* Export Excel (.xlsx) */}
        <button
          onClick={() => setActiveModal('exportExcel')}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl active:scale-95 transition-all cursor-pointer group ${
            isDark 
              ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700' 
              : 'bg-white hover:bg-slate-50 text-emerald-700 border border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
            <FileSpreadsheet className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[11px] font-bold text-center leading-tight">Excel</span>
          <span className="text-[9px] text-slate-400">ETB Backup</span>
        </button>
      </div>
    </div>
  );
}
