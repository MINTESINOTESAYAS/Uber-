# Driver Ledger Pro (Fam Fund Mobile UI Edition)

A professional Android application built for rideshare and delivery drivers (Uber, Lyft, Bolt, Delivery, Taxi) to track daily income, operating expenses, and compare actual earnings against a target plan divided across **Daily, Weekly, and Monthly** intervals — with direct multi-sheet **Excel (.xlsx)** backup and export.

Designed using the **Fam Fund App** Figma mobile UI template.

---

## 📱 Features

### 1. Daily Income & Expense Tracking
- **Income Logging:** Record base fares, tips, platform bonuses/quests, hours driven, and trip counts across platforms (Uber Rides, Uber Eats, Lyft, Bolt, Courier, Private Trips, Taxi).
- **Expense Logging:** Track categorized vehicle expenses (Fuel/Gas/EV Charging, Maintenance & Repairs, Car Wash, Tolls & Parking, Insurance & Financing, Shift Meals, Phone Bill).
- **Full History & Ledger:** Chronological feed grouped by date with search and category filters. Tap any entry to edit or delete.

### 2. Target & Plan Manager (Daily, Weekly, Monthly)
- Set monthly income goal (e.g. $4,000/month) and operating expense ceiling.
- Customize your driving schedule by toggling active days of the week (Mon–Sun).
- **Automated Breakdown:**
  - Standard Daily Target = `Weekly Goal / Working Days Count`
  - Standard Weekly Target = `Monthly Goal / 4.333`
  - Standard Daily Expense Budget = `Monthly Budget / 30`
- **Smart Pace Rebalancer:** Dynamically calculates the required daily pace for remaining working days in the week if you fall short or exceed your goal.
- **7-Day Bar Chart:** Compare Mon–Sun daily revenue against the target milestone line.

### 3. Native Excel Sheet (.xlsx) Backup & Export
- Generates formatted, multi-worksheet Excel workbooks:
  1. **Executive Summary:** Period targets, actuals, variance (+/-), achievement %, and operating expense ratios.
  2. **Daily Ledger:** Day-by-day record with target variance and status badges (`TARGET MET ✅` vs `BELOW TARGET`).
  3. **Income Log:** Detailed breakdown of base fares, tips, incentives, hours, and trips.
  4. **Expense Log:** Categorized vehicle expenses with payment methods and mileage.
- **Android Share Integration:** Direct hook into the Android system share sheet (WhatsApp, Google Drive, Email, Local storage).
- **Offline JSON Database:** 100% offline local storage with full JSON database export and restore.

### 4. Figma Collaboration & Fam Fund Template Integration
- Mapped to Figma design: [Fam Fund App (Node 1172-18321)](https://www.figma.com/design/RmlD47Tt0t0zhFaMLkuPuz/Fam-Fund-App--Community-?node-id=1172-18321&t=g9imMLDzEnbH1CMN-1)
- Color tokens: Emerald `#10B981`, Mint `#34D399`, Slate `#0F172A`, Coral `#EF4444`.
- Theme presets: **Fam Fund Mint**, **Fam Fund Dark Midnight**, and **Uber Noir**.
- Responsive simulated Android phone frame for browser testing with a 1-tap full-screen toggle.

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start Vite live development server (bound to 0.0.0.0:5173)
npm run dev

# Build production bundle
npm run build

# Sync assets to native Android project
npx cap sync android
```
