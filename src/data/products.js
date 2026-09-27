// Local Product Data for AESTIA
export const CATEGORIES = [
  { id: 'all', name: 'All Products' },
  { id: 'home-decor', name: 'Home Decor' },
  { id: 'lighting', name: 'Lighting' },
  { id: 'plants', name: 'Plants' },
  { id: 'kitchen', name: 'Kitchen' },
  { id: 'gifts', name: 'Gifts' },
];

export const COLLECTIONS = [
  {
    id: 'warm-cozy',
    name: 'WARM & COZY',
    subtitle: 'Lamps, candles, warm-toned decor and cozy pieces.',
    description: 'Lamps, candles, warm-toned decor and cozy pieces.',
    image: '/images/collection-warm-cozy.jpg',
    productIds: ['soft-glow-table-lamp', 'minimal-wall-lamp', 'scented-candle-gift-set', 'aesthetic-gift-box', 'minimal-ceramic-vase', 'botanical-wall-art'],
  },
  {
    id: 'green-living',
    name: 'GREEN LIVING',
    subtitle: 'Plants, planters and nature-inspired decor.',
    description: 'Plants, planters and nature-inspired decor.',
    image: '/images/collection-green-living.jpg',
    productIds: ['mini-indoor-plant', 'ceramic-plant-pot', 'botanical-wall-art', 'minimal-ceramic-vase'],
  },
  {
    id: 'slow-mornings',
    name: 'SLOW MORNINGS',
    subtitle: 'Mugs, kitchen pieces and calm everyday essentials.',
    description: 'Mugs, kitchen pieces and calm everyday essentials.',
    image: '/images/collection-slow-mornings.jpg',
    productIds: ['ceramic-coffee-mug', 'minimal-serving-plate', 'soft-glow-table-lamp', 'minimal-ceramic-vase'],
  },
  {
    id: 'little-gifts',
    name: 'LITTLE GIFTS',
    subtitle: 'Gift boxes, candles and thoughtful small gifts.',
    description: 'Gift boxes, candles and thoughtful small gifts.',
    image: '/images/collection-little-gifts.jpg',
    productIds: ['aesthetic-gift-box', 'scented-candle-gift-set', 'ceramic-coffee-mug', 'mini-indoor-plant'],
  },
];

// Aesthetic SVG Placeholder Generator
const makePlaceholder = (label, bg = '#ECE7DE', fg = '#526B58') => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="none">
    <rect width="600" height="750" fill="${bg}"/>
    <circle cx="300" cy="340" r="110" fill="#E2DDD2" fill-opacity="0.7"/>
    <path d="M260 380 Q300 280 340 380" stroke="${fg}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <circle cx="300" cy="300" r="16" fill="${fg}" fill-opacity="0.3"/>
    <text x="50%" y="490" text-anchor="middle" font-family="'Cormorant Garamond', Georgia, serif" font-size="24" fill="#222222" letter-spacing="1.5">${label}</text>
    <text x="50%" y="525" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#888888" letter-spacing="2">AESTIA OBJECT</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const PRODUCTS = [
  // HOME DECOR
  {
    id: 'minimal-ceramic-vase',
    name: 'Minimal Ceramic Vase',
    category: 'home-decor',
    categoryName: 'Home Decor',
    collections: ['warm-cozy', 'green-living', 'slow-mornings'],
    price: 599,
    image: makePlaceholder('Minimal Ceramic Vase', '#EFECE6', '#526B58'),
    description: 'Handcrafted stoneware vase finished with a subtle matte chalk texture.',
  },
  {
    id: 'botanical-wall-art',
    name: 'Botanical Wall Art',
    category: 'home-decor',
    categoryName: 'Home Decor',
    collections: ['warm-cozy', 'green-living'],
    price: 799,
    image: makePlaceholder('Botanical Wall Art', '#F0EDE8', '#C8A978'),
    description: 'Minimalist botanical press print framed in natural unvarnished oak wood.',
  },

  // LIGHTING
  {
    id: 'soft-glow-table-lamp',
    name: 'Soft Glow Table Lamp',
    category: 'lighting',
    categoryName: 'Lighting',
    collections: ['warm-cozy', 'slow-mornings'],
    price: 1299,
    image: makePlaceholder('Soft Glow Table Lamp', '#EAE6DD', '#C8A978'),
    description: 'Pleated sculptural paper shade emitting soft, diffused warm ambient evening light.',
  },
  {
    id: 'minimal-wall-lamp',
    name: 'Minimal Wall Lamp',
    category: 'lighting',
    categoryName: 'Lighting',
    collections: ['warm-cozy'],
    price: 999,
    image: makePlaceholder('Minimal Wall Lamp', '#EEEAE2', '#526B58'),
    description: 'Brushed brass and frosted glass luminaire designed for subtle wall illumination.',
  },

  // PLANTS
  {
    id: 'mini-indoor-plant',
    name: 'Mini Indoor Plant',
    category: 'plants',
    categoryName: 'Plants',
    collections: ['green-living', 'little-gifts'],
    price: 399,
    image: makePlaceholder('Mini Indoor Plant', '#E6EDE5', '#526B58'),
    description: 'Hardy dwarf jade succulent nestled in organic moisture-balancing soil mix.',
  },
  {
    id: 'ceramic-plant-pot',
    name: 'Ceramic Plant Pot',
    category: 'plants',
    categoryName: 'Plants',
    collections: ['green-living'],
    price: 499,
    image: makePlaceholder('Ceramic Plant Pot', '#ECE9E1', '#C8A978'),
    description: 'Clay planter with drainage saucer, finished in a serene wabi-sabi raw glaze.',
  },

  // KITCHEN
  {
    id: 'ceramic-coffee-mug',
    name: 'Ceramic Coffee Mug',
    category: 'kitchen',
    categoryName: 'Kitchen',
    collections: ['slow-mornings', 'little-gifts'],
    price: 299,
    image: makePlaceholder('Ceramic Coffee Mug', '#EFECE6', '#526B58'),
    description: 'Tactile artisanal morning mug with an ergonomic unglazed natural rim.',
  },
  {
    id: 'minimal-serving-plate',
    name: 'Minimal Serving Plate',
    category: 'kitchen',
    categoryName: 'Kitchen',
    collections: ['slow-mornings'],
    price: 599,
    image: makePlaceholder('Minimal Serving Plate', '#EBE7DE', '#C8A978'),
    description: 'Organic oval serving dish cast from high-fire porcelain stoneware.',
  },

  // GIFTS
  {
    id: 'aesthetic-gift-box',
    name: 'Aesthetic Gift Box',
    category: 'gifts',
    categoryName: 'Gifts',
    collections: ['little-gifts', 'warm-cozy'],
    price: 899,
    image: makePlaceholder('Aesthetic Gift Box', '#F2EFE9', '#526B58'),
    description: 'Curated gift set in textured kraft presentation box with raw linen ribbon.',
  },
  {
    id: 'scented-candle-gift-set',
    name: 'Scented Candle Gift Set',
    category: 'gifts',
    categoryName: 'Gifts',
    collections: ['warm-cozy', 'little-gifts'],
    price: 699,
    image: makePlaceholder('Scented Candle Gift Set', '#EFECE5', '#C8A978'),
    description: 'Soy wax candle duo infused with cedarwood, white sage, and warm amber notes.',
  },
];
