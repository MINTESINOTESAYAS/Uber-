import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CURRENCIES, FAM_FUND_THEME } from '../constants';
import { calculateDriverMetrics } from '../utils/calculator';
import { getInitialSampleData } from '../utils/sampleData';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  INCOMES: 'driver_ledger_incomes_v1',
  EXPENSES: 'driver_ledger_expenses_v1',
  TARGETS: 'driver_ledger_targets_v1',
  CURRENCY: 'driver_ledger_currency_v1',
  THEME: 'driver_ledger_theme_v1',
  VIEW_MODE: 'driver_ledger_view_mode_v1',
};

export function AppProvider({ children }) {
  const initial = useMemo(() => getInitialSampleData(), []);

  // Incomes state
  const [incomes, setIncomes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INCOMES);
      return saved ? JSON.parse(saved) : initial.incomes;
    } catch {
      return initial.incomes;
    }
  });

  // Expenses state
  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      return saved ? JSON.parse(saved) : initial.expenses;
    } catch {
      return initial.expenses;
    }
  });

  // Targets state
  const [targets, setTargets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TARGETS);
      return saved ? JSON.parse(saved) : initial.defaultTargets;
    } catch {
      return initial.defaultTargets;
    }
  });

  // Currency state
  const [currency, setCurrency] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY);
      return saved ? JSON.parse(saved) : CURRENCIES[0];
    } catch {
      return CURRENCIES[0];
    }
  });

  // Theme state: 'fam-fund' (default light/mint), 'dark' (slate navy), 'noir' (uber dark)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved || 'fam-fund';
    } catch {
      return 'fam-fund';
    }
  });

  // View mode: 'mobile' (phone container on desktop) vs 'responsive' (full width)
  const [viewMode, setViewMode] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VIEW_MODE);
      return saved || 'mobile';
    } catch {
      return 'mobile';
    }
  });

  // Navigation & Modals
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'analytics', 'history', 'export'
  const [activeModal, setActiveModal] = useState(null); // 'addIncome', 'addExpense', 'targetSettings', 'exportExcel', 'figmaSync', 'editTransaction'
  const [editingItem, setEditingItem] = useState(null); // { type: 'income' | 'expense', item }

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INCOMES, JSON.stringify(incomes));
    } catch (e) {
      console.warn('Storage quota error', e);
    }
  }, [incomes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    } catch (e) {
      console.warn('Storage quota error', e);
    }
  }, [expenses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TARGETS, JSON.stringify(targets));
    } catch (e) {
      console.warn('Storage quota error', e);
    }
  }, [targets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENCY, JSON.stringify(currency));
    } catch (e) {
      console.warn('Storage quota error', e);
    }
  }, [currency]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.warn('Storage quota error', e);
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VIEW_MODE, viewMode);
    } catch (e) {
      console.warn('Storage quota error', e);
    }
  }, [viewMode]);

  // Recalculate metrics reactively
  const metrics = useMemo(() => {
    return calculateDriverMetrics({
      incomes,
      expenses,
      targets,
      referenceDate: new Date(),
    });
  }, [incomes, expenses, targets]);

  // Income Operations
  const addIncome = (entry) => {
    const newItem = {
      ...entry,
      id: 'inc-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setIncomes(prev => [newItem, ...prev]);
  };

  const updateIncome = (id, updated) => {
    setIncomes(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const deleteIncome = (id) => {
    setIncomes(prev => prev.filter(item => item.id !== id));
  };

  // Expense Operations
  const addExpense = (entry) => {
    const newItem = {
      ...entry,
      id: 'exp-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setExpenses(prev => [newItem, ...prev]);
  };

  const updateExpense = (id, updated) => {
    setExpenses(prev => prev.map(item => item.id === id ? { ...item, ...updated } : item));
  };

  const deleteExpense = (id) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
  };

  // Target operations
  const updateTargets = (newTargets) => {
    setTargets(prev => ({ ...prev, ...newTargets }));
  };

  // Reset to initial demo data
  const resetToSampleData = () => {
    const fresh = getInitialSampleData();
    setIncomes(fresh.incomes);
    setExpenses(fresh.expenses);
    setTargets(fresh.defaultTargets);
  };

  // Clear data
  const clearAllData = () => {
    setIncomes([]);
    setExpenses([]);
  };

  // Restore from JSON backup
  const importFullBackup = (data) => {
    if (data.incomes && Array.isArray(data.incomes)) setIncomes(data.incomes);
    if (data.expenses && Array.isArray(data.expenses)) setExpenses(data.expenses);
    if (data.targets) setTargets(data.targets);
    if (data.currency) setCurrency(data.currency);
  };

  const openEditModal = (item, type) => {
    setEditingItem({ item, type });
    setActiveModal('editTransaction');
  };

  const value = {
    incomes,
    expenses,
    targets,
    currency,
    theme,
    viewMode,
    activeTab,
    activeModal,
    editingItem,
    metrics,
    setCurrency,
    setTheme,
    setViewMode,
    setActiveTab,
    setActiveModal,
    openEditModal,
    addIncome,
    updateIncome,
    deleteIncome,
    addExpense,
    updateExpense,
    deleteExpense,
    updateTargets,
    resetToSampleData,
    clearAllData,
    importFullBackup,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
