import React, { useState } from 'react';
import {
  Truck,
  ShieldCheck,
  Check,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Info,
  Sliders,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { CLIENT_INFO } from '../data/siteData';
import { useCart } from '../context/CartContext';

interface TrailerListing {
  id: string;
  title: string;
  year: number;
  make: string;
  category: 'totorhome' | 'gooseneck' | 'stacker' | 'enclosed';
  price: string;
  rawPrice: number;
  status: 'In Stock' | 'Pending Sale' | 'Custom Order';
  location: string;
  specs: {
    length: string;
    engine?: string;
    generator: string;
    baths?: string;
    axles: string;
    capacity: string;
    hitch: string;
  };
  features: string[];
  description: string;
  image: string;
  gallery: string[];
}

export const TrailersPage: React.FC = () => {
  const { setActivePage } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTrailer, setSelectedTrailer] = useState<TrailerListing | null>(null);

  const listings: TrailerListing[] = [
    {
      id: 'renegade-2007',
      title: '2007 Renegade Totorhome Heavy Duty Racing Transporter',
      year: 2007,
      make: 'Renegade',
      category: 'totorhome',
      price: '$139,995',
      rawPrice: 139995,
      status: 'In Stock',
      location: '1754 Carlisle Pike, Hanover, PA',
      specs: {
        length: '38 ft Living + Tow Deck',
        engine: 'Mercedes-Benz MBE 4000 Turbo Diesel (450 HP)',
        generator: 'Onan 12.5 kW Quiet Diesel',
        baths: 'Full Stand-Up Shower & Private Head',
        axles: 'Tandem Heavy Duty Air Ride',
        capacity: '40,000 lbs GCWR',
        hitch: '30,000 lb Tag Hitch + Gooseneck Ball',
      },
      features: [
        'Dual Hydraulic Slide-Outs with Awning Covers',
        'Custom Oak Cabinetry & Leather Dinette Seating',
        'Full Kitchen with Convection Microwave & Domestic Refrigerator',
        'Dual Low-Profile 15,000 BTU Ducted A/C Units',
        'In-Motion Satellite Dish & Dual Flat Screen HDTVs',
        'Massive Exterior Storage Bays for Fuel Cans & Spares',
        'Exterior Halogen Pit Light Package for Night Events',
      ],
      description:
        'Original Hanover speed shop hauler. Superbly maintained 2007 Renegade Totorhome built on heavy-duty chassis. Ideal for national touring dirt late model or sprint car programs seeking complete self-contained comfort at Williams Grove, Eldora, and Knoxville.',
      image: 'https://images.unsplash.com/photo-1513311068348-19c8fbdc0bb6?auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1513311068348-19c8fbdc0bb6?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      id: 'united-44-2023',
      title: '2023 United 44′ Gooseneck Bathroom & Tire Rack Package',
      year: 2023,
      make: 'United Trailers',
      category: 'gooseneck',
      price: '$44,995',
      rawPrice: 44995,
      status: 'In Stock',
      location: '1754 Carlisle Pike, Hanover, PA',
      specs: {
        length: '44 ft Total (36 ft Floor + 8 ft Bunk)',
        generator: 'Dedicated Generator Compartment with Slide Tray',
        baths: 'Complete Bathroom Package (Toilet, Sink, Holding Tanks)',
        axles: 'Triple 7,000 lb Dexter Torsion Axles with Electric Brakes',
        capacity: '21,000 lbs GVWR',
        hitch: 'Heavy-Duty 2-5/16" Gooseneck Coupler',
      },
      features: [
        'Insulated White Vinyl Ceiling & Aluminum Walls',
        'Built-in Fold-Down Sprint Car Wing Hanging Racks',
        'Overhead Cabinets & Pit Pal Fuel Jug Station',
        'Heavy-Duty Coin Rubber Flooring with Recessed D-Rings',
        'Hydraulic Landing Gear Jack with Remote Controller',
        '110V 50-Amp Electrical Service with Exterior GFI Outlets',
        'Escape Door with Removable Wheel Well Fender',
      ],
      description:
        'Race-ready 2023 United 44-foot Gooseneck featuring full bathroom package and sprint/late model storage layout. Built to transport two race cars with complete work bay and sleeping quarters in the upper bunk.',
      image: 'https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      id: 'stacker-34-custom',
      title: '2024 Bravo 34′ Stacker Trailer Dual Sprint Car Transporter',
      year: 2024,
      make: 'Bravo Trailers',
      category: 'stacker',
      price: '$68,500',
      rawPrice: 68500,
      status: 'In Stock',
      location: '1754 Carlisle Pike, Hanover, PA',
      specs: {
        length: '34 ft Tag Stacker',
        generator: 'Pre-Wired 50A Shoreline + Generator Compartment',
        axles: 'Triple 8,000 lb Torsion Axles on 17.5" Aluminum Wheels',
        capacity: '24,000 lbs GVWR',
        hitch: 'Heavy-Duty Pintle or 2-5/16" Heavy Ball Coupler',
      },
      features: [
        'Full 14-ft Hydraulic Stacker Lift with Removable Center Inserts',
        'Upper Mezzanine Storage for Wings, Top Axles, and 4-Bars',
        'Dual Side RV Doors with Pull-Out Aluminum Steps',
        'Integrated Tire Racks holding up to 24 Hoosier Dirt Tires',
        'High-Output LED Ceiling Strip Lighting throughout',
        'Air Line Run Thru-Wall with Dual Disconnects',
      ],
      description:
        'Maximum hauling efficiency in a 34-foot footprint. Carries two full 410 sprint cars with spare top wings, rear ends, and complete crew toolboxes.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      ],
    },
    {
      id: 'enclosed-28-tag',
      title: '2025 Pace American 28′ Pursuit Enclosed Race Trailer',
      year: 2025,
      make: 'Pace American',
      category: 'enclosed',
      price: '$22,950',
      rawPrice: 22950,
      status: 'In Stock',
      location: '1754 Carlisle Pike, Hanover, PA',
      specs: {
        length: '28 ft Floor',
        generator: 'Tongue-Mount Generator Tray',
        axles: 'Tandem 5,200 lb Torsion Axles with EZ-Lube Hubs',
        capacity: '9,990 lbs GVWR',
        hitch: '2-5/16" A-Frame Coupler',
      },
      features: [
        'Blackout Racing Package with Alloy Wheels',
        'Rubber Tred Flooring with 4 Recessed Heavy 5K D-Rings',
        'Front Base and Overhead Aluminum Tool Cabinets',
        'Side Door with Flush Lock and Bar Lock Backup',
        'Spring Assist Heavy Duty Rear Ramp Door with Transition Flap',
      ],
      description:
        'The perfect weekend warrior hauler for regional Central PA competitors. Easily fits one full dirt late model or sprint car with generous pit workbench clearance.',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      ],
    },
  ];

  const filteredListings =
    selectedCategory === 'all'
      ? listings
      : listings.filter((item) => item.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. HERO BANNER */}
      <div className="relative rounded-2xl overflow-hidden border border-theme shadow-xl min-h-[300px] flex items-center p-8 sm:p-12 text-white bg-slate-950">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1513311068348-19c8fbdc0bb6?auto=format&fit=crop&w=1400&q=80"
            alt="Trailers and Motorhomes For Sale"
            className="w-full h-full object-cover object-center filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/40" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-600/30 backdrop-blur-md border border-blue-400/40 text-blue-300 text-xs font-mono font-bold">
            <Truck className="w-3.5 h-3.5" />
            <span>Official Pancho's Hauler & Transporter Division</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight font-heading">
            Trailers & Motorhomes For Sale
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
            New & pre-owned racing transporters, Renegade totorhomes, 44′ goosenecks, and stacker haulers inspected on-site at <strong className="text-white">1754 Carlisle Pike, Hanover, PA</strong>. Complete with in-house maintenance, hitch installation, and generator servicing.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`tel:${CLIENT_INFO.phone}`}
              className="btn-racing-primary text-xs py-3 px-6 cursor-pointer flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Inquire on Haulers: {CLIENT_INFO.phone}</span>
            </a>
            <button
              onClick={() => setActivePage('services')}
              className="btn-racing-secondary text-xs py-3 px-6 cursor-pointer text-white border-white/20 hover:bg-white/10"
            >
              Trailer & RV Repair Services →
            </button>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY FILTER TABS */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-theme">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Transporters' },
            { id: 'totorhome', label: 'Totorhomes' },
            { id: 'gooseneck', label: 'Gooseneck Trailers' },
            { id: 'stacker', label: 'Stackers' },
            { id: 'enclosed', label: 'Enclosed Tags' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-theme-accent text-white shadow-md'
                  : 'bg-theme-elevated text-theme-secondary hover:text-theme-primary border border-theme'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-theme-muted">
          Showing {filteredListings.length} Available Hauler Units in Hanover, PA
        </div>
      </div>

      {/* 3. LISTINGS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredListings.map((listing) => (
          <div
            key={listing.id}
            className="clean-card rounded-2xl overflow-hidden border border-theme bg-theme-surface shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image & Price Banner */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900 group">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-blue-600 text-white font-mono text-xs font-bold shadow-md uppercase">
                    {listing.make}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white font-mono text-xs font-bold shadow-md">
                    {listing.status}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <span className="text-[11px] font-mono text-slate-300 uppercase block">
                      {listing.year} Model • {listing.specs.length}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
                      {listing.price}
                    </h3>
                  </div>

                  <span className="text-[11px] font-mono bg-white/20 backdrop-blur-md px-2.5 py-1 rounded border border-white/20">
                    Verified Clean Title
                  </span>
                </div>
              </div>

              {/* Specs & Description */}
              <div className="p-6 space-y-4">
                <h4 className="text-base sm:text-lg font-bold text-theme-primary line-clamp-2">
                  {listing.title}
                </h4>

                <p className="text-xs text-theme-secondary leading-relaxed">
                  {listing.description}
                </p>

                {/* Technical Quick Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-2 border-y border-theme text-xs font-mono">
                  <div className="p-2 rounded bg-theme-elevated border border-theme">
                    <span className="text-[10px] text-theme-muted uppercase block">Axles</span>
                    <span className="font-bold text-theme-primary line-clamp-1">{listing.specs.axles}</span>
                  </div>
                  <div className="p-2 rounded bg-theme-elevated border border-theme">
                    <span className="text-[10px] text-theme-muted uppercase block">Generator</span>
                    <span className="font-bold text-theme-primary line-clamp-1">{listing.specs.generator}</span>
                  </div>
                  <div className="p-2 rounded bg-theme-elevated border border-theme">
                    <span className="text-[10px] text-theme-muted uppercase block">Capacity</span>
                    <span className="font-bold text-theme-primary line-clamp-1">{listing.specs.capacity}</span>
                  </div>
                </div>

                {/* Key Racing Features */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-mono text-theme-muted uppercase font-bold block">
                    Equipped Outfitting:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {listing.features.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-theme-secondary">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="line-clamp-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 flex flex-wrap items-center justify-between gap-3 border-t border-theme/50 mt-4">
              <div className="flex items-center gap-1.5 text-xs font-mono text-theme-muted">
                <MapPin className="w-3.5 h-3.5 text-theme-accent" />
                <span>On-Site in Hanover, PA</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${CLIENT_INFO.phone}`}
                  className="btn-racing-primary text-xs py-2 px-4 flex items-center gap-1.5 cursor-pointer"
                >
                  <Phone className="w-3 h-3" />
                  <span>Call to View</span>
                </a>
                <button
                  onClick={() => setActivePage('contacts')}
                  className="btn-racing-secondary text-xs py-2 px-4 cursor-pointer"
                >
                  Schedule Inspection
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. TRAILER INVENTORY SERVICES PROMISE */}
      <div className="clean-card p-8 rounded-2xl border border-theme bg-theme-elevated">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-theme-primary font-bold">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>Full Safety Certification</span>
            </div>
            <p className="text-xs text-theme-secondary leading-relaxed">
              Every totorhome and trailer sold by Pancho's receives a complete mechanical inspection including wheel bearings, electric brakes, breakaways, tires, and lighting.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-theme-primary font-bold">
              <Truck className="w-5 h-5 text-blue-500" />
              <span>Custom Racing Outfitting</span>
            </div>
            <p className="text-xs text-theme-secondary leading-relaxed">
              Need extra sprint car wing hangers, fuel jug holders, or air compressor lines installed before pickup? Our Hanover fabrication shop completes custom fitments in-house.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-theme-primary font-bold">
              <DollarSign className="w-5 h-5 text-amber-500" />
              <span>Trades & Delivery Available</span>
            </div>
            <p className="text-xs text-theme-secondary leading-relaxed">
              We welcome race trailer trade-ins and offer nationwide delivery or trackside trailer drops to Williams Grove, Lincoln, and Port Royal pit gates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
