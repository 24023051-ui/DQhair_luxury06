import { create } from 'zustand';
import { Category, Product } from '@/data/mockProducts';

interface StoreState {
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  activeCategory: 'All',
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  wishlist: [],
  toggleWishlist: (productId) => set((state) => ({
    wishlist: state.wishlist.includes(productId) 
      ? state.wishlist.filter(id => id !== productId)
      : [...state.wishlist, productId]
  })),
}));
