import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Category, MenuItem } from '../types';
import {
  TableProperties,
  Download,
  RefreshCw,
  Search,
  CheckCircle2,
  ExternalLink,
  ChefHat,
  Users,
  CreditCard,
  Calendar,
  AlertTriangle,
  Sliders,
  DollarSign,
  TrendingUp,
  Clock,
  ShieldCheck,
  Send,
  LogOut,
  Building,
  FileSpreadsheet,
  Lock,
  KeyRound,
  Copy,
  Check,
  Sparkles,
  Shield,
  ArrowRight,
  Plus,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Utensils,
  X,
  Image as ImageIcon,
  Flame,
  Leaf,
  Tag
} from 'lucide-react';

const PRESET_DISH_IMAGES = [
  { label: 'Crisp Garden Salad', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80' },
  { label: 'Herb Grilled Chicken', url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' },
  { label: 'Sprouted Moong Paneer', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Asian Edamame Tofu', url: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80' },
  { label: 'Warm Lentil Soup', url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Acai Protein Smoothie', url: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80' },
  { label: 'Overnight Chia Oats', url: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80' },
  { label: 'Exotic Fruit Bowl', url: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&w=800&q=80' }
];

export const AdminPortalTab: React.FC = () => {
  const {
    adminUser,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    setIsAdminAuthModalOpen,
    customersSheet,
    subscriptionsSheet,
    kitchenLogsSheet,
    financialsSheet,
    bulkOrders,
    updateKitchenLogStatus,
    approveRefund,
    adminPricing,
    updateAdminPricing,
    webhookUrl,
    setWebhookUrl,
    lastWebhookSyncTime,
    triggerWebhookSync,
    setCurrentTab,
    menuItems,
    addMenuItem,
    updateMenuItem,
    toggleMenuItemActive,
    deleteMenuItem,
    resetMenuToDefault
  } = useApp();

  const [activeSheetTab, setActiveSheetTab] = useState<'menu' | 'kitchen' | 'subscriptions' | 'customers' | 'financials' | 'bulk'>('menu');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Dynamic Menu state
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [menuFilterCategory, setMenuFilterCategory] = useState<Category | 'all'>('all');
  const [menuFilterStatus, setMenuFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [menuToast, setMenuToast] = useState<string | null>(null);

  // Menu Form fields
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Category>('salads');
  const [formIsVeg, setFormIsVeg] = useState(true);
  const [formBasePrice, setFormBasePrice] = useState(195);
  const [formKcal, setFormKcal] = useState(350);
  const [formProtein, setFormProtein] = useState(18);
  const [formCarbs, setFormCarbs] = useState(28);
  const [formFat, setFormFat] = useState(12);
  const [formFiber, setFormFiber] = useState(8);
  const [formChefNote, setFormChefNote] = useState('');
  const [formImage, setFormImage] = useState(PRESET_DISH_IMAGES[0].url);
  const [formIngredients, setFormIngredients] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formIsActive, setFormIsActive] = useState(true);

  // Dynamic pricing editable values
  const [livePricing, setLivePricing] = useState(adminPricing);
  const [pricingSavedToast, setPricingSavedToast] = useState(false);

  // Link copy state
  const [linkCopied, setLinkCopied] = useState(false);

  // In-page login form state for /admin link
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  const openCreateDishModal = () => {
    setEditingItem(null);
    setFormName('');
    setFormCategory('salads');
    setFormIsVeg(true);
    setFormBasePrice(195);
    setFormKcal(360);
    setFormProtein(18);
    setFormCarbs(30);
    setFormFat(12);
    setFormFiber(8);
    setFormChefNote('');
    setFormImage(PRESET_DISH_IMAGES[0].url);
    setFormIngredients('Baby Spinach, Cherry Tomatoes, Greek Feta, Quinoa, Cold-Pressed Olive Dressing');
    setFormBadge('New Launch');
    setFormIsActive(true);
    setIsMenuModalOpen(true);
  };

  const openEditDishModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormIsVeg(item.isVeg);
    setFormBasePrice(item.basePrice);
    setFormKcal(item.kcal);
    setFormProtein(item.protein);
    setFormCarbs(item.carbs);
    setFormFat(item.fat);
    setFormFiber(item.fiber);
    setFormChefNote(item.chefNote);
    setFormImage(item.image);
    setFormIngredients(item.ingredients.join(', '));
    setFormBadge(item.badge || '');
    setFormIsActive(item.isActive !== false);
    setIsMenuModalOpen(true);
  };

  const handleSaveDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const ingredientsList = formIngredients
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      name: formName.trim(),
      category: formCategory,
      isVeg: formIsVeg,
      basePrice: Number(formBasePrice) || 150,
      kcal: Number(formKcal) || 300,
      protein: Number(formProtein) || 15,
      carbs: Number(formCarbs) || 25,
      fat: Number(formFat) || 10,
      fiber: Number(formFiber) || 6,
      chefNote: formChefNote.trim() || 'Freshly prepared signature bowl.',
      image: formImage.trim() || PRESET_DISH_IMAGES[0].url,
      ingredients: ingredientsList.length > 0 ? ingredientsList : ['Fresh Greens', 'Cold-Pressed Dressing'],
      badge: formBadge.trim() || undefined,
      isActive: formIsActive
    };

    if (editingItem) {
      updateMenuItem(editingItem.id, payload);
      setMenuToast(`Updated "${payload.name}" and published changes!`);
    } else {
      addMenuItem(payload);
      setMenuToast(`Added "${payload.name}" to live menu!`);
    }

    setIsMenuModalOpen(false);
    setTimeout(() => setMenuToast(null), 3500);
  };

  const handleToggleItemActive = (item: MenuItem) => {
    toggleMenuItemActive(item.id);
    const nextState = item.isActive === false;
    setMenuToast(`"${item.name}" is now ${nextState ? 'Active (Live on Menu)' : 'Inactive (Hidden)'}`);
    setTimeout(() => setMenuToast(null), 3000);
  };

  const handleDuplicateItem = (item: MenuItem) => {
    addMenuItem({
      ...item,
      name: `${item.name} (Copy)`,
      isActive: false
    });
    setMenuToast(`Duplicated "${item.name}" as inactive draft!`);
    setTimeout(() => setMenuToast(null), 3000);
  };

  const handleDeleteItem = (item: MenuItem) => {
    if (window.confirm(`Are you sure you want to remove "${item.name}" from the menu?`)) {
      deleteMenuItem(item.id);
      setMenuToast(`Removed "${item.name}" from menu.`);
      setTimeout(() => setMenuToast(null), 3000);
    }
  };

  const handleResetMenu = () => {
    if (window.confirm('Reset all menu items to original chef catalogue? Any custom dishes will be replaced.')) {
      resetMenuToDefault();
      setMenuToast('Reset menu to original 12 signature dishes!');
      setTimeout(() => setMenuToast(null), 3000);
    }
  };


  const adminLink =
    typeof window !== 'undefined'
      ? window.location.origin.includes('ais-dev-')
        ? window.location.origin.replace('ais-dev-', 'ais-pre-') + '/admin'
        : window.location.origin + '/admin'
      : 'https://ais-pre-bjm4klau25i2p3jxknuzog-772010143111.asia-east1.run.app/admin';

  const handleCopyAdminLink = async () => {
    try {
      await navigator.clipboard.writeText(adminLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    } catch {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    }
  };

  const handleInlineLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(loginEmail, loginPass);
    if (!success) {
      setLoginError('Invalid credentials. Use one-click access below.');
    } else {
      setLoginError(null);
    }
  };

  const handleQuickLogin = (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPass(pass);
    adminLogin(email, pass);
  };

  // If not logged in, show Admin Details & Direct Portal Access on /admin
  if (!isAdminLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* /admin link banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#2E7D32] flex items-center justify-center text-white shadow-md">
                <ShieldCheck className="w-6 h-6 text-emerald-200" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  /admin URL Route
                </span>
                <h1 className="text-2xl sm:text-3xl font-black font-display mt-0.5 text-white">
                  le bol santé &bull; Operations &amp; Admin Portal
                </h1>
              </div>
            </div>

            <button
              onClick={handleCopyAdminLink}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto ${
                linkCopied ? 'bg-emerald-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {linkCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{linkCopied ? 'Admin Link Copied!' : 'Copy /admin Link'}</span>
            </button>
          </div>

          <div className="text-xs text-slate-400">
            Direct Link: <strong className="text-emerald-300 font-mono select-all">{adminLink}</strong>
          </div>
        </div>

        {/* System & Authorized Personnel Details Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Admin Credentials & Roles */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#2E7D32]" />
              <h3 className="text-base font-bold text-slate-900 font-display">
                Authorized Personnel &amp; Roles
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Admin credentials for operational oversight, kitchen logistics, and financial refunds:
            </p>

            <div className="space-y-3">
              {/* Account 1 */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900">Marc Dubois</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#2E7D32] text-white">
                      Operations Director
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600">
                    Email: <strong>admin@lebolsante.com</strong>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    PIN: <code className="bg-white px-1.5 py-0.5 rounded border text-slate-800 font-mono">admin123</code>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin@lebolsante.com', 'admin123')}
                  className="px-3 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold transition shadow-xs cursor-pointer shrink-0"
                >
                  Quick Enter &rarr;
                </button>
              </div>

              {/* Account 2 */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900">Chef Anand</span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#E65100] text-white">
                      Kitchen Manager
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-600">
                    Email: <strong>kitchen@lebolsante.com</strong>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    PIN: <code className="bg-white px-1.5 py-0.5 rounded border text-slate-800 font-mono">chef5am</code>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('kitchen@lebolsante.com', 'chef5am')}
                  className="px-3 py-2 rounded-xl bg-[#E65100] hover:bg-orange-600 text-white text-xs font-bold transition shadow-xs cursor-pointer shrink-0"
                >
                  Quick Enter &rarr;
                </button>
              </div>
            </div>

            {/* Architecture Details */}
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>Google Sheets V4:</span>
                <span className="font-bold text-emerald-800">4 Live Connected Sheets</span>
              </div>
              <div className="flex justify-between">
                <span>Automation Webhook:</span>
                <span className="font-bold text-slate-800">Make.com Bi-Directional V4</span>
              </div>
              <div className="flex justify-between">
                <span>5:00 PM Kitchen Cutoff:</span>
                <span className="font-bold text-amber-800">Automated Daily Freeze</span>
              </div>
            </div>
          </div>

          {/* Direct Sign-In Form */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-slate-800" />
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Admin Sign In
                </h3>
              </div>
              <p className="text-xs text-slate-500 mb-4">
                Enter your administrative credentials to manage subscriptions and live fulfillment.
              </p>

              {loginError && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleInlineLogin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email / Admin ID
                  </label>
                  <input
                    type="text"
                    placeholder="admin@lebolsante.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Security PIN / Password
                  </label>
                  <input
                    type="password"
                    placeholder="admin123"
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate &amp; Open Sheets Hub</span>
                </button>
              </form>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <button
                onClick={() => setCurrentTab('home')}
                className="hover:text-[#2E7D32] font-semibold"
              >
                &larr; Return to Customer Home
              </button>
              <span>le bol santé v4</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Operational KPI calculations
  const totalSubscribers = subscriptionsSheet.length;
  const activeKitchenMeals = kitchenLogsSheet.filter((k) => k.status === 'Active').length;
  const pushedMealsCount = kitchenLogsSheet.filter((k) => k.status === 'Pushed').length;
  const pendingRefunds = financialsSheet.filter((f) => f.refundStatus === 'Requested').length;
  const totalRevenue = financialsSheet.reduce((acc, f) => acc + f.paymentAmount, 0);


  const handleManualSync = async () => {
    setIsSyncing(true);
    await triggerWebhookSync();
    setIsSyncing(false);
    setSyncFeedback('Bi-directional Google Sheets & Webhook pipeline refreshed successfully!');
    setTimeout(() => setSyncFeedback(null), 3000);
  };

  const handleSaveDynamicPricing = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminPricing(livePricing);
    setPricingSavedToast(true);
    setTimeout(() => setPricingSavedToast(false), 2500);
  };

  const exportCurrentSheetToCSV = () => {
    let headers: string[] = [];
    let rows: any[] = [];
    let filename = 'le_bol_sante_sheet.csv';

    if (activeSheetTab === 'menu') {
      filename = 'le_bol_sante_menu_catalog.csv';
      headers = [
        'Item_ID',
        'Name',
        'Category',
        'Is_Veg',
        'Price_INR',
        'Kcal',
        'Protein_g',
        'Carbs_g',
        'Fat_g',
        'Fiber_g',
        'Badge',
        'Status',
        'Ingredients',
        'Chef_Note'
      ];
      rows = menuItems.map((m) => [
        m.id,
        `"${m.name}"`,
        m.category,
        m.isVeg ? 'Veg' : 'Non-Veg',
        m.basePrice,
        m.kcal,
        m.protein,
        m.carbs,
        m.fat,
        m.fiber,
        `"${m.badge || ''}"`,
        m.isActive !== false ? 'Active' : 'Inactive',
        `"${m.ingredients.join(', ')}"`,
        `"${m.chefNote.replace(/"/g, '""')}"`
      ]);
    } else if (activeSheetTab === 'customers') {
      filename = 'Sheet1_Customer_Master.csv';
      headers = ['Customer_ID (Phone)', 'Name', 'Email', 'Delivery Type', 'Address', 'Google Maps URL', 'Allergies'];

      rows = customersSheet.map((c) => [
        c.mobile,
        `"${c.fullName}"`,
        c.email,
        `"${c.deliveryType}"`,
        `"${c.flatDoorNo}, ${c.buildingOrGym}, ${c.street}, ${c.landmark}, ${c.pinCode}"`,
        `"${c.googleMapUrl}"`,
        `"${c.dietaryPreferences}"`
      ]);
    } else if (activeSheetTab === 'subscriptions') {
      filename = 'Sheet2_Active_Subscriptions.csv';
      headers = [
        'Subscription_ID',
        'Customer_ID (Phone)',
        'Customer Name',
        'Plan Type',
        'Selected Pattern',
        'Session Slot',
        'Buddy Add-On (Y/N)',
        'Start Date',
        'Current End Date',
        'Meals Total',
        'Meals Remaining',
        'Renewal Discount Eligible (Y/N)',
        'Status'
      ];
      rows = subscriptionsSheet.map((s) => [
        s.subscriptionId,
        s.customerPhone,
        `"${s.customerName}"`,
        s.planType,
        s.pattern,
        s.sessionSlot,
        s.buddyAddOn ? 'Y' : 'N',
        s.startDate,
        s.endDate,
        s.mealsTotal,
        s.mealsRemaining,
        s.renewalDiscountEligible ? 'Y' : 'N',
        s.status
      ]);
    } else if (activeSheetTab === 'kitchen') {
      filename = 'Sheet3_Daily_Kitchen_Fulfillment_Log.csv';
      headers = [
        'Date',
        'Customer Name',
        'Phone',
        'Delivery Slot',
        'Meal Item',
        'Dietary Notes',
        'Status',
        'Delivery Address / Gym'
      ];
      rows = kitchenLogsSheet.map((k) => [
        k.date,
        `"${k.customerName}"`,
        k.phone,
        k.deliverySlot,
        `"${k.mealItem}"`,
        `"${k.dietaryNotes}"`,
        k.status,
        `"${k.deliveryAddress}"`
      ]);
    } else if (activeSheetTab === 'financials') {
      filename = 'Sheet4_Financials_And_Refunds.csv';
      headers = [
        'Transaction ID',
        'Date',
        'Customer Phone',
        'Customer Name',
        'Plan / Package',
        'Payment Amount',
        'Prorated Refund Requested (Y/N)',
        'Meals Delivered Value',
        'Refund Balance Due',
        'Refund Status'
      ];
      rows = financialsSheet.map((f) => [
        f.transactionId,
        f.date,
        f.customerPhone,
        `"${f.customerName}"`,
        `"${f.planName}"`,
        f.paymentAmount,
        f.proratedRefundRequested ? 'Y' : 'N',
        f.mealsDeliveredValue,
        f.refundBalanceDue,
        f.refundStatus
      ]);
    } else {
      filename = 'Sheet5_Bulk_Orders.csv';
      headers = ['ID', 'Date', 'Organization', 'Contact', 'Mobile', 'Packs', 'Category', 'Total', 'Status'];
      rows = bulkOrders.map((b) => [
        b.id,
        b.deliveryDate,
        `"${b.organization}"`,
        `"${b.contactPerson}"`,
        b.mobile,
        b.numberOfPacks,
        b.category,
        b.totalEstimate,
        b.status
      ]);
    }

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Admin Header Bar */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2E7D32] to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg">
            <TableProperties className="w-7 h-7 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
                Operations &amp; Live Sheets Hub
              </h1>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950">
                Online
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Logged in as <strong className="text-white">{adminUser?.name}</strong> ({adminUser?.role}) &bull; {adminUser?.email}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Webhook / Sheets'}</span>
          </button>

          <button
            onClick={exportCurrentSheetToCSV}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-2 border border-slate-700 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => {
              adminLogout();
              setCurrentTab('home');
            }}
            className="px-3.5 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 text-xs font-bold transition flex items-center gap-1.5 border border-rose-500/30 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {syncFeedback && (
        <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-[#1B5E20] text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{syncFeedback}</span>
        </div>
      )}

      {/* ADMIN SESSION & ROUTE DETAILS CARD */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                Active Administrator Details &bull; <code className="text-[#2E7D32] font-mono text-xs">/admin</code>
              </h2>
              <p className="text-[11px] text-slate-500">
                Operational credentials &amp; live database link for kitchen managers and supervisors
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAdminLink}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                linkCopied ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
              }`}
            >
              {linkCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{linkCopied ? 'Copied /admin URL' : 'Copy /admin Link'}</span>
            </button>

            <button
              onClick={() => setCurrentTab('home')}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition"
            >
              Customer View &rarr;
            </button>
          </div>
        </div>

        {/* 4 Details Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Logged-In Administrator</span>
            <span className="text-sm font-black text-slate-900 font-display block mt-0.5">{adminUser?.name}</span>
            <span className="text-[11px] text-emerald-700 font-semibold font-mono">{adminUser?.email}</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Role &amp; Clearance</span>
            <span className="text-sm font-black text-[#1B5E20] block mt-0.5">{adminUser?.role}</span>
            <span className="text-[11px] text-slate-500">Level 4 Root CRUD &bull; Full Sheets Access</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Live Database Pipeline</span>
            <span className="text-sm font-black text-slate-900 block mt-0.5">Google Sheets V4</span>
            <span className="text-[11px] text-slate-500">4 Active Sheets (Customer, Subs, Kitchen, Fin)</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Daily 5 PM Kitchen Lockout</span>
            <span className="text-sm font-black text-amber-700 block mt-0.5">Enforcement Active</span>
            <span className="text-[11px] text-slate-500">Automatic extension for skipped days</span>
          </div>
        </div>
      </div>

      {/* KPI METRICS OVERVIEW */}

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">Kitchen Prep Active</span>
            <ChefHat className="w-4 h-4 text-[#2E7D32]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            {activeKitchenMeals}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            Meals scheduled for dispatch
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">Subscribers</span>
            <Users className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
            {totalSubscribers}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            {subscriptionsSheet.filter((s) => s.buddyAddOn).length} Duo Gym Buddies
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">Day Pushed (5 PM)</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 font-display">
            {pushedMealsCount}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Dates frozen &amp; extended
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">Pending Refunds</span>
            <CreditCard className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600 font-display">
            {pendingRefunds}
          </div>
          <span className="text-[11px] text-slate-500 block mt-1">
            Prorated 5-day cycle
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-wider">Gross Billing</span>
            <DollarSign className="w-4 h-4 text-[#2E7D32]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#1B5E20] font-display">
            ₹{totalRevenue.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            Total transactions recorded
          </span>
        </div>
      </div>

      {/* DYNAMIC PRICING ENGINE QUICK BAR */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#2E7D32]" />
            <h3 className="text-base font-bold text-slate-900 font-display">
              Live Operational Pricing Engine
            </h3>
          </div>
          {pricingSavedToast && (
            <span className="text-xs font-bold text-[#1B5E20] bg-emerald-100 px-3 py-1 rounded-full">
              ✓ Rates Updated &amp; Synced Live Across Customer Catalog!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveDynamicPricing} className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              Single Meal (₹)
            </label>
            <input
              type="number"
              value={livePricing.singleMealRate}
              onChange={(e) => setLivePricing({ ...livePricing, singleMealRate: Number(e.target.value) })}
              className="w-full text-base font-black text-slate-900 bg-white px-2 py-1 rounded border border-slate-300"
            />
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              Bi-Weekly Rate (₹)
            </label>
            <input
              type="number"
              value={livePricing.biWeeklyRate}
              onChange={(e) => setLivePricing({ ...livePricing, biWeeklyRate: Number(e.target.value) })}
              className="w-full text-base font-black text-slate-900 bg-white px-2 py-1 rounded border border-slate-300"
            />
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              Monthly Rate (₹)
            </label>
            <input
              type="number"
              value={livePricing.monthlyRate}
              onChange={(e) => setLivePricing({ ...livePricing, monthlyRate: Number(e.target.value) })}
              className="w-full text-base font-black text-slate-900 bg-white px-2 py-1 rounded border border-slate-300"
            />
          </div>

          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
            <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
              Quarterly Rate (₹)
            </label>
            <input
              type="number"
              value={livePricing.quarterlyRate}
              onChange={(e) => setLivePricing({ ...livePricing, quarterlyRate: Number(e.target.value) })}
              className="w-full text-base font-black text-slate-900 bg-white px-2 py-1 rounded border border-slate-300"
            />
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              Update Rates
            </button>
          </div>
        </form>
      </div>

      {/* LIVE SHEETS EMBEDDED VIEWER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col">
        {menuToast && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2.5 px-4 flex items-center justify-between shadow-inner">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>{menuToast}</span>
            </div>
            <button onClick={() => setMenuToast(null)} className="text-emerald-200 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Sheet Switcher & Search Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2 md:pb-0">
            {[
              { id: 'menu', label: 'Dynamic Menu & Dishes', count: menuItems.length, highlight: true },
              { id: 'kitchen', label: 'Sheet 3: Daily_Kitchen_Fulfillment_Log', count: kitchenLogsSheet.length },
              { id: 'subscriptions', label: 'Sheet 2: Active_Subscriptions', count: subscriptionsSheet.length },
              { id: 'customers', label: 'Sheet 1: Customer_Master', count: customersSheet.length },
              { id: 'financials', label: 'Sheet 4: Financials_And_Refunds', count: financialsSheet.length },
              { id: 'bulk', label: 'Sheet 5: Bulk_Orders_Log', count: bulkOrders.length }
            ].map((tab) => {
              const isActive = activeSheetTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveSheetTab(tab.id as any);
                    setSearchTerm('');
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#2E7D32] text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-emerald-950 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder={activeSheetTab === 'menu' ? 'Search dishes, macros...' : 'Search current sheet...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 focus:outline-hidden focus:border-[#2E7D32]"
            />
          </div>
        </div>

        {/* Spreadsheet / Menu Content */}
        <div className="overflow-x-auto min-h-[380px] max-h-[550px] p-2">
          {/* DYNAMIC MENU MANAGER TAB */}
          {activeSheetTab === 'menu' && (
            <div className="space-y-4 p-2">
              {/* Menu Sub-Bar with Filters and Add Dish CTA */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-3 bg-slate-100/80 rounded-2xl border border-slate-200">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
                    {(['all', 'salads', 'fruit-bowls', 'soups', 'smoothies', 'oats-meals'] as const).map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setMenuFilterCategory(cat)}
                        className={`px-2.5 py-1 rounded-lg font-bold capitalize transition text-[11px] ${
                          menuFilterCategory === cat
                            ? 'bg-[#2E7D32] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {cat === 'all' ? 'All Dishes' : cat.replace('-', ' ')}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
                    {(['all', 'active', 'inactive'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setMenuFilterStatus(st)}
                        className={`px-2.5 py-1 rounded-lg font-bold capitalize transition text-[11px] ${
                          menuFilterStatus === st
                            ? 'bg-slate-900 text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {st === 'all' ? 'All' : st === 'active' ? '🟢 Live Only' : '⚪ Inactive Only'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={openCreateDishModal}
                    className="px-4 py-2 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add New Dish</span>
                  </button>

                  <button
                    onClick={handleResetMenu}
                    className="px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-semibold transition cursor-pointer"
                    title="Reset to default 12 dishes"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider border-b border-slate-200">
                    <th className="p-3">Dish / Bowl</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Diet</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Nutritional Macros</th>
                    <th className="p-3">Storefront Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {menuItems
                    .filter((item) => {
                      if (menuFilterCategory !== 'all' && item.category !== menuFilterCategory) return false;
                      if (menuFilterStatus === 'active' && item.isActive === false) return false;
                      if (menuFilterStatus === 'inactive' && item.isActive !== false) return false;
                      if (searchTerm) {
                        const term = searchTerm.toLowerCase();
                        return (
                          item.name.toLowerCase().includes(term) ||
                          item.chefNote.toLowerCase().includes(term) ||
                          item.ingredients.some((ing) => ing.toLowerCase().includes(term))
                        );
                      }
                      return true;
                    })
                    .map((item) => {
                      const isActive = item.isActive !== false;
                      return (
                        <tr key={item.id} className="hover:bg-slate-50 transition">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 shadow-xs"
                              />
                              <div>
                                <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                                  <span>{item.name}</span>
                                  {item.badge && (
                                    <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded-md bg-[#E65100] text-white">
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-500 line-clamp-1 max-w-sm mt-0.5">
                                  {item.chefNote}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="p-3">
                            <span className="capitalize px-2.5 py-1 rounded-lg bg-emerald-50 text-[#1B5E20] font-bold text-[11px] border border-emerald-100">
                              {item.category.replace('-', ' ')}
                            </span>
                          </td>

                          <td className="p-3">
                            <span
                              className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                item.isVeg ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {item.isVeg ? 'Veg' : 'Non-Veg'}
                            </span>
                          </td>

                          <td className="p-3 font-black text-[#1B5E20] text-sm">
                            ₹{item.basePrice}
                          </td>

                          <td className="p-3">
                            <div className="flex flex-wrap gap-1 text-[10px]">
                              <span className="bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                                <strong>{item.kcal}</strong> kcal
                              </span>
                              <span className="bg-emerald-100 text-emerald-900 px-1.5 py-0.5 rounded font-mono font-bold">
                                <strong>{item.protein}g</strong> P
                              </span>
                              <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded font-mono">
                                <strong>{item.carbs}g</strong> C
                              </span>
                              <span className="bg-rose-100 text-rose-900 px-1.5 py-0.5 rounded font-mono">
                                <strong>{item.fat}g</strong> F
                              </span>
                            </div>
                          </td>

                          <td className="p-3">
                            <button
                              type="button"
                              onClick={() => handleToggleItemActive(item)}
                              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                                isActive
                                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                                  : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
                              }`}
                              title={isActive ? 'Click to make Inactive (Hide from Customer Menu)' : 'Click to make Active (Publish to Customer Menu)'}
                            >
                              {isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              <span>{isActive ? 'Active (Live)' : 'Inactive (Hidden)'}</span>
                            </button>
                          </td>

                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => openEditDishModal(item)}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                                title="Edit dish details"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDuplicateItem(item)}
                                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                                title="Duplicate dish"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteItem(item)}
                                className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition cursor-pointer"
                                title="Delete dish"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}

          {/* SHEET 3: KITCHEN LOG */}
          {activeSheetTab === 'kitchen' && (

            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider border-b border-slate-200">
                  <th className="p-3">Date</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Slot</th>
                  <th className="p-3">Meal Item</th>
                  <th className="p-3">Dietary Notes</th>
                  <th className="p-3">Kitchen Status</th>
                  <th className="p-3">Destination Hub</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {kitchenLogsSheet
                  .filter((row) =>
                    !searchTerm ||
                    row.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    row.phone.includes(searchTerm) ||
                    row.mealItem.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono text-slate-500">{row.date}</td>
                      <td className="p-3 font-bold text-slate-900">{row.customerName}</td>
                      <td className="p-3 font-mono text-slate-600">{row.phone}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-md bg-slate-100 font-mono font-bold text-slate-800">
                          {row.deliverySlot}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-[#1B5E20]">{row.mealItem}</td>
                      <td className="p-3 text-slate-600 max-w-xs">{row.dietaryNotes}</td>
                      <td className="p-3">
                        <select
                          value={row.status}
                          onChange={(e) => updateKitchenLogStatus(row.id, e.target.value as any)}
                          className={`text-xs font-bold px-2 py-1 rounded-lg border cursor-pointer ${
                            row.status === 'Active'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : row.status === 'Pushed'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : 'bg-rose-50 text-rose-800 border-rose-300'
                          }`}
                        >
                          <option value="Active">Active</option>
                          <option value="Pushed">Pushed (5 PM Cutoff)</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-3 text-slate-600 max-w-xs truncate">{row.deliveryAddress}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* SHEET 2: ACTIVE SUBSCRIPTIONS */}
          {activeSheetTab === 'subscriptions' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider border-b border-slate-200">
                  <th className="p-3">Subscription_ID</th>
                  <th className="p-3">Customer_ID (Phone)</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Pattern</th>
                  <th className="p-3">Slot</th>
                  <th className="p-3">Buddy Duo</th>
                  <th className="p-3">Timeline (Start - End)</th>
                  <th className="p-3">Meals Progress</th>
                  <th className="p-3">Pushed Dates</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {subscriptionsSheet
                  .filter((s) =>
                    !searchTerm ||
                    s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    s.customerPhone.includes(searchTerm) ||
                    s.subscriptionId.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((s) => (
                    <tr key={s.subscriptionId} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-slate-800">{s.subscriptionId}</td>
                      <td className="p-3 font-mono text-slate-600">{s.customerPhone}</td>
                      <td className="p-3 font-bold text-slate-900">{s.customerName}</td>
                      <td className="p-3 capitalize font-bold text-[#1B5E20]">{s.planType}</td>
                      <td className="p-3">{s.pattern}</td>
                      <td className="p-3 font-mono font-bold">{s.sessionSlot}</td>
                      <td className="p-3 font-bold">{s.buddyAddOn ? 'Yes (5% Duo)' : 'No'}</td>
                      <td className="p-3 font-mono text-slate-600">
                        {s.startDate} &rarr; {s.endDate}
                      </td>
                      <td className="p-3 font-bold">
                        {s.mealsRemaining} / {s.mealsTotal} meals
                      </td>
                      <td className="p-3 text-slate-500">
                        {s.pushedDates.length > 0 ? s.pushedDates.join(', ') : 'None'}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* SHEET 1: CUSTOMER MASTER */}
          {activeSheetTab === 'customers' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider border-b border-slate-200">
                  <th className="p-3">Customer_ID (Phone)</th>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Delivery Type</th>
                  <th className="p-3">Delivery Address Hub</th>
                  <th className="p-3">Landmark &amp; Pin</th>
                  <th className="p-3">Google Map Link</th>
                  <th className="p-3">Dietary / Allergy Alerts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {customersSheet
                  .filter((c) =>
                    !searchTerm ||
                    c.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    c.mobile.includes(searchTerm) ||
                    c.email.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((c) => (
                    <tr key={c.mobile} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-slate-900">+91 {c.mobile}</td>
                      <td className="p-3 font-bold text-slate-800">{c.fullName}</td>
                      <td className="p-3 text-slate-600">{c.email}</td>
                      <td className="p-3 font-semibold text-emerald-800">{c.deliveryType}</td>
                      <td className="p-3 text-slate-700">{c.flatDoorNo}, {c.buildingOrGym}, {c.street}</td>
                      <td className="p-3 text-slate-500">{c.landmark} ({c.pinCode})</td>
                      <td className="p-3">
                        <a
                          href={c.googleMapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#2E7D32] hover:underline flex items-center gap-1 font-mono text-[11px]"
                        >
                          <span>Open Map</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="p-3 text-slate-600 max-w-xs">{c.dietaryPreferences}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* SHEET 4: FINANCIALS & REFUNDS */}
          {activeSheetTab === 'financials' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider border-b border-slate-200">
                  <th className="p-3">Transaction ID</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Customer Name</th>
                  <th className="p-3">Plan / Item</th>
                  <th className="p-3">Payment Paid</th>
                  <th className="p-3">Delivered Value</th>
                  <th className="p-3">Refund Due</th>
                  <th className="p-3">Refund Status</th>
                  <th className="p-3">Admin Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {financialsSheet
                  .filter((f) =>
                    !searchTerm ||
                    f.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    f.customerPhone.includes(searchTerm) ||
                    f.transactionId.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((f) => (
                    <tr key={f.transactionId} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-slate-800">{f.transactionId}</td>
                      <td className="p-3 font-mono text-slate-500">{f.date}</td>
                      <td className="p-3 font-mono text-slate-600">{f.customerPhone}</td>
                      <td className="p-3 font-bold text-slate-900">{f.customerName}</td>
                      <td className="p-3 font-semibold text-slate-700">{f.planName}</td>
                      <td className="p-3 font-black text-[#1B5E20]">₹{f.paymentAmount}</td>
                      <td className="p-3 font-mono text-slate-600">₹{f.mealsDeliveredValue}</td>
                      <td className="p-3 font-black text-rose-700">₹{f.refundBalanceDue}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          f.refundStatus === 'None'
                            ? 'bg-slate-100 text-slate-600'
                            : f.refundStatus === 'Requested'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {f.refundStatus}
                        </span>
                      </td>
                      <td className="p-3">
                        {f.refundStatus === 'Requested' ? (
                          <button
                            onClick={() => approveRefund(f.transactionId)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-bold transition shadow-xs cursor-pointer"
                          >
                            Approve &amp; Disburse
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-semibold">Settled</span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* SHEET 5: BULK ORDERS */}
          {activeSheetTab === 'bulk' && (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-black tracking-wider border-b border-slate-200">
                  <th className="p-3">Booking ID</th>
                  <th className="p-3">Delivery Date</th>
                  <th className="p-3">Organization</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Packs</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {bulkOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-6 text-center text-slate-400">
                      No bulk orders logged yet. Orders submitted via Tab 4 sync here automatically.
                    </td>
                  </tr>
                ) : (
                  bulkOrders.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-slate-800">{b.id}</td>
                      <td className="p-3 font-mono text-[#2E7D32] font-bold">{b.deliveryDate}</td>
                      <td className="p-3 font-bold text-slate-900">{b.organization}</td>
                      <td className="p-3">{b.contactPerson} ({b.mobile})</td>
                      <td className="p-3 font-bold text-slate-800">{b.numberOfPacks} Packs</td>
                      <td className="p-3 text-slate-600">{b.category}</td>
                      <td className="p-3 font-black text-[#1B5E20]">₹{b.totalEstimate}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Webhook & Sheet Sync Footer Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="font-bold text-slate-600 shrink-0">Make.com / Apps Script Webhook:</span>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-300 font-mono text-[11px] w-full sm:w-96 bg-white text-slate-800"
            />
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            {lastWebhookSyncTime && (
              <span>Last Synced: <strong className="text-slate-800">{lastWebhookSyncTime}</strong></span>
            )}
            <span className="text-[11px] bg-emerald-100 text-[#1B5E20] px-2.5 py-0.5 rounded-md font-bold">
              Real-Time Bi-Directional V4 Active
            </span>
          </div>
        </div>
      </div>

      {/* ADD / EDIT DISH MODAL */}
      {isMenuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-300 my-8 overflow-hidden relative">
            <div className="bg-slate-900 text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#2E7D32] flex items-center justify-center shadow-xs">
                  <Utensils className="w-5 h-5 text-emerald-100" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-display text-white">
                    {editingItem ? 'Edit Dish Details & Publish' : 'Add New Signature Dish / Bowl'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Changes immediately reflect on the customer storefront menu and customizer.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMenuModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDish} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Avocado & Sprouted Bean Crunch"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as Category)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-white capitalize"
                  >
                    <option value="salads">Salads</option>
                    <option value="fruit-bowls">Fruit Bowls</option>
                    <option value="soups">Soups</option>
                    <option value="smoothies">Smoothies</option>
                    <option value="oats-meals">Oats Meals</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Base Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min={50}
                    value={formBasePrice}
                    onChange={(e) => setFormBasePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Dietary Classification *
                  </label>
                  <select
                    value={formIsVeg ? 'veg' : 'non-veg'}
                    onChange={(e) => setFormIsVeg(e.target.value === 'veg')}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                  >
                    <option value="veg">🌱 Pure Vegetarian</option>
                    <option value="non-veg">🍗 Non-Vegetarian</option>
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Promotional Badge
                  </label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="e.g. Gym Pro 42g Protein"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                  />
                </div>
              </div>

              {/* Nutritional Breakdown */}
              <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 block">
                  Nutritional Macros (Per Standard Bowl)
                </span>
                <div className="grid grid-cols-5 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block">Kcal</label>
                    <input
                      type="number"
                      value={formKcal}
                      onChange={(e) => setFormKcal(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block">Protein (g)</label>
                    <input
                      type="number"
                      value={formProtein}
                      onChange={(e) => setFormProtein(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white text-emerald-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block">Carbs (g)</label>
                    <input
                      type="number"
                      value={formCarbs}
                      onChange={(e) => setFormCarbs(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white text-amber-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block">Fat (g)</label>
                    <input
                      type="number"
                      value={formFat}
                      onChange={(e) => setFormFat(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white text-rose-700"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-bold block">Fiber (g)</label>
                    <input
                      type="number"
                      value={formFiber}
                      onChange={(e) => setFormFiber(Number(e.target.value))}
                      className="w-full px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Chef Notes & Ingredients */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chef's Culinary Note / Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formChefNote}
                  onChange={(e) => setFormChefNote(e.target.value)}
                  placeholder="Describe freshness, crispness, and dressing pairing..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ingredients (Comma Separated) *
                </label>
                <input
                  type="text"
                  required
                  value={formIngredients}
                  onChange={(e) => setFormIngredients(e.target.value)}
                  placeholder="Baby Spinach, Cucumber, Feta, Olive Oil Dressing..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-mono"
                />
              </div>

              {/* Image Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Dish Image URL
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white"
                  />
                  {formImage && (
                    <img
                      src={formImage}
                      alt="Preview"
                      className="w-10 h-10 rounded-xl object-cover border shrink-0"
                    />
                  )}
                </div>
                {/* Quick Presets */}
                <div className="text-[11px] text-slate-500 font-semibold mb-1">
                  Or select a culinary preset photo:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_DISH_IMAGES.map((img) => (
                    <button
                      key={img.label}
                      type="button"
                      onClick={() => setFormImage(img.url)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition cursor-pointer ${
                        formImage === img.url
                          ? 'bg-[#2E7D32] text-white border-[#2E7D32]'
                          : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Active / Published Status */}
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-slate-900 block">
                    Publish to Storefront Status
                  </span>
                  <span className="text-[11px] text-slate-600">
                    {formIsActive
                      ? '🟢 Active: Live immediately on the customer menu & subscriptions'
                      : '⚪ Inactive: Hidden / Off-menu (Saved as draft or seasonal archive)'}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2E7D32]"></div>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsMenuModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold transition shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingItem ? 'Save & Publish Live' : 'Add to Live Menu'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

