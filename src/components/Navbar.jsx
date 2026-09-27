import React, { useState, useEffect } from 'react';
import { getCartTotalCount } from '../utils/cart';
import { getWishlistCount } from '../utils/wishlist';
import './Navbar.css';

export default function Navbar({ onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    const updateCounts = () => {
      setCartCount(getCartTotalCount());
      setWishlistCount(getWishlistCount());
    };

    updateCounts();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('cart-updated', updateCounts);
    window.addEventListener('wishlist-updated', updateCounts);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('cart-updated', updateCounts);
      window.removeEventListener('wishlist-updated', updateCounts);
    };
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          AESTIA
        </a>

        <nav className="navbar-menu">
          <a href="/" className="nav-link">Home</a>
          <a href="/shop" className="nav-link">Shop</a>
          <a href="/collections" className="nav-link">Collections</a>
          <a href="/about" className="nav-link">About</a>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="nav-action-btn"
            aria-label="Search"
            onClick={onOpenSearch}
          >
            <span>Search</span>
          </button>
          <a href="/wishlist" className="nav-action-btn" aria-label="Wishlist">
            <span>Wishlist</span>
            <span className="wishlist-badge">{wishlistCount}</span>
          </a>
          <a href="/cart" className="nav-action-btn nav-cart-btn" aria-label="Cart">
            <span>Cart</span>
            <span className="cart-badge">{cartCount}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
