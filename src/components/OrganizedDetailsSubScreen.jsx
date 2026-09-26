import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator.js';
import { EXPENSE_CATEGORIES } from '../constants.js';
import { 
  ArrowLeft, 
  Target, 
  TrendingUp, 
  Zap, 
  Calendar, 
  Fuel, 
  Clock, 
  Car, 
  Sliders, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function OrganizedDetailsSubScreen() {
  const { 
    metrics, 
    targets, 
    currency, 
    setActiveTab, 
    setActiveModal 
  } = useApp();

  const [inspectDayIndex, setInspectDayIndex] = useState(null);
  const standards = metrics.standards;
  const weekly = metrics.week;
  const monthly = metrics.month;

  return (
    <div className="px-4 py-2 pb-24 space-y-4 animate-fadeIn">
      {/* Top Navigation Bar with Back Button */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <button
          onClick={() => setActiveTab('home')}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>Back to Dashboard</span>
        </button>

        <span className="text-xs font-bold text-slate-400">
          Target & Insights Hub
        </span>
      </div>

      {/* 1. THREE TARGET MILESTONES (Daily, Weekly, Monthly) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Target Plan Breakdown</h3>
          </div>
          <button
            onClick={() => setActiveModal('targetSettings')}
            className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-800 text-emerald-400 border border-slate-700 hover:bg-slate-700 flex items-center gap-1 transition"
          >
            <Sliders className="w-3 h-3" />
            <span>Adjust Plan</span>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          {/* Daily Milestone */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Daily Goal</p>
            <p className="text-xs sm:text-sm font-black font-mono-num text-emerald-400 mt-1">
              {formatCurrency(standards.dailyTarget, currency)}
            </p>
            <span className="text-[9px] text-slate-500 font-semibold block mt-0.5">
              per work shift
            </span>
          </div>

          {/* Weekly Milestone */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Weekly Goal</p>
            <p className="text-xs sm:text-sm font-black font-mono-num text-indigo-400 mt-1">
              {formatCurrency(standards.weeklyTarget, currency)}
            </p>
            <span className="text-[9px] text-slate-500 font-semibold block mt-0.5">
              {standards.workingDaysPerWeek} days/wk
            </span>
          </div>

          {/* Monthly Milestone */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Monthly Goal</p>
            <p className="text-xs sm:text-sm font-black font-mono-num text-white mt-1">
              {formatCurrency(standards.monthlyTarget, currency)}
            </p>
            <span className="text-[9px] text-slate-500 font-semibold block mt-0.5">
              full month
            </span>
          </div>
        </div>
      </div>

      {/* 2. SMART WEEKLY PACE REBALANCER */}
      {targets.autoAdjustPace && (
        <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 flex items-start space-x-2.5 text-xs">
          <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-emerald-200">
              Weekly Pace Calculator
            </p>
            <p className="text-emerald-300/90 text-[11px] mt-0.5 leading-relaxed">
              {weekly.remainingIncomeNeeded > 0
                ? `You have ${formatCurrency(weekly.remainingIncomeNeeded, currency)} remaining to reach this week's target. Maintain an average of ${formatCurrency(weekly.dynamicDailyTarget, currency)}/day over your next ${weekly.remainingWorkingDays} driving shift(s).`
                : '🎉 Congratulations! You have already surpassed your weekly target. Extra rides this week are pure profit!'}
            </p>
          </div>
        </div>
      )}

      {/* 3. 7-DAY SPEEDOMETER BAR CHART (Mon-Sun vs Target) */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-white">This Week Shift Performance</h3>
            <p className="text-[11px] text-slate-400">Actual daily earnings vs daily milestone</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
            Target: {formatCurrency(standards.dailyTarget, currency)}
          </span>
        </div>

        {/* Bar chart container */}
        <div className="relative pt-6 pb-2">
          {/* Target baseline dashed line */}
          <div className="absolute top-10 left-0 right-0 border-b border-dashed border-emerald-500/50 pointer-events-none"></div>

          {/* 7 Bars */}
          <div className="grid grid-cols-7 gap-1.5 items-end h-36">
            {weekly.daysBreakdown.map((day, idx) => {
              const maxVal = Math.max(standards.dailyTarget * 1.3, ...weekly.daysBreakdown.map(d => d.income), 1);
              const barPct = Math.min(100, (day.income / maxVal) * 100);
              const isMet = day.income >= standards.dailyTarget;
              const isSelected = inspectDayIndex === idx;

              return (
                <div
                  key={day.dayKey}
                  onClick={() => setInspectDayIndex(isSelected ? null : idx)}
                  className="flex flex-col items-center cursor-pointer group"
                >
                  <span className="text-[9px] font-bold font-mono-num text-slate-400 mb-1 truncate">
                    {day.income > 0 ? `${Math.round(day.income / 1000)}k` : '-'}
                  </span>

                  <div className="w-full flex justify-center h-24 items-end">
                    <div
                      style={{ height: `${Math.max(6, barPct)}%` }}
                      className={`w-full max-w-[26px] rounded-t-lg transition-all duration-300 ${
                        isSelected ? 'ring-2 ring-white scale-105' : ''
                      } ${
                        day.income === 0 && !day.isWorkingDay
                          ? 'bg-slate-800'
                          : isMet
                            ? 'bg-gradient-to-t from-emerald-600 to-teal-400'
                            : 'bg-gradient-to-t from-amber-600 to-amber-400'
                      }`}
                    ></div>
                  </div>

                  <span className={`text-[10px] font-bold mt-1.5 ${
                    day.isToday ? 'text-emerald-400 font-black underline' : 'text-slate-400'
                  }`}>
                    {day.dayLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected day inspection drawer */}
        {inspectDayIndex !== null && (
          <div className="mt-3 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs animate-fadeIn">
            <div className="flex justify-between items-center mb-1.5 font-bold">
              <span className="text-white">
                {weekly.daysBreakdown[inspectDayIndex].dayLabel} ({weekly.daysBreakdown[inspectDayIndex].dateStr})
              </span>
              <span className={weekly.daysBreakdown[inspectDayIndex].income >= standards.dailyTarget ? 'text-emerald-400' : 'text-amber-400'}>
                {weekly.daysBreakdown[inspectDayIndex].income >= standards.dailyTarget ? 'Target Achieved' : 'Below Target'}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-slate-500">Income</span>
                <p className="font-bold text-emerald-400 font-mono-num">
                  {formatCurrency(weekly.daysBreakdown[inspectDayIndex].income, currency)}
                </p>
              </div>
              <div>
                <span className="text-slate-500">Expenses</span>
                <p className="font-bold text-rose-400 font-mono-num">
                  {formatCurrency(weekly.daysBreakdown[inspectDayIndex].expense, currency)}
                </p>
              </div>
              <div>
                <span className="text-slate-500">Net Profit</span>
                <p className="font-bold text-white font-mono-num">
                  {formatCurrency(weekly.daysBreakdown[inspectDayIndex].net, currency)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. EXPENSE CATEGORY BREAKDOWN */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4">
        <h3 className="text-sm font-bold text-white mb-1">Monthly Operating Expenses</h3>
        <p className="text-[11px] text-slate-400 mb-3">
          Fuel, maintenance, and driver operational expenses in ETB
        </p>

        <div className="space-y-2.5">
          {monthly.expenseBreakdown.map((item) => {
            const cat = EXPENSE_CATEGORIES.find(c => c.id === item.catId) || { name: item.catId, color: '#EF4444' };
            return (
              <div key={item.catId} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                    {cat.name}
                  </span>
                  <span className="font-mono-num text-white">
                    {formatCurrency(item.amount, currency)} ({item.percentage.toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.percentage}%`, backgroundColor: cat.color }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
