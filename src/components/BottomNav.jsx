import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Gauge, 
  TrendingUp, 
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
    setActiveModal 
  } = useApp();

  const [showAddMenu, setShowAddMenu] = useState(false);

  return (
    <>
      {/* Quick Add Popover menu when center button clicked */}
      {showAddMenu && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-2xs flex items-end justify-center pb-20"
          onClick={() => setShowAddMenu(false)}
        >
          <div 
            className="w-72 p-3 rounded-3xl border border-slate-700 bg-slate-900 text-white shadow-2xl space-y-2 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-bold text-slate-400 px-2 pt-1 uppercase tracking-wider">Quick Record</p>

            {/* Income option */}
            <button
              onClick={() => {
                setShowAddMenu(false);
                setActiveModal('addIncome');
              }}
              className="w-full p-2.5 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-200 border border-emerald-800/60 flex items-center space-x-3 transition cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center">
                <ArrowUpRight className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold">+ Log Yango Income</p>
                <p className="text-[10px] text-emerald-400">Fares, tips & quests in ETB</p>
              </div>
            </button>

            {/* Expense option */}
            <button
              onClick={() => {
                setShowAddMenu(false);
                setActiveModal('addExpense');
              }}
              className="w-full p-2.5 rounded-2xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 border border-rose-800/60 flex items-center space-x-3 transition cursor-pointer"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                <ArrowDownRight className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold">- Log Expense</p>
                <p className="text-[10px] text-rose-400">Fuel, maintenance, wash & food</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 border-t border-slate-800 backdrop-blur-md">
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
          {/* 1. Dashboard Tab */}
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer ${
              activeTab === 'home'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Gauge className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Gauge</span>
          </button>

          {/* 2. Details Sub-screen Tab */}
          <button
            onClick={() => setActiveTab('details')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer ${
              activeTab === 'details'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Details</span>
          </button>

          {/* 3. Center Prominent Action Button (+) */}
          <div className="relative -top-3">
            <button
              onClick={() => setShowAddMenu(!showAddMenu)}
              className="w-12 h-12 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shadow-lg shadow-emerald-500/30 active:scale-95 transition cursor-pointer"
            >
              <Plus className={`w-6 h-6 stroke-[3] transition-transform ${showAddMenu ? 'rotate-45' : ''}`} />
            </button>
          </div>

          {/* 4. Ledger Tab */}
          <button
            onClick={() => setActiveTab('ledger')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer ${
              activeTab === 'ledger'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ReceiptText className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">Ledger</span>
          </button>

          {/* 5. Excel Backup Tab */}
          <button
            onClick={() => setActiveTab('excel')}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition cursor-pointer ${
              activeTab === 'excel'
                ? 'text-emerald-400 font-bold'
                : 'text-slate-400 hover:text-white'
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
