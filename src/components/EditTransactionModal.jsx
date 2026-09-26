import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator';
import { INCOME_PLATFORMS, EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../constants';
import { 
  X, 
  Trash2, 
  Check, 
  Car, 
  Fuel, 
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function EditTransactionModal() {
  const { 
    editingItem, 
    updateIncome, 
    deleteIncome, 
    updateExpense, 
    deleteExpense, 
    setActiveModal, 
    currency, 
    theme 
  } = useApp();

  const isDark = theme === 'dark' || theme === 'noir';

  if (!editingItem || !editingItem.item) return null;

  const { item, type } = editingItem;
  const isIncome = type === 'income';

  // State
  const [date, setDate] = useState(item.date || '');
  const [platform, setPlatform] = useState(item.platform || 'uber');
  const [grossAmount, setGrossAmount] = useState(item.grossAmount || '');
  const [tips, setTips] = useState(item.tips || '');
  const [bonus, setBonus] = useState(item.bonus || '');
  const [hours, setHours] = useState(item.hours || '');
  const [trips, setTrips] = useState(item.trips || '');

  const [category, setCategory] = useState(item.category || 'fuel');
  const [amount, setAmount] = useState(item.amount || '');
  const [paymentMethod, setPaymentMethod] = useState(item.paymentMethod || 'Debit Card');
  const [mileage, setMileage] = useState(item.mileage || '');
  const [notes, setNotes] = useState(item.notes || '');

  const handleSave = (e) => {
    e.preventDefault();
    if (isIncome) {
      updateIncome(item.id, {
        date,
        platform,
        grossAmount: parseFloat(grossAmount) || 0,
        tips: parseFloat(tips) || 0,
        bonus: parseFloat(bonus) || 0,
        hours: parseFloat(hours) || 0,
        trips: parseInt(trips, 10) || 0,
        notes,
      });
    } else {
      updateExpense(item.id, {
        date,
        category,
        amount: parseFloat(amount) || 0,
        paymentMethod,
        mileage,
        notes,
      });
    }
    setActiveModal(null);
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this record?')) {
      if (isIncome) {
        deleteIncome(item.id);
      } else {
        deleteExpense(item.id);
      }
      setActiveModal(null);
    }
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
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isIncome 
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
            }`}>
              {isIncome ? 'EDIT INCOME' : 'EDIT EXPENSE'}
            </span>
            <span className="text-xs text-slate-400">ID: {item.id}</span>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* Income Form Fields */}
          {isIncome ? (
            <>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1">
                  Platform
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                >
                  {INCOME_PLATFORMS.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Gross Fare
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={grossAmount}
                    onChange={(e) => setGrossAmount(e.target.value)}
                    className="w-full px-2.5 py-2 text-sm font-bold font-mono-num rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Tips
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={tips}
                    onChange={(e) => setTips(e.target.value)}
                    className="w-full px-2.5 py-2 text-sm font-bold font-mono-num rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Bonus
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={bonus}
                    onChange={(e) => setBonus(e.target.value)}
                    className="w-full px-2.5 py-2 text-sm font-bold font-mono-num rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Hours</label>
                  <input
                    type="number"
                    step="0.1"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Trips</label>
                  <input
                    type="number"
                    value={trips}
                    onChange={(e) => setTrips(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
            </>
          ) : (
            /* Expense Form Fields */
            <>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none"
                >
                  {EXPENSE_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 text-base font-bold font-mono-num rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Payment Method</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    {PAYMENT_METHODS.map(pm => (
                      <option key={pm} value={pm}>{pm}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Mileage / Odo</label>
                  <input
                    type="text"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center space-x-2">
            <button
              type="button"
              onClick={handleDelete}
              className="py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-300 font-bold text-xs flex items-center space-x-1.5 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
