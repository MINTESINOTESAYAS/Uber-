// Constants - Driver Ledger v1.3 (Fam Fund Edition with Ethiopian Birr & Yango)

export const APP_VERSION = '1.3';
export const PREVIOUS_VERSION = '1.1';
export const PREVIOUS_VERSIONS = ['1.1', '1.2'];

// Strict Single Currency: ETB (Ethiopian Birr)
export const CURRENCY = {
  code: 'ETB',
  symbol: 'Br ',
  name: 'Ethiopian Birr',
  position: 'prefix'
};

// Strict Single Ride Type: Yango Ride Only
export const INCOME_PLATFORMS = [
  { 
    id: 'yango', 
    name: 'Yango Ride', 
    color: '#FF0000', 
    bg: 'bg-red-600 text-white', 
    icon: 'car' 
  }
];

// Strict Payment Methods: CBE, Telebirr, and Cash Only
export const PAYMENT_METHODS = [
  'CBE',
  'Telebirr',
  'Cash'
];

// Expense Categories tailored for Yango Drivers
export const EXPENSE_CATEGORIES = [
  { id: 'fuel', name: 'Fuel / Benzene / Nafta', color: '#EF4444', icon: 'fuel', defaultPercent: 45 },
  { id: 'maintenance', name: 'Maintenance & Repairs', color: '#F97316', icon: 'wrench', defaultPercent: 20 },
  { id: 'carwash', name: 'Car Wash', color: '#06B6D4', icon: 'sparkles', defaultPercent: 5 },
  { id: 'parking_tolls', name: 'Parking & Road Fees', color: '#8B5CF6', icon: 'credit-card', defaultPercent: 5 },
  { id: 'food_coffee', name: 'Shift Food & Coffee (Buna)', color: '#EC4899', icon: 'coffee', defaultPercent: 10 },
  { id: 'telecom_data', name: 'Mobile Internet / Telebirr', color: '#10B981', icon: 'smartphone', defaultPercent: 5 },
  { id: 'other_expense', name: 'Other Vehicle Expense', color: '#64748B', icon: 'tag', defaultPercent: 10 },
];

export const DAYS_OF_WEEK = [
  { key: 'mon', label: 'Mon', full: 'Monday' },
  { key: 'tue', label: 'Tue', full: 'Tuesday' },
  { key: 'wed', label: 'Wed', full: 'Wednesday' },
  { key: 'thu', label: 'Thu', full: 'Thursday' },
  { key: 'fri', label: 'Fri', full: 'Friday' },
  { key: 'sat', label: 'Sat', full: 'Saturday' },
  { key: 'sun', label: 'Sun', full: 'Sunday' },
];

// Fam Fund Design System Tokens
export const FAM_FUND_THEME = {
  emerald: {
    primary: '#10B981',
    primaryDark: '#059669',
    accent: '#34D399',
    surface: '#F8FAFC',
    card: '#FFFFFF',
    textMain: '#0F172A',
    textMuted: '#64748B',
    border: '#E2E8F0',
    incomeGreen: '#10B981',
    expenseRed: '#EF4444',
  },
  dark: {
    primary: '#10B981',
    primaryDark: '#059669',
    accent: '#34D399',
    surface: '#0B1120',
    card: '#1E293B',
    textMain: '#F8FAFC',
    textMuted: '#94A3B8',
    border: '#334155',
    incomeGreen: '#34D399',
    expenseRed: '#F87171',
  },
  noir: {
    primary: '#000000',
    primaryDark: '#1E1E1E',
    accent: '#22C55E',
    surface: '#000000',
    card: '#121212',
    textMain: '#FFFFFF',
    textMuted: '#A1A1AA',
    border: '#27272A',
    incomeGreen: '#22C55E',
    expenseRed: '#EF4444',
  }
};
