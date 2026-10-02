import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CustomerProfile, DeliveryType } from '../types';
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Dumbbell,
  Briefcase,
  Home,
  Building,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  Navigation
} from 'lucide-react';

export const ProfileDrawer: React.FC = () => {
  const {
    isProfileDrawerOpen,
    setIsProfileDrawerOpen,
    currentCustomer,
    updateCustomerProfile,
    logoutCustomer
  } = useApp();

  const [formData, setFormData] = useState<CustomerProfile>({
    fullName: '',
    mobile: '',
    secondaryMobile: '',
    email: '',
    deliveryType: 'Gym / Fitness Center',
    flatDoorNo: '',
    buildingOrGym: '',
    street: '',
    landmark: '',
    pinCode: '',
    googleMapUrl: '',
    dietaryPreferences: ''
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (currentCustomer) {
      setFormData(currentCustomer);
    }
  }, [currentCustomer, isProfileDrawerOpen]);

  if (!isProfileDrawerOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeliveryTypeSelect = (type: DeliveryType) => {
    setFormData((prev) => ({ ...prev, deliveryType: type }));
  };

  const handleAutoFillLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          const mapUrl = `https://maps.google.com/?q=${lat},${lng}`;
          setFormData((prev) => ({ ...prev, googleMapUrl: mapUrl }));
        },
        () => {
          // Fallback location for Bangalore Indiranagar / Koramangala fitness hub
          setFormData((prev) => ({
            ...prev,
            googleMapUrl: 'https://maps.google.com/?q=12.9716,77.6412'
          }));
        }
      );
    } else {
      setFormData((prev) => ({
        ...prev,
        googleMapUrl: 'https://maps.google.com/?q=12.9716,77.6412'
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomerProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
    }, 2000);
  };

  const deliveryOptions: { type: DeliveryType; icon: React.ReactNode; label: string }[] = [
    { type: 'Gym / Fitness Center', icon: <Dumbbell className="w-4 h-4" />, label: 'Gym / Fitness' },
    { type: 'Workplace / Office', icon: <Briefcase className="w-4 h-4" />, label: 'Office / Work' },
    { type: 'PG / Hostel', icon: <Building className="w-4 h-4" />, label: 'PG / Hostel' },
    { type: 'Home / Residential', icon: <Home className="w-4 h-4" />, label: 'Home' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-[#2E7D32]/20">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-100" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-display">Customer Master Profile</h2>
                <p className="text-xs text-emerald-100/90">Mandatory delivery & allergy credentials</p>
              </div>
            </div>
            <button
              onClick={() => setIsProfileDrawerOpen(false)}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
            {savedSuccess && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-[#1B5E20] rounded-xl text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Profile updated & synchronized with Customer_Master sheet!</span>
              </div>
            )}

            {/* Core Identification */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#2E7D32] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" /> 1. Customer Identification
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Number (Primary Key) <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-slate-400">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      placeholder="9845012345"
                      className="w-full pl-11 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] bg-slate-50 font-bold text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Secondary / Emergency Phone
                  </label>
                  <input
                    type="tel"
                    name="secondaryMobile"
                    value={formData.secondaryMobile || ''}
                    onChange={handleChange}
                    placeholder="e.g. 9845099999"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="name@fitnesshub.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#2E7D32] focus:ring-1 focus:ring-[#2E7D32] bg-white font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Type */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#2E7D32] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> 2. Delivery Destination Hub
              </h3>

              <div className="grid grid-cols-2 gap-2">
                {deliveryOptions.map((opt) => (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => handleDeliveryTypeSelect(opt.type)}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                      formData.deliveryType === opt.type
                        ? 'bg-emerald-50 border-[#2E7D32] text-[#1B5E20] shadow-xs'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span className={formData.deliveryType === opt.type ? 'text-[#2E7D32]' : 'text-slate-400'}>
                      {opt.icon}
                    </span>
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#2E7D32]">
                3. Primary Delivery Address
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Flat / Door / Locker No. <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="flatDoorNo"
                    value={formData.flatDoorNo}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Locker #42 / 3rd Floor Desk"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#2E7D32] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Building / Gym / Hub Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="buildingOrGym"
                    value={formData.buildingOrGym}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Cult.fit Indiranagar Hub"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#2E7D32] bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Street / Area <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    required
                    placeholder="e.g. 100 Feet Road, 4th Block"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#2E7D32] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Landmark <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Opposite Toit / Near Metro"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#2E7D32] bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Pin Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    required
                    placeholder="560038"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-[#2E7D32] bg-white"
                  />
                </div>
              </div>

              {/* Google Map Location Link */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                    <span>Google Map Location Link</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAutoFillLocation}
                    className="text-[11px] font-bold text-[#2E7D32] hover:text-[#1B5E20] flex items-center gap-1 cursor-pointer bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200"
                  >
                    <Navigation className="w-3 h-3" /> Auto-Pin My Location
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="url"
                    name="googleMapUrl"
                    value={formData.googleMapUrl}
                    onChange={handleChange}
                    required
                    placeholder="https://maps.google.com/?q=12.9716,77.6412"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-700 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Dietary Preferences & Allergy Alerts */}
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#2E7D32] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> 4. Dietary Preferences & Allergy Alerts
              </h3>
              <div>
                <textarea
                  name="dietaryPreferences"
                  rows={3}
                  value={formData.dietaryPreferences}
                  onChange={handleChange}
                  placeholder="e.g. Strictly vegetarian, lactose-intolerant, no peanuts, dressing strictly on the side."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:border-[#2E7D32] bg-white"
                ></textarea>
                <p className="text-[11px] text-slate-500 mt-1">
                  Our morning chef reads these notes on every daily packaging label.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm shadow-md shadow-[#2E7D32]/25 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Profile Credentials</span>
              </button>

              <button
                type="button"
                onClick={logoutCustomer}
                className="w-full py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition text-center cursor-pointer"
              >
                Log Out of Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
