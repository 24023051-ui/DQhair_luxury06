export type Category = string;

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: Category;
  length: number;
  weight: number;
  material: string;
  isFeatured: boolean;
  isNew: boolean;
  badge?: 'HOT' | 'NEW' | 'LIMITED';
  price?: number; // Optional, prompt said no cart/checkout, but maybe we show price? We'll omit or put a dummy if needed, but it says "catalogue", typically contact for price. We'll leave it out to force contact.
  images: string[];
  colors: { name: string; hex: string }[];
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Vietnamese Bone Straight Hair Dual Drawn',
    slug: 'vietnamese-bone-straight-dual-drawn',
    description: 'Our highest quality bone straight hair. Silky smooth, zero shedding, and true to length. Perfect for a sleek, modern look.',
    category: 'Straight',
    length: 60,
    weight: 100,
    material: '100% Vietnamese Raw Human Hair',
    isFeatured: true,
    isNew: true,
    badge: 'NEW',
    images: [
      'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6ece?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596755490425-412f1cfc2f70?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [{ name: 'Natural Black', hex: '#1A1A1A' }, { name: 'Dark Brown', hex: '#3B2F2F' }],
  },
  {
    id: '2',
    name: 'Luxury Bouncy Curl Extensions',
    slug: 'luxury-bouncy-curl-extensions',
    description: 'Voluminous bouncy curls that hold their shape. Made from premium donor hair. Can be bleached and dyed.',
    category: 'Curly',
    length: 45,
    weight: 100,
    material: '100% Vietnamese Raw Human Hair',
    isFeatured: true,
    isNew: false,
    badge: 'HOT',
    images: [
      'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop',
    ],
    colors: [{ name: 'Natural Black', hex: '#1A1A1A' }, { name: 'Honey Blonde', hex: '#D6A66E' }],
  },
  {
    id: '3',
    name: 'Premium HD Lace Frontal Wig',
    slug: 'premium-hd-lace-frontal-wig',
    description: 'Invisible HD lace frontal wig. Pre-plucked hairline for the most natural melt. High density for a full look.',
    category: 'Wigs',
    length: 50,
    weight: 250,
    material: '100% Vietnamese Raw Human Hair + HD Lace',
    isFeatured: true,
    isNew: false,
    badge: 'LIMITED',
    images: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop',
    ],
    colors: [{ name: 'Natural Black', hex: '#1A1A1A' }],
  },
  {
    id: '4',
    name: 'Raw Wavy Tape-In Extensions',
    slug: 'raw-wavy-tape-in-extensions',
    description: 'Seamless tape-in extensions. Easy to install and remove. Reusable with replacement tape. Gorgeous natural wave.',
    category: 'Extensions',
    length: 55,
    weight: 50,
    material: '100% Vietnamese Raw Human Hair',
    isFeatured: false,
    isNew: true,
    badge: 'NEW',
    images: [
      'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=600&auto=format&fit=crop',
    ],
    colors: [{ name: 'Chestnut', hex: '#5C3826' }, { name: 'Ash Blonde', hex: '#C1B6AD' }],
  },
  {
    id: '5',
    name: 'Classic Updo Ponytail Clip-in',
    slug: 'classic-updo-ponytail-clip-in',
    description: 'Instant volume and length for your ponytail. Easy wrap-around design with a secure clip.',
    category: 'Updo',
    length: 40,
    weight: 120,
    material: '100% Vietnamese Raw Human Hair',
    isFeatured: false,
    isNew: false,
    images: [
      'https://images.unsplash.com/photo-1620331393668-cb0a72c72b22?q=80&w=600&auto=format&fit=crop',
    ],
    colors: [{ name: 'Natural Black', hex: '#1A1A1A' }, { name: 'Dark Brown', hex: '#3B2F2F' }],
  },
  {
    id: '6',
    name: 'Platinum Blonde Straight Bundles',
    slug: 'platinum-blonde-straight-bundles',
    description: 'Pre-lightened to pure platinum blonde. High-quality processing ensures hair remains soft and strong.',
    category: 'Straight',
    length: 70,
    weight: 100,
    material: '100% Vietnamese Human Hair',
    isFeatured: true,
    isNew: false,
    images: [
      'https://images.unsplash.com/photo-1595475884562-073c18844f9c?q=80&w=600&auto=format&fit=crop',
    ],
    colors: [{ name: 'Platinum', hex: '#E5E4E2' }],
  }
];
