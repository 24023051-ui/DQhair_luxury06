import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] pt-20 border-t border-white/5 relative z-10">
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex flex-col group mb-6">
              <img src="/logo.png" alt="DQHair Vietnam" className="h-12 w-auto object-contain object-left mb-2 grayscale brightness-200" />
            </Link>
            <p className="text-[#A0A0A0] text-sm leading-relaxed max-w-md">
              Premium raw hair factory from Vietnam. Delivering export-quality hair extensions and wigs with unparalleled luxury and durability.
            </p>
          </div>

          <div>
            <h4 className="font-display text-[#F5F5F0] text-lg mb-6 tracking-wide">Explore</h4>
            <ul className="space-y-4 text-xs uppercase tracking-[0.2em] font-medium text-[#F5F5F0]">
              <li><Link to="/" className="hover:text-[#C9A84C] transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-[#C9A84C] transition-colors">Premium Catalog</Link></li>
              <li><Link to="/about" className="hover:text-[#C9A84C] transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-[#C9A84C] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[#F5F5F0] text-lg mb-6 tracking-wide">Contact</h4>
            <ul className="space-y-4 text-xs tracking-widest text-[#A0A0A0]">
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-[#C9A84C] mt-0.5 shrink-0" />
                <div className="flex flex-col space-y-1">
                  <a href="https://wa.me/84964882195" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84C] transition-colors">+84 964 882 195</a>
                  <a href="https://wa.me/84358299899" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9A84C] transition-colors">+84 358 299 899</a>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <a href="mailto:admin@dqhairvn.com" className="hover:text-[#C9A84C] transition-colors">admin@dqhairvn.com</a>
              </li>
               <li className="flex items-center space-x-3">
                <Instagram className="w-4 h-4 text-[#C9A84C] shrink-0" />
                <a href="https://www.instagram.com/dqhair_vietnam9" className="hover:text-[#C9A84C] transition-colors">@dqhair_vietnam9</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-[#F5F5F0] text-lg mb-6 tracking-wide">Service Hours</h4>
            <ul className="space-y-4 text-xs uppercase tracking-widest text-[#A0A0A0]">
              <li>Monday - Sunday</li>
              <li>8:00 AM - 10:00 PM (GMT+7)</li>
              <li className="text-[#C9A84C] mt-4">Worldwide Shipping</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar matching theme */}
        <div className="h-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between z-10">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-[10px] uppercase tracking-widest opacity-60 text-[#F5F5F0]">
            <span>Instagram @dqhair_vietnam9</span>
            <span className="text-[#C9A84C] hidden sm:inline">•</span>
            <span>admin@dqhairvn.com</span>
            <span className="text-[#C9A84C] hidden sm:inline">•</span>
            <span>+84 964 882 195</span>
          </div>
          <div className="text-[10px] uppercase tracking-widest opacity-40 mt-4 md:mt-0 text-[#F5F5F0]">
            &copy; {new Date().getFullYear()} DQhair Vietnam. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
