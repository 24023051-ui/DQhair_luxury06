import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 mb-4 bg-[#111] border border-[var(--border-gold)] rounded-2xl p-4 shadow-deep w-64"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display text-white text-lg">Chat with us</h4>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-400 mb-4">Need help finding the perfect hair? Reach out to our consultants.</p>
            <div className="flex flex-col space-y-3">
              <a
                href="https://wa.me/84964882195?text=Hello%20DQhair%20Vietnam!%20I%20need%20some%20help."
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] text-white py-2 px-4 rounded-xl text-sm font-medium flex items-center justify-center space-x-2 hover:bg-[#20b858] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>+84 964 882 195</span>
              </a>
              <a
                href="https://wa.me/84358299899?text=Hello%20DQhair%20Vietnam!%20I%20need%20some%20help."
                target="_blank"
                rel="noreferrer"
                className="bg-transparent border border-[#25D366] text-[#25D366] py-2 px-4 rounded-xl text-sm font-medium flex items-center justify-center space-x-2 hover:bg-[#25D366]/10 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>+84 358 299 899</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0A0A0A] border border-[#C9A84C] p-3 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_30px_rgba(201,168,76,0.4)] transition-all cursor-pointer group"
        aria-label="Contact on WhatsApp"
      >
        <div className="flex items-center gap-3 px-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-white group-hover:block hidden">Consult Now</span>
          <MessageCircle className="w-6 h-6 text-[#C9A84C]" />
        </div>
      </button>
    </div>
  );
}
