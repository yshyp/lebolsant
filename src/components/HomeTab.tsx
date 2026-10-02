import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS } from '../data/mockData';
import { VegetableCuttingBackground, LiveChoppingBoardCard } from './VegetableCuttingAnimation';
import {
  Salad,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Dumbbell,
  Leaf,
  Calendar,
  MessageCircle,
  QrCode,
  Flame,
  Star,
  Clock,
  CheckCircle2,
  ChevronRight,
  X,
  HeartHandshake
} from 'lucide-react';


export const HomeTab: React.FC = () => {
  const { setCurrentTab, openMealCustomizer, setIsMakeMySaladOpen, menuItems } = useApp();

  const [activeValuePropModal, setActiveValuePropModal] = useState<string | null>(null);


  const valueProps = [
    {
      id: 'fresh-daily',
      title: 'Freshly Chopped Daily',
      shortDesc: 'Prepped every morning at 5:00 AM with zero preservatives or cold-room wilt.',
      fullDesc:
        'Every single leaf of crisp romaine, hydroponic spinach, and tender broccoli is harvested and prepped starting at 5:00 AM each morning. We never freeze vegetables, and our cold-pressed dressings are blended daily in small micro-batches with zero chemical stabilizers, refined starches, or artificial flavorings.',
      icon: <Leaf className="w-6 h-6 text-emerald-600" />,
      badge: '5:00 AM Harvest'
    },
    {
      id: 'fitness-delivery',
      title: 'Fitness Hub Delivery',
      shortDesc: 'Straight to your gym locker, corporate office desk, or hostel / PG doorstep.',
      fullDesc:
        'Over 80% of our subscribers are active gym-goers and busy professionals. Our dedicated morning and evening fleets deliver directly to gym receptions (Cult.fit, Gold’s, Anytime Fitness, local CrossFit boxes), co-working desks, and PG lobbies before your workout begins or right as your shift wraps up.',
      icon: <Dumbbell className="w-6 h-6 text-[#2E7D32]" />,
      badge: 'Direct to Locker'
    },
    {
      id: 'eco-packaging',
      title: 'Eco-Conscious Packaging',
      shortDesc: '100% sugarcane bagasse containers, plant starch seals & non-plastic cutlery.',
      fullDesc:
        'We believe eating clean shouldn’t dirty the planet. All "le bol santé" meals are packaged in heavy-gauge natural sugarcane bagasse bowls. They are 100% compostable within 90 days, leak-resistant, freezer safe, microwave safe, and completely free of PFAS or toxic microplastic leaching.',
      icon: <ShieldCheck className="w-6 h-6 text-[#E65100]" />,
      badge: '100% Biodegradable'
    },
    {
      id: 'day-push',
      title: 'Ultimate Plan Flexibility',
      shortDesc: 'Instant Day Push controls before 5:00 PM to pause or extend with zero penalties.',
      fullDesc:
        'Gym rest day? Traveling for work? Attending a team lunch? Simply tap "Day Push" in your dashboard before 5:00 PM daily. Your tomorrow delivery is frozen instantly, and your subscription automatically extends into future dates. No awkward customer support calls, no wasted meals.',
      icon: <Calendar className="w-6 h-6 text-emerald-700" />,
      badge: '5 PM Cutoff Rule'
    }
  ];

  const testimonials = [
    {
      name: 'Coach Vikram Rao',
      role: 'Head Strength Coach, Indiranagar',
      review:
        '"Finding clean 40g+ protein meals that aren’t soggy by 8 AM used to be impossible for my athletes. le bol santé delivers fresh grilled chicken bowls straight to our gym lockers on time every day."',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      verifiedTag: 'Cult.fit Member & Trainer'
    },
    {
      name: 'Ananya Deshmukh',
      role: 'Product Lead, Tech Cloud Park',
      review:
        '"The Day Push calendar is a lifesaver. Whenever I travel for client on-sites, I just toggle Day Push before 5 PM and my subscription automatically shifts. The macro calculations are genuinely precise."',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
      verifiedTag: 'Monthly Athlete Pro Subscriber'
    },
    {
      name: 'Rohan Mehra',
      role: 'Marathoner & PG Resident',
      review:
        '"Living in a PG hostel without a kitchen made healthy eating a struggle. These sugarcane bagasse bowls are massive, nutrient-dense, and keep me fueled for my morning runs. The spirulina shake is fire!"',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      verifiedTag: 'Quarterly Transformation Elite'
    }
  ];

  const featuredDishes = menuItems.filter((i) => i.isActive !== false).slice(0, 4);


  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION WITH ANIMATED VEGETABLE CUTTING BACKGROUND */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:py-20 lg:py-24 bg-radial from-[#F5F1E8] via-[#FDFBF7] to-[#F7F3EB] border-b border-[#2E7D32]/10">
        {/* Animated Vegetable Slicing & Chopping Background Layer */}
        <VegetableCuttingBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-[#1B5E20] text-xs font-bold shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Subscription-Based Culinary Wellness</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1B5E20] tracking-tight font-display leading-[1.08]">
                le bol santé
                <span className="block text-2xl sm:text-3xl lg:text-4xl text-[#2E7D32] font-semibold mt-2 font-serif-accent italic">
                  Freshly Chopped, Perfectly Balanced
                </span>
                <span className="block text-xl sm:text-2xl lg:text-2xl font-black text-[#E65100] mt-1 font-display tracking-normal uppercase">
                  The Ultimate Salad.
                </span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Chef-crafted salad bowls, warm simmered soups, super-berry smoothie meals, and overnight oats. 
                Delivered straight to your <strong className="text-slate-800">gym locker, corporate office, or PG</strong> with 
                instant <strong className="text-emerald-800">5:00 PM Day Push</strong> flexibility.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => setCurrentTab('menu')}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-extrabold text-base shadow-xl shadow-[#2E7D32]/25 transition flex items-center justify-center gap-2.5 cursor-pointer group hover:scale-[1.02]"
                >
                  <Salad className="w-5 h-5 text-emerald-200" />
                  <span>Order Now / Explore Menu</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setCurrentTab('subscriptions')}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-emerald-50 text-[#1B5E20] font-bold text-base border-2 border-[#2E7D32]/30 shadow-md shadow-slate-200/50 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Choose Subscription Plan</span>
                  <span className="text-xs bg-[#E65100] text-white font-extrabold px-2 py-0.5 rounded-full">
                    Up to 20% Off
                  </span>
                </button>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                  <span>Zero Cloud-Kitchen Jargon</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                  <span>Sugarcane Bagasse Eco-Bowls</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2E7D32]" />
                  <span>5 PM Pause Lockout</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                  <img
                    src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80"
                    alt="Fresh Gourmet Salad Bowl"
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Floating Badges */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-emerald-100 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#2E7D32] flex items-center justify-center text-white">
                      <Flame className="w-4 h-4 text-amber-300" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400">Gym Pro High-Protein</div>
                      <div className="text-xs font-black text-[#1B5E20]">42g Protein &bull; 480 Kcal</div>
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-emerald-100 text-right">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Packaging</div>
                    <div className="text-xs font-black text-[#E65100]">100% Bagasse &bull; Zero Plastic</div>
                  </div>
                </div>

                {/* Subtitle Card Underneath */}
                <div className="mt-4 bg-emerald-900 text-white rounded-2xl p-4 shadow-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300 font-bold">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-100">4 Precision Time Slots Daily</div>
                      <div className="text-[11px] text-emerald-300">Morning 7:00 AM to Evening 8:00 PM</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setCurrentTab('subscriptions')}
                    className="px-3 py-1.5 rounded-xl bg-white text-[#1B5E20] font-bold text-xs hover:bg-emerald-100 transition cursor-pointer"
                  >
                    View Slots
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE 5 AM VEGETABLE CHOPPING INTERACTIVE STATION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <LiveChoppingBoardCard />
      </section>

      {/* 2. INTERACTIVE VALUE PROPS (DIALOG BOXES) */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D32]">Our Guarantees</span>
          <h2 className="text-3xl font-black text-slate-900 font-display mt-1">
            Built for High Performers &amp; Modern Schedules
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Click any pillar to inspect our strict morning kitchen standards, packaging certifications, and Day Push logic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueProps.map((prop) => (
            <div
              key={prop.id}
              onClick={() => setActiveValuePropModal(prop.id)}
              className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#2E7D32]/40 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 group-hover:bg-[#2E7D32] group-hover:text-white transition-colors flex items-center justify-center">
                    {prop.icon}
                  </div>
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-[#1B5E20] transition-colors">
                    {prop.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#2E7D32] transition-colors font-display mb-2">
                  {prop.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {prop.shortDesc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2E7D32]">
                <span>Read details</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Value Prop Details */}
        {activeValuePropModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            {(() => {
              const active = valueProps.find((p) => p.id === activeValuePropModal);
              if (!active) return null;
              return (
                <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#2E7D32]/20 relative animate-in zoom-in-95 duration-150">
                  <button
                    onClick={() => setActiveValuePropModal(null)}
                    className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-800 transition"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-4 text-[#2E7D32]">
                    {active.icon}
                  </div>

                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#E65100] text-white">
                    {active.badge}
                  </span>

                  <h3 className="text-2xl font-bold font-display text-slate-900 mt-2 mb-3">
                    {active.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {active.fullDesc}
                  </p>

                  <button
                    onClick={() => setActiveValuePropModal(null)}
                    className="w-full py-3 rounded-xl bg-[#2E7D32] text-white font-bold text-xs"
                  >
                    Close &amp; Continue
                  </button>
                </div>
              );
            })()}
          </div>
        )}
      </section>

      {/* 3. FEATURED MENU CAROUSEL WITH HOVER-ZOOM CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D32]">Culinary Highlights</span>
            <h2 className="text-3xl font-black text-slate-900 font-display mt-1">
              Freshly Chopped Signature Bowls
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Hover to preview culinary details. Click "Customize Bowl" to tweak toppings and dressings.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('menu')}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#2E7D32] hover:text-[#1B5E20] cursor-pointer"
          >
            <span>View All 12 Dishes</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDishes.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Image with smooth hover-zoom */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs ${
                        item.isVeg ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                      }`}
                    >
                      {item.isVeg ? 'Veg' : 'Non-Veg'}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E65100] text-white shadow-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-2.5 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl text-xs font-black text-[#1B5E20] shadow-md">
                    ₹{item.basePrice}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900 font-display line-clamp-1 group-hover:text-[#2E7D32] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {item.chefNote}
                  </p>

                  {/* Nutrition Summary Box */}
                  <div className="mt-3 grid grid-cols-3 gap-1.5 bg-slate-50 p-2 rounded-xl text-center text-[10px] font-bold text-slate-600 border border-slate-100">
                    <div>
                      <span className="text-slate-400 block text-[9px]">Kcal</span>
                      <span className="text-slate-900 font-black">{item.kcal}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">Protein</span>
                      <span className="text-[#2E7D32] font-black">{item.protein}g</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">Fiber</span>
                      <span className="text-emerald-700 font-black">{item.fiber}g</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="p-5 pt-0 flex gap-2">
                <button
                  onClick={() => openMealCustomizer(item)}
                  className="flex-1 py-2.5 rounded-xl border border-[#2E7D32]/30 text-[#2E7D32] hover:bg-[#2E7D32]/5 text-xs font-bold transition cursor-pointer"
                >
                  Customize
                </button>
                <button
                  onClick={() => openMealCustomizer(item)}
                  className="px-3.5 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold transition shadow-md shadow-[#2E7D32]/20 cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHATSAPP QUICK-ORDER WIDGET WITH QR CODE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Copy */}
            <div className="md:col-span-8 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-emerald-100 text-xs font-bold">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                <span>Instant WhatsApp Automation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight">
                Prefer ordering via chat? Click here for our automated WhatsApp Chatbot!
              </h2>
              <p className="text-emerald-100 text-sm max-w-xl leading-relaxed">
                Scan the QR code or click the direct button below to order your daily bowl, push your next day delivery, or check live kitchen dispatch in under 30 seconds via WhatsApp (9353173101).
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <a
                  href="https://wa.me/919353173101?text=Hi%20le%20bol%20sant%C3%A9!%20I%20want%20to%20order%20a%20fresh%20salad%20bowl%20or%20subscribe"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-[#1B5E20] font-extrabold text-sm shadow-lg hover:bg-emerald-50 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Launch WhatsApp Chatbot (9353173101)</span>
                </a>
                <span className="text-xs text-emerald-200 font-semibold">
                  Response time: &lt; 15 seconds
                </span>
              </div>
            </div>

            {/* Right QR Box */}
            <div className="md:col-span-4 flex flex-col items-center justify-center">
              <div className="bg-white p-4 rounded-3xl shadow-2xl text-center border-4 border-emerald-300/40">
                {/* SVG High-Fidelity Simulated QR Code */}
                <div className="w-36 h-36 mx-auto bg-slate-900 rounded-2xl p-2.5 flex flex-col justify-between shadow-inner">
                  <div className="flex justify-between">
                    <div className="w-8 h-8 border-4 border-white rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-xs"></div>
                    </div>
                    <div className="w-8 h-8 border-4 border-white rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-xs"></div>
                    </div>
                  </div>
                  <div className="text-white font-mono text-[9px] tracking-widest uppercase font-bold text-center">
                    LE BOL SANTÉ
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-8 h-8 border-4 border-white rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-xs"></div>
                    </div>
                    <div className="w-10 h-6 bg-emerald-400 rounded-md flex items-center justify-center text-slate-900 text-[10px] font-black">
                      WA
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <span className="text-xs font-black text-slate-800 block">Scan to Chat on WhatsApp</span>
                  <span className="text-[11px] text-slate-500 font-semibold">+91 9353173101</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#2E7D32]">Real Transformations</span>
          <h2 className="text-3xl font-black text-slate-900 font-display mt-1">
            Endorsed by Trainers &amp; Daily Subscribers
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Over 2,400+ fresh bowls delivered each month across premier fitness centers and tech parks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                  "{t.review}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#2E7D32]"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">{t.role}</p>
                  <span className="inline-block text-[10px] font-bold text-[#2E7D32] bg-emerald-50 px-2 py-0.5 rounded-full mt-0.5">
                    {t.verifiedTag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
