import React from 'react';
import { Flag, Wrench, Award, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CLIENT_INFO } from '../data/siteData';

export const MarqueeTicker: React.FC = () => {
  const items = [
    { icon: Flag, text: 'SPRINT CAR SPECIALISTS' },
    { icon: Award, text: 'FACTORY ROCKET CHASSIS DEALER' },
    { icon: CheckCircle2, text: 'ALL 16 SPRINT STEERING PARTS RECONCILED' },
    { icon: Wrench, text: 'ROEHRIG SHOCK DYNO & HAULER SERVICE' },
    { icon: Phone, text: `HANOVER, PA • ${CLIENT_INFO.phone}` },
    { icon: ShieldCheck, text: 'SAME-DAY DISPATCH AVAILABLE' },
  ];

  return (
    <div className="w-full overflow-hidden bg-theme-elevated border-b border-theme py-2 text-xs font-mono text-theme-secondary">
      <div className="flex smooth-ticker gap-10 tracking-wider uppercase font-semibold">
        {[...items, ...items, ...items].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-2 shrink-0">
              <Icon className="w-3.5 h-3.5 text-blue-600" />
              <span>{item.text}</span>
              <span className="text-slate-300 ml-2">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
