import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  AlertTriangle,
  Building2,
  Users,
  CheckCircle2,
  MapPin,
  Sparkles,
  Phone,
  Mail,
  Navigation,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export const BulkOrdersTab: React.FC = () => {
  const { submitBulkOrder, currentCustomer } = useApp();

  // Categories: Kids Special | General Corporate & Event
  const [category, setCategory] = useState<'Kids Special' | 'General Corporate & Event'>('General Corporate & Event');
  const [contactPerson, setContactPerson] = useState(currentCustomer?.fullName || '');
  const [mobile, setMobile] = useState(currentCustomer?.mobile || '');
  const [email, setEmail] = useState(currentCustomer?.email || '');
  const [organization, setOrganization] = useState(currentCustomer?.buildingOrGym || '');
  const [numberOfPacks, setNumberOfPacks] = useState<number>(30);
  const [deliveryLocation, setDeliveryLocation] = useState(currentCustomer?.street || '');
  const [landmark, setLandmark] = useState(currentCustomer?.landmark || '');
  const [googleMapUrl, setGoogleMapUrl] = useState(currentCustomer?.googleMapUrl || '');
  const [dietaryPreferences, setDietaryPreferences] = useState('');
  const [menuPackage, setMenuPackage] = useState('High-Protein Salad & Fruit Bowl Combo');

  // Interactive Date Picker: Auto-disables next 4 days (minimum selectable date is Today + 5 days)
  const calculateMinDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toISOString().split('T')[0];
  };
  const minSelectableDate = calculateMinDate();
  const [deliveryDate, setDeliveryDate] = useState<string>(minSelectableDate);

  const [submittedBookingId, setSubmittedBookingId] = useState<string | null>(null);

  // Price estimate (e.g. ₹160/pack bulk discounted)
  const perPackPrice = category === 'Kids Special' ? 140 : 160;
  const estimatedTotal = numberOfPacks * perPackPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (numberOfPacks < 15) {
      alert('Minimum bulk order quantity is 15 packs.');
      return;
    }
    const order = submitBulkOrder({
      category,
      contactPerson,
      mobile,
      email,
      organization,
      numberOfPacks,
      deliveryDate,
      deliveryLocation,
      landmark,
      googleMapUrl,
      dietaryPreferences,
      menuPackage,
      totalEstimate: estimatedTotal
    });
    setSubmittedBookingId(order.id);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Catching Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-[#1B5E20] text-xs font-bold shadow-xs">
          <Users className="w-3.5 h-3.5" />
          <span>Institutional, School &amp; Corporate Catering</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
          Fuel Your Event or Team with Fresh, Healthy Eating
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Custom macro-portioned bowls for sports meets, fitness seminars, corporate retreats, school health days, and gym celebrations.
        </p>
      </div>

      {/* Important Notice Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border-2 border-amber-300/80 text-amber-950 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-amber-800" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-black uppercase tracking-wider text-amber-900">
            Important Notice
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-amber-800 mt-0.5">
            "Bulk orders must be placed at least 5 days in advance. 100% advance payment required."
          </p>
          <p className="text-[11px] text-amber-700 mt-0.5">
            This guarantees our farm-direct procurement of certified organic greens, sprouting cycles, and dedicated insulated transport.
          </p>
        </div>
      </div>

      {/* Main Bulk Order Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Category Switcher */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-[#2E7D32] mb-3">
              1. Select Event Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setCategory('Kids Special')}
                className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer flex items-center justify-between ${
                  category === 'Kids Special'
                    ? 'border-[#2E7D32] bg-emerald-50/60 text-[#1B5E20]'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="font-bold text-base flex items-center gap-2">
                    <span>🎈 Kids Special</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-black">
                      School / Sports Academy
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Fruit bowls, gentle mild seasoning, immunity chia oats, bite-sized cucumber stars &amp; berry smoothies.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-[#2E7D32]">₹140</div>
                  <div className="text-[10px] text-slate-400">per pack</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCategory('General Corporate & Event')}
                className={`p-4 rounded-2xl border-2 text-left transition cursor-pointer flex items-center justify-between ${
                  category === 'General Corporate & Event'
                    ? 'border-[#2E7D32] bg-emerald-50/60 text-[#1B5E20]'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="font-bold text-base flex items-center gap-2">
                    <span>🏢 General Corporate &amp; Event</span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-black">
                      Workplace / Gyms
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Signature chef salads, high-protein chicken/paneer bowls, Greek feta crunches &amp; cold-pressed soups.
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-[#2E7D32]">₹160</div>
                  <div className="text-[10px] text-slate-400">per pack</div>
                </div>
              </button>
            </div>
          </div>

          {/* 2. Advance Date Picker & Packs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>Event Delivery Date (Minimum 5 Days Advance) *</span>
                <span className="text-[10px] text-amber-700 font-extrabold bg-amber-100 px-2 py-0.5 rounded-md">
                  Min: {minSelectableDate}
                </span>
              </label>
              {/* Interactive Date Picker: Calendar auto-disables the next 4 days */}
              <input
                type="date"
                min={minSelectableDate}
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                required
                className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm font-bold bg-white text-slate-800"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Dates prior to {minSelectableDate} are disabled in observance of our 5-day advance prep policy.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Number of Packs Requested (Minimum 15) *
              </label>
              <input
                type="number"
                min={15}
                max={500}
                value={numberOfPacks}
                onChange={(e) => setNumberOfPacks(Math.max(15, parseInt(e.target.value) || 15))}
                required
                className="w-full px-3.5 py-3 rounded-xl border border-slate-300 text-sm font-bold bg-white text-slate-800"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Includes sugarcane bagasse containers, labels with macros, and compostable wooden cutlery.
              </p>
            </div>
          </div>

          {/* 3. Contact & Organization Details */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#2E7D32]">
              2. Point of Contact &amp; Organization
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contact Person Name *
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Priya Nambiar"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-slate-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="9845012345"
                    required
                    className="w-full pl-11 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email ID *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="priya@company.org"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Name of Organization / School / Gym *
                </label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="e.g. Cult Indiranagar / Infosys SEZ"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>
            </div>
          </div>

          {/* 4. Location & Google Map Link */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#2E7D32]">
              3. Delivery Location &amp; Coordinates
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Delivery Location &amp; Venue Address *
                </label>
                <input
                  type="text"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  placeholder="e.g. Banquet Hall / 5th Floor Cafeteria"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Prominent Landmark *
                </label>
                <input
                  type="text"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  placeholder="e.g. Opposite Sony Signal"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Google Map Location Link *
                </label>
                <input
                  type="url"
                  value={googleMapUrl}
                  onChange={(e) => setGoogleMapUrl(e.target.value)}
                  placeholder="https://maps.google.com/?q=..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white text-slate-700"
                />
              </div>
            </div>
          </div>

          {/* 5. Menu Package & Dietary Preferences */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-[#2E7D32]">
              4. Menu Package &amp; Dietary Split
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Menu Package
                </label>
                <select
                  value={menuPackage}
                  onChange={(e) => setMenuPackage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                >
                  <option value="High-Protein Salad & Fruit Bowl Combo">High-Protein Salad &amp; Fruit Bowl Combo</option>
                  <option value="Executive Salad & Warm Artisanal Soup Box">Executive Salad &amp; Warm Artisanal Soup Box</option>
                  <option value="Superfood Energy Pack (Bowl + Chia Smoothie)">Superfood Energy Pack (Bowl + Chia Smoothie)</option>
                  <option value="School Sports Day Fruit & Oats Feast">School Sports Day Fruit &amp; Oats Feast</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Dietary Preferences / Veg &amp; Non-Veg Count Split
                </label>
                <input
                  type="text"
                  value={dietaryPreferences}
                  onChange={(e) => setDietaryPreferences(e.target.value)}
                  placeholder="e.g. 20 Vegetarian (Paneer), 10 Non-Veg (Grilled Chicken)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>
            </div>
          </div>

          {/* Live Quote & Submission */}
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-500 block uppercase">
                Estimated Order Value ({numberOfPacks} Packs)
              </span>
              <div className="text-3xl font-black text-[#1B5E20] font-display">
                ₹{estimatedTotal}
              </div>
              <span className="text-[11px] text-amber-800 font-semibold">
                * 100% advance payment required upon verification
              </span>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-extrabold text-sm shadow-xl shadow-[#2E7D32]/25 transition cursor-pointer"
            >
              Submit Bulk Order Request &bull; ₹{estimatedTotal}
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      {submittedBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full p-6 text-center shadow-2xl border border-emerald-200 animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3 text-[#2E7D32]">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-black font-display text-slate-900 mb-1">
              Bulk Order Logged!
            </h3>
            <p className="text-xs text-slate-600 mb-4">
              Booking Ref: <strong className="font-mono text-slate-900">{submittedBookingId}</strong>. Synchronized with our Financials &amp; Kitchen Master Sheets.
            </p>

            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-xs text-left mb-6 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Event Date:</span>
                <span className="font-bold text-[#2E7D32]">{deliveryDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Organization:</span>
                <span className="font-bold text-slate-800">{organization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Packs Count:</span>
                <span className="font-bold text-slate-800">{numberOfPacks} Packs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Quotation:</span>
                <span className="font-black text-[#1B5E20]">₹{estimatedTotal} (100% Adv)</span>
              </div>
            </div>

            <button
              onClick={() => setSubmittedBookingId(null)}
              className="w-full py-3 rounded-xl bg-[#2E7D32] text-white font-bold text-xs"
            >
              Done &bull; Return to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
