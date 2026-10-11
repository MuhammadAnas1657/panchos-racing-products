import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Truck,
  Phone,
  Share2,
  ChevronRight,
  RotateCcw,
  Clock,
  Wrench,
  Tag,
  Package,
} from 'lucide-react';
import { Product, PRODUCTS } from '../data/productsData';
import { useCart } from '../context/CartContext';
import { CLIENT_INFO } from '../data/siteData';
import { AddToBasketArc } from '../components/AddToBasketArc';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { selectedProduct, setActivePage, viewProductDetail } = useCart();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedFitment, setSelectedFitment] = useState('Standard Spec');
  const [quantity, setQuantity] = useState(1);

  if (!selectedProduct) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-theme-secondary mb-4">No product selected.</p>
        <button onClick={() => setActivePage('shop')} className="btn-racing-primary">
          Return to Catalogue
        </button>
      </div>
    );
  }

  const images = selectedProduct.allImages && selectedProduct.allImages.length > 0
    ? selectedProduct.allImages
    : [selectedProduct.primaryImage];

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== selectedProduct.id && (p.category === selectedProduct.category || p.isSprintSteering)
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Navigation Breadcrumbs & Back Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-theme">
        <button
          onClick={() => setActivePage('shop')}
          className="inline-flex items-center gap-2 text-sm font-medium text-theme-secondary hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Parts Catalogue
        </button>

        <nav className="flex items-center gap-2 text-xs font-mono text-theme-muted">
          <span onClick={() => setActivePage('home')} className="hover:underline cursor-pointer">Home</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span onClick={() => setActivePage('shop')} className="hover:underline cursor-pointer">Catalogue</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-theme-secondary">{selectedProduct.category}</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-blue-600 font-bold truncate max-w-xs">{selectedProduct.sku}</span>
        </nav>
      </div>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="aspect-square clean-card p-8 flex items-center justify-center bg-white relative overflow-hidden rounded-xl border border-theme">
            {selectedProduct.isSprintSteering && (
              <span className="absolute top-3 left-3 badge-clean badge-verified">
                <CheckCircle2 className="w-3.5 h-3.5" /> 16/16 Reconciled Part
              </span>
            )}
            <img
              src={images[selectedImageIdx] || selectedProduct.primaryImage}
              alt={selectedProduct.name}
              className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
              decoding="async"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8fafc"/><circle cx="150" cy="150" r="70" fill="none" stroke="%23cbd5e1" stroke-width="8" stroke-dasharray="8 6"/><path d="M120 150 L180 150 M150 120 L150 180" stroke="%2394a3b8" stroke-width="6"/><text x="150" y="250" text-anchor="middle" fill="%2364748b" font-family="monospace" font-size="12" font-weight="bold">PANCHO%27S RACING PART</text></svg>';
              }}
            />
          </div>

          {/* Gallery Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`w-16 h-16 clean-card p-1 rounded-lg border-2 shrink-0 cursor-pointer transition-all ${
                    selectedImageIdx === idx ? 'border-blue-600 shadow-md' : 'border-theme opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Hanover Dispatch Guarantee Box */}
          <div className="p-4 rounded-xl bg-theme-elevated border border-theme space-y-2 text-xs">
            <div className="flex items-center gap-2 font-semibold text-theme-primary">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Direct Trackside & Freight Dispatch</span>
            </div>
            <p className="text-theme-secondary leading-relaxed">
              In stock at <strong>1754 Carlisle Pike, Hanover, PA</strong>. Orders placed before 3:00 PM EST ship same-day via UPS Ground or expedited courier.
            </p>
          </div>
        </div>

        {/* Right: Technical Details & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-theme-muted uppercase tracking-wider mb-2">
              <span className="text-blue-600 font-bold">{selectedProduct.category}</span>
              <span>•</span>
              <span>SKU: {selectedProduct.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-theme-primary tracking-tight leading-snug">
              {selectedProduct.name}
            </h1>

            {/* Price block */}
            <div className="mt-4 flex items-baseline gap-4">
              <span className="text-3xl sm:text-4xl font-extrabold text-theme-primary font-mono">
                {selectedProduct.price}
              </span>
              {selectedProduct.isOnSale && (
                <span className="text-sm font-mono text-theme-muted line-through">
                  {selectedProduct.regularPrice}
                </span>
              )}
              <span className="badge-clean badge-verified ml-auto">
                In Stock & Verified
              </span>
            </div>
          </div>

          {/* Sizing & Fitment Selector (Solves the audit sizing call problem!) */}
          <div className="clean-card p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-theme-primary uppercase tracking-wide">
                Chassis Fitment / Length Option
              </span>
              <span className="text-blue-600 font-mono">No follow-up phone call needed</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {['Standard Spec', 'Rocket XR2 Fitment', 'Sprint 410 / 360'].map((fit) => (
                <button
                  key={fit}
                  onClick={() => setSelectedFitment(fit)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                    selectedFitment === fit
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-sm'
                      : 'border-theme bg-theme-surface text-theme-secondary hover:border-slate-300'
                  }`}
                >
                  {fit}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity and Arc Add-to-Basket */}
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center border border-theme rounded-lg bg-theme-surface p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-sm font-bold text-theme-secondary hover:text-theme-primary cursor-pointer"
              >
                -
              </button>
              <span className="px-3 py-1 text-xs font-mono font-bold text-theme-primary">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-sm font-bold text-theme-secondary hover:text-theme-primary cursor-pointer"
              >
                +
              </button>
            </div>

            <div className="flex-1">
              <AddToBasketArc
                product={selectedProduct}
                quantity={quantity}
                size={selectedFitment}
                variant="full"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3 pt-4 border-t border-theme">
            <h3 className="text-sm font-bold text-theme-primary uppercase tracking-wider">
              Part Description & Details
            </h3>
            <p className="text-sm text-theme-secondary leading-relaxed">
              {selectedProduct.description || selectedProduct.shortDescription || 'Engineered and field-tested to withstand high-stress competitive dirt track racing environments. Manufactured to precise motorsport tolerances.'}
            </p>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-3 pt-4 border-t border-theme">
            <h3 className="text-sm font-bold text-theme-primary uppercase tracking-wider flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-600" /> Engineering Specifications
            </h3>

            <div className="clean-card divide-y divide-theme text-xs font-mono overflow-hidden">
              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-theme-muted">PART NUMBER (SKU):</span>
                <span className="text-theme-primary font-bold">{selectedProduct.sku}</span>
              </div>
              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-theme-muted">PRIMARY CATEGORY:</span>
                <span className="text-theme-primary">{selectedProduct.category}</span>
              </div>
              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-theme-muted">MANUFACTURER:</span>
                <span className="text-theme-primary">Pancho's Racing Products / KSE / Rocket</span>
              </div>
              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-theme-muted">CHASSIS COMPATIBILITY:</span>
                <span className="text-theme-primary">{selectedFitment}</span>
              </div>
              <div className="py-2.5 px-4 flex justify-between">
                <span className="text-theme-muted">LOCATION:</span>
                <span className="text-theme-primary">Hanover, PA Facility</span>
              </div>
            </div>
          </div>

          {/* Direct Shop Phone Assistance */}
          <div className="flex items-center justify-between text-xs text-theme-muted pt-2 font-mono">
            <a
              href={`tel:${CLIENT_INFO.phone}`}
              className="inline-flex items-center gap-1.5 text-blue-600 hover:underline"
            >
              <Phone className="w-3.5 h-3.5" /> Call Tech Desk: {CLIENT_INFO.phone}
            </a>
            <span>Part Verification Guaranteed</span>
          </div>
        </div>
      </div>

      {/* Frequently Bought Together / Related Parts */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-theme space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-theme-primary">
                Related Racing Equipment
              </h2>
              <p className="text-xs text-theme-secondary mt-0.5">
                Complementary components frequently serviced or replaced together.
              </p>
            </div>
            <button
              onClick={() => setActivePage('shop')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              View Full Store →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
