import React from 'react';
import { C } from '../utils/constants';

export default function Logo({ dark = false, size = 1 }) {
  const textColor = dark ? C.white : C.greenDeep;
  const subColor = dark ? "#8a9ba3" : C.gray500;
  const capStroke = dark ? C.gold : C.goldDark;

  return (
    <svg width={170 * size} height={46 * size} viewBox="0 0 170 46" fill="none">
      <text x="0" y="22" fontFamily="'Lora', Georgia, serif" fontWeight="700" fontSize="20" fill={textColor}>
        Smart
      </text>
      <g transform="translate(56, 4)">
        <path d="M12 2L2 7.5L12 13L22 7.5L12 2Z" fill={C.gold} stroke={C.goldDark} strokeWidth="0.5" />
        <path d="M5 9.5V15C5 15 8 17.5 12 17.5C16 17.5 19 15 19 15V9.5" stroke={capStroke} strokeWidth="1.2" fill="none" />
        <line x1="20" y1="7.5" x2="20" y2="16" stroke={capStroke} strokeWidth="1" />
        <circle cx="20" cy="16.5" r="1" fill={capStroke} />
      </g>
      <text x="82" y="22" fontFamily="'Lora', Georgia, serif" fontWeight="700" fontSize="20" fill={textColor}>
        Way
      </text>
      <text x="28" y="38" fontFamily="'Outfit', sans-serif" fontWeight="500" fontSize="10.5" fill={subColor} letterSpacing="0.08em">
        learning center
      </text>
    </svg>
  );
}
