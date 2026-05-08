import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/components/providers/AuthProvider';
import { Navigate } from 'react-router-dom';

export function AdminProducts() {
  const { isAdmin, loading } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    category: 'Straight Hair',
    description: '',
    details: '',
    imageUrls: '',
    videoUrls: ''
  });

  const fetchProducts = async () => {
    setFetching(true);
    try {
      const snap = await getDocs(collection(db, 'products'));
      const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (isAdmin) fetchProducts();
  }, [isAdmin]);

  if (loading) return <div className="min-h-screen bg-[#0A0A0A]" />;
  if (!isAdmin) return <Navigate to="/" />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const productRef = doc(collection(db, 'products'));
      
      const images = formData.imageUrls.split(/[\n,]+/).map(u => u.trim()).filter(u => u.length > 0);
      const videos = formData.videoUrls.split(/[\n,]+/).map(u => u.trim()).filter(u => u.length > 0);

      const productData: any = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description,
        category: formData.category,
        images: images.length > 0 ? images : ['https://via.placeholder.com/400x600'],
        details: formData.details || formData.description,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      if (videos.length > 0) {
        productData.videoUrls = videos;
      }

      await setDoc(productRef, productData);
      
      setFormData({
        name: '',
        slug: '',
        category: 'Straight Hair',
        description: '',
        details: '',
        imageUrls: '',
        videoUrls: ''
      });
      fetchProducts();
    } catch (err: any) {
      alert("Error saving: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  return (
    <div className="bg-[#0A0A0A] min-h-screen pt-32 pb-24 text-[#F5F5F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-12">
        <h1 className="font-display text-4xl mb-8 italic">Admin <span className="not-italic font-sans font-black">Products</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Add Product Form */}
          <div className="lg:col-span-1 bg-[#111] p-6 border border-white/10 rounded-sm h-fit">
            <h2 className="text-[10px] uppercase tracking-widest text-[#C9A84C] font-bold mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-60 mb-1">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black border border-white/10 p-2 text-xs" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-60 mb-1">Slug (URL path)</label>
                <input required type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-black border border-white/10 p-2 text-xs" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-60 mb-1">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black border border-white/10 p-2 text-xs">
                  <option>Straight Hair</option>
                  <option>Wavy Hair</option>
                  <option>Curly Hair</option>
                  <option>Colored Hair</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-60 mb-1">Description</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-black border border-white/10 p-2 text-xs h-20" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-60 mb-1">Image URLs (One per line or comma separated to add many)</label>
                <textarea required value={formData.imageUrls} onChange={e => setFormData({...formData, imageUrls: e.target.value})} className="w-full bg-black border border-white/10 p-2 text-xs h-20" placeholder="https://image1.jpg&#10;https://image2.jpg" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-60 mb-1">Video URLs (One per line or comma separated, Optional)</label>
                <textarea value={formData.videoUrls} onChange={e => setFormData({...formData, videoUrls: e.target.value})} className="w-full bg-black border border-white/10 p-2 text-xs h-20" placeholder="https://youtube.com/watch?v=...&#10;https://..." />
              </div>
              <button disabled={saving} type="submit" className="w-full bg-[#C9A84C] text-black py-3 text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 mt-4">
                {saving ? 'Saving...' : 'Publish Product'}
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2">
             <h2 className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-6">Existing Products ({products.length})</h2>
             {fetching ? (
               <div className="text-sm opacity-50">Loading products...</div>
             ) : (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {products.map(p => (
                   <div key={p.id} className="bg-[#111] border border-white/10 p-4 flex gap-4 relative group">
                     {p.images?.[0] && <img src={p.images[0]} alt={p.name} className="w-16 h-16 object-cover rounded-sm" />}
                     <div>
                       <h3 className="text-sm font-bold truncate pr-8">{p.name}</h3>
                       <p className="text-[10px] text-[#C9A84C] uppercase tracking-widest">{p.category}</p>
                     </div>
                     <button 
                       onClick={() => handleDelete(p.id)}
                       className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500 text-xs px-2 py-1 bg-red-500/10 rounded-sm hover:bg-red-500/20 transition-all font-bold"
                     >
                       DEL
                     </button>
                   </div>
                 ))}
                 {products.length === 0 && <div className="text-sm opacity-50">No products found. Start adding some!</div>}
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
