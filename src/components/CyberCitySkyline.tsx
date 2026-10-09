import React from 'react';

interface CyberCitySkylineProps {
  rippleIntensity?: number;
}

export const CyberCitySkyline: React.FC<CyberCitySkylineProps> = ({ rippleIntensity = 0 }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-[350px] pointer-events-none select-none overflow-hidden z-10">
      {/* Subtle crimson atmospheric glow behind the skyline */}
      <div
        className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#360912]/45 via-[#26050d]/25 to-transparent transition-opacity duration-300"
        style={{
          opacity: 0.75 + Math.min(0.25, rippleIntensity * 0.5),
        }}
      />

      {/* 
        Native 2560x360 QHD Vector City Silhouette:
        Uses preserveAspectRatio="xMidYMax slice" so that on 2560x1440 (QHD 100%),
        FHD, Ultrawide, and mobile, buildings are NEVER stretched horizontally.
      */}
      <svg
        className="w-full h-full object-cover object-bottom"
        viewBox="0 0 2560 360"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradients matching Cyberpunk RED palette */}
          <linearGradient id="skylineGradBack" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2e0710" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#150308" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="skylineGradMid" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#540e1e" />
            <stop offset="45%" stopColor="#3d0a15" />
            <stop offset="100%" stopColor="#1a0409" />
          </linearGradient>

          <linearGradient id="skylineGradFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7a1228" />
            <stop offset="35%" stopColor="#570d1d" />
            <stop offset="100%" stopColor="#1c0409" />
          </linearGradient>
        </defs>

        {/* ================= LAYER 1: BACKGROUND SKYLINE (Distant spires & megaliths) ================= */}
        <g fill="url(#skylineGradBack)">
          {/* Section 0 - 640 */}
          <path d="M 60 360 L 60 140 L 64 80 L 66 80 L 70 140 L 70 360 Z" />
          <path d="M 64.5 80 L 64.5 25 L 65.5 25 L 65.5 80 Z" />
          <path d="M 120 360 L 120 110 L 145 110 L 145 150 L 175 150 L 175 360 Z" />
          <path d="M 280 360 L 280 100 L 285 45 L 287 45 L 292 100 L 292 360 Z" />
          <path d="M 450 360 L 450 90 L 480 90 L 480 360 Z" />
          <path d="M 464 90 L 464 40 L 466 40 L 466 90 Z" />

          {/* Section 640 - 1280 */}
          <path d="M 680 360 L 680 70 L 710 70 L 720 95 L 750 95 L 750 360 Z" />
          <path d="M 694 70 L 694 20 L 696 20 L 696 70 Z" />
          <path d="M 940 360 L 940 90 L 970 90 L 970 360 Z" />
          <path d="M 954 90 L 954 35 L 956 35 L 956 90 Z" />
          <path d="M 1120 360 L 1120 105 L 1150 105 L 1170 130 L 1170 360 Z" />

          {/* Section 1280 - 1920 (QHD Center-Right) */}
          <path d="M 1320 360 L 1320 80 L 1350 80 L 1350 360 Z" />
          <path d="M 1334 80 L 1334 30 L 1336 30 L 1336 80 Z" />
          <path d="M 1480 360 L 1480 100 L 1510 60 L 1520 60 L 1550 100 L 1550 360 Z" />
          <path d="M 1514 60 L 1514 15 L 1516 15 L 1516 60 Z" />
          <path d="M 1660 360 L 1660 120 L 1690 120 L 1710 150 L 1710 360 Z" />
          <path d="M 1820 360 L 1820 85 L 1850 85 L 1850 360 Z" />
          <path d="M 1834 85 L 1834 35 L 1836 35 L 1836 85 Z" />

          {/* Section 1920 - 2560 (QHD Far Right) */}
          <path d="M 2040 360 L 2040 105 L 2070 65 L 2080 65 L 2110 105 L 2110 360 Z" />
          <path d="M 2074 65 L 2074 20 L 2076 20 L 2076 65 Z" />
          <path d="M 2260 360 L 2260 90 L 2290 90 L 2320 120 L 2320 360 Z" />
          <path d="M 2450 360 L 2450 75 L 2480 75 L 2480 360 Z" />
          <path d="M 2464 75 L 2464 25 L 2466 25 L 2466 75 Z" />
        </g>

        {/* ================= LAYER 2: MIDGROUND SKYLINE (Stepped towers & complexes) ================= */}
        <g fill="url(#skylineGradMid)">
          {/* Section 0 - 640 */}
          <path d="M 0 360 L 0 180 L 25 180 L 35 200 L 35 360 Z" />
          <path d="M 30 360 L 30 160 L 55 160 L 55 190 L 80 190 L 80 360 Z" />
          <path d="M 85 360 L 85 170 L 115 170 L 125 195 L 140 195 L 140 360 Z" />
          <path d="M 160 360 L 160 130 L 190 160 L 210 160 L 210 360 Z" />
          <path d="M 230 360 L 230 180 L 260 180 L 275 210 L 275 360 Z" />
          <path d="M 340 360 L 340 140 L 375 140 L 375 180 L 400 180 L 400 360 Z" />
          <path d="M 357 140 L 357 100 L 359 100 L 359 140 Z" />
          <path d="M 520 360 L 520 155 L 550 155 L 550 200 L 580 200 L 580 360 Z" />
          <path d="M 590 360 L 590 135 L 615 115 L 640 135 L 640 360 Z" />

          {/* Section 640 - 1280 */}
          <path d="M 760 360 L 760 145 L 795 145 L 810 170 L 830 170 L 830 360 Z" />
          <path d="M 860 360 L 860 160 L 890 160 L 910 190 L 910 360 Z" />
          <path d="M 1020 360 L 1020 130 L 1050 160 L 1070 160 L 1070 360 Z" />
          <path d="M 1190 360 L 1190 150 L 1220 150 L 1240 185 L 1240 360 Z" />

          {/* Section 1280 - 1920 (QHD Center-Right) */}
          <path d="M 1260 360 L 1260 165 L 1290 165 L 1310 200 L 1310 360 Z" />
          <path d="M 1370 360 L 1370 140 L 1400 140 L 1410 170 L 1440 170 L 1440 360 Z" />
          <path d="M 1460 360 L 1460 150 L 1495 150 L 1520 180 L 1520 360 Z" />
          <path d="M 1570 360 L 1570 135 L 1605 110 L 1630 135 L 1630 360 Z" />
          <path d="M 1730 360 L 1730 145 L 1765 145 L 1785 175 L 1785 360 Z" />
          <path d="M 1890 360 L 1890 130 L 1920 160 L 1940 160 L 1940 360 Z" />

          {/* Section 1920 - 2560 (QHD Far Right) */}
          <path d="M 1970 360 L 1970 155 L 2000 155 L 2025 190 L 2025 360 Z" />
          <path d="M 2130 360 L 2130 140 L 2160 115 L 2190 140 L 2190 360 Z" />
          <path d="M 2220 360 L 2220 160 L 2250 160 L 2270 195 L 2270 360 Z" />
          <path d="M 2350 360 L 2350 135 L 2385 135 L 2410 165 L 2410 360 Z" />
          <path d="M 2490 360 L 2490 150 L 2520 150 L 2560 185 L 2560 360 Z" />
        </g>

        {/* ================= LAYER 3: FOREGROUND SKYLINE (Crisp, defined silhouettes) ================= */}
        <g fill="url(#skylineGradFront)">
          {/* Section 0 - 640 */}
          <path d="M 0 360 L 0 210 L 15 210 L 15 190 L 35 190 L 45 215 L 45 360 Z" />
          <path d="M 40 360 L 40 200 L 70 200 L 70 230 L 95 230 L 95 360 Z" />
          <path d="M 110 360 L 110 185 L 115 150 L 125 150 L 130 185 L 150 185 L 150 360 Z" />
          <path d="M 120 150 L 120 115 L 121 115 L 121 150 Z" />
          <path d="M 210 360 L 210 195 L 240 170 L 260 190 L 260 360 Z" />
          <path d="M 290 360 L 290 200 L 315 200 L 315 180 L 335 180 L 335 360 Z" />
          <path d="M 380 360 L 380 160 L 405 160 L 405 175 L 435 175 L 435 360 Z" />
          <path d="M 470 360 L 470 180 L 490 180 L 490 200 L 510 200 L 510 360 Z" />
          <path d="M 620 360 L 620 190 L 640 190 L 640 165 L 665 165 L 665 360 Z" />

          {/* Section 640 - 1280 (Main Center Skyscraper Cluster) */}
          <path d="M 690 360 L 690 160 L 700 135 L 725 135 L 735 160 L 745 160 L 745 360 Z" />
          <path d="M 712 135 L 712 95 L 714 95 L 714 135 Z" />
          <path d="M 780 360 L 780 175 L 805 175 L 820 195 L 845 195 L 845 360 Z" />
          <path d="M 880 360 L 880 180 L 905 180 L 920 210 L 920 360 Z" />
          <path d="M 960 360 L 960 165 L 975 145 L 995 145 L 1010 165 L 1010 360 Z" />
          <path d="M 985 145 L 985 105 L 986.5 105 L 986.5 145 Z" />
          <path d="M 1040 360 L 1040 190 L 1065 190 L 1085 220 L 1100 220 L 1100 360 Z" />
          <path d="M 1130 360 L 1130 170 L 1155 170 L 1175 195 L 1190 195 L 1190 360 Z" />
          <path d="M 1220 360 L 1220 185 L 1245 160 L 1265 185 L 1280 185 L 1280 360 Z" />

          {/* Section 1280 - 1920 (QHD Mid-Right Skyscraper Cluster) */}
          <path d="M 1340 360 L 1340 175 L 1365 175 L 1380 200 L 1405 200 L 1405 360 Z" />
          <path d="M 1430 360 L 1430 165 L 1450 140 L 1475 140 L 1490 165 L 1490 360 Z" />
          <path d="M 1462 140 L 1462 100 L 1464 100 L 1464 140 Z" />
          <path d="M 1530 360 L 1530 180 L 1555 180 L 1570 205 L 1595 205 L 1595 360 Z" />
          <path d="M 1640 360 L 1640 170 L 1665 145 L 1690 170 L 1705 170 L 1705 360 Z" />
          <path d="M 1750 360 L 1750 190 L 1775 190 L 1795 220 L 1815 220 L 1815 360 Z" />
          <path d="M 1845 360 L 1845 160 L 1860 135 L 1885 135 L 1900 160 L 1900 360 Z" />
          <path d="M 1872 135 L 1872 95 L 1874 95 L 1874 135 Z" />

          {/* Section 1920 - 2560 (QHD Far Right Cluster) */}
          <path d="M 1940 360 L 1940 185 L 1965 185 L 1985 210 L 2000 210 L 2000 360 Z" />
          <path d="M 2030 360 L 2030 170 L 2055 145 L 2080 170 L 2095 170 L 2095 360 Z" />
          <path d="M 2150 360 L 2150 195 L 2175 195 L 2195 220 L 2210 220 L 2210 360 Z" />
          <path d="M 2240 360 L 2240 165 L 2255 140 L 2280 140 L 2295 165 L 2295 360 Z" />
          <path d="M 2267 140 L 2267 100 L 2269 100 L 2269 140 Z" />
          <path d="M 2330 360 L 2330 180 L 2355 180 L 2375 205 L 2390 205 L 2390 360 Z" />
          <path d="M 2430 360 L 2430 170 L 2455 170 L 2475 200 L 2510 200 L 2510 360 Z" />
          <path d="M 2525 360 L 2525 185 L 2545 185 L 2560 205 L 2560 360 Z" />
        </g>

        {/* Illuminated vertical red slit window accents across the entire width */}
        <g fill="#ff003c" opacity="0.35">
          <rect x="122" y="195" width="2" height="40" />
          <rect x="238" y="215" width="2" height="30" />
          <rect x="395" y="190" width="2" height="45" />
          <rect x="402" y="200" width="2" height="35" />
          <rect x="710" y="175" width="2.5" height="50" />
          <rect x="718" y="185" width="2.5" height="40" />
          <rect x="980" y="180" width="2" height="45" />
          <rect x="1145" y="205" width="2" height="35" />
          <rect x="1455" y="180" width="2.5" height="45" />
          <rect x="1465" y="190" width="2" height="35" />
          <rect x="1660" y="190" width="2" height="40" />
          <rect x="1865" y="175" width="2.5" height="50" />
          <rect x="2050" y="190" width="2" height="40" />
          <rect x="2260" y="180" width="2.5" height="45" />
          <rect x="2445" y="195" width="2" height="35" />
        </g>

        {/* Top edge contour glow line along the rooftops across 2560 */}
        <path
          d="M 0 210 L 15 210 L 15 190 L 35 190 L 45 215 L 70 200 L 95 230 L 110 185 L 115 150 L 125 150 L 130 185 L 150 185 L 160 195 L 210 195 L 240 170 L 260 190 L 290 200 L 315 200 L 315 180 L 335 180 L 380 160 L 405 160 L 405 175 L 435 175 L 470 180 L 490 180 L 490 200 L 510 200 L 620 190 L 640 190 L 640 165 L 665 165 L 690 160 L 700 135 L 725 135 L 735 160 L 745 160 L 780 175 L 805 175 L 820 195 L 845 195 L 880 180 L 905 180 L 920 210 L 960 165 L 975 145 L 995 145 L 1010 165 L 1040 190 L 1065 190 L 1085 220 L 1100 220 L 1130 170 L 1155 170 L 1175 195 L 1190 195 L 1220 185 L 1245 160 L 1265 185 L 1280 185 L 1340 175 L 1365 175 L 1380 200 L 1405 200 L 1430 165 L 1450 140 L 1475 140 L 1490 165 L 1530 180 L 1555 180 L 1570 205 L 1595 205 L 1640 170 L 1665 145 L 1690 170 L 1705 170 L 1750 190 L 1775 190 L 1795 220 L 1815 220 L 1845 160 L 1860 135 L 1885 135 L 1900 160 L 1940 185 L 1965 185 L 1985 210 L 2000 210 L 2030 170 L 2055 145 L 2080 170 L 2095 170 L 2150 195 L 2175 195 L 2195 220 L 2210 220 L 2240 165 L 2255 140 L 2280 140 L 2295 165 L 2330 180 L 2355 180 L 2375 205 L 2390 205 L 2430 170 L 2455 170 L 2475 200 L 2510 200 L 2525 185 L 2545 185 L 2560 205"
          fill="none"
          stroke="#ff003c"
          strokeWidth="1.2"
          strokeOpacity="0.45"
        />

        {/* Beacon red warning lights on tall antennae */}
        <circle cx="65" cy="25" r="2" fill="#ff003c" className="animate-pulse" />
        <circle cx="286" cy="45" r="2" fill="#ff003c" className="animate-pulse" />
        <circle cx="465" cy="40" r="2" fill="#ff003c" className="animate-pulse" />
        <circle cx="695" cy="20" r="2.5" fill="#ff003c" className="animate-pulse" />
        <circle cx="955" cy="35" r="2" fill="#ff003c" className="animate-pulse" />
        <circle cx="1335" cy="30" r="2" fill="#ff003c" className="animate-pulse" />
        <circle cx="1463" cy="100" r="2.5" fill="#ff003c" className="animate-pulse" />
        <circle cx="1515" cy="15" r="2" fill="#ff003c" className="animate-pulse" />
        <circle cx="1835" cy="35" r="2" fill="#ff003c" className="animate-pulse" />
        <circle cx="1873" cy="95" r="2.5" fill="#ff003c" className="animate-pulse" />
        <circle cx="2075" cy="20" r="2" fill="#ff003c" className="animate-pulse" />
        <circle cx="2268" cy="100" r="2.5" fill="#ff003c" className="animate-pulse" />
        <circle cx="2465" cy="25" r="2" fill="#ff003c" className="animate-pulse" />
      </svg>

      {/* Dark floor baseline fog to blend seamlessly into screen bottom */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#0e0f13] via-[#0e0f13]/80 to-transparent" />
    </div>
  );
};
