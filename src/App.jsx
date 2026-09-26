import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import BalanceCard from './components/BalanceCard';
import PlanGaugeCard from './components/PlanGaugeCard';
import QuickActions from './components/QuickActions';
import RecentTransactions from './components/RecentTransactions';
import AnalyticsView from './components/AnalyticsView';
import LedgerHistoryView from './components/LedgerHistoryView';
import ExportBackupView from './components/ExportBackupView';
import BottomNav from './components/BottomNav';
import AppSplashScreen from './components/AppSplashScreen';

// Modals
import AddIncomeModal from './components/AddIncomeModal';
import AddExpenseModal from './components/AddExpenseModal';
import TargetSettingsModal from './components/TargetSettingsModal';
import FigmaSyncModal from './components/FigmaSyncModal';
import EditTransactionModal from './components/EditTransactionModal';

function MainApp() {
  const { activeTab, activeModal, theme, viewMode, setActiveModal } = useApp();
  const [activePeriod, setActivePeriod] = useState('today'); // 'today', 'week', 'month'

  // App Opening Splash Screen state
  const [showSplash, setShowSplash] = useState(() => {
    // Show splash once on initial load
    return true;
  });

  const isDark = theme === 'dark' || theme === 'noir';

  return (
    <div className={`min-h-screen transition-colors ${
      isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'
    }`}>
      {/* App Opening Splash Screen */}
      {showSplash && (
        <AppSplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* Shell Container */}
      <div className={`mx-auto transition-all ${
        viewMode === 'mobile'
          ? 'max-w-md min-h-screen shadow-2xl relative border-x border-slate-200/50 dark:border-slate-800'
          : 'max-w-2xl min-h-screen shadow-lg'
      } ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>

        {/* Android Simulated Status Bar */}
        <div className={`px-6 pt-2 pb-1 flex justify-between items-center text-[11px] font-semibold tracking-tight transition-colors select-none ${
          isDark ? 'bg-slate-900 text-slate-300' : 'bg-white text-slate-600'
        }`}>
          <span>9:41</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] font-bold text-amber-400">YANGO 5G</span>
            <div className="w-5 h-2.5 border border-current rounded-xs p-0.5 flex items-center">
              <div className="h-full w-4/5 bg-amber-400 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* App Header with Logo on Left Top Side */}
        <Header onReopenSplash={() => setShowSplash(true)} />

        {/* Dynamic Screen Content */}
        <main className="pb-16 animate-fadeIn">
          {activeTab === 'dashboard' && (
            <div className="space-y-1">
              <BalanceCard 
                activePeriod={activePeriod} 
                setActivePeriod={setActivePeriod} 
              />
              <PlanGaugeCard 
                activePeriod={activePeriod} 
                setActivePeriod={setActivePeriod} 
              />
              <QuickActions />
              <RecentTransactions limit={6} />
            </div>
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView />
          )}

          {activeTab === 'history' && (
            <LedgerHistoryView />
          )}

          {activeTab === 'export' && (
            <ExportBackupView />
          )}
        </main>

        {/* Bottom Floating Navigation */}
        <BottomNav />

        {/* Modals */}
        {activeModal === 'addIncome' && <AddIncomeModal />}
        {activeModal === 'addExpense' && <AddExpenseModal />}
        {activeModal === 'targetSettings' && <TargetSettingsModal />}
        {activeModal === 'figmaSync' && <FigmaSyncModal />}
        {activeModal === 'editTransaction' && <EditTransactionModal />}
        {activeModal === 'exportExcel' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl">
              <ExportBackupView />
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-2.5 bg-slate-800 text-white font-bold text-xs rounded-b-3xl -mt-6 z-10 relative hover:bg-slate-700"
              >
                Close Export Dialog
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
