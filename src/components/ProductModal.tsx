import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Truck,
  PhoneCall,
  Share2,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { AddToBasketArc } from './AddToBasketArc';
import { CLIENT_INFO } from '../data/siteData';

export const ProductModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct } = useCart();
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('Standard Fit');

  if (!quickViewProduct) return null;

  const images = quickViewProduct.allImages?.length
    ? quickViewProduct.allImages
    : [quickViewProduct.primaryImage];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          layoutId={`product-modal-${quickViewProduct.id}`}
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel-glow rounded-2xl p-6 sm:p-8 bg-[#0b1324] border border-cyan-400/40 shadow-2xl z-10"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Gallery Section */}
            <div className="flex flex-col gap-4">
              <div className="aspect-square rounded-xl bg-slate-950/80 border border-slate-800 p-6 flex items-center justify-center relative overflow-hidden">
                <img
                  src={images[selectedImgIdx] || quickViewProduct.primaryImage}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-contain filter drop-shadow-2xl"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8fafc"/><circle cx="150" cy="150" r="70" fill="none" stroke="%23cbd5e1" stroke-width="8" stroke-dasharray="8 6"/><path d="M120 150 L180 150 M150 120 L150 180" stroke="%2394a3b8" stroke-width="6"/><text x="150" y="250" text-anchor="middle" fill="%2364748b" font-family="monospace" font-size="12" font-weight="bold">PANCHO%27S RACING PART</text></svg>';
                  }}
                />
                {quickViewProduct.isSprintSteering && (
                  <span className="absolute top-3 left-3 badge-fixed px-2.5 py-1 rounded text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-lg">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    RECONCILED IN REBUILD (16/16)
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIdx(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all p-1 bg-slate-900 shrink-0 ${
                        selectedImgIdx === idx ? 'border-cyan-400 shadow-md shadow-cyan-400/30' : 'border-slate-800 opacity-60'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Fitment & Assurance Banner */}
              <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-800/40 text-xs font-mono flex items-center gap-3 text-slate-300">
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <div>
                  <div className="font-bold text-white uppercase">Direct Trackside Fitment Guarantee</div>
                  <div className="text-[11px] text-slate-400">Inspected by Pancho's tech department in Hanover, PA.</div>
                </div>
              </div>
            </div>

            {/* Product Meta & Purchase Actions */}
            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
                  <span>{quickViewProduct.category}</span>
                  <span>•</span>
                  <span>SKU: {quickViewProduct.sku}</span>
                </div>

                <h1 className="font-heading text-2xl sm:text-3xl font-bold text-white leading-tight">
                  {quickViewProduct.name}
                </h1>

                <div className="mt-3 flex items-baseline gap-3">
                  <span className="font-heading text-3xl font-bold text-white">
                    {quickViewProduct.price}
                  </span>
                  {quickViewProduct.isOnSale && quickViewProduct.regularPrice && (
                    <span className="font-mono text-sm text-slate-500 line-through">
                      {quickViewProduct.regularPrice}
                    </span>
                  )}
                  <span className="ml-auto px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
                    READY FOR IMMEDIATE DISPATCH
                  </span>
                </div>
              </div>

              {/* Sizing & Radius Rod Configuration Helper (Solving the audit sizing call problem!) */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col gap-3">
                <label className="text-xs font-heading font-bold text-slate-300 uppercase tracking-wider flex justify-between">
                  <span>Chassis Fitment / Sizing Option</span>
                  <span className="text-cyan-400 font-mono text-[11px]">No sizing phone call required</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Standard Fit', 'Rocket XR2 Spec', 'Custom Cut (+0.5")'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedSize(option)}
                      className={`p-2 rounded-lg text-xs font-mono transition-all border ${
                        selectedSize === option
                          ? 'bg-blue-600/30 border-cyan-400 text-white font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Technical Description */}
              <div className="text-sm text-slate-300 space-y-2 font-body max-h-48 overflow-y-auto pr-2">
                <h4 className="text-xs font-heading font-bold text-white uppercase tracking-wider text-cyan-400">
                  Engineering Overview
                </h4>
                <p className="leading-relaxed">
                  {quickViewProduct.description || quickViewProduct.shortDescription || 'Precision manufactured to meet the high mechanical demands of competitive dirt track and sprint car racing.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
                <AddToBasketArc product={quickViewProduct} size={selectedSize} variant="full" />

                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                  <a
                    href={`tel:${CLIENT_INFO.phone}`}
                    className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Need Fitment Advice? {CLIENT_INFO.phone}
                  </a>
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-cyan-400" /> Fast Courier / Freight
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
