import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator.js';
import { DAYS_OF_WEEK } from '../constants.js';
import { 
  X, 
  Target, 
  Check, 
  Zap, 
  Sliders 
} from 'lucide-react';

export default function TargetSettingsModal() {
  const { 
    targets, 
    updateTargets, 
    setActiveModal, 
    currency 
  } = useApp();

  const [monthlyIncome, setMonthlyIncome] = useState(targets.monthlyIncome || 95000);
  const [monthlyExpenseBudget, setMonthlyExpenseBudget] = useState(targets.monthlyExpenseBudget || 24000);
  const [workingDaysMap, setWorkingDaysMap] = useState(targets.workingDaysMap || {
    mon: true, tue: true, wed: true, thu: true, fri: true, sat: true, sun: false
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
      monthlyIncome: parseFloat(monthlyIncome) || 95000,
      monthlyExpenseBudget: parseFloat(monthlyExpenseBudget) || 24000,
      workingDaysPerWeek: activeDaysCount,
      workingDaysMap,
      autoAdjustPace,
    });
    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xs p-0 sm:p-4">
      <div className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-5 max-h-[90vh] overflow-y-auto bg-slate-900 text-white border border-slate-800 shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Target className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Yango Target Plan Manager</h3>
              <p className="text-[11px] text-slate-400">Configure your daily, weekly & monthly milestones</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Monthly Target Input in ETB */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Monthly Earnings Goal (ETB)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-emerald-400 font-extrabold">Br</span>
              <input
                type="number"
                step="1000"
                min="5000"
                required
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xl font-black font-mono-num rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* Working Days Selector */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Scheduled Driving Days ({activeDaysCount} days/week)
              </label>
              <span className="text-[11px] text-indigo-400 font-semibold">
                Tap day to toggle
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
                        ? 'bg-indigo-600 text-white shadow-xs font-extrabold'
                        : 'bg-slate-950 text-slate-500 border border-slate-800 hover:bg-slate-800'
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

          {/* Monthly Expense Budget in ETB */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Monthly Operating Expense Budget (ETB)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-rose-400 font-extrabold">Br</span>
              <input
                type="number"
                step="500"
                min="0"
                required
                value={monthlyExpenseBudget}
                onChange={(e) => setMonthlyExpenseBudget(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xl font-black font-mono-num rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-indigo-500 transition"
              />
            </div>
          </div>

          {/* DYNAMIC CALCULATED BREAKDOWN PREVIEW */}
          <div className="p-3.5 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 space-y-2">
            <span className="text-xs font-bold text-indigo-200 uppercase tracking-wider block">
              Automated Target Breakdown
            </span>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Daily Shift</p>
                <p className="text-xs font-black font-mono-num text-emerald-400 mt-0.5">
                  {formatCurrency(computedDailyTarget, currency)}
                </p>
                <span className="text-[9px] text-slate-500">per work day</span>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Weekly</p>
                <p className="text-xs font-black font-mono-num text-indigo-400 mt-0.5">
                  {formatCurrency(computedWeeklyTarget, currency)}
                </p>
                <span className="text-[9px] text-slate-500">per week</span>
              </div>

              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Daily Cost Cap</p>
                <p className="text-xs font-black font-mono-num text-rose-400 mt-0.5">
                  {formatCurrency(computedDailyExpense, currency)}
                </p>
                <span className="text-[9px] text-slate-500">expense limit</span>
              </div>
            </div>
          </div>

          {/* Smart Rebalancer Pace Toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-950 rounded-2xl border border-slate-800">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <div>
                <p className="text-xs font-bold text-white">Smart Weekly Pace Rebalancer</p>
                <p className="text-[11px] text-slate-400">
                  Dynamically adjust remaining daily targets if you miss a day
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={autoAdjustPace}
              onChange={(e) => setAutoAdjustPace(e.target.checked)}
              className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 transition cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Save Target Plan Settings</span>
          </button>
        </form>
      </div>
    </div>
  );
}
