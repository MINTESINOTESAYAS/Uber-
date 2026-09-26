import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator.js';
import CarSpeedometerGauge from './CarSpeedometerGauge.jsx';
import { 
  Plus, 
  Minus, 
  ArrowRight, 
  FileSpreadsheet, 
  Clock, 
  Car, 
  TrendingUp,
  Receipt,
  Sparkles,
  Info
} from 'lucide-react';

export default function SimplisticDashboard() {
  const { 
    metrics, 
    currency, 
    incomes, 
    expenses, 
    setActiveModal, 
    setActiveTab, 
    openEditModal 
  } = useApp();

  const [period, setPeriod] = useState('today'); // 'today', 'week', 'month'

  const currentMetrics = period === 'today' ? metrics.today : period === 'week' ? metrics.week : metrics.month;

  // Last 3 transactions for clean preview
  const recentCombined = [
    ...incomes.map(i => ({ ...i, type: 'income', total: (Number(i.grossAmount) || 0) + (Number(i.tips) || 0) + (Number(i.bonus) || 0) })),
    ...expenses.map(e => ({ ...e, type: 'expense', total: Number(e.amount) || 0 }))
  ].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <div className="px-4 py-2 pb-24 space-y-4">
      {/* 1. CAR SPEEDOMETER TARGET COCKPIT GAUGE */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 pt-3 shadow-xl relative overflow-hidden">
        {/* Ambient subtle backlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-20 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Target Speedometer
            </span>
          </div>

          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
            Yango ETB
          </span>
        </div>

        {/* The Instrument Gauge */}
        <CarSpeedometerGauge period={period} setPeriod={setPeriod} />

        {/* 2-Column Summary Cards Below Gauge */}
        <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3 border-t border-slate-800/80">
          <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
              {period === 'today' ? 'Today Expenses' : period === 'week' ? 'Week Expenses' : 'Month Expenses'}
            </p>
            <p className="text-base font-bold font-mono-num text-rose-400 mt-0.5">
              {formatCurrency(currentMetrics.expense, currency)}
            </p>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide">
              {period === 'today' ? 'Today Net Profit' : period === 'week' ? 'Week Net Profit' : 'Month Net Profit'}
            </p>
            <p className="text-base font-bold font-mono-num text-emerald-400 mt-0.5">
              {formatCurrency(currentMetrics.net, currency)}
            </p>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY BIG TACTILE RECORD BUTTONS */}
      <div className="grid grid-cols-2 gap-3">
        {/* + Log Income */}
        <button
          onClick={() => setActiveModal('addIncome')}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-98 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2 transition cursor-pointer"
        >
          <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
            <Plus className="w-4 h-4 stroke-[3]" />
          </div>
          <span>+ Log Income</span>
        </button>

        {/* - Log Expense */}
        <button
          onClick={() => setActiveModal('addExpense')}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 active:scale-98 text-white font-extrabold text-sm shadow-lg shadow-rose-600/25 flex items-center justify-center space-x-2 transition cursor-pointer"
        >
          <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
            <Minus className="w-4 h-4 stroke-[3]" />
          </div>
          <span>- Log Expense</span>
        </button>
      </div>

      {/* 3. SUB-SCREEN NAVIGATION BUTTONS (To keep home simplistic) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3.5 space-y-2">
        <div className="flex justify-between items-center px-1">
          <span className="text-xs font-bold text-slate-300">Detailed Driver Hub</span>
          <span className="text-[10px] text-slate-500">Tap to view extra info</span>
        </div>

        {/* Button to Detailed Analytics / Plan Sub-screen */}
        <button
          onClick={() => setActiveTab('details')}
          className="w-full p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left flex items-center justify-between transition group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                Full Target Breakdown & 7-Day Chart
              </p>
              <p className="text-[10px] text-slate-400">
                Daily, weekly, monthly targets and smart pace rebalancer
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
        </button>

        {/* Button to Excel Sheet Export */}
        <button
          onClick={() => setActiveTab('excel')}
          className="w-full p-3 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left flex items-center justify-between transition group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <p className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                Export Data to Excel Sheet (.xlsx)
              </p>
              <p className="text-[10px] text-slate-400">
                Backup daily income & expenses with native Ethiopian Birr formatting
              </p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* 4. RECENT ACTIVITY SNIPPET (Compact & Clean) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3.5">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold text-slate-300">Recent Records</span>
          <button
            onClick={() => setActiveTab('ledger')}
            className="text-[11px] font-bold text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>View All ({incomes.length + expenses.length})</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-1.5">
          {recentCombined.map(item => {
            const isInc = item.type === 'income';
            return (
              <div
                key={item.id}
                onClick={() => openEditModal(item, item.type)}
                className="p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-800 border border-slate-800/60 flex items-center justify-between cursor-pointer transition text-xs"
              >
                <div className="flex items-center space-x-2.5">
                  <span className={`w-2 h-2 rounded-full ${isInc ? 'bg-emerald-400' : 'bg-rose-500'}`}></span>
                  <div>
                    <p className="font-bold text-white">
                      {isInc ? 'Yango Ride' : item.category?.replace(/_/g, ' ').toUpperCase()}
                    </p>
                    <p className="text-[10px] text-slate-400">{item.date}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-mono-num font-bold ${isInc ? 'text-emerald-400' : 'text-slate-300'}`}>
                    {isInc ? '+' : '-'}{formatCurrency(item.total, currency)}
                  </span>
                  <p className="text-[9px] text-slate-500">Tap to edit</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
