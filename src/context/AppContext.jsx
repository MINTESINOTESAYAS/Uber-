import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CURRENCY, APP_VERSION, PREVIOUS_VERSION } from '../constants.js';
import { calculateDriverMetrics } from '../utils/calculator.js';
import { getInitialSampleData } from '../utils/sampleData.js';

const AppContext = createContext(null);

const STORAGE_KEYS = {
  INCOMES: 'yango_ledger_incomes_v12',
  EXPENSES: 'yango_ledger_expenses_v12',
  TARGETS: 'yango_ledger_targets_v12',
  THEME: 'yango_ledger_theme_v12',
  VERSION: 'yango_ledger_active_version_v12',
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

  // Targets state (in ETB)
  const [targets, setTargets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TARGETS);
      return saved ? JSON.parse(saved) : initial.defaultTargets;
    } catch {
      return initial.defaultTargets;
    }
  });

  // Version: 1.2 (Active) vs 1.1 (Legacy)
  const [activeVersion, setActiveVersion] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VERSION);
      return saved || APP_VERSION;
    } catch {
      return APP_VERSION;
    }
  });

  // Strict currency is ETB
  const currency = CURRENCY;

  // Theme: 'dark' (sleek dashboard cockpit) or 'light'
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return saved || 'dark';
    } catch {
      return 'dark';
    }
  });

  // Navigation & Modals
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'details', 'ledger', 'excel'
  const [activeModal, setActiveModal] = useState(null); // 'addIncome', 'addExpense', 'targetSettings', 'exportExcel', 'editTransaction', 'versionInfo'
  const [editingItem, setEditingItem] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INCOMES, JSON.stringify(incomes));
    } catch (e) {
      console.warn('Storage quota', e);
    }
  }, [incomes]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    } catch (e) {
      console.warn('Storage quota', e);
    }
  }, [expenses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TARGETS, JSON.stringify(targets));
    } catch (e) {
      console.warn('Storage quota', e);
    }
  }, [targets]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.warn('Storage quota', e);
    }
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.VERSION, activeVersion);
    } catch (e) {
      console.warn('Storage quota', e);
    }
  }, [activeVersion]);

  // Recalculate metrics
  const metrics = useMemo(() => {
    return calculateDriverMetrics({
      incomes,
      expenses,
      targets,
      referenceDate: new Date(),
    });
  }, [incomes, expenses, targets]);

  // CRUD Operations
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

  const updateTargets = (newTargets) => {
    setTargets(prev => ({ ...prev, ...newTargets }));
  };

  const resetToSampleData = () => {
    const fresh = getInitialSampleData();
    setIncomes(fresh.incomes);
    setExpenses(fresh.expenses);
    setTargets(fresh.defaultTargets);
  };

  const clearAllData = () => {
    setIncomes([]);
    setExpenses([]);
  };

  const importFullBackup = (data) => {
    if (data.incomes && Array.isArray(data.incomes)) setIncomes(data.incomes);
    if (data.expenses && Array.isArray(data.expenses)) setExpenses(data.expenses);
    if (data.targets) setTargets(data.targets);
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
    activeVersion,
    activeTab,
    activeModal,
    editingItem,
    metrics,
    setTheme,
    setActiveVersion,
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
