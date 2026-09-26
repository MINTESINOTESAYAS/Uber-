import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator';
import { INCOME_PLATFORMS, EXPENSE_CATEGORIES } from '../constants';
import { 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  Car, 
  Fuel, 
  Trash2, 
  Edit3, 
  Plus, 
  Calendar,
  FileSpreadsheet
} from 'lucide-react';

export default function LedgerHistoryView() {
  const { 
    incomes, 
    expenses, 
    currency, 
    theme, 
    openEditModal, 
    setActiveModal 
  } = useApp();

  const isDark = theme === 'dark' || theme === 'noir';

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // 'all', 'income', 'expense'

  // Combine and sort
  const combined = useMemo(() => {
    const list = [
      ...incomes.map(i => ({
        ...i,
        type: 'income',
        amount: (Number(i.grossAmount) || 0) + (Number(i.tips) || 0) + (Number(i.bonus) || 0),
      })),
      ...expenses.map(e => ({
        ...e,
        type: 'expense',
        amount: Number(e.amount) || 0,
      })),
    ];

    return list.sort((a, b) => b.date.localeCompare(a.date));
  }, [incomes, expenses]);

  // Filtered
  const filtered = useMemo(() => {
    return combined.filter(item => {
      if (filterType === 'income' && item.type !== 'income') return false;
      if (filterType === 'expense' && item.type !== 'expense') return false;

      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      const notes = (item.notes || '').toLowerCase();
      const date = (item.date || '').toLowerCase();
      const category = (item.category || '').toLowerCase();
      const platform = (item.platform || '').toLowerCase();

      return notes.includes(term) || date.includes(term) || category.includes(term) || platform.includes(term);
    });
  }, [combined, filterType, searchTerm]);

  // Group by date
  const groupedByDate = useMemo(() => {
    const groups = {};
    filtered.forEach(item => {
      if (!groups[item.date]) {
        groups[item.date] = [];
      }
      groups[item.date].push(item);
    });
    return groups;
  }, [filtered]);

  const totalFilteredIncome = filtered
    .filter(i => i.type === 'income')
    .reduce((acc, c) => acc + c.amount, 0);

  const totalFilteredExpense = filtered
    .filter(i => i.type === 'expense')
    .reduce((acc, c) => acc + c.amount, 0);

  return (
    <div className="px-4 py-2 pb-24 space-y-4">
      {/* Header & Controls */}
      <div className={`p-4 rounded-3xl border transition-all ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold tracking-tight">Ledger Records</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {filtered.length} entries found
            </p>
          </div>
          <button
            onClick={() => setActiveModal('exportExcel')}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold text-xs hover:bg-emerald-100 transition"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Excel Export</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative mb-3">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by notes, platform, category, date..."
            className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800 text-xs rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition text-slate-900 dark:text-white"
          />
        </div>

        {/* Filter Pills */}
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setFilterType('all')}
            className={`py-1.5 rounded-xl transition ${
              filterType === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500'
            }`}
          >
            All ({combined.length})
          </button>
          <button
            onClick={() => setFilterType('income')}
            className={`py-1.5 rounded-xl transition ${
              filterType === 'income'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Income ({incomes.length})
          </button>
          <button
            onClick={() => setFilterType('expense')}
            className={`py-1.5 rounded-xl transition ${
              filterType === 'expense'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-slate-500'
            }`}
          >
            Expense ({expenses.length})
          </button>
        </div>

        {/* Filter summary preview */}
        <div className="flex items-center justify-between text-xs mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-slate-400 text-[10px]">Income: </span>
            <strong className="text-emerald-600 dark:text-emerald-400 font-mono-num">
              +{formatCurrency(totalFilteredIncome, currency)}
            </strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">Expense: </span>
            <strong className="text-rose-500 font-mono-num">
              -{formatCurrency(totalFilteredExpense, currency)}
            </strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px]">Net: </span>
            <strong className="text-slate-900 dark:text-white font-mono-num">
              {formatCurrency(totalFilteredIncome - totalFilteredExpense, currency)}
            </strong>
          </div>
        </div>
      </div>

      {/* Grouped Ledger Entries */}
      {Object.keys(groupedByDate).length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          <p className="text-sm font-semibold">No records match your filter.</p>
          <p className="text-xs mt-1">Try clearing your search query.</p>
        </div>
      ) : (
        Object.entries(groupedByDate).map(([dateStr, items]) => {
          const dayIncome = items
            .filter(i => i.type === 'income')
            .reduce((acc, c) => acc + c.amount, 0);
          const dayExpense = items
            .filter(i => i.type === 'expense')
            .reduce((acc, c) => acc + c.amount, 0);

          return (
            <div
              key={dateStr}
              className={`p-4 rounded-3xl border transition-all ${
                isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
              }`}
            >
              {/* Date Header */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {dateStr}
                </span>
                <span className="text-[11px] font-mono-num font-semibold text-slate-500">
                  Net: {formatCurrency(dayIncome - dayExpense, currency)}
                </span>
              </div>

              {/* Items for this date */}
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {items.map(item => {
                  const isIncome = item.type === 'income';
                  const plat = isIncome ? (INCOME_PLATFORMS.find(p => p.id === item.platform)?.name || 'Income') : null;
                  const cat = !isIncome ? (EXPENSE_CATEGORIES.find(c => c.id === item.category)?.name || 'Expense') : null;

                  return (
                    <div
                      key={item.id}
                      onClick={() => openEditModal(item, item.type)}
                      className="py-2.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 px-1 rounded-xl cursor-pointer transition"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isIncome ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60' : 'bg-rose-100 text-rose-600 dark:bg-rose-950/60'
                        }`}>
                          {isIncome ? <ArrowUpRight className="w-4 h-4 stroke-[2.5]" /> : <ArrowDownRight className="w-4 h-4 stroke-[2.5]" />}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold">{isIncome ? plat : cat}</span>
                            {item.notes && (
                              <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                                - {item.notes}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5">
                            {isIncome && item.trips ? `${item.trips} trips • ` : ''}
                            {isIncome && item.hours ? `${item.hours} hrs • ` : ''}
                            {!isIncome && item.paymentMethod ? `${item.paymentMethod} • ` : ''}
                            {!isIncome && item.mileage ? `${item.mileage} mi` : ''}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className={`text-xs font-bold font-mono-num ${
                          isIncome ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                        }`}>
                          {isIncome ? '+' : '-'}{formatCurrency(item.amount, currency)}
                        </p>
                        <span className="text-[9px] text-slate-400">Tap to edit</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
