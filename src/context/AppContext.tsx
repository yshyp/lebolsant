import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CustomerProfile,
  MenuItem,
  PlanTier,
  DeliveryPattern,
  SessionSlot,
  ActiveSubscription,
  CartItem,
  BulkOrderSubmission,
  DailyKitchenLogEntry,
  FinancialRecord,
  AdminPricing,
  AdminUser,
} from '../types';
import {
  INITIAL_ADMIN_PRICING,
  INITIAL_CUSTOMERS,
  INITIAL_SUBSCRIPTIONS,
  INITIAL_KITCHEN_LOG,
  INITIAL_FINANCIALS,
  MENU_ITEMS,
  PLAN_CONFIGS
} from '../data/mockData';

interface AppContextType {
  // Navigation & Modals
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isProfileDrawerOpen: boolean;
  setIsProfileDrawerOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  isCustomizerOpen: boolean;
  selectedMealForCustomization: MenuItem | null;
  openMealCustomizer: (item: MenuItem) => void;
  closeMealCustomizer: () => void;
  isMakeMySaladOpen: boolean;
  setIsMakeMySaladOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;

  // Customer & Auth
  currentCustomer: CustomerProfile | null;
  isLoggedIn: boolean;
  sendOtp: (phone: string) => Promise<string>;
  verifyOtp: (phone: string, otp: string) => boolean;
  logoutCustomer: () => void;
  updateCustomerProfile: (profile: CustomerProfile) => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: MenuItem, customizations?: { toppingsAdded?: string[]; toppingsRemoved?: string[]; dressingChoice?: string; dressingOnSide?: boolean; specialInstructions?: string; quantity?: number }) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, qty: number) => void;
  clearCart: () => void;
  cartTotal: number;

  // Admin Pricing (Dynamic Live Updates)
  adminPricing: AdminPricing;
  updateAdminPricing: (newPricing: Partial<AdminPricing>) => void;

  // Subscriptions
  userSubscription: ActiveSubscription | null;
  createNewSubscription: (data: {
    planType: PlanTier;
    pattern: DeliveryPattern;
    sessionSlot: SessionSlot;
    buddyAddOn: boolean;
    selectedMealName: string;
    customMacros?: any;
  }) => ActiveSubscription;
  pushSubscriptionDates: (datesToSkip: string[]) => { success: boolean; message: string };
  switchSubscriptionMeal: (newMealName: string) => { success: boolean; message: string };
  upgradeUserPlan: (newPlan: PlanTier) => { success: boolean; message: string };

  // Cutoff & Timing Helpers
  isBeforeCutoff5PM: () => boolean;
  nextAvailableSkipDate: () => string; // YYYY-MM-DD
  cutoffTimeRemaining: string;

  // Bulk Orders
  bulkOrders: BulkOrderSubmission[];
  submitBulkOrder: (order: Omit<BulkOrderSubmission, 'id' | 'submittedAt' | 'status'>) => BulkOrderSubmission;

  // 4 Operational Sheets
  customersSheet: CustomerProfile[];
  subscriptionsSheet: ActiveSubscription[];
  kitchenLogsSheet: DailyKitchenLogEntry[];
  financialsSheet: FinancialRecord[];
  updateKitchenLogStatus: (id: string, status: 'Active' | 'Pushed' | 'Cancelled') => void;
  requestProratedRefund: (customerPhone: string) => { success: boolean; message: string };
  approveRefund: (transactionId: string) => void;
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
  lastWebhookSyncTime: string | null;
  triggerWebhookSync: () => Promise<boolean>;
  showSheetsViewer: boolean;
  setShowSheetsViewer: (show: boolean) => void;

  // Admin Portal & Authentication
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  isAdminAuthModalOpen: boolean;
  setIsAdminAuthModalOpen: (open: boolean) => void;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;

  // Dynamic Menu Management (Admin editable & publishable)
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => MenuItem;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  toggleMenuItemActive: (id: string) => void;
  deleteMenuItem: (id: string) => void;
  resetMenuToDefault: () => void;
}



const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation State with URL synchronization (/admin, /menu, /subscriptions, etc.)
  const getInitialTab = (): string => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();

    if (path.includes('/admin') || hash.includes('admin') || search.includes('admin')) {
      return 'admin';
    }
    if (path.includes('/menu') || hash.includes('menu')) {
      return 'menu';
    }
    if (path.includes('/subscription') || hash.includes('subscription')) {
      return 'subscriptions';
    }
    if (path.includes('/bulk') || hash.includes('bulk')) {
      return 'bulk-orders';
    }
    if (path.includes('/account') || hash.includes('account')) {
      return 'account';
    }
    if (path.includes('/about') || path.includes('/info') || hash.includes('info')) {
      return 'info';
    }
    return 'home';
  };

  const [currentTab, setTabState] = useState<string>(getInitialTab);

  const setCurrentTab = (tab: string) => {
    setTabState(tab);
    if (typeof window !== 'undefined') {
      const targetPath = tab === 'home' ? '/' : `/${tab}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ tab }, '', targetPath);
      }
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setTabState(getInitialTab());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [selectedMealForCustomization, setSelectedMealForCustomization] = useState<MenuItem | null>(null);
  const [isMakeMySaladOpen, setIsMakeMySaladOpen] = useState(false);
  const [showSheetsViewer, setShowSheetsViewer] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Admin Pricing (Persistent)
  const [adminPricing, setAdminPricing] = useState<AdminPricing>(() => {
    const saved = localStorage.getItem('lbs_admin_pricing');
    return saved ? JSON.parse(saved) : INITIAL_ADMIN_PRICING;
  });

  // Sheets data
  const [customersSheet, setCustomersSheet] = useState<CustomerProfile[]>(() => {
    const saved = localStorage.getItem('lbs_sheet_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [subscriptionsSheet, setSubscriptionsSheet] = useState<ActiveSubscription[]>(() => {
    const saved = localStorage.getItem('lbs_sheet_subs');
    return saved ? JSON.parse(saved) : INITIAL_SUBSCRIPTIONS;
  });

  const [kitchenLogsSheet, setKitchenLogsSheet] = useState<DailyKitchenLogEntry[]>(() => {
    const saved = localStorage.getItem('lbs_sheet_kitchen');
    return saved ? JSON.parse(saved) : INITIAL_KITCHEN_LOG;
  });

  const [financialsSheet, setFinancialsSheet] = useState<FinancialRecord[]>(() => {
    const saved = localStorage.getItem('lbs_sheet_financials');
    return saved ? JSON.parse(saved) : INITIAL_FINANCIALS;
  });

  const [bulkOrders, setBulkOrders] = useState<BulkOrderSubmission[]>(() => {
    const saved = localStorage.getItem('lbs_bulk_orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Admin Authentication State
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('lbs_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const isAdminLoggedIn = !!adminUser;

  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    return localStorage.getItem('lbs_webhook_url') || 'https://hook.eu1.make.com/lbs-salad-automation-v4';
  });
  const [lastWebhookSyncTime, setLastWebhookSyncTime] = useState<string | null>(null);

  // Customer Auth - starts logged out unless a real authenticated user session exists
  const [currentCustomer, setCurrentCustomer] = useState<CustomerProfile | null>(() => {
    const saved = localStorage.getItem('lbs_current_user');
    if (!saved) return null;
    try {
      const user = JSON.parse(saved);
      // Clean up any previously auto-loaded Rahul Sharma unless actively logged in
      const manualAuth = localStorage.getItem('lbs_manual_auth');
      if (user && user.fullName === 'Rahul Sharma' && !manualAuth) {
        localStorage.removeItem('lbs_current_user');
        return null;
      }
      return user;
    } catch {
      return null;
    }
  });


  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('lbs_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save states to local storage
  useEffect(() => {
    localStorage.setItem('lbs_admin_pricing', JSON.stringify(adminPricing));
  }, [adminPricing]);

  useEffect(() => {
    localStorage.setItem('lbs_sheet_customers', JSON.stringify(customersSheet));
  }, [customersSheet]);

  useEffect(() => {
    localStorage.setItem('lbs_sheet_subs', JSON.stringify(subscriptionsSheet));
  }, [subscriptionsSheet]);

  useEffect(() => {
    localStorage.setItem('lbs_sheet_kitchen', JSON.stringify(kitchenLogsSheet));
  }, [kitchenLogsSheet]);

  useEffect(() => {
    localStorage.setItem('lbs_sheet_financials', JSON.stringify(financialsSheet));
  }, [financialsSheet]);

  useEffect(() => {
    localStorage.setItem('lbs_bulk_orders', JSON.stringify(bulkOrders));
  }, [bulkOrders]);

  useEffect(() => {
    if (currentCustomer) {
      localStorage.setItem('lbs_current_user', JSON.stringify(currentCustomer));
    } else {
      localStorage.removeItem('lbs_current_user');
    }
  }, [currentCustomer]);

  useEffect(() => {
    localStorage.setItem('lbs_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lbs_webhook_url', webhookUrl);
  }, [webhookUrl]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('lbs_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('lbs_admin_user');
    }
  }, [adminUser]);

  // Dynamic Menu State (Persistent & Admin Editable)
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('lbs_menu_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved menu items', e);
      }
    }
    return MENU_ITEMS.map((item) => ({ ...item, isActive: item.isActive !== false }));
  });

  useEffect(() => {
    localStorage.setItem('lbs_menu_items', JSON.stringify(menuItems));
  }, [menuItems]);

  const addMenuItem = (itemData: Omit<MenuItem, 'id'>): MenuItem => {
    const newItem: MenuItem = {
      ...itemData,
      id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      isActive: itemData.isActive !== false
    };
    setMenuItems((prev) => [newItem, ...prev]);
    return newItem;
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)));
  };

  const toggleMenuItemActive = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const current = item.isActive !== false;
          return { ...item, isActive: !current };
        }
        return item;
      })
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  const resetMenuToDefault = () => {
    const defaultList = MENU_ITEMS.map((item) => ({ ...item, isActive: true }));
    setMenuItems(defaultList);
  };

  const adminLogin = (email: string, pass: string): boolean => {

    const lower = email.trim().toLowerCase();
    // Accept valid admin emails or quick test password
    if (
      lower.includes('admin') ||
      lower.includes('kitchen') ||
      pass === 'admin123' ||
      pass === 'chef5am' ||
      pass.length >= 4
    ) {
      const user: AdminUser = {
        email: lower.includes('@') ? lower : 'admin@lebolsante.com',
        name: lower.includes('kitchen') ? 'Chef Anand (Kitchen Lead)' : 'Marc Dubois (Operations Director)',
        role: lower.includes('kitchen') ? 'Kitchen Manager' : 'Operations Admin'
      };
      setAdminUser(user);
      setIsAdminAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setAdminUser(null);
  };

  const approveRefund = (transactionId: string) => {
    setFinancialsSheet((prev) =>
      prev.map((f) => (f.transactionId === transactionId ? { ...f, refundStatus: 'Processed' } : f))
    );
  };

  // Current Active Subscription for logged-in user
  const userSubscription = currentCustomer
    ? subscriptionsSheet.find(
        (s) => s.customerPhone === currentCustomer.mobile && (s.status === 'Active' || s.status === 'Paused')
      ) || null
    : null;

  // 5 PM Cutoff Countdown logic
  const [cutoffTimeRemaining, setCutoffTimeRemaining] = useState<string>('');

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const cutoff = new Date();
      cutoff.setHours(17, 0, 0, 0); // 5:00 PM today

      if (now > cutoff) {
        // Cutoff passed for today, next cutoff is 5 PM tomorrow
        cutoff.setDate(cutoff.getDate() + 1);
      }

      const diffMs = cutoff.getTime() - now.getTime();
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setCutoffTimeRemaining(
        `${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`
      );
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const isBeforeCutoff5PM = () => {
    const now = new Date();
    return now.getHours() < 17;
  };

  const nextAvailableSkipDate = () => {
    const date = new Date();
    if (isBeforeCutoff5PM()) {
      // Can lock tomorrow
      date.setDate(date.getDate() + 1);
    } else {
      // Must start from day after tomorrow
      date.setDate(date.getDate() + 2);
    }
    return date.toISOString().split('T')[0];
  };

  // Auth Methods
  const sendOtp = async (phone: string): Promise<string> => {
    // In production, triggers transactional SMS gateway.
    // In demo environment, generates and alerts a clear OTP code.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('543210'); // Standard test OTP
      }, 400);
    });
  };

  const verifyOtp = (phone: string, otp: string): boolean => {
    if (otp === '543210' || otp === '123456' || otp.length === 6) {
      // Check if user exists in customer master
      let customer = customersSheet.find((c) => c.mobile === phone);
      if (!customer) {
        // Create new preliminary customer record
        customer = {
          fullName: 'Valued Fitness Member',
          mobile: phone,
          email: `${phone}@lebolsante.com`,
          deliveryType: 'Gym / Fitness Center',
          flatDoorNo: 'Locker / Desk #',
          buildingOrGym: 'Cult / Golds / Fitness Hub',
          street: 'Main Avenue',
          landmark: '',
          pinCode: '560001',
          googleMapUrl: 'https://maps.google.com',
          dietaryPreferences: 'No specific allergies'
        };
        setCustomersSheet((prev) => [customer!, ...prev]);
      }
      localStorage.setItem('lbs_manual_auth', 'true');
      setCurrentCustomer(customer);
      setIsAuthModalOpen(false);
      return true;
    }
    return false;
  };

  const logoutCustomer = () => {
    setCurrentCustomer(null);
    localStorage.removeItem('lbs_current_user');
    localStorage.removeItem('lbs_manual_auth');
  };


  const updateCustomerProfile = (profile: CustomerProfile) => {
    setCurrentCustomer(profile);
    setCustomersSheet((prev) => {
      const exists = prev.some((c) => c.mobile === profile.mobile);
      if (exists) {
        return prev.map((c) => (c.mobile === profile.mobile ? profile : c));
      }
      return [profile, ...prev];
    });
    setIsProfileDrawerOpen(false);
  };

  // Cart Methods
  const addToCart = (
    item: MenuItem,
    customizations?: {
      toppingsAdded?: string[];
      toppingsRemoved?: string[];
      dressingChoice?: string;
      dressingOnSide?: boolean;
      specialInstructions?: string;
      quantity?: number;
    }
  ) => {
    const qty = customizations?.quantity || 1;
    setCart((prev) => {
      const existing = prev.find(
        (ci) =>
          ci.item.id === item.id &&
          JSON.stringify(ci.toppingsAdded) === JSON.stringify(customizations?.toppingsAdded || []) &&
          ci.dressingChoice === (customizations?.dressingChoice || 'Cold-Pressed Olive Lemon')
      );
      if (existing) {
        return prev.map((ci) => (ci === existing ? { ...ci, quantity: ci.quantity + qty } : ci));
      }
      return [
        ...prev,
        {
          item,
          quantity: qty,
          toppingsAdded: customizations?.toppingsAdded || [],
          toppingsRemoved: customizations?.toppingsRemoved || [],
          dressingChoice: customizations?.dressingChoice || 'Cold-Pressed Olive Lemon',
          dressingOnSide: customizations?.dressingOnSide ?? true,
          specialInstructions: customizations?.specialInstructions || ''
        }
      ];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => prev.map((item, i) => (i === index ? { ...item, quantity: qty } : item)));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, curr) => acc + curr.item.basePrice * curr.quantity, 0);

  // Meal Customizer Modal
  const openMealCustomizer = (item: MenuItem) => {
    setSelectedMealForCustomization(item);
    setIsCustomizerOpen(true);
  };

  const closeMealCustomizer = () => {
    setSelectedMealForCustomization(null);
    setIsCustomizerOpen(false);
  };

  // Dynamic Admin Pricing
  const updateAdminPricing = (newPricing: Partial<AdminPricing>) => {
    setAdminPricing((prev) => ({ ...prev, ...newPricing }));
  };

  // Subscriptions & Day Push
  const createNewSubscription = (data: {
    planType: PlanTier;
    pattern: DeliveryPattern;
    sessionSlot: SessionSlot;
    buddyAddOn: boolean;
    selectedMealName: string;
    customMacros?: any;
  }): ActiveSubscription => {
    const plan = PLAN_CONFIGS.find((p) => p.id === data.planType)!;
    const baseRate = adminPricing[plan.baseMealRateKey];
    const totalMeals = plan.durationDays;
    const duoMultiplier = data.buddyAddOn ? 2 : 1;
    const duoDiscount = data.buddyAddOn ? 0.95 : 1.0;
    const finalAmount = Math.round(baseRate * totalMeals * duoMultiplier * duoDiscount);

    const today = new Date();
    today.setDate(today.getDate() + 1); // Starts tomorrow
    const startDate = today.toISOString().split('T')[0];

    const endDateObj = new Date(today);
    endDateObj.setDate(endDateObj.getDate() + Math.ceil(totalMeals * (data.pattern === 'weekdays' ? 1.4 : 1.6)));
    const endDate = endDateObj.toISOString().split('T')[0];

    const newSub: ActiveSubscription = {
      subscriptionId: `LBS-SUB-${Math.floor(1000 + Math.random() * 9000)}`,
      customerPhone: currentCustomer?.mobile || '9999999999',
      customerName: currentCustomer?.fullName || 'Health Subscriber',
      planType: data.planType,
      pattern: data.pattern,
      sessionSlot: data.sessionSlot,
      buddyAddOn: data.buddyAddOn,
      startDate,
      endDate,
      mealsTotal: totalMeals,
      mealsRemaining: totalMeals,
      renewalDiscountEligible: data.planType === 'monthly' || data.planType === 'quarterly',
      pushedDates: [],
      selectedMealName: data.selectedMealName,
      customMacros: data.customMacros,
      status: 'Active'
    };

    // Update Subscriptions Sheet
    setSubscriptionsSheet((prev) => [newSub, ...prev]);

    // Update Financials Sheet
    const newTxn: FinancialRecord = {
      transactionId: `TXN-LBS-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      customerPhone: newSub.customerPhone,
      customerName: newSub.customerName,
      planName: `${plan.title} (${data.buddyAddOn ? 'Duo Buddy' : 'Single'})`,
      paymentAmount: finalAmount,
      proratedRefundRequested: false,
      mealsDeliveredValue: 0,
      refundBalanceDue: 0,
      refundStatus: 'None'
    };
    setFinancialsSheet((prev) => [newTxn, ...prev]);

    // Seed kitchen fulfillment row for tomorrow
    const newKitchenRow: DailyKitchenLogEntry = {
      id: `KITCHEN-${Math.floor(100 + Math.random() * 900)}`,
      date: startDate,
      customerName: newSub.customerName,
      phone: newSub.customerPhone,
      deliverySlot: data.sessionSlot,
      mealItem: `${data.selectedMealName} ${data.buddyAddOn ? '(x2 Buddy)' : ''}`,
      dietaryNotes: currentCustomer?.dietaryPreferences || 'Fresh prep',
      status: 'Active',
      deliveryAddress: `${currentCustomer?.buildingOrGym || 'Fitness Hub'}, ${currentCustomer?.flatDoorNo || ''}`
    };
    setKitchenLogsSheet((prev) => [newKitchenRow, ...prev]);

    return newSub;
  };

  const pushSubscriptionDates = (datesToSkip: string[]): { success: boolean; message: string } => {
    if (!userSubscription) return { success: false, message: 'No active subscription found.' };
    if (userSubscription.planType === 'weekly') {
      return { success: false, message: 'Weekly Starter plan has a fixed duration and does not allow Day Push.' };
    }

    const minDateAllowed = nextAvailableSkipDate();
    const invalidDates = datesToSkip.filter((d) => d < minDateAllowed);

    if (invalidDates.length > 0) {
      return {
        success: false,
        message: isBeforeCutoff5PM()
          ? `Day Push for today is locked. The earliest date you can skip is tomorrow (${minDateAllowed}).`
          : `5:00 PM kitchen lockout has passed. Kitchen prep has begun for tomorrow. Earliest skip date is ${minDateAllowed}.`
      };
    }

    // Calculate extended end date
    const currentEnd = new Date(userSubscription.endDate);
    currentEnd.setDate(currentEnd.getDate() + datesToSkip.length);
    const newEndDate = currentEnd.toISOString().split('T')[0];

    const updatedPushed = Array.from(new Set([...userSubscription.pushedDates, ...datesToSkip])).sort();

    setSubscriptionsSheet((prev) =>
      prev.map((s) =>
        s.subscriptionId === userSubscription.subscriptionId
          ? {
              ...s,
              pushedDates: updatedPushed,
              endDate: newEndDate
            }
          : s
      )
    );

    // Update Kitchen logs status for those dates
    setKitchenLogsSheet((prev) =>
      prev.map((log) => {
        if (log.phone === userSubscription.customerPhone && datesToSkip.includes(log.date)) {
          return { ...log, status: 'Pushed' };
        }
        return log;
      })
    );

    return {
      success: true,
      message: `Successfully pushed ${datesToSkip.length} day(s). Your subscription has been automatically extended to ${newEndDate}!`
    };
  };

  const switchSubscriptionMeal = (newMealName: string): { success: boolean; message: string } => {
    if (!userSubscription) return { success: false, message: 'No active subscription found.' };

    const effectiveDate = new Date();
    effectiveDate.setDate(effectiveDate.getDate() + 3); // 3 working days delay for sprouted items
    const effectiveDateStr = effectiveDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    setSubscriptionsSheet((prev) =>
      prev.map((s) =>
        s.subscriptionId === userSubscription.subscriptionId
          ? {
              ...s,
              selectedMealName: newMealName
            }
          : s
      )
    );

    return {
      success: true,
      message: `Meal successfully updated to "${newMealName}". Due to kitchen procurement & organic sprouting cycles, this switch takes effect in 3 working days on ${effectiveDateStr}.`
    };
  };

  const upgradeUserPlan = (newPlan: PlanTier): { success: boolean; message: string } => {
    if (!userSubscription) return { success: false, message: 'No active subscription found.' };

    const currentPlanConfig = PLAN_CONFIGS.find((p) => p.id === userSubscription.planType)!;
    const targetPlanConfig = PLAN_CONFIGS.find((p) => p.id === newPlan)!;

    if (targetPlanConfig.durationDays <= currentPlanConfig.durationDays) {
      return { success: false, message: 'Upgrades must be to a longer duration tier.' };
    }

    setSubscriptionsSheet((prev) =>
      prev.map((s) =>
        s.subscriptionId === userSubscription.subscriptionId
          ? {
              ...s,
              planType: newPlan,
              mealsTotal: s.mealsTotal + (targetPlanConfig.durationDays - currentPlanConfig.durationDays),
              mealsRemaining: s.mealsRemaining + (targetPlanConfig.durationDays - currentPlanConfig.durationDays),
              renewalDiscountEligible: true
            }
          : s
      )
    );

    return {
      success: true,
      message: `Congratulations! Your plan has been upgraded to ${targetPlanConfig.title} with existing balance credited.`
    };
  };

  // Bulk Orders
  const submitBulkOrder = (
    order: Omit<BulkOrderSubmission, 'id' | 'submittedAt' | 'status'>
  ): BulkOrderSubmission => {
    const newBulk: BulkOrderSubmission = {
      ...order,
      id: `BULK-${Math.floor(1000 + Math.random() * 9000)}`,
      submittedAt: new Date().toISOString(),
      status: '100% Advance Confirmed'
    };
    setBulkOrders((prev) => [newBulk, ...prev]);

    // Also record in Financials Sheet
    setFinancialsSheet((prev) => [
      {
        transactionId: `TXN-BULK-${Math.floor(10000 + Math.random() * 90000)}`,
        date: new Date().toISOString().split('T')[0],
        customerPhone: newBulk.mobile,
        customerName: `${newBulk.contactPerson} (${newBulk.organization})`,
        planName: `Bulk Event: ${newBulk.category} (${newBulk.numberOfPacks} Packs)`,
        paymentAmount: newBulk.totalEstimate,
        proratedRefundRequested: false,
        mealsDeliveredValue: 0,
        refundBalanceDue: 0,
        refundStatus: 'None'
      },
      ...prev
    ]);

    return newBulk;
  };

  // Prorated Refund Engine (Terms & Conditions compliance)
  const requestProratedRefund = (customerPhone: string): { success: boolean; message: string } => {
    const sub = subscriptionsSheet.find((s) => s.customerPhone === customerPhone);
    const txn = financialsSheet.find((f) => f.customerPhone === customerPhone);

    if (!sub || !txn) {
      return { success: false, message: 'No active subscription or transaction record found.' };
    }

    const mealsDelivered = sub.mealsTotal - sub.mealsRemaining;
    const singleMealStandardRate = adminPricing.singleMealRate; // Single meal price without subscription discount
    const deliveredValue = mealsDelivered * singleMealStandardRate;
    const refundDue = Math.max(0, txn.paymentAmount - deliveredValue);

    setFinancialsSheet((prev) =>
      prev.map((f) =>
        f.customerPhone === customerPhone
          ? {
              ...f,
              proratedRefundRequested: true,
              mealsDeliveredValue: deliveredValue,
              refundBalanceDue: refundDue,
              refundStatus: 'Requested'
            }
          : f
      )
    );

    setSubscriptionsSheet((prev) =>
      prev.map((s) => (s.customerPhone === customerPhone ? { ...s, status: 'Cancelled' } : s))
    );

    return {
      success: true,
      message: `Prorated refund initiated: ₹${txn.paymentAmount} paid minus ${mealsDelivered} meals at standard single rate (₹${singleMealStandardRate}/meal = ₹${deliveredValue}). Net refund due: ₹${refundDue}. Credited within 5 working days.`
    };
  };

  const updateKitchenLogStatus = (id: string, status: 'Active' | 'Pushed' | 'Cancelled') => {
    setKitchenLogsSheet((prev) => prev.map((log) => (log.id === id ? { ...log, status } : log)));
  };

  const triggerWebhookSync = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setLastWebhookSyncTime(new Date().toLocaleTimeString());
        resolve(true);
      }, 700);
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isProfileDrawerOpen,
        setIsProfileDrawerOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        isCustomizerOpen,
        selectedMealForCustomization,
        openMealCustomizer,
        closeMealCustomizer,
        isMakeMySaladOpen,
        setIsMakeMySaladOpen,
        isShareModalOpen,
        setIsShareModalOpen,

        currentCustomer,
        isLoggedIn: !!currentCustomer,
        sendOtp,
        verifyOtp,
        logoutCustomer,
        updateCustomerProfile,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,

        adminPricing,
        updateAdminPricing,

        userSubscription,
        createNewSubscription,
        pushSubscriptionDates,
        switchSubscriptionMeal,
        upgradeUserPlan,

        isBeforeCutoff5PM,
        nextAvailableSkipDate,
        cutoffTimeRemaining,

        bulkOrders,
        submitBulkOrder,

        customersSheet,
        subscriptionsSheet,
        kitchenLogsSheet,
        financialsSheet,
        updateKitchenLogStatus,
        requestProratedRefund,

        webhookUrl,
        setWebhookUrl,
        lastWebhookSyncTime,
        triggerWebhookSync,

        showSheetsViewer,
        setShowSheetsViewer,

        // Admin
        isAdminLoggedIn,
        adminUser,
        isAdminAuthModalOpen,
        setIsAdminAuthModalOpen,
        adminLogin,
        adminLogout,
        approveRefund,

        // Dynamic Menu
        menuItems,
        addMenuItem,
        updateMenuItem,
        toggleMenuItemActive,
        deleteMenuItem,
        resetMenuToDefault
      }}

    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
