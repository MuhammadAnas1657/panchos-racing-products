import React from 'react';
import {
  ShieldAlert,
  RotateCcw,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  FileText,
  Package,
  Truck,
  ArrowRight,
} from 'lucide-react';
import { CLIENT_INFO } from '../data/siteData';
import { useCart } from '../context/CartContext';

export const ReturnPolicyPage: React.FC = () => {
  const { setActivePage } = useCart();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. HEADER */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-theme-elevated border border-theme text-theme-accent text-xs font-mono font-bold">
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Official Store Terms • Hanover, PA</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-theme-primary tracking-tight font-heading">
          Refund and Returns Policy
        </h1>
        <p className="text-sm text-theme-secondary">
          Clear, honest policies for dirt racing components, chassis parts, and custom equipment.
        </p>
      </div>

      {/* 2. SUMMARY BOX */}
      <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-theme-primary space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400 text-sm font-mono">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>Important Notice: Return Authorization Required</span>
        </div>
        <p className="text-xs text-theme-secondary leading-relaxed">
          Always call our Hanover speed shop at <strong className="text-theme-primary">{CLIENT_INFO.phone}</strong> for an official Return Authorization (RMA) number before shipping any part back. Packages returned without an RMA number cannot be processed by the receiving dock.
        </p>
      </div>

      {/* 3. CORE POLICIES SECTION */}
      <div className="space-y-6">
        {/* Item 1: 15-Day Limit */}
        <div className="clean-card p-6 sm:p-8 rounded-2xl border border-theme bg-theme-surface space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-theme-elevated border border-theme text-theme-accent shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-theme-primary">
                15-Day Return Window
              </h2>
              <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                Parts returned for exchange or refund must be initiated within <strong>15 calendar days</strong> after the product is delivered to your address or picked up at our counter. No returns for refund are accepted after 15 days.
              </p>
            </div>
          </div>
        </div>

        {/* Item 2: Resalable Condition */}
        <div className="clean-card p-6 sm:p-8 rounded-2xl border border-theme bg-theme-surface space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-theme-elevated border border-theme text-theme-accent shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-theme-primary">
                New & Resalable Condition Requirement
              </h2>
              <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                Returned items must be 100% unused, unbolted, unmodified, and unchanged from their original new condition. All products must remain in original manufacturer packaging with all hardware, shims, seals, and tags intact.
              </p>
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400 font-medium">
                ✕ No return or exchange will be granted on any part that has been installed, test-fitted, raced, or damaged.
              </div>
            </div>
          </div>
        </div>

        {/* Item 3: Restocking Fee */}
        <div className="clean-card p-6 sm:p-8 rounded-2xl border border-theme bg-theme-surface space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-theme-elevated border border-theme text-theme-accent shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-theme-primary">
                Restocking Fee & Freight Responsibility
              </h2>
              <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                All refunds are subject to a <strong>minimum 15% restocking fee</strong>. Customers are responsible for return shipping freight unless the reason for the return is determined to be our packaging or fulfillment error. You must include a legible copy of your original sales receipt with the shipment.
              </p>
            </div>
          </div>
        </div>

        {/* Item 4: Shipping Damage & Warranties */}
        <div className="clean-card p-6 sm:p-8 rounded-2xl border border-theme bg-theme-surface space-y-4">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-theme-elevated border border-theme text-theme-accent shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-theme-primary">
                Shipping Damage & Manufacturer Warranties
              </h2>
              <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                Any part that arrives damaged or defective from shipping will be evaluated promptly. If shipping damage occurred through our freight courier, replacement parts will be dispatched at no additional charge.
              </p>
              <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
                Specialized components (e.g., KSE steering boxes, Winters rear ends, Wilwood calipers) may carry specific warranties issued directly by the manufacturer and may require shipment directly to the factory for inspection.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. RETURN STEPS & ADDRESS */}
      <div className="clean-card p-8 rounded-2xl border border-theme bg-theme-elevated space-y-6">
        <h3 className="text-base font-bold text-theme-primary uppercase font-mono tracking-wider">
          How to Complete a Return:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-theme-surface border border-theme space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold flex items-center justify-center">
              1
            </div>
            <div className="font-bold text-theme-primary text-sm">Call for RMA</div>
            <p className="text-theme-secondary">
              Contact our staff at {CLIENT_INFO.phone} to receive your Return Authorization number.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-theme-surface border border-theme space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold flex items-center justify-center">
              2
            </div>
            <div className="font-bold text-theme-primary text-sm">Pack Securely</div>
            <p className="text-theme-secondary">
              Include a copy of your receipt, write your RMA on the box, and protect the item carefully.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-theme-surface border border-theme space-y-1.5">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-mono font-bold flex items-center justify-center">
              3
            </div>
            <div className="font-bold text-theme-primary text-sm">Ship to Hanover</div>
            <p className="text-theme-secondary">
              Ship via UPS, FedEx, or USPS with tracking to our main warehouse receiving dock.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-theme-surface border border-theme flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
          <div className="text-xs font-mono space-y-1">
            <div className="font-bold text-theme-primary flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-theme-accent" />
              <span>Returns Receiving Dock:</span>
            </div>
            <div className="text-theme-secondary">
              Pancho's Racing Products • ATTN: Returns (RMA #)
            </div>
            <div className="text-theme-secondary">
              1754 Carlisle Pike, Hanover, PA 17331
            </div>
          </div>

          <a
            href={`tel:${CLIENT_INFO.phone}`}
            className="btn-racing-primary text-xs py-2.5 px-5 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Desk: {CLIENT_INFO.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
