import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './brand/BrandLogo';
import { BrandEmblem } from './brand/BrandEmblem';
import {

  FileText,
  Shield,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
  Leaf,
  ChevronDown,
  ChevronUp,
  MapPin,
  ExternalLink,
  Clock,
  Sparkles
} from 'lucide-react';

export const InfoPagesTab: React.FC = () => {
  const { adminPricing } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'about' | 'privacy' | 'terms' | 'contact' | 'faqs'>('about');

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the "Day Push / Skip Delivery" feature work with the 5:00 PM cutoff?',
      a: 'If you want to skip tomorrow’s delivery, you must submit your Day Push request in your customer dashboard before 5:00 PM today. Our morning kitchen operations commence at 5:00 AM, and suppliers allocate fresh harvest by 5:30 PM. Any skip request logged after 5:00 PM will automatically take effect starting from the day after tomorrow. Every skipped day automatically pushes out and extends your subscription end date by one full day with zero penalty.'
    },
    {
      q: 'How are Prorated Refunds calculated if I need to cancel my subscription?',
      a: 'We offer fair prorated refunds within 5 working days. The refund balance is determined by taking your total subscription payment and deducting the meals already delivered calculated at the standard single-meal rate (e.g. ₹150/meal without bulk discounts). For example: If you paid ₹2,640 for a 24-meal monthly plan (₹110/meal) and cancel after receiving 6 meals, your deduction is 6 x ₹150 = ₹900. Your refundable balance is ₹2,640 - ₹900 = ₹1,740.'
    },
    {
      q: 'Can I swap my salad for a soup, fruit bowl, or smoothie during my active plan?',
      a: 'Yes! Subscribers on Bi-Weekly, Monthly, and Quarterly tiers can switch their daily dish anytime through the customer dashboard. Because our sprouts and artisanal bone broths follow strict 24-to-48 hour preparation cycles, product swaps take effect after a 3-working-day activation window.'
    },
    {
      q: 'How does the Workout Buddy / Gym Partner add-on discount work?',
      a: 'When you toggle the Gym Buddy add-on, we deliver 2 freshly chopped bowls to the exact same gym reception, workplace desk, or PG lobby in a consolidated insulated parcel. You unlock an additional 5% duo discount on the entire combined order!'
    },
    {
      q: 'What makes your sugarcane bagasse packaging truly eco-conscious?',
      a: 'Unlike conventional "plastic-free" paper bowls lined with harmful petroleum poly-coatings (which take centuries to degrade and leach microplastics into warm food), our containers are molded from 100% natural sugarcane bagasse — the fibrous byproduct of sugarcane pressing. They are certified commercially and home compostable within 90 days, microwave-safe, leak-proof, and 100% PFAS-free.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Sub-navigation pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
        {[
          { id: 'about', label: 'About Us' },
          { id: 'privacy', label: 'Privacy Policy' },
          { id: 'terms', label: 'Terms & Conditions' },
          { id: 'contact', label: 'Contact Us' },
          { id: 'faqs', label: 'Interactive FAQs' }
        ].map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#2E7D32] text-white shadow-md shadow-[#2E7D32]/25'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. ABOUT US */}
      {activeSubTab === 'about' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
          {/* Official Brand Logo Presentation */}
          <div className="flex justify-center pb-4 border-b border-slate-100">
            <BrandLogo variant="full" className="max-w-md" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#164223] text-xs font-bold">
            <Leaf className="w-3.5 h-3.5 text-[#1B5E20]" />
            <span>Our Founding Philosophy</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
            Fueling Your Day, One Fresh Bowl at a Time
          </h1>


          <div className="prose text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              At <strong>le bol santé</strong>, we started with a singular, unapologetic mission: to eliminate the compromises fitness-conscious individuals have been forced to make between real nutrition, culinary flavor, and daily routine punctuality.
            </p>

            <h3 className="text-xl font-bold font-display text-slate-900 pt-2">
              Zero Cloud-Kitchen Jargon. Pure Morning Micro-Prep.
            </h3>
            <p>
              We are not an anonymous dark kitchen churning out frozen meals preserved with sodium benzoate. Every salad leaf, vegetable ribbon, microgreen sprig, and cold-pressed dressing is chopped and blended fresh at 5:00 AM each morning. What was harvested yesterday is in your bowl before your morning workout concludes.
            </p>

            <h3 className="text-xl font-bold font-display text-slate-900 pt-2">
              Fitness Hub &amp; Workplace Precision Delivery
            </h3>
            <p>
              We understand that timing is everything for athletic recovery and high-stress workdays. Our dedicated fleets navigate directly to your gym locker room, CrossFit box reception, PG residency, or corporate tech desk across 4 calibrated daily session slots.
            </p>

            <h3 className="text-xl font-bold font-display text-slate-900 pt-2">
              Certified Sugarcane Bagasse Eco-Packaging
            </h3>
            <p>
              Healthy bodies require a healthy planet. We package exclusively in 100% natural, unbleached sugarcane bagasse containers with compostable corn-starch seals. Zero single-use plastics. Zero toxic microplastic leaching. Complete return to the earth within 90 days.
            </p>
          </div>
        </div>
      )}

      {/* 2. PRIVACY POLICY */}
      {activeSubTab === 'privacy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center gap-2 text-[#2E7D32]">
            <Shield className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Privacy &amp; Data Governance</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            Privacy Policy &bull; Customer Data Architecture
          </h1>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">1. Information We Collect</h3>
            <p>
              le bol santé collects only essential customer credentials required to fulfill culinary deliveries: Full Name, Primary Mobile Number (used as your unique authentication identifier and primary key), Secondary / Emergency Phone Number, Delivery Destination Hub (Gym / Workplace / PG / Residential), Address, Google Maps Location Link, and Dietary / Allergy Alerts.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. Real-Time Google Sheets Database Architecture</h3>
            <p>
              Your profile, subscription status, and daily dietary instructions are synchronized in real-time with our secure Google Sheets and webhook infrastructure (Customer_Master, Active_Subscriptions, Daily_Kitchen_Fulfillment_Log, and Financials_And_Refunds). Data is accessible solely to authorized kitchen supervisors and dispatch riders.
            </p>

            <h3 className="text-base font-bold text-slate-900">3. Transactional Messaging (WhatsApp &amp; SMS)</h3>
            <p>
              By subscribing, you authorize le bol santé to transmit transactional notifications via automated WhatsApp and SMS gateways for OTP verification, daily delivery dispatch alerts, 5:00 PM cutoff reminders, and subscription renewal notices. We never sell or lease customer contact lists to third-party marketing entities.
            </p>

            <h3 className="text-base font-bold text-slate-900">4. Payment Security</h3>
            <p>
              All online payments (UPI, credit/debit cards, NetBanking) are processed via PCI-DSS compliant payment gateways. le bol santé does not store raw credit card numbers or banking passwords on internal systems.
            </p>
          </div>
        </div>
      )}

      {/* 3. TERMS & CONDITIONS */}
      {activeSubTab === 'terms' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <div className="flex items-center gap-2 text-[#E65100]">
            <FileText className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Legal Terms of Subscription</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            Terms &amp; Conditions &bull; Service Agreement
          </h1>

          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">1. Dynamic Price Adjustments &amp; Subscription Tiers</h3>
            <p>
              Subscription pricing reflects volume commitments (Weekly 5%, Bi-Weekly 10%, Monthly 15%, Quarterly 20% discount). Operational management reserves the right to adjust catalog pricing dynamically on our central pricing engine; existing active subscriptions remain price-locked throughout their current paid billing period.
            </p>

            <h3 className="text-base font-bold text-slate-900">2. Day Push &amp; 5:00 PM Daily Lockout Policy</h3>
            <p>
              Delivery skips ("Day Push") must be logged in the customer portal before 5:00 PM for the following day’s delivery. Requests submitted after 5:00 PM will take effect starting the day after tomorrow, as kitchen vegetable procurement and pre-soaking of legumes/grains are irreversibly scheduled at 5:00 PM. Skipped days extend the customer's plan end date automatically.
            </p>

            <h3 className="text-base font-bold text-slate-900">3. Prorated Refunds &amp; Cancellation Calculation</h3>
            <p>
              Should a subscriber cancel before completing their subscription term, the refund balance is computed by deducting all delivered meals calculated at the standard single-meal rate (₹{adminPricing.singleMealRate}/meal). Any remaining credit will be disbursed to the original payment source within 5 working days. Weekly Starter plans are non-refundable after fulfillment commences.
            </p>

            <h3 className="text-base font-bold text-slate-900">4. Health Disclaimers &amp; Allergy Notifications</h3>
            <p>
              While our kitchen operates stringent cross-contamination controls, products are prepared in a culinary environment that handles tree nuts, dairy, soy, and eggs. Customers with acute, life-threatening allergies must exercise personal discretion and clearly state alerts in their mandatory customer profile.
            </p>
          </div>
        </div>
      )}

      {/* 4. CONTACT US */}
      {activeSubTab === 'contact' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h1 className="text-3xl font-black text-slate-900 font-display">
              We’re Here to Fuel You
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Reach our kitchen concierge, culinary team, or operational support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2E7D32] text-white flex items-center justify-center mx-auto">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Direct Phone Call</h3>
              <p className="text-xs text-slate-500">Customer hotline &amp; kitchen status</p>
              <a
                href="tel:7899922753"
                className="inline-block text-base font-black text-[#1B5E20] hover:underline"
              >
                7899922753
              </a>
            </div>

            <div className="bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">WhatsApp Automated Chat</h3>
              <p className="text-xs text-slate-500">Instant bot ordering &amp; 5 PM Day Push</p>
              <a
                href="https://wa.me/919353173101"
                target="_blank"
                rel="noreferrer"
                className="inline-block text-base font-black text-[#1B5E20] hover:underline"
              >
                9353173101
              </a>
            </div>

            <div className="bg-emerald-50/70 p-6 rounded-3xl border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E65100] text-white flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Official Email Support</h3>
              <p className="text-xs text-slate-500">Corporate &amp; bulk institutional inquiries</p>
              <a
                href="mailto:lebolsante@gmail.com"
                className="inline-block text-base font-black text-[#1B5E20] hover:underline break-all"
              >
                lebolsante@gmail.com
              </a>
            </div>
          </div>

          {/* Social Icons Bar */}
          <div className="pt-6 border-t border-slate-100 text-center space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Follow le bol santé on Social Media
            </span>
            <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-700">
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-[#2E7D32] transition cursor-pointer">
                Instagram (@lebolsante)
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-[#2E7D32] transition cursor-pointer">
                Facebook
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-[#2E7D32] transition cursor-pointer">
                YouTube
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-[#2E7D32] transition cursor-pointer">
                X / Twitter
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 5. INTERACTIVE FAQS */}
      {activeSubTab === 'faqs' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-[#2E7D32]">
            <HelpCircle className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Frequently Asked Questions</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            Subscription, Day Push &amp; Refund Guidelines
          </h1>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 hover:text-[#2E7D32] flex items-center justify-between gap-4 bg-slate-50/50"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 shrink-0 text-[#2E7D32]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 sm:p-5 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
