import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getWishlist, removeFromWishlist } from '../utils/wishlist';
import { addToCart } from '../utils/cart';
import './Wishlist.css';

export default function Wishlist({ onOpenSearch }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const syncWishlist = () => {
    setWishlistItems(getWishlist());
  };

  useEffect(() => {
    syncWishlist();
    window.addEventListener('wishlist-updated', syncWishlist);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      window.removeEventListener('wishlist-updated', syncWishlist);
    };
  }, []);

  const handleRemove = (productId, name) => {
    removeFromWishlist(productId);
    setToastMessage(`Removed ${name} from Wishlist`);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setToastMessage(`Added ${product.name} to Cart`);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  return (
    <div className="wishlist-page">
      <Navbar onOpenSearch={onOpenSearch} />

      <main className="wishlist-main">
        <div className="wishlist-container">
          {/* Breadcrumb */}
          <nav className="wishlist-breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">/</span>
            <a href="/shop" className="breadcrumb-link">Shop</a>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current" aria-current="page">Wishlist</span>
          </nav>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="wishlist-toast" role="status" aria-live="polite">
              <span className="toast-icon">✓</span>
              <span>{toastMessage}</span>
            </div>
          )}

          {/* Header */}
          <header className="wishlist-header">
            <span className="wishlist-tag">SAVED PIECES</span>
            <h1 className="wishlist-title">YOUR WISHLIST</h1>
            <p className="wishlist-subtitle">
              {wishlistItems.length > 0
                ? `You have saved ${wishlistItems.length} ${wishlistItems.length === 1 ? 'object' : 'objects'} to your wishlist.`
                : 'Your wishlist is currently empty.'}
            </p>
          </header>

          {wishlistItems.length === 0 ? (
            /* Empty State */
            <div className="wishlist-empty-state">
              <div className="wishlist-empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h2 className="wishlist-empty-title">Your wishlist is empty.</h2>
              <p className="wishlist-empty-text">
                Save your favorite harmonious objects to revisit anytime as you curate your home.
              </p>
              <a href="/shop" className="wishlist-explore-btn">
                EXPLORE PRODUCTS
              </a>
            </div>
          ) : (
            /* Wishlist Grid */
            <div className="wishlist-grid" role="list">
              {wishlistItems.map((product) => (
                <article key={product.id} className="wishlist-card" role="listitem">
                  <button
                    type="button"
                    onClick={() => handleRemove(product.id, product.name)}
                    className="wishlist-remove-icon-btn"
                    aria-label={`Remove ${product.name} from wishlist`}
                    title="Remove from wishlist"
                  >
                    ✕
                  </button>

                  <a href={`/product/${product.id}`} className="wishlist-card-link">
                    <div className="wishlist-img-wrap">
                      <img src={product.image} alt={product.name} className="wishlist-img" />
                      <span className="wishlist-category-badge">{product.categoryName}</span>
                    </div>

                    <div className="wishlist-details">
                      <span className="wishlist-category">{product.categoryName}</span>
                      <h2 className="wishlist-product-name">{product.name}</h2>
                      <span className="wishlist-price">₹{product.price.toLocaleString('en-IN')}</span>
                    </div>
                  </a>

                  <div className="wishlist-actions">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="wishlist-add-cart-btn"
                    >
                      Add to Cart
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(product.id, product.name)}
                      className="wishlist-remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
