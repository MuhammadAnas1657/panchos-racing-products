import React, { useState, useMemo } from 'react';
import { Search, Filter, RefreshCw, CheckCircle2, ArrowUpDown } from 'lucide-react';
import { PRODUCTS } from '../data/productsData';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export const ShopPage: React.FC = () => {
  const { searchQuery, setSearchQuery } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sprintSteeringOnly, setSprintSteeringOnly] = useState(false);

  const topCategories = useMemo(() => {
    return ['All', 'Steering', 'Sprint Cars', 'Late Models', 'Factory Rocket Parts', 'Shocks', 'Brakes', 'Safety Equipment', 'Apparel', 'Fuel', 'Radius Rod'];
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        p.allCategories.some((c) => c.toLowerCase().includes(selectedCategory.toLowerCase()));

      const matchesSteeringOnly = !sprintSteeringOnly || p.isSprintSteering;
      const matchesStock = !inStockOnly || p.isInStock;

      return matchesSearch && matchesCategory && matchesSteeringOnly && matchesStock;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.rawPrice - b.rawPrice;
      if (sortBy === 'price-desc') return b.rawPrice - a.rawPrice;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy, inStockOnly, sprintSteeringOnly]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('featured');
    setInStockOnly(false);
    setSprintSteeringOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-theme">
        <div>
          <span className="text-blue-600 font-mono text-xs font-bold uppercase tracking-wider">
            Verified Inventory
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight mt-1">
            Racing Parts Catalogue
          </h1>
          <p className="text-theme-secondary text-xs sm:text-sm mt-1 max-w-xl">
            Click on any part to open its full technical specification sheet and verified fitment matrix.
          </p>
        </div>

        {/* 16/16 Reconciled Quick Toggle */}
        <button
          onClick={() => setSprintSteeringOnly(!sprintSteeringOnly)}
          className={`p-2.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
            sprintSteeringOnly
              ? 'bg-emerald-50 text-emerald-700 border-emerald-400 shadow-sm'
              : 'bg-theme-surface text-theme-secondary border-theme hover:border-blue-600'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Sprint Steering Only (16/16 Reconciled)</span>
        </button>
      </div>

      {/* Categories Bar */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {topCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSprintSteeringOnly(false);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat && !sprintSteeringOnly
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-theme-surface text-theme-secondary hover:text-theme-primary border border-theme'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="clean-card p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-4">
            <span className="text-theme-primary font-bold">
              {filteredProducts.length} Parts Loaded
            </span>

            <label className="flex items-center gap-1.5 text-theme-secondary cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded accent-blue-600 cursor-pointer"
              />
              <span>In-Stock Only</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-theme-secondary">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-theme-elevated border border-theme rounded px-2.5 py-1 text-xs text-theme-primary focus:outline-none focus:border-blue-600"
              >
                <option value="featured">Featured / Stock</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Part Name: A to Z</option>
              </select>
            </div>

            {(searchQuery || selectedCategory !== 'All' || inStockOnly || sprintSteeringOnly) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-rose-600 hover:underline cursor-pointer ml-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-16 flex flex-col items-center justify-center text-center space-y-3 clean-card rounded-2xl">
          <div className="w-14 h-14 rounded-full bg-theme-elevated flex items-center justify-center text-theme-muted">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-theme-primary">
            No Matching Parts Found
          </h3>
          <p className="text-xs text-theme-muted max-w-sm">
            Try adjusting your search query or selecting a different category.
          </p>
          <button onClick={resetFilters} className="btn-racing-primary mt-2 text-xs">
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
