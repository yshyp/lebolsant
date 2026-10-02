import React from 'react';
import { useApp } from '../context/AppContext';
import { Salad, Phone, MessageCircle, Mail, MapPin, ShieldCheck, Heart, TableProperties } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentTab, setShowSheetsViewer, isAdminLoggedIn } = useApp();

  const handleNav = (tab: string) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#2E7D32] flex items-center justify-center text-white">
                <Salad className="w-5 h-5 text-emerald-200" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-display">
                le bol santé
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Freshly Chopped, Perfectly Balanced — The Ultimate Salad. Subscription-based clean nutrition delivered to gyms, fitness centers, offices, and PG residences with 5 PM Day Push flexibility.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-emerald-400 border border-slate-700">
                🌱 100% Sugarcane Bagasse
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-emerald-400 border border-slate-700">
                ⏰ 5:00 PM Day Push Cutoff
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-emerald-400 border border-slate-700">
                🏋️ Direct to Gym Lockers
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('menu')} className="hover:text-white transition">
                  Dynamic Menu (Veg / Non-Veg)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('subscriptions')} className="hover:text-white transition">
                  Subscriptions &amp; Pricing Matrix
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('bulk-orders')} className="hover:text-white transition">
                  Bulk Orders &amp; Event Catering
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('account')} className="hover:text-white transition">
                  My Account &bull; Day Push Engine
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Policies &amp; Systems
            </h4>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <button onClick={() => handleNav('info')} className="hover:text-white transition">
                  About Us &bull; Founding Story
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('info')} className="hover:text-white transition">
                  Privacy Policy &bull; Phone Primary Key
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('info')} className="hover:text-white transition">
                  Terms &amp; Conditions (Prorated Refunds)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('info')} className="hover:text-white transition">
                  5 PM Lockout &amp; Day Push Policy
                </button>
              </li>
              {isAdminLoggedIn ? (
                <>
                  <li>
                    <button
                      onClick={() => setShowSheetsViewer(true)}
                      className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 font-bold"
                    >
                      <TableProperties className="w-3.5 h-3.5" />
                      <span>Google Sheets 4-Sheet Console</span>
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleNav('admin')}
                      className="text-emerald-400 hover:text-emerald-300 transition flex items-center gap-1 font-bold"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Admin Operations Portal</span>
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={() => handleNav('admin')}
                    className="text-slate-500 hover:text-slate-300 transition flex items-center gap-1 text-[11px]"
                  >
                    <ShieldCheck className="w-3 h-3 text-slate-500" />
                    <span>Operations Staff (/admin)</span>
                  </button>
                </li>
              )}
            </ul>


          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:7899922753" className="hover:text-white font-mono">
                  7899922753
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/919353173101"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white font-mono"
                >
                  WhatsApp: 9353173101
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="mailto:lebolsante@gmail.com" className="hover:text-white break-all">
                  lebolsante@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} <strong>le bol santé</strong>. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Natural Leaf Green #2E7D32</span>
            <span>&bull;</span>
            <span>Warm Cream #FDFBF7</span>
            <span>&bull;</span>
            <span>Accent Terracotta #E65100</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
