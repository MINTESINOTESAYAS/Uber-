import { formatDateISO } from './calculator.js';

export function getInitialSampleData() {
  const today = new Date();
  
  // Helper to get past dates
  const daysAgo = (n) => {
    const d = new Date(today);
    d.setDate(today.getDate() - n);
    return formatDateISO(d);
  };

  const incomes = [
    // Today
    {
      id: 'inc-01',
      date: daysAgo(0),
      platform: 'uber',
      grossAmount: 165.50,
      tips: 28.00,
      bonus: 15.00,
      hours: 6.5,
      trips: 12,
      notes: 'Morning and afternoon airport surge',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'inc-02',
      date: daysAgo(0),
      platform: 'uber_eats',
      grossAmount: 42.00,
      tips: 14.50,
      bonus: 0,
      hours: 1.5,
      trips: 4,
      notes: 'Lunch dinner rush deliveries',
      createdAt: new Date().toISOString(),
    },
    // Yesterday
    {
      id: 'inc-03',
      date: daysAgo(1),
      platform: 'uber',
      grossAmount: 180.00,
      tips: 32.00,
      bonus: 20.00,
      hours: 7.0,
      trips: 15,
      notes: 'Downtown commute runs',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'inc-04',
      date: daysAgo(1),
      platform: 'lyft',
      grossAmount: 65.00,
      tips: 10.00,
      bonus: 0,
      hours: 2.0,
      trips: 5,
      notes: 'Lyft streak bonus',
      createdAt: new Date().toISOString(),
    },
    // 2 days ago
    {
      id: 'inc-05',
      date: daysAgo(2),
      platform: 'uber',
      grossAmount: 195.00,
      tips: 35.00,
      bonus: 25.00,
      hours: 8.0,
      trips: 16,
      notes: 'Weekend evening rush',
      createdAt: new Date().toISOString(),
    },
    // 3 days ago
    {
      id: 'inc-06',
      date: daysAgo(3),
      platform: 'bolt',
      grossAmount: 110.00,
      tips: 15.00,
      bonus: 10.00,
      hours: 5.0,
      trips: 9,
      notes: 'Midday cross-town rides',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'inc-07',
      date: daysAgo(3),
      platform: 'private',
      grossAmount: 85.00,
      tips: 20.00,
      bonus: 0,
      hours: 2.0,
      trips: 1,
      notes: 'Executive hotel to terminal airport transfer',
      createdAt: new Date().toISOString(),
    },
    // 4 days ago
    {
      id: 'inc-08',
      date: daysAgo(4),
      platform: 'uber',
      grossAmount: 175.00,
      tips: 22.00,
      bonus: 10.00,
      hours: 6.5,
      trips: 13,
      notes: 'Standard weekday shift',
      createdAt: new Date().toISOString(),
    },
    // 5 days ago
    {
      id: 'inc-09',
      date: daysAgo(5),
      platform: 'uber',
      grossAmount: 140.00,
      tips: 18.00,
      bonus: 0,
      hours: 5.5,
      trips: 10,
      notes: 'Rainy afternoon boost',
      createdAt: new Date().toISOString(),
    },
    // 6 days ago
    {
      id: 'inc-10',
      date: daysAgo(6),
      platform: 'delivery',
      grossAmount: 95.00,
      tips: 26.00,
      bonus: 12.00,
      hours: 4.5,
      trips: 8,
      notes: 'Dinner delivery surge',
      createdAt: new Date().toISOString(),
    },
    // Earlier this month
    {
      id: 'inc-11',
      date: daysAgo(8),
      platform: 'uber',
      grossAmount: 210.00,
      tips: 40.00,
      bonus: 30.00,
      hours: 8.5,
      trips: 17,
      notes: 'Friday night concert crowds',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'inc-12',
      date: daysAgo(10),
      platform: 'uber',
      grossAmount: 185.00,
      tips: 25.00,
      bonus: 15.00,
      hours: 7.0,
      trips: 14,
      notes: 'Airport queue and early departures',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'inc-13',
      date: daysAgo(12),
      platform: 'lyft',
      grossAmount: 130.00,
      tips: 20.00,
      bonus: 10.00,
      hours: 5.0,
      trips: 9,
      notes: 'Suburban morning routes',
      createdAt: new Date().toISOString(),
    },
  ];

  const expenses = [
    // Today
    {
      id: 'exp-01',
      date: daysAgo(0),
      category: 'fuel',
      amount: 45.00,
      paymentMethod: 'Debit Card',
      mileage: '124,530',
      notes: 'Full tank unleaded at Shell',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'exp-02',
      date: daysAgo(0),
      category: 'food_drink',
      amount: 8.50,
      paymentMethod: 'Cash',
      notes: 'Coffee & snack mid-shift',
      createdAt: new Date().toISOString(),
    },
    // Yesterday
    {
      id: 'exp-03',
      date: daysAgo(1),
      category: 'tolls_parking',
      amount: 14.25,
      paymentMethod: 'Uber Pro Card',
      notes: 'Express lane highway toll fee',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'exp-04',
      date: daysAgo(1),
      category: 'carwash',
      amount: 15.00,
      paymentMethod: 'Debit Card',
      notes: 'Quick exterior wash & vacuum before weekend',
      createdAt: new Date().toISOString(),
    },
    // 3 days ago
    {
      id: 'exp-05',
      date: daysAgo(3),
      category: 'fuel',
      amount: 42.00,
      paymentMethod: 'Debit Card',
      mileage: '124,210',
      notes: 'Refuel at BP',
      createdAt: new Date().toISOString(),
    },
    // 5 days ago
    {
      id: 'exp-06',
      date: daysAgo(5),
      category: 'food_drink',
      amount: 12.00,
      paymentMethod: 'Cash',
      notes: 'Lunch break',
      createdAt: new Date().toISOString(),
    },
    // 7 days ago
    {
      id: 'exp-07',
      date: daysAgo(7),
      category: 'maintenance',
      amount: 85.00,
      paymentMethod: 'Credit Card',
      mileage: '123,900',
      notes: 'Full synthetic oil change & tire pressure check',
      createdAt: new Date().toISOString(),
    },
    // 10 days ago
    {
      id: 'exp-08',
      date: daysAgo(10),
      category: 'fuel',
      amount: 44.00,
      paymentMethod: 'Debit Card',
      mileage: '123,550',
      notes: 'Gas station stop',
      createdAt: new Date().toISOString(),
    },
    // 14 days ago
    {
      id: 'exp-09',
      date: daysAgo(14),
      category: 'phone_data',
      amount: 45.00,
      paymentMethod: 'Credit Card',
      notes: 'Monthly unlimited 5G mobile driver plan',
      createdAt: new Date().toISOString(),
    },
    // 15 days ago
    {
      id: 'exp-10',
      date: daysAgo(15),
      category: 'insurance_lease',
      amount: 180.00,
      paymentMethod: 'Bank Transfer',
      notes: 'Commercial rideshare insurance monthly premium',
      createdAt: new Date().toISOString(),
    },
  ];

  const defaultTargets = {
    monthlyIncome: 4200,
    monthlyExpenseBudget: 950,
    workingDaysPerWeek: 5,
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
