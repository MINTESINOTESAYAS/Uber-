import * as XLSX from 'xlsx';
import { Share } from '@capacitor/share';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export function generateExcelWorkbook({
  incomes = [],
  expenses = [],
  targets = {},
  metrics = {},
  currency = { symbol: '$', code: 'USD' },
  periodName = 'All Time',
}) {
  const wb = XLSX.utils.book_new();

  // ----------------------------------------------------
  // SHEET 1: EXECUTIVE SUMMARY & TARGET COMPARISON
  // ----------------------------------------------------
  const summaryData = [
    ['DRIVER INCOME, EXPENSE & TARGET PERFORMANCE REPORT'],
    [`Generated: ${new Date().toLocaleString()}`],
    [`Currency: ${currency.code} (${currency.symbol})`],
    [`Reporting Period: ${periodName}`],
    [],
    ['1. TARGET VS ACTUAL COMPARISON'],
    ['Metric', 'Planned Target', 'Actual Achieved', 'Variance (+/-)', 'Achievement %'],
    [
      'Daily Income (Today)',
      metrics.today?.target ? metrics.today.target.toFixed(2) : '0.00',
      metrics.today?.income ? metrics.today.income.toFixed(2) : '0.00',
      metrics.today?.variance ? metrics.today.variance.toFixed(2) : '0.00',
      `${(metrics.today?.progress || 0).toFixed(1)}%`
    ],
    [
      'Weekly Income (This Week)',
      metrics.week?.target ? metrics.week.target.toFixed(2) : '0.00',
      metrics.week?.income ? metrics.week.income.toFixed(2) : '0.00',
      metrics.week?.variance ? metrics.week.variance.toFixed(2) : '0.00',
      `${(metrics.week?.progress || 0).toFixed(1)}%`
    ],
    [
      'Monthly Income (This Month)',
      metrics.month?.target ? metrics.month.target.toFixed(2) : '0.00',
      metrics.month?.income ? metrics.month.income.toFixed(2) : '0.00',
      metrics.month?.variance ? metrics.month.variance.toFixed(2) : '0.00',
      `${(metrics.month?.progress || 0).toFixed(1)}%`
    ],
    [],
    ['2. FINANCIAL OVERVIEW (MONTH-TO-DATE)'],
    ['Total Gross Revenue', metrics.month?.income ? metrics.month.income.toFixed(2) : '0.00'],
    ['Total Operating Expenses', metrics.month?.expense ? metrics.month.expense.toFixed(2) : '0.00'],
    ['Net Take-Home Profit', metrics.month?.net ? metrics.month.net.toFixed(2) : '0.00'],
    ['Expense-to-Income Ratio', `${(metrics.month?.expenseRatio || 0).toFixed(1)}%`],
    ['Target Expense Ceiling', `${(metrics.month?.targetExpenseRatio || 25).toFixed(1)}%`],
    ['Total Driving Hours', metrics.month?.hours || 0],
    ['Total Completed Trips', metrics.month?.trips || 0],
    ['Net Hourly Earnings', `${currency.symbol}${(metrics.month?.netHourly || 0).toFixed(2)} / hr`],
    ['Projected Month-End Income', `${currency.symbol}${(metrics.month?.projectedIncome || 0).toFixed(2)}`],
    [],
    ['3. TARGET PLAN CONFIGURATION'],
    ['Monthly Target Goal', targets.monthlyIncome || 4000],
    ['Monthly Expense Budget', targets.monthlyExpenseBudget || 1000],
    ['Planned Working Days Per Week', targets.workingDaysPerWeek || 5],
    ['Standard Daily Milestone', metrics.standards?.dailyTarget ? metrics.standards.dailyTarget.toFixed(2) : '0.00'],
    ['Standard Weekly Milestone', metrics.standards?.weeklyTarget ? metrics.standards.weeklyTarget.toFixed(2) : '0.00'],
  ];

  const wsSummary = XLSX.utils.aoa_to_sheet(summaryData);
  wsSummary['!cols'] = [
    { wch: 32 },
    { wch: 20 },
    { wch: 20 },
    { wch: 18 },
    { wch: 18 },
  ];
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Executive Summary');

  // ----------------------------------------------------
  // SHEET 2: DAILY LEDGER & TARGETS
  // ----------------------------------------------------
  // Group all unique dates from income & expense
  const datesSet = new Set([
    ...incomes.map(i => i.date),
    ...expenses.map(e => e.date),
  ]);
  const sortedDates = Array.from(datesSet).sort((a, b) => b.localeCompare(a));

  const dailyLedgerRows = [
    ['Date', 'Day of Week', 'Gross Income', 'Operating Expenses', 'Net Profit', 'Daily Target', 'Target Variance', 'Target Status', 'Trips', 'Hours Worked', 'Hourly Rate']
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dailyTargetStandard = metrics.standards?.dailyTarget || 180;

  sortedDates.forEach(dateStr => {
    const dayIncs = incomes.filter(i => i.date === dateStr);
    const dayExps = expenses.filter(e => e.date === dateStr);

    const incTotal = dayIncs.reduce((acc, c) => acc + (Number(c.grossAmount) || 0) + (Number(c.tips) || 0) + (Number(c.bonus) || 0), 0);
    const expTotal = dayExps.reduce((acc, c) => acc + (Number(c.amount) || 0), 0);
    const netTotal = incTotal - expTotal;
    const hoursTotal = dayIncs.reduce((acc, c) => acc + (Number(c.hours) || 0), 0);
    const tripsTotal = dayIncs.reduce((acc, c) => acc + (Number(c.trips) || 0), 0);
    const hourly = hoursTotal > 0 ? (netTotal / hoursTotal).toFixed(2) : '0.00';

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
      hoursTotal,
      `${currency.symbol}${hourly}/hr`
    ]);
  });

  const wsDaily = XLSX.utils.aoa_to_sheet(dailyLedgerRows);
  wsDaily['!cols'] = [
    { wch: 14 },
    { wch: 12 },
    { wch: 16 },
    { wch: 18 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 10 },
    { wch: 14 },
    { wch: 16 }
  ];
  XLSX.utils.book_append_sheet(wb, wsDaily, 'Daily Ledger');

  // ----------------------------------------------------
  // SHEET 3: DETAILED INCOME LOG
  // ----------------------------------------------------
  const incomeRows = [
    ['Entry ID', 'Date', 'Platform / Source', 'Base / Gross Fare', 'Tips', 'Bonuses / Incentives', 'Total Earnings', 'Completed Trips', 'Driving Hours', 'Notes / Shifts']
  ];

  incomes.sort((a, b) => b.date.localeCompare(a.date)).forEach(inc => {
    const gross = Number(inc.grossAmount) || 0;
    const tips = Number(inc.tips) || 0;
    const bonus = Number(inc.bonus) || 0;
    const total = gross + tips + bonus;

    incomeRows.push([
      inc.id || 'N/A',
      inc.date,
      inc.platform?.toUpperCase() || 'UBER',
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
    { wch: 20 },
    { wch: 18 },
    { wch: 14 },
    { wch: 20 },
    { wch: 18 },
    { wch: 16 },
    { wch: 16 },
    { wch: 30 }
  ];
  XLSX.utils.book_append_sheet(wb, wsIncome, 'Income Log');

  // ----------------------------------------------------
  // SHEET 4: DETAILED EXPENSE LOG
  // ----------------------------------------------------
  const expenseRows = [
    ['Entry ID', 'Date', 'Expense Category', 'Amount Paid', 'Payment Method', 'Odometer / Mileage', 'Receipt Notes / Description']
  ];

  expenses.sort((a, b) => b.date.localeCompare(a.date)).forEach(exp => {
    expenseRows.push([
      exp.id || 'N/A',
      exp.date,
      exp.category?.toUpperCase() || 'GENERAL',
      (Number(exp.amount) || 0).toFixed(2),
      exp.paymentMethod || 'Cash',
      exp.mileage ? `${exp.mileage} mi/km` : '-',
      exp.notes || ''
    ]);
  });

  const wsExpense = XLSX.utils.aoa_to_sheet(expenseRows);
  wsExpense['!cols'] = [
    { wch: 14 },
    { wch: 14 },
    { wch: 26 },
    { wch: 16 },
    { wch: 20 },
    { wch: 20 },
    { wch: 36 }
  ];
  XLSX.utils.book_append_sheet(wb, wsExpense, 'Expense Log');

  return wb;
}

// Download workbook in browser
export function downloadExcelFile(wb, filename = `Driver_Ledger_${new Date().toISOString().slice(0, 10)}.xlsx`) {
  XLSX.writeFile(wb, filename);
}

// Mobile-native share integration
export async function shareExcelFile(wb, filename = `Driver_Ledger_${new Date().toISOString().slice(0, 10)}.xlsx`) {
  try {
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
    
    // Check if running on mobile device with Capacitor Filesystem
    try {
      const saved = await Filesystem.writeFile({
        path: filename,
        data: wbout,
        directory: Directory.Cache,
      });

      await Share.share({
        title: 'Driver Income & Expense Ledger Backup',
        text: 'Driver income, expenses, and target plan performance report.',
        url: saved.uri,
        dialogTitle: 'Share Driver Ledger Excel Sheet',
      });
      return { success: true };
    } catch (e) {
      // Fallback to browser download or Web Share
      const blob = new Blob([s2ab(atob(wbout))], { type: 'application/octet-stream' });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([blob], filename, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })] })) {
        const file = new File([blob], filename, { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        await navigator.share({
          files: [file],
          title: 'Driver Income & Expense Backup',
          text: 'Driver Ledger backup Excel file',
        });
        return { success: true };
      }
      
      // Standard browser download
      downloadExcelFile(wb, filename);
      return { success: true, method: 'download' };
    }
  } catch (error) {
    console.error('Error sharing excel file:', error);
    downloadExcelFile(wb, filename);
    return { success: true, method: 'fallback_download' };
  }
}

function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
  return buf;
}
