import { formatDateISO } from './calculator.js';

export function getInitialSampleData() {
  const today = new Date();
  
  const daysAgo = (n) => {
    const d = new Date(today);
    d.setDate(today.getDate() - n);
    return formatDateISO(d);
  };

  // Realistic Ethiopian Yango Driver Data in ETB
  const incomes = [
    // Today
    {
      id: 'inc-01',
      date: daysAgo(0),
      platform: 'yango',
      grossAmount: 3850.00,
      tips: 350.00,
      bonus: 200.00,
      hours: 7.5,
      trips: 14,
      notes: 'Bole to Piazza and Kazanchis business trips',
      createdAt: new Date().toISOString(),
    },
    // Yesterday
    {
      id: 'inc-02',
      date: daysAgo(1),
      platform: 'yango',
      grossAmount: 4200.00,
      tips: 400.00,
      bonus: 300.00,
      hours: 8.0,
      trips: 16,
      notes: 'Airport arrivals & CMC evening rush',
      createdAt: new Date().toISOString(),
    },
    // 2 days ago
    {
      id: 'inc-03',
      date: daysAgo(2),
      platform: 'yango',
      grossAmount: 3600.00,
      tips: 250.00,
      bonus: 150.00,
      hours: 7.0,
      trips: 13,
      notes: 'Meskel Square & Mexico routes',
      createdAt: new Date().toISOString(),
    },
    // 3 days ago
    {
      id: 'inc-04',
      date: daysAgo(3),
      platform: 'yango',
      grossAmount: 4500.00,
      tips: 500.00,
      bonus: 250.00,
      hours: 8.5,
      trips: 18,
      notes: 'Weekend night bonus streak in Bole',
      createdAt: new Date().toISOString(),
    },
    // 4 days ago
    {
      id: 'inc-05',
      date: daysAgo(4),
      platform: 'yango',
      grossAmount: 3200.00,
      tips: 200.00,
      bonus: 0,
      hours: 6.0,
      trips: 11,
      notes: 'Afternoon short city trips',
      createdAt: new Date().toISOString(),
    },
    // 5 days ago
    {
      id: 'inc-06',
      date: daysAgo(5),
      platform: 'yango',
      grossAmount: 3900.00,
      tips: 300.00,
      bonus: 200.00,
      hours: 7.5,
      trips: 15,
      notes: 'Morning rush from Sarbet to Megenagna',
      createdAt: new Date().toISOString(),
    },
  ];

  const expenses = [
    // Today
    {
      id: 'exp-01',
      date: daysAgo(0),
      category: 'fuel',
      amount: 950.00,
      paymentMethod: 'Telebirr',
      mileage: '142,310',
      notes: 'Benzene at TotalEnergies Bole',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'exp-02',
      date: daysAgo(0),
      category: 'food_coffee',
      amount: 220.00,
      paymentMethod: 'Cash',
      notes: 'Lunch & Buna break',
      createdAt: new Date().toISOString(),
    },
    // Yesterday
    {
      id: 'exp-03',
      date: daysAgo(1),
      category: 'carwash',
      amount: 250.00,
      paymentMethod: 'Cash',
      notes: 'Full body exterior wash and interior vacuum',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'exp-04',
      date: daysAgo(1),
      category: 'telecom_data',
      amount: 300.00,
      paymentMethod: 'Telebirr',
      notes: 'Monthly driver 4G unlimited package',
      createdAt: new Date().toISOString(),
    },
    // 2 days ago
    {
      id: 'exp-05',
      date: daysAgo(2),
      category: 'fuel',
      amount: 1100.00,
      paymentMethod: 'CBE',
      mileage: '142,080',
      notes: 'Fuel refuel at OiLibya',
      createdAt: new Date().toISOString(),
    },
    // 4 days ago
    {
      id: 'exp-06',
      date: daysAgo(4),
      category: 'maintenance',
      amount: 1800.00,
      paymentMethod: 'CBE',
      mileage: '141,850',
      notes: 'Engine oil change and filter replacement',
      createdAt: new Date().toISOString(),
    },
  ];

  const defaultTargets = {
    monthlyIncome: 95000, // ETB
    monthlyExpenseBudget: 24000, // ETB
    workingDaysPerWeek: 6,
    workingDaysMap: {
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: true,
      sun: false,
    },
    autoAdjustPace: true,
  };

  return { incomes, expenses, defaultTargets };
}
