import React from 'react';
import { Flag, Trophy, Award, Calendar, ShieldCheck, MapPin } from 'lucide-react';
import { CLIENT_INFO } from '../data/siteData';

export const RaceTeamPage: React.FC = () => {
  const schedule = [
    { track: 'Lincoln Speedway (PA)', date: 'Saturday Nights', series: '410 Sprint Cars & Super Late Models' },
    { track: 'Williams Grove Speedway (PA)', date: 'Friday Nights', series: 'All Star Circuit of Champions' },
    { track: 'Port Royal Speedway (PA)', date: 'Speedway Schedule', series: 'Lucas Oil Late Model Dirt Series' },
    { track: 'Hagerstown Speedway (MD)', date: 'Select Weekends', series: 'Super Late Model Specials' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Banner */}
      <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-blue-900/50 bg-gradient-to-r from-blue-950/80 via-[#0a1224] to-red-950/40">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-rose-300 text-xs font-mono font-bold border border-rose-500/40">
            <Trophy className="w-3.5 h-3.5" /> COMPETITION HERITAGE
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight">
            Pancho's Racing Team
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm font-body leading-relaxed">
            We don't just sell parts—we test them under full race pressure. Pancho's competition team competes across the premier dirt tracks of Pennsylvania and Maryland, proving components on real clay.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-heading text-xl font-bold text-white uppercase flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" /> Track Testing Philosophy
          </h3>
          <p className="text-xs text-slate-300 font-body leading-relaxed">
            Every shock valve curve, tie rod material, and steering fluid we recommend has logged laps in real competition. When you call Pancho's for setup advice, you're talking to racers who understand track grip transitions from heat races to the A-main feature.
          </p>
          <div className="pt-2 flex items-center gap-2 text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Track-Proven Recommendations</span>
          </div>
        </div>

        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="font-heading text-xl font-bold text-white uppercase flex items-center gap-2">
            <Calendar className="w-5 h-5 text-cyan-400" /> 2026 Trackside Circuit
          </h3>
          <div className="divide-y divide-slate-800 text-xs font-mono text-slate-300">
            {schedule.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-start justify-between gap-4">
                <div>
                  <div className="text-white font-bold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" /> {item.track}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.series}</div>
                </div>
                <span className="text-cyan-400 text-right shrink-0">{item.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
