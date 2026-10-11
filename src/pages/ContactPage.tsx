import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { CLIENT_INFO } from '../data/siteData';

export const ContactPage: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Parts Availability',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setContactData({ name: '', email: '', phone: '', subject: 'Parts Availability', message: '' });
    }, 4500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="clean-card p-8 sm:p-10 rounded-2xl border border-theme bg-theme-surface">
        <div className="max-w-3xl space-y-3">
          <div className="badge-clean badge-racing">
            <Phone className="w-3.5 h-3.5" /> Direct Technical Desk
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight">
            Contact Pancho's Racing Products
          </h1>
          <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
            Need part fitment validation, freight estimates, or urgent trackside delivery? Speak directly with our Hanover, PA technical counter.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="clean-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-theme-primary">Direct Phone Line</h3>
            <p className="text-xs text-theme-muted font-mono">Talk to our tech desk during shop hours:</p>
            <a
              href={`tel:${CLIENT_INFO.phone}`}
              className="inline-block font-mono text-blue-600 font-bold text-base hover:underline"
            >
              {CLIENT_INFO.phone}
            </a>
          </div>

          <div className="clean-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-theme-primary">Official Email</h3>
            <p className="text-xs text-theme-muted font-mono">Quotes & setup inquiries:</p>
            <a
              href={`mailto:${CLIENT_INFO.email}`}
              className="inline-block font-mono text-blue-600 font-bold text-xs hover:underline break-all"
            >
              {CLIENT_INFO.email}
            </a>
          </div>

          <div className="clean-card p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-theme-primary">Shop Address</h3>
            <p className="text-xs text-theme-secondary font-mono leading-relaxed">
              {CLIENT_INFO.address}
            </p>
            <div className="pt-2 text-[11px] font-mono text-theme-muted flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{CLIENT_INFO.hours}</span>
            </div>
          </div>
        </div>

        {/* Message Form */}
        <div className="lg:col-span-2 clean-card p-8 sm:p-10">
          <div className="space-y-1 mb-6">
            <h2 className="text-xl font-bold text-theme-primary">
              Send an Inquiry to Our Parts Desk
            </h2>
            <p className="text-xs text-theme-secondary">
              All messages are routed directly to the staff in Hanover, PA.
            </p>
          </div>

          {formSent ? (
            <div className="p-8 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="font-bold text-lg text-theme-primary">
                Inquiry Transmitted Successfully
              </h4>
              <p className="text-xs font-mono text-theme-secondary max-w-md mx-auto">
                Thank you, {contactData.name || 'Racer'}. Our team will review your inquiry and respond to {contactData.email || contactData.phone}.
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
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    placeholder="e.g. Mike Henderson"
                    className="w-full px-3 py-2 rounded-lg bg-theme-elevated border border-theme text-theme-primary focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-theme-secondary mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={contactData.phone}
                    onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                    placeholder="(717) 555-0123"
                    className="w-full px-3 py-2 rounded-lg bg-theme-elevated border border-theme text-theme-primary focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-theme-secondary mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contactData.email}
                    onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    placeholder="racer@domain.com"
                    className="w-full px-3 py-2 rounded-lg bg-theme-elevated border border-theme text-theme-primary focus:outline-none focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-theme-secondary mb-1">Department / Topic</label>
                  <select
                    value={contactData.subject}
                    onChange={(e) => setContactData({ ...contactData, subject: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-theme-elevated border border-theme text-theme-primary focus:outline-none focus:border-blue-600"
                  >
                    <option value="Parts Availability">Parts Stock & Pricing</option>
                    <option value="Sprint Steering">Sprint Steering Compatibility</option>
                    <option value="Rocket Chassis Parts">Rocket Chassis Updates</option>
                    <option value="Shock Dyno Booking">Shock Rebuild / Dyno Booking</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-theme-secondary mb-1">Message or Part Numbers Needed *</label>
                <textarea
                  rows={4}
                  required
                  value={contactData.message}
                  onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                  placeholder="Specify chassis model, target part numbers (SKU), or required race date..."
                  className="w-full px-3 py-2 rounded-lg bg-theme-elevated border border-theme text-theme-primary focus:outline-none focus:border-blue-600"
                />
              </div>

              <button type="submit" className="w-full btn-racing-primary py-3 text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer">
                <Send className="w-4 h-4" /> Transmit Message to Pancho's Desk
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
