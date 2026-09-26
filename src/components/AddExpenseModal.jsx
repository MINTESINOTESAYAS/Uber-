import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatDateISO, formatCurrency } from '../utils/calculator.js';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../constants.js';
import { 
  X, 
  Minus, 
  Calendar, 
  Fuel, 
  Wallet, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export default function AddExpenseModal() {
  const { 
    addExpense, 
    setActiveModal, 
    currency 
  } = useApp();

  const todayStr = formatDateISO(new Date());

  const getDaysAgoStr = (days) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return formatDateISO(d);
  };

  const [date, setDate] = useState(todayStr);
  const [category, setCategory] = useState('fuel');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0]); // CBE default
  const [mileage, setMileage] = useState('');
  const [notes, setNotes] = useState('');

  const parsedAmount = parseFloat(amount) || 0;
  const isPastDate = date !== todayStr;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parsedAmount <= 0) {
      alert('Please enter a valid expense amount in ETB.');
      return;
    }

    addExpense({
      date,
      category,
      amount: parsedAmount,
      paymentMethod, // Strictly CBE, Telebirr, or Cash
      mileage,
      notes,
    });

    setActiveModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xs p-0 sm:p-4">
      <div className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-5 max-h-[90vh] overflow-y-auto bg-slate-900 text-white border border-slate-800 shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-500 flex items-center justify-center">
              <Minus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Record Vehicle Expense</h3>
              <p className="text-[11px] text-slate-400">Fuel, maintenance, wash, or food in ETB</p>
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
          {/* PAST DATE SELECTOR (Command 6) */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-rose-400" />
                <span>Expense Date</span>
              </span>
              {isPastDate && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Previous Day Expense
                </span>
              )}
            </div>

            {/* Quick buttons */}
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => setDate(todayStr)}
                className={`py-1.5 rounded-xl text-xs font-bold transition ${
                  date === todayStr
                    ? 'bg-rose-500 text-white font-extrabold'
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
                    ? 'bg-rose-500 text-white font-extrabold'
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
                    ? 'bg-rose-500 text-white font-extrabold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                2 Days Ago
              </button>
            </div>

            {/* Past date input */}
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
                className="w-full px-3 py-1.5 text-xs font-mono-num font-bold rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-rose-500 transition"
              />
            </div>
          </div>

          {/* Category Chips */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Expense Category
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {EXPENSE_CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold text-left transition flex items-center gap-2 truncate ${
                    category === cat.id
                      ? 'bg-rose-500 text-white shadow-xs'
                      : 'bg-slate-950 text-slate-300 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amount in ETB */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Amount Spent (ETB)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-rose-400 font-extrabold">Br</span>
              <input
                type="number"
                step="1"
                min="0"
                required
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 text-xl font-black font-mono-num rounded-2xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-rose-500 transition"
              />
            </div>
          </div>

          {/* PAYMENT METHOD: STRICTLY CBE, TELEBIRR, CASH (Command 4) */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Payment Method (CBE / Telebirr / Cash)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PAYMENT_METHODS.map((pm) => (
                <button
                  type="button"
                  key={pm}
                  onClick={() => setPaymentMethod(pm)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-extrabold transition text-center ${
                    paymentMethod === pm
                      ? 'bg-emerald-500 text-slate-950 shadow-md ring-2 ring-emerald-400/50 scale-102'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>

          {/* Mileage & Notes */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Odometer / KM (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 142,300"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-rose-500 transition"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                Gas Station / Notes
              </label>
              <input
                type="text"
                placeholder="e.g. TotalEnergies Bole"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-rose-500 transition"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 transition cursor-pointer"
          >
            <Minus className="w-4 h-4 stroke-[3]" />
            <span>Record Expense ({formatCurrency(parsedAmount, currency)})</span>
          </button>
        </form>
      </div>
    </div>
  );
}
