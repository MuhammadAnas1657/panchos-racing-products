import React, { useState } from 'react';
import { Compass, CheckCircle2, ShieldCheck, Wrench, Download, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/productsData';

export const RocketTechPage: React.FC = () => {
  const { addToCart } = useCart();
  const [chassis, setChassis] = useState<'xr2' | 'xr1' | 'sprint'>('xr2');
  const [position, setPosition] = useState<'rf-tierod' | 'lf-upper' | 'rr-bottom' | 'lr-4bar'>('rf-tierod');
  const [trackCondition, setTrackCondition] = useState<'slick' | 'heavy' | 'rough'>('slick');

  const getRodSpecs = () => {
    if (chassis === 'xr2') {
      if (position === 'rf-tierod') return { length: '22.75" Center-to-Center', tube: '1.250" x .095 4130 Chrome-Moly', ends: '3/4" RH & LH Rod Ends', sku: 'PRP-RR-XR2-RF', price: 43.00, title: 'Rocket XR2 RF Tie Rod Assembly' };
      if (position === 'lf-upper') return { length: '19.50" Center-to-Center', tube: '1.125" Aluminum Hex', ends: '5/8" x 3/4" Heim', sku: 'PRP-RR-XR2-LFU', price: 38.50, title: 'Rocket XR2 LF Upper Control Rod' };
      if (position === 'rr-bottom') return { length: '24.00" Center-to-Center', tube: '1.250" Heavy Wall Swedged', ends: '3/4" Moly Heims', sku: 'PRP-RR-XR2-RR', price: 48.00, title: 'Rocket XR2 RR Bottom 4-Bar Rod' };
      return { length: '23.25" Center-to-Center', tube: '1.250" Swedged Tube', ends: '3/4" RH/LH', sku: 'PRP-RR-XR2-LR', price: 46.00, title: 'Rocket XR2 LR Traction Rod' };
    } else if (chassis === 'xr1') {
      return { length: '22.00" Center-to-Center', tube: '1.125" Swedged Steel', ends: '3/4" Teflon Lined', sku: 'PRP-RR-XR1-STD', price: 39.00, title: 'Rocket XR1 Standard Radius Rod' };
    } else {
      return { length: '21.00" Center-to-Center', tube: '1.000" Aluminum Swedged', ends: '5/8" Titanium/Moly', sku: 'PRP-RR-SP-21', price: 34.00, title: 'Sprint Car 21" Swedged Radius Rod' };
    }
  };

  const specs = getRodSpecs();

  const handleAddRodToCart = () => {
    const matching = PRODUCTS.find((p) => p.name.toLowerCase().includes('tie rod') || p.name.toLowerCase().includes('radius')) || PRODUCTS[0];
    addToCart(matching, 1, `${chassis.toUpperCase()} - ${specs.length}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Cinematic AI Banner Header */}
      <div className="relative rounded-2xl overflow-hidden border border-theme shadow-lg min-h-[260px] flex items-center p-8 sm:p-12 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/banners/rocket-tech-banner.jpg"
            alt="Rocket Chassis Jig and Engineering"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/30 backdrop-blur-md border border-blue-400/40 text-blue-300 text-xs font-mono font-bold">
            <Compass className="w-3.5 h-3.5" /> Technical Setup Section • Factory Rocket Sizing
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Rocket Chassis Tech & Sizing Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            Eliminate post-order sizing phone calls. Configure your suspension lengths, torque values, and geometry settings using our verified Rocket Chassis factory specifications.
          </p>
        </div>
      </div>

      {/* Sizing Calculator */}
      <div className="clean-card p-8 rounded-2xl border border-theme bg-theme-surface">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider block">
                Suspension Geometry Configurator
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-theme-primary mt-1">
                Configure Your Assembly
              </h2>
            </div>

            {/* Chassis Platform */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-theme-primary">1. Chassis Platform</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'xr2', label: 'Rocket XR2' },
                  { id: 'xr1', label: 'Rocket XR1 / 1.2' },
                  { id: 'sprint', label: 'Sprint Car (All)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setChassis(item.id as any)}
                    className={`p-2.5 rounded-lg text-xs font-semibold uppercase transition-all border text-center cursor-pointer ${
                      chassis === item.id
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs font-bold'
                        : 'bg-theme-surface border-theme text-theme-secondary hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Position */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-theme-primary">2. Suspension Location</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'rf-tierod', label: 'RF Steering Tie Rod' },
                  { id: 'lf-upper', label: 'LF Upper Control Rod' },
                  { id: 'rr-bottom', label: 'RR Bottom 4-Bar' },
                  { id: 'lr-4bar', label: 'LR Traction Rod' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPosition(item.id as any)}
                    className={`p-2.5 rounded-lg text-xs font-semibold uppercase transition-all border text-center cursor-pointer ${
                      position === item.id
                        ? 'bg-blue-600 border-blue-600 text-white shadow-xs font-bold'
                        : 'bg-theme-surface border-theme text-theme-secondary hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Track condition */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-theme-primary">3. Target Track Surface</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'slick', label: 'Dry Slick' },
                  { id: 'heavy', label: 'Heavy Tack' },
                  { id: 'rough', label: 'Cushion / Rough' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTrackCondition(item.id as any)}
                    className={`p-2 rounded-lg text-xs transition-all border text-center cursor-pointer ${
                      trackCondition === item.id
                        ? 'bg-blue-50 border-blue-600 text-blue-700 font-bold'
                        : 'bg-theme-surface border-theme text-theme-secondary'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card (6 cols) */}
          <div className="lg:col-span-6 clean-card p-6 sm:p-8 rounded-xl border border-blue-200 bg-blue-50/30 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
                <span className="text-xs font-mono text-blue-700 font-bold uppercase">
                  Verified Blueprint Output
                </span>
                <span className="badge-clean badge-verified">
                  Precision Fit
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-theme-primary">
                  {specs.title}
                </h3>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 font-mono mt-1">
                  {specs.length}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-blue-200/60 text-xs font-mono">
                <div>
                  <span className="text-theme-muted block text-[10px]">TUBE MATERIAL:</span>
                  <span className="text-theme-primary font-bold">{specs.tube}</span>
                </div>
                <div>
                  <span className="text-theme-muted block text-[10px]">ROD END SPEC:</span>
                  <span className="text-theme-primary font-bold">{specs.ends}</span>
                </div>
                <div>
                  <span className="text-theme-muted block text-[10px]">FACTORY SKU:</span>
                  <span className="text-blue-600 font-bold">{specs.sku}</span>
                </div>
                <div>
                  <span className="text-theme-muted block text-[10px]">PRICE:</span>
                  <span className="text-emerald-600 font-bold text-sm">${specs.price.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-blue-200/60 space-y-2">
              <button
                type="button"
                onClick={handleAddRodToCart}
                className="w-full btn-racing-primary py-3 text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add Configured Rod to Basket (${specs.price.toFixed(2)})</span>
              </button>
              <p className="text-[10px] text-center text-theme-muted font-mono">
                No phone call needed. Cut and assembled to exact Rocket factory lengths in Hanover, PA.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Torque & Setup Reference Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="clean-card p-6 space-y-4">
          <h4 className="font-bold text-base text-theme-primary uppercase flex items-center gap-2">
            <Wrench className="w-4 h-4 text-blue-600" /> Rocket XR2 Fastener Torque Specs
          </h4>
          <div className="divide-y divide-theme text-xs font-mono text-theme-secondary">
            <div className="py-2 flex justify-between">
              <span>Birdcage Clamp Bolts (Grade 8)</span>
              <span className="text-theme-primary font-bold">45 ft-lbs</span>
            </div>
            <div className="py-2 flex justify-between">
              <span>Upper Control Arm Cross-Shaft</span>
              <span className="text-theme-primary font-bold">65 ft-lbs</span>
            </div>
            <div className="py-2 flex justify-between">
              <span>Lower Ball Joint Castle Nut</span>
              <span className="text-theme-primary font-bold">85 ft-lbs (Pinned)</span>
            </div>
            <div className="py-2 flex justify-between">
              <span>Spindle Steering Arm Bolts</span>
              <span className="text-theme-primary font-bold">55 ft-lbs</span>
            </div>
          </div>
        </div>

        <div className="clean-card p-6 space-y-4">
          <h4 className="font-bold text-base text-theme-primary uppercase flex items-center gap-2">
            <Download className="w-4 h-4 text-blue-600" /> Downloadable Setup Sheets
          </h4>
          <div className="space-y-2 text-xs font-mono">
            {[
              { title: 'Rocket XR2 Dry Slick Base Setup Sheet (PDF)', size: '1.4 MB' },
              { title: '4-Bar Suspension Angle Geometry Guide (PDF)', size: '2.1 MB' },
              { title: 'KSE Power Steering Service & Bleed Manual (PDF)', size: '890 KB' },
            ].map((doc, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-theme-elevated border border-theme flex items-center justify-between text-theme-primary hover:border-blue-600 cursor-pointer transition-colors"
              >
                <span>{doc.title}</span>
                <span className="text-blue-600 text-[11px] font-bold">{doc.size}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
