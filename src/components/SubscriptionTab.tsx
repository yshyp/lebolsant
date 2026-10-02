import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PLAN_CONFIGS, SESSION_SLOTS, MENU_ITEMS } from '../data/mockData';
import { PlanTier, DeliveryPattern, SessionSlot } from '../types';
import {
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  Users,
  ShieldCheck,
  CreditCard,
  Settings,
  ArrowRight,
  Flame,
  Gift,
  HelpCircle,
  AlertCircle,
  X,
  ChevronDown
} from 'lucide-react';

export const SubscriptionTab: React.FC = () => {
  const {
    adminPricing,
    updateAdminPricing,
    currentCustomer,
    isLoggedIn,
    setIsAuthModalOpen,
    createNewSubscription,
    setCurrentTab,
    setIsMakeMySaladOpen
  } = useApp();

  // Selection States
  const [selectedPlanTier, setSelectedPlanTier] = useState<PlanTier>('monthly');
  const [selectedPattern, setSelectedPattern] = useState<DeliveryPattern>('weekdays');
  const [selectedSlot, setSelectedSlot] = useState<SessionSlot>('M-S-1');
  const [buddyAddOn, setBuddyAddOn] = useState<boolean>(false);
  const [selectedMealName, setSelectedMealName] = useState<string>(
    MENU_ITEMS[0].name
  );

  // Mandatory Policy Checkboxes
  const [agreeRefundPolicy, setAgreeRefundPolicy] = useState<boolean>(false);
  const [agreeDayPushPolicy, setAgreeDayPushPolicy] = useState<boolean>(false);

  // Admin Dynamic Pricing Drawer/Modal
  const [showAdminPricingModal, setShowAdminPricingModal] = useState<boolean>(false);
  const [tempPricing, setTempPricing] = useState(adminPricing);

  // Checkout Modal
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [orderSuccessSubId, setOrderSuccessSubId] = useState<string | null>(null);

  // Calculation Engine
  const currentPlan = PLAN_CONFIGS.find((p) => p.id === selectedPlanTier)!;
  const baseRatePerMeal = adminPricing[currentPlan.baseMealRateKey];
  const mealCount = currentPlan.durationDays;
  const standardSingleTotal = adminPricing.singleMealRate * mealCount;
  const subtotalBeforeBuddy = baseRatePerMeal * mealCount;
  const duoMultiplier = buddyAddOn ? 2 : 1;
  const duoDiscountMultiplier = buddyAddOn ? 0.95 : 1.0; // Extra 5% off for duo
  const finalPrice = Math.round(subtotalBeforeBuddy * duoMultiplier * duoDiscountMultiplier);
  const totalSavings = (adminPricing.singleMealRate * mealCount * duoMultiplier) - finalPrice;

  const patterns: { id: DeliveryPattern; label: string; desc: string }[] = [
    { id: 'weekdays', label: 'Weekdays (M-F)', desc: '5 days a week, Monday through Friday' },
    { id: 'mwf', label: 'M-W-F', desc: 'Mon, Wed, Fri (Every alternate workout day)' },
    { id: 'tts', label: 'T-T-S', desc: 'Tue, Thu, Sat (Cardio & core days)' },
    { id: 'weekdays-sat', label: 'Weekdays + Saturday', desc: '6 days a week high performance' },
    { id: 'one-day', label: 'One Day Specific', desc: 'Custom single anchor day weekly' }
  ];

  const handleAdminPricingSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminPricing(tempPricing);
    setShowAdminPricingModal(false);
  };

  const handleInitiateCheckout = () => {
    if (!isLoggedIn) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!agreeRefundPolicy || !agreeDayPushPolicy) {
      alert('Please check both mandatory policy agreements before proceeding to checkout.');
      return;
    }
    setIsCheckoutModalOpen(true);
  };

  const handleConfirmPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const sub = createNewSubscription({
        planType: selectedPlanTier,
        pattern: selectedPattern,
        sessionSlot: selectedSlot,
        buddyAddOn,
        selectedMealName
      });
      setIsProcessingPayment(false);
      setIsCheckoutModalOpen(false);
      setOrderSuccessSubId(sub.subscriptionId);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Title & Top Operational Admin Access */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 text-[#1B5E20] text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Guaranteed Healthy Nutrition &bull; Maximum Value</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-display">
            Subscription Plans &amp; Pricing Matrix
          </h1>
          <p className="text-slate-600 text-sm mt-1 max-w-2xl">
            Choose your habit tier, workout frequency pattern, and precision delivery window. Unlock custom macros, surprise gift perks, and duo discounts.
          </p>
        </div>

        {/* Dynamic Admin Pricing Table Engine Toggle */}
        <button
          onClick={() => {
            setTempPricing(adminPricing);
            setShowAdminPricingModal(true);
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition self-start md:self-auto border border-slate-300"
          title="Adjust live per-salad rates in backend engine"
        >
          <Settings className="w-4 h-4 text-slate-500" />
          <span>Operational Pricing Engine</span>
        </button>
      </div>

      {/* 1. PLAN TIERS GRID */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold font-display text-slate-900">
            Step 1: Choose Your Plan Tier
          </h2>
          <p className="text-xs text-slate-500">
            Higher commitments unlock deeper discounts, the "Make My Salad" macro creator, and Day Push flexibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLAN_CONFIGS.map((plan) => {
            const isSelected = selectedPlanTier === plan.id;
            const ratePerMeal = adminPricing[plan.baseMealRateKey];

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanTier(plan.id)}
                className={`rounded-3xl p-6 transition-all duration-200 cursor-pointer relative flex flex-col justify-between border-2 ${
                  isSelected
                    ? 'bg-white border-[#2E7D32] shadow-xl shadow-[#2E7D32]/15 ring-2 ring-[#2E7D32]/20'
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                }`}
              >
                {/* Discount Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                      plan.discountPct >= 20
                        ? 'bg-[#E65100] text-white shadow-md'
                        : isSelected
                        ? 'bg-[#2E7D32] text-white'
                        : 'bg-emerald-50 text-[#1B5E20]'
                    }`}
                  >
                    {plan.discountPct}% Discount
                  </span>
                  {plan.id === 'monthly' && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Most Popular
                    </span>
                  )}
                  {plan.id === 'quarterly' && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      Best Value
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    {plan.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-1 mb-4">
                    {plan.tagline}
                  </p>

                  {/* Price Tag */}
                  <div className="bg-slate-50 rounded-2xl p-4 mb-4 border border-slate-100">
                    <div className="text-3xl font-black text-[#1B5E20] font-display">
                      ₹{ratePerMeal}
                      <span className="text-xs font-semibold text-slate-500"> / meal</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
                      <span>{plan.durationDays} Fresh Meals Total</span>
                      <span className="text-emerald-700 font-bold">
                        Total ₹{ratePerMeal * plan.durationDays}
                      </span>
                    </div>
                  </div>

                  {/* Features list */}
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {plan.perks.map((perk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isSelected ? 'text-[#2E7D32]' : 'text-slate-400'
                          }`}
                        />
                        <span className="leading-snug">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Selection Radio / Action Button */}
                <div className="pt-6 mt-6 border-t border-slate-100">
                  <div
                    className={`w-full py-2.5 rounded-xl text-xs font-bold text-center transition ${
                      isSelected
                        ? 'bg-[#2E7D32] text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ Plan Selected' : 'Select Plan'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. DELIVERY PATTERNS & TIME SLOTS SELECTOR GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Frequency Patterns */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#2E7D32]" />
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Step 2: Delivery Pattern &amp; Frequency
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Pick how many days per week you want your bowl delivered to your destination.
          </p>

          <div className="space-y-2.5">
            {patterns.map((p) => {
              const isSelected = selectedPattern === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedPattern(p.id)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-[#2E7D32] text-[#1B5E20] shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <span className="text-sm font-bold block">{p.label}</span>
                    <span className="text-xs text-slate-500">{p.desc}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-[#2E7D32] bg-[#2E7D32] text-white' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Session Slots (4 Precise Windows) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#2E7D32]" />
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Step 3: Session Delivery Time Slot
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Coordinated with fitness hub workout batches and office hours.
          </p>

          <div className="space-y-2.5">
            {SESSION_SLOTS.map((slot) => {
              const isSelected = selectedSlot === slot.id;
              return (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-[#2E7D32] text-[#1B5E20] shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black px-2 py-0.5 rounded-md bg-slate-200 text-slate-800">
                        {slot.id}
                      </span>
                      <span className="text-sm font-bold text-slate-900">{slot.timeWindow}</span>
                    </div>
                    <span className="text-xs text-slate-500 mt-1 block">{slot.description}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-[#2E7D32] bg-[#2E7D32] text-white' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. MEAL SELECTION & GYM BUDDY ADD-ON */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Preferred Initial Dish Selection */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Step 4: Default Signature Bowl
            </h3>
            {currentPlan.allowsCustomMacros && (
              <button
                type="button"
                onClick={() => setIsMakeMySaladOpen(true)}
                className="text-xs font-bold text-[#E65100] hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Launch Macro Builder</span>
              </button>
            )}
          </div>
          <p className="text-xs text-slate-500">
            You can freely swap your dish or customize toppings at any time in your customer portal.
          </p>

          <select
            value={selectedMealName}
            onChange={(e) => setSelectedMealName(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-800"
          >
            {MENU_ITEMS.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name} ({m.isVeg ? 'Veg' : 'Non-Veg'}) — {m.protein}g Protein &bull; {m.kcal} Kcal
              </option>
            ))}
          </select>
        </div>

        {/* WORKOUT BUDDY / GYM PARTNER ADD-ON */}
        <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent rounded-3xl p-6 border-2 border-[#E65100]/30 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#E65100] text-white flex items-center justify-center shadow-md">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Workout Buddy / Gym Partner Add-On
                </h3>
                <span className="text-[11px] font-bold text-[#E65100]">
                  Deliver 2 meals to same location &amp; unlock extra 5% duo discount!
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setBuddyAddOn(!buddyAddOn)}
              className={`relative inline-flex h-7 w-13 items-center rounded-full transition-colors cursor-pointer ${
                buddyAddOn ? 'bg-[#E65100]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                  buddyAddOn ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Train with a partner at the gym or share lunch with an office colleague. Both bowls are delivered fresh in the same eco-insulated packaging bundle.
          </p>

          {buddyAddOn && (
            <div className="p-3 bg-white/90 border border-[#E65100]/30 rounded-xl text-xs text-[#E65100] font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#E65100]" />
              <span>Duo Buddy Add-On Active: 2 Bowls/Day + Extra 5% Duo Discount Applied!</span>
            </div>
          )}
        </div>
      </div>

      {/* 4. MANDATORY POLICY CHECKBOXES & FINAL CHECKOUT CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <h3 className="text-xl font-bold font-display text-slate-900">
              Subscription Investment Summary
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Transparent, prorated, with automatic Google Sheets order logging.
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-400 line-through">
              Standard Total: ₹{standardSingleTotal * duoMultiplier}
            </div>
            <div className="text-3xl font-black text-[#1B5E20] font-display">
              ₹{finalPrice}
            </div>
            <div className="text-xs font-bold text-emerald-700">
              You Save ₹{totalSavings} with this plan!
            </div>
          </div>
        </div>

        {/* Selected configuration chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Plan Tier</span>
            <span className="font-bold text-slate-900">{currentPlan.title}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Frequency</span>
            <span className="font-bold text-slate-900">{patterns.find((p) => p.id === selectedPattern)?.label}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Delivery Slot</span>
            <span className="font-bold text-slate-900">{selectedSlot}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[10px] font-bold uppercase">Meals Total</span>
            <span className="font-bold text-[#2E7D32]">
              {mealCount * duoMultiplier} Meals ({buddyAddOn ? '2 per day' : '1 per day'})
            </span>
          </div>
        </div>

        {/* MANDATORY POLICY CHECKBOXES BEFORE CHECKOUT */}
        <div className="space-y-3 p-4 bg-amber-50/70 border border-amber-200 rounded-2xl">
          <div className="text-xs font-black uppercase text-amber-900 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>Mandatory Subscription Agreements (Required to Place Order)</span>
          </div>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeRefundPolicy}
              onChange={(e) => setAgreeRefundPolicy(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#2E7D32] focus:ring-[#2E7D32]"
            />
            <span className="text-xs text-slate-700 leading-snug">
              <strong className="text-slate-900">[x] I have read and accept the Cancellation &amp; Refund Policy.</strong>{' '}
              Prorated refunds are calculated by deducting delivered meals at the standard single-meal rate (₹{adminPricing.singleMealRate}/meal). Balances processed within 5 working days.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeDayPushPolicy}
              onChange={(e) => setAgreeDayPushPolicy(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#2E7D32] focus:ring-[#2E7D32]"
            />
            <span className="text-xs text-slate-700 leading-snug">
              <strong className="text-slate-900">[x] I have read and accept the Day Push &amp; 5 PM Daily Lock Policy.</strong>{' '}
              Deliveries for tomorrow lock at 5:00 PM today. Skips requested after 5:00 PM take effect starting day after tomorrow. Subscription end date extends automatically.
            </span>
          </label>
        </div>

        {/* CTA Button */}
        <div>
          <button
            onClick={handleInitiateCheckout}
            disabled={!agreeRefundPolicy || !agreeDayPushPolicy}
            className="w-full py-4 rounded-2xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-extrabold text-base shadow-xl shadow-[#2E7D32]/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CreditCard className="w-5 h-5 text-emerald-200" />
            <span>
              {isLoggedIn ? `Subscribe Now &bull; Pay ₹${finalPrice}` : 'Sign In via Mobile OTP to Checkout'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
          {!isLoggedIn && (
            <p className="text-[11px] text-center text-slate-500 mt-2">
              Mobile number verification is mandatory to establish your customer master delivery profile.
            </p>
          )}
        </div>
      </div>

      {/* CHECKOUT MODAL */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#2E7D32]/20 relative">
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-2 text-[#2E7D32]">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-display text-slate-900">Secure Payment</h3>
              <p className="text-xs text-slate-500">
                100% Encrypted Payment &bull; Instant Kitchen Notification
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-4 space-y-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Plan:</span>
                <span className="font-bold text-slate-800">{currentPlan.title}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Total Meals:</span>
                <span className="font-bold text-slate-800">{mealCount * duoMultiplier}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Customer:</span>
                <span className="font-bold text-slate-800">{currentCustomer?.fullName} (+91 {currentCustomer?.mobile})</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#1B5E20] pt-2 border-t border-slate-100">
                <span>Payable Amount:</span>
                <span>₹{finalPrice}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2 mb-6">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Payment Mode
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR' },
                  { id: 'card', label: 'Card' },
                  { id: 'netbanking', label: 'NetBanking' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setPaymentMethod(mode.id as any)}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      paymentMethod === mode.id
                        ? 'bg-emerald-50 border-[#2E7D32] text-[#1B5E20]'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleConfirmPayment}
              disabled={isProcessingPayment}
              className="w-full py-3.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isProcessingPayment ? (
                <span>Securing Transaction &amp; Syncing Sheets...</span>
              ) : (
                <span>Complete Payment of ₹{finalPrice}</span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS CONFIRMATION MODAL */}
      {orderSuccessSubId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-emerald-200 animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-[#2E7D32]">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-black font-display text-slate-900 mb-1">
              Subscription Confirmed!
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Your subscription <span className="font-mono font-bold text-slate-900">{orderSuccessSubId}</span> is active and synced to our Google Sheets kitchen fulfillment log!
            </p>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-xs text-left mb-6 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">First Delivery:</span>
                <span className="font-bold text-[#2E7D32]">Tomorrow Morning ({selectedSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Day Push Status:</span>
                <span className="font-bold text-slate-800">Available Daily Before 5 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-slate-800">{currentCustomer?.buildingOrGym || 'Fitness Hub'}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  setOrderSuccessSubId(null);
                  setCurrentTab('account');
                }}
                className="w-full py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-xs shadow-md transition"
              >
                Go to Day Push &amp; Account Portal
              </button>
              <button
                onClick={() => setOrderSuccessSubId(null)}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-700"
              >
                Keep Browsing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC ADMIN PRICING TABLE MODAL */}
      {showAdminPricingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-[#2E7D32]/20 relative">
            <button
              onClick={() => setShowAdminPricingModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-slate-900">
                  Operational Pricing Engine
                </h3>
                <p className="text-xs text-slate-500">
                  Live updates of per-salad rates based on duration
                </p>
              </div>
            </div>

            <form onSubmit={handleAdminPricingSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Single Meal / Weekly Base Rate (₹)
                </label>
                <input
                  type="number"
                  value={tempPricing.singleMealRate}
                  onChange={(e) => setTempPricing({ ...tempPricing, singleMealRate: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Bi-Weekly Rate Per Meal (₹)
                </label>
                <input
                  type="number"
                  value={tempPricing.biWeeklyRate}
                  onChange={(e) => setTempPricing({ ...tempPricing, biWeeklyRate: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Monthly Rate Per Meal (₹)
                </label>
                <input
                  type="number"
                  value={tempPricing.monthlyRate}
                  onChange={(e) => setTempPricing({ ...tempPricing, monthlyRate: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quarterly Rate Per Meal (₹)
                </label>
                <input
                  type="number"
                  value={tempPricing.quarterlyRate}
                  onChange={(e) => setTempPricing({ ...tempPricing, quarterlyRate: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-white"
                  required
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-xs transition"
                >
                  Save &amp; Recalculate Live App
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdminPricingModal(false)}
                  className="px-4 py-3 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
