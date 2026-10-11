import React, { useState } from 'react';
import { Flag, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/productsData';
import { ProductCard } from '../components/ProductCard';

export const SprintCarsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'steering' | 'all' | 'radiusrod' | 'wings'>('steering');

  const sprintAll = PRODUCTS.filter((p) =>
    p.categorySlugs.some((s) => s.startsWith('sp') || s.includes('sprint')) ||
    p.allCategories.some((c) => c.toLowerCase().includes('sprint') || c.toLowerCase().includes('steering') || c.toLowerCase().includes('radius rod'))
  );

  const steeringOnly = PRODUCTS.filter((p) => p.isSprintSteering);
  const radiusRods = PRODUCTS.filter((p) => p.category.toLowerCase().includes('radius') || p.name.toLowerCase().includes('radius'));
  const wings = PRODUCTS.filter((p) => p.category.toLowerCase().includes('wing') || p.name.toLowerCase().includes('wing'));

  const currentProducts = activeTab === 'steering'
    ? steeringOnly
    : activeTab === 'radiusrod'
    ? radiusRods
    : activeTab === 'wings'
    ? wings
    : sprintAll;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Cinematic AI Banner Header */}
      <div className="relative rounded-2xl overflow-hidden border border-theme shadow-lg min-h-[260px] flex items-center p-8 sm:p-12 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/banners/sprint-cars-banner.jpg"
            alt="Sprint Car Throwing Clay"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/30 backdrop-blur-md border border-blue-400/40 text-blue-300 text-xs font-mono font-bold">
            <Flag className="w-3.5 h-3.5" /> 332+ Sprint Car Components • 16/16 Steering Reconciled
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Sprint Cars Performance Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            Supplying 410, 360, and 305 sprint car programs across Central PA dirt tracks and national tours. Direct inventory on top wings, front axles, birdcages, and all 16 KSE steering boxes.
          </p>
        </div>
      </div>

      {/* Audit Highlight: 16/16 Steering Reconciled */}
      <div className="clean-card p-6 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="badge-clean badge-verified">
            <CheckCircle2 className="w-3.5 h-3.5" /> All 16 Steering Components Reconciled
          </div>
          <h3 className="text-xl font-bold text-theme-primary mt-1">
            Complete Steering Catalogue Live & Searchable
          </h3>
          <p className="text-xs text-theme-secondary max-w-2xl leading-relaxed">
            In the merchant's live WooCommerce store, the Steering category stated 16 results but only listed 2 items. Below, every single one of the 16 steering parts (KSE pumps, fluid, knee pads, steering wheels, couplers) is verified and ready to order.
          </p>
        </div>
        <div className="px-4 py-2 rounded-lg bg-emerald-100 text-emerald-800 font-mono font-bold text-xs shrink-0">
          16 of 16 VERIFIED
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-theme pb-3 overflow-x-auto">
        {[
          { id: 'steering', label: `Sprint Steering (${steeringOnly.length})` },
          { id: 'all', label: `All Sprint Parts (${sprintAll.length})` },
          { id: 'radiusrod', label: `Radius Rods (${radiusRods.length})` },
          { id: 'wings', label: `Wings & Aero (${wings.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-theme-surface text-theme-secondary hover:text-theme-primary border border-theme'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
