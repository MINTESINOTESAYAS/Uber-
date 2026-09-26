# Yango Driver Ledger Pro (Version 1.2 & 1.1)

A professional Android application specifically engineered for **Yango drivers in Ethiopia**, tracking daily income and operating expenses compared against daily, weekly, and monthly targets — with direct multi-sheet **Excel (.xlsx)** backup and export.

---

## 🏎️ What's New in Version 1.2 (Active Edition)

1. **Car Speedometer Target Cockpit Gauge:**
   - Features an instrument-style circular tachometer / speedometer gauge right on the home screen.
   - Shows real-time Actual Income vs. Planned Target with a dynamic needle, 0–100% target ticks, and neon glow progress arc.
   - Seamless toggles for **Daily**, **Weekly**, and **Monthly** targets directly on the gauge.

2. **Ultra-Simplistic Home UI:**
   - Streamlined cockpit: Speedometer dial, today's expenses, today's net profit, and two big tactile buttons (`+ Log Income` and `- Log Expense`).
   - Clean, uncluttered layout: Deep analytics, target breakdowns, and 7-day charts are neatly organized into a dedicated **"Detailed Driver Hub"** sub-screen so the home dashboard stays clean and fast.

3. **Strict Ethiopian Birr (ETB) & Yango Ride Focus:**
   - All monetary figures are native **ETB (Br )**.
   - Removed all irrelevant ride types and platforms; strictly optimized for **Yango Ride**.

4. **Strict Payment Method Selection:**
   - Expenses strictly limited to the 3 main driver payment methods in Ethiopia:
     - **CBE** (Commercial Bank of Ethiopia / CBE Birr)
     - **Telebirr**
     - **Cash**

5. **Previous Days Income & Expense Logging:**
   - Forgot to log earnings or fuel yesterday or earlier this week? One-tap buttons for **"Today"**, **"Yesterday"**, **"2 Days Ago"**, or **"Pick Any Past Date"** allow backfilling missed records seamlessly.

6. **Version Management (v1.1 & v1.2):**
   - Both **Version 1.1** (initial Fam Fund card style) and **Version 1.2** (car speedometer gauge cockpit) are fully preserved in the app. Tap the `v1.2` badge in the header to switch between editions.

---

## 📊 Features & Modules

### 1. Target & Plan Manager (Daily, Weekly, Monthly)
- Set monthly income goal (e.g. Br 95,000/month) and operating expense ceiling.
- Configure working days per week (e.g. 6 days Mon–Sat).
- **Automated Breakdown:**
  - Standard Daily Target = `Weekly Goal / Working Days Count`
  - Standard Weekly Target = `Monthly Goal / 4.333`
  - Daily Expense Limit = `Monthly Budget / 30`
- **Smart Weekly Pace Rebalancer:** Automatically calculates how much Birr you need to average on your remaining working days this week to still achieve your weekly milestone.
- **7-Day Bar Chart:** Compare Mon–Sun daily revenue against the target milestone line.

### 2. Multi-Sheet Excel (.xlsx) Backup & Export
- Generates professional `.xlsx` workbooks:
  1. **Executive Summary:** Target vs Actual for Daily, Weekly, and Monthly in ETB, plus variance and achievement rates.
  2. **Daily Ledger:** Day-by-day record with target variance and status badges (`TARGET MET ✅` vs `BELOW TARGET`).
  3. **Income Log:** Yango gross fares, tips, quest bonuses, trips, hours, and notes in ETB.
  4. **Expense Log:** Categorized expenses with **CBE / Telebirr / Cash** payment methods and vehicle mileage.
- **Android Share Integration:** Direct hook into the Android system share sheet (WhatsApp, Google Drive, Email, Local storage).

---

## 🚀 Running the Project

```bash
# Start Vite development server
npm run dev

# Build production bundle
npm run build

# Sync assets to native Android project
npx cap sync android
```
