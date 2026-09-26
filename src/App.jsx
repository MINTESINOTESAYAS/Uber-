import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

// v1.2 Components (Simplistic Speedometer Cockpit Edition)
import SimplisticDashboard from './components/SimplisticDashboard';
import OrganizedDetailsSubScreen from './components/OrganizedDetailsSubScreen';

// Preserved v1.1 Components (Fam Fund Edition)
import BalanceCard from './components/BalanceCard';
import PlanGaugeCard from './components/PlanGaugeCard';
import QuickActions from './components/QuickActions';
import RecentTransactions from './components/RecentTransactions';

// Shared Components
import LedgerHistoryView from './components/LedgerHistoryView';
import ExportBackupView from './components/ExportBackupView';

// Modals
import AddIncomeModal from './components/AddIncomeModal';
import AddExpenseModal from './components/AddExpenseModal';
import TargetSettingsModal from './components/TargetSettingsModal';
import EditTransactionModal from './components/EditTransactionModal';
import VersionInfoModal from './components/VersionInfoModal';

function MainApp() {
  const { activeTab, activeModal, activeVersion, setActiveModal } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center selection:bg-emerald-500 selection:text-slate-950">
      {/* Mobile Shell Container (fits phone screen or centered mockup on desktop) */}
      <div className="w-full max-w-md min-h-screen bg-slate-950 border-x border-slate-900 shadow-2xl relative flex flex-col">
        {/* Android Simulated Status Bar */}
        <div className="px-6 pt-2 pb-1 flex justify-between items-center text-[11px] font-semibold tracking-tight bg-slate-900 text-slate-300 select-none">
          <span>9:41</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-[10px] font-bold text-emerald-400">YANGO 5G</span>
            <div className="w-5 h-2.5 border border-current rounded-xs p-0.5 flex items-center">
              <div className="h-full w-4/5 bg-emerald-400 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Header */}
        <Header />

        {/* Main Content Areas */}
        <main className="flex-1 pb-16">
          {/* TAB 1: HOME / DASHBOARD */}
          {activeTab === 'home' && (
            <>
              {activeVersion === '1.2' ? (
                /* VERSION 1.2: Simplistic Dashboard with Car Speedometer Target Gauge */
                <SimplisticDashboard />
              ) : (
                /* VERSION 1.1: Preserved Fam Fund Card Dashboard */
                <div className="px-4 py-2 pb-24 space-y-1 animate-fadeIn">
                  <div className="p-2 mb-2 bg-indigo-950/40 border border-indigo-800/60 rounded-2xl text-[11px] text-center text-indigo-300 font-bold">
                    Viewing Preserved Version 1.1 (Fam Fund Style)
                  </div>
                  <BalanceCard activePeriod="today" setActivePeriod={() => {}} />
                  <PlanGaugeCard activePeriod="today" setActivePeriod={() => {}} />
                  <QuickActions />
                  <RecentTransactions limit={4} />
                </div>
              )}
            </>
          )}

          {/* TAB 2: ORGANIZED DETAILS SUB-SCREEN */}
          {activeTab === 'details' && (
            <OrganizedDetailsSubScreen />
          )}

          {/* TAB 3: LEDGER */}
          {activeTab === 'ledger' && (
            <LedgerHistoryView />
          )}

          {/* TAB 4: EXCEL SHEET BACKUP */}
          {activeTab === 'excel' && (
            <ExportBackupView />
          )}
        </main>

        {/* Bottom Floating Navigation */}
        <BottomNav />

        {/* Modals */}
        {activeModal === 'addIncome' && <AddIncomeModal />}
        {activeModal === 'addExpense' && <AddExpenseModal />}
        {activeModal === 'targetSettings' && <TargetSettingsModal />}
        {activeModal === 'editTransaction' && <EditTransactionModal />}
        {activeModal === 'versionInfo' && <VersionInfoModal />}
        {activeModal === 'exportExcel' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4">
            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-slate-800">
              <ExportBackupView />
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-3 bg-slate-800 text-white font-bold text-xs rounded-b-3xl hover:bg-slate-700 transition"
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
