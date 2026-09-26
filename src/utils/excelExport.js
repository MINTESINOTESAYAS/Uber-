import * as XLSX from 'xlsx';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';

export function generateExcelWorkbook({
  incomes = [],
  expenses = [],
  targets = {},
  metrics = {},
  currency = { symbol: 'Br ', code: 'ETB' },
  periodName = 'All Time',
}) {
  const wb = XLSX.utils.book_new();

  // ----------------------------------------------------
  // SHEET 1: EXECUTIVE SUMMARY & TARGET COMPARISON
  // ----------------------------------------------------
  const summaryData = [
    ['YANGO DRIVER INCOME, EXPENSE & TARGET PLAN REPORT (v1.4)'],
    [`Generated: ${new Date().toLocaleString()}`],
    [`Currency: Ethiopian Birr (ETB / Br)`],
    [`Service Platform: Yango Ride Only`],
    [`Reporting Period: ${periodName}`],
    [],
    ['1. TARGET VS ACTUAL COMPARISON'],
    ['Metric', 'Planned Target (ETB)', 'Actual Achieved (ETB)', 'Variance (+/-)', 'Achievement %'],
    [
      'Daily Target (Today)',
      metrics.today?.target ? metrics.today.target.toFixed(2) : '0.00',
      metrics.today?.income ? metrics.today.income.toFixed(2) : '0.00',
      metrics.today?.variance ? metrics.today.variance.toFixed(2) : '0.00',
      `${(metrics.today?.progress || 0).toFixed(1)}%`
    ],
    [
      'Weekly Target (This Week)',
      metrics.week?.target ? metrics.week.target.toFixed(2) : '0.00',
      metrics.week?.income ? metrics.week.income.toFixed(2) : '0.00',
      metrics.week?.variance ? metrics.week.variance.toFixed(2) : '0.00',
      `${(metrics.week?.progress || 0).toFixed(1)}%`
    ],
    [
      'Monthly Target (This Month)',
      metrics.month?.target ? metrics.month.target.toFixed(2) : '0.00',
      metrics.month?.income ? metrics.month.income.toFixed(2) : '0.00',
      metrics.month?.variance ? metrics.month.variance.toFixed(2) : '0.00',
      `${(metrics.month?.progress || 0).toFixed(1)}%`
    ],
    [],
    ['2. FINANCIAL SUMMARY (MONTH-TO-DATE)'],
    ['Total Yango Gross Revenue', metrics.month?.income ? metrics.month.income.toFixed(2) : '0.00'],
    ['Total Operating Expenses', metrics.month?.expense ? metrics.month.expense.toFixed(2) : '0.00'],
    ['Net Take-Home Profit', metrics.month?.net ? metrics.month.net.toFixed(2) : '0.00'],
    ['Total Completed Yango Trips', metrics.month?.trips || 0],
    ['Total Driving Hours', metrics.month?.hours || 0],
    ['Projected Month-End Income', `${currency.symbol}${(metrics.month?.projectedIncome || 0).toFixed(2)}`],
    [],
    ['3. PLAN CONFIGURATION'],
    ['Monthly Goal Target', targets.monthlyIncome || 95000],
    ['Monthly Expense Budget', targets.monthlyExpenseBudget || 24000],
    ['Planned Driving Days Per Week', targets.workingDaysPerWeek || 6],
    ['Daily Milestone', metrics.standards?.dailyTarget ? metrics.standards.dailyTarget.toFixed(2) : '0.00'],
    ['Weekly Milestone', metrics.standards?.weeklyTarget ? metrics.standards.weeklyTarget.toFixed(2) : '0.00'],
  ];

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  wsSummary['!cols'] = [
    { wch: 32 },
    { wch: 22 },
    { wch: 22 },
    { wch: 18 },
    { wch: 18 },
  ];
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Executive Summary');

  // ----------------------------------------------------
  // SHEET 2: DAILY LEDGER & TARGETS
  // ----------------------------------------------------
  const datesSet = new Set([
    ...incomes.map(i => i.date),
    ...expenses.map(e => e.date),
  ]);
  const sortedDates = Array.from(datesSet).sort((a, b) => b.localeCompare(a));

  const dailyLedgerRows = [
    ['Date', 'Day', 'Gross Income (ETB)', 'Expenses (ETB)', 'Net Profit (ETB)', 'Daily Target (ETB)', 'Variance', 'Target Status', 'Trips', 'Hours']
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dailyTargetStandard = metrics.standards?.dailyTarget || 3650;

  sortedDates.forEach(dateStr => {
    const dayIncs = incomes.filter(i => i.date === dateStr);
    const dayExps = expenses.filter(e => e.date === dateStr);

    const incTotal = dayIncs.reduce((acc, c) => acc + (Number(c.grossAmount) || 0) + (Number(c.tips) || 0) + (Number(c.bonus) || 0), 0);
    const expTotal = dayExps.reduce((acc, c) => acc + (Number(c.amount) || 0), 0);
    const netTotal = incTotal - expTotal;
    const hoursTotal = dayIncs.reduce((acc, c) => acc + (Number(c.hours) || 0), 0);
    const tripsTotal = dayIncs.reduce((acc, c) => acc + (Number(c.trips) || 0), 0);

    const d = new Date(dateStr + 'T12:00:00');
    const dayName = dayNames[d.getDay()];
    const variance = incTotal - dailyTargetStandard;
    const status = incTotal >= dailyTargetStandard ? 'TARGET MET ✅' : 'BELOW TARGET';

    dailyLedgerRows.push([
      dateStr,
      dayName,
      incTotal.toFixed(2),
      expTotal.toFixed(2),
      netTotal.toFixed(2),
      dailyTargetStandard.toFixed(2),
      variance >= 0 ? `+${variance.toFixed(2)}` : variance.toFixed(2),
      status,
      tripsTotal,
      hoursTotal
    ]);
  });

  const wsDaily = XLSX.utils.aoa_to_sheet(dailyLedgerRows);
  wsDaily['!cols'] = [
    { wch: 14 },
    { wch: 10 },
    { wch: 20 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
    { wch: 16 },
    { wch: 16 },
    { wch: 10 },
    { wch: 10 }
  ];
  XLSX.utils.book_append_sheet(wb, wsDaily, 'Daily Ledger');

  // ----------------------------------------------------
  // SHEET 3: INCOME LOG DETAILS
  // ----------------------------------------------------
  const incomeRows = [
    ['Entry ID', 'Date', 'Ride Platform', 'Gross Fares (ETB)', 'Tips (ETB)', 'Bonus / Quests (ETB)', 'Total Income (ETB)', 'Trips', 'Hours', 'Trip Route / Notes']
  ];

  incomes.sort((a, b) => b.date.localeCompare(a.date)).forEach(inc => {
    const gross = Number(inc.grossAmount) || 0;
    const tips = Number(inc.tips) || 0;
    const bonus = Number(inc.bonus) || 0;
    const total = gross + tips + bonus;

    incomeRows.push([
      inc.id || 'N/A',
      inc.date,
      'YANGO RIDE',
      gross.toFixed(2),
      tips.toFixed(2),
      bonus.toFixed(2),
      total.toFixed(2),
      inc.trips || 0,
      inc.hours || 0,
      inc.notes || ''
    ]);
  });

  const wsIncome = XLSX.utils.aoa_to_sheet(incomeRows);
  wsIncome['!cols'] = [
    { wch: 14 },
    { wch: 14 },
    { wch: 16 },
    { wch: 18 },
    { wch: 14 },
    { wch: 20 },
    { wch: 18 },
    { wch: 10 },
    { wch: 10 },
    { wch: 36 }
  ];
  XLSX.utils.book_append_sheet(wb, wsIncome, 'Income Log');

  // ----------------------------------------------------
  // SHEET 4: EXPENSE LOG DETAILS
  // ----------------------------------------------------
  const expenseRows = [
    ['Entry ID', 'Date', 'Category', 'Amount (ETB)', 'Payment Method (CBE / Telebirr / Cash)', 'Mileage / Odometer', 'Receipt Notes']
  ];

  expenses.sort((a, b) => b.date.localeCompare(a.date)).forEach(exp => {
    expenseRows.push([
      exp.id || 'N/A',
      exp.date,
      exp.category?.toUpperCase() || 'GENERAL',
      (Number(exp.amount) || 0).toFixed(2),
      exp.paymentMethod || 'Cash',
      exp.mileage || '-',
      exp.notes || ''
    ]);
  });

  const wsExpense = XLSX.utils.aoa_to_sheet(expenseRows);
  wsExpense['!cols'] = [
    { wch: 14 },
    { wch: 14 },
    { wch: 24 },
    { wch: 16 },
    { wch: 34 },
    { wch: 20 },
    { wch: 36 }
  ];
  XLSX.utils.book_append_sheet(wb, wsExpense, 'Expense Log');

  return wb;
}

export function downloadExcelFile(wb, filename = `Yango_Driver_Ledger_v1.4_${new Date().toISOString().slice(0, 10)}.xlsx`) {
  XLSX.writeFile(wb, filename);
}

export async function shareExcelFile(wb, filename = `Yango_Driver_Ledger_v1.4_${new Date().toISOString().slice(0, 10)}.xlsx`) {
  try {
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
    try {
      const saved = await Filesystem.writeFile({
        path: filename,
        data: wbout,
        directory: Directory.Cache,
      });

      await Share.share({
        title: 'Yango Driver Ledger v1.3 Backup',
        text: 'Daily income, expenses, and target plan performance report in ETB.',
        url: saved.uri,
        dialogTitle: 'Share Yango Driver Excel Sheet',
      });
      return { success: true };
    } catch {
      downloadExcelFile(wb, filename);
      return { success: true, method: 'download' };
    }
  } catch (error) {
    console.error('Error sharing excel file:', error);
    downloadExcelFile(wb, filename);
    return { success: true, method: 'fallback_download' };
  }
}
