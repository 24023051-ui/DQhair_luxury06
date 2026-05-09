import { Link } from "react-router-dom";
import { Product } from "@/data/mockProducts";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

import React from "react";

interface ProductCardProps {
  key?: React.Key;
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const whatsappUrl = `https://wa.me/84964882195?text=${encodeURIComponent(`Hello DQhair Vietnam! I would like to ask about the product "${product.name}". Please advise me!`)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="group rounded-xl bg-[#0A0A0A] border border-white/5 overflow-hidden flex flex-col h-full hover:border-[#C9A84C]/30 transition-all duration-500 hover:shadow-[0_20px_40px_-20px_rgba(201,168,76,0.15)]"
    >
      {/* Image Container */}
      <div className="relative aspect-square sm:aspect-[4/5] bg-[#111] overflow-hidden">
        <Link to={`/products/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none" />
        </Link>
      </div>

      {/* Body */}
      <div className="p-2 sm:p-5 flex flex-col flex-grow text-[#F5F5F0] relative">
        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] mb-1 sm:mb-2 font-semibold truncate">
          {product.category}
        </p>
        <h3 className="font-display text-sm sm:text-lg lg:text-xl leading-snug text-white mb-2 sm:mb-3 line-clamp-2 group-hover:text-[#F0D080] transition-colors duration-300">
          <Link to={`/products/${product.slug}`}>{product.name}</Link>
        </h3>

        <p className="hidden sm:block text-[#888] text-[13px] leading-relaxed line-clamp-2 mb-5 flex-grow font-light">
          {product.description}
        </p>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3 mt-auto pt-3 sm:pt-0">
          <Link
            to={`/products/${product.slug}`}
            className="flex items-center justify-center py-2 sm:py-3 text-[9px] sm:text-[10px] uppercase tracking-widest text-white border border-white/10 hover:border-[#C9A84C] hover:text-[#C9A84C] hover:bg-[#C9A84C]/5 transition-all rounded-sm font-semibold"
          >
            Details
          </Link>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 sm:py-3 text-[9px] sm:text-[10px] text-black bg-[#C9A84C] hover:bg-[#F0D080] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all rounded-sm font-bold uppercase tracking-widest"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Inquire</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
