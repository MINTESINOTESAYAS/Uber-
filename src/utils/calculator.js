// Calculation engine for Driver Targets, Incomes, Expenses, and Projections

export function formatDateISO(date = new Date()) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatCurrency(amount = 0, currency = { symbol: '$', position: 'prefix' }) {
  const val = Number(amount) || 0;
  const formatted = Math.abs(val).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const prefix = val < 0 ? '-' : '';
  if (currency.position === 'suffix') {
    return `${prefix}${formatted} ${currency.symbol.trim()}`;
  }
  return `${prefix}${currency.symbol}${formatted}`;
}

export function getWeekStartAndEnd(d = new Date()) {
  const date = new Date(d);
  const day = date.getDay(); // 0 is Sunday, 1 is Monday...
  // Set Monday as day 0
  const diffToMonday = date.getDate() - day + (day === 0 ? -6 : 1);
  const start = new Date(date.setDate(diffToMonday));
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

export function getMonthStartAndEnd(d = new Date()) {
  const date = new Date(d);
  const start = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  return { start, end };
}

export function calculateDriverMetrics({
  incomes = [],
  expenses = [],
  targets = {
    monthlyIncome: 4000,
    monthlyExpenseBudget: 1000,
    workingDaysPerWeek: 5,
    workingDaysMap: { mon: true, tue: true, wed: true, thu: true, fri: true, sat: false, sun: false },
    autoAdjustPace: true,
  },
  referenceDate = new Date(),
}) {
  const todayStr = formatDateISO(referenceDate);
  const { start: weekStart, end: weekEnd } = getWeekStartAndEnd(referenceDate);
  const { start: monthStart, end: monthEnd } = getMonthStartAndEnd(referenceDate);

  const daysInCurrentMonth = monthEnd.getDate();
  const weeksInMonth = daysInCurrentMonth / 7;

  // Standard Target splits
  const monthlyIncomeTarget = Number(targets.monthlyIncome) || 4000;
  const monthlyExpenseBudget = Number(targets.monthlyExpenseBudget) || 1000;
  const weeklyIncomeTarget = monthlyIncomeTarget / 4.333333;
  const weeklyExpenseBudget = monthlyExpenseBudget / 4.333333;

  const workingDaysCount = Object.values(targets.workingDaysMap || {}).filter(Boolean).length || targets.workingDaysPerWeek || 5;
  const standardDailyIncomeTarget = weeklyIncomeTarget / workingDaysCount;
  const standardDailyExpenseBudget = monthlyExpenseBudget / daysInCurrentMonth;

  // Filter incomes
  const todayIncomes = incomes.filter(i => i.date === todayStr);
  const weekIncomes = incomes.filter(i => {
    const d = new Date(i.date + 'T12:00:00');
    return d >= weekStart && d <= weekEnd;
  });
  const monthIncomes = incomes.filter(i => {
    const d = new Date(i.date + 'T12:00:00');
    return d >= monthStart && d <= monthEnd;
  });

  // Filter expenses
  const todayExpenses = expenses.filter(e => e.date === todayStr);
  const weekExpenses = expenses.filter(e => {
    const d = new Date(e.date + 'T12:00:00');
    return d >= weekStart && d <= weekEnd;
  });
  const monthExpenses = expenses.filter(e => {
    const d = new Date(e.date + 'T12:00:00');
    return d >= monthStart && d <= monthEnd;
  });

  // Helper totals
  const sumIncome = (list) => list.reduce((acc, curr) => {
    const total = (Number(curr.grossAmount) || 0) + (Number(curr.tips) || 0) + (Number(curr.bonus) || 0);
    return acc + total;
  }, 0);

  const sumExpense = (list) => list.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const sumHours = (list) => list.reduce((acc, curr) => acc + (Number(curr.hours) || 0), 0);
  const sumTrips = (list) => list.reduce((acc, curr) => acc + (Number(curr.trips) || 0), 0);

  // Today Actuals
  const todayIncomeTotal = sumIncome(todayIncomes);
  const todayExpenseTotal = sumExpense(todayExpenses);
  const todayNet = todayIncomeTotal - todayExpenseTotal;
  const todayHours = sumHours(todayIncomes);
  const todayTrips = sumTrips(todayIncomes);
  const todayTargetProgress = standardDailyIncomeTarget > 0 ? (todayIncomeTotal / standardDailyIncomeTarget) * 100 : 0;
  const todayVariance = todayIncomeTotal - standardDailyIncomeTarget;

  // Week Actuals
  const weekIncomeTotal = sumIncome(weekIncomes);
  const weekExpenseTotal = sumExpense(weekExpenses);
  const weekNet = weekIncomeTotal - weekExpenseTotal;
  const weekHours = sumHours(weekIncomes);
  const weekTrips = sumTrips(weekIncomes);
  const weekTargetProgress = weeklyIncomeTarget > 0 ? (weekIncomeTotal / weeklyIncomeTarget) * 100 : 0;
  const weekVariance = weekIncomeTotal - weeklyIncomeTarget;

  // Month Actuals
  const monthIncomeTotal = sumIncome(monthIncomes);
  const monthExpenseTotal = sumExpense(monthExpenses);
  const monthNet = monthIncomeTotal - monthExpenseTotal;
  const monthHours = sumHours(monthIncomes);
  const monthTrips = sumTrips(monthIncomes);
  const monthTargetProgress = monthlyIncomeTarget > 0 ? (monthIncomeTotal / monthlyIncomeTarget) * 100 : 0;
  const monthVariance = monthIncomeTotal - monthlyIncomeTarget;

  // Projected Month Earnings
  const currentDayOfMonth = referenceDate.getDate();
  const avgDailyIncomeSoFar = currentDayOfMonth > 0 ? (monthIncomeTotal / currentDayOfMonth) : 0;
  const projectedMonthIncome = avgDailyIncomeSoFar * daysInCurrentMonth;
  const projectedMonthNet = (avgDailyIncomeSoFar - (monthExpenseTotal / Math.max(1, currentDayOfMonth))) * daysInCurrentMonth;

  // Dynamic Weekly Rebalancer (Smart Pace)
  // Calculates what the driver needs to make each remaining planned working day this week
  const todayDayIndex = referenceDate.getDay(); // 0 is Sun, 1 is Mon...
  const dayKeyMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  
  // Count remaining planned working days this week including today if target not met
  let remainingWorkingDaysThisWeek = 0;
  for (let i = todayDayIndex; i <= 6; i++) {
    const key = dayKeyMap[i];
    if (targets.workingDaysMap && targets.workingDaysMap[key]) {
      remainingWorkingDaysThisWeek++;
    }
  }
  if (todayDayIndex === 0 && targets.workingDaysMap && targets.workingDaysMap['sun']) {
    remainingWorkingDaysThisWeek = 1;
  }
  remainingWorkingDaysThisWeek = Math.max(1, remainingWorkingDaysThisWeek);

  const remainingIncomeNeededThisWeek = Math.max(0, weeklyIncomeTarget - weekIncomeTotal);
  const dynamicDailyTargetThisWeek = remainingIncomeNeededThisWeek / remainingWorkingDaysThisWeek;

  // Week 7-Day breakdown for charts
  const weekDaysBreakdown = [];
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayKeys = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(weekStart);
    dayDate.setDate(weekStart.getDate() + i);
    const dateStr = formatDateISO(dayDate);
    const dayIncome = sumIncome(incomes.filter(inc => inc.date === dateStr));
    const dayExpense = sumExpense(expenses.filter(exp => exp.date === dateStr));
    const isWorkingDay = Boolean(targets.workingDaysMap ? targets.workingDaysMap[dayKeys[i]] : true);
    const dayTarget = isWorkingDay ? standardDailyIncomeTarget : 0;
    const isToday = dateStr === todayStr;

    weekDaysBreakdown.push({
      dateStr,
      dayLabel: dayLabels[i],
      dayKey: dayKeys[i],
      isWorkingDay,
      isToday,
      income: dayIncome,
      expense: dayExpense,
      target: dayTarget,
      net: dayIncome - dayExpense,
      achieved: dayTarget > 0 ? (dayIncome / dayTarget) * 100 : (dayIncome > 0 ? 100 : 0),
    });
  }

  // Expense breakdown by category
  const expenseByCategory = {};
  monthExpenses.forEach(exp => {
    const cat = exp.category || 'misc';
    expenseByCategory[cat] = (expenseByCategory[cat] || 0) + (Number(exp.amount) || 0);
  });

  const expenseBreakdownList = Object.entries(expenseByCategory).map(([catId, amount]) => ({
    catId,
    amount,
    percentage: monthExpenseTotal > 0 ? (amount / monthExpenseTotal) * 100 : 0,
  })).sort((a, b) => b.amount - a.amount);

  // Income by platform breakdown
  const incomeByPlatform = {};
  monthIncomes.forEach(inc => {
    const plat = inc.platform || 'uber';
    const total = (Number(inc.grossAmount) || 0) + (Number(inc.tips) || 0) + (Number(inc.bonus) || 0);
    incomeByPlatform[plat] = (incomeByPlatform[plat] || 0) + total;
  });

  const incomePlatformList = Object.entries(incomeByPlatform).map(([platformId, amount]) => ({
    platformId,
    amount,
    percentage: monthIncomeTotal > 0 ? (amount / monthIncomeTotal) * 100 : 0,
  })).sort((a, b) => b.amount - a.amount);

  // Hourly and trip rates
  const todayNetHourly = todayHours > 0 ? (todayNet / todayHours) : 0;
  const weekNetHourly = weekHours > 0 ? (weekNet / weekHours) : 0;
  const monthNetHourly = monthHours > 0 ? (monthNet / monthHours) : 0;

  const monthExpenseRatio = monthIncomeTotal > 0 ? (monthExpenseTotal / monthIncomeTotal) * 100 : 0;
  const targetExpenseRatio = monthlyIncomeTarget > 0 ? (monthlyExpenseBudget / monthlyIncomeTarget) * 100 : 25;

  return {
    today: {
      date: todayStr,
      income: todayIncomeTotal,
      expense: todayExpenseTotal,
      net: todayNet,
      target: standardDailyIncomeTarget,
      expenseBudget: standardDailyExpenseBudget,
      progress: todayTargetProgress,
      variance: todayVariance,
      hours: todayHours,
      trips: todayTrips,
      netHourly: todayNetHourly,
      isWorkingDay: targets.workingDaysMap ? targets.workingDaysMap[dayKeyMap[todayDayIndex]] : true,
    },
    week: {
      income: weekIncomeTotal,
      expense: weekExpenseTotal,
      net: weekNet,
      target: weeklyIncomeTarget,
      expenseBudget: weeklyExpenseBudget,
      progress: weekTargetProgress,
      variance: weekVariance,
      hours: weekHours,
      trips: weekTrips,
      netHourly: weekNetHourly,
      daysBreakdown: weekDaysBreakdown,
      dynamicDailyTarget: dynamicDailyTargetThisWeek,
      remainingWorkingDays: remainingWorkingDaysThisWeek,
      remainingIncomeNeeded: remainingIncomeNeededThisWeek,
    },
    month: {
      income: monthIncomeTotal,
      expense: monthExpenseTotal,
      net: monthNet,
      target: monthlyIncomeTarget,
      expenseBudget: monthlyExpenseBudget,
      progress: monthTargetProgress,
      variance: monthVariance,
      hours: monthHours,
      trips: monthTrips,
      netHourly: monthNetHourly,
      projectedIncome: projectedMonthIncome,
      projectedNet: projectedMonthNet,
      expenseRatio: monthExpenseRatio,
      targetExpenseRatio,
      expenseBreakdown: expenseBreakdownList,
      incomePlatformBreakdown: incomePlatformList,
    },
    standards: {
      dailyTarget: standardDailyIncomeTarget,
      weeklyTarget: weeklyIncomeTarget,
      monthlyTarget: monthlyIncomeTarget,
      dailyExpenseBudget: standardDailyExpenseBudget,
      weeklyExpenseBudget: weeklyExpenseBudget,
      monthlyExpenseBudget: monthlyExpenseBudget,
      workingDaysPerWeek: workingDaysCount,
    }
  };
}
