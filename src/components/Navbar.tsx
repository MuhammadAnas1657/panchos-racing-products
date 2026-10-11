import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  ShoppingCart,
  Search,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Palette,
  Check,
  Sun,
  Moon,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Award,
  Wrench,
  Fuel,
  Flag,
  Zap,
} from 'lucide-react';
import { useCart, THEME_OPTIONS, ThemeOption, ThemeMode } from '../context/CartContext';
import { CLIENT_INFO } from '../data/siteData';
import { PRODUCTS } from '../data/productsData';

// Framer Motion Circular Clip-Path & Morphing SVG Variants as specified
const sidebarVariants: Variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${Math.max(height * 2 + 400, 1600)}px at calc(100% - 40px) 40px)`,
    transition: {
      type: 'spring',
      stiffness: 22,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(24px at calc(100% - 40px) 40px)',
    transition: {
      delay: 0.15,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const navVariants: Variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.18 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemVariants: Variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 40,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

interface PathProps {
  d?: string;
  variants: Variants;
  transition?: { duration: number };
  stroke?: string;
}

const Path: React.FC<PathProps> = ({ stroke = 'currentColor', ...props }) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.75"
    stroke={stroke}
    strokeLinecap="round"
    {...props}
  />
);

interface MenuToggleProps {
  toggle: () => void;
  isOpen: boolean;
  strokeColor?: string;
}

const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, isOpen, strokeColor = 'currentColor' }) => (
  <button
    onClick={toggle}
    aria-label={isOpen ? 'Close Cockpit Menu' : 'Open Cockpit Menu'}
    className="p-2.5 rounded-lg border border-theme bg-theme-elevated text-theme-primary hover:border-theme-accent transition-all cursor-pointer flex items-center justify-center shadow-2xs group"
  >
    <motion.svg
      width="22"
      height="22"
      viewBox="0 0 23 23"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <Path
        stroke={strokeColor}
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        stroke={strokeColor}
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        stroke={strokeColor}
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </motion.svg>
  </button>
);

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    activePage,
    setActivePage,
    searchQuery,
    setSearchQuery,
    viewProductDetail,
    theme,
    setTheme,
    cartIconRef,
    triggerCarSpeedAnimation,
  } = useCart();

  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isPaletteModalOpen, setIsPaletteModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleDropdownEnter = (menuKey: string) => {
    if (dropdownTimerRef.current) clearTimeout(dropdownTimerRef.current);
    setActiveDropdown(menuKey);
  };

  const handleDropdownLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubmenu(null);
    }, 200);
  };

  const navigateTo = (pageId: string) => {
    setActivePage(pageId);
    setActiveDropdown(null);
    setActiveSubmenu(null);
    setIsNavMenuOpen(false);
    setIsPaletteModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const searchResults = searchQuery.trim().length > 1
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const lightThemes = THEME_OPTIONS.filter((t) => t.category === 'light');
  const darkThemes = THEME_OPTIONS.filter((t) => t.category === 'dark');

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-theme-surface/95 backdrop-blur-md border-b border-theme shadow-md text-theme-primary">
        {/* 1. Upper Info Bar - Clean, Symmetrically Justified Across Container */}
        <div className="bg-theme-elevated border-b border-theme text-theme-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-xs font-mono">
            {/* Left Justified: Speed Shop Address & Contacts in One Clean Line */}
            <div className="flex items-center gap-3 sm:gap-5 whitespace-nowrap overflow-x-auto no-scrollbar py-0.5">
              <span className="flex items-center gap-1.5 shrink-0">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-theme-accent" />
                <span className="whitespace-nowrap">{CLIENT_INFO.address}</span>
              </span>
              <span className="opacity-30 shrink-0">|</span>
              <a
                href={`tel:${CLIENT_INFO.phone}`}
                className="flex items-center gap-1.5 font-bold shrink-0 whitespace-nowrap transition-colors hover:text-theme-accent text-theme-primary"
              >
                <Phone className="w-3.5 h-3.5 shrink-0 text-theme-accent" />
                <span className="whitespace-nowrap">{CLIENT_INFO.phone}</span>
              </a>
              <span className="opacity-30 hidden md:inline shrink-0">|</span>
              <a
                href={`mailto:${CLIENT_INFO.email}`}
                className="hidden md:flex items-center gap-1.5 shrink-0 whitespace-nowrap transition-colors text-theme-secondary hover:text-theme-accent"
              >
                <Mail className="w-3.5 h-3.5 opacity-70 shrink-0" />
                <span className="whitespace-nowrap">{CLIENT_INFO.email}</span>
              </a>
            </div>

            {/* Right Justified: Palette Cockpit & Green Flag Launch */}
            <div className="flex items-center gap-2.5 shrink-0 whitespace-nowrap pl-4">
              {/* Theme Palette Button */}
              <button
                onClick={() => setIsPaletteModalOpen(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer border whitespace-nowrap shrink-0 bg-theme-surface border-theme text-theme-primary hover:border-theme-accent shadow-2xs"
                title="Open Theme Palette Cockpit (6 Palettes Available)"
              >
                <Palette className="w-3.5 h-3.5 text-theme-accent shrink-0" />
                <span className="font-bold">Palette</span>
              </button>

              {/* Green Flag Speed Launch Button */}
              <button
                onClick={triggerCarSpeedAnimation}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer border bg-emerald-500/20 border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/30 shadow-2xs whitespace-nowrap shrink-0"
                title="Launch Full-Speed 410 Sprint Car Animation"
              >
                <Flag className="w-3.5 h-3.5 fill-emerald-400 text-emerald-950 shrink-0" />
                <span className="font-bold hidden sm:inline">Speed Launch</span>
              </button>
            </div>
          </div>
        </div>

        {/* 2. Main Navigation Bar with Pure Logo & All Workable Direct Pages */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand: Pure Oval Logo Without Redundant Text */}
          <div
            onClick={() => navigateTo('home')}
            className="flex items-center cursor-pointer group shrink-0 py-1"
            title="Pancho's Racing Products • Home"
          >
            <img
              src={CLIENT_INFO.logo}
              alt="Pancho's Racing Products"
              className="h-12 sm:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-md"
            />
          </div>

          {/* All Workable, Selectable Desktop Navigation Buttons */}
          <nav className="hidden xl:flex items-center gap-1 relative">
            {/* 1. HOME BUTTON (Explicitly Requested) */}
            <button
              onClick={() => navigateTo('home')}
              className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap ${
                activePage === 'home'
                  ? 'text-theme-accent bg-theme-elevated font-extrabold shadow-2xs'
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-elevated/60'
              }`}
            >
              Home
            </button>

            {/* 2. SHOP BY DEPARTMENT DROPDOWN (Direct 1-Click Selectable Options) */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('shop')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => navigateTo('shop')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  activeDropdown === 'shop' || activePage === 'shop'
                    ? 'text-theme-accent bg-theme-elevated font-extrabold shadow-2xs'
                    : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-elevated/60'
                }`}
              >
                <span>Shop Catalogue</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'shop' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-1.5 w-72 rounded-xl border border-theme bg-theme-surface shadow-2xl p-2.5 z-50 text-theme-primary space-y-1"
                  >
                    {[
                      { label: 'All 1,726+ Race Parts', desc: 'Browse full speed shop catalogue', page: 'shop' },
                      { label: 'Sprint Steering (16/16 Fixed)', desc: 'KSE steering boxes & half boxes', page: 'sprint-cars', badge: 'Reconciled' },
                      { label: 'Dirt Late Model Parts', desc: 'Rocket XR1 & XR2 suspension brackets', page: 'late-models' },
                      { label: 'Wilwood Brakes & Calipers', desc: 'Rotors, pads, master cylinders', page: 'shop' },
                      { label: 'Oils, Fluids & Sunoco Fuels', desc: 'KSE power steering fluid & race gas', page: 'shop' },
                      { label: 'Safety Equipment & Helmets', desc: 'Simpson belts, suits, head/neck', page: 'shop' },
                      { label: 'Certified Used Parts', desc: 'Inspected spares & clearance items', page: 'used-parts' },
                      { label: 'Driver Saved Wishlist', desc: 'View your saved build components', page: 'wishlist' },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigateTo(item.page)}
                        className="w-full p-2 rounded-lg text-left hover:bg-theme-elevated transition-colors flex items-center justify-between cursor-pointer group/si"
                      >
                        <div>
                          <div className="text-xs font-bold text-theme-primary group-hover/si:text-theme-accent">
                            {item.label}
                          </div>
                          <div className="text-[10px] text-theme-muted font-mono">{item.desc}</div>
                        </div>
                        {item.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 3. SPRINT CARS (Direct Button) */}
            <button
              onClick={() => navigateTo('sprint-cars')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap ${
                activePage === 'sprint-cars'
                  ? 'text-theme-accent bg-theme-elevated font-extrabold shadow-2xs'
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-elevated/60'
              }`}
            >
              <span>Sprint Cars</span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                16/16
              </span>
            </button>

            {/* 4. DIRT LATE MODELS (Direct Button) */}
            <button
              onClick={() => navigateTo('late-models')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap ${
                activePage === 'late-models'
                  ? 'text-theme-accent bg-theme-elevated font-extrabold shadow-2xs'
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-elevated/60'
              }`}
            >
              <span>Late Models</span>
              <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                Rocket
              </span>
            </button>

            {/* 5. TRAILERS & SERVICES DROPDOWN */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownEnter('trailers')}
              onMouseLeave={handleDropdownLeave}
            >
              <button
                onClick={() => handleDropdownEnter('trailers')}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap ${
                  activeDropdown === 'trailers' || activePage === 'trailers' || activePage === 'services'
                    ? 'text-theme-accent bg-theme-elevated font-extrabold shadow-2xs'
                    : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-elevated/60'
                }`}
              >
                <span>Trailers & Services</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              <AnimatePresence>
                {activeDropdown === 'trailers' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 top-full mt-1.5 w-80 rounded-xl border border-theme bg-theme-surface shadow-2xl p-2.5 z-50 text-theme-primary space-y-1"
                  >
                    {[
                      {
                        title: 'Trailers & Motorhomes For Sale',
                        desc: 'Renegade totorhomes, 44ft goosenecks, stackers',
                        page: 'trailers',
                        badge: 'For Sale',
                      },
                      {
                        title: 'Roehrig Shock Dyno & Revalving',
                        desc: 'Computer dyno curves & 24-48hr turnaround in Hanover',
                        page: 'services',
                        badge: 'Dyno Bay',
                      },
                      {
                        title: 'Hauler, RV & Trailer Repair',
                        desc: 'Axles, electric brakes, liftgates, auxiliary wiring',
                        page: 'services',
                        badge: 'Service Bay',
                      },
                      {
                        title: 'Chassis Straightening & TIG Welding',
                        desc: 'Chrome-moly front clip repairs & custom brackets',
                        page: 'services',
                        badge: 'Fabrication',
                      },
                    ].map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => navigateTo(item.page)}
                        className="w-full p-2.5 rounded-lg text-left hover:bg-theme-elevated transition-colors flex items-center justify-between cursor-pointer group/tr"
                      >
                        <div>
                          <div className="text-xs font-bold text-theme-primary group-hover/tr:text-theme-accent">
                            {item.title}
                          </div>
                          <div className="text-[10px] text-theme-muted mt-0.5">{item.desc}</div>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-theme-elevated border border-theme text-theme-accent font-bold shrink-0">
                          {item.badge}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 6. USED PARTS (Direct Button) */}
            <button
              onClick={() => navigateTo('used-parts')}
              className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap ${
                activePage === 'used-parts'
                  ? 'text-theme-accent bg-theme-elevated font-extrabold shadow-2xs'
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-elevated/60'
              }`}
            >
              Used Parts
            </button>

            {/* 7. ROCKET TECH (Direct Button) */}
            <button
              onClick={() => navigateTo('rocket-tech')}
              className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap ${
                activePage === 'rocket-tech'
                  ? 'text-theme-accent bg-theme-elevated font-extrabold shadow-2xs'
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-elevated/60'
              }`}
            >
              Rocket Tech
            </button>

            {/* 8. RACE TEAM (Direct Button) */}
            <button
              onClick={() => navigateTo('race-team')}
              className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap ${
                activePage === 'race-team'
                  ? 'text-theme-accent bg-theme-elevated font-extrabold shadow-2xs'
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-elevated/60'
              }`}
            >
              Race Team
            </button>

            {/* 9. ABOUT US (Direct Button - Substantially Expanded Page) */}
            <button
              onClick={() => navigateTo('about-us')}
              className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap ${
                activePage === 'about-us'
                  ? 'text-theme-accent bg-theme-elevated font-extrabold shadow-2xs'
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-elevated/60'
              }`}
            >
              About Us
            </button>

            {/* 10. CONTACT (Direct Button) */}
            <button
              onClick={() => navigateTo('contacts')}
              className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap ${
                activePage === 'contacts'
                  ? 'text-theme-accent bg-theme-elevated font-extrabold shadow-2xs'
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-elevated/60'
              }`}
            >
              Contact
            </button>

            {/* 11. RETURN POLICY (Direct Button from original site) */}
            <button
              onClick={() => navigateTo('return-policy')}
              className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer whitespace-nowrap ${
                activePage === 'return-policy'
                  ? 'text-theme-accent bg-theme-elevated font-extrabold shadow-2xs'
                  : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-elevated/60'
              }`}
            >
              Policy
            </button>
          </nav>

          {/* Right Action Group: Search Icon Only, Cart & Theme Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* SEARCH BUTTON (Icon Only as requested) */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-center ${
                  isSearchOpen
                    ? 'border-theme-accent bg-theme-elevated text-theme-accent ring-2 ring-theme-accent/20'
                    : 'border-theme bg-theme-elevated text-theme-primary hover:border-theme-accent shadow-2xs'
                }`}
                title="Search Catalog Parts & SKUs"
                aria-label="Search"
              >
                {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
              </button>

              {/* EXPANDABLE SEARCH OVERLAY */}
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-xl border border-theme bg-theme-surface shadow-2xl z-50 p-3"
                  >
                    <div className="relative flex items-center">
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Type part name, SKU, or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-3.5 py-2 pl-9 pr-8 rounded-lg text-xs font-mono bg-theme-elevated border border-theme text-theme-primary placeholder-theme-muted focus:outline-none focus:border-theme-accent"
                      />
                      <Search className="w-4 h-4 text-theme-muted absolute left-3 pointer-events-none" />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery('')}
                          className="absolute right-2.5 text-theme-muted hover:text-theme-primary text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Autocomplete Results */}
                    {searchResults.length > 0 && (
                      <div className="mt-3 space-y-1 max-h-72 overflow-y-auto pt-2 border-t border-theme">
                        <div className="text-[10px] font-mono uppercase text-theme-muted px-1 pb-1">
                          Matching Inventory Parts ({searchResults.length})
                        </div>
                        {searchResults.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => {
                              viewProductDetail(item);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-theme-elevated cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-9 h-9 object-cover rounded border border-theme shrink-0"
                              />
                              <div className="text-left">
                                <div className="text-xs font-bold text-theme-primary line-clamp-1">
                                  {item.name}
                                </div>
                                <div className="text-[10px] font-mono text-theme-muted">
                                  SKU: {item.sku}
                                </div>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-mono font-bold text-theme-accent block">
                                {item.price}
                              </span>
                              <span className="text-[9px] text-emerald-600 font-mono">In Stock</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {searchQuery.trim().length > 1 && searchResults.length === 0 && (
                      <div className="py-4 text-center text-xs font-mono text-theme-muted">
                        No parts found for "{searchQuery}". Try "KSE", "Rocket", "Wing", or "Wheel".
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* RACING BASKET (Cart Target Ref) */}
            <div ref={cartIconRef} className="relative">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-center border-theme bg-theme-elevated text-theme-primary hover:border-theme-accent shadow-2xs"
                title="Open Racing Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-theme-accent text-white font-mono font-bold text-[11px] flex items-center justify-center shadow-xs"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
            </div>

            {/* FRAMER MOTION MORPHING SVG TOGGLE (3-bar hamburger morphs into 'X') */}
            <MenuToggle
              toggle={() => setIsNavMenuOpen(!isNavMenuOpen)}
              isOpen={isNavMenuOpen}
              strokeColor="currentColor"
            />
          </div>
        </div>
      </header>

      {/* 3. PURE COCKPIT NAVIGATION DRAWER (NO COLOR PALETTES - CLEAN MENU ONLY) */}
      {createPortal(
        <AnimatePresence>
          {isNavMenuOpen && (
            <div className="fixed inset-0 z-[99999] overflow-hidden pointer-events-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsNavMenuOpen(false)}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99999] cursor-pointer"
              />

              {/* Circular Reveal Menu Container */}
              <motion.nav
                initial="closed"
                animate={isNavMenuOpen ? 'open' : 'closed'}
                exit="closed"
                variants={sidebarVariants}
                custom={typeof window !== 'undefined' ? window.innerHeight : 1000}
                className="fixed right-0 top-0 bottom-0 w-full sm:w-[480px] bg-theme-surface border-l border-theme z-[100000] shadow-2xl flex flex-col h-full text-theme-primary overflow-hidden"
              >
                {/* Drawer Header with Title and Morphing SVG Close Toggle */}
                <div className="p-6 border-b border-theme flex items-center justify-between bg-theme-elevated shrink-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <Menu className="w-5 h-5 text-theme-accent" />
                      <h3 className="font-extrabold text-xl text-theme-primary tracking-tight font-heading">
                        Pancho's Navigation Menu
                      </h3>
                    </div>
                    <p className="text-xs text-theme-secondary mt-1">
                      Competition Departments & Speed Shop Flagship
                    </p>
                  </div>
                  <MenuToggle
                    toggle={() => setIsNavMenuOpen(false)}
                    isOpen={true}
                    strokeColor="currentColor"
                  />
                </div>

                {/* Staggered Content Animated via navVariants */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Staggered Navigation Items List */}
                  <div>
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-theme-muted mb-3">
                      Competition Departments & Pages
                    </div>
                    <motion.ul variants={navVariants} className="space-y-2">
                      {[
                        {
                          label: 'Home Flagship',
                          desc: 'Main racetrack portal & showroom showcase',
                          page: 'home',
                          color: '#eab308',
                          badge: 'HQ',
                        },
                        {
                          label: 'Sprint Cars Division (16/16 Reconciled)',
                          desc: 'KSE steering boxes, top wings, torsion arms',
                          page: 'sprint-cars',
                          color: '#1d4ed8',
                          badge: '16/16 Fixed',
                        },
                        {
                          label: 'Dirt Late Models (Factory Rocket Dealer)',
                          desc: 'XR1/XR2 suspension, 4-bar links, body panels',
                          page: 'late-models',
                          color: '#dc2626',
                          badge: 'Rocket Dealer',
                        },
                        {
                          label: 'Trailers & Motorhomes For Sale',
                          desc: 'Renegade totorhomes, 44ft goosenecks, stackers',
                          page: 'trailers',
                          color: '#10b981',
                          badge: 'For Sale',
                        },
                        {
                          label: 'Trailer & Motorhome Services',
                          desc: 'Roehrig shock dyno, RV repair, TIG welding',
                          page: 'services',
                          color: '#059669',
                          badge: '24-48hr',
                        },
                        {
                          label: 'Rocket Tech & Sizing Matrix',
                          desc: 'Interactive radius rod calculation tool',
                          page: 'rocket-tech',
                          color: '#d97706',
                          badge: 'Interactive',
                        },
                        {
                          label: 'Certified Pre-Owned Used Parts',
                          desc: 'Inspected race-ready spares & components',
                          page: 'used-parts',
                          color: '#9333ea',
                          badge: 'Inspected',
                        },
                        {
                          label: 'Full 1,726+ Parts Catalogue',
                          desc: 'Wilwood, KSE, Aero, BMRS live inventory',
                          page: 'shop',
                          color: '#0284c7',
                          badge: '1,726+ Live',
                        },
                        {
                          label: "Pancho's Racing Team Schedule",
                          desc: 'Dirt track schedule & driver profiles',
                          page: 'race-team',
                          color: '#f97316',
                          badge: 'Team',
                        },
                        {
                          label: 'About Hanover Speed Shop (31+ Yrs)',
                          desc: 'Our roots, track heritage & facility tour',
                          page: 'about-us',
                          color: '#6366f1',
                          badge: 'Since 1993',
                        },
                        {
                          label: 'Hanover HQ & Contact Hotline',
                          desc: 'Direct pit line, map & trackside dispatch',
                          page: 'contacts',
                          color: '#8b5cf6',
                          badge: 'Contact',
                        },
                        {
                          label: 'Refund and Returns Policy',
                          desc: '15-day return window, 15% restocking fee, RMA',
                          page: 'return-policy',
                          color: '#64748b',
                          badge: 'Policy',
                        },
                        {
                          label: 'Driver Saved Wishlist',
                          desc: 'Access saved build parts and components',
                          page: 'wishlist',
                          color: '#ec4899',
                          badge: 'Wishlist',
                        },
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          variants={itemVariants}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => navigateTo(item.page)}
                          className="p-3 rounded-xl border border-theme bg-theme-elevated hover:bg-theme-surface transition-all cursor-pointer flex items-center justify-between group shadow-2xs"
                          style={{ borderLeft: `4px solid ${item.color}` }}
                        >
                          <div className="pr-2">
                            <div className="text-xs font-bold text-theme-primary group-hover:text-theme-accent transition-colors flex items-center gap-2">
                              <span>{item.label}</span>
                            </div>
                            <div className="text-[11px] text-theme-muted font-mono mt-0.5">
                              {item.desc}
                            </div>
                          </div>
                          {item.badge && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold shrink-0 bg-theme-surface border border-theme text-theme-accent">
                              {item.badge}
                            </span>
                          )}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>

                  {/* Section: Full Speed Race Car Replay & Sound */}
                  <div className="pt-2 border-t border-theme">
                    <button
                      onClick={() => {
                        triggerCarSpeedAnimation();
                        setIsNavMenuOpen(false);
                      }}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-102 cursor-pointer"
                    >
                      <Flag className="w-4 h-4 fill-white text-emerald-950" />
                      <span>Launch Full-Speed 410 Sprint Car Animation</span>
                    </button>
                  </div>

                  {/* Section: Speed Shop HQ Information */}
                  <div className="p-4 rounded-xl bg-theme-elevated border border-theme text-xs font-mono space-y-2">
                    <div className="flex items-center gap-2 font-bold text-theme-primary">
                      <ShieldCheck className="w-4 h-4 text-theme-accent" />
                      <span>Hanover, PA Speed Shop HQ</span>
                    </div>
                    <p className="text-theme-secondary text-[11px]">
                      1754 Carlisle Pike, Hanover, PA 17331
                    </p>
                    <a
                      href={`tel:${CLIENT_INFO.phone}`}
                      className="inline-flex items-center gap-2 text-theme-accent font-bold hover:underline pt-1 text-[11px]"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Direct Pit Line: {CLIENT_INFO.phone}</span>
                    </a>
                  </div>
                </div>
              </motion.nav>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* 4. DEDICATED THEME PALETTE MODAL (Triggered exclusively by the Palette button) */}
      {createPortal(
        <AnimatePresence>
          {isPaletteModalOpen && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsPaletteModalOpen(false)}
                className="fixed inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
              />
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                className="relative w-full max-w-lg bg-theme-surface border border-theme rounded-2xl shadow-2xl p-6 z-10 max-h-[90vh] overflow-y-auto space-y-6 text-theme-primary"
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-theme pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-theme-elevated border border-theme text-theme-accent">
                      <Palette className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg tracking-tight font-heading">
                        Royal Motorsport Themes
                      </h3>
                      <p className="text-xs text-theme-secondary">
                        6 engineered racing color schemes (3 Light • 3 Dark)
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsPaletteModalOpen(false)}
                    className="p-2 rounded-lg hover:bg-theme-elevated text-theme-muted hover:text-theme-primary cursor-pointer transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Light Themes */}
                <div className="space-y-2.5">
                  <div className="text-[11px] font-mono font-bold uppercase text-theme-muted flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Light Palettes</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {lightThemes.map((opt) => {
                      const isSelected = theme === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => {
                            setTheme(opt.id);
                          }}
                          className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-theme-accent bg-theme-elevated shadow-sm ring-2 ring-theme-accent/20'
                              : 'border-theme hover:border-slate-300 dark:hover:border-slate-700 bg-theme-surface hover:bg-theme-elevated/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="w-8 h-8 rounded-lg border border-slate-300 shadow-2xs flex items-center justify-center shrink-0"
                              style={{ backgroundColor: opt.bgHex }}
                            >
                              <span
                                className="w-3.5 h-3.5 rounded-full shadow-xs"
                                style={{ backgroundColor: opt.accentHex }}
                              />
                            </span>
                            <div>
                              <div className="text-xs font-bold text-theme-primary flex items-center gap-2">
                                <span>{opt.name}</span>
                                {isSelected && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                    Active
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-theme-muted">{opt.description}</p>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-theme-accent shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dark Themes */}
                <div className="space-y-2.5 pt-2 border-t border-theme">
                  <div className="text-[11px] font-mono font-bold uppercase text-theme-muted flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5 text-blue-400" />
                    <span>Dark Palettes</span>
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {darkThemes.map((opt) => {
                      const isSelected = theme === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => {
                            setTheme(opt.id);
                          }}
                          className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-theme-accent bg-theme-elevated shadow-sm ring-2 ring-theme-accent/20'
                              : 'border-theme hover:border-slate-300 dark:hover:border-slate-700 bg-theme-surface hover:bg-theme-elevated/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="w-8 h-8 rounded-lg border border-slate-700 shadow-2xs flex items-center justify-center shrink-0"
                              style={{ backgroundColor: opt.bgHex }}
                            >
                              <span
                                className="w-3.5 h-3.5 rounded-full shadow-xs"
                                style={{ backgroundColor: opt.accentHex }}
                              />
                            </span>
                            <div>
                              <div className="text-xs font-bold text-theme-primary flex items-center gap-2">
                                <span>{opt.name}</span>
                                {isSelected && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                                    Active
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-theme-muted">{opt.description}</p>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-theme-accent shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
