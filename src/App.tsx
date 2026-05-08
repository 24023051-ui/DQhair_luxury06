/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AuthProvider } from './components/providers/AuthProvider';

const Home = React.lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Products = React.lazy(() => import('./pages/Products').then(m => ({ default: m.Products })));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail').then(m => ({ default: m.ProductDetail })));
const About = React.lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Contact = React.lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Login = React.lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Register = React.lazy(() => import('./pages/Register').then(m => ({ default: m.Register })));
const AdminProducts = React.lazy(() => import('./pages/AdminProducts').then(m => ({ default: m.AdminProducts })));

// Loading spinner matches the premium theme
const PageLoader = () => (
  <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center">
    <div className="w-12 h-12 border-2 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin mb-4" />
    <span className="text-[#C9A84C] text-[10px] uppercase tracking-[0.2em] font-medium">Loading...</span>
  </div>
);

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            } />
            <Route path="products" element={
              <Suspense fallback={<PageLoader />}>
                <Products />
              </Suspense>
            } />
            <Route path="products/:slug" element={
              <Suspense fallback={<PageLoader />}>
                <ProductDetail />
              </Suspense>
            } />
            <Route path="about" element={
              <Suspense fallback={<PageLoader />}>
                <About />
              </Suspense>
            } />
            <Route path="contact" element={
              <Suspense fallback={<PageLoader />}>
                <Contact />
              </Suspense>
            } />
            <Route path="login" element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            } />
            <Route path="register" element={
              <Suspense fallback={<PageLoader />}>
                <Register />
              </Suspense>
            } />
            <Route path="admin" element={
              <Suspense fallback={<PageLoader />}>
                <AdminProducts />
              </Suspense>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
