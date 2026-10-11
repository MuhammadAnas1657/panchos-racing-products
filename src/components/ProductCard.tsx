import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '../data/productsData';
import { AddToBasketArc } from './AddToBasketArc';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { viewProductDetail } = useCart();

  return (
    <motion.div
      layout
      whileHover={{ y: -3 }}
      transition={{ duration: 0.15 }}
      onClick={() => viewProductDetail(product)}
      className="clean-card overflow-hidden flex flex-col justify-between group cursor-pointer border border-theme bg-theme-surface"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-square w-full p-4 flex items-center justify-center bg-white border-b border-theme overflow-hidden">
        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1">
          {product.isSprintSteering && (
            <span className="badge-clean badge-verified">
              <CheckCircle2 className="w-3 h-3" /> 16/16 Reconciled
            </span>
          )}
          {product.isOnSale && (
            <span className="badge-clean text-rose-600 bg-rose-50 border border-rose-200">
              Sale
            </span>
          )}
        </div>

        {/* Product Photography */}
        <img
          src={product.primaryImage}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition-transform duration-200 group-hover:scale-105"
          loading="lazy"
          decoding="async"
          onError={(e) => {
            // Elegant SVG motorsport placeholder fallback
            const target = e.currentTarget;
            target.onerror = null;
            target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8fafc"/><circle cx="150" cy="150" r="70" fill="none" stroke="%23cbd5e1" stroke-width="8" stroke-dasharray="8 6"/><path d="M120 150 L180 150 M150 120 L150 180" stroke="%2394a3b8" stroke-width="6"/><text x="150" y="250" text-anchor="middle" fill="%2364748b" font-family="monospace" font-size="12" font-weight="bold">PANCHO%27S RACING PART</text></svg>';
          }}
        />
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3 bg-theme-surface">
        <div>
          {/* Category & SKU */}
          <div className="flex items-center justify-between text-[11px] font-mono text-theme-muted mb-1">
            <span className="truncate max-w-[130px]">{product.category}</span>
            <span className="text-theme-secondary font-semibold">SKU: {product.sku}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-sm text-theme-primary group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
            {product.name}
          </h3>
        </div>

        {/* Pricing & Add Action */}
        <div className="pt-2 border-t border-theme flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="font-mono text-base font-extrabold text-theme-primary">
              {product.price}
            </div>
            {product.isOnSale && product.regularPrice && (
              <div className="text-[10px] font-mono text-theme-muted line-through">
                {product.regularPrice}
              </div>
            )}
          </div>

          <div onClick={(e) => e.stopPropagation()}>
            <AddToBasketArc product={product} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
