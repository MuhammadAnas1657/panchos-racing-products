import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Search,
  Truck,
  Compass,
  Cpu,
  Phone,
  PackageCheck,
  Award,
  Star,
  Quote,
  Clock,
  MapPin,
  Calendar,
  Flame,
  Check,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Flag,
  Zap,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/productsData';
import { CLIENT_INFO } from '../data/siteData';
import { ProductCard } from '../components/ProductCard';
import { AnimatedStat } from '../components/AnimatedStat';
import { Client3DCard, ClientReview } from '../components/Client3DCard';
import { RacingMechSpeedCard, MechSpeedCardItem } from '../components/RacingMechSpeedCard';

export const HomePage: React.FC = () => {
  const { setActivePage, setSearchQuery, viewProductDetail, triggerCarSpeedAnimation } = useCart();
  const [tickerIndex, setTickerIndex] = useState(0);
  const reviewsScrollRef = useRef<HTMLDivElement>(null);

  const headlines = [
    'Official Factory Rocket Chassis Dealer & Competition Supply',
    'Sprint Car Steering Assemblies: All 16 Verified & Reconciled',
    'In-House Roehrig Shock Dyno Revalving & Rebuilding in Hanover, PA',
    'Direct Trackside Delivery to Lincoln & Williams Grove Pit Gates',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % headlines.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const scrollReviews = (direction: 'left' | 'right') => {
    if (reviewsScrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      reviewsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Filter curated products for spotlight
  const steeringProducts = PRODUCTS.filter((p) => p.isSprintSteering).slice(0, 4);
  const featuredParts = PRODUCTS.slice(4, 8);

  const categoryBanners = [
    {
      id: 'sprint-cars',
      title: 'Sprint Cars Division',
      subtitle: '332+ Track Components',
      tag: '16/16 Reconciled Steering',
      desc: 'Top wings, front axles, birdcages, and all 16 KSE steering assemblies.',
      image: '/banners/sprint-cars-banner.jpg',
      cta: 'Explore Sprint Division',
    },
    {
      id: 'late-models',
      title: 'Dirt Late Models',
      subtitle: '563+ Chassis Components',
      tag: 'Factory Rocket Dealer',
      desc: 'XR1 & XR2 suspension brackets, 4-bar rods, spindles, and body panels.',
      image: '/banners/late-models-banner.jpg',
      cta: 'Explore Late Models',
    },
    {
      id: 'services',
      title: 'Shock Dyno & Revalving',
      subtitle: 'Roehrig 2VS Dyno Center',
      tag: '24 - 48hr Turnaround',
      desc: 'Computerized dyno curves, custom valving, and hauler/trailer repair.',
      image: '/banners/dyno-banner.jpg',
      cta: 'Book Dyno Service',
    },
    {
      id: 'rocket-tech',
      title: 'Rocket Tech & Sizing',
      subtitle: 'Interactive Matrix',
      tag: 'Digital Spec Guide',
      desc: 'Instant radius rod length calculator without post-order delays.',
      image: '/banners/rocket-tech-banner.jpg',
      cta: 'Open Sizing Matrix',
    },
  ];

  // Mechanical Aerodynamic Racing Speed Cards (Uiverse sliding flap mechanism)
  const mechSpeedCards: MechSpeedCardItem[] = [
    {
      id: 'sprint-410',
      title: '410 SPRINT DIVISION',
      subtitle: 'KSE & Maxwell Suspension',
      carType: 'sprint',
      rpm: '9,200 RPM REDLINE',
      spec: '900+ HP ALLOY V8',
      ctaText: 'Sprint Division',
      colorHex: '#1d4ed8',
      onClick: () => {
        setActivePage('sprint-cars');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'rocket-xr2',
      title: 'ROCKET XR2 CHASSIS',
      subtitle: 'Factory Dirt Late Model',
      carType: 'late-model',
      rpm: '8,800 RPM POWER',
      spec: 'LUCAS OIL SERIES',
      ctaText: 'Late Model Program',
      colorHex: '#dc2626',
      onClick: () => {
        setActivePage('late-models');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'dyno-service',
      title: 'ROEHRIG SHOCK DYNO',
      subtitle: '24-48hr Turnaround',
      carType: 'sprint',
      rpm: '100 IN/SEC VELOCITY',
      spec: 'BILLET REVALVING',
      ctaText: 'Book Dyno Service',
      colorHex: '#059669',
      onClick: () => {
        setActivePage('services');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'kse-steering',
      title: '16/16 KSE STEERING',
      subtitle: 'Reconciled Inventory',
      carType: 'sprint',
      rpm: 'ZERO BACKLASH',
      spec: '16/16 VERIFIED',
      ctaText: 'View 16 Boxes',
      colorHex: '#d97706',
      onClick: () => {
        setActivePage('sprint-cars');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
  ];

  // Client 3D Drivers with Uiverse Perspective Animation & Gradients
  const clientDrivers: ClientReview[] = [
    {
      id: 'driver-1',
      name: 'Tyler "T-Mac" McCreadie',
      carNumber: '#39',
      carBadge: '39',
      division: 'Dirt Late Model',
      track: 'Williams Grove Speedway',
      review: "When we bent a 4-bar rod during Friday heat races at Williams Grove, Pancho's had the exact Rocket replacement at the pit gate in 20 minutes. Saved our night and our championship points.",
      rating: 5,
      season: '2026 Season Competitor',
      gradient: 'linear-gradient(135deg, rgb(14, 165, 233) 0%, rgb(30, 64, 175) 100%)',
      accentColor: '#0284c7',
    },
    {
      id: 'driver-2',
      name: 'Derek Locke',
      carNumber: '#77',
      carBadge: '77',
      division: '410 Sprint Car',
      track: 'Lincoln Speedway',
      review: "The KSE steering box and Pancho's custom Roehrig shock curves gave us unmatched forward bite off turn 4 at Lincoln. Best shock dyno service and race setup knowledge in Central PA hands down.",
      rating: 5,
      season: 'Central PA Sprint Series',
      gradient: 'linear-gradient(135deg, rgb(16, 185, 129) 0%, rgb(5, 150, 105) 100%)',
      accentColor: '#059669',
    },
    {
      id: 'driver-3',
      name: 'Brett Schadel',
      carNumber: '#22',
      carBadge: '22',
      division: 'Super Late Model',
      track: 'Port Royal Speedway',
      review: "Their parts lookup and sizing matrix saves our crew hours every week. We know exactly what is on the shelf in Hanover before hitching the trailer. Zero backorders or surprise delays.",
      rating: 5,
      season: 'Lucas Oil Competitor',
      gradient: 'linear-gradient(135deg, rgb(239, 68, 68) 0%, rgb(185, 28, 28) 100%)',
      accentColor: '#dc2626',
    },
    {
      id: 'driver-4',
      name: 'Chase Dietz',
      carNumber: '#2D',
      carBadge: '2D',
      division: '410 Sprint Car',
      track: 'BAPS Motor Speedway',
      review: "Pancho's has been our team backbone for over a decade. From radius rods and birdcages to emergency trackside parts, they understand dirt racing because they live it every weekend.",
      rating: 5,
      season: 'PA Sprint Week Winner',
      gradient: 'linear-gradient(135deg, rgb(245, 158, 11) 0%, rgb(217, 119, 6) 100%)',
      accentColor: '#d97706',
    },
    {
      id: 'driver-5',
      name: 'Logan Wagner',
      carNumber: '#1',
      carBadge: '1',
      division: '410 Sprint Car',
      track: 'Port Royal Speedway',
      review: "In sprint car racing you cannot afford downtime. Pancho's 16/16 verified steering inventory and trackside trailer support keep us fast and competing for wins every single race night.",
      rating: 5,
      season: '5-Time Speed Palace Champ',
      gradient: 'linear-gradient(135deg, rgb(168, 85, 247) 0%, rgb(109, 40, 217) 100%)',
      accentColor: '#9333ea',
    },
  ];

  const trackSchedule = [
    { track: 'Williams Grove Speedway', day: 'Friday Nights', city: 'Mechanicsburg, PA', service: 'Pit Gate Dispatch' },
    { track: 'Lincoln Speedway', day: 'Saturday Nights', city: 'Abbottstown, PA', service: 'Trackside Parts Trailer' },
    { track: 'Port Royal Speedway', day: 'Special Events', city: 'Port Royal, PA', service: 'Pre-Order Courier' },
    { track: 'BAPS Motor Speedway', day: 'Sunday Evenings', city: 'York Haven, PA', service: 'Trackside Delivery' },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. CINEMATIC HERO SECTION: Merges under transparent navbar at top of page */}
      <section className="relative overflow-hidden bg-theme-surface border-b border-theme min-h-[620px] sm:min-h-[700px] flex items-center -mt-24 sm:-mt-28 pt-28 sm:pt-36">
        {/* Background Image with Ken Burns motion effect */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.img
            src="/banners/hero-banner.jpg"
            alt="Central PA Dirt Track Sprint & Late Model Racing"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
          />
          {/* Multi-layered gradient overlay ensuring high text readability in all themes */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/45 dark:from-black/95 dark:via-black/85 dark:to-black/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-transparent to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-white">
          <div className="max-w-3xl space-y-6">
            {/* Live Ticker Subhead */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/25 backdrop-blur-md border border-blue-400/30 text-blue-300 text-xs font-mono font-bold shadow-lg">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <motion.span
                key={tickerIndex}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {headlines[tickerIndex]}
              </motion.span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Proven Track Engineering. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
                Built for Victory Lane.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl font-normal drop-shadow-sm">
              Serving dirt late model, sprint car, and motorsport teams nationwide from our facility at <strong className="text-white font-semibold">1754 Carlisle Pike, Hanover, PA</strong>. Verified live inventory, shock dyno testing, and trackside trailer delivery.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => {
                  setActivePage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-racing-primary text-sm py-3.5 px-7 shadow-xl cursor-pointer bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-2"
              >
                <span>Browse Full 1,726+ Catalogue</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setActivePage('sprint-cars');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all cursor-pointer shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Sprint Steering (16/16 Reconciled)</span>
              </button>
            </div>
          </div>

          {/* Metric Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-8 border-t border-white/15">
            {CLIENT_INFO.verifiedStats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
                <div className="text-xs font-mono text-slate-300 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
                  <AnimatedStat value={stat.value} suffix={stat.suffix} decimals={stat.value % 1 !== 0 ? 1 : 0} />
                </div>
                <div className="text-[11px] font-mono text-emerald-400 mt-0.5 font-semibold">
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CATEGORY BANNERS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-theme-accent font-mono text-xs font-bold uppercase tracking-widest">
            Core Racing Departments
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-primary tracking-tight">
            Select Your Competition Category
          </h2>
          <p className="text-sm text-theme-secondary">
            Every division backed by verified fitments, inventory counts, and track support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoryBanners.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setActivePage(cat.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative rounded-2xl overflow-hidden border border-theme bg-theme-surface shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-72 sm:h-80 flex flex-col justify-end p-6 sm:p-8"
            >
              {/* Background Image with Hover Zoom Animation */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20 group-hover:via-black/50 transition-colors" />
              </div>

              {/* Card Content Overlay */}
              <div className="relative z-10 text-white space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-blue-600 text-white">
                    {cat.tag}
                  </span>
                  <span className="text-xs font-mono text-slate-300">
                    {cat.subtitle}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                  {cat.title}
                </h3>

                <p className="text-xs text-slate-200 line-clamp-2 max-w-md">
                  {cat.desc}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>{cat.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2.5. MECHANICAL RACING SPEED CARDS (UIVERSE SLIDING FLAPS WITH FULL SPEED CAR) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-mono font-bold mb-2">
              <Flame className="w-3.5 h-3.5 fill-current text-orange-500" />
              <span>Full-Throttle Mechanical Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-theme-primary tracking-tight font-heading">
              Competition Chassis Benchmarks
            </h2>
            <p className="text-xs sm:text-sm text-theme-secondary mt-0.5">
              Hover each mechanical card to lift the aerodynamic carbon hatch, slide open side wing panels, and unleash the race car inside.
            </p>
          </div>

          <button
            onClick={triggerCarSpeedAnimation}
            className="btn-racing-primary text-xs py-2.5 px-5 shadow-lg flex items-center gap-2 cursor-pointer bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 text-white font-bold"
          >
            <Flag className="w-4 h-4 fill-white text-emerald-950" />
            <span>Launch Green Flag Animation</span>
          </button>
        </div>

        {/* 4 Mechanical Speed Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {mechSpeedCards.map((item) => (
            <RacingMechSpeedCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 3. AUDIT RESOLUTION SHOWCASE (16/16 SPRINT STEERING) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="clean-card p-6 sm:p-10 border-2 border-emerald-500/30 bg-emerald-50/15 dark:bg-emerald-950/15">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-emerald-200/50 dark:border-emerald-800/40">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" /> Client Audit Issue Resolved
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-primary">
                Sprint Steering Catalogue: All 16 Products Reconciled
              </h2>
              <p className="text-xs sm:text-sm text-theme-secondary mt-1 max-w-2xl">
                The legacy WooCommerce store stated <em>"Showing all 16 results"</em> on the Steering page but only displayed 2 products. In our modernized prototype, all 16 steering boxes, half boxes, and brackets are live, indexed, and available for immediate checkout.
              </p>
            </div>

            <button
              onClick={() => {
                setActivePage('sprint-cars');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-racing-primary shrink-0 text-xs py-3 px-6 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
            >
              <span>View All 16 Steering Parts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grid of 4 Reconciled Steering Parts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {steeringProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. EXPANDED: ABOUT US & HANOVER PA SPEED SHOP HERITAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="clean-card p-8 sm:p-12 border border-theme bg-theme-surface">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-elevated border border-theme text-theme-accent text-xs font-mono font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Hanover, Pennsylvania • Central PA Speed Country</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-theme-primary tracking-tight leading-tight">
                31+ Years of Competition Speed. <br />
                <span className="text-theme-accent">From Local Dirt Tracks to National Podiums.</span>
              </h2>

              <p className="text-sm text-theme-secondary leading-relaxed">
                Founded in 1993 at <strong>1754 Carlisle Pike, Hanover, PA</strong>, Pancho's Racing Products was built on a simple philosophy: provide competitive dirt racers with the exact chassis parts, shock valving, and trackside support they need to win on Saturday nights.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-theme-elevated border border-theme space-y-1">
                  <div className="flex items-center gap-2 text-theme-primary font-bold text-sm">
                    <ShieldCheck className="w-4 h-4 text-theme-accent" />
                    <span>Official Rocket Dealer</span>
                  </div>
                  <p className="text-xs text-theme-secondary">
                    Direct factory distribution for Rocket XR1 & XR2 chassis, brackets, and replacement front ends.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-theme-elevated border border-theme space-y-1">
                  <div className="flex items-center gap-2 text-theme-primary font-bold text-sm">
                    <Wrench className="w-4 h-4 text-theme-accent" />
                    <span>Roehrig Dyno Center</span>
                  </div>
                  <p className="text-xs text-theme-secondary">
                    In-house computer dyno analysis, custom velocity curves, and precision rebuilds within 48 hours.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-theme-elevated border border-theme space-y-1">
                  <div className="flex items-center gap-2 text-theme-primary font-bold text-sm">
                    <Truck className="w-4 h-4 text-theme-accent" />
                    <span>Trackside Fulfillment</span>
                  </div>
                  <p className="text-xs text-theme-secondary">
                    Weekly delivery straight to pit gates at Lincoln Speedway, Williams Grove, and Port Royal.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-theme-elevated border border-theme space-y-1">
                  <div className="flex items-center gap-2 text-theme-primary font-bold text-sm">
                    <Award className="w-4 h-4 text-theme-accent" />
                    <span>Racers Serving Racers</span>
                  </div>
                  <p className="text-xs text-theme-secondary">
                    Over three decades of race-winning knowledge with honest advice on setup and sizing.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => {
                    setActivePage('about-us');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="btn-racing-primary text-xs py-3 px-6 cursor-pointer"
                >
                  <span>Read Full Heritage & Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={`tel:${CLIENT_INFO.phone}`}
                  className="btn-racing-secondary text-xs py-3 px-6 cursor-pointer"
                >
                  Call Speed Shop: {CLIENT_INFO.phone}
                </a>
              </div>
            </div>

            {/* Right: Showroom Banner Image */}
            <div className="relative rounded-2xl overflow-hidden border border-theme shadow-lg group">
              <img
                src="/banners/parts-banner.jpg"
                alt="Pancho's Racing Products Precision Warehouse"
                className="w-full h-[400px] object-cover object-center group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-[10px] font-mono uppercase bg-blue-600 px-2.5 py-1 rounded font-bold">
                  Speed Shop HQ • Hanover, PA
                </span>
                <h4 className="text-lg font-bold text-white mt-2">
                  1,726+ Race-Ready Parts on the Shelves
                </h4>
                <p className="text-xs text-slate-200 mt-0.5">
                  Full stock of Wilwood brakes, KSE steering boxes, titanium rods, and Aero wheels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. UIVERSE.IO 3D CLIENT DRIVER CARDS: ONE SINGLE HORIZONTAL LINE AS REQUESTED */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono font-bold mb-2">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>4.9 / 5.0 Rating Across 480+ Central PA Race Teams</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-theme-primary tracking-tight">
              Central PA Champions & Reviews
            </h2>
            <p className="text-xs sm:text-sm text-theme-secondary mt-0.5">
              Interactive 3D driver cards. Hover each card to experience multi-layer perspective depth.
            </p>
          </div>

          {/* Single-line Navigation Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => scrollReviews('left')}
              className="p-2.5 rounded-xl border border-theme bg-theme-surface hover:bg-theme-elevated text-theme-primary transition-all cursor-pointer shadow-xs hover:border-theme-accent"
              title="Scroll left"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollReviews('right')}
              className="p-2.5 rounded-xl border border-theme bg-theme-surface hover:bg-theme-elevated text-theme-primary transition-all cursor-pointer shadow-xs hover:border-theme-accent"
              title="Scroll right"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Single Horizontal Line of 3D Cards */}
        <div className="relative">
          <div
            ref={reviewsScrollRef}
            className="flex items-center gap-6 overflow-x-auto pb-12 pt-4 px-2 snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {clientDrivers.map((client) => (
              <div key={client.id} className="snap-start shrink-0">
                <Client3DCard client={client} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TRACKSIDE SCHEDULE & COURIER DISPATCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="clean-card p-6 sm:p-8 border border-theme bg-theme-elevated">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-theme">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-theme-accent uppercase tracking-wider">
                <Calendar className="w-3.5 h-3.5" /> Trackside Weekend Schedule
              </div>
              <h3 className="text-xl font-bold text-theme-primary mt-1">
                Direct Pit Delivery to Central PA Speedways
              </h3>
              <p className="text-xs text-theme-secondary mt-0.5">
                Need parts at the track this weekend? Order before 3:00 PM Friday for direct trailer delivery.
              </p>
            </div>
            <a
              href={`tel:${CLIENT_INFO.phone}`}
              className="btn-racing-primary text-xs py-2.5 px-5 cursor-pointer shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call For Weekend Track Drop: {CLIENT_INFO.phone}</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {trackSchedule.map((ts, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-theme-surface border border-theme space-y-1">
                <span className="text-[10px] font-mono font-bold text-theme-accent uppercase block">
                  {ts.day}
                </span>
                <div className="text-sm font-bold text-theme-primary">
                  {ts.track}
                </div>
                <div className="text-[11px] text-theme-muted">
                  {ts.city}
                </div>
                <div className="text-[11px] font-mono text-emerald-600 font-semibold pt-1">
                  ✓ {ts.service}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CURATED FEATURED RACE READY PARTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-theme-accent font-mono text-xs font-bold uppercase tracking-widest">
              Verified Track Stock
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-primary mt-1">
              Trending Race Ready Components
            </h2>
          </div>
          <button
            onClick={() => {
              setActivePage('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-theme-accent hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All 1,726+ in Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredParts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};
