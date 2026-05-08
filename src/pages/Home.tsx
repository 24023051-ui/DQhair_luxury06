import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { ProductCard } from '@/components/ui/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowDown, Instagram, PlayCircle } from 'lucide-react';
import { motion } from 'motion/react';

export function Home() {
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.isFeatured).slice(0, 6);

  return (
    <div className="bg-[var(--bg-primary)]">
      {/* -- HERO SECTION -- */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image / Placeholder for Video */}
        <div className="absolute inset-0 z-0 bg-[#0A0A0A] flex items-center justify-center pointer-events-none opacity-[0.03]">
          <img 
            src="/logo.png" 
            alt="DQHair Vietnam Logo Background" 
            className="w-full max-w-4xl object-contain grayscale scale-150 sm:scale-100"
          />
        </div>
        
        {/* Gold Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-30">
           <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-[var(--gold-light)] shadow-[0_0_20px_var(--gold-light)] animate-pulse" />
           <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-[var(--gold-primary)] shadow-[0_0_15px_var(--gold-primary)] animate-bounce" style={{ animationDuration: '4s' }} />
           <div className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full bg-[var(--gold-dark)] shadow-[0_0_30px_var(--gold-dark)] animate-pulse" style={{ animationDuration: '5s' }} />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 sm:px-12 xl:px-16 flex flex-col lg:flex-row items-center pt-24 min-h-[500px]">
          
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left mt-8 sm:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-4 mb-8"
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
              <h1 className="text-[3.5rem] leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-display italic text-white mb-6 md:mb-8 font-light">
                Pure Elegance <br/> <span className="text-white not-italic font-sans font-medium tracking-tight">Rooted in Quality.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="max-w-[280px] sm:max-w-md text-[#A0A0A0] text-sm sm:text-base leading-relaxed mb-10 md:mb-12 font-light">
                Experience the world's finest Vietnamese raw hair. Unprocessed, ethically sourced, and crafted for the most discerning global stylists and brands.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row w-full sm:w-auto gap-4"
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
              className="mt-16 sm:mt-20 flex gap-8 sm:gap-16 opacity-80"
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

          <div className="hidden lg:flex w-1/2 justify-end">
            {/* Optionally leave empty, background image already visible here */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
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

      {/* -- BRAND STORY -- */}
      <section className="py-24 sm:py-32 bg-[#050505] border-y border-white/[0.02]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="relative h-[80vw] lg:h-[700px] rounded-lg overflow-hidden order-2 lg:order-1">
            <img 
              src="https://images.unsplash.com/photo-1600171286381-817ab0ec292f?q=80&w=800&auto=format&fit=crop" 
              alt="Brand Story" 
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-[10s] hover:scale-105"
            />
            <div className="absolute inset-0 border border-[#C9A84C]/20 m-6 lg:m-8 rounded-lg pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-[#C9A84C] tracking-[0.3em] uppercase text-[10px] font-bold mb-6 block">Our Heritage</span>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-8 leading-[1.1]">
              DQhair Vietnam — <br /> <span className="italic text-[#A0A0A0] text-3xl sm:text-4xl lg:text-5xl">Luxury defined from the roots.</span>
            </h2>
            <p className="text-[#A0A0A0] mb-10 leading-relaxed text-base sm:text-lg font-light">
              We source only the finest raw hair from healthy donors across Vietnam. Our commitment to quality ensures that every bundle, wig, and extension maintains its natural luster, strength, and perfection.
            </p>
            <ul className="space-y-6 mb-12">
              {[
                '100% Authentic Human Hair — Cuticle aligned',
                'Ethically sourced with clear origins',
                'Long-term durability & bleach-friendly'
              ].map((item, i) => (
                <li key={i} className="flex items-center space-x-5 text-gray-300 font-light">
                  <div className="w-1 h-1 bg-[#C9A84C] rounded-full" />
                  <span className="text-sm sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/about" className="inline-block border-b border-[#C9A84C]/50 text-[#C9A84C] pb-2 hover:border-[#C9A84C] transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* -- VIDEO SHOWCASE -- */}
      <section className="py-24 sm:py-32 relative bg-[#0A0A0A]">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-16">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="font-display text-4xl sm:text-5xl text-white mb-6">Real Experiences</h2>
            <p className="text-[#A0A0A0] font-light text-base sm:text-lg">Feel the movement and texture of absolute quality.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
            {[1, 2, 3].map((v) => (
              <div key={v} className="relative aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer border border-white/5 hover:border-[#C9A84C]/50 transition-colors duration-500">
                 <img 
                  src={`https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=600&auto=format&fit=crop&sig=${v}`}
                  alt="Video Thumbnail"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 sm:w-20 sm:h-20 text-white/50 group-hover:text-[#C9A84C] transition-colors group-hover:scale-110 duration-500" strokeWidth={0.5} />
                </div>
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-[#C9A84C] text-[9px] uppercase tracking-[0.3em] font-bold mb-2">Review</p>
                  <p className="text-white font-display text-2xl sm:text-3xl leading-tight">Bone Straight Unboxing</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -- CONTACT BANNER -- */}
      <section className="relative py-32 bg-[#050505] overflow-hidden border-t border-white/[0.02]">
        {/* Abstract Gold Glow Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-[#C9A84C]/5 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl text-white mb-8">Found Your Perfect Style?</h2>
          <p className="text-[#A0A0A0] text-base sm:text-lg mb-12 sm:mb-16 font-light max-w-2xl mx-auto leading-relaxed">
            Reach out to our hair experts for a free consultation. Let us help you select the exact match for your needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
            <a href="https://wa.me/84964882195" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 bg-[#C9A84C] text-black text-[11px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#F0D080] hover:shadow-[0_10px_30px_-10px_rgba(201,168,76,0.5)] transition-all text-center">
              WhatsApp: +84 964 882 195
            </a>
            <a href="https://wa.me/84358299899" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-10 py-5 border border-[#C9A84C]/50 text-[#C9A84C] text-[11px] font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#C9A84C]/10 transition-colors text-center">
              WhatsApp: +84 358 299 899
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
