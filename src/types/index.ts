export interface Product {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  price: number;
  currency: string;
  category: 'Outerwear' | 'Tailoring' | 'Footwear' | 'Trousers' | 'Horology' | 'Accessories';
  description: string;
  details: string[];
  materials: {
    origin: string;
    composition: string;
    texture: string;
    care: string;
  };
  craftNotes: string;
  images: string[];
  colors: {
    name: string;
    hex: string;
    imageIndex?: number;
  }[];
  sizes: string[];
  fits: ('Slim Architectural' | 'Tailored Regular' | 'Relaxed Oversized')[];
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isHero?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  selectedFit: string;
  quantity: number;
}

export interface Store {
  id: string;
  city: string;
  country: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  email: string;
  coordinates: [number, number]; // [lat, lng]
  valetParking: boolean;
  privateStyling: boolean;
  status: 'Open Today' | 'Closed' | 'Appointment Only';
  image: string;
}

export interface StyleEnsemble {
  id: string;
  name: string;
  occasion: string;
  stylePersona: string;
  description: string;
  colorPalette: string[];
  stylingRationale: string;
  harmonyScore: number;
  items: {
    blazer: Product;
    shirt: Product;
    trouser: Product;
    shoe: Product;
    accessory: Product;
  };
  totalPrice: number;
}

export interface VIPMemberTier {
  name: 'PRIVATE' | 'BLACK' | 'SIGNATURE';
  threshold: number;
  tagline: string;
  privileges: string[];
  accentColor: string;
}
