import { useParams, Navigate, Link } from "react-router-dom";
import { MOCK_PRODUCTS } from "@/data/mockProducts";
import { useState, useEffect } from "react";
import {
  MessageCircle,
  Heart,
  Share2,
  Ruler,
  Palette,
  Scissors,
  ShieldCheck,
  Weight,
  Store,
  ChevronRight,
} from "lucide-react";
import { motion } from "motion/react";
import { useStore } from "@/store/useStore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [viewMode, setViewMode] = useState<"image" | "video">("image");
  const { wishlist, toggleWishlist } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    const mockProduct = MOCK_PRODUCTS.find((p) => p.slug === slug);
    if (mockProduct) {
      setProduct(mockProduct);
      setLoading(false);
      return;
    }

    const fetchDbProduct = async () => {
      try {
        const q = query(collection(db, "products"), where("slug", "==", slug));
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
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] pt-32 pb-24 text-center text-[#C9A84C] text-[10px] uppercase tracking-[0.2em] font-medium flex items-center justify-center">
        Loading Details...
      </div>
    );
  }

  if (!product) return <Navigate to="/products" />;

  const isWishlisted = wishlist.includes(product.id || product.slug);
  const primaryWhatsAppUrl = `https://wa.me/84964882195?text=${encodeURIComponent(`Hello DQhair Vietnam! I would like to ask about the product "${product.name}". Please advise me!`)}`;
  const secondaryWhatsAppUrl = `https://wa.me/84358299899?text=${encodeURIComponent(`Hello DQhair Vietnam! I would like to ask about the product "${product.name}". Please advise me!`)}`;

  const hasVideo = product.videoUrls?.length > 0 || !!product.videoUrl;
  const firstVideoUrl = product.videoUrls?.[0] || product.videoUrl;

  return (
    <div className="bg-[#0A0A0A] min-h-screen pb-24 font-sans text-white pt-16 lg:pt-24">
      <div className="max-w-[1024px] mx-auto bg-[#111] lg:my-8 lg:rounded-xl overflow-hidden shadow-2xl pb-6">
        {/* Full-width Media Gallery */}
        <div className="relative w-full aspect-[4/5] sm:aspect-square bg-black overflow-hidden group">
          {viewMode === "image" ? (
            <motion.img
              key={`img-${activeImage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              {(firstVideoUrl.includes("youtube.com") || firstVideoUrl.includes("youtu.be")) ? (
                <iframe
                  className="w-full h-full"
                  src={firstVideoUrl.replace("watch?v=", "embed/").split("&")[0] + "?autoplay=1&mute=1&loop=1"}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <video
                  className="w-full h-full object-contain"
                  src={firstVideoUrl}
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              )}
            </motion.div>
          )}

          {/* Media Indicators (Mock Video/Image toggle) */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center bg-black/50 backdrop-blur-md rounded-full p-1 text-[10px] font-medium border border-white/10 z-10">
            <button 
              onClick={() => setViewMode("image")}
              className={`px-4 py-1.5 rounded-full transition-colors ${viewMode === "image" ? "bg-white text-black" : "text-white hover:text-[#C9A84C]"}`}
            >
              Images
            </button>
            {hasVideo && (
              <button 
                onClick={() => setViewMode("video")}
                className={`px-4 py-1.5 rounded-full transition-colors ${viewMode === "video" ? "bg-white text-black" : "text-white hover:text-[#C9A84C]"}`}
              >
                Video
              </button>
            )}
          </div>
        </div>

        {/* Thumbnails below gallery (Mobile sub-gallery style) */}
        <div className="flex space-x-2 overflow-x-auto p-3 scrollbar-hide bg-[#111]">
          {product.images.map((img: string, idx: number) => (
            <button
              key={idx}
              onClick={() => {
                setActiveImage(idx);
                setViewMode("image");
              }}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                activeImage === idx && viewMode === "image" ? "border-[#C9A84C]" : "border-transparent opacity-60"
              }`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Title & Price Section */}
        <div className="p-4 sm:p-6 bg-[#161616] mt-1 border-y border-white/5">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <span className="text-[#C9A84C] text-[10px] tracking-widest uppercase font-bold mb-2 block">
                {product.category}
              </span>
              <h1 className="text-xl sm:text-2xl font-display leading-tight text-white">
                {product.name}
              </h1>
            </div>
            
            <button className="p-2 text-[#A0A0A0] hover:text-white transition-colors bg-white/5 rounded-full mt-6">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Attributes/Variations Section (Alibaba Style) */}
        <div className="p-4 sm:p-6 bg-[#161616] mt-2 border-y border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-[#F5F5F0]">Length</h3>
            <ChevronRight className="w-4 h-4 text-[#A0A0A0]" />
          </div>
          
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
             {/* Mock lengths as pills */}
             {[8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40].map((len, i) => (
               <button key={i} className={`whitespace-nowrap px-4 py-2 rounded-md text-xs font-medium border transition-colors ${i === 2 ? 'border-[#C9A84C] text-[#C9A84C] bg-[#C9A84C]/10' : 'border-white/10 text-[#A0A0A0] bg-[#111]'}`}>
                 {len} Inches
               </button>
             ))}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm text-[#F5F5F0]">Color <span className="font-normal text-xs text-[#A0A0A0] ml-2">{product.colors[selectedColor]?.name}</span></h3>
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                {product.colors.map((color: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={`flex-shrink-0 w-12 h-16 rounded-md overflow-hidden border-2 transition-all p-0.5 ${
                      selectedColor === idx ? "border-[#C9A84C]" : "border-transparent"
                    }`}
                  >
                    <div className="w-full h-full rounded-sm" style={{ backgroundColor: color.hex }} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Specifications */}
        <div className="p-4 sm:p-6 bg-[#161616] mt-2 border-y border-white/5">
          <h3 className="font-bold text-sm text-[#F5F5F0] mb-4">Product Details</h3>
          <p className="text-[#A0A0A0] text-sm leading-relaxed mb-6">
            {product.description}
          </p>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
             <div className="text-[#A0A0A0]">Material</div>
             <div className="text-white text-right">{product.material || "100% Raw Vietnamese Hair"}</div>
             <div className="text-[#A0A0A0]">Weight</div>
             <div className="text-white text-right">{product.weight || "100g"} / bundle</div>
             <div className="text-[#A0A0A0]">Pre-styled</div>
             <div className="text-white text-right">Yes</div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar (Alibaba Style) */}
      <div
        className="fixed bottom-0 left-0 right-0 p-3 bg-[#111] border-t border-white/10 z-50 flex items-center gap-3"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center gap-1">
          <Link to="/products" className="flex flex-col items-center justify-center w-12 text-[#A0A0A0] hover:text-[#C9A84C] transition-colors">
            <Store className="w-5 h-5 mb-0.5" />
            <span className="text-[9px] font-medium">Store</span>
          </Link>
          <button 
             onClick={() => toggleWishlist(product.id)}
             className={`flex flex-col items-center justify-center w-12 transition-colors ${isWishlisted ? "text-[#C9A84C]" : "text-[#A0A0A0] hover:text-[#C9A84C]"}`}
          >
            <Heart className={`w-5 h-5 mb-0.5 ${isWishlisted ? "fill-[#C9A84C]" : ""}`} />
            <span className="text-[9px] font-medium">{isWishlisted ? "Saved" : "Save"}</span>
          </button>
        </div>

        <a
          href={secondaryWhatsAppUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 h-10 flex items-center justify-center border border-[#C9A84C] text-[#C9A84C] rounded-full font-bold text-xs hover:bg-[#C9A84C]/10 transition-colors"
        >
          Chat Now
        </a>
        
        <a
          href={primaryWhatsAppUrl}
          target="_blank"
          rel="noreferrer"
          className="flex-1 h-10 flex items-center justify-center bg-gradient-to-r from-[#D46000] to-[#E33E00] text-white rounded-full font-bold text-xs shadow-lg hover:opacity-90 transition-opacity"
        >
          Send Request
        </a>
      </div>
    </div>
  );
}
