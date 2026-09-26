import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator.js';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../constants.js';
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
    currency 
  } = useApp();

  if (!editingItem || !editingItem.item) return null;

  const { item, type } = editingItem;
  const isIncome = type === 'income';

  // State
  const [date, setDate] = useState(item.date || '');
  const [grossAmount, setGrossAmount] = useState(item.grossAmount || '');
  const [tips, setTips] = useState(item.tips || '');
  const [bonus, setBonus] = useState(item.bonus || '');
  const [hours, setHours] = useState(item.hours || '');
  const [trips, setTrips] = useState(item.trips || '');

  const [category, setCategory] = useState(item.category || 'fuel');
  const [amount, setAmount] = useState(item.amount || '');
  const [paymentMethod, setPaymentMethod] = useState(item.paymentMethod || PAYMENT_METHODS[0]);
  const [mileage, setMileage] = useState(item.mileage || '');
  const [notes, setNotes] = useState(item.notes || '');

  const handleSave = (e) => {
    e.preventDefault();
    if (isIncome) {
      updateIncome(item.id, {
        date,
        platform: 'yango',
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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xs p-0 sm:p-4">
      <div className="w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-5 max-h-[90vh] overflow-y-auto bg-slate-900 text-white border border-slate-800 shadow-2xl animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isIncome 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
            }`}>
              {isIncome ? 'EDIT YANGO INCOME' : 'EDIT EXPENSE'}
            </span>
            <span className="text-xs text-slate-400">ID: {item.id}</span>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
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
                  Ride Platform
                </label>
                <div className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-emerald-400 flex items-center space-x-2">
                  <Car className="w-4 h-4 text-red-500" />
                  <span>Yango Ride</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Gross Fare (ETB)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={grossAmount}
                    onChange={(e) => setGrossAmount(e.target.value)}
                    className="w-full px-2.5 py-2 text-sm font-bold font-mono-num rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Tips (ETB)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={tips}
                    onChange={(e) => setTips(e.target.value)}
                    className="w-full px-2.5 py-2 text-sm font-bold font-mono-num rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                    Bonus / Quests
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={bonus}
                    onChange={(e) => setBonus(e.target.value)}
                    className="w-full px-2.5 py-2 text-sm font-bold font-mono-num rounded-xl bg-slate-950 border border-slate-800 text-white"
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
                    className="w-full px-2 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Hours</label>
                  <input
                    type="number"
                    step="0.5"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 block mb-1">Trips</label>
                  <input
                    type="number"
                    value={trips}
                    onChange={(e) => setTrips(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
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
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl bg-slate-950 border border-slate-800 text-white outline-none"
                >
                  {EXPENSE_CATEGORIES.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Amount (ETB)</label>
                  <input
                    type="number"
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 text-base font-bold font-mono-num rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 block mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-2 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
                  />
                </div>
              </div>

              {/* STRICTLY CBE, TELEBIRR, CASH */}
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1.5">
                  Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PAYMENT_METHODS.map(pm => (
                    <button
                      type="button"
                      key={pm}
                      onClick={() => setPaymentMethod(pm)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold transition text-center ${
                        paymentMethod === pm
                          ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400/50 font-extrabold'
                          : 'bg-slate-950 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-bold text-slate-400 block mb-1">Shift Notes / Route</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white"
            />
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex items-center space-x-2">
            <button
              type="button"
              onClick={handleDelete}
              className="py-2.5 px-4 rounded-xl bg-rose-950/60 hover:bg-rose-900 text-rose-300 font-bold text-xs flex items-center space-x-1.5 border border-rose-800 transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </button>

            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition"
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
