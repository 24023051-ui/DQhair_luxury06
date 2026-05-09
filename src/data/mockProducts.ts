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

export const MOCK_PRODUCTS: Product[] = [];
