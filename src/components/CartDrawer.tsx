import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { CLIENT_INFO } from '../data/siteData';

export const CartDrawer: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, isCartOpen, setIsCartOpen, viewProductDetail } = useCart();
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'expedited' | 'pickup'>('standard');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const shippingCost = shippingMethod === 'pickup' ? 0 : shippingMethod === 'expedited' ? 38.5 : 18.0;
  const discount = promoApplied ? cartTotal * 0.1 : 0;
  const finalTotal = Math.max(0, cartTotal - discount + (cart.length > 0 ? shippingCost : 0));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'TRACKSIDE10' || promoCode.trim().toUpperCase() === 'PANCHO') {
      setPromoApplied(true);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1d4ed8', '#059669', '#dc2626', '#f59e0b'],
      });
      clearCart();
    }, 1000);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="w-screen max-w-md bg-theme-surface border-l border-theme shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-5 border-b border-theme flex items-center justify-between bg-theme-elevated">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-theme-primary uppercase tracking-tight">
                  Trackside Basket
                </h2>
                <p className="text-[11px] font-mono text-theme-muted">
                  {cart.length} unique parts selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg hover:bg-slate-200 text-theme-muted hover:text-theme-primary transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderComplete ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-extrabold text-theme-primary">
                  Order Submitted Successfully
                </h3>
                <p className="text-xs font-mono text-theme-secondary max-w-xs leading-relaxed">
                  Ref: <span className="text-blue-600 font-bold">PRP-ORDER-{(Math.random() * 90000 + 10000).toFixed(0)}</span>
                  <br />
                  Our dispatch counter at 1754 Carlisle Pike, Hanover, PA is preparing your parts.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOrderComplete(false);
                    setIsCartOpen(false);
                  }}
                  className="btn-racing-primary mt-3 text-xs"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-14 h-14 rounded-xl bg-theme-elevated border border-theme flex items-center justify-center text-theme-muted">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-theme-primary">
                  Your Basket is Empty
                </h3>
                <p className="text-xs text-theme-muted max-w-xs">
                  Explore our verified Sprint Car, Late Model, or Rocket Chassis racing inventory.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-racing-primary mt-2 text-xs"
                >
                  Browse Racing Catalog
                </button>
              </div>
            ) : (
              <>
                {/* Product Lines */}
                <div className="divide-y divide-theme">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="py-3 flex gap-3 items-center">
                      <img
                        src={item.product.primaryImage}
                        alt=""
                        className="w-12 h-12 object-contain rounded-lg bg-white p-1 border border-theme shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          onClick={() => {
                            viewProductDetail(item.product);
                            setIsCartOpen(false);
                          }}
                          className="font-semibold text-xs text-theme-primary hover:text-blue-600 truncate cursor-pointer"
                        >
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-theme-muted mt-0.5">
                          <span className="text-blue-600 font-bold">SKU: {item.product.sku}</span>
                          {item.size && <span>• {item.size}</span>}
                        </div>
                        <div className="font-mono font-bold text-xs text-emerald-600 mt-1">
                          ${(item.product.rawPrice * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-theme rounded-md bg-theme-surface p-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-rose-600 text-theme-muted cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-mono font-bold px-1.5 text-theme-primary">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-blue-600 text-theme-muted cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Freight Selection */}
                <div className="p-3.5 rounded-xl bg-theme-elevated border border-theme space-y-2">
                  <div className="text-[11px] font-bold text-theme-primary uppercase flex items-center justify-between">
                    <span>Shipping Method</span>
                    <Truck className="w-3.5 h-3.5 text-blue-600" />
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setShippingMethod('standard')}
                      className={`p-1.5 rounded border text-center transition-all cursor-pointer ${
                        shippingMethod === 'standard'
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                          : 'border-theme bg-theme-surface text-theme-secondary'
                      }`}
                    >
                      Ground ($18)
                    </button>
                    <button
                      type="button"
                      onClick={() => setShippingMethod('expedited')}
                      className={`p-1.5 rounded border text-center transition-all cursor-pointer ${
                        shippingMethod === 'expedited'
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                          : 'border-theme bg-theme-surface text-theme-secondary'
                      }`}
                    >
                      Expedited ($38)
                    </button>
                    <button
                      type="button"
                      onClick={() => setShippingMethod('pickup')}
                      className={`p-1.5 rounded border text-center transition-all cursor-pointer ${
                        shippingMethod === 'pickup'
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                          : 'border-theme bg-theme-surface text-theme-secondary'
                      }`}
                    >
                      Pickup (Free)
                    </button>
                  </div>
                </div>

                {/* Promo Code */}
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. TRACKSIDE10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs font-mono bg-theme-elevated border border-theme rounded-md text-theme-primary focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold hover:bg-blue-100 cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
                {promoApplied && (
                  <div className="text-[11px] font-mono text-emerald-600 flex items-center gap-1 font-semibold">
                    <Sparkles className="w-3.5 h-3.5" /> 10% Racer Discount Applied!
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && !orderComplete && (
            <div className="p-5 border-t border-theme bg-theme-elevated space-y-3">
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-theme-secondary">
                  <span>Parts Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount (10%)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-theme-secondary">
                  <span>Freight Delivery</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-theme flex justify-between font-bold text-base text-theme-primary">
                  <span>Total Amount</span>
                  <span className="text-blue-600">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckoutSubmit}
                disabled={isCheckingOut}
                className="w-full btn-racing-primary py-3 text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                {isCheckingOut ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>Submit Trackside Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-theme-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SSL Encrypted Checkout • Verified Hanover Inventory</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
