import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Salad,
  Clock,
  ShoppingBag,
  User,
  TableProperties,
  Menu as MenuIcon,
  X,
  Phone,
  Flame,
  ShieldCheck,
  ChevronRight,
  Share2
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentTab,
    setCurrentTab,
    currentCustomer,
    isLoggedIn,
    setIsAuthModalOpen,
    setIsProfileDrawerOpen,
    cart,
    setIsCartDrawerOpen,
    cutoffTimeRemaining,
    isBeforeCutoff5PM,
    setShowSheetsViewer,
    isAdminLoggedIn,
    adminUser,
    setIsAdminAuthModalOpen,
    setIsShareModalOpen
  } = useApp();


  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const baseNavLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'subscriptions', label: 'Subscriptions & Pricing' },
    { id: 'bulk-orders', label: 'Bulk Orders' },
    { id: 'account', label: 'My Account / Day Push' },
    { id: 'info', label: 'About & Policies' }
  ];

  // Only display Admin Portal link in navbar if the admin is currently authenticated
  const navLinks: { id: string; label: string; highlight?: boolean }[] = isAdminLoggedIn
    ? [...baseNavLinks, { id: 'admin', label: 'Admin Portal', highlight: true }]
    : baseNavLinks;

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#2E7D32]/10 shadow-xs">
      {/* Top Operations & 5 PM Cutoff Alert Bar */}
      <div className="bg-[#2E7D32] text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-300 animate-ping"></span>
            <span className="font-semibold text-emerald-100">Daily 5 AM Freshly Chopped</span>
            <span className="hidden sm:inline text-emerald-200">|</span>
            <span className="hidden sm:inline text-emerald-100">Gym, Office & PG Direct Delivery</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-0.5 rounded-full border border-white/10">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>
                {isBeforeCutoff5PM() ? (
                  <>
                    <span className="text-amber-200 font-semibold">5 PM Cutoff:</span> {cutoffTimeRemaining} to freeze tomorrow
                  </>
                ) : (
                  <>
                    <span className="text-amber-300 font-semibold">5 PM Passed:</span> Kitchen prepping tomorrow
                  </>
                )}
              </span>
            </div>

            {/* ONLY visible to authenticated operations administrators */}
            {isAdminLoggedIn && (
              <>
                <button
                  onClick={() => setShowSheetsViewer(true)}
                  className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition text-xs font-semibold"
                  title="Open Live Google Sheets Sync Hub"
                >
                  <TableProperties className="w-3 h-3 text-emerald-200" />
                  <span>Live Sheets DB</span>
                </button>

                <button
                  onClick={() => handleNavClick('admin')}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-xs shadow-xs hover:bg-emerald-300 transition"
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-950" />
                  <span>Admin: {adminUser?.name.split(' ')[0]}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>



      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 group text-left cursor-pointer"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] flex items-center justify-center text-white shadow-md shadow-[#2E7D32]/20 group-hover:scale-105 transition-transform">
            <Salad className="w-6 h-6 text-emerald-200" />
          </div>
          <div>
            <div className="text-2xl font-black tracking-tight text-[#1B5E20] flex items-center gap-1.5 font-display">
              le bol santé
              <span className="w-1.5 h-1.5 rounded-full bg-[#E65100]"></span>
            </div>
            <p className="text-[11px] font-semibold text-[#64748B] tracking-wide uppercase">
              Freshly Chopped &bull; Perfectly Balanced
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#2E7D32] bg-[#2E7D32]/10 shadow-xs font-bold'
                    : link.highlight
                    ? 'text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200 font-bold'
                    : 'text-[#475569] hover:text-[#1B5E20] hover:bg-black/5'
                }`}
              >
                {link.highlight && <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />}
                <span>{link.label}</span>
                {link.highlight && isAdminLoggedIn && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                )}
              </button>
            );
          })}

        </nav>

        {/* Actions (Auth / Profile / Cart / Quick WhatsApp) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Google Sheets DB quick trigger ONLY for authenticated admin */}
          {isAdminLoggedIn && (
            <button
              onClick={() => setShowSheetsViewer(true)}
              className="lg:hidden p-2.5 rounded-xl bg-[#2E7D32]/10 text-[#2E7D32] hover:bg-[#2E7D32]/20 transition cursor-pointer"
              title="Open Live Sheets DB"
            >
              <TableProperties className="w-5 h-5" />
            </button>
          )}

          {/* User Auth / Profile */}

          {isLoggedIn ? (
            <button
              onClick={() => setIsProfileDrawerOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[#1B5E20] text-sm font-semibold hover:bg-emerald-100 transition shadow-xs cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#2E7D32] text-white flex items-center justify-center text-xs font-bold">
                {currentCustomer?.fullName.charAt(0) || 'U'}
              </div>
              <span className="hidden sm:inline max-w-[100px] truncate">{currentCustomer?.fullName.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#2E7D32]/30 text-[#2E7D32] text-sm font-bold hover:bg-[#2E7D32]/5 transition shadow-xs cursor-pointer"
            >
              <User className="w-4 h-4 text-[#2E7D32]" />
              <span className="hidden sm:inline">Sign In / OTP</span>
              <span className="sm:hidden">Login</span>
            </button>
          )}

          {/* Share with Gym Buddy / Friend button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-[#E65100] border border-amber-200 text-xs font-bold transition shadow-xs cursor-pointer"
            title="Share with a Workout Buddy & Save 5%"
          >
            <Share2 className="w-4 h-4 text-[#E65100]" />
            <span className="hidden md:inline">Share (5% Off)</span>
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="relative p-2.5 rounded-xl bg-[#2E7D32] text-white hover:bg-[#1B5E20] transition shadow-md shadow-[#2E7D32]/25 cursor-pointer"
            aria-label="Open Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#E65100] text-white text-xs font-black rounded-full flex items-center justify-center animate-bounce">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-[#334155] hover:bg-black/5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#2E7D32]/10 bg-[#FDFBF7] px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-left transition ${
                  isActive
                    ? 'text-[#2E7D32] bg-[#2E7D32]/15 font-bold'
                    : 'text-[#334155] hover:bg-black/5'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                setIsShareModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-[#E65100] font-bold text-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Share with a Workout Buddy (Get 5% Off)</span>
            </button>

            {isAdminLoggedIn && (
              <button
                onClick={() => {
                  setShowSheetsViewer(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#2E7D32]/10 text-[#2E7D32] font-bold text-sm"
              >
                <TableProperties className="w-4 h-4" />
                <span>Open 4-Sheet Google Database</span>
              </button>
            )}


            <a
              href="https://wa.me/919353173101?text=Hi%20le%20bol%20santé!%20I%20would%20like%20to%20order%20a%20fresh%20salad%20bowl"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>WhatsApp Quick-Order (9353173101)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
