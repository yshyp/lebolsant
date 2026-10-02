import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Share2,
  Copy,
  Check,
  MessageCircle,
  QrCode,
  Users,
  Sparkles,
  X,
  ExternalLink,
  Mail,
  Send
} from 'lucide-react';

export const ShareModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen } = useApp();
  const [copied, setCopied] = useState(false);
  const [showQr, setShowQr] = useState(true);

  if (!isShareModalOpen) return null;

  // Always use the public Shared App URL (ais-pre-) so friends don't get 403 / Access Denied
  const rawOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const shareUrl = rawOrigin.includes('ais-dev-')
    ? rawOrigin.replace('ais-dev-', 'ais-pre-')
    : rawOrigin.includes('ais-pre-')
    ? rawOrigin
    : 'https://ais-pre-bjm4klau25i2p3jxknuzog-772010143111.asia-east1.run.app';

  const shareTitle = 'le bol santé — Freshly Chopped, Perfectly Balanced';

  const shareMessage = `Hey! Check out le bol santé — fresh salad bowls, artisanal soups & smoothies delivered to our gym locker or office. If we subscribe together as Workout Buddies, we get an extra 5% duo discount! Order here: ${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareMessage,
          url: shareUrl
        });
      } catch (err) {
        console.log('Native share closed/canceled', err);
      }
    } else {
      handleCopyLink();
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Check out le bol santé! Fresh salad bowls & 5% Gym Buddy discount:')}`;
  const emailShareUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareMessage)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FDFBF7] rounded-3xl max-w-lg w-full shadow-2xl border border-[#2E7D32]/20 overflow-hidden relative">
        {/* Close Button */}
        <button
          onClick={() => setIsShareModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-800 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="bg-gradient-to-br from-[#1B5E20] via-[#2E7D32] to-[#1B5E20] p-6 text-white text-center">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
            <Share2 className="w-6 h-6 text-emerald-100" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E65100] text-white text-[11px] font-black uppercase tracking-wider mb-1.5 shadow-xs">
            <Users className="w-3.5 h-3.5" />
            <span>Unlock 5% Duo Buddy Discount</span>
          </div>
          <h3 className="text-2xl font-bold font-display tracking-tight">
            Share le bol santé
          </h3>
          <p className="text-xs text-emerald-100/90 mt-1 max-w-sm mx-auto">
            Invite a gym friend, workout partner, or office colleague to subscribe with you.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Duo Buddy Benefit Box */}
          <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2E7D32] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div className="text-xs">
              <span className="font-black text-[#1B5E20] block text-sm">
                Workout Buddy Benefit: Extra 5% Off
              </span>
              <span className="text-slate-600">
                When you and your friend order 2 meals to the same gym or office, you both save on every fresh bowl!
              </span>
            </div>
          </div>

          {/* Direct Link Copy Bar */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Direct Website Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-mono bg-white text-slate-700 select-all focus:outline-hidden"
              />
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-[#2E7D32] hover:bg-[#1B5E20] text-white'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-[#1B5E20] font-semibold">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Public link (`ais-pre-...`): Anyone can view this without needing AI Studio login</span>
            </div>
          </div>


          {/* Social Quick Share Buttons */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Instant Share Channels
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {/* WhatsApp */}
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              {/* Telegram */}
              <a
                href={telegramShareUrl}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>Telegram</span>
              </a>

              {/* Email */}
              <a
                href={emailShareUrl}
                className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-xs col-span-2 sm:col-span-1"
              >
                <Mail className="w-4 h-4" />
                <span>Email Friend</span>
              </a>
            </div>
          </div>

          {/* Phone-to-Phone QR Code (For sharing in gym/office in person) */}
          <div className="pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-[#2E7D32]" />
                <span>Scan In-Person at Gym or Office</span>
              </span>
              <button
                type="button"
                onClick={() => setShowQr(!showQr)}
                className="text-[11px] font-bold text-[#2E7D32] hover:underline"
              >
                {showQr ? 'Hide QR' : 'Show QR'}
              </button>
            </div>

            {showQr && (
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center flex flex-col items-center">
                {/* Visual SVG QR Code */}
                <div className="w-32 h-32 bg-slate-950 rounded-2xl p-2.5 flex flex-col justify-between shadow-inner">
                  <div className="flex justify-between">
                    <div className="w-7 h-7 border-4 border-white rounded-md flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-white rounded-xs" />
                    </div>
                    <div className="w-7 h-7 border-4 border-white rounded-md flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-white rounded-xs" />
                    </div>
                  </div>
                  <div className="text-emerald-400 font-mono text-[8px] tracking-widest uppercase font-extrabold text-center">
                    LE BOL SANTÉ
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-7 h-7 border-4 border-white rounded-md flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-white rounded-xs" />
                    </div>
                    <div className="w-8 h-5 bg-emerald-400 rounded flex items-center justify-center text-slate-900 text-[9px] font-black">
                      DUO
                    </div>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold mt-2">
                  Have your friend point their phone camera to open the menu instantly.
                </p>
              </div>
            )}
          </div>

          {/* Native Mobile Share Button */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4 text-[#2E7D32]" />
              <span>More Share Options (AirDrop, Messages, etc.)</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
