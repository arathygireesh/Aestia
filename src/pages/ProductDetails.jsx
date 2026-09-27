import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { PRODUCTS } from '../data/products';
import { addToCart } from '../utils/cart';
import { isInWishlist, toggleWishlist } from '../utils/wishlist';
import './ProductDetails.css';

export default function ProductDetails({ productId, onOpenSearch }) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Find product by id (string or numeric 1-based index)
  const product = PRODUCTS.find((p, index) => {
    if (!productId) return false;
    const cleanId = String(productId).trim().toLowerCase();
    return (
      p.id.toLowerCase() === cleanId ||
      String(index + 1) === cleanId
    );
  });

  useEffect(() => {
    // Reset quantity to 1 whenever productId changes
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (product) {
      setIsWishlisted(isInWishlist(product.id));
    }

    const handleWishlistUpdate = () => {
      if (product) {
        setIsWishlisted(isInWishlist(product.id));
      }
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdate);

    return () => {
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
    };
  }, [productId, product]);

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setToastMessage(`Added ${quantity} × ${product.name} to cart`);

    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    const { added } = toggleWishlist(product);
    setIsWishlisted(added);
    setToastMessage(
      added
        ? `Added ${product.name} to your Wishlist`
        : `Removed ${product.name} from your Wishlist`
    );
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  return (
    <div className="product-details-page">
      <Navbar onOpenSearch={onOpenSearch} />

      <main className="product-details-main">
        <div className="product-details-container">
          {/* Breadcrumb Navigation */}
          <nav className="product-breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">/</span>
            <a href="/shop" className="breadcrumb-link">Shop</a>
            {product && (
              <>
                <span className="breadcrumb-separator">/</span>
                <a href={`/shop?category=${product.category}`} className="breadcrumb-link">
                  {product.categoryName}
                </a>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current" aria-current="page">
                  {product.name}
                </span>
              </>
            )}
          </nav>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="product-toast" role="status" aria-live="polite">
              <span className="toast-icon">✓</span>
              <span>{toastMessage}</span>
            </div>
          )}

          {!product ? (
            /* Product Not Found State */
            <div className="product-not-found">
              <span className="not-found-tag">404</span>
              <h1 className="not-found-title">Product not found</h1>
              <p className="not-found-text">
                The object you are looking for does not exist or may have been archived.
              </p>
              <a href="/shop" className="not-found-btn">
                ← Back to Shop
              </a>
            </div>
          ) : (
            /* Product Content Grid */
            <div className="product-layout-grid">
              {/* Left: Product Image */}
              <div className="product-gallery-column">
                <div className="product-main-image-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-main-image"
                  />
                  <span className="product-image-badge">{product.categoryName}</span>
                </div>
              </div>

              {/* Right: Product Information */}
              <div className="product-info-column">
                <div className="product-category-meta">
                  <span className="category-meta-label">Category:</span>{' '}
                  <a
                    href={`/shop?category=${product.category}`}
                    className="category-meta-link"
                  >
                    {product.categoryName}
                  </a>
                </div>

                <h1 className="product-page-title">{product.name}</h1>

                <div className="product-price-row">
                  <span className="product-page-price">
                    ₹{product.price.toLocaleString('en-IN')}
                  </span>
                  <span className="product-tax-note">Inclusive of all taxes</span>
                </div>

                <div className="product-divider"></div>

                <div className="product-description-section">
                  <h2 className="description-heading">Description</h2>
                  <p className="product-page-description">{product.description}</p>
                </div>

                {/* Highlights */}
                <div className="product-highlights">
                  <div className="highlight-item">
                    <span className="highlight-dot"></span>
                    <span>Handmade artisanal design with organic textures</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-dot"></span>
                    <span>Eco-conscious plastic-free sustainable packaging</span>
                  </div>
                  <div className="highlight-item">
                    <span className="highlight-dot"></span>
                    <span>Complimentary safe delivery across India</span>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="product-actions-section">
                  <div className="quantity-selector-group">
                    <label htmlFor="product-qty-input" className="quantity-label">
                      Quantity
                    </label>
                    <div className="quantity-selector">
                      <button
                        type="button"
                        onClick={handleDecrease}
                        disabled={quantity <= 1}
                        className="qty-btn"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span id="product-qty-input" className="qty-value" aria-live="polite">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={handleIncrease}
                        className="qty-btn"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="action-buttons-group">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="add-to-cart-btn"
                    >
                      Add to Cart — ₹{(product.price * quantity).toLocaleString('en-IN')}
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleWishlist}
                      className={`wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
                      aria-label="Add to wishlist"
                    >
                      {isWishlisted ? '♥ In Wishlist' : '♡ Add to Wishlist'}
                    </button>
                  </div>
                </div>

                {/* Back to Shop Link */}
                <div className="product-back-link-wrap">
                  <a href="/shop" className="back-to-shop-link">
                    ← Back to Shop
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
