import { useStore } from '@/store/useStore';
import { MOCK_PRODUCTS, Category } from '@/data/mockProducts';
import { ProductCard } from '@/components/ui/ProductCard';
import { useState, useMemo, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function Products() {
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } = useStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const categories: Category[] = ['All', 'Straight', 'Curly', 'Updo', 'Wigs', 'Extensions', 'Straight Hair', 'Wavy Hair', 'Curly Hair', 'Colored Hair'];

  useEffect(() => {
    // Fetch products from Firebase
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, 'products'));
        const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDbProducts(items);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const filteredProducts = useMemo(() => {
    const allProducts = [...dbProducts, ...MOCK_PRODUCTS];
    return allProducts.filter((product) => {
      const matchCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery, dbProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page changes gracefully
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 xl:px-16">
        
        {/* Header */}
        <div className="text-center mb-16 pt-10">
          <span className="text-[#C9A84C] text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">The Collection</span>
          <h1 className="font-display text-5xl md:text-7xl italic text-white mb-4">
            Premium <span className="not-italic font-sans font-black">Catalog.</span>
          </h1>
          <p className="text-[#A0A0A0] text-sm md:text-base font-light">Discover our exquisite collection of Vietnamese raw hair.</p>
        </div>

        {/* Filters Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
          
          {/* Categories (Desktop) */}
          <div className="hidden md:flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-colors border ${
                  activeCategory === cat 
                    ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/5' 
                    : 'border-white/5 text-[#A0A0A0] hover:border-[#C9A84C]/50 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Mobile Filter Toggle */}
          <div className="flex w-full md:w-auto gap-3">
             <div className="relative flex-grow md:w-80">
                <input 
                  type="text" 
                  placeholder="SEARCH PRODUCTS..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#111] border border-white/5 text-white text-[10px] tracking-[0.2em] uppercase px-4 py-4 pl-12 rounded-sm focus:outline-none focus:border-[#C9A84C]/50 transition-colors placeholder:text-white/20"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
             </div>
             <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="md:hidden flex items-center justify-center px-5 flex-shrink-0 bg-[#111] hover:bg-[#222] border border-white/5 hover:border-[#C9A84C]/50 transition-colors rounded-sm text-white"
             >
                <SlidersHorizontal className="w-5 h-5 opacity-80" />
             </button>
          </div>
        </div>

        {/* Mobile Categories Dropdown */}
        {isFilterOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="md:hidden pb-6 mb-6 border-b border-white/5"
          >
             <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setIsFilterOpen(false); }}
                  className={`px-5 py-3 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-colors border ${
                    activeCategory === cat 
                      ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10' 
                      : 'border-white/5 text-[#A0A0A0] bg-[#111]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Grid */}
        {filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 min-h-[500px]">
              {paginatedProducts.map((product, index) => (
                 <ProductCard key={product.id} product={product} index={index % 4} />
              ))}
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-3 border border-white/10 rounded-sm text-white hover:text-[#C9A84C] hover:border-[#C9A84C]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2 px-4">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 flex items-center justify-center text-[11px] font-bold tracking-widest rounded-sm transition-all border ${
                        currentPage === page
                          ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10'
                          : 'border-transparent text-[#A0A0A0] hover:text-white hover:border-white/10'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-3 border border-white/10 rounded-sm text-white hover:text-[#C9A84C] hover:border-[#C9A84C]/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  aria-label="Next page"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-xl bg-[#111] max-w-2xl mx-auto">
            <h3 className="text-3xl text-white font-display mb-3 italic">No products found</h3>
            <p className="text-[#A0A0A0] text-sm font-light">Try adjusting your search or category filter.</p>
            <button 
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-8 text-[11px] font-bold tracking-[0.2em] uppercase text-[#C9A84C] border-b border-[#C9A84C] pb-1 hover:text-[#F0D080] hover:border-[#F0D080] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
