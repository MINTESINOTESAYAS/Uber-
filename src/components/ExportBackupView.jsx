import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency, getMonthStartAndEnd, getWeekStartAndEnd } from '../utils/calculator.js';
import { generateExcelWorkbook, downloadExcelFile, shareExcelFile } from '../utils/excelExport.js';
import confetti from 'canvas-confetti';
import { 
  FileSpreadsheet, 
  Download, 
  Share2, 
  Calendar, 
  Database, 
  Upload, 
  RotateCcw, 
  CheckCircle2, 
  Smartphone,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function ExportBackupView() {
  const { 
    incomes, 
    expenses, 
    targets, 
    metrics, 
    currency, 
    resetToSampleData, 
    clearAllData, 
    importFullBackup 
  } = useApp();

  const [selectedRange, setSelectedRange] = useState('all');
  const [exportStatus, setExportStatus] = useState(null);
  const [showDeployGuide, setShowDeployGuide] = useState(false);

  const getFilteredData = () => {
    const now = new Date();
    if (selectedRange === 'this_week') {
      const { start, end } = getWeekStartAndEnd(now);
      const inc = incomes.filter(i => {
        const d = new Date(i.date + 'T12:00:00');
        return d >= start && d <= end;
      });
      const exp = expenses.filter(e => {
        const d = new Date(e.date + 'T12:00:00');
        return d >= start && d <= end;
      });
      return { inc, exp, label: 'This Week' };
    }

    if (selectedRange === 'this_month') {
      const { start, end } = getMonthStartAndEnd(now);
      const inc = incomes.filter(i => {
        const d = new Date(i.date + 'T12:00:00');
        return d >= start && d <= end;
      });
      const exp = expenses.filter(e => {
        const d = new Date(e.date + 'T12:00:00');
        return d >= start && d <= end;
      });
      return { inc, exp, label: 'Current Month' };
    }

    if (selectedRange === 'last_month') {
      const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 15);
      const { start, end } = getMonthStartAndEnd(lastMonthDate);
      const inc = incomes.filter(i => {
        const d = new Date(i.date + 'T12:00:00');
        return d >= start && d <= end;
      });
      const exp = expenses.filter(e => {
        const d = new Date(e.date + 'T12:00:00');
        return d >= start && d <= end;
      });
      return { inc, exp, label: 'Last Month' };
    }

    return { inc: incomes, exp: expenses, label: 'All Time Records' };
  };

  const { inc: filteredIncomes, exp: filteredExpenses, label: rangeLabel } = getFilteredData();

  const totalIncome = filteredIncomes.reduce((acc, c) => acc + (Number(c.grossAmount) || 0) + (Number(c.tips) || 0) + (Number(c.bonus) || 0), 0);
  const totalExpense = filteredExpenses.reduce((acc, c) => acc + (Number(c.amount) || 0), 0);
  const netEarnings = totalIncome - totalExpense;

  const handleExportExcel = () => {
    try {
      const wb = generateExcelWorkbook({
        incomes: filteredIncomes,
        expenses: filteredExpenses,
        targets,
        metrics,
        currency,
        periodName: rangeLabel,
      });

      const filename = `Yango_Driver_Ledger_v1.4_${rangeLabel.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      downloadExcelFile(wb, filename);

      confetti({ particleCount: 70, spread: 70, origin: { y: 0.7 } });
      setExportStatus('Excel sheet downloaded successfully in ETB!');
      setTimeout(() => setExportStatus(null), 4000);
    } catch (e) {
      console.error(e);
      alert('Error generating Excel file: ' + e.message);
    }
  };

  const handleShareExcel = async () => {
    try {
      const wb = generateExcelWorkbook({
        incomes: filteredIncomes,
        expenses: filteredExpenses,
        targets,
        metrics,
        currency,
        periodName: rangeLabel,
      });

      const filename = `Yango_Driver_Backup_v1.4_${new Date().toISOString().slice(0, 10)}.xlsx`;
      await shareExcelFile(wb, filename);

      setExportStatus('Share sheet opened!');
      setTimeout(() => setExportStatus(null), 4000);
    } catch (e) {
      console.error(e);
      alert('Sharing error: ' + e.message);
    }
  };

  const handleDownloadJSON = () => {
    const backupData = {
      app: 'Driver Ledger Pro',
      version: '1.4',
      exportDate: new Date().toISOString(),
      currency,
      targets,
      incomes,
      expenses,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `driver_ledger_backup_v1.4_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();

    setExportStatus('Full database backup file downloaded!');
    setTimeout(() => setExportStatus(null), 4000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        importFullBackup(parsed);
        alert('Database restored successfully!');
      } catch (err) {
        alert('Invalid backup file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="px-4 py-2 pb-24 space-y-4 animate-fadeIn">
      {/* Top Banner */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 text-white">
        <div className="flex items-center space-x-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <h2 className="text-base font-extrabold tracking-tight">Excel Sheet Backup (.xlsx)</h2>
            <p className="text-xs text-slate-400">
              Formatted multi-tab workbook with Ethiopian Birr (ETB)
            </p>
          </div>
        </div>

        {exportStatus && (
          <div className="mt-2.5 p-2.5 bg-emerald-950/60 text-emerald-300 text-xs font-semibold rounded-xl flex items-center gap-2 border border-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{exportStatus}</span>
          </div>
        )}
      </div>

      {/* Date Range Selector */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
          Select Date Range to Export
        </label>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setSelectedRange('all')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
              selectedRange === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            All Time ({incomes.length + expenses.length} rows)
          </button>
          <button
            onClick={() => setSelectedRange('this_month')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
              selectedRange === 'this_month'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setSelectedRange('this_week')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
              selectedRange === 'this_week'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setSelectedRange('last_month')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
              selectedRange === 'last_month'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:bg-slate-800'
            }`}
          >
            Last Month
          </button>
        </div>

        {/* Selected Scope Preview */}
        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-400">Export Scope:</span>
            <span className="font-bold text-white">{rangeLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Total Yango Income:</span>
            <span className="font-mono-num font-bold text-emerald-400">
              +{formatCurrency(totalIncome, currency)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Total Expenses:</span>
            <span className="font-mono-num font-bold text-rose-400">
              -{formatCurrency(totalExpense, currency)}
            </span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-800">
            <span className="font-bold text-white">Net Take-Home:</span>
            <span className="font-mono-num font-black text-white">
              {formatCurrency(netEarnings, currency)}
            </span>
          </div>
        </div>

        {/* 4 Sheets Breakdown explanation */}
        <div className="p-3 bg-slate-950/70 rounded-2xl border border-slate-800/60 text-[11px] text-slate-400 space-y-1">
          <p className="font-bold text-slate-300">Generated Excel Workbook (v1.4) includes 4 sheets:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li><strong>Sheet 1:</strong> Executive Summary & Target Comparison (Daily, Weekly, Monthly)</li>
            <li><strong>Sheet 2:</strong> Daily Ledger with Target Met/Missed status</li>
            <li><strong>Sheet 3:</strong> Yango Ride details (Gross, Tips, Quests, Hours, Trips)</li>
            <li><strong>Sheet 4:</strong> Categorized expenses with CBE / Telebirr / Cash payment methods</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleExportExcel}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-600/30 flex items-center justify-center space-x-2 transition cursor-pointer"
          >
            <Download className="w-4 h-4 stroke-[3]" />
            <span>Download Excel Sheet (.xlsx)</span>
          </button>

          <button
            onClick={handleShareExcel}
            className="w-full py-2.5 px-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white font-bold text-xs border border-slate-800 flex items-center justify-center space-x-2 transition cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share via Android Tray (WhatsApp, Drive, Email)</span>
          </button>
        </div>
      </div>

      {/* HOW TO DEPLOY TO YOUR ANDROID PHONE GUIDE */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-2">
        <button
          onClick={() => setShowDeployGuide(!showDeployGuide)}
          className="w-full flex items-center justify-between text-left cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              How to Deploy & Install on Android Phone
            </h3>
          </div>
          {showDeployGuide ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
        </button>

        {showDeployGuide && (
          <div className="pt-2 text-xs text-slate-300 space-y-2.5 border-t border-slate-800 animate-fadeIn">
            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
              <p className="font-bold text-emerald-400 mb-1">Option 1: 1-Tap Direct Install (Easiest)</p>
              <p className="text-[11px] text-slate-400">
                1. Open the preview URL on Chrome on your phone.<br/>
                2. Tap Chrome's menu (<strong>⋮</strong>) and tap <strong>"Install app"</strong> or <strong>"Add to Home Screen"</strong>.<br/>
                3. The app installs immediately with native fullscreen offline capability.
              </p>
            </div>

            <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
              <p className="font-bold text-amber-400 mb-1">Option 2: Native APK Build (.apk)</p>
              <p className="text-[11px] text-slate-400">
                1. Clone the repo and run: <code>cd android && ./gradlew assembleDebug</code><br/>
                2. Your installable APK is created at: <code>android/app/build/outputs/apk/debug/app-debug.apk</code>.<br/>
                3. Send to phone via WhatsApp or Drive and tap <strong>Install</strong>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Database Backup & Reset */}
      <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 text-white space-y-3">
        <div className="flex items-center space-x-2">
          <Database className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Data Safety & Offline Backup
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleDownloadJSON}
            className="py-2.5 px-3 rounded-xl bg-indigo-950/60 hover:bg-indigo-900 text-indigo-300 font-bold text-xs border border-indigo-800/60 flex items-center justify-center space-x-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup Data (JSON)</span>
          </button>

          <label className="py-2.5 px-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 flex items-center justify-center space-x-1.5 transition cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Restore Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              if (confirm('Load standard realistic Yango driver demo records in ETB?')) {
                resetToSampleData();
              }
            }}
            className="text-slate-400 hover:text-emerald-400 flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Load Demo Data</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to clear all data? (Download an Excel backup first!)')) {
                clearAllData();
              }
            }}
            className="text-rose-500 hover:text-rose-400 font-semibold"
          >
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}
