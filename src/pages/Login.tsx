import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { motion } from 'motion/react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google.');
    }
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen flex items-center justify-center pt-24 pb-12 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md mx-auto px-8 sm:px-12 py-12 bg-[#0F0F0F] border border-white/5 rounded-xl shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] relative z-10"
      >
        <div className="text-center mb-10">
          <span className="text-[#C9A84C] text-[10px] uppercase tracking-[0.4em] font-bold mb-3 block">Welcome Back</span>
          <h2 className="font-display text-4xl italic text-white flex justify-center items-center gap-2">
            Sign <span className="not-italic font-sans font-black">In.</span>
          </h2>
        </div>
        
        {error && <div className="mb-6 bg-red-900/20 border border-red-500/30 text-red-200/90 py-3 px-4 rounded-sm text-[11px] text-center">{error}</div>}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-[10px] font-bold tracking-widest text-[#A0A0A0] uppercase mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-sm py-4 px-4 text-[#F5F5F0] focus:outline-none focus:border-[#C9A84C]/60 transition-colors text-sm" 
              placeholder="you@example.com" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold tracking-widest text-[#A0A0A0] uppercase mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-sm py-4 px-4 text-[#F5F5F0] focus:outline-none focus:border-[#C9A84C]/60 transition-colors text-sm" 
              placeholder="••••••••" 
            />
          </div>
          <div className="flex justify-between items-center text-xs pt-2">
             <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-3 h-3 border border-white/20 rounded-sm group-hover:border-[#C9A84C] transition-colors flex items-center justify-center relative">
                <input type="checkbox" className="opacity-0 absolute w-full h-full cursor-pointer" />
                {/* Custom checkmark visualization can go here */}
              </div>
              <span className="text-[#A0A0A0] uppercase tracking-wider text-[10px] group-hover:text-[#F5F5F0]">Remember me</span>
            </label>
            <a href="#" className="text-[#C9A84C]/80 uppercase tracking-wider text-[10px] font-bold hover:text-[#C9A84C] transition-colors">Forgot password?</a>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-8 bg-[#C9A84C] text-black font-bold tracking-[0.2em] uppercase text-[11px] rounded-sm hover:brightness-110 shadow-[0_10px_30px_-10px_rgba(201,168,76,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In Account'}
          </button>
        </form>

        <div className="mt-8 flex items-center justify-center gap-4">
          <div className="flex-1 h-[1px] bg-white/5"></div>
          <span className="text-[9px] uppercase tracking-widest text-[#A0A0A0]">Or continue with</span>
          <div className="flex-1 h-[1px] bg-white/5"></div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          type="button"
          className="w-full mt-8 py-4 bg-white text-black font-bold tracking-widest uppercase text-[11px] rounded-sm flex items-center justify-center gap-3 hover:bg-gray-100 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" fillRule="evenodd" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" fillRule="evenodd" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" fillRule="evenodd" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="currentColor" fillRule="evenodd" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google
        </button>
        
        <div className="mt-10 pt-8 border-t border-white/5 text-center text-[10px] uppercase tracking-widest text-[#A0A0A0]">
          Not a member? <Link to="/register" className="text-[#C9A84C] font-bold hover:text-[#F0D080] transition-colors ml-1 border-b border-[#C9A84C]/50 hover:border-[#F0D080] pb-0.5">Register Now</Link>
        </div>
      </motion.div>
    </div>
  );
}
