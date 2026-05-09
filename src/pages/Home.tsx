import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { ProductCard } from '@/components/ui/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);

  useEffect(() => {
    // Fetch products from Firebase
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));
        const items = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        // Also combine with MOCK_PRODUCTS in case there are any
        const allProducts = [...items, ...MOCK_PRODUCTS];
        setFeaturedProducts(allProducts.filter(p => p.isFeatured).slice(0, 6));
      } catch (e) {
        console.error(e);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-[var(--bg-primary)]">
      {/* -- HERO SECTION -- */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image / Placeholder for Video */}
        <div className="absolute inset-0 z-0 bg-[#0A0A0A] flex items-center justify-center pointer-events-none opacity-40">
          <img 
            src="/logo.png" 
            alt="DQHair Vietnam Logo Background" 
            className="w-full max-w-4xl object-contain opacity-80 sm:scale-100"
          />
        </div>
        
        {/* Gold Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-30">
           <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[var(--gold-light)] shadow-[0_0_20px_var(--gold-light)] animate-pulse" />
           <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[var(--gold-primary)] shadow-[0_0_15px_var(--gold-primary)] animate-bounce" style={{ animationDuration: '4s' }} />
           <div className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full bg-[var(--gold-dark)] shadow-[0_0_30px_var(--gold-dark)] animate-pulse" style={{ animationDuration: '5s' }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-12 xl:px-16 flex flex-col items-center pt-24 min-h-[500px] text-center">
          
          <div className="w-full max-w-4xl flex flex-col items-center mt-8 sm:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center justify-center gap-4 mb-8"
            >
              <div className="h-[1px] w-12 sm:w-16 bg-[#C9A84C]"></div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#C9A84C] font-medium">
                Premium Collection 2026
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-[2.5rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-display mb-6 md:mb-8 tracking-tight drop-shadow-2xl whitespace-nowrap">
                <span className="gold-gradient-text italic font-bold">DQhair</span>{" "} 
                <span className="text-[#C9A84C] not-italic font-medium drop-shadow-[0_0_15px_rgba(201,168,76,0.3)]">Vietnam.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="max-w-[400px] sm:max-w-md mx-auto text-[#A0A0A0] text-sm sm:text-base leading-relaxed mb-10 md:mb-12 font-light">
                Experience the world's finest Vietnamese raw hair. Unprocessed, ethically sourced, and crafted for the most discerning global stylists and brands.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row justify-center w-full sm:w-auto gap-4"
            >
              <Link
                to="/products"
                className="bg-gradient-to-r from-[#8B6914] to-[#C9A84C] text-black px-10 py-5 text-[11px] sm:text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:-translate-y-1 transition-transform shadow-[0_10px_30px_-10px_rgba(201,168,76,0.4)] rounded-sm whitespace-nowrap"
              >
                View Catalogue
              </Link>
              <a
                href="https://wa.me/84964882195"
                target="_blank"
                rel="noreferrer"
                className="border border-white/20 hover:border-[#C9A84C] px-10 py-5 text-[11px] sm:text-xs font-bold uppercase tracking-widest transition-all text-center flex items-center justify-center text-white rounded-sm whitespace-nowrap"
              >
                WhatsApp Now
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-16 sm:mt-20 flex justify-center gap-8 sm:gap-16 opacity-80"
            >
              <div>
                <p className="text-2xl md:text-3xl font-display text-[#C9A84C]">100%</p>
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#A0A0A0] mt-1">Virgin Hair</p>
              </div>
              <div className="border-l border-white/10 pl-8 sm:pl-16">
                <p className="text-2xl md:text-3xl font-display text-[#C9A84C]">15+</p>
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#A0A0A0] mt-1">Countries</p>
              </div>
              <div className="border-l border-white/10 pl-8 sm:pl-16">
                <p className="text-2xl md:text-3xl font-display text-[#C9A84C]">80cm</p>
                <p className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#A0A0A0] mt-1">Max Length</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-gray-500/50 hover:text-[#C9A84C] transition-colors"
        >
          <ArrowDown className="w-6 h-6 stroke-1" />
        </motion.div>
      </section>

      {/* -- FEATURED PRODUCTS -- */}
      <section className="py-24 sm:py-32 px-6 sm:px-12 xl:px-16 max-w-[1440px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-16 sm:mb-24 gap-6">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-4">Featured Collection</h2>
            <div className="w-16 h-[1px] bg-[#C9A84C]" />
          </div>
          <Link to="/products" className="hidden sm:inline-flex text-[#A0A0A0] hover:text-[#C9A84C] uppercase tracking-[0.2em] text-[10px] font-semibold transition-colors border-b border-transparent hover:border-[#C9A84C] pb-1">
            View All Products
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-10">
          {featuredProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        
        <div className="mt-16 text-center sm:hidden">
           <Link to="/products" className="inline-block text-[#C9A84C] border border-[#C9A84C]/50 hover:border-[#C9A84C] px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-bold rounded-sm w-full transition-colors">
            View All Products
          </Link>
        </div>
      </section>

    </div>
  );
}
