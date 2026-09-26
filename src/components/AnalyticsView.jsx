import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator';
import { EXPENSE_CATEGORIES, INCOME_PLATFORMS } from '../constants';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  Clock, 
  Car, 
  Fuel, 
  AlertCircle, 
  CheckCircle2, 
  Calendar, 
  PieChart, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldAlert,
  Zap,
  Sliders
} from 'lucide-react';

export default function AnalyticsView() {
  const { metrics, targets, currency, theme, setActiveModal } = useApp();
  const isDark = theme === 'dark' || theme === 'noir';

  const [activeTab, setActiveTab] = useState('weekly'); // 'daily', 'weekly', 'monthly'
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  const daily = metrics.today;
  const weekly = metrics.week;
  const monthly = metrics.month;
  const standards = metrics.standards;

  return (
    <div className="px-4 py-2 pb-24 space-y-4">
      {/* Top Header & Segmented View Selector */}
      <div className={`p-4 rounded-3xl border transition-all ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-500" />
              <span>Target & Plan Analysis</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Divided daily, weekly, and monthly comparison
            </p>
          </div>
          <button
            onClick={() => setActiveModal('targetSettings')}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition"
            title="Adjust Targets"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>

        {/* Segmented Pill Tabs */}
        <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl">
          <button
            onClick={() => setActiveTab('daily')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'daily'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Daily Plan
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'weekly'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Weekly Plan
          </button>
          <button
            onClick={() => setActiveTab('monthly')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'monthly'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Monthly Plan
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. DAILY VIEW */}
      {/* ======================================================== */}
      {activeTab === 'daily' && (
        <div className="space-y-4">
          {/* Daily Milestone Card */}
          <div className={`p-4 rounded-3xl border ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Today's Target Performance
              </span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                daily.income >= standards.dailyTarget
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {daily.income >= standards.dailyTarget ? 'Target Achieved' : 'In Progress'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Actual Income</span>
                <p className="text-2xl font-black font-mono-num text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(daily.income, currency)}
                </p>
                <span className="text-[10px] text-slate-400">Gross + tips + bonuses</span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Daily Target</span>
                <p className="text-2xl font-black font-mono-num text-slate-800 dark:text-white">
                  {formatCurrency(standards.dailyTarget, currency)}
                </p>
                <span className="text-[10px] text-slate-400">Calculated milestone</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-1.5 mb-3">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600 dark:text-slate-400">Daily Goal Completion</span>
                <span className="text-emerald-600 dark:text-emerald-400">{daily.progress.toFixed(1)}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, daily.progress))}%` }}
                ></div>
              </div>
            </div>

            {/* Daily Summary Stats */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                <p className="text-[10px] text-slate-400">Today Expenses</p>
                <p className="text-xs font-bold text-rose-500 font-mono-num">{formatCurrency(daily.expense, currency)}</p>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                <p className="text-[10px] text-slate-400">Today Net Profit</p>
                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono-num">{formatCurrency(daily.net, currency)}</p>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                <p className="text-[10px] text-slate-400">Net Hourly</p>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono-num">{currency.symbol}{daily.netHourly.toFixed(2)}/h</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. WEEKLY VIEW */}
      {/* ======================================================== */}
      {activeTab === 'weekly' && (
        <div className="space-y-4">
          {/* Weekly Headline Card */}
          <div className={`p-4 rounded-3xl border ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Week-To-Date Target Progress
              </span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {weekly.progress.toFixed(1)}% Achieved
              </span>
            </div>

            <div className="flex items-baseline space-x-2 mb-2">
              <h3 className="text-3xl font-extrabold font-mono-num text-slate-900 dark:text-white">
                {formatCurrency(weekly.income, currency)}
              </h3>
              <span className="text-sm font-semibold text-slate-400">
                / {formatCurrency(standards.weeklyTarget, currency)} goal
              </span>
            </div>

            {/* Weekly Progress Bar */}
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, weekly.progress))}%` }}
              ></div>
            </div>

            {/* Smart Pace Tip */}
            {targets.autoAdjustPace && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl flex items-start space-x-2 text-xs">
                <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-emerald-900 dark:text-emerald-200">
                    Remaining Target: {formatCurrency(weekly.remainingIncomeNeeded, currency)}
                  </p>
                  <p className="text-emerald-700 dark:text-emerald-300 mt-0.5">
                    {weekly.remainingIncomeNeeded > 0
                      ? `Average ${formatCurrency(weekly.dynamicDailyTarget, currency)} across your remaining ${weekly.remainingWorkingDays} scheduled working day(s) this week.`
                      : 'You have surpassed your weekly target! Excellent driving.'}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 7-DAY INTERACTIVE BAR CHART (Mon-Sun vs Daily Target Line) */}
          <div className={`p-4 rounded-3xl border ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold">This Week Day-by-Day</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Actual Daily Revenue vs Daily Target Milestone ({formatCurrency(standards.dailyTarget, currency)})
                </p>
              </div>
              <div className="flex items-center space-x-2 text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block"></span> Met
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block"></span> Under
                </span>
              </div>
            </div>

            {/* Custom SVG / HTML Bar Chart */}
            <div className="relative pt-6 pb-2">
              {/* Daily Target Baseline Marker Line */}
              <div className="absolute top-10 left-0 right-0 border-b-2 border-dashed border-emerald-500/40 flex items-center justify-end pointer-events-none">
                <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-slate-800 px-1 py-0.5 rounded -mt-3.5">
                  Target: {formatCurrency(standards.dailyTarget, currency)}
                </span>
              </div>

              {/* 7 Bars */}
              <div className="grid grid-cols-7 gap-2 items-end h-40">
                {weekly.daysBreakdown.map((day, idx) => {
                  const maxTargetOrIncome = Math.max(standards.dailyTarget * 1.3, ...weekly.daysBreakdown.map(d => d.income), 1);
                  const barHeightPct = Math.min(100, (day.income / maxTargetOrIncome) * 100);
                  const isMet = day.income >= standards.dailyTarget;
                  const isSelected = selectedDayIndex === idx;

                  return (
                    <div
                      key={day.dayKey}
                      onClick={() => setSelectedDayIndex(isSelected ? null : idx)}
                      className="flex flex-col items-center cursor-pointer group"
                    >
                      {/* Amount tooltip above bar */}
                      <span className="text-[9px] font-bold font-mono-num text-slate-500 dark:text-slate-400 mb-1 truncate max-w-full">
                        {day.income > 0 ? `${currency.symbol}${Math.round(day.income)}` : '-'}
                      </span>

                      {/* Bar Pillar */}
                      <div className="w-full flex justify-center h-28 items-end">
                        <div
                          style={{ height: `${Math.max(6, barHeightPct)}%` }}
                          className={`w-full max-w-[28px] rounded-t-xl transition-all duration-300 ${
                            isSelected
                              ? 'ring-2 ring-emerald-500 scale-105'
                              : ''
                          } ${
                            !day.isWorkingDay && day.income === 0
                              ? 'bg-slate-200 dark:bg-slate-800'
                              : isMet
                                ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-sm'
                                : 'bg-gradient-to-t from-amber-500 to-amber-300 shadow-sm'
                          }`}
                        ></div>
                      </div>

                      {/* Day Label */}
                      <span className={`text-[11px] font-bold mt-2 ${
                        day.isToday 
                          ? 'text-emerald-600 dark:text-emerald-400 underline decoration-2' 
                          : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        {day.dayLabel}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected day inspect drawer */}
            {selectedDayIndex !== null && (
              <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 animate-fadeIn text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold">
                    {weekly.daysBreakdown[selectedDayIndex].dayLabel} ({weekly.daysBreakdown[selectedDayIndex].dateStr})
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {weekly.daysBreakdown[selectedDayIndex].isWorkingDay ? 'Working Shift' : 'Scheduled Rest Day'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div>
                    <span className="text-slate-400 text-[10px]">Income</span>
                    <p className="font-bold text-emerald-600 font-mono-num">
                      {formatCurrency(weekly.daysBreakdown[selectedDayIndex].income, currency)}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Expenses</span>
                    <p className="font-bold text-rose-500 font-mono-num">
                      {formatCurrency(weekly.daysBreakdown[selectedDayIndex].expense, currency)}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Net Profit</span>
                    <p className="font-bold font-mono-num">
                      {formatCurrency(weekly.daysBreakdown[selectedDayIndex].net, currency)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. MONTHLY VIEW */}
      {/* ======================================================== */}
      {activeTab === 'monthly' && (
        <div className="space-y-4">
          {/* Monthly Targets & Projected Card */}
          <div className={`p-4 rounded-3xl border ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Monthly Goal & Projection
            </span>

            <div className="grid grid-cols-2 gap-3 my-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Current Earned</span>
                <p className="text-2xl font-black font-mono-num text-slate-900 dark:text-white">
                  {formatCurrency(monthly.income, currency)}
                </p>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {monthly.progress.toFixed(1)}% of {formatCurrency(standards.monthlyTarget, currency)}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Projected Month-End</span>
                <p className="text-2xl font-black font-mono-num text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(monthly.projectedIncome, currency)}
                </p>
                <span className="text-[10px] text-slate-400">At current daily rate</span>
              </div>
            </div>

            {/* Monthly Progress Bar */}
            <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, monthly.progress))}%` }}
              ></div>
            </div>

            {/* Expense Ratio Gauge */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2">
                <Fuel className="w-4 h-4 text-rose-500" />
                <span>Operating Expense Ratio:</span>
                <strong className={`font-mono-num ${monthly.expenseRatio > monthly.targetExpenseRatio ? 'text-rose-500' : 'text-emerald-600'}`}>
                  {monthly.expenseRatio.toFixed(1)}%
                </strong>
              </div>
              <span className="text-[11px] text-slate-400">
                Cap: {monthly.targetExpenseRatio.toFixed(0)}%
              </span>
            </div>
          </div>

          {/* Expense Category Distribution */}
          <div className={`p-4 rounded-3xl border ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
          }`}>
            <h3 className="text-sm font-bold mb-1">Expense Breakdown</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
              Where your driving revenue is being spent this month
            </p>

            {monthly.expenseBreakdown.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No expenses logged this month yet.</p>
            ) : (
              <div className="space-y-3">
                {monthly.expenseBreakdown.map((item) => {
                  const cat = EXPENSE_CATEGORIES.find(c => c.id === item.catId) || { name: item.catId, color: '#EF4444' };
                  return (
                    <div key={item.catId} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }}></span>
                          {cat.name}
                        </span>
                        <span className="font-mono-num text-slate-900 dark:text-white">
                          {formatCurrency(item.amount, currency)} ({item.percentage.toFixed(0)}%)
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.percentage}%`,
                            backgroundColor: cat.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Platform Revenue Distribution */}
          <div className={`p-4 rounded-3xl border ${
            isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
          }`}>
            <h3 className="text-sm font-bold mb-1">Income by Platform</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
              Share of revenue by driving service
            </p>

            <div className="space-y-3">
              {monthly.incomePlatformBreakdown.map((item) => {
                const plat = INCOME_PLATFORMS.find(p => p.id === item.platformId) || { name: item.platformId, color: '#000' };
                return (
                  <div key={item.platformId} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: plat.color }}></span>
                        {plat.name}
                      </span>
                      <span className="font-mono-num text-slate-900 dark:text-white">
                        {formatCurrency(item.amount, currency)} ({item.percentage.toFixed(0)}%)
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{
                          width: `${item.percentage}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
