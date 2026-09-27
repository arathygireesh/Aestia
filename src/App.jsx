import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import About from './pages/About';
import Contact from './pages/Contact';
import Collections from './pages/Collections';
import SearchModal from './components/SearchModal';
import Footer from './components/Footer';
import './styles/global.css';

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname);
  const [currentSearch, setCurrentSearch] = useState(() => window.location.search);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setCurrentSearch(window.location.search);
    };

    window.addEventListener('popstate', handleLocationChange);

    // Global listener for SPA internal navigation
    const handleGlobalClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href) return;

      // Check if it's an internal route navigation
      if (
        href === '/' ||
        href === '/shop' ||
        href === '/collections' ||
        href === '/about' ||
        href === '/contact' ||
        href === '/cart' ||
        href === '/wishlist' ||
        href.startsWith('/shop?') ||
        href.startsWith('/collections?') ||
        href.startsWith('/product/')
      ) {
        e.preventDefault();
        window.history.pushState({}, '', href);
        handleLocationChange();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  // Parse category & collection from URL params: e.g. /shop?category=lighting or /shop?collection=warm-cozy
  const params = new URLSearchParams(currentSearch);
  const collectionParam = params.get('collection') || null;
  const categoryParam = params.get('category') || (collectionParam ? null : 'all');

  const isAboutPage = currentPath === '/about' || currentPath.startsWith('/about');
  const isContactPage = currentPath === '/contact' || currentPath.startsWith('/contact');
  const isCollectionsPage = currentPath === '/collections' || currentPath.startsWith('/collections');
  const isCartPage = currentPath === '/cart' || currentPath.startsWith('/cart');
  const isWishlistPage = currentPath === '/wishlist' || currentPath.startsWith('/wishlist');
  const isProductPage = currentPath.startsWith('/product/');
  const productId = isProductPage ? decodeURIComponent(currentPath.replace(/^\/product\//, '').split('/')[0]) : null;
  const isShopPage = currentPath === '/shop' || currentPath.startsWith('/shop?');

  const handleSelectCategory = (catId) => {
    const nextUrl = catId === 'all' ? '/shop' : `/shop?category=${catId}`;
    window.history.pushState({}, '', nextUrl);
    setCurrentPath('/shop');
    setCurrentSearch(catId === 'all' ? '' : `?category=${catId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCollection = (collId) => {
    const nextUrl = `/shop?collection=${collId}`;
    window.history.pushState({}, '', nextUrl);
    setCurrentPath('/shop');
    setCurrentSearch(`?collection=${collId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isAboutPage ? (
        <About onOpenSearch={() => setIsSearchOpen(true)} />
      ) : isContactPage ? (
        <Contact onOpenSearch={() => setIsSearchOpen(true)} />
      ) : isCollectionsPage ? (
        <Collections onOpenSearch={() => setIsSearchOpen(true)} />
      ) : isCartPage ? (
        <Cart onOpenSearch={() => setIsSearchOpen(true)} />
      ) : isWishlistPage ? (
        <Wishlist onOpenSearch={() => setIsSearchOpen(true)} />
      ) : isProductPage ? (
        <ProductDetails
          productId={productId}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      ) : isShopPage ? (
        <Shop
          currentCategory={categoryParam}
          currentCollection={collectionParam}
          onSelectCategory={handleSelectCategory}
          onSelectCollection={handleSelectCollection}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      ) : (
        <Home onOpenSearch={() => setIsSearchOpen(true)} />
      )}

      {/* Global Clean AESTIA Footer */}
      <Footer />

      {/* Global Clean AESTIA Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
