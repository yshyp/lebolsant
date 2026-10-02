import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ArrowRight, Salad, Sparkles, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    setCurrentTab
  } = useApp();

  if (!isCartDrawerOpen) return null;

  const handleProceedToSubscription = () => {
    setIsCartDrawerOpen(false);
    setCurrentTab('subscriptions');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-[#2E7D32]/20">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Salad className="w-5 h-5 text-emerald-100" />
              </div>
              <div>
                <h2 className="text-xl font-bold font-display">Your Fresh Bowl Cart</h2>
                <p className="text-xs text-emerald-100/90">
                  {cart.length} unique item{cart.length === 1 ? '' : 's'} selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <div className="w-16 h-16 rounded-3xl bg-emerald-50 flex items-center justify-center mb-3">
                  <Salad className="w-8 h-8 text-[#2E7D32]" />
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mb-4">
                  Explore our high-protein salads, cold-simmered soups and smoothie meals.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentTab('menu');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#2E7D32] text-white font-bold text-xs shadow-md transition"
                >
                  Browse Fresh Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Selected Dishes</span>
                  <button
                    onClick={clearCart}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-800"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map((cartItem, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col gap-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <img
                        src={cartItem.item.image}
                        alt={cartItem.item.name}
                        className="w-14 h-14 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              cartItem.item.isVeg ? 'bg-emerald-500' : 'bg-amber-600'
                            }`}
                          />
                          <h4 className="text-sm font-bold text-slate-800 truncate">
                            {cartItem.item.name}
                          </h4>
                        </div>
                        <div className="text-xs text-[#2E7D32] font-bold">
                          ₹{cartItem.item.basePrice}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(idx)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Customizations tags */}
                    {(cartItem.toppingsAdded.length > 0 ||
                      cartItem.toppingsRemoved.length > 0 ||
                      cartItem.dressingChoice) && (
                      <div className="text-[11px] text-slate-600 bg-slate-50 rounded-lg p-2 space-y-1">
                        {cartItem.dressingChoice && (
                          <div>
                            <span className="font-semibold text-slate-700">Dressing:</span>{' '}
                            {cartItem.dressingChoice} {cartItem.dressingOnSide ? '(On Side)' : '(Tossed)'}
                          </div>
                        )}
                        {cartItem.toppingsAdded.length > 0 && (
                          <div className="text-emerald-700">
                            <span className="font-semibold">+ Added:</span> {cartItem.toppingsAdded.join(', ')}
                          </div>
                        )}
                        {cartItem.toppingsRemoved.length > 0 && (
                          <div className="text-rose-600 line-through">
                            - Removed: {cartItem.toppingsRemoved.join(', ')}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quantity Selector & Item Subtotal */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => updateCartQuantity(idx, cartItem.quantity - 1)}
                          className="p-1.5 text-slate-600 hover:bg-slate-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(idx, cartItem.quantity + 1)}
                          className="p-1.5 text-slate-600 hover:bg-slate-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-sm font-extrabold text-slate-800">
                        ₹{cartItem.item.basePrice * cartItem.quantity}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Subscriptions routing prompt */}
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-[#1B5E20] space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Save Up to 20% with a Subscription Plan!</span>
                  </div>
                  <p className="text-[11px] text-emerald-800">
                    Subscribe for Weekly, Monthly or Quarterly delivery to unlock 5% to 20% discounts, free 5 PM Day Push calendar flexibility, and gym buddy perks!
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-base">
                <span className="font-semibold text-slate-600">Cart Total:</span>
                <span className="text-2xl font-black text-[#1B5E20] font-display">
                  ₹{cartTotal}
                </span>
              </div>

              {/* Requirement: Completing cart selection routes directly to Subscription & Pricing Page */}
              <button
                onClick={handleProceedToSubscription}
                className="w-full py-4 rounded-2xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-sm shadow-lg shadow-[#2E7D32]/25 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Subscribe & Choose Delivery Schedule</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-slate-400">
                Eco-conscious sugarcane bagasse containers &bull; Zero single-use plastic
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
