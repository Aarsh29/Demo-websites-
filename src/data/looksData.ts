import { PRODUCTS, COMPLEMENTARY_PRODUCTS } from './productsData';
import { StyleEnsemble } from '../types';

export const STYLE_OCCASIONS = [
  'BUSINESS',
  'DATE NIGHT',
  'WEDDING',
  'CASUAL',
  'PARTY',
  'TRAVEL',
  'FORMAL'
] as const;

export const STYLE_PERSONAS = [
  'MINIMAL',
  'CLASSIC',
  'MODERN',
  'STREET',
  'QUIET LUXURY'
] as const;

export const CURATED_ENSEMBLES: Record<string, StyleEnsemble> = {
  'BUSINESS_MINIMAL': {
    id: 'ens-bus-min',
    name: 'The Monolithic Executive',
    occasion: 'BUSINESS',
    stylePersona: 'MINIMAL',
    description: 'An immaculate architectural silhouette engineered for high-stakes leadership. Sharp pagoda shoulders paired with fluid fresco trousers eliminate distraction while projecting supreme composure.',
    colorPalette: ['#141414', '#F7F6F2', '#232528', '#1C1D20'],
    stylingRationale: 'Monochromatic black and paper-white contrast creates maximum visual authority with zero ostentation. The matte titanium chronograph delivers quiet technical refinement.',
    harmonyScore: 98,
    items: {
      blazer: PRODUCTS[1], // Architect Blazer
      shirt: PRODUCTS[0],  // Signature Shirt
      trouser: PRODUCTS[3], // Essential Trouser
      shoe: COMPLEMENTARY_PRODUCTS[1], // Chelsea Boot
      accessory: PRODUCTS[4] // Noir Chronograph
    },
    totalPrice: 1850 + 490 + 580 + 820 + 3400
  },
  'DATE NIGHT_QUIET LUXURY': {
    id: 'ens-date-lux',
    name: 'The Midnight Flâneur',
    occasion: 'DATE NIGHT',
    stylePersona: 'QUIET LUXURY',
    description: 'Intimate tactile materials designed for ambient evening light. 18-gauge ultrafine merino silk knit under a double-faced cashmere overcoat evokes effortless masculine romance.',
    colorPalette: ['#0E0E10', '#1C1C1E', '#111111', '#0B0B0B'],
    stylingRationale: 'Eliminating the collared shirt in favor of a gossamer merino silk polo introduces approachable sensuality while maintaining bespoke tailoring standards.',
    harmonyScore: 96,
    items: {
      blazer: PRODUCTS[5], // Formal Overcoat
      shirt: COMPLEMENTARY_PRODUCTS[0], // Merino Silk Polo
      trouser: PRODUCTS[3], // Essential Trouser
      shoe: PRODUCTS[2], // Monolith Sneaker
      accessory: PRODUCTS[4] // Noir Chronograph
    },
    totalPrice: 2600 + 420 + 580 + 680 + 3400
  },
  'CASUAL_STREET': {
    id: 'ens-cas-str',
    name: 'The Brutalist Atelier',
    occasion: 'CASUAL',
    stylePersona: 'STREET',
    description: 'A contemporary synthesis of Italian tailoring and architectural streetwear. Sculpted Monolith sneakers meet relaxed inverted-pleat fresco trousers and Japanese acetate frames.',
    colorPalette: ['#0B0B0B', '#F7F6F2', '#232528', '#111111'],
    stylingRationale: 'Elevated proportions with relaxed drape. The structured fly-front shirt worn unbuttoned over high-twist wool trousers strikes the ideal balance between discipline and freedom.',
    harmonyScore: 95,
    items: {
      blazer: PRODUCTS[1], // Architect Blazer
      shirt: PRODUCTS[0], // Signature Shirt
      trouser: PRODUCTS[3], // Essential Trouser
      shoe: PRODUCTS[2], // Monolith Sneaker
      accessory: COMPLEMENTARY_PRODUCTS[2] // Sculpted Sunglasses
    },
    totalPrice: 1850 + 490 + 580 + 680 + 380
  },
  'FORMAL_CLASSIC': {
    id: 'ens-form-cls',
    name: 'The Sovereign Gala',
    occasion: 'FORMAL',
    stylePersona: 'CLASSIC',
    description: 'The definitive formal statement. Super 160s worsted wool blazer with silk grosgrain details, French boxcalf Chelsea boots, and the numbered Atelier Calibre AT-01 chronograph.',
    colorPalette: ['#141414', '#F7F6F2', '#111111', '#1C1D20'],
    stylingRationale: 'Purity of form and immaculate proportion. No superfluous adornments — the luxury speaks through 1,200 hand-padded lapel micro-stitches and pristine cloth.',
    harmonyScore: 99,
    items: {
      blazer: PRODUCTS[1], // Architect Blazer
      shirt: PRODUCTS[0], // Signature Shirt
      trouser: PRODUCTS[3], // Essential Trouser
      shoe: COMPLEMENTARY_PRODUCTS[1], // Chelsea Boot
      accessory: PRODUCTS[4] // Noir Chronograph
    },
    totalPrice: 1850 + 490 + 580 + 820 + 3400
  }
};
