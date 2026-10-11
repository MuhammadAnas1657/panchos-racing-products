import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PRODUCTS } from '../data/productsData';
import { ProductCard } from '../components/ProductCard';

export const LateModelsPage: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'rocket' | 'suspension'>('all');

  const lateModelProducts = PRODUCTS.filter((p) =>
    p.categorySlugs.some((s) => s.startsWith('lm') || s.includes('latemodel') || s.includes('rocket')) ||
    p.allCategories.some((c) => c.toLowerCase().includes('late') || c.toLowerCase().includes('rocket'))
  );

  const rocketOnly = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes('rocket') ||
    p.category.toLowerCase().includes('rocket') ||
    p.name.toLowerCase().includes('xr2')
  );

  const suspensionOnly = PRODUCTS.filter((p) =>
    p.category.toLowerCase().includes('suspension') ||
    p.name.toLowerCase().includes('tie rod') ||
    p.name.toLowerCase().includes('rod')
  );

  const displayed = filterType === 'rocket'
    ? rocketOnly
    : filterType === 'suspension'
    ? suspensionOnly
    : lateModelProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Cinematic AI Banner Header */}
      <div className="relative rounded-2xl overflow-hidden border border-theme shadow-lg min-h-[260px] flex items-center p-8 sm:p-12 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/banners/late-models-banner.jpg"
            alt="Rocket Chassis Dirt Late Model"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/30 backdrop-blur-md border border-blue-400/40 text-blue-300 text-xs font-mono font-bold">
            <Award className="w-3.5 h-3.5" /> 563+ Dirt Late Model Parts • Official Rocket Chassis Dealer
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Dirt Late Models & Factory Rocket Chassis
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            Official authorized Factory Rocket Chassis dealership. XR1, XR1.2, and XR2 updates, 4-bar suspension links, rear-end bracketry, and competition lightweight bodywork.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-theme pb-3 overflow-x-auto">
        {[
          { id: 'all', label: `All Late Model (${lateModelProducts.length})` },
          { id: 'rocket', label: `Factory Rocket & XR2 (${rocketOnly.length})` },
          { id: 'suspension', label: `Suspension & Rods (${suspensionOnly.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id as any)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
              filterType === tab.id
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
        {displayed.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
