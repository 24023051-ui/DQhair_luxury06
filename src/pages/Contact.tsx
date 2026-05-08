import { Mail, Phone, Instagram } from 'lucide-react';
import { motion } from 'motion/react';

export function Contact() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-32 pb-24">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-12">
        <div className="text-center mb-16 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#C9A84C] text-[10px] uppercase tracking-[0.3em] font-bold mb-4 block">Get in Touch</span>
            <h1 className="font-display text-5xl md:text-7xl italic text-white mb-6">
              Contact <span className="not-italic font-sans font-black">Us.</span>
            </h1>
            <p className="text-[#A0A0A0] text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
              We are here to assist you with your premium hair needs. Reach out to our dedicated support team for styling advice, wholesale inquiries, or general questions.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left: Info */}
          <div className="space-y-6">
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="bg-[#111] p-8 border border-[#C9A84C]/20 rounded-sm hover:border-[#C9A84C]/60 transition-colors"
            >
              <h3 className="text-[#C9A84C] font-bold text-[10px] tracking-widest uppercase mb-4 flex items-center"><Phone className="mr-3 w-4 h-4"/> Direct WhatsApp</h3>
              <div className="space-y-4">
                <a href="https://wa.me/84964882195" target="_blank" rel="noopener noreferrer" className="block text-2xl font-display text-[#F5F5F0] hover:text-[#C9A84C] transition-colors z-10 relative">+84 964 882 195</a>
                <a href="https://wa.me/84358299899" target="_blank" rel="noopener noreferrer" className="block text-2xl font-display text-[#F5F5F0] hover:text-[#C9A84C] transition-colors z-10 relative">+84 358 299 899</a>
              </div>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.3 }}
               className="bg-[#111] p-8 border border-[#C9A84C]/20 rounded-sm hover:border-[#C9A84C]/60 transition-colors"
            >
               <h3 className="text-[#C9A84C] font-bold text-[10px] tracking-widest uppercase mb-4 flex items-center"><Mail className="mr-3 w-4 h-4"/> Email inquiries</h3>
               <a href="mailto:admin@dqhairvn.com" className="block text-xl font-display text-[#F5F5F0] hover:text-[#C9A84C] transition-colors">admin@dqhairvn.com</a>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="bg-[#111] p-8 border border-[#C9A84C]/20 rounded-sm hover:border-[#C9A84C]/60 transition-colors"
            >
               <h3 className="text-[#C9A84C] font-bold text-[10px] tracking-widest uppercase mb-4 flex items-center"><Instagram className="mr-3 w-4 h-4"/> Social Media</h3>
               <a href="https://www.instagram.com/dqhair_vietnam9" target="_blank" rel="noreferrer" className="block text-xl font-display text-[#F5F5F0] hover:text-[#C9A84C] transition-colors">@dqhair_vietnam9</a>
            </motion.div>
          </div>

          {/* Right: Form (Mock) */}
          <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="bg-[#111] p-8 md:p-12 border border-[#C9A84C]/20 rounded-sm"
          >
            <h3 className="font-display text-3xl text-white mb-8 italic">Send a Message</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-[#A0A0A0] uppercase mb-2">Full Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-[#F5F5F0] focus:outline-none focus:border-[#C9A84C] transition-colors text-sm" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold tracking-widest text-[#A0A0A0] uppercase mb-2">Phone / WhatsApp</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-2 text-[#F5F5F0] focus:outline-none focus:border-[#C9A84C] transition-colors text-sm" placeholder="+1 234 567 890" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-[#A0A0A0] uppercase mb-2">Email Address</label>
                <input type="email" className="w-full bg-transparent border-b border-white/20 py-2 text-[#F5F5F0] focus:outline-none focus:border-[#C9A84C] transition-colors text-sm" placeholder="jane@example.com" />
              </div>
              <div>
                <label className="block text-[10px] font-bold tracking-widest text-[#A0A0A0] uppercase mb-2">Message</label>
                <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-2 text-[#F5F5F0] focus:outline-none focus:border-[#C9A84C] transition-colors resize-none text-sm" placeholder="I am interested in..."></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#8B6914] to-[#C9A84C] text-black font-bold tracking-widest uppercase text-[10px] rounded-sm hover:-translate-y-1 transition-transform shadow-[0_0_20px_rgba(201,168,76,0.15)]">
                Send Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
