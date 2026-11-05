import React from "react";

// Ingredient 1: Top Bun (Soft glazed toasted brioche with sesame seeds)
export function TopBun({ className = "" }) {
  return (
    <svg viewBox="0 0 460 160" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="tbGrad" cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#f5ab5b" />
          <stop offset="30%" stopColor="#d97524" />
          <stop offset="70%" stopColor="#a3440e" />
          <stop offset="100%" stopColor="#551e04" />
        </radialGradient>
        <linearGradient id="tbSheen" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#ffe6ba" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#e07b22" stopOpacity="0" />
        </linearGradient>
        <filter id="tbShadow" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#000" floodOpacity="0.75" />
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#f45b25" floodOpacity="0.25" />
        </filter>
        <filter id="tbSesameShad" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="0.8" floodColor="#2a1003" floodOpacity="0.8" />
        </filter>
      </defs>
      <g filter="url(#tbShadow)">
        {/* Main Dome */}
        <path
          d="M 35 130 C 30 72, 105 18, 230 16 C 355 18, 430 72, 425 130 C 420 144, 40 144, 35 130 Z"
          fill="url(#tbGrad)"
        />
        {/* Top glossy sheen */}
        <path
          d="M 70 100 C 85 48, 145 28, 230 26 C 315 28, 375 48, 390 100 C 340 70, 260 55, 200 58 C 140 60, 95 82, 70 100 Z"
          fill="url(#tbSheen)"
        />
        {/* Toasted underside rim */}
        <ellipse cx="230" cy="132" rx="192" ry="14" fill="#3a1303" opacity="0.9" />
        <ellipse cx="230" cy="130" rx="188" ry="12" fill="#7a2c07" opacity="0.6" />

        {/* Toasted Sesame Seeds */}
        <g filter="url(#tbSesameShad)">
          {[
            { cx: 140, cy: 58, r: 15 }, { cx: 180, cy: 46, r: -20 }, { cx: 225, cy: 36, r: 10 },
            { cx: 275, cy: 44, r: 30 }, { cx: 320, cy: 56, r: -12 }, { cx: 110, cy: 82, r: 35 },
            { cx: 155, cy: 74, r: -10 }, { cx: 200, cy: 64, r: 18 }, { cx: 250, cy: 62, r: -25 },
            { cx: 295, cy: 72, r: 12 }, { cx: 345, cy: 82, r: -38 }, { cx: 95, cy: 105, r: 45 },
            { cx: 140, cy: 98, r: -15 }, { cx: 188, cy: 90, r: 28 }, { cx: 232, cy: 86, r: -8 },
            { cx: 278, cy: 88, r: 15 }, { cx: 322, cy: 96, r: -32 }, { cx: 368, cy: 104, r: 22 },
            { cx: 210, cy: 108, r: 5 }, { cx: 255, cy: 105, r: -14 }, { cx: 300, cy: 110, r: 35 },
            { cx: 165, cy: 110, r: -25 }, { cx: 125, cy: 118, r: 12 }, { cx: 335, cy: 116, r: -10 }
          ].map((s, i) => (
            <ellipse
              key={i}
              cx={s.cx}
              cy={s.cy}
              rx="5.5"
              ry="3.2"
              fill="#fff2d6"
              stroke="#dca060"
              strokeWidth="0.7"
              transform={`rotate(${s.r} ${s.cx} ${s.cy})`}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}

// Ingredient 2: Crisp Iceberg Lettuce (Fresh ruffled curls)
export function CrispLettuce({ className = "" }) {
  return (
    <svg viewBox="0 0 470 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="letGrad" x1="0%" y1="0%" x2="100%" y2="80%">
          <stop offset="0%" stopColor="#48a826" />
          <stop offset="40%" stopColor="#76cb38" />
          <stop offset="80%" stopColor="#3d911e" />
          <stop offset="100%" stopColor="#255e12" />
        </linearGradient>
        <filter id="letShadow" x="-10%" y="-15%" width="120%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#000" floodOpacity="0.65" />
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#2e7d18" floodOpacity="0.25" />
        </filter>
      </defs>
      <g filter="url(#letShadow)">
        {/* Ruffled back layer */}
        <path
          d="M 32 55 C 20 38, 55 26, 80 44 C 108 22, 155 30, 172 52 C 198 25, 255 24, 278 48 C 305 25, 360 28, 380 54 C 410 38, 442 50, 435 68 C 428 82, 385 90, 350 76 C 320 90, 270 85, 242 68 C 208 90, 155 88, 128 70 C 100 86, 52 82, 32 55 Z"
          fill="url(#letGrad)"
        />
        {/* Front rib highlights */}
        <path d="M 85 48 Q 115 58 145 62" stroke="#bdf780" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />
        <path d="M 190 54 Q 225 62 260 62" stroke="#bdf780" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
        <path d="M 290 53 Q 325 61 360 63" stroke="#bdf780" strokeWidth="2.2" strokeLinecap="round" opacity="0.75" />
      </g>
    </svg>
  );
}

// Ingredient 3: Fresh Juicy Tomato Slices
export function TomatoSlices({ className = "" }) {
  return (
    <svg viewBox="0 0 460 110" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="tomGrad1" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ff483b" />
          <stop offset="60%" stopColor="#d61f18" />
          <stop offset="90%" stopColor="#960c07" />
          <stop offset="100%" stopColor="#630401" />
        </radialGradient>
        <radialGradient id="tomGrad2" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ff5242" />
          <stop offset="60%" stopColor="#dc241a" />
          <stop offset="90%" stopColor="#9e0f08" />
          <stop offset="100%" stopColor="#660400" />
        </radialGradient>
        <radialGradient id="tomJelly" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe680" />
          <stop offset="40%" stopColor="#6d991b" />
          <stop offset="85%" stopColor="#a3160a" />
        </radialGradient>
        <filter id="tomShadow" x="-10%" y="-15%" width="120%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000" floodOpacity="0.7" />
          <feDropShadow dx="0" dy="2" stdDeviation="5" floodColor="#ff3b30" floodOpacity="0.22" />
        </filter>
      </defs>
      <g filter="url(#tomShadow)">
        {/* Left Tomato Slice */}
        <g transform="translate(42, 8) rotate(-5 95 48)">
          <ellipse cx="98" cy="48" rx="88" ry="37" fill="url(#tomGrad1)" />
          <ellipse cx="98" cy="48" rx="77" ry="30" stroke="#ff766b" strokeWidth="2" opacity="0.6" fill="none" />
          {[
            { cx: 65, cy: 40, rx: 18, ry: 10, r: -15 },
            { cx: 102, cy: 35, rx: 16, ry: 9, r: 8 },
            { cx: 130, cy: 42, rx: 16, ry: 10, r: 25 },
            { cx: 78, cy: 58, rx: 17, ry: 10, r: 12 },
            { cx: 118, cy: 57, rx: 18, ry: 10, r: -10 }
          ].map((loc, i) => (
            <g key={i}>
              <ellipse
                cx={loc.cx}
                cy={loc.cy}
                rx={loc.rx}
                ry={loc.ry}
                fill="url(#tomJelly)"
                transform={`rotate(${loc.r} ${loc.cx} ${loc.cy})`}
                opacity="0.85"
              />
              <circle cx={loc.cx - 3} cy={loc.cy - 1} r="2.2" fill="#fff9b8" opacity="0.9" />
              <circle cx={loc.cx + 3} cy={loc.cy + 1} r="1.9" fill="#fff9b8" opacity="0.85" />
            </g>
          ))}
          <path d="M 45 40 C 60 25, 115 22, 150 35 C 130 30, 75 30, 55 44 Z" fill="#ffffff" opacity="0.55" />
        </g>

        {/* Right Tomato Slice */}
        <g transform="translate(225, 10) rotate(5 98 48)">
          <ellipse cx="98" cy="48" rx="90" ry="38" fill="url(#tomGrad2)" />
          <ellipse cx="98" cy="48" rx="79" ry="31" stroke="#ff766b" strokeWidth="2" opacity="0.6" fill="none" />
          {[
            { cx: 64, cy: 41, rx: 18, ry: 10, r: -20 },
            { cx: 100, cy: 36, rx: 17, ry: 9, r: 5 },
            { cx: 134, cy: 44, rx: 17, ry: 10, r: 22 },
            { cx: 77, cy: 58, rx: 17, ry: 10, r: 10 },
            { cx: 119, cy: 57, rx: 18, ry: 10, r: -12 }
          ].map((loc, i) => (
            <g key={i}>
              <ellipse
                cx={loc.cx}
                cy={loc.cy}
                rx={loc.rx}
                ry={loc.ry}
                fill="url(#tomJelly)"
                transform={`rotate(${loc.r} ${loc.cx} ${loc.cy})`}
                opacity="0.85"
              />
              <circle cx={loc.cx - 2} cy={loc.cy - 1} r="2.2" fill="#fff9b8" opacity="0.9" />
              <circle cx={loc.cx + 4} cy={loc.cy + 1} r="1.8" fill="#fff9b8" opacity="0.85" />
            </g>
          ))}
          <path d="M 45 40 C 62 25, 118 22, 154 36 C 130 30, 75 30, 55 44 Z" fill="#ffffff" opacity="0.6" />
        </g>
      </g>
    </svg>
  );
}

// Ingredient 4: Melted Aged Cheddar Cheese (Molten corners)
export function MeltedCheese({ className = "" }) {
  return (
    <svg viewBox="0 0 460 125" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="chedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffc83b" />
          <stop offset="30%" stopColor="#ffa710" />
          <stop offset="70%" stopColor="#f58000" />
          <stop offset="100%" stopColor="#cc5400" />
        </linearGradient>
        <linearGradient id="chedSheen" x1="20%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="50%" stopColor="#ffea9f" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ff9a00" stopOpacity="0" />
        </linearGradient>
        <filter id="chedShadow" x="-10%" y="-15%" width="120%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#000" floodOpacity="0.7" />
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#f45b25" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#chedShadow)">
        <path
          d="M 55 42 
             C 100 32, 330 32, 385 40 
             C 415 60, 430 88, 420 110 
             C 412 120, 395 114, 388 100 
             C 382 86, 375 68, 358 66 
             C 332 62, 290 74, 268 105 
             C 260 116, 244 118, 238 106 
             C 230 90, 220 68, 200 66 
             C 178 64, 148 84, 128 114 
             C 120 126, 104 124, 98 110 
             C 90 90, 80 64, 52 86 
             C 38 98, 26 84, 32 70 
             C 38 58, 45 46, 55 42 Z"
          fill="url(#chedGrad)"
        />
        {/* Soft liquid sheen on melted edges */}
        <path
          d="M 70 46 C 125 38, 310 38, 370 45 C 382 54, 355 60, 335 60 C 290 62, 220 62, 160 66 C 112 68, 80 58, 70 46 Z"
          fill="url(#chedSheen)"
        />
        <ellipse cx="110" cy="113" rx="8" ry="4.5" fill="#ffeaa7" opacity="0.75" />
        <ellipse cx="250" cy="108" rx="6.5" ry="4" fill="#ffeaa7" opacity="0.75" />
        <ellipse cx="406" cy="105" rx="7.5" ry="4.2" fill="#ffeaa7" opacity="0.75" />
      </g>
    </svg>
  );
}

// Ingredient 5: Upper Smash Patty (Charred edges, juicy crust)
export function PattyUpper({ className = "" }) {
  return (
    <svg viewBox="0 0 460 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="puGrad" cx="50%" cy="40%" r="58%">
          <stop offset="0%" stopColor="#4f2514" />
          <stop offset="45%" stopColor="#38170b" />
          <stop offset="85%" stopColor="#200a03" />
          <stop offset="100%" stopColor="#120501" />
        </radialGradient>
        <linearGradient id="puSear" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#120501" />
          <stop offset="25%" stopColor="#522411" />
          <stop offset="50%" stopColor="#2b0f05" />
          <stop offset="75%" stopColor="#5a2913" />
          <stop offset="100%" stopColor="#140602" />
        </linearGradient>
        <filter id="puShadow" x="-10%" y="-15%" width="120%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="11" floodColor="#000" floodOpacity="0.8" />
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#f45b25" floodOpacity="0.15" />
        </filter>
      </defs>
      <g filter="url(#puShadow)">
        <path
          d="M 40 58 
             C 36 38, 75 28, 125 26 
             C 185 24, 275 24, 340 27 
             C 395 30, 425 40, 422 60 
             C 420 80, 390 92, 335 94 
             C 275 96, 180 96, 120 93 
             C 66 91, 42 80, 40 58 Z"
          fill="url(#puGrad)"
        />
        {/* Craggy crust edge */}
        <path
          d="M 36 60 Q 42 52 50 62 Q 62 50 76 61 Q 90 51 108 60 Q 130 50 156 62 Q 186 50 212 62 Q 248 51 274 62 Q 305 52 330 63 Q 360 52 386 63 Q 410 54 420 62 Q 414 74 402 70 Q 384 78 366 71 Q 340 80 314 72 Q 284 81 254 72 Q 222 82 192 72 Q 158 81 132 72 Q 105 81 78 72 Q 56 80 42 70 Z"
          fill="url(#puSear)"
          opacity="0.88"
        />
        {/* Juicy sear texture marks */}
        {[
          { cx: 105, cy: 44, rx: 15, ry: 3.5 }, { cx: 162, cy: 41, rx: 21, ry: 4 },
          { cx: 228, cy: 40, rx: 27, ry: 4.8 }, { cx: 298, cy: 43, rx: 20, ry: 4 },
          { cx: 355, cy: 46, rx: 14, ry: 3.2 }, { cx: 132, cy: 70, rx: 19, ry: 4 },
          { cx: 198, cy: 68, rx: 24, ry: 4.5 }, { cx: 264, cy: 69, rx: 25, ry: 5 }
        ].map((m, i) => (
          <ellipse key={i} cx={m.cx} cy={m.cy} rx={m.rx} ry={m.ry} fill="#120501" opacity="0.9" />
        ))}
        <path d="M 140 46 Q 228 41 306 48" stroke="#8a4b2a" strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
        <path d="M 158 59 Q 228 56 288 60" stroke="#f49b42" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </g>
    </svg>
  );
}

// Ingredient 6: Special Relish Sauce (Golden amber ribbon)
export function SpecialSauce({ className = "" }) {
  return (
    <svg viewBox="0 0 460 115" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sauGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ff7d3b" />
          <stop offset="40%" stopColor="#f45b25" />
          <stop offset="80%" stopColor="#c73807" />
          <stop offset="100%" stopColor="#821e02" />
        </radialGradient>
        <linearGradient id="sauGloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#ffb088" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f45b25" stopOpacity="0" />
        </linearGradient>
        <filter id="sauShadow" x="-10%" y="-15%" width="120%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000" floodOpacity="0.7" />
          <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#f45b25" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#sauShadow)">
        <path
          d="M 74 36 
             C 122 25, 332 25, 380 36 
             C 402 46, 415 64, 404 76 
             C 394 86, 378 75, 368 65 
             C 354 54, 336 62, 328 92 
             C 322 108, 305 110, 300 96 
             C 292 75, 278 62, 254 64 
             C 232 65, 210 88, 194 108 
             C 185 118, 170 116, 166 102 
             C 159 81, 147 62, 124 64 
             C 101 65, 84 89, 69 97 
             C 58 103, 47 94, 50 81 
             C 55 65, 53 46, 74 36 Z"
          fill="url(#sauGrad)"
        />
        <path
          d="M 96 40 C 158 30, 298 30, 358 40 C 324 46, 254 44, 184 46 C 136 48, 110 45, 96 40 Z"
          fill="url(#sauGloss)"
        />
        <ellipse cx="180" cy="105" rx="6" ry="3.2" fill="#ffc2a1" opacity="0.8" />
        <ellipse cx="310" cy="98" rx="5" ry="2.8" fill="#ffc2a1" opacity="0.8" />
        <ellipse cx="62" cy="90" rx="4.5" ry="2.5" fill="#ffc2a1" opacity="0.8" />
      </g>
    </svg>
  );
}

// Ingredient 7: Lower Smash Patty (Base double layer)
export function PattyLower({ className = "" }) {
  return (
    <svg viewBox="0 0 460 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="plGrad" cx="50%" cy="40%" r="58%">
          <stop offset="0%" stopColor="#482110" />
          <stop offset="45%" stopColor="#331408" />
          <stop offset="85%" stopColor="#1e0a03" />
          <stop offset="100%" stopColor="#100501" />
        </radialGradient>
        <linearGradient id="plSear" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#120501" />
          <stop offset="25%" stopColor="#4f210d" />
          <stop offset="50%" stopColor="#240c04" />
          <stop offset="75%" stopColor="#55240f" />
          <stop offset="100%" stopColor="#120501" />
        </linearGradient>
        <filter id="plShadow" x="-10%" y="-15%" width="120%" height="150%">
          <feDropShadow dx="0" dy="12" stdDeviation="11" floodColor="#000" floodOpacity="0.8" />
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#f45b25" floodOpacity="0.12" />
        </filter>
      </defs>
      <g filter="url(#plShadow)">
        <path
          d="M 38 60 
             C 34 37, 78 27, 128 25 
             C 190 23, 270 23, 335 26 
             C 392 28, 426 38, 424 60 
             C 421 81, 391 94, 332 96 
             C 270 97, 178 97, 116 95 
             C 64 92, 40 81, 38 60 Z"
          fill="url(#plGrad)"
        />
        <path
          d="M 34 62 Q 42 52 55 63 Q 71 51 89 62 Q 114 51 140 63 Q 171 52 203 63 Q 238 51 271 63 Q 306 52 335 64 Q 365 53 392 64 Q 418 54 429 63 Q 420 75 406 72 Q 386 80 366 73 Q 338 82 310 73 Q 278 83 248 73 Q 216 83 186 73 Q 150 82 124 73 Q 94 83 70 73 Q 50 81 38 71 Z"
          fill="url(#plSear)"
          opacity="0.9"
        />
        {[
          { cx: 120, cy: 45, rx: 18, ry: 3.8 }, { cx: 182, cy: 42, rx: 23, ry: 4.2 },
          { cx: 248, cy: 41, rx: 26, ry: 4.5 }, { cx: 315, cy: 44, rx: 19, ry: 3.8 },
          { cx: 146, cy: 70, rx: 21, ry: 4.2 }, { cx: 217, cy: 67, rx: 26, ry: 4.5 },
          { cx: 288, cy: 68, rx: 24, ry: 4.2 }
        ].map((m, i) => (
          <ellipse key={i} cx={m.cx} cy={m.cy} rx={m.rx} ry={m.ry} fill="#0d0401" opacity="0.95" />
        ))}
        <path d="M 132 48 Q 225 43 318 50" stroke="#854524" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </g>
    </svg>
  );
}

// Ingredient 8: Bottom Brioche Bun (Toasted heel)
export function BottomBun({ className = "" }) {
  return (
    <svg viewBox="0 0 460 135" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bbGrad" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f7b366" />
          <stop offset="35%" stopColor="#d97524" />
          <stop offset="75%" stopColor="#9e410d" />
          <stop offset="100%" stopColor="#4c1b03" />
        </radialGradient>
        <linearGradient id="bbToast" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffe1ad" />
          <stop offset="50%" stopColor="#d67425" />
          <stop offset="100%" stopColor="#7a2a06" />
        </linearGradient>
        <filter id="bbShadow" x="-10%" y="-15%" width="120%" height="150%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#000" floodOpacity="0.85" />
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#f45b25" floodOpacity="0.2" />
        </filter>
      </defs>
      <g filter="url(#bbShadow)">
        <path
          d="M 46 36 
             C 44 24, 84 19, 230 19 
             C 376 19, 416 24, 414 36 
             C 410 70, 390 102, 342 112 
             C 284 122, 176 122, 118 112 
             C 70 102, 50 70, 46 36 Z"
          fill="url(#bbGrad)"
        />
        <ellipse cx="230" cy="33" rx="182" ry="14" fill="url(#bbToast)" />
        <ellipse cx="230" cy="31" rx="175" ry="11" fill="#ffecbf" opacity="0.38" />
        <path
          d="M 75 52 C 92 88, 142 105, 230 107 C 318 105, 368 88, 385 52 C 354 76, 296 92, 230 92 C 164 92, 106 76, 75 52 Z"
          fill="#ff9838"
          opacity="0.3"
        />
      </g>
    </svg>
  );
}
