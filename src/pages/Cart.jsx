import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
  getCartTotalCount,
  getCartSubtotal,
} from '../utils/cart';
import './Cart.css';

export default function Cart({ onOpenSearch }) {
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

  const syncCart = () => {
    setCartItems(getCart());
  };

  useEffect(() => {
    syncCart();
    window.addEventListener('cart-updated', syncCart);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      window.removeEventListener('cart-updated', syncCart);
    };
  }, []);

  const handleDecrease = (productId, currentQty) => {
    if (currentQty > 1) {
      updateCartQuantity(productId, currentQty - 1);
    }
  };

  const handleIncrease = (productId, currentQty) => {
    updateCartQuantity(productId, currentQty + 1);
  };

  const handleRemove = (productId, itemName) => {
    removeFromCart(productId);
    setToastMessage(`Removed ${itemName} from cart`);
    setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  const handleCheckout = () => {
    setToastMessage('Checkout will be available soon.');
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const totalCount = getCartTotalCount();
  const subtotal = getCartSubtotal();

  return (
    <div className="cart-page">
      <Navbar onOpenSearch={onOpenSearch} />

      <main className="cart-main">
        <div className="cart-container">
          {/* Breadcrumb Navigation */}
          <nav className="cart-breadcrumb" aria-label="Breadcrumb">
            <a href="/" className="breadcrumb-link">Home</a>
            <span className="breadcrumb-separator">/</span>
            <a href="/shop" className="breadcrumb-link">Shop</a>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current" aria-current="page">Cart</span>
          </nav>

          {/* Toast Notification */}
          {toastMessage && (
            <div className="cart-toast" role="status" aria-live="polite">
              <span className="toast-icon">ℹ</span>
              <span>{toastMessage}</span>
            </div>
          )}

          <header className="cart-header">
            <span className="cart-tag">SHOPPING BAG</span>
            <h1 className="cart-title">YOUR CART</h1>
            <p className="cart-subtitle">
              {cartItems.length > 0
                ? `You have ${totalCount} ${totalCount === 1 ? 'item' : 'items'} in your cart.`
                : 'Your cart is currently empty.'}
            </p>
          </header>

          {cartItems.length === 0 ? (
            /* Empty Cart View */
            <div className="cart-empty-state">
              <div className="cart-empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <h2 className="cart-empty-title">Your cart is empty.</h2>
              <p className="cart-empty-text">
                Explore our thoughtful collections and bring mindful objects into your living space.
              </p>
              <a href="/shop" className="cart-continue-btn">
                CONTINUE SHOPPING
              </a>
            </div>
          ) : (
            /* Cart Content Layout */
            <div className="cart-layout-grid">
              {/* Cart Items List */}
              <div className="cart-items-column">
                <div className="cart-items-header">
                  <span className="header-product">Product</span>
                  <span className="header-price">Price</span>
                  <span className="header-qty">Quantity</span>
                  <span className="header-subtotal">Subtotal</span>
                </div>

                <div className="cart-items-list" role="list">
                  {cartItems.map((item) => {
                    const itemTotal = item.price * (item.quantity || 1);
                    return (
                      <div key={item.id} className="cart-item-row" role="listitem">
                        {/* Product Info */}
                        <div className="cart-item-product">
                          <a href={`/product/${item.id}`} className="cart-item-img-link">
                            <img src={item.image} alt={item.name} className="cart-item-img" />
                          </a>
                          <div className="cart-item-info">
                            <span className="cart-item-category">{item.categoryName}</span>
                            <a href={`/product/${item.id}`} className="cart-item-name">
                              {item.name}
                            </a>
                            <button
                              type="button"
                              onClick={() => handleRemove(item.id, item.name)}
                              className="cart-item-remove-btn"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              ✕ Remove
                            </button>
                          </div>
                        </div>

                        {/* Unit Price */}
                        <div className="cart-item-unit-price">
                          <span className="mobile-col-label">Price:</span>
                          <span>₹{item.price.toLocaleString('en-IN')}</span>
                        </div>

                        {/* Quantity Stepper */}
                        <div className="cart-item-quantity">
                          <span className="mobile-col-label">Qty:</span>
                          <div className="cart-qty-stepper">
                            <button
                              type="button"
                              onClick={() => handleDecrease(item.id, item.quantity)}
                              disabled={item.quantity <= 1}
                              className="cart-qty-btn"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="cart-qty-num">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => handleIncrease(item.id, item.quantity)}
                              className="cart-qty-btn"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Subtotal */}
                        <div className="cart-item-total-price">
                          <span className="mobile-col-label">Total:</span>
                          <span className="subtotal-amount">₹{itemTotal.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="cart-items-actions">
                  <a href="/shop" className="cart-back-shop-link">
                    ← Continue Shopping
                  </a>
                </div>
              </div>

              {/* Order Summary Sidebar */}
              <aside className="cart-summary-column" aria-label="Order Summary">
                <div className="cart-summary-card">
                  <h2 className="summary-title">Order Summary</h2>

                  <div className="summary-rows">
                    <div className="summary-row">
                      <span className="summary-row-label">Total Items</span>
                      <span className="summary-row-value">{totalCount}</span>
                    </div>

                    <div className="summary-row">
                      <span className="summary-row-label">Subtotal</span>
                      <span className="summary-row-value">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>

                    <div className="summary-row">
                      <span className="summary-row-label">Shipping</span>
                      <span className="summary-row-value free-shipping">Complimentary</span>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-row summary-total-row">
                      <span className="summary-total-label">Estimated Total</span>
                      <span className="summary-total-price">₹{subtotal.toLocaleString('en-IN')}</span>
                    </div>

                    <span className="summary-tax-note">Taxes calculated and included</span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="checkout-btn"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="summary-security-note">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                    <span>Secure encrypted checkout</span>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
