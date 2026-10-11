import React from 'react';
import {
  Award,
  ShieldCheck,
  MapPin,
  Phone,
  Mail,
  Clock,
  Wrench,
  Truck,
  CheckCircle2,
  Calendar,
  Flame,
  Star,
  Users,
  Compass,
  Zap,
  ArrowRight,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { CLIENT_INFO } from '../data/siteData';
import { useCart } from '../context/CartContext';

export const AboutPage: React.FC = () => {
  const { setActivePage, triggerCarSpeedAnimation } = useCart();

  const milestones = [
    {
      year: '1993',
      title: 'Foundation in Hanover, PA',
      desc: 'Founded by racers at 1754 Carlisle Pike, Hanover, PA, dedicated to serving Central PA sprint car and dirt late model competitors with real trackside parts.',
    },
    {
      year: '1999',
      title: 'KSE & Allstar Performance Partnership',
      desc: 'Became the regional direct distributor for KSE Racing Products steering boxes and Allstar Performance track essentials.',
    },
    {
      year: '2004',
      title: 'Roehrig 2VS Shock Dyno Lab Installed',
      desc: 'Invested in computerized Roehrig dynamometer testing equipment to engineer custom valving curves for local slick and heavy clay tracks.',
    },
    {
      year: '2011',
      title: 'Official Factory Rocket Chassis Dealer',
      desc: 'Designated as an authorized factory Rocket Chassis distributor for XR1 and XR2 late models, stocking complete front ends and replacement clips.',
    },
    {
      year: '2018',
      title: 'Commercial Trailer & Totorhome Service Bay',
      desc: 'Expanded facility to include 50-ft indoor service bays for racing haulers, Renegade totorhomes, gooseneck trailers, and auxiliary wiring.',
    },
    {
      year: '2026',
      title: 'Next-Gen Reconciled Digital Flagship',
      desc: 'Reconciled all 16 sprint steering assemblies, modernized online ordering with interactive sizing calculators, and established live weekend pit gate couriers.',
    },
  ];

  const pillars = [
    {
      title: 'Racers Serving Racers',
      desc: 'Our staff spends Friday and Saturday nights in the pits at Lincoln, Williams Grove, and Port Royal. We understand chassis balance, stagger, and shock valving because we live it every week.',
      icon: Users,
      color: '#1d4ed8',
    },
    {
      title: 'The 16/16 Precision Promise',
      desc: 'No ghost products or missing inventory. Every single SKU listed in our catalogue is physically counted, verified on shelf in Hanover, and backed by guaranteed fitment.',
      icon: ShieldCheck,
      color: '#059669',
    },
    {
      title: 'Computerized Shock Dyno Physics',
      desc: 'We never guess at damping. Our in-house Roehrig dyno measures velocity curves down to the hundredth of an inch per second, tailoring compression and rebound to your car balance.',
      icon: Wrench,
      color: '#dc2626',
    },
    {
      title: 'Weekend Trackside Dispatch',
      desc: 'Broke a 4-bar rod or need a spare steering box before heat races? Our trailer runners dispatch emergency pre-orders directly to track pit gates across Central Pennsylvania.',
      icon: Truck,
      color: '#d97706',
    },
  ];

  const facilities = [
    {
      title: 'Hanover Speed Shop Showroom',
      desc: 'Full retail counter stocked with Wilwood brakes, KSE steering boxes, titanium radius rods, Simpson safety suits, Aero wheels, and high-performance hardware.',
      image: '/banners/parts-banner.jpg',
      badge: 'Main HQ Showroom',
    },
    {
      title: 'Roehrig Computerized Shock Center',
      desc: 'State-of-the-art dynamometer testing bay with nitrogen charging tanks, velocity curve software, and custom valve shim libraries for dirt competition.',
      image: '/banners/dyno-banner.jpg',
      badge: '24 - 48hr Dyno Lab',
    },
    {
      title: 'Rocket Chassis Competition Bay',
      desc: 'Dedicated late model chassis assembly center featuring XR1 and XR2 suspension brackets, tubular chrome-moly clips, and factory geometry jigs.',
      image: '/banners/late-models-banner.jpg',
      badge: 'Official Factory Dealer',
    },
    {
      title: 'Hauler & Trailer Repair Bays',
      desc: 'Spacious heavy-duty service bays equipped for axle alignments, electric brake overhauls, hydraulic jack repairs, and custom sprint car wing hanging installations.',
      image: '/banners/hero-banner.jpg',
      badge: 'Heavy Hauler Bays',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* 1. CINEMATIC HERO BANNER */}
      <div className="relative rounded-2xl overflow-hidden border border-theme shadow-2xl min-h-[380px] sm:min-h-[440px] flex items-center p-8 sm:p-14 text-white bg-slate-950">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/banners/parts-banner.jpg"
            alt="Pancho's Racing Products Speed Shop"
            className="w-full h-full object-cover object-center filter brightness-75 contrast-115 scale-102"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/30 backdrop-blur-md border border-blue-400/40 text-blue-300 text-xs font-mono font-bold shadow-lg">
            <Award className="w-4 h-4 text-amber-400" />
            <span>ESTABLISHED 1993 • HANOVER, PA • 31+ YEARS IN CENTRAL PA SPEED COUNTRY</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08] font-heading">
            Dedicated to Victory Lane. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-amber-300">
              Built on Dirt Track Heritage.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal max-w-2xl">
            For more than three decades, Pancho’s Racing Products has served as the backbone of competitive sprint car and dirt late model programs throughout Central Pennsylvania and across the United States from our headquarters at <strong className="text-white">1754 Carlisle Pike, Hanover, PA</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-racing-primary text-xs py-3 px-6 shadow-xl flex items-center gap-2 cursor-pointer"
            >
              <span>Explore 1,726+ Catalogue Parts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a
              href={`tel:${CLIENT_INFO.phone}`}
              className="btn-racing-secondary text-xs py-3 px-6 cursor-pointer text-white border-white/20 hover:bg-white/10"
            >
              Call the Speed Shop: {CLIENT_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* 2. NUMERICAL CREDIBILITY HIGHLIGHTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Years of Operation', value: '31+', sub: 'Founded in 1993' },
          { label: 'In-Stock Track SKUs', value: '1,726+', sub: 'Live Shelf Inventory' },
          { label: 'Sprint Steering Reconciled', value: '16 / 16', sub: 'Zero Missing Products' },
          { label: 'Regional Track Gate Dispatch', value: '4 Tracks', sub: 'Lincoln, Grove, Port, BAPS' },
        ].map((stat, idx) => (
          <div key={idx} className="clean-card p-6 rounded-2xl border border-theme bg-theme-surface space-y-1">
            <span className="text-[11px] font-mono text-theme-muted uppercase tracking-wider block">
              {stat.label}
            </span>
            <div className="text-3xl sm:text-4xl font-black text-theme-primary font-heading">
              {stat.value}
            </div>
            <span className="text-xs text-theme-accent font-semibold block pt-0.5">
              {stat.sub}
            </span>
          </div>
        ))}
      </div>

      {/* 3. FOUNDER STORY & THE HANOVER HERITAGE */}
      <div className="clean-card p-8 sm:p-12 rounded-2xl border border-theme bg-theme-surface">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-theme-accent tracking-wider">
              <Compass className="w-4 h-4" />
              <span>The Pancho's Story</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-theme-primary tracking-tight font-heading leading-tight">
              From Local Pit Stall Passion to Central PA’s Most Trusted Racing Hub
            </h2>

            <div className="space-y-4 text-sm text-theme-secondary leading-relaxed">
              <p>
                In 1993, Pancho set out to solve a persistent frustration shared by dirt track competitors across Central Pennsylvania: parts counters that were disconnected from the reality of race night. Drivers were tired of inaccurate catalog listings, missing steering boxes, and generic advice from clerks who had never touched a 410 sprint car or a four-link suspension bar.
              </p>
              <p>
                Opening our doors at <strong>1754 Carlisle Pike, Hanover, PA</strong>, Pancho’s Racing Products established a standard that has endured for over 31 years: <em>if we sell it, we know how to bolt it on, valve it, and win with it</em>.
              </p>
              <p>
                Today, our facility encompasses full inventory warehousing for major motorsport manufacturers, an in-house Roehrig computer shock dynamometer testing lab, heavy hauler and motorhome repair bays, and direct trackside courier vehicles that travel to Lincoln Speedway, Williams Grove Speedway, Port Royal Speedway, and BAPS Motor Speedway every weekend.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-theme-elevated border border-theme">
                <span className="font-bold text-theme-primary text-sm block">Pancho</span>
                <span className="text-xs text-theme-muted font-mono">Founder & Master Chassis Builder</span>
              </div>
              <div className="p-3 rounded-xl bg-theme-elevated border border-theme">
                <span className="font-bold text-theme-primary text-sm block">Hanover, PA</span>
                <span className="text-xs text-theme-muted font-mono">Central PA Speed Country</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-theme shadow-xl group">
              <img
                src="/banners/parts-banner.jpg"
                alt="Pancho's Racing Warehouse Showroom"
                className="w-full h-[440px] object-cover object-center group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-[10px] font-mono uppercase bg-blue-600 px-2 py-0.5 rounded font-bold">
                  1754 Carlisle Pike, Hanover, PA
                </span>
                <h4 className="text-lg font-bold text-white">Full On-Shelf Warehousing</h4>
                <p className="text-xs text-slate-200">
                  Over 1,726+ race-ready parts inspected, inventoried, and ready for pickup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. THE 4 PILLARS OF COMPETITION */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-theme-accent font-mono text-xs font-bold uppercase tracking-widest">
            Core Racing Standards
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-theme-primary tracking-tight font-heading">
            How We Support Drivers on Saturday Night
          </h2>
          <p className="text-xs sm:text-sm text-theme-secondary">
            Our reputation was built on honest advice, accurate inventory, and uncompromised craftsmanship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="clean-card p-8 rounded-2xl border border-theme bg-theme-surface space-y-3 relative overflow-hidden"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white mb-2 shadow-md"
                  style={{ backgroundColor: pillar.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-theme-primary font-heading">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. INTERACTIVE TIMELINE: 31+ YEARS OF SPEED */}
      <div className="clean-card p-8 sm:p-12 rounded-2xl border border-theme bg-theme-elevated space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-theme-accent tracking-wider">
            <Calendar className="w-4 h-4" />
            <span>Evolution of Pancho's Racing Products</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-theme-primary font-heading">
            31+ Years of Innovation (1993 - 2026)
          </h2>
          <p className="text-xs sm:text-sm text-theme-secondary">
            Key milestones that shaped our speed shop into an essential fixture of Central PA dirt racing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-theme-surface border border-theme space-y-2.5 relative"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-black font-mono text-theme-accent">
                  {m.year}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-theme-accent/60" />
              </div>
              <h4 className="font-bold text-sm text-theme-primary">
                {m.title}
              </h4>
              <p className="text-xs text-theme-secondary leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. FACILITY & CAPABILITIES TOUR */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-theme-accent font-mono text-xs font-bold uppercase tracking-widest">
            Hanover, PA Facilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-theme-primary tracking-tight font-heading">
            Inside Our 1754 Carlisle Pike Facility
          </h2>
          <p className="text-xs sm:text-sm text-theme-secondary">
            From computer shock dynamometers to heavy hauler bays, explore our on-site capabilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="clean-card rounded-2xl overflow-hidden border border-theme bg-theme-surface shadow-md group"
            >
              <div className="relative h-60 overflow-hidden bg-slate-900">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-blue-600 text-white font-mono text-xs font-bold shadow-md">
                  {fac.badge}
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-base font-bold text-theme-primary font-heading">
                  {fac.title}
                </h3>
                <p className="text-xs text-theme-secondary leading-relaxed">
                  {fac.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. OFFICIAL BRAND AFFILIATIONS */}
      <div className="clean-card p-8 rounded-2xl border border-theme bg-theme-elevated text-center space-y-6">
        <span className="text-xs font-mono font-bold uppercase text-theme-accent tracking-widest block">
          Authorized Direct Factory Stocking Partner
        </span>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 opacity-80">
          {[
            'ROCKET CHASSIS',
            'KSE RACING PRODUCTS',
            'WILWOOD BRAKES',
            'ROEHRIG SHOCK DYNOS',
            'ALLSTAR PERFORMANCE',
            'WINTERS PERFORMANCE',
            'SUNOCO RACE FUELS',
            'AERO RACE WHEELS',
            'SIMPSON MOTORSPORTS',
            'BMRS HOSES & FITTINGS',
          ].map((brand, i) => (
            <span
              key={i}
              className="px-4 py-2 rounded-xl bg-theme-surface border border-theme font-mono font-black text-xs text-theme-primary uppercase tracking-wider shadow-2xs"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>

      {/* 8. VISIT & CONTACT BANNER */}
      <div className="clean-card p-8 sm:p-12 rounded-2xl border-2 border-theme-accent/30 bg-gradient-to-br from-theme-elevated to-theme-surface flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-theme-accent uppercase">
            <MapPin className="w-4 h-4" />
            <span>Visit the Speed Shop Counter</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-theme-primary font-heading">
            Need Expert Advice or Trackside Parts This Weekend?
          </h3>
          <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
            Stop by our counter at <strong>1754 Carlisle Pike, Hanover, PA 17331</strong> or call our technical line to discuss radius rod lengths, shock valving curves, or trailer drops.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={`tel:${CLIENT_INFO.phone}`}
            className="btn-racing-primary text-xs py-3 px-6 cursor-pointer flex items-center justify-center gap-2 shadow-lg"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call {CLIENT_INFO.phone}</span>
          </a>
          <button
            onClick={() => {
              setActivePage('contacts');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-racing-secondary text-xs py-3 px-6 cursor-pointer"
          >
            Directions & Hours →
          </button>
        </div>
      </div>
    </div>
  );
};
