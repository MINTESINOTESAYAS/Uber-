import React from 'react';

export default function DriverLedgerLogo({ 
  className = "w-10 h-10", 
  variant = "icon", // "icon" | "full" | "splash"
  showText = false 
}) {
  if (variant === "splash") {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        {/* Glow behind logo */}
        <div className="relative mb-3">
          <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-yellow-600/20 rounded-full blur-xl pointer-events-none"></div>
          <svg
            viewBox="0 0 320 200"
            className="w-48 h-32 sm:w-56 sm:h-36 drop-shadow-2xl"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gold road & ledger gradient */}
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#EAB308" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Silver car contour gradient */}
              <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>
            </defs>

            {/* Aerodynamic Sports Car Silhouette (Left) */}
            {/* Upper roofline & windshield */}
            <path
              d="M 40 100 C 60 78, 100 68, 140 68 C 160 68, 180 72, 195 82 C 205 90, 208 96, 210 102 C 190 98, 165 98, 140 100 C 105 102, 75 110, 40 100 Z"
              fill="url(#carGradient)"
            />

            {/* Car body side curve & front bumper */}
            <path
              d="M 38 102 C 34 108, 35 116, 42 122 C 55 125, 80 126, 115 124 C 145 122, 175 122, 195 125 C 190 128, 180 134, 160 136 C 130 138, 95 137, 65 132 C 45 128, 30 120, 28 112 C 28 108, 32 104, 38 102 Z"
              fill="#FFFFFF"
              opacity="0.95"
            />

            {/* Car front intake & headlight glow slit */}
            <path
              d="M 42 112 C 52 112, 68 116, 82 116 C 68 119, 50 119, 40 115 Z"
              fill="url(#goldGradient)"
            />

            {/* Swooping Gold Road beneath car */}
            <path
              d="M 120 135 C 150 135, 175 125, 205 118 C 220 115, 235 116, 245 122 C 235 132, 215 138, 185 139 C 155 140, 135 138, 120 135 Z"
              fill="url(#goldGradient)"
            />

            {/* Clipboard / Ledger Frame (Right) */}
            <path
              d="M 185 62 C 215 62, 248 62, 255 70 C 262 78, 262 105, 260 125 C 255 135, 245 138, 230 138 C 242 130, 246 115, 248 95 C 248 80, 240 76, 220 76 L 190 76 Z"
              fill="url(#goldGradient)"
            />

            {/* 3 Horizontal Ledger Lines */}
            <rect x="202" y="86" width="30" height="4.5" rx="2.2" fill="#FFFFFF" />
            <rect x="202" y="98" width="30" height="4.5" rx="2.2" fill="#FFFFFF" />
            <rect x="202" y="110" width="30" height="4.5" rx="2.2" fill="#FFFFFF" />

            {/* 3 Golden Checkmark Accents (>>>) */}
            <path d="M 238 85 L 243 88 L 238 91" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 238 97 L 243 100 L 238 103" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 238 109 L 243 112 L 238 115" stroke="url(#goldGradient)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Brand Text Typography */}
        <div className="flex items-center justify-center space-x-2 text-2xl sm:text-3xl font-black tracking-tight">
          <span className="text-white drop-shadow-md">Driver</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 drop-shadow-md">
            Ledger
          </span>
        </div>
      </div>
    );
  }

  // Header & Icon variant (Top left side of the app)
  return (
    <div className="flex items-center space-x-2">
      <div className={`relative ${className} flex items-center justify-center bg-black/60 rounded-xl p-1 border border-amber-500/30 shadow-md shadow-amber-500/10 shrink-0`}>
        <svg
          viewBox="0 0 320 200"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldMini" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="silverMini" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
          </defs>

          {/* Car upper roofline */}
          <path
            d="M 40 100 C 60 78, 100 68, 140 68 C 160 68, 180 72, 195 82 C 205 90, 208 96, 210 102 C 190 98, 165 98, 140 100 C 105 102, 75 110, 40 100 Z"
            fill="url(#silverMini)"
          />

          {/* Car lower bumper */}
          <path
            d="M 38 102 C 34 108, 35 116, 42 122 C 55 125, 80 126, 115 124 C 145 122, 175 122, 195 125 C 190 128, 180 134, 160 136 C 130 138, 95 137, 65 132 C 45 128, 30 120, 28 112 C 28 108, 32 104, 38 102 Z"
            fill="#FFFFFF"
          />

          {/* Swooping Gold Road */}
          <path
            d="M 120 135 C 150 135, 175 125, 205 118 C 220 115, 235 116, 245 122 C 235 132, 215 138, 185 139 C 155 140, 135 138, 120 135 Z"
            fill="url(#goldMini)"
          />

          {/* Clipboard / Ledger Frame */}
          <path
            d="M 185 62 C 215 62, 248 62, 255 70 C 262 78, 262 105, 260 125 C 255 135, 245 138, 230 138 C 242 130, 246 115, 248 95 C 248 80, 240 76, 220 76 L 190 76 Z"
            fill="url(#goldMini)"
          />

          {/* Ledger Checklist Lines */}
          <rect x="202" y="86" width="30" height="4.5" rx="2.2" fill="#FFFFFF" />
          <rect x="202" y="98" width="30" height="4.5" rx="2.2" fill="#FFFFFF" />
          <rect x="202" y="110" width="30" height="4.5" rx="2.2" fill="#FFFFFF" />

          {/* Checks */}
          <path d="M 238 85 L 243 88 L 238 91" stroke="url(#goldMini)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 238 97 L 243 100 L 238 103" stroke="url(#goldMini)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 238 109 L 243 112 L 238 115" stroke="url(#goldMini)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {showText && (
        <div className="flex items-center space-x-1 font-black text-sm tracking-tight leading-tight">
          <span className="text-white">Driver</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">
            Ledger
          </span>
        </div>
      )}
    </div>
  );
}
