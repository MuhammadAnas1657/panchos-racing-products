import React from 'react';
import { ShieldCheck, CheckCircle2, Phone } from 'lucide-react';
import { PRODUCTS } from '../data/productsData';
import { ProductCard } from '../components/ProductCard';
import { CLIENT_INFO } from '../data/siteData';

export const UsedPartsPage: React.FC = () => {
  const usedSampleProducts = PRODUCTS.slice(10, 18).map((p) => ({
    ...p,
    name: `[Inspected Pre-Owned] ${p.name}`,
    price: `$${(p.rawPrice * 0.65).toFixed(2)}`,
    rawPrice: p.rawPrice * 0.65,
    regularPrice: p.price,
    isOnSale: true,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Cinematic AI Banner Header */}
      <div className="relative rounded-2xl overflow-hidden border border-theme shadow-lg min-h-[260px] flex items-center p-8 sm:p-12 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/banners/parts-banner.jpg"
            alt="Track Inspected Pre-Owned Parts"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/30 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> Shop-Inspected Pre-Owned Inventory • Magnaflux Checked
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Certified Pre-Raced Parts
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            Every pre-owned part received at our Hanover, PA speed shop undergoes ultrasonic cleaning, crack checking, and dimensional verification. True track-ready components at budget-friendly pricing.
          </p>
        </div>
      </div>

      {/* Assurance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="clean-card p-5 space-y-2">
          <div className="text-blue-600 font-mono text-xs font-bold uppercase">1. Magnaflux & Crack Check</div>
          <p className="text-xs text-theme-secondary leading-relaxed">
            All structural suspension parts and torsion arms undergo crack testing before listing.
          </p>
        </div>
        <div className="clean-card p-5 space-y-2">
          <div className="text-emerald-600 font-mono text-xs font-bold uppercase">2. Honest Wear Grading</div>
          <p className="text-xs text-theme-secondary leading-relaxed">
            Transparent high-resolution photos and notes on runtime and cosmetic wear.
          </p>
        </div>
        <div className="clean-card p-5 space-y-2">
          <div className="text-amber-600 font-mono text-xs font-bold uppercase">3. Trade-Ins Accepted</div>
          <p className="text-xs text-theme-secondary leading-relaxed">
            Upgrading your late model or sprint car program? Bring surplus inventory to Hanover for store credit.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-theme-primary uppercase">
          Current Pre-Owned Listings
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {usedSampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Trade-in Callout */}
      <div className="clean-card p-6 rounded-xl border border-theme flex flex-col sm:flex-row items-center justify-between gap-4 bg-theme-elevated">
        <div>
          <h4 className="font-bold text-base text-theme-primary">
            Looking to sell surplus racing inventory?
          </h4>
          <p className="text-xs text-theme-secondary">
            Call Pancho's parts acquisition desk at {CLIENT_INFO.phone} or visit our Hanover shop.
          </p>
        </div>
        <a href={`tel:${CLIENT_INFO.phone}`} className="btn-racing-primary text-xs shrink-0 flex items-center gap-2">
          <Phone className="w-3.5 h-3.5" /> Call Parts Desk
        </a>
      </div>
    </div>
  );
};
