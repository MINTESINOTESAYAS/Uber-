import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency, getMonthStartAndEnd, getWeekStartAndEnd } from '../utils/calculator';
import { generateExcelWorkbook, downloadExcelFile, shareExcelFile } from '../utils/excelExport';
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
  AlertTriangle,
  FileCheck,
  ShieldCheck,
  Layers
} from 'lucide-react';

export default function ExportBackupView() {
  const { 
    incomes, 
    expenses, 
    targets, 
    metrics, 
    currency, 
    theme, 
    resetToSampleData, 
    clearAllData, 
    importFullBackup 
  } = useApp();

  const isDark = theme === 'dark' || theme === 'noir';

  const [selectedRange, setSelectedRange] = useState('all'); // 'all', 'this_month', 'last_month', 'this_week'
  const [exportStatus, setExportStatus] = useState(null);

  // Filter incomes and expenses by selected date range
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

    return { inc: incomes, exp: expenses, label: 'All Records' };
  };

  const { inc: filteredIncomes, exp: filteredExpenses, label: rangeLabel } = getFilteredData();

  const totalIncome = filteredIncomes.reduce((acc, c) => acc + (Number(c.grossAmount) || 0) + (Number(c.tips) || 0) + (Number(c.bonus) || 0), 0);
  const totalExpense = filteredExpenses.reduce((acc, c) => acc + (Number(c.amount) || 0), 0);
  const netEarnings = totalIncome - totalExpense;

  // Handle Excel Export
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

      const filename = `Driver_Ledger_${rangeLabel.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.xlsx`;
      downloadExcelFile(wb, filename);

      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      setExportStatus('Excel sheet downloaded successfully!');
      setTimeout(() => setExportStatus(null), 4000);
    } catch (e) {
      console.error(e);
      alert('Error generating Excel file: ' + e.message);
    }
  };

  // Handle Android Native Share
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

      const filename = `Driver_Ledger_Backup_${new Date().toISOString().slice(0, 10)}.xlsx`;
      await shareExcelFile(wb, filename);

      setExportStatus('Share sheet opened!');
      setTimeout(() => setExportStatus(null), 4000);
    } catch (e) {
      console.error(e);
      alert('Sharing error: ' + e.message);
    }
  };

  // Handle JSON Database Backup
  const handleDownloadJSON = () => {
    const backupData = {
      app: 'Driver Ledger Pro',
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      targets,
      currency,
      incomes,
      expenses,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `driver_ledger_backup_${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();

    setExportStatus('Full JSON database backup downloaded!');
    setTimeout(() => setExportStatus(null), 4000);
  };

  // Handle JSON Database Restore
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        importFullBackup(parsed);
        alert('Database backup restored successfully!');
      } catch (err) {
        alert('Invalid JSON backup file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="px-4 py-2 pb-24 space-y-4">
      {/* Top Banner */}
      <div className={`p-4 rounded-3xl border transition-all ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-base font-bold tracking-tight">Excel Backup & Export</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Generate formatted multi-sheet .xlsx workbooks
            </p>
          </div>
        </div>

        {exportStatus && (
          <div className="mt-2 p-2.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 text-xs font-semibold rounded-xl flex items-center gap-2 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{exportStatus}</span>
          </div>
        )}
      </div>

      {/* Date Range Selector Card */}
      <div className={`p-4 rounded-3xl border transition-all ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
      }`}>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          Select Export Date Range
        </label>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            onClick={() => setSelectedRange('all')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
              selectedRange === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            All Time ({incomes.length + expenses.length} rows)
          </button>
          <button
            onClick={() => setSelectedRange('this_month')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
              selectedRange === 'this_month'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            This Month
          </button>
          <button
            onClick={() => setSelectedRange('this_week')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
              selectedRange === 'this_week'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setSelectedRange('last_month')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
              selectedRange === 'last_month'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Last Month
          </button>
        </div>

        {/* Selected Scope Preview */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-500">Scope:</span>
            <span className="font-bold">{rangeLabel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Income Entries:</span>
            <span className="font-mono-num font-semibold text-emerald-600">
              {filteredIncomes.length} ({formatCurrency(totalIncome, currency)})
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Expense Entries:</span>
            <span className="font-mono-num font-semibold text-rose-500">
              {filteredExpenses.length} ({formatCurrency(totalExpense, currency)})
            </span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
            <span className="font-bold">Net Profit in Range:</span>
            <span className="font-mono-num font-extrabold text-slate-900 dark:text-white">
              {formatCurrency(netEarnings, currency)}
            </span>
          </div>
        </div>

        {/* What is included in the Excel file */}
        <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-2xl text-[11px] text-slate-600 dark:text-slate-300 space-y-1">
          <p className="font-bold text-slate-700 dark:text-slate-200">The Excel Workbook includes 4 formatted sheets:</p>
          <ul className="list-disc list-inside space-y-0.5 text-slate-500 dark:text-slate-400">
            <li><strong>Sheet 1:</strong> Executive Summary & Plan Comparison (Daily, Weekly, Monthly)</li>
            <li><strong>Sheet 2:</strong> Daily Ledger with Target Variance & Met/Missed status</li>
            <li><strong>Sheet 3:</strong> Income breakdown by platform, tips, bonus, hours, trips</li>
            <li><strong>Sheet 4:</strong> Categorized expenses, mileage, payment methods</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 space-y-2">
          {/* Main Download Excel Button */}
          <button
            onClick={handleExportExcel}
            className="w-full py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center space-x-2 transition cursor-pointer"
          >
            <Download className="w-4 h-4 stroke-[2.5]" />
            <span>Download Excel Workbook (.xlsx)</span>
          </button>

          {/* Share via Android */}
          <button
            onClick={handleShareExcel}
            className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center space-x-2 transition cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Share via Android Tray (WhatsApp, Drive, Email)</span>
          </button>
        </div>
      </div>

      {/* Database Backup & Restore Card */}
      <div className={`p-4 rounded-3xl border transition-all ${
        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-900 shadow-sm'
      }`}>
        <div className="flex items-center space-x-2 mb-2">
          <Database className="w-4 h-4 text-indigo-500" />
          <h3 className="text-sm font-bold">App Data Storage & Safety</h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
          All data is stored 100% offline on your device. You can download a complete backup or restore on a new phone.
        </p>

        <div className="grid grid-cols-2 gap-2 mb-3">
          {/* Download JSON */}
          <button
            onClick={handleDownloadJSON}
            className="py-2.5 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-bold text-xs flex items-center justify-center space-x-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup Data (JSON)</span>
          </button>

          {/* Upload JSON */}
          <label className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center space-x-1.5 transition cursor-pointer">
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

        {/* Demo reset & wipe options */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
          <button
            onClick={() => {
              if (confirm('Reset to standard realistic sample data?')) {
                resetToSampleData();
              }
            }}
            className="text-slate-500 hover:text-emerald-600 flex items-center space-x-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Load Demo Data</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to erase all entries? (Be sure to download an Excel backup first!)')) {
                clearAllData();
              }
            }}
            className="text-rose-500 hover:text-rose-700 font-semibold"
          >
            Clear All Data
          </button>
        </div>
      </div>
    </div>
  );
}
