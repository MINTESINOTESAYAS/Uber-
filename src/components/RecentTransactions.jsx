import React from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/calculator';
import { INCOME_PLATFORMS, EXPENSE_CATEGORIES } from '../constants';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Fuel, 
  Wrench, 
  Sparkles, 
  CreditCard, 
  Coffee, 
  Smartphone, 
  FileText, 
  Tag, 
  Car, 
  Utensils, 
  Briefcase, 
  Navigation, 
  Clock, 
  ChevronRight,
  MoreVertical
} from 'lucide-react';

export default function RecentTransactions({ limit = 5 }) {
  const { 
    incomes, 
    expenses, 
    currency, 
    theme, 
    openEditModal, 
    setActiveTab 
  } = useApp();

  const isDark = theme === 'dark' || theme === 'noir';

  // Merge incomes and expenses into a single chronological feed
  const combined = [
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
  ].sort((a, b) => {
    // Sort by date descending, then createdAt descending
    const dateComp = b.date.localeCompare(a.date);
    if (dateComp !== 0) return dateComp;
    return (b.createdAt || '').localeCompare(a.createdAt || '');
  });

  const recentList = combined.slice(0, limit);

  const getCategoryInfo = (catId) => {
    return EXPENSE_CATEGORIES.find(c => c.id === catId) || { name: 'Expense', color: '#EF4444', icon: 'tag' };
  };

  const getPlatformInfo = (platId) => {
    return INCOME_PLATFORMS.find(p => p.id === platId) || { name: 'Rideshare', color: '#000000', icon: 'car' };
  };

  const renderIcon = (item) => {
    if (item.type === 'income') {
      const plat = getPlatformInfo(item.platform);
      if (item.platform === 'uber_eats') return <Utensils className="w-4 h-4 text-emerald-600" />;
      if (item.platform === 'private') return <Briefcase className="w-4 h-4 text-indigo-600" />;
      if (item.platform === 'taxi') return <Navigation className="w-4 h-4 text-amber-600" />;
      return <Car className="w-4 h-4 text-emerald-600" />;
    } else {
      const cat = getCategoryInfo(item.category);
      if (item.category === 'fuel') return <Fuel className="w-4 h-4 text-rose-500" />;
      if (item.category === 'maintenance') return <Wrench className="w-4 h-4 text-orange-500" />;
      if (item.category === 'carwash') return <Sparkles className="w-4 h-4 text-cyan-500" />;
      if (item.category === 'tolls_parking') return <CreditCard className="w-4 h-4 text-purple-500" />;
      if (item.category === 'food_drink') return <Coffee className="w-4 h-4 text-pink-500" />;
      if (item.category === 'phone_data') return <Smartphone className="w-4 h-4 text-teal-500" />;
      if (item.category === 'licensing') return <FileText className="w-4 h-4 text-slate-500" />;
      return <Tag className="w-4 h-4 text-rose-500" />;
    }
  };

  return (
    <div className="px-4 py-2">
      <div className={`p-4 rounded-3xl transition-all border ${
        isDark 
          ? 'bg-slate-900 border-slate-800 text-white' 
          : 'bg-white border-slate-100 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-sm tracking-tight">Recent Activity</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Latest recorded income & expenses</p>
          </div>
          <button
            onClick={() => setActiveTab('history')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center space-x-1"
          >
            <span>Full Ledger</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentList.length === 0 ? (
          <div className="text-center py-6 text-slate-400">
            <p className="text-xs">No records added yet.</p>
            <p className="text-[11px] mt-1">Tap + Income or + Expense above to start logging!</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentList.map((item) => {
              const isIncome = item.type === 'income';
              const label = isIncome 
                ? getPlatformInfo(item.platform).name 
                : getCategoryInfo(item.category).name;

              return (
                <div
                  key={item.id}
                  onClick={() => openEditModal(item, item.type)}
                  className="py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/40 px-1 rounded-xl cursor-pointer transition"
                >
                  <div className="flex items-center space-x-3">
                    {/* Icon container */}
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                      isIncome 
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600' 
                        : 'bg-rose-50 dark:bg-rose-950/60 text-rose-500'
                    }`}>
                      {renderIcon(item)}
                    </div>

                    {/* Metadata */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold leading-tight">{label}</span>
                        <span className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full ${
                          isIncome 
                            ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' 
                            : 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300'
                        }`}>
                          {isIncome ? 'INCOME' : 'EXPENSE'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        <span>{item.date}</span>
                        {isIncome && item.trips ? <span> • {item.trips} trips</span> : null}
                        {isIncome && item.hours ? <span> • {item.hours}h</span> : null}
                        {!isIncome && item.paymentMethod ? <span> • {item.paymentMethod}</span> : null}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="text-right">
                    <p className={`text-sm font-bold font-mono-num ${
                      isIncome 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : 'text-slate-900 dark:text-white'
                    }`}>
                      {isIncome ? '+' : '-'}{formatCurrency(item.amount, currency)}
                    </p>
                    {isIncome && item.tips > 0 && (
                      <p className="text-[10px] text-emerald-500 dark:text-emerald-400/80">
                        incl. {currency.symbol}{Number(item.tips).toFixed(2)} tips
                      </p>
                    )}
                    {!isIncome && item.mileage && (
                      <p className="text-[10px] text-slate-400">
                        {item.mileage} mi
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
