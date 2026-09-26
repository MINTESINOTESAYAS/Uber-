// Constants - Driver Ledger v1.2

export const APP_VERSION = '1.2';
export const PREVIOUS_VERSION = '1.1';

// Strict Single Currency: ETB (Ethiopian Birr)
export const CURRENCY = {
  code: 'ETB',
  symbol: 'Br ',
  name: 'Ethiopian Birr',
  position: 'prefix'
};

// Strict Single Ride Type: Yango Ride only
export const INCOME_PLATFORMS = [
  { 
    id: 'yango', 
    name: 'Yango Ride', 
    color: '#FF0000', 
    bg: 'bg-red-600 text-white', 
    icon: 'car' 
  }
];

// Strict Payment Methods: CBE, Telebirr, and Cash only
export const PAYMENT_METHODS = [
  'CBE',
  'Telebirr',
  'Cash'
];

// Operating Expense Categories tailored for Yango Drivers
export const EXPENSE_CATEGORIES = [
  { id: 'fuel', name: 'Fuel / Benzene / Nafta', color: '#EF4444', icon: 'fuel', defaultPercent: 45 },
  { id: 'maintenance', name: 'Maintenance & Service', color: '#F97316', icon: 'wrench', defaultPercent: 20 },
  { id: 'carwash', name: 'Car Wash', color: '#06B6D4', icon: 'sparkles', defaultPercent: 5 },
  { id: 'parking_tolls', name: 'Parking & Road Fees', color: '#8B5CF6', icon: 'parking', defaultPercent: 5 },
  { id: 'food_coffee', name: 'Food & Coffee (Buna)', color: '#EC4899', icon: 'coffee', defaultPercent: 10 },
  { id: 'telecom_data', name: 'Telebirr / Mobile Internet', color: '#10B981', icon: 'smartphone', defaultPercent: 5 },
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

// Version Changelog / History
export const VERSION_DETAILS = {
  '1.2': {
    title: 'Version 1.2 (Active Edition)',
    features: [
      'Car Speedometer Circular Target Gauge',
      'Ultra-Simplistic Clean Minimal Dashboard',
      'Strict ETB (Ethiopian Birr) Currency Only',
      'Strict Yango Ride Platform Only',
      'Strict CBE, Telebirr & Cash Payment Choices',
      'Past Date Logging (Add income/expense for any missed prior days)',
      'Organized Sub-screen for deep analytics & trends',
    ]
  },
  '1.1': {
    title: 'Version 1.1 (Initial Fam Fund Edition)',
    features: [
      'Multi-currency and multi-platform support',
      'Fam Fund card-based balance dashboard',
      'Initial 4-sheet Excel export system',
      'Standard calendar view',
    ]
  }
};
