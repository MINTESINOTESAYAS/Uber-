# Yango Driver Ledger Pro (Version 1.3)

A professional Android application built using the **Fam Fund App** mobile UI template, tailored specifically for **Yango drivers in Ethiopia** to track daily income and vehicle operating expenses against planned **Daily, Weekly, and Monthly** targets — with multi-sheet **Excel (.xlsx)** backup and export.

---

## 🌟 Version 1.3 Improvements

1. **Payment Methods: CBE, Telebirr & Cash Choice Only**
   - Vehicle expenses are strictly limited to the three standard Ethiopian driver payment choices:
     - **CBE** (Commercial Bank of Ethiopia / CBE Birr)
     - **Telebirr**
     - **Cash**
   - All other payment methods (debit/credit card, foreign cards) have been removed.

2. **Native ETB Currency & Yango Ride Only**
   - All monetary calculations and displays are strictly formatted in **Ethiopian Birr (`Br ` / `ETB`)**.
   - Platform is strictly set to **Yango Ride** (gross fares, tips, and quest bonuses). Foreign platforms and currencies have been completely removed.

3. **Multi-Sheet Excel Sheet (.xlsx) Backup in ETB**
   - Generates formatted, multi-worksheet `.xlsx` workbooks:
     - **Sheet 1: Executive Summary** (Period targets, actual achievements, variances (+/−), achievement %, and operating expense ratios in ETB).
     - **Sheet 2: Daily Ledger** (Day-by-day table showing Target Met `TARGET MET ✅` vs `BELOW TARGET` status).
     - **Sheet 3: Income Log** (Yango Ride gross fares, tips, quest bonuses, trips, hours, and notes in ETB).
     - **Sheet 4: Expense Log** (Categorized expenses, vehicle mileage, and strictly **CBE / Telebirr / Cash** payment methods).
   - Direct Android Share Tray integration (WhatsApp, Google Drive, Email, Local storage).

4. **Fam Fund UI Template Structure**
   - Restored the signature **Fam Fund Hero Balance Card** with smooth gradients and quick `[Today] | [Week] | [Month]` toggles.
   - Restored the **Plan Performance Card** with progress bars, dynamic weekly pace rebalancing, and daily/weekly/monthly milestone splits.
   - Quick tactile actions: `+ Yango Income`, `- Expense`, `Plan Milestones`, `Excel Backup`.
   - Chronological recent activity feed with quick tap-to-edit.
   - Previous days logging capability preserved (record yesterday's or past dates' trips easily).

---

## 📱 App Navigation Tabs

- **Home:** Fam Fund Hero Card, Target Plan Progress, Quick Actions, and Recent Activity.
- **Plan:** Deep analytics, 7-day Mon–Sun milestone comparison chart, and expense category distributions.
- **Ledger:** Searchable, filterable transaction records with search by date, notes, or CBE/Telebirr/Cash payment method.
- **Excel:** One-tap Excel workbook (.xlsx) generator and offline JSON database backup.

---

## 🚀 Running the Project

```bash
# Start Vite live development server (0.0.0.0:5173)
npm run dev

# Build production bundle
npm run build

# Sync assets to native Android project
npx cap sync android
```
