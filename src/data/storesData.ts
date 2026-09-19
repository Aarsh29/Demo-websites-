import { Store } from '../types';

export const STORES: Store[] = [
  {
    id: 'store-paris',
    city: 'Paris',
    country: 'France',
    name: 'Atelier Arsath Saint-Honoré',
    address: '242 Rue Saint-Honoré, 75001 Paris, France',
    hours: 'Mon – Sat: 10:00 – 19:30 • Sun: By Appointment',
    phone: '+33 1 42 68 00 12',
    email: 'paris@atelierarsath.com',
    coordinates: [48.8662, 2.3276],
    valetParking: true,
    privateStyling: true,
    status: 'Open Today',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'store-milan',
    city: 'Milan',
    country: 'Italy',
    name: 'Atelier Arsath Montenapoleone',
    address: 'Via Montenapoleone 8, 20121 Milano, Italy',
    hours: 'Mon – Sat: 10:30 – 19:30 • Sun: 11:00 – 19:00',
    phone: '+39 02 7600 4820',
    email: 'milano@atelierarsath.com',
    coordinates: [45.4688, 9.1956],
    valetParking: true,
    privateStyling: true,
    status: 'Open Today',
    image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'store-ny',
    city: 'New York',
    country: 'United States',
    name: 'Atelier Arsath Madison Flagship',
    address: '680 Madison Avenue, New York, NY 10065, USA',
    hours: 'Mon – Sat: 10:00 – 19:00 • Sun: 12:00 – 18:00',
    phone: '+1 212 849 5500',
    email: 'newyork@atelierarsath.com',
    coordinates: [40.7648, -73.9702],
    valetParking: true,
    privateStyling: true,
    status: 'Open Today',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'store-tokyo',
    city: 'Tokyo',
    country: 'Japan',
    name: 'Atelier Arsath Ginza Tower',
    address: '5-7-1 Ginza, Chuo-ku, Tokyo 104-0061, Japan',
    hours: 'Everyday: 11:00 – 20:00',
    phone: '+81 3 5537 9900',
    email: 'tokyo@atelierarsath.com',
    coordinates: [35.6719, 139.7656],
    valetParking: false,
    privateStyling: true,
    status: 'Open Today',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'store-london',
    city: 'London',
    country: 'United Kingdom',
    name: 'Atelier Arsath Mayfair',
    address: '14 Mount Street, Mayfair, London W1K 2RF, UK',
    hours: 'Mon – Sat: 10:00 – 18:30 • Sun: Closed',
    phone: '+44 20 7493 8811',
    email: 'london@atelierarsath.com',
    coordinates: [51.5097, -0.1504],
    valetParking: true,
    privateStyling: true,
    status: 'Open Today',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop'
  }
];
