export type MenuCategory =
  | 'All'
  | 'Custom Cakes'
  | 'Brownies & Cupcakes'
  | 'Celebration Hampers';

export type WeightOption = '0.5 kg' | '1 kg' | '2 kg';

export interface MenuItem {
  id: string;
  name: string;
  shortName: string;
  category: Exclude<MenuCategory, 'All'>;
  basePrice: number; // Price for 0.5 kg
  description: string;
  defaultFlavour: string;
  servingNote: Record<WeightOption, string>;
  image: string;
  imageAlt: string;
}

export const WHATSAPP_NUMBER = '919421628379';
export const WHATSAPP_DISPLAY = '+91 94216 28379';
export const INSTAGRAM_HANDLE = '@bakershouse_nasik';
export const INSTAGRAM_URL = 'https://instagram.com/bakershouse_nasik';

export const BRAND_LOGO = '/assets/aistudio/image_d0db154e.png';
export const HERO_IMAGE = '/src/assets/images/hero_bakery_cakes_1795412252631.jpg';

export const CATEGORIES: MenuCategory[] = [
  'All',
  'Custom Cakes',
  'Brownies & Cupcakes',
  'Celebration Hampers',
];

export const WEIGHT_OPTIONS: { value: WeightOption; multiplier: number }[] = [
  { value: '0.5 kg', multiplier: 1 },
  { value: '1 kg', multiplier: 2 },
  { value: '2 kg', multiplier: 4 },
];

export const FLAVOUR_CHOICES: string[] = [
  'Belgian Dark Chocolate Truffle',
  'Dutch Chocolate & Hazelnut Praline',
  'Lotus Biscoff Caramel',
  'Vanilla Bean & Mixed Berry',
  'Red Velvet Cream Cheese',
  'Classic Walnut Fudge',
  'Roasted Almond Butterscotch',
  'Rose Pistachio Tres Leches',
  'Assorted Signature Flavours',
];

export const NASHIK_AREAS: string[] = [
  'Gangapur Road',
  'College Road',
  'Indira Nagar',
  'Mahatma Nagar',
  'Panchavati',
  'Nashik Road',
  'Pathardi Phata',
  'Govind Nagar',
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'belgian-chocolate-truffle',
    name: 'Rich Belgian Chocolate Truffle Cake (100% Eggless)',
    shortName: 'Rich Belgian Chocolate Truffle Cake',
    category: 'Custom Cakes',
    basePrice: 499,
    description:
      'Velvety dark Belgian ganache layered over moist cocoa sponge with silky chocolate rosettes.',
    defaultFlavour: 'Belgian Dark Chocolate Truffle',
    servingNote: {
      '0.5 kg': 'Serves 5–6',
      '1 kg': 'Serves 10–12',
      '2 kg': 'Serves 20–24',
    },
    image: '/src/assets/images/cake_belgian_truffle_1795412251580.jpg',
    imageAlt: 'Rich Belgian Chocolate Truffle Cake with glossy ganache drip and dark chocolate curls',
  },
  {
    id: 'custom-floral-birthday',
    name: 'Custom Floral & Theme Birthday Cake (100% Eggless)',
    shortName: 'Custom Floral & Theme Birthday Cake',
    category: 'Custom Cakes',
    basePrice: 799,
    description:
      'Hand-piped botanical buttercream flowers, custom colour palettes, and delicate gold leaf accents.',
    defaultFlavour: 'Vanilla Bean & Mixed Berry',
    servingNote: {
      '0.5 kg': 'Serves 5–6',
      '1 kg': 'Serves 10–12',
      '2 kg': 'Serves 20–24 (2-Tier)',
    },
    image: '/src/assets/images/cake_floral_birthday_1795412251930.jpg',
    imageAlt: 'Custom floral buttercream birthday cake with terracotta-rose piped flowers and gold leaf',
  },
  {
    id: 'lotus-biscoff-cheesecake',
    name: 'Lotus Biscoff Cheesecake (100% Eggless)',
    shortName: 'Lotus Biscoff Cheesecake',
    category: 'Custom Cakes',
    basePrice: 699,
    description:
      'Silky eggless cream cheese set on a spiced speculoos crust, crowned with warm Biscoff spread.',
    defaultFlavour: 'Lotus Biscoff Caramel',
    servingNote: {
      '0.5 kg': 'Serves 5–6',
      '1 kg': 'Serves 10–12',
      '2 kg': 'Serves 20–24',
    },
    image: '/src/assets/images/cake_biscoff_cheesecake_1795412254634.jpg',
    imageAlt: 'Eggless Lotus Biscoff Cheesecake topped with caramelized biscuit spread drip and whole cookies',
  },
  {
    id: 'fudge-walnut-brownies',
    name: 'Fudge Walnut Brownie Box (6 pcs)',
    shortName: 'Fudge Walnut Brownie Box',
    category: 'Brownies & Cupcakes',
    basePrice: 349,
    description:
      'Gooey dark couverture chocolate brownies with crackly tops and toasted Kashmiri walnuts.',
    defaultFlavour: 'Classic Walnut Fudge',
    servingNote: {
      '0.5 kg': '6 pcs box',
      '1 kg': '12 pcs box',
      '2 kg': '24 pcs party box',
    },
    image: '/src/assets/images/box_walnut_brownies_1795412254525.jpg',
    imageAlt: 'Artisanal cream box of six dark chocolate fudge walnut brownies with crackly tops',
  },
  {
    id: 'assorted-frosted-cupcakes',
    name: 'Assorted Frosted Cupcakes (Box of 6)',
    shortName: 'Assorted Frosted Cupcakes',
    category: 'Brownies & Cupcakes',
    basePrice: 399,
    description:
      'Soft vanilla bean, Belgian cocoa, and berry cupcakes hand-swirled with signature buttercream.',
    defaultFlavour: 'Assorted Signature Flavours',
    servingNote: {
      '0.5 kg': 'Box of 6',
      '1 kg': 'Box of 12',
      '2 kg': 'Box of 24',
    },
    image: '/src/assets/images/box_frosted_cupcakes_1795412252366.jpg',
    imageAlt: 'Open bakery box of six assorted frosted gourmet eggless cupcakes',
  },
  {
    id: 'festive-eggless-hamper',
    name: 'Festive Eggless Dessert Hamper',
    shortName: 'Festive Eggless Dessert Hamper',
    category: 'Celebration Hampers',
    basePrice: 899,
    description:
      'Ribbon-tied gift box curated with fudge brownies, frosted cupcakes, dipped cookies, and spread.',
    defaultFlavour: 'Assorted Signature Flavours',
    servingNote: {
      '0.5 kg': 'Classic Gift Box',
      '1 kg': 'Grand Celebration Box',
      '2 kg': 'Family Luxury Hamper',
    },
    image: '/src/assets/images/hamper_festive_desserts_1795412344286.jpg',
    imageAlt: 'Festive eggless dessert hamper gift box tied with terracotta ribbon containing brownies, cupcakes, and cookies',
  },
];

export function calculatePrice(basePrice: number, weight: WeightOption): number {
  const match = WEIGHT_OPTIONS.find((w) => w.value === weight);
  return basePrice * (match ? match.multiplier : 1);
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Returns a YYYY-MM-DD date string strictly `daysAhead` days from today
 * in the user's local timezone (default: 2 days ahead to block today & tomorrow).
 */
export function getMinOrderDate(daysAhead = 2): string {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + daysAhead);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatReadableDate(isoDate: string): string {
  if (!isoDate) return 'Not selected';
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return isoDate;
  const dateObj = new Date(y, m - 1, d);
  return dateObj.toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function isDateAtLeastMin(selectedDate: string, minDate: string): boolean {
  if (!selectedDate) return false;
  return selectedDate >= minDate;
}
