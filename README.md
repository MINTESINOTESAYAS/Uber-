# Driver Ledger Pro (Version 1.4 Final)

A professional Android application built for **Yango drivers in Ethiopia**, tracking daily income and operating expenses compared against planned **Daily, Weekly, and Monthly** targets — with multi-sheet **Excel (.xlsx)** backup and export.

---

## 🏎️ What's New in Version 1.4 (Final Polished Release)

1. **Official Brand Logo Integration:**
   - **App Opening Splash Screen:** Upon launching the app, a luxury opening screen appears featuring the aerodynamic sports car and golden road ledger brand logo with glowing ambient effects, version `v1.4`, and animated loading bar.
   - **Top-Left Side Brand Header:** The official Driver Ledger logo is displayed on the top-left corner of the header. Tapping it re-opens the opening splash screen anytime.
   - Distinctive typography: **Driver** in clean white and **Ledger** in warm gold gradient.

2. **Fam Fund UI Architecture:**
   - **Hero Balance Card:** Dynamic period switcher (`[Today] | [Week] | [Month]`), displaying net take-home earnings in ETB, gross fare pill, and expense pill.
   - **Plan Performance Card:** Real-time target tracking progress bar, variance (+/−), and the **Smart Weekly Pace Rebalancer**.
   - **Tactile Quick Actions:** `+ Yango Income`, `- Expense`, `Plan Milestones`, and `Excel Backup`.
   - **Recent Activity Feed:** Chronological feed with quick tap-to-edit.

3. **Strict Ethiopian Driver Parameters:**
   - **Native ETB Currency Only:** All earnings, expenses, milestones, and reports are formatted in **Ethiopian Birr (`Br ` / `ETB`)**.
   - **Yango Ride Platform Only:** Formatted for Yango Ride base fares, customer tips, and quest bonuses.
   - **Strict Payment Methods:** Vehicle expenses are strictly restricted to:
     1. **CBE** (Commercial Bank of Ethiopia / CBE Birr)
     2. **Telebirr**
     3. **Cash**
   - **Previous Days Logging:** Quick 1-tap buttons for `Today`, `Yesterday`, `2 Days Ago`, or any past calendar date to backfill missed records.

4. **Multi-Sheet Excel Sheet (.xlsx) Backup in ETB:**
   - Generates formatted, multi-worksheet `.xlsx` workbooks:
     - **Sheet 1: Executive Summary** (Targets, actuals, variances, net profit, total trips, hours).
     - **Sheet 2: Daily Ledger** (Day-by-day record with `TARGET MET ✅` vs `BELOW TARGET` status).
     - **Sheet 3: Income Log** (Yango Ride gross fares, tips, bonuses, trips, hours, notes).
     - **Sheet 4: Expense Log** (Categorized expenses, vehicle mileage, and strictly **CBE / Telebirr / Cash** payment methods).
   - Direct hook to the Android Share Tray (WhatsApp, Google Drive, Gmail, Local storage).

---

## 📱 Navigation Tabs

- **Home:** Fam Fund Hero Card, Target Plan Progress, Quick Actions, and Recent Activity.
- **Plan:** Deep analytics, 7-day Mon–Sun milestone comparison chart, and expense category distributions in ETB.
- **Ledger:** Searchable, filterable transaction records with search by date, notes, or CBE/Telebirr/Cash payment method.
- **Excel:** One-tap Excel workbook (.xlsx) generator and offline JSON database backup.

---

## 🚀 Running the Project

```bash
# Start Vite development server (bound to 0.0.0.0:5173)
npm run dev

# Build production bundle
npm run build

# Sync assets to native Android project
npx cap sync android
```
