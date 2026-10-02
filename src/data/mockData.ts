import { MenuItem, PlanConfig, SessionSlotInfo, AdminPricing, CustomerProfile, ActiveSubscription, DailyKitchenLogEntry, FinancialRecord } from '../types';

export const INITIAL_ADMIN_PRICING: AdminPricing = {
  singleMealRate: 150,
  biWeeklyRate: 130,
  monthlyRate: 110,
  quarterlyRate: 95,
};

export const MENU_ITEMS: MenuItem[] = [
  // --- SALADS ---
  {
    id: 'salad-1',
    name: 'Santé Garden Crunch & Feta',
    category: 'salads',
    isVeg: true,
    basePrice: 195,
    kcal: 340,
    protein: 14,
    carbs: 26,
    fat: 19,
    fiber: 9,
    chefNote: 'Crisp baby spinach, iceberg, cherry tomatoes, kalamata olives, marinated Greek feta & toasted pumpkin seeds with cold-pressed olive-lemon dressing.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Baby Spinach', 'Iceberg Lettuce', 'Cherry Tomatoes', 'Cucumbers', 'Greek Feta', 'Pumpkin Seeds', 'Balsamic Emulsion'],
    allergens: ['Dairy'],
    badge: 'Chef Favorite'
  },
  {
    id: 'salad-2',
    name: 'Herb-Grilled Chicken Macro Bowl',
    category: 'salads',
    isVeg: false,
    basePrice: 235,
    kcal: 480,
    protein: 42,
    carbs: 22,
    fat: 12,
    fiber: 8,
    chefNote: 'High-protein rosemary grilled chicken breast served over baby arugula, steamed quinoa, charred bell peppers and avocado dressing.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Sous-vide Chicken Breast', 'Tri-color Quinoa', 'Charred Capsicum', 'Baby Arugula', 'Chia Dust', 'Avocado Dressing'],
    badge: 'Gym Pro 42g Protein'
  },
  {
    id: 'salad-3',
    name: 'Sprouted Moong & Paneer Tikka Salad',
    category: 'salads',
    isVeg: true,
    basePrice: 205,
    kcal: 390,
    protein: 26,
    carbs: 32,
    fat: 14,
    fiber: 11,
    chefNote: 'Organic 24-hr sprouted green gram, roasted cottage cheese cubes, pomegranate pearls, mint sprigs with zesty chaat vinaigrette.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Sprouted Moong', 'Charred Paneer', 'Pomegranate Pearls', 'Fresh Mint', 'Cucumber', 'Zesty Chaat Vinaigrette'],
    allergens: ['Dairy'],
    badge: 'High Fiber'
  },
  {
    id: 'salad-4',
    name: 'Zesty Asian Edamame & Tofu Bowl',
    category: 'salads',
    isVeg: true,
    basePrice: 215,
    kcal: 360,
    protein: 23,
    carbs: 28,
    fat: 13,
    fiber: 10,
    chefNote: 'Steamed edamame, sesame crusted firm tofu, purple cabbage, shaved carrots, roasted peanuts and tamari-ginger dressing.',
    image: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Japanese Edamame', 'Organic Tofu', 'Red Cabbage', 'Carrot Ribbons', 'Sesame Seeds', 'Ginger-Tamari Glaze'],
    allergens: ['Soy', 'Peanuts'],
    badge: '100% Plant Protein'
  },
  {
    id: 'salad-5',
    name: 'Smoked Egg Whites & Avocado Salad',
    category: 'salads',
    isVeg: false,
    basePrice: 220,
    kcal: 330,
    protein: 34,
    carbs: 15,
    fat: 11,
    fiber: 7,
    chefNote: 'Six poached organic egg whites tossed with hass avocado cubes, baby greens, sun-dried tomatoes and crushed black pepper.',
    image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=800&q=80',
    ingredients: ['6 Organic Egg Whites', 'Hass Avocado', 'Sun-dried Tomatoes', 'Romaine Hearts', 'Lemon-Pepper Dressing'],
    allergens: ['Eggs'],
    badge: 'Lean Bulking'
  },

  // --- FRUIT BOWLS ---
  {
    id: 'fruit-1',
    name: 'Antioxidant Super-Berry Fruit Platter',
    category: 'fruit-bowls',
    isVeg: true,
    basePrice: 180,
    kcal: 260,
    protein: 5,
    carbs: 58,
    fat: 2,
    fiber: 9,
    chefNote: 'Plump blueberries, strawberries, kiwi slices, dragon fruit cubes, sweet pomegranate and raw wildflower honey drizzle.',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Blueberries', 'Strawberries', 'New Zealand Kiwi', 'White Dragonfruit', 'Pomegranate', 'Raw Honey'],
    badge: 'Cellular Defense'
  },
  {
    id: 'fruit-2',
    name: 'Tropical Hydration & Electrolyte Bowl',
    category: 'fruit-bowls',
    isVeg: true,
    basePrice: 160,
    kcal: 210,
    protein: 4,
    carbs: 48,
    fat: 1,
    fiber: 6,
    chefNote: 'Sweet tender coconut slivers, sun-ripened papaya, watermelons, pineapple crowns and roasted chia seeds with lime zest.',
    image: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Tender Coconut Meat', 'Papaya', 'Watermelon', 'Pineapple', 'Kaffir Lime Juice', 'Chia Seeds'],
    badge: 'Post-Workout Hydration'
  },

  // --- SOUPS ---
  {
    id: 'soup-1',
    name: 'Slow-Simmered Roasted Tomato & Basil Bisque',
    category: 'soups',
    isVeg: true,
    basePrice: 150,
    kcal: 180,
    protein: 6,
    carbs: 22,
    fat: 5,
    fiber: 7,
    chefNote: 'Vine-ripened Roma tomatoes wood-roasted with garlic cloves, pureed with fresh Italian basil and a swirl of oat cream. Zero refined starch.',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Roma Tomatoes', 'Fresh Basil', 'Roasted Garlic', 'Oat Cream', 'Black Pepper', 'Olive Oil'],
    badge: 'Immunity Boost'
  },
  {
    id: 'soup-2',
    name: 'Creamy Forest Mushroom & Thyme Pot',
    category: 'soups',
    isVeg: true,
    basePrice: 175,
    kcal: 210,
    protein: 9,
    carbs: 18,
    fat: 8,
    fiber: 5,
    chefNote: 'Button & shiitake mushrooms gently caramelized with shallots and fresh thyme, blended smoothly without corn starch or butter.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Shiitake Mushrooms', 'Button Mushrooms', 'French Shallots', 'Fresh Thyme', 'Almond Milk Base'],
    badge: 'Deep Restorative'
  },
  {
    id: 'soup-3',
    name: 'Clear Chicken Bone Broth with Greens',
    category: 'soups',
    isVeg: false,
    basePrice: 190,
    kcal: 220,
    protein: 28,
    carbs: 6,
    fat: 4,
    fiber: 3,
    chefNote: 'Simmered for 18 hours with ginger root, turmeric, free-range chicken bones, shredded chicken breast, bok choy and scallions.',
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=800&q=80',
    ingredients: ['18-Hr Bone Broth', 'Shredded Chicken Breast', 'Ginger', 'Turmeric', 'Baby Bok Choy'],
    badge: 'Gut & Joint Health'
  },

  // --- SMOOTHIES ---
  {
    id: 'smoothie-1',
    name: 'Spirulina Green Hulk Power Shake',
    category: 'smoothies',
    isVeg: true,
    basePrice: 170,
    kcal: 290,
    protein: 24,
    carbs: 34,
    fat: 4,
    fiber: 8,
    chefNote: 'Raw Hawaiian spirulina, organic baby spinach, frozen banana, plant isolate protein and unsweetened almond milk.',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Organic Spirulina', 'Baby Spinach', 'Plant Protein Isolate', 'Banana', 'Almond Milk'],
    badge: 'Clean Energy'
  },
  {
    id: 'smoothie-2',
    name: 'Cacao Whey & Peanut Butter Beast',
    category: 'smoothies',
    isVeg: true,
    basePrice: 190,
    kcal: 380,
    protein: 36,
    carbs: 28,
    fat: 10,
    fiber: 6,
    chefNote: 'Natural cold-milled peanut butter, raw dark Ecuadorian cacao, grass-fed whey protein, dates and oat milk. Pure anabolic fuel.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Grass-Fed Whey', 'Raw Cacao', 'Natural Peanut Butter', 'Medjool Dates', 'Oat Milk'],
    allergens: ['Dairy', 'Peanuts'],
    badge: 'Strength Recovery'
  },

  // --- OATS MEALS ---
  {
    id: 'oats-1',
    name: 'Overnight Chia Berries & Rolled Oats',
    category: 'oats-meals',
    isVeg: true,
    basePrice: 170,
    kcal: 350,
    protein: 16,
    carbs: 52,
    fat: 8,
    fiber: 12,
    chefNote: 'Gluten-free rolled oats soaked overnight in Greek yogurt and almond milk, layered with blueberry compote and flax seeds.',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Rolled Oats', 'Greek Yogurt', 'Blueberry Coulis', 'Chia Seeds', 'Crushed Walnuts'],
    allergens: ['Dairy', 'Tree Nuts'],
    badge: 'Sustained Morning Release'
  },
  {
    id: 'oats-2',
    name: 'Golden Turmeric & Almond Warm Oats Porridge',
    category: 'oats-meals',
    isVeg: true,
    basePrice: 165,
    kcal: 320,
    protein: 14,
    carbs: 48,
    fat: 7,
    fiber: 9,
    chefNote: 'Steel-cut oats gently cooked with immunity turmeric root, Ceylon cinnamon, sliced Californian almonds and pure maple drop.',
    image: 'https://images.unsplash.com/photo-1584776296944-ab6fb57b0bdd?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Steel-Cut Oats', 'Lakadong Turmeric', 'Ceylon Cinnamon', 'Toasted Almonds', 'Pure Maple'],
    allergens: ['Tree Nuts'],
    badge: 'Anti-Inflammatory'
  }
];

export const PLAN_CONFIGS: PlanConfig[] = [
  {
    id: 'weekly',
    title: 'Weekly Starter Trial',
    discountPct: 5,
    tagline: 'Ideal for first-timers & trial runs',
    recommendedFor: 'Trying the taste & kitchen punctuality',
    durationDays: 6,
    allowsDayPush: false,
    allowsCustomMacros: false,
    hasGiftPerks: false,
    baseMealRateKey: 'singleMealRate',
    perks: [
      'Fixed duration (no mid-plan freeze)',
      'Free delivery time slot modifications',
      'Daily 5 AM freshly chopped guarantee',
      'Sugarcane eco-packaging included'
    ]
  },
  {
    id: 'bi-weekly',
    title: 'Bi-Weekly Habit Builder',
    discountPct: 10,
    tagline: 'Ideal for regular gym-goers',
    recommendedFor: 'Consistency & fitness habit formation',
    durationDays: 12,
    allowsDayPush: true,
    allowsCustomMacros: false,
    hasGiftPerks: false,
    baseMealRateKey: 'biWeeklyRate',
    perks: [
      'Full Day Push calendar flexibility (before 5 PM)',
      'Pause deliveries when traveling or resting',
      'Save 10% on every single meal',
      'Priority morning delivery slots'
    ]
  },
  {
    id: 'monthly',
    title: 'Monthly Athlete Pro',
    discountPct: 15,
    tagline: 'Ideal for bodybuilders & fitness pros',
    recommendedFor: 'Targeted macro goals & daily nutrition',
    durationDays: 24,
    allowsDayPush: true,
    allowsCustomMacros: true,
    hasGiftPerks: false,
    baseMealRateKey: 'monthlyRate',
    perks: [
      '"Make My Salad" custom macro creation',
      'Unlimited Day Push schedule extensions',
      'Free Plan Upgrades (apply balance to Quarterly)',
      '+5% Additional Renewal Discount next cycle'
    ]
  },
  {
    id: 'quarterly',
    title: 'Quarterly Transformation Elite',
    discountPct: 20,
    tagline: 'Highest discount & maximum savings',
    recommendedFor: 'Long-term health & athletic physique',
    durationDays: 72,
    allowsDayPush: true,
    allowsCustomMacros: true,
    hasGiftPerks: true,
    baseMealRateKey: 'quarterlyRate',
    perks: [
      'Lowest guaranteed meal rate (20% Off)',
      'Surprise Gift Perks (Protein bars, shaker bottles, juices)',
      'Dedicated personal culinary concierge',
      'Unlimited 5 PM Day Push calendar management'
    ]
  }
];

export const SESSION_SLOTS: SessionSlotInfo[] = [
  {
    id: 'M-S-1',
    name: 'Morning Session 1',
    timeWindow: '7:00 AM – 8:30 AM',
    description: 'Perfect for morning gym-goers, early workouts, and pre-office fueling.'
  },
  {
    id: 'M-S-2',
    name: 'Morning Session 2',
    timeWindow: '8:30 AM – 10:00 AM',
    description: 'Delivered directly to your workplace, office desk, or PG breakfast hour.'
  },
  {
    id: 'E-S-1',
    name: 'Evening Session 1',
    timeWindow: '5:00 PM – 6:30 PM',
    description: 'Post-work evening gym sessions or early clean dinner.'
  },
  {
    id: 'E-S-2',
    name: 'Evening Session 2',
    timeWindow: '6:30 PM – 8:00 PM',
    description: 'Late workout recovery, hostel dining, and guilt-free evening meals.'
  }
];

export const INITIAL_CUSTOMERS: CustomerProfile[] = [
  {
    fullName: 'Rahul Sharma',
    mobile: '9845012345',
    secondaryMobile: '9845099999',
    email: 'rahul.fitness@gmail.com',
    deliveryType: 'Gym / Fitness Center',
    flatDoorNo: 'Locker #42',
    buildingOrGym: 'Cult.fit Indiranagar Hub',
    street: '100ft Road, 4th Block',
    landmark: 'Opposite Toit Brewpub',
    pinCode: '560038',
    googleMapUrl: 'https://maps.google.com/?q=12.9716,77.6412',
    dietaryPreferences: 'High protein focus; prefers dressings strictly on the side.'
  },
  {
    fullName: 'Pooja Venkatesh',
    mobile: '9123456789',
    secondaryMobile: '9988776655',
    email: 'pooja.v@techcorp.in',
    deliveryType: 'Workplace / Office',
    flatDoorNo: 'Tower 4, 3rd Floor, Desk 312',
    buildingOrGym: 'Prestige Tech Cloud Park',
    street: 'Outer Ring Road, Kadubeesanahalli',
    landmark: 'Near JP Morgan Campus',
    pinCode: '560103',
    googleMapUrl: 'https://maps.google.com/?q=12.9352,77.6946',
    dietaryPreferences: 'Strictly Vegetarian, no onions or garlic on Tuesdays.'
  }
];

export const INITIAL_SUBSCRIPTIONS: ActiveSubscription[] = [
  {
    subscriptionId: 'LBS-SUB-8401',
    customerPhone: '9845012345',
    customerName: 'Rahul Sharma',
    planType: 'monthly',
    pattern: 'weekdays',
    sessionSlot: 'M-S-1',
    buddyAddOn: true,
    startDate: '2026-10-02',
    endDate: '2026-11-04',
    mealsTotal: 24,
    mealsRemaining: 18,
    renewalDiscountEligible: true,
    pushedDates: ['2026-10-08', '2026-10-09'],
    selectedMealName: 'Herb-Grilled Chicken Macro Bowl',
    status: 'Active'
  },
  {
    subscriptionId: 'LBS-SUB-7299',
    customerPhone: '9123456789',
    customerName: 'Pooja Venkatesh',
    planType: 'bi-weekly',
    pattern: 'mwf',
    sessionSlot: 'M-S-2',
    buddyAddOn: false,
    startDate: '2026-10-02',
    endDate: '2026-10-30',
    mealsTotal: 12,
    mealsRemaining: 10,
    renewalDiscountEligible: false,
    pushedDates: [],
    selectedMealName: 'Santé Garden Crunch & Feta',
    status: 'Active'
  }
];

export const INITIAL_KITCHEN_LOG: DailyKitchenLogEntry[] = [
  {
    id: 'KITCHEN-101',
    date: '2026-10-02',
    customerName: 'Rahul Sharma',
    phone: '9845012345',
    deliverySlot: 'M-S-1',
    mealItem: 'Herb-Grilled Chicken Macro Bowl (x2 Buddy)',
    dietaryNotes: 'Dressing on side, extra pumpkin seeds',
    status: 'Active',
    deliveryAddress: 'Cult.fit Indiranagar Hub, Locker #42, 100ft Road'
  },
  {
    id: 'KITCHEN-102',
    date: '2026-10-02',
    customerName: 'Pooja Venkatesh',
    phone: '9123456789',
    deliverySlot: 'M-S-2',
    mealItem: 'Santé Garden Crunch & Feta',
    dietaryNotes: 'Strict Veg, no onion/garlic',
    status: 'Active',
    deliveryAddress: 'Prestige Tech Cloud Park, Tower 4, 3rd Floor'
  },
  {
    id: 'KITCHEN-103',
    date: '2026-10-03',
    customerName: 'Vikram Menon',
    phone: '9740112233',
    deliverySlot: 'E-S-1',
    mealItem: 'Sprouted Moong & Paneer Tikka Salad',
    dietaryNotes: 'No peanuts, extra lemon',
    status: 'Active',
    deliveryAddress: 'Golds Gym Koramangala 5th Block'
  }
];

export const INITIAL_FINANCIALS: FinancialRecord[] = [
  {
    transactionId: 'TXN-LBS-99120',
    date: '2026-10-01',
    customerPhone: '9845012345',
    customerName: 'Rahul Sharma',
    planName: 'Monthly Athlete Pro (Duo Buddy)',
    paymentAmount: 5016,
    proratedRefundRequested: false,
    mealsDeliveredValue: 1254,
    refundBalanceDue: 0,
    refundStatus: 'None'
  },
  {
    transactionId: 'TXN-LBS-88402',
    date: '2026-09-28',
    customerPhone: '9123456789',
    customerName: 'Pooja Venkatesh',
    planName: 'Bi-Weekly Habit Builder',
    paymentAmount: 1560,
    proratedRefundRequested: false,
    mealsDeliveredValue: 312,
    refundBalanceDue: 0,
    refundStatus: 'None'
  }
];
