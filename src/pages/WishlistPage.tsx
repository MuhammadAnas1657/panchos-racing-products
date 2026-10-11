import React from 'react';
import { Heart, ShoppingCart, Trash2, ArrowRight, Share2, ShieldCheck, Flag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/productsData';

export const WishlistPage: React.FC = () => {
  const { setActivePage, addToCart, viewProductDetail } = useCart();

  // Curated driver wishlist items from catalog
  const wishlistItems = PRODUCTS.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-theme pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono font-bold mb-2">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Driver Saved Build List</span>
          </div>
          <h1 className="text-3xl font-black text-theme-primary tracking-tight font-heading">
            My Racing Wishlist
          </h1>
          <p className="text-xs sm:text-sm text-theme-secondary mt-1">
            Components saved for your upcoming chassis build, rebuild weekend, or team inventory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-racing-secondary text-xs py-2.5 px-4 cursor-pointer"
          >
            Browse More Parts
          </button>
        </div>
      </div>

      {/* Wishlist Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product.id}
            className="clean-card rounded-2xl overflow-hidden border border-theme bg-theme-surface shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div
                onClick={() => viewProductDetail(product)}
                className="relative h-48 overflow-hidden bg-slate-900 cursor-pointer group"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-600 text-white">
                  {product.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <span className="text-[10px] font-mono text-theme-muted uppercase">
                  SKU: {product.sku}
                </span>
                <h3
                  onClick={() => viewProductDetail(product)}
                  className="text-xs font-bold text-theme-primary line-clamp-2 hover:text-theme-accent cursor-pointer"
                >
                  {product.name}
                </h3>
                <div className="text-sm font-black text-theme-accent font-mono">
                  {product.price}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 space-y-2">
              <button
                onClick={() => addToCart(product)}
                className="w-full btn-racing-primary text-xs py-2 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add to Basket</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-theme-elevated border border-theme flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2 text-theme-secondary">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Wishlist saved to browser storage for your next pit order.</span>
        </div>
        <button
          onClick={() => setActivePage('shop')}
          className="text-theme-accent font-bold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Continue Shopping Full 1,726+ Catalogue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
