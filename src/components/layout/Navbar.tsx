import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Phone, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useAuth } from '../providers/AuthProvider';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleSignOut = () => {
    signOut(auth);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 w-full z-[100] transition-all duration-500 ease-out',
          scrolled || isOpen
            ? 'h-20 lg:h-24 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-[#C9A84C]/20 flex items-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]'
            : 'h-24 lg:h-32 bg-gradient-to-b from-black/80 to-transparent flex items-center border-b border-transparent'
        )}
      >
        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 xl:px-16 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex flex-col z-50 group hover:scale-105 transition-transform duration-500 origin-left">
            <img src="/logo.png" alt="DQHair Vietnam" className={cn("object-contain transition-all duration-500", scrolled || isOpen ? "h-10 lg:h-12" : "h-12 lg:h-16")} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-10 lg:gap-14 text-xs uppercase tracking-[0.2em] font-medium text-[#F5F5F0]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "transition-colors duration-300 relative group py-2",
                  location.pathname === link.path ? "text-[#C9A84C]" : "hover:text-[#F0D080]"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute bottom-0 left-0 h-[1px] bg-[#C9A84C] transition-all duration-300",
                  location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                )}></span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-8">
            <div className="text-[10px] xl:text-[11px] text-right leading-relaxed opacity-80 uppercase tracking-widest text-[#F5F5F0]">
              {user ? (
                 <span className="text-[#C9A84C] font-semibold">Welcome, {user.displayName || 'Guest'}</span>
              ) : (
                <span className="text-[#A0A0A0]">World's Finest<br/><span className="text-white">Raw Human Hair</span></span>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="text-[10px] border border-[#C9A84C]/50 px-4 py-2 uppercase tracking-widest text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors rounded-sm"
                >
                  Admin
                </Link>
              )}
              {user ? (
                <button 
                  onClick={handleSignOut}
                  className="bg-[#C9A84C] px-6 py-3 text-[10px] uppercase font-bold tracking-widest text-black hover:bg-[#F0D080] hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all rounded-sm"
                >
                  Sign Out
                </button>
              ) : (
                <Link 
                  to="/login"
                  className="border border-[#C9A84C] px-6 py-3 text-[10px] uppercase font-bold tracking-widest text-[#F5F5F0] hover:bg-[#C9A84C] hover:text-black hover:shadow-[0_0_20px_rgba(201,168,76,0.3)] transition-all rounded-sm"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center z-[100]">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#F5F5F0] p-2 -mr-2 bg-black/20 backdrop-blur-md rounded-full border border-white/10 hover:bg-[#C9A84C]/20 hover:text-[#C9A84C] hover:border-[#C9A84C]/50 transition-all duration-300 outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer (Luxury Redesign) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 w-[75%] max-w-[280px] h-full bg-[#0A0A0A] border-l border-[#C9A84C]/20 flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.5)] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Menu Header Image/Graphic */}
              <div className="relative h-32 bg-[#111] overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1519782559596-419b4e31ded1?q=80&w=800&auto=format&fit=crop" 
                  alt="Luxury Hair" 
                  className="w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <p className="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase mb-1 font-semibold">DQHair Vietnam</p>
                  <p className="text-white text-xs font-light">Elegance Rooted in Quality.</p>
                </div>
              </div>

              <div className="flex-1 px-6 py-6 flex flex-col justify-center space-y-4">
                {navLinks.map((link, i) => (
                  <motion.div 
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "group flex items-center justify-between font-display text-xl text-white hover:text-[#C9A84C] transition-colors",
                        location.pathname === link.path && "text-[#C9A84C]"
                      )}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className={cn(
                        "w-5 h-5 opacity-0 -translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0",
                        location.pathname === link.path && "opacity-100 translate-x-0"
                      )} />
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="px-6 pb-8 pt-6 border-t border-white/5 space-y-6 mt-auto flex-shrink-0">
                <div className="flex flex-col gap-3">
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center border border-[#C9A84C]/50 px-6 py-3 text-[10px] uppercase tracking-widest text-[#C9A84C] font-semibold"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  {user ? (
                    <button 
                      onClick={() => { handleSignOut(); setIsOpen(false); }} 
                      className="w-full text-center bg-[#C9A84C] text-black px-6 py-3 text-[10px] uppercase tracking-widest font-bold"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link 
                      to="/login" 
                      onClick={() => setIsOpen(false)} 
                      className="w-full text-center bg-[#C9A84C] text-black px-6 py-3 text-[10px] uppercase tracking-widest font-bold"
                    >
                      Sign In / Register
                    </Link>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <a href="https://wa.me/84964882195" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-[#A0A0A0] hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                    <span className="text-xs">Contact Us</span>
                  </a>
                  <a href="https://www.instagram.com/dqhair_vietnam9" target="_blank" rel="noreferrer" className="text-[#A0A0A0] hover:text-[#C9A84C] transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
