import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, KeyRound, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, X } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, sendOtp, verifyOtp, setIsProfileDrawerOpen } = useApp();

  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [demoOtpHint, setDemoOtpHint] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const generatedOtp = await sendOtp(cleanPhone);
      setDemoOtpHint(generatedOtp);
      setStep('otp');
    } catch {
      setError('Unable to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpCode.length < 4) {
      setError('Please enter the 6-digit OTP code.');
      return;
    }
    setError(null);
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    const valid = verifyOtp(cleanPhone, otpCode);

    if (valid) {
      // Success! Open profile drawer so user can verify mandatory delivery fields
      setIsAuthModalOpen(false);
      setIsProfileDrawerOpen(true);
      // Reset
      setStep('phone');
      setPhoneNumber('');
      setOtpCode('');
      setDemoOtpHint(null);
    } else {
      setError('Invalid OTP code. Please use demo OTP: 543210');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full shadow-2xl border border-[#2E7D32]/20 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-black/5 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] p-6 text-white text-center">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Phone className="w-6 h-6 text-emerald-100" />
          </div>
          <h3 className="text-2xl font-bold font-display tracking-tight">Customer Access</h3>
          <p className="text-xs text-emerald-100/90 mt-1">
            Mobile Number (Primary Key) &bull; Instant OTP Verification
          </p>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {step === 'phone' ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  10-Digit Mobile Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 font-bold text-sm">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="9845012345"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 font-semibold text-slate-800 tracking-wider text-base"
                    required
                    autoFocus
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  We deliver directly to gyms, offices & PGs. Your number is your subscription key.
                </p>
              </div>

              {/* Quick test numbers */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-2.5 text-xs text-[#1B5E20]">
                <p className="font-bold mb-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Instant Test Accounts:</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setPhoneNumber('9845012345')}
                    className="px-2 py-1 bg-white border border-emerald-300 rounded-md text-[11px] font-semibold hover:bg-emerald-100 transition"
                  >
                    Rahul (Gym Pro): 9845012345
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhoneNumber('9123456789')}
                    className="px-2 py-1 bg-white border border-emerald-300 rounded-md text-[11px] font-semibold hover:bg-emerald-100 transition"
                  >
                    Pooja (Office): 9123456789
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm shadow-md shadow-[#2E7D32]/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Generating Secure OTP...</span>
                ) : (
                  <>
                    <span>Request One-Time Password</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="text-center mb-2">
                <p className="text-xs text-slate-600">
                  Enter 6-digit OTP code sent to <span className="font-bold text-slate-900">+91 {phoneNumber}</span>
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  6-Digit OTP Code
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="543210"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-hidden focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/20 font-bold text-center tracking-widest text-lg text-slate-800"
                    required
                    autoFocus
                  />
                </div>
              </div>

              {demoOtpHint && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-center justify-between">
                  <span>Demo OTP Code: <strong className="text-amber-950 font-mono text-sm">{demoOtpHint}</strong></span>
                  <button
                    type="button"
                    onClick={() => setOtpCode(demoOtpHint)}
                    className="px-2.5 py-1 bg-amber-200 hover:bg-amber-300 text-amber-900 font-bold rounded-lg transition text-[11px]"
                  >
                    Auto-fill
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm shadow-md shadow-[#2E7D32]/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Verify & Continue</span>
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-xs font-semibold text-slate-500 hover:text-slate-800 text-center py-1 transition"
              >
                Edit Mobile Number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
