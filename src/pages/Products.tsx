import { useStore } from "@/store/useStore";
import { MOCK_PRODUCTS, Category } from "@/data/mockProducts";
import { ProductCard } from "@/components/ui/ProductCard";
import { useState, useMemo, useEffect } from "react";
import { motion } from "motion/react";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function Products() {
  const { activeCategory, setActiveCategory, searchQuery, setSearchQuery } =
    useStore();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const allProductsList = useMemo(() => [...dbProducts, ...MOCK_PRODUCTS], [dbProducts]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(allProductsList.map(p => p.category))).filter(Boolean);
    return ["All", ...uniqueCategories];
  }, [allProductsList]);

  useEffect(() => {
    // Fetch products from Firebase
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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
    return allProductsList.filter((product) => {
      const matchCategory =
        activeCategory === "All" || product.category === activeCategory;
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery, allProductsList]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Handle page changes gracefully
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  let startPage = Math.max(1, currentPage - Math.floor(5 / 2));
  let endPage = Math.min(totalPages, startPage + 5 - 1);

  if (endPage - startPage + 1 < 5) {
    startPage = Math.max(1, endPage - 5 + 1);
  }

  const getPageNumbers = () => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const visiblePages = getPageNumbers();

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pt-24 lg:pt-32 pb-24">
      <div className="max-w-[1440px] w-full mx-auto px-2 sm:px-12 xl:px-16">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16 pt-10">
          <span className="text-[#C9A84C] text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">
            The Collection
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl mb-4 tracking-tight drop-shadow-xl whitespace-nowrap">
            <span className="gold-gradient-text italic font-bold">DQhair</span>{" "}
            <span className="text-[#C9A84C] not-italic font-medium drop-shadow-[0_0_15px_rgba(201,168,76,0.3)]">Vietnam.</span>
          </h1>
          <p className="text-[#A0A0A0] text-sm md:text-base font-light">
            Discover our exquisite collection of Vietnamese raw hair.
          </p>
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
                    ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/5"
                    : "border-white/5 text-[#A0A0A0] hover:border-[#C9A84C]/50 hover:text-white"
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
            animate={{ height: "auto", opacity: 1 }}
            className="md:hidden pb-6 mb-6 border-b border-white/5"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setIsFilterOpen(false);
                  }}
                  className={`px-5 py-3 rounded-sm text-[10px] font-bold uppercase tracking-widest transition-colors border ${
                    activeCategory === cat
                      ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10"
                      : "border-white/5 text-[#A0A0A0] bg-[#111]"
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
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-6 lg:gap-8 items-start">
              {paginatedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index % 4}
                />
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

                <div className="flex items-center gap-2 px-1 sm:px-4">
                  {startPage > 1 && (
                    <>
                      <button
                        onClick={() => handlePageChange(1)}
                        className={`w-10 h-10 flex items-center justify-center text-[11px] font-bold tracking-widest rounded-sm transition-all border border-transparent text-[#A0A0A0] hover:text-white hover:border-white/10`}
                      >
                        1
                      </button>
                      {startPage > 2 && <span className="text-[#A0A0A0]">...</span>}
                    </>
                  )}

                  {visiblePages.map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 flex items-center justify-center text-[11px] font-bold tracking-widest rounded-sm transition-all border ${
                          currentPage === page
                            ? "border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10"
                            : "border-transparent text-[#A0A0A0] hover:text-white hover:border-white/10"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  {endPage < totalPages && (
                    <>
                      {endPage < totalPages - 1 && <span className="text-[#A0A0A0]">...</span>}
                      <button
                        onClick={() => handlePageChange(totalPages)}
                        className={`w-10 h-10 flex items-center justify-center text-[11px] font-bold tracking-widest rounded-sm transition-all border border-transparent text-[#A0A0A0] hover:text-white hover:border-white/10`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>

                <button
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
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
            <h3 className="text-3xl text-white font-display mb-3 italic">
              No products found
            </h3>
            <p className="text-[#A0A0A0] text-sm font-light">
              Try adjusting your search or category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
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
