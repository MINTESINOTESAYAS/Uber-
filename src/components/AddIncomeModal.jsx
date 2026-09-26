import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatDateISO, formatCurrency } from '../utils/calculator';
import { INCOME_PLATFORMS } from '../constants';
import confetti from 'canvas-confetti';
import { 
  X, 
  Plus, 
  DollarSign, 
  Car, 
  Clock, 
  Calendar, 
  Sparkles,
  FileText
} from 'lucide-react';

export default function AddIncomeModal() {
  const { 
    addIncome, 
    setActiveModal, 
    currency, 
    theme, 
    metrics 
  } = useApp();

  const isDark = theme === 'dark' || theme === 'noir';

  const [date, setDate] = useState(formatDateISO(new Date()));
  const [platform, setPlatform] = useState('uber');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalAmount <= 0) {
      alert('Please enter a valid earnings amount.');
      return;
    }

    addIncome({
      date,
      platform,
      grossAmount: grossVal,
      tips: tipsVal,
      bonus: bonusVal,
      hours: parseFloat(hours) || 0,
      trips: parseInt(trips, 10) || 0,
      notes,
    });

    // Check if new total meets daily target
    const currentTodayIncome = metrics.today.income + totalAmount;
    if (currentTodayIncome >= metrics.standards.dailyTarget) {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4">
      <div 
        className={`w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-5 max-h-[90vh] overflow-y-auto animate-slideUp transition-all ${
          isDark ? 'bg-slate-900 text-white border border-slate-800' : 'bg-white text-slate-900 shadow-2xl'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-base">Record Driving Income</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Add fare earnings, tips & incentives</p>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Platform selection chips */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
              Platform / Service
            </label>
            <div className="flex flex-wrap gap-1.5">
              {INCOME_PLATFORMS.map((plat) => (
                <button
                  type="button"
                  key={plat.id}
                  onClick={() => setPlatform(plat.id)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    platform === plat.id
                      ? 'bg-emerald-600 text-white shadow-xs scale-[1.02]'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>{plat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amount inputs */}
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Base / Gross Fare Amount ({currency.symbol})
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-slate-400 font-bold">{currency.symbol}</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  placeholder="0.00"
                  value={grossAmount}
                  onChange={(e) => setGrossAmount(e.target.value)}
                  className="w-full pl-8 pr-3 py-2.5 text-lg font-bold font-mono-num rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Tips ({currency.symbol})
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={tips}
                onChange={(e) => setTips(e.target.value)}
                className="w-full px-3 py-2 text-sm font-semibold font-mono-num rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Bonus / Quest
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={bonus}
                onChange={(e) => setBonus(e.target.value)}
                className="w-full px-3 py-2 text-sm font-semibold font-mono-num rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Total Earned
              </label>
              <div className="px-3 py-2 text-sm font-black font-mono-num rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 truncate">
                {formatCurrency(totalAmount, currency)}
              </div>
            </div>
          </div>

          {/* Operational Details: Hours, Trips, Date */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-2 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Hours Driven
              </label>
              <input
                type="number"
                step="0.25"
                min="0"
                placeholder="e.g. 6.5"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Trips Count
              </label>
              <input
                type="number"
                step="1"
                min="0"
                placeholder="e.g. 12"
                value={trips}
                onChange={(e) => setTrips(e.target.value)}
                className="w-full px-3 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 transition"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="text-[11px] font-semibold text-slate-500 block mb-1">
              Shift Notes / Location (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Airport rush, rainy morning surge..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Save Income ({formatCurrency(totalAmount, currency)})</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
