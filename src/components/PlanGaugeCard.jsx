import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator.js';
import { 
  Target, 
  Zap, 
  ChevronRight 
} from 'lucide-react';

export default function PlanGaugeCard() {
  const { metrics, targets, currency, theme, setActiveModal } = useApp();
  const isDark = theme === 'dark' || theme === 'noir';

  const [selectedPlanTab, setSelectedPlanTab] = useState('daily');

  const dailyData = metrics.today;
  const weeklyData = metrics.week;
  const monthlyData = metrics.month;

  let currentTarget = metrics.standards.dailyTarget;
  let currentActual = dailyData.income;
  let currentProgress = dailyData.progress;
  let planSubtitle = targets.workingDaysMap && !dailyData.isWorkingDay ? "Scheduled Rest Day" : "Daily Shift Target";

  if (selectedPlanTab === 'weekly') {
    currentTarget = metrics.standards.weeklyTarget;
    currentActual = weeklyData.income;
    currentProgress = weeklyData.progress;
    planSubtitle = `Goal for ${targets.workingDaysPerWeek || 6} driving shifts`;
  } else if (selectedPlanTab === 'monthly') {
    currentTarget = metrics.standards.monthlyTarget;
    currentActual = monthlyData.income;
    currentProgress = monthlyData.progress;
    planSubtitle = `Projected: ${formatCurrency(monthlyData.projectedIncome, currency)}`;
  }

  const cappedPercent = Math.min(100, Math.max(0, currentProgress));
  const isTargetAchieved = currentActual >= currentTarget;
  const variance = currentActual - currentTarget;

  return (
    <div className="px-4 py-2">
      <div className={`p-4 rounded-3xl transition-all border ${
        isDark 
          ? 'bg-slate-900 border-slate-800 text-white shadow-lg' 
          : 'bg-white border-slate-100 text-slate-900 shadow-sm'
      }`}>
        {/* Header with Title and Tab Switcher */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Target className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                <span>Plan Performance</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {selectedPlanTab.toUpperCase()}
                </span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">{planSubtitle}</p>
            </div>
          </div>

          {/* Quick Tab Switcher: Daily | Weekly | Monthly */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setSelectedPlanTab('daily')}
              className={`px-2.5 py-1 rounded-lg transition ${
                selectedPlanTab === 'daily'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setSelectedPlanTab('weekly')}
              className={`px-2.5 py-1 rounded-lg transition ${
                selectedPlanTab === 'weekly'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setSelectedPlanTab('monthly')}
              className={`px-2.5 py-1 rounded-lg transition ${
                selectedPlanTab === 'monthly'
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        {/* Big Comparison Numbers in ETB */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl mb-3 border border-slate-100 dark:border-slate-800/80">
          <div className="flex items-end justify-between mb-2">
            <div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Actual Yango Revenue</span>
              <p className="text-2xl font-black font-mono-num text-slate-900 dark:text-white">
                {formatCurrency(currentActual, currency)}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Planned Milestone</span>
              <p className="text-base font-bold font-mono-num text-slate-600 dark:text-slate-300">
                {formatCurrency(currentTarget, currency)}
              </p>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div className="relative w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isTargetAchieved 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400' 
                  : 'bg-gradient-to-r from-emerald-500 to-amber-400'
              }`}
              style={{ width: `${cappedPercent}%` }}
            ></div>
          </div>

          {/* Variance & Progress % pill */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              {currentProgress.toFixed(1)}% Achieved
            </span>
            <span className={`font-medium ${variance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
              {variance >= 0 ? `+${formatCurrency(variance, currency)} surplus` : `${formatCurrency(Math.abs(variance), currency)} needed`}
            </span>
          </div>
        </div>

        {/* Dynamic Smart Pace Tip */}
        {selectedPlanTab === 'weekly' && targets.autoAdjustPace && (
          <div className="flex items-start space-x-2 p-2.5 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl mb-3 border border-emerald-200/50 dark:border-emerald-800/50">
            <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 dark:text-emerald-200">
              <span className="font-bold">Smart Weekly Pace: </span>
              {weeklyData.remainingIncomeNeeded > 0 ? (
                <>
                  Earn <strong>{formatCurrency(weeklyData.dynamicDailyTarget, currency)}/day</strong> across remaining {weeklyData.remainingWorkingDays} working day(s) this week.
                </>
              ) : (
                <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
                  🎉 Weekly target reached! Extra rides are pure profit.
                </span>
              )}
            </div>
          </div>
        )}

        {/* 3-Pillar Summary Row (Daily, Weekly, Monthly Milestones) */}
        <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => setSelectedPlanTab('daily')}
            className={`p-2 rounded-xl text-left transition ${
              selectedPlanTab === 'daily' 
                ? 'bg-emerald-50 dark:bg-emerald-950/50 ring-1 ring-emerald-500/40' 
                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Daily Goal</p>
            <p className="text-xs font-bold font-mono-num text-slate-800 dark:text-slate-200">
              {formatCurrency(metrics.standards.dailyTarget, currency)}
            </p>
            <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              {dailyData.progress.toFixed(0)}%
            </div>
          </button>

          <button 
            onClick={() => setSelectedPlanTab('weekly')}
            className={`p-2 rounded-xl text-left transition ${
              selectedPlanTab === 'weekly' 
                ? 'bg-emerald-50 dark:bg-emerald-950/50 ring-1 ring-emerald-500/40' 
                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Weekly Goal</p>
            <p className="text-xs font-bold font-mono-num text-slate-800 dark:text-slate-200">
              {formatCurrency(metrics.standards.weeklyTarget, currency)}
            </p>
            <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              {weeklyData.progress.toFixed(0)}%
            </div>
          </button>

          <button 
            onClick={() => setSelectedPlanTab('monthly')}
            className={`p-2 rounded-xl text-left transition ${
              selectedPlanTab === 'monthly' 
                ? 'bg-emerald-50 dark:bg-emerald-950/50 ring-1 ring-emerald-500/40' 
                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Monthly Goal</p>
            <p className="text-xs font-bold font-mono-num text-slate-800 dark:text-slate-200">
              {formatCurrency(metrics.standards.monthlyTarget, currency)}
            </p>
            <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              {monthlyData.progress.toFixed(0)}%
            </div>
          </button>
        </div>

        {/* Footer configure button */}
        <button
          onClick={() => setActiveModal('targetSettings')}
          className="w-full mt-3 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-center space-x-1.5 transition"
        >
          <span>Adjust Daily / Weekly / Monthly Targets</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
