import { useParams, Navigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { useState, useEffect } from 'react';
import { MessageCircle, Heart, Share2, Ruler, Palette, Scissors, ShieldCheck, Weight } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '@/store/useStore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function ProductDetail() {
  const { slug } = useParams();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const { wishlist, toggleWishlist } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    const mockProduct = MOCK_PRODUCTS.find(p => p.slug === slug);
    if (mockProduct) {
      setProduct(mockProduct);
      setLoading(false);
      return;
    }

    const fetchDbProduct = async () => {
      try {
        const q = query(collection(db, 'products'), where('slug', '==', slug));
        const snap = await getDocs(q);
        if (!snap.empty) {
          setProduct({ id: snap.docs[0].id, ...snap.docs[0].data() });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDbProduct();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-24 text-center text-[#C9A84C] text-[10px] uppercase tracking-[0.2em] font-medium flex items-center justify-center">Loading Details...</div>;
  }

  if (!product) return <Navigate to="/products" />;

  const isWishlisted = wishlist.includes(product.id || product.slug);
  const primaryWhatsAppUrl = `https://wa.me/84964882195?text=${encodeURIComponent(`Hello DQhair Vietnam! I would like to ask about the product "${product.name}". Please advise me!`)}`;
  const secondaryWhatsAppUrl = `https://wa.me/84358299899?text=${encodeURIComponent(`Hello DQhair Vietnam! I would like to ask about the product "${product.name}". Please advise me!`)}`;

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* LEFT: Gallery (55%) */}
          <div className="w-full lg:w-7/12 flex flex-col space-y-6">
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-[#111] overflow-hidden rounded-xl border border-white/5 shadow-2xl">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={product.images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/40 to-transparent pointer-events-none" />
              {product.badge && (
                <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md border border-[#C9A84C]/30 text-[#C9A84C] text-[9px] font-bold px-4 py-2 rounded-sm uppercase tracking-widest">
                  {product.badge}
                </div>
              )}
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide py-2">
              {product.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative flex-shrink-0 w-28 aspect-[3/4] rounded-lg overflow-hidden border transition-all duration-300 ${
                    activeImage === idx 
                      ? 'border-[#C9A84C] scale-105' 
                      : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Info (45%) */}
          <div className="w-full lg:w-5/12 flex flex-col lg:pt-10">
            
            <div className="mb-10">
              <span className="inline-block border-b border-[#C9A84C]/50 text-[#C9A84C] pb-1 text-[10px] tracking-[0.2em] font-medium uppercase mb-6">
                {product.category}
              </span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]">{product.name}</h1>
              <p className="text-[#A0A0A0] text-base leading-relaxed font-light">{product.description}</p>
            </div>

            {/* Video Showcase */}
            {(product.videoUrls?.length > 0 || product.videoUrl) && (
              <div className="mb-12 space-y-6">
                <h3 className="text-[10px] tracking-[0.2em] font-bold uppercase text-[#C9A84C] mb-4">Video Showcase</h3>
                {(product.videoUrls || (product.videoUrl ? [product.videoUrl] : [])).map((videoUrl: string, idx: number) => (
                  <div key={idx} className="rounded-xl overflow-hidden border border-white/5 relative group bg-[#111]">
                    {videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be') ? (
                      <iframe 
                        className="w-full aspect-video"
                        src={videoUrl.replace('watch?v=', 'embed/').split('&')[0]} 
                        allowFullScreen 
                      />
                    ) : (
                      <video 
                        className="w-full aspect-video object-cover"
                        src={videoUrl} 
                        controls 
                        muted 
                        preload="metadata"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Quick Specs Box */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-8 mb-12 shadow-inner group hover:border-[#C9A84C]/30 transition-colors">
              <h3 className="text-[#C9A84C] font-bold uppercase tracking-[0.2em] text-[10px] mb-6 pb-6 border-b border-white/5">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                {product.length && (
                  <div className="flex items-center text-[#F5F5F0]">
                    <Ruler className="w-4 h-4 mr-4 text-[#C9A84C] opacity-80" />
                    <span className="text-sm font-light">Length: {product.length} cm</span>
                  </div>
                )}
                {product.weight && (
                  <div className="flex items-center text-[#F5F5F0]">
                    <Weight className="w-4 h-4 mr-4 text-[#C9A84C] opacity-80" />
                    <span className="text-sm font-light">Weight: {product.weight} g</span>
                  </div>
                )}
                {product.material && (
                  <div className="flex items-center text-[#F5F5F0]">
                    <ShieldCheck className="w-4 h-4 mr-4 text-[#C9A84C] opacity-80" />
                    <span className="text-sm font-light leading-snug break-words pr-2">{product.material}</span>
                  </div>
                )}
                <div className="flex items-center text-[#F5F5F0]">
                  <Scissors className="w-4 h-4 mr-4 text-[#C9A84C] opacity-80" />
                  <span className="text-sm font-light">Pre-styled</span>
                </div>
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#C9A84C] font-bold uppercase tracking-[0.2em] text-[10px] flex items-center">
                    <Palette className="w-4 h-4 mr-3 opacity-80" />
                    Select Color
                  </h3>
                  <span className="text-[#A0A0A0] text-sm italic font-display">{product.colors[selectedColor]?.name}</span>
                </div>
                <div className="flex flex-wrap gap-4">
                  {product.colors.map((color: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={`w-12 h-12 rounded-full border-2 transition-all shadow-sm ${
                        selectedColor === idx 
                          ? 'border-[#C9A84C] scale-110 shadow-[0_0_15px_rgba(201,168,76,0.3)] ring-2 ring-[#C9A84C]/50 ring-offset-2 ring-offset-[#0A0A0A]' 
                          : 'border-white/20 hover:border-white/50'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      aria-label={`Select color ${color.name}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CTA Block */}
            <div className="mt-auto space-y-4 pt-8 border-t border-white/5">
              <a 
                href={primaryWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center space-x-3 py-5 bg-[#C9A84C] text-black rounded-sm font-bold tracking-[0.2em] text-[11px] uppercase hover:bg-[#F0D080] hover:shadow-[0_10px_30px_-10px_rgba(201,168,76,0.4)] transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Inquire via WhatsApp</span>
              </a>
              
              <div className="grid grid-cols-2 gap-4">
                 <a 
                  href={secondaryWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-4 border border-[#C9A84C]/50 text-[#C9A84C] rounded-sm font-bold tracking-[0.2em] text-[10px] uppercase hover:bg-[#C9A84C]/10 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 opacity-80" />
                  <span>Alt WhatsApp</span>
                </a>
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-full flex items-center justify-center space-x-2 py-4 border rounded-sm transition-colors text-[10px] font-bold tracking-[0.2em] uppercase ${
                    isWishlisted 
                      ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10' 
                      : 'border-white/10 text-white hover:border-[#C9A84C] hover:text-[#C9A84C]'
                  }`}
                >
                  <Heart className={`w-4 h-4 opacity-80 ${isWishlisted ? 'fill-[#C9A84C]' : ''}`} />
                  <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
