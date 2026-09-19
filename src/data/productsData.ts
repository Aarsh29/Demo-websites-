import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod-01',
    number: '01',
    name: 'THE SIGNATURE SHIRT',
    subtitle: 'Egyptian Giza 87 Poplin • Structured Fly-Front',
    price: 490,
    currency: 'USD',
    category: 'Tailoring',
    description: 'A masterwork of quiet precision. Woven in Biella from 100% long-staple Egyptian Giza 87 cotton with a 140/2 thread count, providing a crisp architectural drape that resists creases while yielding like raw silk against the skin.',
    details: [
      'Concealed mother-of-pearl fly front placket',
      'Architectural cutaway collar with removable titanium stays',
      'Split back yoke with subtle knife pleats for fluid shoulder articulation',
      'Double-fused barrel cuffs with twin horn button adjustments',
      'Finished with 22 stitches per inch artisanal hand-turned seams'
    ],
    materials: {
      origin: 'Biella, Italy & Nile Delta, Egypt',
      composition: '100% Ultra-Long Staple Giza 87 Cotton',
      texture: 'Cool, micro-lustrous crisp poplin with natural memory',
      care: 'Specialist dry clean or hand wash cold with pH-neutral detergent'
    },
    craftNotes: 'Engineered over 14 hours across 28 individual pattern pieces. Every seam is cut on a laser-guided grainline to preserve perfect vertical geometry across wear cycles.',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620012253295-c15c429f66bf?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Paper White', hex: '#F7F6F2' },
      { name: 'Obsidian Noir', hex: '#0D0D0D' },
      { name: 'Smoked Sage', hex: '#3E423D' }
    ],
    sizes: ['44 / XS', '46 / S', '48 / M', '50 / L', '52 / XL', '54 / XXL'],
    fits: ['Slim Architectural', 'Tailored Regular', 'Relaxed Oversized'],
    inStock: true,
    stockCount: 14,
    isNew: true,
    isHero: true
  },
  {
    id: 'prod-02',
    number: '02',
    name: 'THE ARCHITECT BLAZER',
    subtitle: 'Super 160s Worsted Wool • Floating Horsehair Canvas',
    price: 1850,
    currency: 'USD',
    category: 'Tailoring',
    description: 'The defining silhouette of the house. A single-breasted jacket sculpted with clean, roped pagoda shoulders and an elongated suppressed waist. Built upon a floating full-canvas foundation crafted from Mongolian horsehair and Irish linen.',
    details: [
      'Hand-padded floating full horsehair canvas chest piece',
      'Sculpted high-gorge notch lapels with Milanese buttonhole',
      'Twin architectural jet pockets with flush welt flaps',
      'Deep unlined cupro sleeve lining with horn kissing buttons',
      'Unstructured double-vent back engineered for fluid gait'
    ],
    materials: {
      origin: 'Huddersfield, United Kingdom',
      composition: '92% Super 160s Worsted Wool, 8% Raw Silk',
      texture: 'Dry, matte architectural hand with natural mechanical rebound',
      care: 'Specialist bespoke eco-dry clean only'
    },
    craftNotes: 'Hand-sewn over 42 hours in our Civitanova Marche atelier. The lapel roll is hand-padded with over 1,200 micro-stitches to ensure an immortal sculptural curve.',
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555069519-127aadedf1ee?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Charcoal Noir', hex: '#141414' },
      { name: 'Midnight Basalt', hex: '#171A21' },
      { name: 'Raw Umber', hex: '#2A2521' }
    ],
    sizes: ['46 / 36R', '48 / 38R', '50 / 40R', '52 / 42R', '54 / 44R', '56 / 46R'],
    fits: ['Slim Architectural', 'Tailored Regular', 'Relaxed Oversized'],
    inStock: true,
    stockCount: 8,
    isHero: true
  },
  {
    id: 'prod-03',
    number: '03',
    name: 'THE MONOLITH SNEAKER',
    subtitle: 'Full-Grain Italian Calfskin • Sculpted Vibram Outsole',
    price: 680,
    currency: 'USD',
    category: 'Footwear',
    description: 'A dialogue between brutalist monolithic geometry and ergonomic luxury. Hand-lasted in Tuscany from vegetable-tanned nappa leather, anchored by a custom-cast dual-density geometric sole.',
    details: [
      'Italian full-grain calf leather treated with hydrophobic wax',
      'Bespoke architectural lugged Vibram rubber compound outsole',
      'Calfskin-lined memory foam footbed with antibacterial silver thread',
      'Blind eyelets with waxed flat cotton cordage',
      'Subtly debossed serial number and gold foil brand monogram on heel'
    ],
    materials: {
      origin: 'Santa Croce sull’Arno, Italy',
      composition: '100% Full-Grain Calf Nappa, Vibram High-Grip Rubber',
      texture: 'Ultra-supple hand with velvet nappa touch',
      care: 'Condition with organic beeswax balm and soft horsehair brush'
    },
    craftNotes: 'Each pair is lasted on a proprietary anatomical wooden last for 72 hours to guarantee permanent comfort and structural poise.',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Obsidian Matte', hex: '#0B0B0B' },
      { name: 'Bone Alabaster', hex: '#E6E1D8' },
      { name: 'Concrete Grey', hex: '#636569' }
    ],
    sizes: ['EU 40 / US 7', 'EU 41 / US 8', 'EU 42 / US 9', 'EU 43 / US 10', 'EU 44 / US 11', 'EU 45 / US 12'],
    fits: ['Tailored Regular'],
    inStock: true,
    stockCount: 18,
    isHero: true
  },
  {
    id: 'prod-04',
    number: '04',
    name: 'THE ESSENTIAL TROUSER',
    subtitle: 'High-Twist Fresco Wool • Double Inverted Pleat',
    price: 580,
    currency: 'USD',
    category: 'Trousers',
    description: 'Engineered for commanding ease. Cut from breathable, 4-ply high-twist English wool fresco that drapes with heavyweight authority yet allows effortless airflow in any climate.',
    details: [
      'Extended tab waistband with concealed stainless steel slide clasp',
      'Twin inverted front pleats for fluid leg volume',
      'Side waist adjusters with brushed ruthenium hardware',
      'Deep slash pockets lined in reinforced organic cotton twill',
      'Unfinished 37-inch hems ready for bespoke tailoring or cuffed finish'
    ],
    materials: {
      origin: 'Yorkshire, England',
      composition: '100% High-Twist Fresco Wool (340g)',
      texture: 'Dry, crisp open-weave with extraordinary wrinkle recovery',
      care: 'Steam lightly to refresh; dry clean once per season'
    },
    craftNotes: 'Featuring an interior curtain waistband constructed from silk grosgrain to anchor the shirt in place throughout movement.',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Raven Black', hex: '#111111' },
      { name: 'Deep Anthracite', hex: '#232528' },
      { name: 'Oatmeal Taupe', hex: '#B8B0A2' }
    ],
    sizes: ['44 (28W)', '46 (30W)', '48 (32W)', '50 (34W)', '52 (36W)', '54 (38W)'],
    fits: ['Slim Architectural', 'Tailored Regular', 'Relaxed Oversized'],
    inStock: true,
    stockCount: 19,
    isHero: true
  },
  {
    id: 'prod-05',
    number: '05',
    name: 'THE NOIR CHRONOGRAPH',
    subtitle: 'Grade-5 Brushed Titanium • Calibre AT-01 Automatic',
    price: 3400,
    currency: 'USD',
    category: 'Horology',
    description: 'An architectural study in reductive watchmaking. A 39mm monolithic case sculpted from aerospace-grade titanium with satin-brushed chamfers and an anti-reflective sapphire crystal revealing an understated sector dial.',
    details: [
      '39mm grade-5 titanium case, 9.8mm slim profile',
      'Proprietary Atelier Calibre AT-01 with 70-hour power reserve',
      'Sapphire crystal with triple anti-reflective interior coating',
      'Matte black dial with rhodium-plated skeleton hour hands',
      'Interchangeable textured FKM rubber and Horween Shell Cordovan straps'
    ],
    materials: {
      origin: 'Le Locle, Switzerland',
      composition: 'Grade-5 Titanium, Sapphire Crystal, Horween Cordovan',
      texture: 'Featherweight high-tensile metal with warm tactile satin finish',
      care: 'Water resistant to 100m (10 ATM); 5-year manufacture warranty'
    },
    craftNotes: 'Individual numbered edition of 250 pieces worldwide. Regulated to -2/+4 seconds per day across five spatial positions.',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Brushed Titanium Noir', hex: '#1C1D20' },
      { name: 'Raw Silver Titanium', hex: '#9FA2A8' }
    ],
    sizes: ['39mm Universal'],
    fits: ['Tailored Regular'],
    inStock: true,
    stockCount: 5,
    isHero: true
  },
  {
    id: 'prod-06',
    number: '06',
    name: 'THE FORMAL OVERCOAT',
    subtitle: 'Double-Faced Cashmere & Camel Hair • Kimono Shoulder',
    price: 2600,
    currency: 'USD',
    category: 'Outerwear',
    description: 'The pinnacle of cold-weather elegance. Cut from double-faced baby camel hair and cashmere woven by Joshua Ellis, featuring an unlined interior that drapes with the ease of a ceremonial robe.',
    details: [
      'Hand-split and hand-turned edges requiring 30 hours of seam work',
      'Seamless kimono sleeve construction for unobstructed shoulder movement',
      'Deep interior patch pockets sized for passport and sketchbook',
      'Concealed double-breasted horn closure with storm tab collar',
      'Generous calf-length sweep with dramatic 22-inch walking vent'
    ],
    materials: {
      origin: 'Yorkshire, UK & Ulaanbaatar, Mongolia',
      composition: '70% Double-Faced Baby Camel Hair, 30% Cashmere',
      texture: 'Sublime cloud-soft fleece with exquisite ripples of light',
      care: 'Store on bespoke broad-shoulder cedar hanger; steam gently'
    },
    craftNotes: 'The edges of this coat are meticulously hand-slit and folded inward by seasoned artisans, rendering all seam allowances invisible.',
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?q=80&w=1200&auto=format&fit=crop'
    ],
    colors: [
      { name: 'Obsidian Midnight', hex: '#0E0E10' },
      { name: 'Warm Vicuña Camel', hex: '#87603B' },
      { name: 'Cold Slate Melange', hex: '#4A4C52' }
    ],
    sizes: ['46 / 36R', '48 / 38R', '50 / 40R', '52 / 42R', '54 / 44R'],
    fits: ['Slim Architectural', 'Tailored Regular', 'Relaxed Oversized'],
    inStock: true,
    stockCount: 7,
    isHero: true
  }
];

// Additional complementary pieces for Look Builder and Style Studio
export const COMPLEMENTARY_PRODUCTS: Product[] = [
  {
    id: 'prod-07',
    number: '07',
    name: 'THE MERINO SILK POLO',
    subtitle: '18-Gauge Superfine Wool • Seamless Knit',
    price: 420,
    currency: 'USD',
    category: 'Tailoring',
    description: 'Spun from 18-gauge ultrafine Australian merino wool enriched with mulberry silk. Offers a fluid skin-feel and refined collar line.',
    details: ['Ribbed knit collar with placketless V-notch', 'Artisanal fully-fashioned shoulder seam', 'Tubular hem and cuffs'],
    materials: { origin: 'Perugia, Italy', composition: '70% Merino, 30% Silk', texture: 'Ultra-soft gossamer knit', care: 'Hand wash cold' },
    craftNotes: 'Knitted on Japanese Shima Seiki WholeGarment 3D knitting machines with zero seam waste.',
    images: ['https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop'],
    colors: [{ name: 'Deep Charcoal', hex: '#1C1C1E' }, { name: 'Ecru Chalk', hex: '#EAE6DF' }],
    sizes: ['S', 'M', 'L', 'XL'],
    fits: ['Slim Architectural', 'Tailored Regular'],
    inStock: true,
    stockCount: 22
  },
  {
    id: 'prod-08',
    number: '08',
    name: 'THE CHELSEA BOOT',
    subtitle: 'French Waxed Boxcalf • Goodyear Welted',
    price: 820,
    currency: 'USD',
    category: 'Footwear',
    description: 'A seamless wholecut Chelsea boot constructed from a single piece of French boxcalf leather over an almond chisel toe last.',
    details: ['Single-piece wholecut construction', 'Concealed tonal elastic gusset', 'Goodyear channeled leather sole'],
    materials: { origin: 'Northampton, England', composition: '100% French Boxcalf Leather', texture: 'Mirror-polished calfskin', care: 'Saphir Médaille d’Or cream polish' },
    craftNotes: 'Requires 212 manual steps and 8 weeks of Goodyear welt construction.',
    images: ['https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1200&auto=format&fit=crop'],
    colors: [{ name: 'Nero Polish', hex: '#0A0A0A' }, { name: 'Cacao Patina', hex: '#2A1A12' }],
    sizes: ['EU 41', 'EU 42', 'EU 43', 'EU 44', 'EU 45'],
    fits: ['Tailored Regular'],
    inStock: true,
    stockCount: 11
  },
  {
    id: 'prod-09',
    number: '09',
    name: 'THE SCULPTED SUNGLASSES',
    subtitle: 'Mazzucchelli Acetate • Polarized Mineral Glass',
    price: 380,
    currency: 'USD',
    category: 'Accessories',
    description: 'Brutalist geometric frames milled from 8mm Japanese block acetate with titanium core wire detailing.',
    details: ['8mm custom cured Japanese acetate', 'Barberini tempered mineral glass lenses', '7-barrel stainless steel hinges'],
    materials: { origin: 'Fukui, Japan', composition: 'Mazzucchelli Acetate & Titanium', texture: 'High-gloss sculpted finish', care: 'Microfiber cloth only' },
    craftNotes: 'Hand-tumbled in Japanese bamboo barrels for 96 hours for an organic polished gloss.',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop'],
    colors: [{ name: 'Midnight Onyx', hex: '#111111' }, { name: 'Smoked Tortoise', hex: '#3B2F23' }],
    sizes: ['Universal Frame (49-21-145)'],
    fits: ['Tailored Regular'],
    inStock: true,
    stockCount: 30
  }
];

export const ALL_PRODUCTS: Product[] = [...PRODUCTS, ...COMPLEMENTARY_PRODUCTS];
