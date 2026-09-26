import React from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator.js';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Clock, 
  Car, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function BalanceCard({ activePeriod, setActivePeriod }) {
  const { metrics, currency, theme } = useApp();

  const isDark = theme === 'dark' || theme === 'noir';

  const periodData = activePeriod === 'today' 
    ? metrics.today 
    : activePeriod === 'week' 
      ? metrics.week 
      : metrics.month;

  const targetValue = periodData?.target || 0;
  const incomeValue = periodData?.income || 0;
  const expenseValue = periodData?.expense || 0;
  const netValue = periodData?.net || 0;
  const progressPercent = periodData?.progress || 0;
  const hours = periodData?.hours || 0;
  const trips = periodData?.trips || 0;

  const isAhead = incomeValue >= targetValue;
  const diff = incomeValue - targetValue;

  return (
    <div className="px-4 pt-3 pb-2">
      {/* Fam Fund Signature Hero Card */}
      <div className={`relative overflow-hidden rounded-3xl p-5 shadow-xl transition-all ${
        isDark 
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white border border-slate-700/60' 
          : 'bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white'
      }`}>
        {/* Decorative background ambient glows */}
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-teal-300/15 rounded-full blur-xl pointer-events-none"></div>

        {/* Top Segmented Controls: Today | Week | Month */}
        <div className="relative z-10 flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-emerald-100/90 uppercase tracking-wider">
            {activePeriod === 'today' ? "Today's Yango Shift" : activePeriod === 'week' ? "This Week's Plan" : "This Month's Plan"}
          </span>

          <div className="flex bg-black/25 backdrop-blur-md p-1 rounded-2xl border border-white/10">
            <button
              onClick={() => setActivePeriod('today')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                activePeriod === 'today'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActivePeriod('week')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                activePeriod === 'week'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setActivePeriod('month')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                activePeriod === 'month'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        {/* Net Profit Display in ETB */}
        <div className="relative z-10 mb-4">
          <p className="text-xs text-emerald-100/80 font-medium mb-0.5">Net Take-Home Earnings</p>
          <div className="flex items-baseline space-x-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono-num">
              {formatCurrency(netValue, currency)}
            </h2>
            {/* Status chip */}
            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${
              isAhead
                ? 'bg-emerald-400/25 text-emerald-200 border border-emerald-300/30'
                : 'bg-amber-400/25 text-amber-200 border border-amber-300/30'
            }`}>
              {isAhead ? (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                  Target Met
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 text-amber-300" />
                  {formatCurrency(Math.abs(diff), currency)} to Goal
                </>
              )}
            </span>
          </div>
        </div>

        {/* Income & Expense Breakdown Pills */}
        <div className="relative z-10 grid grid-cols-2 gap-3 mb-4">
          {/* Gross Income Pill */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] text-white/70 font-medium truncate">Yango Gross</p>
              <p className="text-sm sm:text-base font-bold text-white font-mono-num truncate">
                {formatCurrency(incomeValue, currency)}
              </p>
            </div>
          </div>

          {/* Operating Expense Pill */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-400/20 text-rose-300 flex items-center justify-center shrink-0">
              <ArrowDownRight className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="overflow-hidden">
              <p className="text-[11px] text-white/70 font-medium truncate">Expenses</p>
              <p className="text-sm sm:text-base font-bold text-white font-mono-num truncate">
                {formatCurrency(expenseValue, currency)}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom meta row: Target Comparison & Driving stats */}
        <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
          <div className="flex items-center space-x-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
            <span>Target: <strong className="text-white">{formatCurrency(targetValue, currency)}</strong></span>
            <span className="text-[11px] opacity-75">({progressPercent.toFixed(0)}%)</span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            {hours > 0 && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 opacity-70" />
                {hours}h
              </span>
            )}
            {trips > 0 && (
              <span className="flex items-center gap-1">
                <Car className="w-3 h-3 opacity-70" />
                {trips} trips
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
