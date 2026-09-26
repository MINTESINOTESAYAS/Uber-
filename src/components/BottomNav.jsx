import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Target, 
  Plus, 
  ReceiptText, 
  FileSpreadsheet, 
  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';

export default function BottomNav() {
  const { 
    activeTab, 
    setActiveTab, 
    setActiveModal, 
    theme 
  } = useApp();

  const isDark = theme === 'dark' || theme === 'noir';
  const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <>
      {/* Quick Add Popover menu when center button clicked */}
      {showAddMenu && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-2xs flex items-end justify-center pb-20"
          onClick={() => setShowAddMenu(false)}
        >
          <div 
            className={`w-72 p-3 rounded-3xl border shadow-2xl space-y-2 animate-scaleIn ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-bold text-slate-400 px-2 pt-1 uppercase tracking-wider">Quick Record</p>

            {/* Income option */}
            <button
              onClick={() => {
                setShowAddMenu(false);
                setActiveModal('addIncome');
              }}
              className="w-full p-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 flex items-center space-x-3 transition cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold">+ Log Income</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400">Rides, tips, platform earnings</p>
              </div>
            </button>

            {/* Expense option */}
            <button
              onClick={() => {
                setShowAddMenu(false);
                setActiveModal('addExpense');
              }}
              className="w-full p-2.5 rounded-2xl bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 flex items-center space-x-3 transition cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold">- Log Expense</p>
                <p className="text-[10px] text-rose-600 dark:text-rose-400">Fuel, maintenance, tolls, wash</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Docked / Floating Bottom Bar */}
      <nav className={`fixed bottom-0 left-0 right-0 z-30 transition-all ${
        isDark ? 'bg-slate-900/95 border-t border-slate-800' : 'bg-white/95 border-t border-slate-100'
      } backdrop-blur-md`}>
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
          {/* 1. Dashboard Tab */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer ${
              activeTab === 'dashboard'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Home</span>
          </button>

          {/* 2. Target & Plan Tab */}
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer ${
              activeTab === 'analytics'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <Target className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Plan</span>
          </button>

          {/* 3. Center Prominent Action Button (+) */}
          <div className="relative -top-3">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="w-12 h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30 active:scale-95 transition cursor-pointer"
            >
              <Plus className={`w-6 h-6 stroke-[2.8] transition-transform ${showAddMenu ? 'rotate-45' : ''}`} />
            </button>
          </div>

          {/* 4. Ledger Tab */}
          <button
            onClick={() => setActiveTab('history')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer ${
              activeTab === 'history'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <ReceiptText className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Ledger</span>
          </button>

          {/* 5. Excel Export Tab */}
          <button
            onClick={() => setActiveTab('export')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer ${
              activeTab === 'export'
                ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
            }`}
          >
            <FileSpreadsheet className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Excel</span>
          </button>
        </div>
      </nav>
    </>
  );
}
