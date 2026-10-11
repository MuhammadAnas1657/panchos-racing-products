import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '../data/productsData';

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type?: 'success' | 'info' | 'alert';
  time: string;
}

export type ThemeMode =
  | 'light'
  | 'daytona-light'
  | 'heritage-cream'
  | 'dark'
  | 'victory-red'
  | 'rocket-titanium';

export interface ThemeOption {
  id: ThemeMode;
  name: string;
  label: string;
  category: 'light' | 'dark';
  bgHex: string;
  accentHex: string;
  description: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  // 3 Light themes
  {
    id: 'light',
    name: 'Penske Pure White',
    label: 'Penske White',
    category: 'light',
    bgHex: '#ffffff',
    accentHex: '#1d4ed8',
    description: 'Crisp trackside white with Penske cobalt blue',
  },
  {
    id: 'daytona-light',
    name: 'Daytona Speed Silver',
    label: 'Daytona Silver',
    category: 'light',
    bgHex: '#f1f5f9',
    accentHex: '#dc2626',
    description: 'Motorsport silver-slate with championship red',
  },
  {
    id: 'heritage-cream',
    name: 'Heritage Trophy Sand',
    label: 'Trophy Sand',
    category: 'light',
    bgHex: '#faf8f5',
    accentHex: '#d97706',
    description: 'Warm speed shop cream with trophy amber & gold',
  },
  // 3 Dark themes
  {
    id: 'dark',
    name: 'Stealth Carbon Dark',
    label: 'Carbon Dark',
    category: 'dark',
    bgHex: '#090d16',
    accentHex: '#3b82f6',
    description: 'Deep carbon night black with electric cobalt blue',
  },
  {
    id: 'victory-red',
    name: 'Victory Lane Red',
    label: 'Victory Red',
    category: 'dark',
    bgHex: '#0c0d10',
    accentHex: '#ef4444',
    description: 'Asphalt night black with aggressive victory crimson',
  },
  {
    id: 'rocket-titanium',
    name: 'Rocket Chassis Titanium',
    label: 'Rocket Titanium',
    category: 'dark',
    bgHex: '#0a0f14',
    accentHex: '#06b6d4',
    description: 'Graphite tubular chassis with electric racing cyan',
  },
];

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, size?: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  notifications: NotificationItem[];
  dismissNotification: (id: string) => void;
  activePage: string;
  setActivePage: (page: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedProduct: Product | null;
  viewProductDetail: (product: Product) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  cartIconRef: React.RefObject<HTMLDivElement | null>;
  carSpeedLaunchKey: number;
  triggerCarSpeedAnimation: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('panchos_theme') as ThemeMode;
      const valid: ThemeMode[] = ['light', 'daytona-light', 'heritage-cream', 'dark', 'victory-red', 'rocket-titanium'];
      return valid.includes(saved) ? saved : 'light';
    } catch {
      return 'light';
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('panchos_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activePage, setActivePageState] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(() => PRODUCTS[0] || null);
  const [carSpeedLaunchKey, setCarSpeedLaunchKey] = useState(0);

  const triggerCarSpeedAnimation = () => {
    setCarSpeedLaunchKey((prev) => prev + 1);
  };

  const setActivePage = (page: string) => {
    setActivePageState(page);
  };

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const cartIconRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('panchos_theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    const list: ThemeMode[] = ['light', 'daytona-light', 'heritage-cream', 'dark', 'victory-red', 'rocket-titanium'];
    setTheme((prev) => {
      const idx = list.indexOf(prev);
      return list[(idx + 1) % list.length];
    });
  };

  useEffect(() => {
    try {
      localStorage.setItem('panchos_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, size?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, size }];
    });

    const newNotif: NotificationItem = {
      id: Math.random().toString(),
      title: 'Added to Racing Basket',
      message: `${product.name} (SKU: ${product.sku})`,
      type: 'success',
      time: 'Just now'
    };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 2)]);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const viewProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setActivePage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.rawPrice * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        notifications,
        dismissNotification,
        activePage,
        setActivePage,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        viewProductDetail,
        theme,
        setTheme,
        toggleTheme,
        cartIconRef,
        carSpeedLaunchKey,
        triggerCarSpeedAnimation,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
