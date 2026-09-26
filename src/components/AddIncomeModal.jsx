import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatDateISO, formatCurrency } from '../utils/calculator.js';
import confetti from 'canvas-confetti';
import { 
  X, 
  Plus, 
  Calendar, 
  Car, 
  Clock, 
  Sparkles,
  Check,
  AlertCircle
} from 'lucide-react';

export default function AddIncomeModal() {
  const { 
    addIncome, 
    setActiveModal, 
    currency, 
    metrics 
  } = useApp();

  const todayStr = formatDateISO(new Date());

  // Quick past date helper
  const getDaysAgoStr = (days) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return formatDateISO(d);
  };

  const [date, setDate] = useState(todayStr);
  const [grossAmount, setGrossAmount] = useState('');
  const [tips, setTips] = useState('');
  const [bonus, setBonus] = useState('');
  const [hours, setHours] = useState('');
  const [trips, setTrips] = useState('');
  const [notes, setNotes] = useState('');

  const grossVal = parseFloat(grossAmount) || 0;
  const tipsVal = parseFloat(tips) || 0;
  const bonusVal = parseFloat(bonus) || 0;
  const totalAmount = grossVal + tipsVal + bonusVal;

  const isPastDate = date !== todayStr;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalAmount <= 0) {
      alert('Please enter a valid fare earnings amount.');
      return;
    }

    addIncome({
      date,
      platform: 'yango', // Strictly Yango Ride
      grossAmount: grossVal,
      tips: tipsVal,
      bonus: bonusVal,
      hours: parseFloat(hours) || 0,
      trips: parseInt(trips, 10) || 0,
      notes,
    });

    if (totalAmount >= metrics.standards.dailyTarget) {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    }

    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xs p-0 sm:p-4">
      <div className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-5 max-h-[90vh] overflow-y-auto bg-slate-900 text-white border border-slate-800 shadow-2xl animate-slideUp">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-600/20 text-red-500 flex items-center justify-center">
              <Car className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Record Yango Income</h3>
              <p className="text-[11px] text-slate-400">Yango Ride daily earnings in ETB</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* PAST DATE SELECTOR (Command 6: Add previous days if forgot) */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>Shift Date</span>
              </span>
              {isPastDate && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Previous Day Entry
                </span>
              )}
            </div>

            {/* Quick date buttons */}
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setDate(todayStr)}
                className={`py-1.5 rounded-xl text-xs font-bold transition ${
                  date === todayStr
                    ? 'bg-emerald-500 text-slate-950 font-extrabold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => setDate(getDaysAgoStr(1))}
                className={`py-1.5 rounded-xl text-xs font-bold transition ${
                  date === getDaysAgoStr(1)
                    ? 'bg-emerald-500 text-slate-950 font-extrabold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Yesterday
              </button>
              <button
                type="button"
                onClick={() => setDate(getDaysAgoStr(2))}
                className={`py-1.5 rounded-xl text-xs font-bold transition ${
                  date === getDaysAgoStr(2)
                    ? 'bg-emerald-500 text-slate-950 font-extrabold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                2 Days Ago
              </button>
            </div>

            {/* Custom past date picker */}
            <div className="pt-1">
              <label className="text-[10px] text-slate-400 block mb-1">
                Or pick any past date from calendar:
              </label>
              <input
                type="date"
                required
                value={date}
                max={todayStr}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-1.5 text-xs font-mono-num font-bold rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Amount Inputs in ETB */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Gross Yango Fares (ETB)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-emerald-400 font-extrabold">Br</span>
                <input
                  type="number"
                  step="1"
                  min="0"
                  required
                  placeholder="0.00"
                  value={grossAmount}
                  onChange={(e) => setGrossAmount(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-xl font-black font-mono-num rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Customer Tips (ETB)
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  placeholder="0.00"
                  value={tips}
                  onChange={(e) => setTips(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-bold font-mono-num rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-emerald-500 transition"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                  Yango Quests / Bonus (ETB)
                </label>
                <input
                  type="number"
                  step="1"
                  min="0"
                  placeholder="0.00"
                  value={bonus}
                  onChange={(e) => setBonus(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-bold font-mono-num rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-emerald-500 transition"
                />
              </div>
            </div>

            {/* Total readout badge */}
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300">Total Shift Income:</span>
              <span className="text-lg font-black font-mono-num text-emerald-400">
                {formatCurrency(totalAmount, currency)}
              </span>
            </div>
          </div>

          {/* Driving Shift Metrics: Hours, Trips */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Hours Driven
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                placeholder="e.g. 8"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-emerald-500 transition"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Completed Trips
              </label>
              <input
                type="number"
                step="1"
                min="0"
                placeholder="e.g. 15"
                value={trips}
                onChange={(e) => setTrips(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-emerald-500 transition"
              />
            </div>
          </div>

          {/* Shift notes */}
          <div>
            <label className="text-[11px] font-semibold text-slate-400 block mb-1">
              Shift Routes / Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Bole airport rush, Piazza, morning surge..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-emerald-500 transition"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Save Yango Income ({formatCurrency(totalAmount, currency)})</span>
          </button>
        </form>
      </div>
    </div>
  );
}
