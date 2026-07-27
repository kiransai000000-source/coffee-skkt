export interface MenuItem {
  id: string;
  name: string;
  category: 'espresso' | 'cold_brew' | 'tea_matcha' | 'bakery' | 'savory';
  price: number;
  description: string;
  image: string;
  calories?: number;
  tags: string[]; // e.g. ['House Special', 'Vegan', 'Gluten-Free', 'Decaf']
  origin?: string;
  customizable?: boolean;
}

export type SeatingAreaId = 'window_nook' | 'bar_counter' | 'garden_patio' | 'main_lounge' | 'work_booth';

export interface SeatingArea {
  id: SeatingAreaId;
  name: string;
  description: string;
  image: string;
  maxPartySize: number;
  features: string[];
  recommendedFor: string;
}

export interface BookingRequest {
  id: string;
  referenceCode: string;
  partySize: number;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g., "09:30 AM"
  seatingAreaId: SeatingAreaId;
  seatingAreaName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialNotes?: string;
  occasion?: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export interface CustomizationOptions {
  milk: 'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'Coconut Milk' | 'No Milk';
  sweetness: '0% (Unsweetened)' | '25% (Less Sweet)' | '50% (Standard)' | '100% (Extra Sweet)';
  temperature: 'Hot' | 'Iced' | 'Extra Hot';
  espressoShots: number;
  flavorSyrup?: 'Vanilla' | 'Caramel' | 'Hazelnut' | 'Lavender' | 'None';
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique cart item id
  menuItem: MenuItem;
  customization?: CustomizationOptions;
  quantity: number;
  unitPrice: number;
  itemTotal: number;
}
