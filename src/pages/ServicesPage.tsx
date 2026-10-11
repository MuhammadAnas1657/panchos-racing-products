import React, { useState } from 'react';
import { Wrench, Truck, Flame, CheckCircle, Send, Phone } from 'lucide-react';
import { CLIENT_INFO } from '../data/siteData';

export const ServicesPage: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [serviceType, setServiceType] = useState('shock-dyno');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    chassisType: '',
    details: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', phone: '', email: '', chassisType: '', details: '' });
    }, 4000);
  };

  const services = [
    {
      id: 'shock-dyno',
      title: 'Roehrig Shock Dyno & Rebuilding',
      icon: Wrench,
      price: 'From $65 / Shock',
      desc: 'Complete ultrasonic cleaning, seal replacement, custom valve curve stack tuning, and dyno graphing on our computerized Roehrig dynamometer.',
      features: [
        'Dyno sheet supplied with every rebuilt shock',
        'Ohlins, Integra, Fox, Penske, and Bilstein support',
        '24-48 hour turnaround during race season',
        'Trackside valve code recommendations',
      ],
    },
    {
      id: 'trailer-repair',
      title: 'Hauler, Motorhome, RV, & Trailer Service',
      icon: Truck,
      price: 'Shop Estimate',
      desc: 'Full-service maintenance for race car haulers, stacking trailers, motorhomes, and totorhomes at our Carlisle Pike facility in Hanover, PA.',
      features: [
        'Brake controller, axle, and wheel bearing service',
        'Generator & auxiliary 12V/110V electrical wiring',
        'Hydraulic liftgate and ramp door reinforcement',
        'Winch, awning, and pit cabinet installations',
      ],
    },
    {
      id: 'welding',
      title: 'Chassis Straightening & TIG Welding',
      icon: Flame,
      price: 'Hourly Rate',
      desc: 'Precision chrome-moly and aluminum TIG / MIG welding. Frame clip replacement, shock tower fabrication, bumper repair, and custom bracketry.',
      features: [
        '4130 Chrome-moly frame clip replacements',
        'Aluminum tank, ducting, and radiator repairs',
        'Sprint car front axle and birdcage tab welding',
        'Post-crash alignment inspection',
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Cinematic AI Banner Header */}
      <div className="relative rounded-2xl overflow-hidden border border-theme shadow-lg min-h-[260px] flex items-center p-8 sm:p-12 text-white">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            src="/banners/dyno-banner.jpg"
            alt="Roehrig Shock Dyno Facility"
            className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/35" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/30 backdrop-blur-md border border-blue-400/40 text-blue-300 text-xs font-mono font-bold">
            <Wrench className="w-3.5 h-3.5" /> Roehrig 2VS Dyno Center • Hanover, PA Speed Facility
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Performance Services & Repair
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            From our Hanover speed shop, Pancho's provides computerized shock dyno revalving, race hauler & RV maintenance, and precision chrome-moly TIG welding for championship dirt teams.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {services.map((svc) => {
          const Icon = svc.icon;
          return (
            <div
              key={svc.id}
              className="clean-card p-6 sm:p-8 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    {svc.price}
                  </span>
                </div>

                <h3 className="font-bold text-lg text-theme-primary">
                  {svc.title}
                </h3>
                <p className="text-xs text-theme-secondary leading-relaxed">
                  {svc.desc}
                </p>

                <ul className="space-y-2 pt-2 border-t border-theme text-xs font-mono text-theme-secondary">
                  {svc.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-theme">
                <button
                  type="button"
                  onClick={() => {
                    setServiceType(svc.id);
                    const el = document.getElementById('service-form');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full btn-racing-secondary text-xs py-2.5 cursor-pointer"
                >
                  Request Service Booking
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Form */}
      <div id="service-form" className="clean-card p-8 sm:p-10 rounded-2xl border border-theme bg-theme-surface scroll-mt-24">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-blue-600 font-mono text-xs font-bold uppercase tracking-wider">
              Hanover Shop Intake
            </span>
            <h2 className="text-2xl font-bold text-theme-primary">
              Book a Service or Dyno Test
            </h2>
            <p className="text-xs text-theme-secondary">
              Our tech team reviews intakes daily. You will receive immediate drop-off and shipping instructions.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-lg text-theme-primary">
                Service Request Submitted
              </h4>
              <p className="text-xs font-mono text-theme-secondary max-w-md mx-auto">
                Ticket <strong className="text-blue-600">#SR-{(Math.random() * 8000 + 1000).toFixed(0)}</strong> logged. Our staff will contact you at {formData.phone || formData.email || CLIENT_INFO.phone}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-theme-secondary mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Mike Miller"
                    className="w-full px-3 py-2 rounded-lg bg-theme-elevated border border-theme text-theme-primary focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-theme-secondary mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(717) 555-0199"
                    className="w-full px-3 py-2 rounded-lg bg-theme-elevated border border-theme text-theme-primary focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-theme-secondary mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="team@example.com"
                    className="w-full px-3 py-2 rounded-lg bg-theme-elevated border border-theme text-theme-primary focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-theme-secondary mb-1">Service Required</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-theme-elevated border border-theme text-theme-primary focus:outline-none focus:border-blue-600"
                  >
                    <option value="shock-dyno">Shock Dyno Testing & Rebuilding</option>
                    <option value="trailer-repair">Trailer / RV / Totor Repair</option>
                    <option value="welding">Chassis TIG Welding & Fabrication</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-theme-secondary mb-1">Car / Equipment Details</label>
                <input
                  type="text"
                  value={formData.chassisType}
                  onChange={(e) => setFormData({ ...formData, chassisType: e.target.value })}
                  placeholder="e.g. 2024 Rocket XR2 Late Model / 410 Maxim Sprint / 48ft Hauler"
                  className="w-full px-3 py-2 rounded-lg bg-theme-elevated border border-theme text-theme-primary focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-theme-secondary mb-1">Project Notes</label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Describe valving targets, issue symptoms, or race weekend schedule..."
                  className="w-full px-3 py-2 rounded-lg bg-theme-elevated border border-theme text-theme-primary focus:outline-none focus:border-blue-600"
                />
              </div>

              <button type="submit" className="w-full btn-racing-primary py-3 text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer">
                <Send className="w-4 h-4" /> Submit Service Intake to Hanover Shop
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
