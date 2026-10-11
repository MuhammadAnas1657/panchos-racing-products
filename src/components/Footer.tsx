import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Wrench,
  Fuel,
  Flag,
  Sparkles,
} from 'lucide-react';
import { CLIENT_INFO } from '../data/siteData';
import { useCart } from '../context/CartContext';

export const Footer: React.FC = () => {
  const { setActivePage } = useCart();

  const handleNav = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-theme-surface border-t-2 border-theme pt-16 pb-12 text-theme-secondary text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* TOP BANNER: OFFICIAL SUNOCO RACE FUELS & FACTORY DEALERSHIP PRESTIGE */}
        <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-theme-elevated to-blue-500/10 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-500 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Fuel className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-1">
                <Sparkles className="w-3 h-3" /> Official Sunoco Race Fuels Stockist • Hanover, PA
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-theme-primary font-heading tracking-tight">
                Now Stocking Authentic Sunoco Competition Fuels
              </h3>
              <p className="text-xs text-theme-secondary mt-0.5 max-w-xl">
                We are proud to carry official Sunoco Race Fuels at our speed shop facility in Hanover, PA. Pick up before race weekend or pre-order trackside dispatch.
              </p>
            </div>
          </div>

          {/* Sunoco Fuel Grade Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { grade: 'Methanol', octane: 'Pure Spec' },
              { grade: 'Supreme 112', octane: '112 Octane' },
              { grade: 'Standard 110', octane: '110 Octane' },
              { grade: 'Optima', octane: 'Unleaded' },
              { grade: 'E85-R', octane: 'Ethanol Race' },
            ].map((f, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg border border-theme bg-theme-surface shadow-2xs font-mono text-center"
              >
                <div className="text-[11px] font-bold text-theme-primary">{f.grade}</div>
                <div className="text-[9px] text-amber-600 dark:text-amber-400 font-semibold">{f.octane}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 5-COLUMN ROYAL DEALERSHIP DIRECTORY */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-theme">
          {/* Col 1: Royal Dealership Seal & Heritage */}
          <div className="space-y-4 lg:col-span-1">
            <div
              onClick={() => handleNav('home')}
              className="cursor-pointer inline-block group"
            >
              <img
                src={CLIENT_INFO.logo}
                alt="Pancho's Racing Products"
                className="h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-sm"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-royal font-bold uppercase tracking-wider text-theme-accent block">
                Official Factory Dealer
              </span>
              <p className="text-xs text-theme-secondary leading-relaxed">
                Central Pennsylvania’s premier dirt racing parts flagship since 1993. Authorized factory dealer for Mark Richards' Rocket Chassis and KSE Racing.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-2 text-[11px] font-mono font-semibold text-emerald-600">
              <ShieldCheck className="w-4 h-4" />
              <span>Real-Time In-Stock Transparency</span>
            </div>
          </div>

          {/* Col 2: Dirt Late Model Division */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-theme-primary uppercase tracking-wider text-xs font-mono flex items-center gap-1.5 border-b border-theme pb-2">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>Dirt Late Models</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Rocket XR1 & XR2 Chassis', page: 'late-models' },
                { label: '4-Bar Suspension Links & Rods', page: 'late-models' },
                { label: 'Wilwood Brakes & Calipers', page: 'shop' },
                { label: 'Dirt Late Model Body Panels', page: 'late-models' },
                { label: 'Front Spindles & Brackets', page: 'shop' },
                { label: 'Radius Rod Sizing Matrix', page: 'rocket-tech' },
              ].map((l, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNav(l.page)}
                    className="hover:text-theme-accent transition-colors cursor-pointer text-left w-full hover:translate-x-0.5 transition-transform"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Sprint Car Performance Hub */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-theme-primary uppercase tracking-wider text-xs font-mono flex items-center gap-1.5 border-b border-theme pb-2">
              <Flag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sprint Car Division</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'KSE Steering Boxes (16/16)', page: 'sprint-cars', badge: 'Reconciled' },
                { label: 'Aero Wings & Top Wings', page: 'sprint-cars' },
                { label: 'Sprint Front Axles & Hubs', page: 'sprint-cars' },
                { label: 'Billet Birdcages & Torsion Arms', page: 'sprint-cars' },
                { label: 'BMRS Hoses & Fittings', page: 'shop' },
                { label: 'Inspected Used Sprint Parts', page: 'used-parts' },
              ].map((l, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNav(l.page)}
                    className="hover:text-theme-accent transition-colors cursor-pointer text-left w-full flex items-center justify-between hover:translate-x-0.5 transition-transform"
                  >
                    <span>{l.label}</span>
                    {l.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">
                        {l.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Shop & Dyno Workshops */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-theme-primary uppercase tracking-wider text-xs font-mono flex items-center gap-1.5 border-b border-theme pb-2">
              <Wrench className="w-3.5 h-3.5 text-amber-500" />
              <span>Shop & Services</span>
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Trailers & Motorhomes For Sale', page: 'trailers' },
                { label: 'Roehrig Shock Dyno & Revalving', page: 'services' },
                { label: 'Hauler, RV & Trailer Repair', page: 'services' },
                { label: 'Rocket Chassis Technical Section', page: 'rocket-tech' },
                { label: "Pancho's Racing Team Schedule", page: 'race-team' },
                { label: 'About Hanover Speed Shop', page: 'about-us' },
                { label: 'Refund & Returns Policy', page: 'return-policy' },
                { label: 'Driver Saved Wishlist', page: 'wishlist' },
              ].map((l, i) => (
                <li key={i}>
                  <button
                    onClick={() => handleNav(l.page)}
                    className="hover:text-theme-accent transition-colors cursor-pointer text-left w-full hover:translate-x-0.5 transition-transform"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Hanover HQ, Hours & Pit Hotline */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-theme-primary uppercase tracking-wider text-xs font-mono flex items-center gap-1.5 border-b border-theme pb-2">
              <MapPin className="w-3.5 h-3.5 text-theme-accent" />
              <span>Hanover HQ & Contact</span>
            </h4>
            <div className="space-y-2.5 font-mono text-xs">
              <div>
                <span className="text-theme-muted text-[10px] uppercase block">Physical Facility</span>
                <span className="text-theme-primary font-bold">{CLIENT_INFO.address}</span>
              </div>
              <div>
                <span className="text-theme-muted text-[10px] uppercase block">Trackside Hotline</span>
                <a
                  href={`tel:${CLIENT_INFO.phone}`}
                  className="text-theme-accent font-extrabold text-sm hover:underline block"
                >
                  {CLIENT_INFO.phone}
                </a>
              </div>
              <div>
                <span className="text-theme-muted text-[10px] uppercase block">Direct Email</span>
                <a
                  href={`mailto:${CLIENT_INFO.email}`}
                  className="text-theme-secondary hover:text-theme-accent transition-colors truncate block"
                >
                  {CLIENT_INFO.email}
                </a>
              </div>
              <div>
                <span className="text-theme-muted text-[10px] uppercase block">Facility Hours</span>
                <span className="text-theme-secondary text-[11px] leading-tight block">
                  {CLIENT_INFO.hours}
                </span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => handleNav('contacts')}
                  className="text-[11px] font-bold text-theme-accent hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Contact & Dispatch Page</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM: MANAGED AND DEVELOPED BY ATARIONSOLUTIONS */}
        <div className="pt-8 border-t border-theme flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-theme-muted">
          <div>
            © 1993 - 2026 Pancho's Racing Products. All rights reserved. • Hanover, PA Flagship
          </div>
          <div className="text-theme-secondary font-medium tracking-wide">
            managed and developed by atarionsolutions
          </div>
        </div>
      </div>
    </footer>
  );
};
