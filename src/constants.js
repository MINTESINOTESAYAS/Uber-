// Currency and Category Constants

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', position: 'prefix' },
  { code: 'ETB', symbol: 'Br ', name: 'Ethiopian Birr', position: 'prefix' },
  { code: 'EUR', symbol: '€', name: 'Euro', position: 'prefix' },
  { code: 'GBP', symbol: '£', name: 'British Pound', position: 'prefix' },
  { code: 'CAD', symbol: 'CA$', name: 'Canadian Dollar', position: 'prefix' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', position: 'prefix' },
  { code: 'AED', symbol: 'AED ', name: 'UAE Dirham', position: 'prefix' },
  { code: 'SAR', symbol: 'SAR ', name: 'Saudi Riyal', position: 'prefix' },
  { code: 'KES', symbol: 'KSh ', name: 'Kenyan Shilling', position: 'prefix' },
];

export const INCOME_PLATFORMS = [
  { id: 'uber', name: 'Uber Rides', color: '#000000', bg: 'bg-black text-white', icon: 'car' },
  { id: 'uber_eats', name: 'Uber Eats', color: '#06C167', bg: 'bg-emerald-600 text-white', icon: 'utensils' },
  { id: 'lyft', name: 'Lyft', color: '#FF00BF', bg: 'bg-pink-600 text-white', icon: 'car' },
  { id: 'bolt', name: 'Bolt', color: '#34D186', bg: 'bg-teal-600 text-white', icon: 'zap' },
  { id: 'delivery', name: 'DoorDash / Courier', color: '#FF3008', bg: 'bg-red-500 text-white', icon: 'package' },
  { id: 'private', name: 'Private Airport / Direct', color: '#6366F1', bg: 'bg-indigo-600 text-white', icon: 'briefcase' },
  { id: 'taxi', name: 'Street Hail / Taxi', color: '#F59E0B', bg: 'bg-amber-500 text-white', icon: 'navigation' },
  { id: 'other_income', name: 'Other Income', color: '#64748B', bg: 'bg-slate-600 text-white', icon: 'plus-circle' },
];

export const EXPENSE_CATEGORIES = [
  { id: 'fuel', name: 'Fuel / Gas / EV Charging', color: '#EF4444', icon: 'fuel', defaultPercent: 40 },
  { id: 'maintenance', name: 'Vehicle Maintenance & Repairs', color: '#F97316', icon: 'wrench', defaultPercent: 20 },
  { id: 'carwash', name: 'Car Wash & Detailing', color: '#06B6D4', icon: 'sparkles', defaultPercent: 5 },
  { id: 'tolls_parking', name: 'Tolls & Parking', color: '#8B5CF6', icon: 'credit-card', defaultPercent: 10 },
  { id: 'insurance_lease', name: 'Insurance & Car Payment', color: '#3B82F6', icon: 'shield-check', defaultPercent: 15 },
  { id: 'food_drink', name: 'Shift Meals & Coffee', color: '#EC4899', icon: 'coffee', defaultPercent: 5 },
  { id: 'phone_data', name: 'Phone Bill & Mobile Data', color: '#14B8A6', icon: 'smartphone', defaultPercent: 3 },
  { id: 'licensing', name: 'Permits, Taxes & Licensing', color: '#64748B', icon: 'file-text', defaultPercent: 2 },
  { id: 'misc', name: 'Miscellaneous Expense', color: '#94A3B8', icon: 'tag', defaultPercent: 0 },
];

export const PAYMENT_METHODS = [
  'Cash',
  'Debit Card',
  'Credit Card',
  'Uber Pro Card',
  'Mobile Money / Bank Transfer',
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
