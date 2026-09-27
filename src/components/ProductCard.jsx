import React, { useState, useEffect } from 'react';
import { isInWishlist, toggleWishlist } from '../utils/wishlist';
import { addToCart } from '../utils/cart';
import './ProductCard.css';

export default function ProductCard({ product, onViewProduct }) {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const checkWishlist = () => {
      setWishlisted(isInWishlist(product.id));
    };

    checkWishlist();
    window.addEventListener('wishlist-updated', checkWishlist);

    return () => {
      window.removeEventListener('wishlist-updated', checkWishlist);
    };
  }, [product.id]);

  const handleView = (e) => {
    e.preventDefault();
    if (onViewProduct) {
      onViewProduct(product);
    } else {
      window.history.pushState({}, '', `/product/${product.id}`);
      window.dispatchEvent(new Event('popstate'));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <article className="product-card" role="listitem">
      <div className="product-card-inner">
        {/* Wishlist Heart Button Overlay */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`card-wishlist-btn ${wishlisted ? 'active' : ''}`}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          {wishlisted ? '♥' : '♡'}
        </button>

        <a
          href={`/product/${product.id}`}
          onClick={handleView}
          className="product-card-link"
          aria-label={`View ${product.name}`}
        >
          <div className="product-image-wrapper">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              loading="lazy"
            />
            <span className="product-category-tag">{product.categoryName}</span>
          </div>

          <div className="product-details">
            <span className="product-category-label">{product.categoryName}</span>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>

            <div className="product-footer">
              <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
              <div className="product-card-actions">
                <button
                  type="button"
                  onClick={handleQuickAdd}
                  className="quick-add-btn"
                  title="Quick Add to Cart"
                >
                  + Add
                </button>
                <span className="view-product-btn">
                  View
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </article>
  );
}
