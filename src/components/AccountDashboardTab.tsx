import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MENU_ITEMS, PLAN_CONFIGS } from '../data/mockData';
import { PlanTier } from '../types';
import {
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Salad,
  Repeat,
  TrendingUp,
  MapPin,
  ShieldCheck,
  CalendarDays,
  X,
  CreditCard,
  Ban
} from 'lucide-react';

export const AccountDashboardTab: React.FC = () => {
  const {
    currentCustomer,
    isLoggedIn,
    setIsAuthModalOpen,
    setIsProfileDrawerOpen,
    userSubscription,
    pushSubscriptionDates,
    switchSubscriptionMeal,
    upgradeUserPlan,
    isBeforeCutoff5PM,
    nextAvailableSkipDate,
    cutoffTimeRemaining,
    requestProratedRefund,
    adminPricing
  } = useApp();

  // Day Push Calendar State
  const [isDayPushModalOpen, setIsDayPushModalOpen] = useState(false);
  const [selectedDatesToSkip, setSelectedDatesToSkip] = useState<string[]>([]);
  const [dayPushFeedback, setDayPushFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Meal Switch State
  const [isSwitchMealModalOpen, setIsSwitchMealModalOpen] = useState(false);
  const [targetMealSwitch, setTargetMealSwitch] = useState(MENU_ITEMS[0].name);
  const [mealSwitchFeedback, setMealSwitchFeedback] = useState<string | null>(null);

  // Upgrade Plan State
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [targetUpgradePlan, setTargetUpgradePlan] = useState<PlanTier>('quarterly');
  const [upgradeFeedback, setUpgradeFeedback] = useState<string | null>(null);

  // Refund State
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [refundFeedback, setRefundFeedback] = useState<string | null>(null);

  if (!isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 flex items-center justify-center mx-auto text-[#2E7D32]">
          <Calendar className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-900">
          Sign In to Access Your Day Push Engine
        </h2>
        <p className="text-sm text-slate-600">
          Use your registered mobile number to manage your active deliveries, freeze dates before 5:00 PM, and customize signature bowls.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm shadow-md transition"
        >
          Sign In with Mobile OTP
        </button>
      </div>
    );
  }

  // Active Subscription data
  const sub = userSubscription;

  // Build calendar dates for the next 14 days
  const generateUpcomingDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = d.getDate();
      const monthName = d.toLocaleDateString('en-US', { month: 'short' });
      dates.push({ iso, dayName, dayNum, monthName, isToday: i === 0 });
    }
    return dates;
  };

  const upcomingDates = generateUpcomingDates();
  const minAllowedSkip = nextAvailableSkipDate();

  const handleToggleSkipDate = (iso: string) => {
    if (iso < minAllowedSkip) {
      alert(
        isBeforeCutoff5PM()
          ? `Day Push for today is locked. Earliest skip date allowed is tomorrow (${minAllowedSkip}).`
          : `5:00 PM kitchen lockout has passed. Kitchen prep for tomorrow is locked. Earliest skip date allowed is day after tomorrow (${minAllowedSkip}).`
      );
      return;
    }
    setSelectedDatesToSkip((prev) =>
      prev.includes(iso) ? prev.filter((d) => d !== iso) : [...prev, iso]
    );
  };

  const handleExecuteDayPush = () => {
    if (selectedDatesToSkip.length === 0) {
      alert('Please click on at least one date on the calendar to skip.');
      return;
    }
    const result = pushSubscriptionDates(selectedDatesToSkip);
    if (result.success) {
      setDayPushFeedback({ type: 'success', message: result.message });
      setSelectedDatesToSkip([]);
    } else {
      setDayPushFeedback({ type: 'error', message: result.message });
    }
  };

  const handleConfirmMealSwitch = () => {
    const res = switchSubscriptionMeal(targetMealSwitch);
    setMealSwitchFeedback(res.message);
  };

  const handleConfirmUpgrade = () => {
    const res = upgradeUserPlan(targetUpgradePlan);
    setUpgradeFeedback(res.message);
  };

  const handleConfirmRefund = () => {
    if (!currentCustomer) return;
    const res = requestProratedRefund(currentCustomer.mobile);
    setRefundFeedback(res.message);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 5 PM Cutoff Operational Banner */}
      <div className={`p-4 sm:p-5 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs ${
        isBeforeCutoff5PM()
          ? 'bg-emerald-50 border-emerald-300 text-[#1B5E20]'
          : 'bg-amber-50 border-amber-300 text-amber-900'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white shrink-0 ${
            isBeforeCutoff5PM() ? 'bg-[#2E7D32]' : 'bg-[#E65100]'
          }`}>
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider">
                {isBeforeCutoff5PM() ? '5:00 PM Cutoff Window OPEN' : '5:00 PM Cutoff Window CLOSED'}
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-black/10">
                Live Kitchen Sync
              </span>
            </div>
            <p className="text-xs font-semibold mt-0.5">
              {isBeforeCutoff5PM() ? (
                <>
                  You have <span className="font-mono font-black">{cutoffTimeRemaining}</span> left today to skip tomorrow's delivery.
                </>
              ) : (
                <>
                  Kitchen morning batches are locked for tomorrow. Skips placed now will start from <strong className="underline">{minAllowedSkip}</strong>.
                </>
              )}
            </p>
          </div>
        </div>

        <div className="text-xs font-bold shrink-0">
          Earliest Allowed Skip: <span className="px-2 py-1 rounded-md bg-white border font-mono">{minAllowedSkip}</span>
        </div>
      </div>

      {/* CUSTOMER GREETING & ACTIVE PLAN OVERVIEW */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#2E7D32] text-white flex items-center justify-center font-display font-black text-lg">
              {currentCustomer?.fullName.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display text-slate-900">
                Welcome back, {currentCustomer?.fullName}!
              </h1>
              <p className="text-xs text-slate-500">
                Mobile Key: +91 {currentCustomer?.mobile} &bull; {currentCustomer?.deliveryType}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsProfileDrawerOpen(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 self-start sm:self-auto"
          >
            Edit Address &amp; Allergies
          </button>
        </div>

        {/* Plan Details Card */}
        {sub ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-emerald-50/80 p-4 rounded-2xl border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Subscription Tier</span>
                <span className="text-lg font-black text-[#1B5E20] capitalize font-display">
                  {sub.planType} Plan
                </span>
                <span className="text-[11px] text-emerald-800 block mt-0.5">
                  Pattern: {sub.pattern} ({sub.sessionSlot})
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Remaining Meals</span>
                <span className="text-2xl font-black text-slate-900 font-display">
                  {sub.mealsRemaining} <span className="text-xs font-medium text-slate-500">/ {sub.mealsTotal}</span>
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">
                  {sub.buddyAddOn ? 'Duo Buddy (2/day)' : 'Single Meal'}
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Active Timeline</span>
                <span className="text-sm font-black text-slate-900 font-mono block">
                  {sub.startDate} to {sub.endDate}
                </span>
                <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
                  {sub.pushedDates.length > 0
                    ? `${sub.pushedDates.length} Days Pushed (Extended)`
                    : 'On regular schedule'}
                </span>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Delivery Destination</span>
                <span className="text-xs font-bold text-slate-800 block truncate">
                  {currentCustomer?.buildingOrGym || 'Indiranagar Hub'}
                </span>
                <span className="text-[11px] text-slate-500 block truncate">
                  {currentCustomer?.flatDoorNo || 'Locker #42'}
                </span>
              </div>
            </div>

            {/* Current Active Dish & Chef Customization */}
            <div className="bg-gradient-to-r from-emerald-900 to-[#1B5E20] text-white p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Salad className="w-5 h-5 text-emerald-200" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold text-emerald-300">Current Assigned Dish</div>
                  <div className="text-base font-bold font-display">{sub.selectedMealName}</div>
                  <div className="text-xs text-emerald-200 mt-0.5">
                    Dietary Notes: "{currentCustomer?.dietaryPreferences || 'Standard fresh prep'}"
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsSwitchMealModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-white text-[#1B5E20] text-xs font-bold hover:bg-emerald-50 transition cursor-pointer"
                >
                  Switch Product
                </button>
                <button
                  onClick={() => setIsUpgradeModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#E65100] text-white text-xs font-bold hover:bg-orange-600 transition cursor-pointer"
                >
                  Upgrade Tier
                </button>
              </div>
            </div>

            {/* MAIN "DAY PUSH / SKIP DELIVERY" BUTTON & CONTROLS */}
            <div className="p-6 rounded-3xl bg-[#FDFBF7] border-2 border-[#2E7D32]/30 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-[#1B5E20] text-xs font-bold mb-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>Instant Scheduling Flexibility</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900">
                    Day Push / Skip Delivery Engine
                  </h3>
                  <p className="text-xs text-slate-600">
                    Resting, traveling, or dining out? Pick dates to freeze your deliveries. Your subscription automatically extends into future dates.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsDayPushModalOpen(true);
                    setDayPushFeedback(null);
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-extrabold text-sm shadow-md shadow-[#2E7D32]/25 transition flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto"
                >
                  <Calendar className="w-4 h-4 text-emerald-200" />
                  <span>Open Day Push Calendar</span>
                </button>
              </div>

              {/* Already pushed dates preview */}
              {sub.pushedDates && sub.pushedDates.length > 0 && (
                <div className="pt-3 border-t border-slate-200/80">
                  <span className="text-xs font-bold text-slate-600 block mb-2">
                    Active Pushed Dates on Your Account:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sub.pushedDates.map((date) => (
                      <span
                        key={date}
                        className="px-3 py-1 bg-amber-100 border border-amber-300 rounded-lg text-xs font-bold text-amber-900 flex items-center gap-1"
                      >
                        <span>⏸ {date} (Frozen)</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions: Prorated Refund Policy Trigger */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span>Prorated refunds guaranteed under 5-working-day processing terms.</span>
              </div>

              <button
                onClick={() => {
                  setIsRefundModalOpen(true);
                  setRefundFeedback(null);
                }}
                className="text-rose-600 font-bold hover:underline"
              >
                Request Prorated Plan Cancellation / Refund
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center space-y-3 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="font-bold text-slate-800 text-base">No active subscription found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't subscribed to a meal routine yet. Join our Weekly, Monthly or Quarterly plans to unlock clean macros and Day Push.
            </p>
          </div>
        )}
      </div>

      {/* 1. DAY PUSH INTERACTIVE CALENDAR MODAL */}
      {isDayPushModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-[#2E7D32]/20 relative max-h-[92vh] overflow-y-auto">
            <button
              onClick={() => setIsDayPushModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#2E7D32] text-white flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-slate-900">
                  Select Days to Push / Skip
                </h3>
                <p className="text-xs text-slate-500">
                  Click any upcoming delivery date to pause. Subscription end date extends automatically.
                </p>
              </div>
            </div>

            {dayPushFeedback && (
              <div
                className={`p-3 rounded-xl text-xs font-bold mb-4 flex items-center gap-2 ${
                  dayPushFeedback.type === 'success'
                    ? 'bg-emerald-100 border border-emerald-300 text-[#1B5E20]'
                    : 'bg-rose-100 border border-rose-300 text-rose-700'
                }`}
              >
                {dayPushFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                )}
                <span>{dayPushFeedback.message}</span>
              </div>
            )}

            {/* Cutoff reminder box */}
            <div className="bg-slate-100 p-3 rounded-xl text-xs text-slate-700 mb-4 flex items-center justify-between">
              <span>
                Earliest selectable date: <strong className="text-slate-900">{minAllowedSkip}</strong>
              </span>
              <span className="font-bold text-[#E65100]">
                {isBeforeCutoff5PM() ? 'Before 5 PM (Tomorrow Allowed)' : 'Past 5 PM (Starts Day After)'}
              </span>
            </div>

            {/* 14-Day Visual Calendar Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {upcomingDates.map((item) => {
                const isSelected = selectedDatesToSkip.includes(item.iso);
                const isAlreadyPushed = sub?.pushedDates.includes(item.iso);
                const isLocked = item.iso < minAllowedSkip;

                return (
                  <button
                    key={item.iso}
                    type="button"
                    onClick={() => handleToggleSkipDate(item.iso)}
                    disabled={isLocked}
                    className={`p-3 rounded-xl border text-center transition cursor-pointer relative ${
                      isLocked
                        ? 'bg-slate-100 border-slate-200 text-slate-400 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-amber-100 border-amber-400 text-amber-900 ring-2 ring-amber-400'
                        : isAlreadyPushed
                        ? 'bg-slate-200 border-slate-300 text-slate-500'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-[#2E7D32]'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold text-slate-400">{item.dayName}</div>
                    <div className="text-lg font-black font-display">{item.dayNum}</div>
                    <div className="text-[10px] text-slate-500">{item.monthName}</div>

                    {isLocked && (
                      <span className="text-[9px] font-bold text-slate-400 block mt-1">Locked</span>
                    )}
                    {isSelected && (
                      <span className="text-[9px] font-bold text-amber-800 block mt-1">Pushing ⏸</span>
                    )}
                    {isAlreadyPushed && !isSelected && (
                      <span className="text-[9px] font-bold text-slate-500 block mt-1">Pushed</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleExecuteDayPush}
                className="flex-1 py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-xs shadow-md transition"
              >
                Confirm Day Push ({selectedDatesToSkip.length} Days)
              </button>
              <button
                type="button"
                onClick={() => setIsDayPushModalOpen(false)}
                className="px-4 py-3 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. PLAN SWITCH PRODUCT MODAL (3-Day activation delay requirement) */}
      {isSwitchMealModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#2E7D32]/20 relative">
            <button
              onClick={() => {
                setIsSwitchMealModalOpen(false);
                setMealSwitchFeedback(null);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#2E7D32] text-white flex items-center justify-center">
                <Repeat className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-slate-900">
                  Switch Product / Dish
                </h3>
                <p className="text-xs text-slate-500">
                  Select another dish of equal value for your recurring delivery.
                </p>
              </div>
            </div>

            {/* 3-Working-Day Activation Delay Notice */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 mb-4 space-y-1">
              <strong className="block font-bold">Kitchen Notice: 3-Working-Day Activation Delay</strong>
              <p className="text-[11px] text-amber-800">
                To allow our organic farm harvest and microgreen sprouting cycles, meal switches take effect in 3 working days.
              </p>
            </div>

            {mealSwitchFeedback ? (
              <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-bold text-[#1B5E20] mb-4">
                {mealSwitchFeedback}
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Choose New Signature Bowl
                  </label>
                  <select
                    value={targetMealSwitch}
                    onChange={(e) => setTargetMealSwitch(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800"
                  >
                    {MENU_ITEMS.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name} ({item.isVeg ? 'Veg' : 'Non-Veg'}) — {item.protein}g Protein
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmMealSwitch}
                  className="w-full py-3.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-xs shadow-md transition"
                >
                  Confirm Product Switch
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. PLAN UPGRADE MODAL (Free upgrades with balance transfer) */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#2E7D32]/20 relative">
            <button
              onClick={() => {
                setIsUpgradeModalOpen(false);
                setUpgradeFeedback(null);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#E65100] text-white flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-slate-900">
                  Upgrade Subscription Tier
                </h3>
                <p className="text-xs text-slate-500">
                  Apply current balance smoothly to Quarterly Elite with bonus gifts.
                </p>
              </div>
            </div>

            {upgradeFeedback ? (
              <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-bold text-[#1B5E20] mb-4">
                {upgradeFeedback}
              </div>
            ) : (
              <div className="space-y-4 mb-6">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-[#1B5E20]">
                  <strong>Current Tier:</strong> {sub?.planType.toUpperCase()} &bull; Balance will be seamlessly credited.
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Upgrade To Higher Commitment Tier
                  </label>
                  <select
                    value={targetUpgradePlan}
                    onChange={(e) => setTargetUpgradePlan(e.target.value as PlanTier)}
                    className="w-full p-3 rounded-xl border border-slate-300 text-xs font-semibold bg-white text-slate-800"
                  >
                    <option value="monthly">Monthly Athlete Pro (15% Off + Custom Macros)</option>
                    <option value="quarterly">Quarterly Transformation Elite (20% Off + Shaker &amp; Bars)</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmUpgrade}
                  className="w-full py-3.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-xs shadow-md transition"
                >
                  Apply Balance &amp; Upgrade
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. PRORATED REFUND ENGINE MODAL (Terms & Conditions) */}
      {isRefundModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-rose-200 relative">
            <button
              onClick={() => {
                setIsRefundModalOpen(false);
                setRefundFeedback(null);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <Ban className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-slate-900">
                  Prorated Refund Calculation
                </h3>
                <p className="text-xs text-slate-500">
                  Per Terms &amp; Conditions clause 4.2
                </p>
              </div>
            </div>

            {refundFeedback ? (
              <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-xl text-xs font-bold text-[#1B5E20] mb-4">
                {refundFeedback}
              </div>
            ) : (
              <div className="space-y-4 mb-6 text-xs text-slate-700">
                <div className="p-3 bg-slate-100 rounded-xl space-y-1.5">
                  <div className="flex justify-between">
                    <span>Delivered Meals:</span>
                    <span className="font-bold text-slate-900">{(sub?.mealsTotal || 0) - (sub?.mealsRemaining || 0)} Meals</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard Single Rate:</span>
                    <span className="font-bold text-slate-900">₹{adminPricing.singleMealRate} / meal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Standard Delivered Deduction:</span>
                    <span className="font-bold text-rose-700">
                      ₹{((sub?.mealsTotal || 0) - (sub?.mealsRemaining || 0)) * adminPricing.singleMealRate}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Per our agreed Terms &amp; Conditions, canceling a discounted subscription recalculates all delivered meals at the non-discounted single rate. The remaining balance is credited to your bank within 5 working days.
                </p>

                <button
                  type="button"
                  onClick={handleConfirmRefund}
                  className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition"
                >
                  Confirm Cancellation &amp; Request Refund
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
