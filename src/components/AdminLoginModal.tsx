import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BrandEmblem } from './brand/BrandEmblem';
import { ShieldCheck, KeyRound, Lock, UserCheck, AlertCircle, X, ArrowRight, ChefHat, Building2 } from 'lucide-react';


export const AdminLoginModal: React.FC = () => {
  const { isAdminAuthModalOpen, setIsAdminAuthModalOpen, adminLogin, setCurrentTab } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isAdminAuthModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const success = adminLogin(email, password);
      setIsLoading(false);
      if (success) {
        setIsAdminAuthModalOpen(false);
        setCurrentTab('admin');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setError('Invalid credentials. Use demo credentials or 1-click login below.');
      }
    }, 400);
  };

  const handleOneClickLogin = (roleEmail: string, rolePass: string) => {
    setEmail(roleEmail);
    setPassword(rolePass);
    setIsLoading(true);
    setTimeout(() => {
      adminLogin(roleEmail, rolePass);
      setIsLoading(false);
      setIsAdminAuthModalOpen(false);
      setCurrentTab('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-md w-full shadow-2xl border border-slate-300 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={() => setIsAdminAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 p-6 text-white text-center">
          <BrandEmblem className="w-14 h-14 mx-auto mb-2 drop-shadow-md" />
          <h3 className="text-2xl font-bold font-display tracking-tight">Admin &amp; Operations Portal</h3>
          <p className="text-xs text-emerald-200/90 mt-1">
            Kitchen Logistics &bull; Google Sheets Synchronization &bull; Financials
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

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Admin Email / Identifier
              </label>
              <input
                type="text"
                placeholder="admin@lebolsante.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-800 focus:outline-hidden focus:border-[#2E7D32]"
                autoFocus
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Security Password / PIN
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white text-slate-800 focus:outline-hidden focus:border-[#2E7D32]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Access Operations Hub</span>
                </>
              )}
            </button>
          </form>

          {/* Quick 1-Click Demo Login options for reviewers */}
          <div className="mt-6 pt-5 border-t border-slate-200 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center">
              Instant Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleOneClickLogin('admin@lebolsante.com', 'admin123')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-left"
              >
                <Building2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                <span>Operations Director</span>
              </button>
              <button
                type="button"
                onClick={() => handleOneClickLogin('kitchen@lebolsante.com', 'chef5am')}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-left"
              >
                <ChefHat className="w-3.5 h-3.5 text-amber-700" />
                <span>Kitchen Manager</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
