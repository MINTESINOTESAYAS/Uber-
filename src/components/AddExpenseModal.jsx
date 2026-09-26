import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatDateISO, formatCurrency } from '../utils/calculator';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../constants';
import { 
  X, 
  Minus, 
  DollarSign, 
  Fuel, 
  Wrench, 
  Sparkles, 
  CreditCard, 
  Coffee, 
  Smartphone, 
  Calendar,
  Gauge
} from 'lucide-react';

export default function AddExpenseModal() {
  const { 
    addExpense, 
    setActiveModal, 
    currency, 
    theme 
  } = useApp();

  const isDark = theme === 'dark' || theme === 'noir';

  const [date, setDate] = useState(formatDateISO(new Date()));
  const [category, setCategory] = useState('fuel');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[1]); // Debit Card
  const [mileage, setMileage] = useState('');
  const [notes, setNotes] = useState('');

  const parsedAmount = parseFloat(amount) || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parsedAmount <= 0) {
      alert('Please enter a valid expense amount.');
      return;
    }

    addExpense({
      date,
      category,
      amount: parsedAmount,
      paymentMethod,
      mileage,
      notes,
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
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Minus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-base">Record Driver Expense</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Track fuel, maintenance, tolls & costs</p>
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
          {/* Category selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1.5">
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
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                  <span className="truncate">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amount input */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Amount Spent ({currency.symbol})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3 text-slate-400 font-bold">{currency.symbol}</span>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-3 py-2.5 text-lg font-bold font-mono-num rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-rose-500 transition"
              />
            </div>
          </div>

          {/* Date & Payment Method */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-2 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-rose-500 transition"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-2 py-2 text-xs font-semibold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-rose-500 transition"
              >
                {PAYMENT_METHODS.map((pm) => (
                  <option key={pm} value={pm}>{pm}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Odometer & Notes */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Odometer / Mileage (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. 124,500"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-rose-500 transition"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-500 block mb-1">
                Notes / Station (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Shell premium gas"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none focus:ring-2 focus:ring-rose-500 transition"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              <Minus className="w-4 h-4 stroke-[2.5]" />
              <span>Record Expense ({formatCurrency(parsedAmount, currency)})</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
