import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/components/providers/AuthProvider';
import { Navigate } from 'react-router-dom';
import { UploadCloud, FileVideo, Image as ImageIcon } from 'lucide-react';

export function AdminProducts() {
  const { isAdmin, loading } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});


  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Config Cloudinary
    const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || ''; 
    const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      setErrorMsg("Chưa cấu hình Cloudinary! Vui lòng thêm VITE_CLOUDINARY_CLOUD_NAME và VITE_CLOUDINARY_UPLOAD_PRESET vào Settings (biểu tượng bánh răng) -> Environment Variables.");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);

      try {
        const resourceType = type === 'image' ? 'image' : 'video';
        const xhr = new XMLHttpRequest();
        
        // Setup promise to handle the upload
        const uploadPromise = new Promise((resolve, reject) => {
          xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
              const progress = (event.loaded / event.total) * 100;
              setUploadProgress(prev => ({ ...prev, [file.name]: progress }));
            }
          });

          xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(JSON.parse(xhr.responseText));
            }
          });

          xhr.addEventListener('error', () => reject(new Error('Upload failed')));
          xhr.addEventListener('abort', () => reject(new Error('Upload aborted')));
        });

        xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`);
        xhr.send(formData);

        const response: any = await uploadPromise;
        const downloadURL = response.secure_url;
        
        if (type === 'image') {
          setFormData(prev => ({ 
            ...prev, 
            imageUrls: prev.imageUrls ? prev.imageUrls + '\n' + downloadURL : downloadURL 
          }));
        } else {
          setFormData(prev => ({ 
            ...prev, 
            videoUrls: prev.videoUrls ? prev.videoUrls + '\n' + downloadURL : downloadURL 
          }));
        }
      } catch (error) {
        console.error("Upload failed", error);
        setErrorMsg(`Failed to upload ${file.name}. Error: ${JSON.stringify(error)}`);
      } finally {
        setUploadProgress(prev => {
          const newObj = { ...prev };
          delete newObj[file.name];
          return newObj;
        });
      }
    }
    
    // Clear input
    if (type === 'image' && imageInputRef.current) imageInputRef.current.value = '';
    if (type === 'video' && videoInputRef.current) videoInputRef.current.value = '';
  };

  if (loading) return <div className="min-h-screen bg-[#0A0A0A]" />;
  if (!isAdmin) return <Navigate to="/" />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
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
      setErrorMsg("Error saving: " + err.message);
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    // Cannot use window.confirm in iframe easily, so deleting directly
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(p => p.id !== id));
    } catch (err: any) {
      console.error('Failed to delete', err);
      setErrorMsg("Lỗi khi xóa: " + err.message);
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
            {errorMsg && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-xs p-3 mb-4 rounded-sm break-words">
                {errorMsg}
              </div>
            )}
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
                <label className="block text-[10px] uppercase tracking-widest opacity-60 mb-1">Image URLs</label>
                <textarea required value={formData.imageUrls} onChange={e => setFormData({...formData, imageUrls: e.target.value})} className="w-full bg-black border border-white/10 p-2 text-xs h-20 mb-2" placeholder="https://image1.jpg&#10;https://image2.jpg" />
                <input type="file" multiple accept="image/*" className="hidden" ref={imageInputRef} onChange={e => handleFileUpload(e, 'image')} />
                <button type="button" onClick={() => imageInputRef.current?.click()} className="flex items-center justify-center gap-2 w-full border border-white/10 hover:border-[#C9A84C]/50 text-xs py-2 text-white/70 hover:text-[#C9A84C] transition-colors rounded-sm">
                  <ImageIcon className="w-4 h-4" /> Upload Images
                </button>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest opacity-60 mb-1">Video URLs (Optional)</label>
                <textarea value={formData.videoUrls} onChange={e => setFormData({...formData, videoUrls: e.target.value})} className="w-full bg-black border border-white/10 p-2 text-xs h-20 mb-2" placeholder="https://youtube.com/watch?v=...&#10;https://..." />
                <input type="file" multiple accept="video/*" className="hidden" ref={videoInputRef} onChange={e => handleFileUpload(e, 'video')} />
                <button type="button" onClick={() => videoInputRef.current?.click()} className="flex items-center justify-center gap-2 w-full border border-white/10 hover:border-[#C9A84C]/50 text-xs py-2 text-white/70 hover:text-[#C9A84C] transition-colors rounded-sm">
                  <FileVideo className="w-4 h-4" /> Upload Videos
                </button>
              </div>

              {/* Upload Progress bars */}
              {Object.keys(uploadProgress).length > 0 && (
                <div className="space-y-2 mt-4 bg-black/50 p-3 border border-white/5 rounded-sm">
                  <p className="text-[10px] uppercase tracking-widest text-[#C9A84C]">Uploading Files...</p>
                  {Object.entries(uploadProgress).map(([filename, progress]) => (
                    <div key={filename} className="w-full">
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="truncate max-w-[200px] text-white/70">{filename}</span>
                        <span className="text-[#C9A84C]">{Math.round(progress as number)}%</span>
                      </div>
                      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#C9A84C] transition-all duration-300" style={{ width: `${progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button disabled={saving || Object.keys(uploadProgress).length > 0} type="submit" className="w-full bg-[#C9A84C] text-black py-3 text-[10px] font-bold uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed mt-4">
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
                       className="absolute top-2 right-2 opacity-50 hover:opacity-100 text-red-500 text-xs px-2 py-1 bg-red-500/10 rounded-sm hover:bg-red-500/20 transition-all font-bold"
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
