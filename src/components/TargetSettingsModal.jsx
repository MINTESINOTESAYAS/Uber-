import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator';
import { DAYS_OF_WEEK } from '../constants';
import { 
  X, 
  Target, 
  Sliders, 
  Calendar, 
  Check, 
  Zap,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function TargetSettingsModal() {
  const { 
    targets, 
    updateTargets, 
    setActiveModal, 
    currency, 
    theme 
  } = useApp();

  const isDark = theme === 'dark' || theme === 'noir';

  const [monthlyIncome, setMonthlyIncome] = useState(targets.monthlyIncome || 4000);
  const [monthlyExpenseBudget, setMonthlyExpenseBudget] = useState(targets.monthlyExpenseBudget || 1000);
  const [workingDaysMap, setWorkingDaysMap] = useState(targets.workingDaysMap || {
    mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false
  });
  const [autoAdjustPace, setAutoAdjustPace] = useState(targets.autoAdjustPace ?? true);

  const toggleDay = (key) => {
    setWorkingDaysMap(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const activeDaysCount = Object.values(workingDaysMap).filter(Boolean).length || 1;
  const computedWeeklyTarget = (parseFloat(monthlyIncome) || 0) / 4.333333;
  const computedDailyTarget = computedWeeklyTarget / activeDaysCount;
  const computedDailyExpense = (parseFloat(monthlyExpenseBudget) || 0) / 30;

  const handleSave = (e) => {
    e.preventDefault();
    updateTargets({
      monthlyIncome: parseFloat(monthlyIncome) || 4000,
      monthlyExpenseBudget: parseFloat(monthlyExpenseBudget) || 1000,
      workingDaysPerWeek: activeDaysCount,
      workingDaysMap,
      autoAdjustPace,
    });
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div 
        className={`w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-5 max-h-[90vh] overflow-y-auto animate-slideUp transition-all ${
          isDark ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-900 shadow-2xl'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Target className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-bold text-base">Driver Target & Plan Manager</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Configure daily, weekly & monthly milestones</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Monthly Target Input */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Monthly Earnings Goal ({currency.symbol})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-slate-400 font-bold">{currency.symbol}</span>
              <input
                type="number"
                step="50"
                min="100"
                required
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 text-lg font-bold font-mono-num rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
          </div>

          {/* Working Days Selector */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Scheduled Driving Days ({activeDaysCount} days/week)
              </label>
              <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">
                Tap to toggle
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {DAYS_OF_WEEK.map((day) => {
                const isActive = Boolean(workingDaysMap[day.key]);
                return (
                  <button
                    type="button"
                    key={day.key}
                    onClick={() => toggleDay(day.key)}
                    className={`py-2 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    <span>{day.label}</span>
                    <span className="text-[9px] mt-0.5 opacity-80">
                      {isActive ? 'DRIVE' : 'REST'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Monthly Expense Budget */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Monthly Operating Expense Budget / Ceiling ({currency.symbol})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-slate-400 font-bold">{currency.symbol}</span>
              <input
                type="number"
                step="25"
                min="0"
                required
                value={monthlyExpenseBudget}
                onChange={(e) => setMonthlyExpenseBudget(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 text-lg font-bold font-mono-num rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Fuel, maintenance, insurance, wash, and phone costs budget.
            </p>
          </div>

          {/* DYNAMIC CALCULATED BREAKDOWN PREVIEW */}
          <div className="p-3.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 space-y-2">
            <span className="text-xs font-bold text-indigo-950 dark:text-indigo-200 uppercase tracking-wider block">
              Automated Target Breakdown
            </span>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xs">
                <p className="text-[10px] text-slate-400 font-medium">Daily Milestone</p>
                <p className="text-xs font-extrabold font-mono-num text-indigo-600 dark:text-indigo-400">
                  {formatCurrency(computedDailyTarget, currency)}
                </p>
                <span className="text-[9px] text-slate-400">per work day</span>
              </div>

              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xs">
                <p className="text-[10px] text-slate-400 font-medium">Weekly Milestone</p>
                <p className="text-xs font-extrabold font-mono-num text-indigo-600 dark:text-indigo-400">
                  {formatCurrency(computedWeeklyTarget, currency)}
                </p>
                <span className="text-[9px] text-slate-400">per week</span>
              </div>

              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-2xs">
                <p className="text-[10px] text-slate-400 font-medium">Daily Cost Limit</p>
                <p className="text-xs font-extrabold font-mono-num text-rose-500">
                  {formatCurrency(computedDailyExpense, currency)}
                </p>
                <span className="text-[9px] text-slate-400">expense cap</span>
              </div>
            </div>
          </div>

          {/* Smart Rebalancer Pace Toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <div>
                <p className="text-xs font-bold">Smart Weekly Pace Rebalancer</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Dynamically adjust remaining daily targets if you miss a day
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoAdjustPace}
              onChange={(e) => setAutoAdjustPace(e.target.checked)}
              className="w-5 h-5 accent-indigo-600 rounded cursor-pointer"
            />
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Save Plan Settings</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
