import { motion } from 'motion/react';

export function About() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-32 pb-24">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-12 text-center pt-20 mb-24">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
         >
           <span className="text-[#C9A84C] text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Our Heritage</span>
           <h1 className="font-display text-5xl md:text-7xl italic text-white mb-8">
              Redefining <span className="not-italic font-sans font-black">Luxury Hair.</span>
           </h1>
           <p className="text-[#A0A0A0] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              DQhair Vietnam was founded with a singular vision: to provide the world with the most exquisite, unadulterated raw hair. Sourced ethically from the pristine regions of Vietnam, our hair undergoes rigorous quality control to ensure every strand meets our exacting standards of luxury.
           </p>
         </motion.div>
      </div>

      {/* Feature Image */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 mb-32">
         <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="aspect-[21/9] w-full rounded-sm overflow-hidden relative"
         >
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1595475884562-073c18844f9c?q=80&w=2000&auto=format&fit=crop" 
              alt="DQhair Factory" 
              className="w-full h-full object-cover"
            />
         </motion.div>
      </div>

      {/* Philosophy Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
         >
            <p className="text-4xl font-display text-[#C9A84C] italic mb-4">01</p>
            <h3 className="text-white text-lg font-bold tracking-widest uppercase mb-4">Ethical Sourcing</h3>
            <p className="text-[#A0A0A0] text-sm leading-relaxed">
              We partner directly with local communities, ensuring fair compensation and sustainable practices in every strand we collect.
            </p>
         </motion.div>
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
         >
            <p className="text-4xl font-display text-[#C9A84C] italic mb-4">02</p>
            <h3 className="text-white text-lg font-bold tracking-widest uppercase mb-4">Unprocessed Purity</h3>
            <p className="text-[#A0A0A0] text-sm leading-relaxed">
              Our raw hair maintains its natural cuticles aligned in one direction, preventing tangling and ensuring unparalleled longevity.
            </p>
         </motion.div>
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
         >
            <p className="text-4xl font-display text-[#C9A84C] italic mb-4">03</p>
            <h3 className="text-white text-lg font-bold tracking-widest uppercase mb-4">Global Excellence</h3>
            <p className="text-[#A0A0A0] text-sm leading-relaxed">
              Trusted by top salons and stylists across 15+ countries, we deliver consistent, export-grade quality for the most demanding clients.
            </p>
         </motion.div>
      </div>
    </div>
  );
}
