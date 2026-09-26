import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator.js';
import { Gauge, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CarSpeedometerGauge({ period, setPeriod }) {
  const { metrics, currency } = useApp();

  const data = useMemo(() => {
    if (period === 'today') {
      return {
        actual: metrics.today.income,
        target: metrics.standards.dailyTarget,
        progress: metrics.today.progress,
        variance: metrics.today.variance,
        label: "Today's Daily Target",
        sublabel: "Daily Shift Target",
      };
    }
    if (period === 'week') {
      return {
        actual: metrics.week.income,
        target: metrics.standards.weeklyTarget,
        progress: metrics.week.progress,
        variance: metrics.week.variance,
        label: "This Week's Target",
        sublabel: `${metrics.standards.workingDaysPerWeek} Days Plan`,
      };
    }
    return {
      actual: metrics.month.income,
      target: metrics.standards.monthlyTarget,
      progress: metrics.month.progress,
      variance: metrics.month.variance,
      label: "Monthly Goal Target",
      sublabel: "Month Target",
    };
  }, [period, metrics]);

  // Speedometer math
  // Sweep from -135deg to +135deg (total 270 degrees)
  const clampedProgress = Math.min(130, Math.max(0, data.progress || 0));
  const progressRatio = clampedProgress / 100; // 1.0 = target achieved
  const needleAngle = -135 + Math.min(270, progressRatio * 270);

  // SVG Arc calculation
  // Radius = 100, Center = (130, 130)
  const radius = 95;
  const cx = 130;
  const cy = 130;
  const startAngle = 135 * (Math.PI / 180);
  const totalSweep = 270 * (Math.PI / 180);

  // Background arc circumference
  const arcLength = radius * totalSweep; // total arc perimeter
  const currentArcLength = Math.min(arcLength, (clampedProgress / 100) * arcLength);

  const isAchieved = data.actual >= data.target;

  return (
    <div className="relative flex flex-col items-center">
      {/* Period Selector Tabs: Today | Week | Month */}
      <div className="flex bg-slate-900/90 border border-slate-800 p-1 rounded-2xl mb-2 shadow-inner">
        <button
          type="button"
          onClick={() => setPeriod('today')}
          className={`px-3.5 py-1 rounded-xl text-xs font-bold transition-all ${
            period === 'today'
              ? 'bg-emerald-500 text-slate-950 shadow-md scale-102'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Daily
        </button>
        <button
          type="button"
          onClick={() => setPeriod('week')}
          className={`px-3.5 py-1 rounded-xl text-xs font-bold transition-all ${
            period === 'week'
              ? 'bg-emerald-500 text-slate-950 shadow-md scale-102'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Weekly
        </button>
        <button
          type="button"
          onClick={() => setPeriod('month')}
          className={`px-3.5 py-1 rounded-xl text-xs font-bold transition-all ${
            period === 'month'
              ? 'bg-emerald-500 text-slate-950 shadow-md scale-102'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Speedometer Instrument Dial */}
      <div className="relative w-64 h-56 flex items-center justify-center">
        <svg viewBox="0 0 260 230" className="w-full h-full overflow-visible">
          <defs>
            {/* Speedometer Track Glow Gradient */}
            <linearGradient id="speedoGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="65%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>

            <linearGradient id="needleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>

            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Gauge Bezel Ring */}
          <circle
            cx={cx}
            cy={cy}
            r="115"
            fill="none"
            stroke="#1E293B"
            strokeWidth="2"
            opacity="0.8"
          />

          {/* Speedometer Background Track */}
          <path
            d="M 62.8 197.1 A 95 95 0 1 1 197.1 197.1"
            fill="none"
            stroke="#1E293B"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Speedometer Dynamic Progress Arc */}
          <path
            d="M 62.8 197.1 A 95 95 0 1 1 197.1 197.1"
            fill="none"
            stroke="url(#speedoGradient)"
            strokeWidth="14"
            strokeDasharray={`${currentArcLength} ${arcLength}`}
            strokeLinecap="round"
            filter="url(#glow)"
            className="transition-all duration-700 ease-out"
          />

          {/* Target Speedometer Marker (Speed limit / Target Flag at 100%) */}
          <g transform={`rotate(135 ${cx} ${cy})`}>
            <line
              x1={cx}
              y1={cy - radius - 12}
              x2={cx}
              y2={cy - radius + 12}
              stroke="#F59E0B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* Speedometer Ticks */}
          {/* 0% tick */}
          <text x="52" y="214" fill="#64748B" fontSize="9" fontWeight="bold" textAnchor="middle">0</text>
          {/* 50% tick */}
          <text x="130" y="24" fill="#64748B" fontSize="9" fontWeight="bold" textAnchor="middle">50%</text>
          {/* Target 100% tick */}
          <text x="210" y="214" fill="#10B981" fontSize="9" fontWeight="bold" textAnchor="middle">TARGET</text>

          {/* Speedometer Needle */}
          <g
            transform={`rotate(${needleAngle} ${cx} ${cy})`}
            className="transition-transform duration-700 ease-out"
          >
            {/* Needle pointer */}
            <polygon
              points={`${cx - 3},${cy} ${cx + 3},${cy} ${cx},${cy - radius + 2}`}
              fill="url(#needleGradient)"
              filter="drop-shadow(0 0 3px rgba(239,68,68,0.8))"
            />
            {/* Needle center cap */}
            <circle cx={cx} cy={cy} r="10" fill="#0F172A" stroke="#EF4444" strokeWidth="2.5" />
            <circle cx={cx} cy={cy} r="4" fill="#FFFFFF" />
          </g>
        </svg>

        {/* Center Digital Readout HUD */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8 pointer-events-none">
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-0.5">
            Actual Earned
          </span>
          <p className="text-2xl font-black font-mono-num text-white tracking-tight drop-shadow-md">
            {formatCurrency(data.actual, currency)}
          </p>

          <p className="text-[11px] font-semibold text-slate-400 font-mono-num mt-0.5">
            Target: <span className="text-slate-200">{formatCurrency(data.target, currency)}</span>
          </p>
        </div>
      </div>

      {/* Target Status Pill */}
      <div className="mt-1 flex items-center space-x-2">
        <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm ${
          isAchieved
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
        }`}>
          {isAchieved ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Target Achieved ({data.progress.toFixed(0)}%)</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>
                {formatCurrency(Math.abs(data.variance), currency)} needed ({data.progress.toFixed(0)}%)
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
