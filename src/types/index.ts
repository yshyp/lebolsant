export type Category = 'salads' | 'fruit-bowls' | 'soups' | 'smoothies' | 'oats-meals';

export type DeliveryType = 'Gym / Fitness Center' | 'Workplace / Office' | 'PG / Hostel' | 'Home / Residential';

export interface CustomerProfile {
  fullName: string;
  mobile: string; // Primary key
  secondaryMobile?: string;
  email: string;
  deliveryType: DeliveryType;
  flatDoorNo: string;
  buildingOrGym: string;
  street: string;
  landmark: string;
  pinCode: string;
  googleMapUrl: string;
  dietaryPreferences: string;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  isVeg: boolean;
  basePrice: number; // e.g. 200
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  chefNote: string;
  image: string;
  ingredients: string[];
  allergens?: string[];
  badge?: string;
  isActive?: boolean; // Whether the item is live/published on the public customer menu
}


export type PlanTier = 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly';

export interface PlanConfig {
  id: PlanTier;
  title: string;
  discountPct: number;
  tagline: string;
  recommendedFor: string;
  durationDays: number;
  allowsDayPush: boolean;
  allowsCustomMacros: boolean;
  hasGiftPerks: boolean;
  perks: string[];
  baseMealRateKey: keyof AdminPricing;
}

export type DeliveryPattern = 'weekdays' | 'mwf' | 'tts' | 'weekdays-sat' | 'one-day';

export type SessionSlot = 'M-S-1' | 'M-S-2' | 'E-S-1' | 'E-S-2';

export interface SessionSlotInfo {
  id: SessionSlot;
  name: string;
  timeWindow: string;
  description: string;
}

export interface ActiveSubscription {
  subscriptionId: string;
  customerPhone: string;
  customerName: string;
  planType: PlanTier;
  pattern: DeliveryPattern;
  sessionSlot: SessionSlot;
  buddyAddOn: boolean;
  startDate: string; // ISO YYYY-MM-DD
  endDate: string; // ISO YYYY-MM-DD
  mealsTotal: number;
  mealsRemaining: number;
  renewalDiscountEligible: boolean;
  pushedDates: string[]; // List of skipped dates
  selectedMealName?: string;
  customMacros?: {
    extraProtein?: string;
    lowCarb?: boolean;
    dressingStyle?: string;
  };
  status: 'Active' | 'Paused' | 'Completed' | 'Cancelled';
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  toppingsAdded: string[];
  toppingsRemoved: string[];
  dressingChoice: string;
  dressingOnSide: boolean;
  specialInstructions: string;
}

export interface BulkOrderSubmission {
  id: string;
  category: 'Kids Special' | 'General Corporate & Event';
  contactPerson: string;
  mobile: string;
  email: string;
  organization: string;
  numberOfPacks: number;
  deliveryDate: string;
  deliveryLocation: string;
  landmark: string;
  googleMapUrl: string;
  dietaryPreferences: string;
  menuPackage: string;
  totalEstimate: number;
  submittedAt: string;
  status: 'Pending Verification' | '100% Advance Confirmed' | 'In Kitchen Prep' | 'Dispatched';
}

export interface DailyKitchenLogEntry {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  deliverySlot: SessionSlot;
  mealItem: string;
  dietaryNotes: string;
  status: 'Active' | 'Pushed' | 'Cancelled';
  deliveryAddress: string;
}

export interface FinancialRecord {
  transactionId: string;
  date: string;
  customerPhone: string;
  customerName: string;
  planName: string;
  paymentAmount: number;
  proratedRefundRequested: boolean;
  mealsDeliveredValue: number;
  refundBalanceDue: number;
  refundStatus: 'None' | 'Requested' | 'Processed' | 'Rejected';
}

export interface AdminPricing {
  singleMealRate: number; // e.g. 150
  biWeeklyRate: number;   // e.g. 130
  monthlyRate: number;    // e.g. 110
  quarterlyRate: number;  // e.g. 95
}

export interface AdminUser {
  email: string;
  name: string;
  role: 'Kitchen Manager' | 'Operations Admin' | 'Founder';
  avatar?: string;
}

