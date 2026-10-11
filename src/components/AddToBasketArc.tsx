import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Check } from 'lucide-react';
import { Product } from '../data/productsData';
import { useCart } from '../context/CartContext';

interface AddToBasketArcProps {
  product: Product;
  quantity?: number;
  size?: string;
  variant?: 'compact' | 'full';
}

export const AddToBasketArc: React.FC<AddToBasketArcProps> = ({
  product,
  quantity = 1,
  size,
  variant = 'compact',
}) => {
  const { addToCart, cartIconRef } = useCart();
  const [isFlying, setIsFlying] = useState(false);
  const [flyCoord, setFlyCoord] = useState<{ startX: number; startY: number; targetX: number; targetY: number } | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFlying) return;

    if (buttonRef.current && cartIconRef?.current) {
      const btnRect = buttonRef.current.getBoundingClientRect();
      const cartRect = cartIconRef.current.getBoundingClientRect();

      setFlyCoord({
        startX: btnRect.left + btnRect.width / 2,
        startY: btnRect.top + btnRect.height / 2,
        targetX: cartRect.left + cartRect.width / 2,
        targetY: cartRect.top + cartRect.height / 2,
      });

      setIsFlying(true);
      addToCart(product, quantity, size);

      setTimeout(() => {
        setIsFlying(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 1400);
      }, 650);
    } else {
      addToCart(product, quantity, size);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 1400);
    }
  };

  return (
    <>
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        disabled={isFlying}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className={`relative overflow-hidden font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
          variant === 'full'
            ? 'w-full py-3 px-6 rounded-lg text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm'
            : 'py-1.5 px-3 rounded-md text-xs text-white bg-blue-600 hover:bg-blue-700'
        }`}
      >
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.span
              key="success"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="flex items-center gap-1 text-white font-bold"
            >
              <Check className="w-3.5 h-3.5" /> Added
            </motion.span>
          ) : (
            <motion.span
              key="normal"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              className="flex items-center gap-1.5"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>{variant === 'full' ? 'Add to Racing Basket' : 'Add'}</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Curved Parabolic Flying Product Particle */}
      <AnimatePresence>
        {isFlying && flyCoord && (
          <motion.div
            initial={{
              position: 'fixed',
              left: flyCoord.startX,
              top: flyCoord.startY,
              x: '-50%',
              y: '-50%',
              scale: 1,
              opacity: 1,
              zIndex: 9999,
            }}
            animate={{
              left: [flyCoord.startX, (flyCoord.startX + flyCoord.targetX) / 2 + 40, flyCoord.targetX],
              top: [flyCoord.startY, Math.min(flyCoord.startY, flyCoord.targetY) - 70, flyCoord.targetY],
              scale: [1, 1.1, 0.3],
              rotate: [0, 90, 360],
              opacity: [1, 1, 0.2],
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.8, 0.25, 1],
            }}
            className="pointer-events-none rounded-full w-10 h-10 flex items-center justify-center p-1 bg-white border border-blue-600 shadow-xl"
          >
            <img
              src={product.primaryImage}
              alt=""
              className="w-full h-full object-contain rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
