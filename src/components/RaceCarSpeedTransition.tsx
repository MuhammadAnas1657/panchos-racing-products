import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag, Flame, Zap, Gauge, Sparkles } from 'lucide-react';

interface RaceCarSpeedTransitionProps {
  triggerKey: string | number;
  onComplete?: () => void;
}

export const RaceCarSpeedTransition: React.FC<RaceCarSpeedTransitionProps> = ({
  triggerKey,
  onComplete,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playEngineRoarSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Authentic 410 Sprint Car Doppler sound: low idle rumble -> high RPM scream -> Doppler pass
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(420, ctx.currentTime + 1.1);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 2.2);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2800, ctx.currentTime + 1.1);
      filter.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 2.2);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 1.0);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.3);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.35);
    } catch {
      // Audio playback suspended or disallowed by browser policy; fails gracefully
    }
  };

  useEffect(() => {
    // Play full speed race car animation on deliberate trigger (Speed Launch button)
    if (!triggerKey || triggerKey <= 0) {
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    playEngineRoarSound();
    const timer = setTimeout(() => {
      setIsPlaying(false);
        if (onComplete) onComplete();
      }, 2700);

    return () => clearTimeout(timer);
  }, [triggerKey]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPlaying) {
        setIsPlaying(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={() => setIsPlaying(false)}
          className="fixed inset-0 z-[999999] overflow-hidden flex items-center justify-center select-none cursor-pointer"
        >
          {/* Track speed lines backdrop */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[4px]" />

          {/* Speed blur horizontal streaks */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '250%', opacity: [0, 0.95, 0] }}
                transition={{
                  duration: 1.2,
                  delay: (i * 0.08) % 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                style={{
                  top: `${12 + i * 5.8}%`,
                  width: `${300 + (i % 4) * 160}px`,
                }}
              />
            ))}
          </div>

          {/* Click to skip badge */}
          <div className="absolute top-6 right-6 z-30 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-[11px] font-mono font-bold tracking-wider backdrop-blur-md transition-colors">
            Click anywhere or press ESC to skip ✕
          </div>

          {/* Center Race HUD Flash: GREEN FLAG RACING */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: -20 }}
            animate={{ scale: [0.85, 1.08, 1], opacity: [0, 1, 0.95] }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-10 text-center font-mono pointer-events-none"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/30 border border-emerald-400/60 text-emerald-300 text-xs font-black uppercase tracking-widest backdrop-blur-md shadow-xl mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <Flag className="w-4 h-4 fill-emerald-400 text-emerald-950" />
              <span>GREEN FLAG • 410 SPRINT CAR LAUNCH</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black text-white italic tracking-tighter uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
              PANCHO'S RACING <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">SPEEDWAY</span>
            </h2>

            <div className="flex items-center justify-center gap-3 text-xs text-slate-300 mt-2 font-bold tracking-wider">
              <span className="flex items-center gap-1 text-amber-400">
                <Gauge className="w-3.5 h-3.5" /> 9,200 RPM
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-cyan-400">
                <Zap className="w-3.5 h-3.5" /> 900+ HP 410 SPRINT
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-red-400">
                <Flame className="w-3.5 h-3.5" /> ROCKET CHASSIS
              </span>
            </div>
          </motion.div>

          {/* THE SPEEDING RACE CAR: Zooms across screen from left to right at full throttle, clearly visible */}
          <motion.div
            initial={{ x: '-110vw', y: '6vh', scale: 0.85, rotate: -2 }}
            animate={{
              x: '115vw',
              y: '-2vh',
              scale: [0.85, 1.25, 1.15],
              rotate: [-2, 1, -1],
            }}
            transition={{
              duration: 2.3,
              ease: [0.35, 0.05, 0.25, 1],
              delay: 0.1,
            }}
            className="absolute z-20 flex items-center pointer-events-none"
          >
            {/* Nitro flame & clay roost trail behind car */}
            <div className="relative flex items-center">
              {/* Roost clay particles */}
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0, 0.9, 0], scale: [0.8, 1.6, 2.2] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-48 h-16 bg-gradient-to-r from-transparent via-amber-800/60 to-amber-900/40 rounded-full blur-md -mr-10"
              />

              {/* Blue Nitro Jet Fire */}
              <div className="w-32 h-6 bg-gradient-to-l from-cyan-400 via-blue-600 to-transparent rounded-full blur-xs -mr-6 animate-pulse" />

              {/* Winged 410 Sprint Car Silhouette & Graphics */}
              <div className="relative w-80 sm:w-96 drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
                <svg
                  viewBox="0 0 600 240"
                  className="w-full h-auto"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Top Wing (Airfoil with Side Boards) */}
                  <polygon points="120,20 380,10 400,60 140,75" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
                  <polygon points="110,15 150,75 120,78 95,20" fill="#0f172a" />
                  <text x="210" y="52" fill="#ffffff" fontFamily="monospace" fontWeight="900" fontSize="32">
                    #77 PANCHO'S
                  </text>

                  {/* Top Wing Struts */}
                  <line x1="220" y1="75" x2="250" y2="120" stroke="#cbd5e1" strokeWidth="5" />
                  <line x1="320" y1="70" x2="310" y2="120" stroke="#cbd5e1" strokeWidth="5" />

                  {/* Roll Cage & Cockpit */}
                  <path d="M 230,120 L 320,120 L 340,150 L 210,150 Z" fill="#090d16" stroke="#94a3b8" strokeWidth="4" />
                  {/* Driver Helmet */}
                  <circle cx="280" cy="135" r="14" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />

                  {/* Hood & Engine Headers */}
                  <polygon points="340,150 490,165 480,185 330,185" fill="#1e40af" stroke="#ffffff" strokeWidth="2" />
                  {/* Exhaust Header Pipes with glowing orange fire */}
                  <path d="M 360,170 Q 380,160 400,175" stroke="#f97316" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 380,170 Q 400,160 420,175" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />

                  {/* Front Nose Wing */}
                  <polygon points="480,150 560,155 550,175 470,170" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />

                  {/* Rear Giant Hoosier Tire */}
                  <ellipse cx="180" cy="180" rx="46" ry="46" fill="#111827" stroke="#374151" strokeWidth="6" />
                  <circle cx="180" cy="180" r="22" fill="#d1d5db" stroke="#000000" strokeWidth="3" />
                  <text x="172" y="186" fill="#111827" fontFamily="sans-serif" fontWeight="bold" fontSize="12">KSE</text>

                  {/* Front Hoosier Tire */}
                  <ellipse cx="500" cy="190" rx="32" ry="32" fill="#111827" stroke="#374151" strokeWidth="5" />
                  <circle cx="500" cy="190" r="14" fill="#d1d5db" stroke="#000000" strokeWidth="2" />

                  {/* Aerodynamic speed motion lines */}
                  <line x1="80" y1="130" x2="30" y2="130" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
                  <line x1="60" y1="150" x2="10" y2="150" stroke="#f97316" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
                  <line x1="90" y1="180" x2="20" y2="180" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" opacity="0.9" />
                </svg>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
