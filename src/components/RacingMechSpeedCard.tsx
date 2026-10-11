import React from 'react';
import { Flag, Zap, ArrowRight, Gauge } from 'lucide-react';

export interface MechSpeedCardItem {
  id: string;
  title: string;
  subtitle: string;
  carType: 'sprint' | 'late-model';
  rpm: string;
  spec: string;
  ctaText: string;
  colorHex: string;
  onClick?: () => void;
}

interface RacingMechSpeedCardProps {
  item: MechSpeedCardItem;
}

export const RacingMechSpeedCard: React.FC<RacingMechSpeedCardProps> = ({ item }) => {
  return (
    <div
      onClick={item.onClick}
      className="racing-mech-card group select-none"
      style={{ '--racing-blue': item.colorHex } as React.CSSProperties}
    >
      {/* Dynamic Glowing Neon Box Shadow */}
      <div className="boxshadow" />

      {/* Main Clipped Mechanical Chassis Body */}
      <div className="main">
        {/* Aerodynamic Top Triangle Hatch - Slides Up on Hover */}
        <div className="top-hatch" />

        {/* Sliding Mechanical Side Wing Panels - Slide Out on Hover */}
        <div className="left-panel side-panel" />
        <div className="right-panel side-panel" />

        {/* Center Title Badge - Revealed on Hover */}
        <div className="title-badge font-heading">
          {item.title}
        </div>

        {/* Speed Car Graphic - Bursts Forward in 3D on Hover */}
        <div className="speed-car-container">
          <div className="speed-car-img">
            {item.carType === 'sprint' ? (
              // 410 Sprint Car Graphic
              <svg viewBox="0 0 260 140" className="w-full h-auto drop-shadow-xl" fill="none">
                {/* Top Wing */}
                <polygon points="50,10 180,5 190,35 60,45" fill={item.colorHex} stroke="#ffffff" strokeWidth="2" />
                <text x="90" y="32" fill="#ffffff" fontFamily="monospace" fontWeight="900" fontSize="16">
                  410 SPRINT
                </text>
                {/* Wing Struts */}
                <line x1="95" y1="45" x2="110" y2="75" stroke="#94a3b8" strokeWidth="3" />
                <line x1="150" y1="40" x2="145" y2="75" stroke="#94a3b8" strokeWidth="3" />
                {/* Body & Cockpit */}
                <polygon points="105,75 160,75 170,95 95,95" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
                <circle cx="130" cy="85" r="8" fill="#f59e0b" />
                {/* Hood */}
                <polygon points="170,95 240,105 235,115 160,115" fill={item.colorHex} stroke="#ffffff" strokeWidth="1.5" />
                {/* Rear Giant Wheel */}
                <circle cx="85" cy="110" r="26" fill="#111827" stroke="#374151" strokeWidth="4" />
                <circle cx="85" cy="110" r="12" fill="#d1d5db" />
                {/* Front Wheel */}
                <circle cx="230" cy="115" r="18" fill="#111827" stroke="#374151" strokeWidth="3" />
                <circle cx="230" cy="115" r="8" fill="#d1d5db" />
              </svg>
            ) : (
              // Rocket Chassis Dirt Late Model Graphic
              <svg viewBox="0 0 260 140" className="w-full h-auto drop-shadow-xl" fill="none">
                {/* Wedge Roof & Spoiler */}
                <polygon points="30,75 75,40 160,40 180,75" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
                <polygon points="15,70 30,70 30,60 15,60" fill={item.colorHex} />
                <text x="85" y="60" fill="#ffffff" fontFamily="monospace" fontWeight="900" fontSize="13">
                  ROCKET XR2
                </text>
                {/* Wedge Body Side Panel */}
                <polygon points="15,75 245,85 240,120 15,115" fill={item.colorHex} stroke="#ffffff" strokeWidth="2" />
                {/* Number Badge */}
                <text x="120" y="105" fill="#ffffff" fontFamily="sans-serif" fontWeight="900" fontSize="24">
                  #77
                </text>
                {/* Rear Wheel */}
                <circle cx="65" cy="115" r="22" fill="#111827" stroke="#374151" strokeWidth="4" />
                <circle cx="65" cy="115" r="10" fill="#d1d5db" />
                {/* Front Wheel */}
                <circle cx="205" cy="118" r="20" fill="#111827" stroke="#374151" strokeWidth="4" />
                <circle cx="205" cy="118" r="9" fill="#d1d5db" />
              </svg>
            )}
          </div>
          <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest mt-1">
            {item.subtitle}
          </span>
        </div>

        {/* Sliding Mechanical Action Buttons */}
        <div className="button-container">
          <button className="racing-btn" type="button">
            <Gauge className="w-3.5 h-3.5 text-amber-400" />
            <span>{item.rpm}</span>
          </button>
          <button className="racing-btn" type="button">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>{item.spec}</span>
          </button>
          <button className="racing-btn bg-blue-600 border-blue-400" type="button">
            <span>{item.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
