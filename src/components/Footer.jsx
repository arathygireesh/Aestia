import React, { useState } from 'react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="aestia-footer">
      <div className="footer-container">
        {/* Main Footer Grid */}
        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <a href="/" className="footer-logo">
              AESTIA
            </a>
            <p className="footer-brand-tagline">
              "Make your space feel like you."
            </p>
          </div>

          {/* Shop Links Column */}
          <div className="footer-col">
            <h3 className="footer-col-title">SHOP</h3>
            <ul className="footer-links-list">
              <li><a href="/shop" className="footer-link">Shop All</a></li>
              <li><a href="/shop?category=home-decor" className="footer-link">Home Decor</a></li>
              <li><a href="/shop?category=lighting" className="footer-link">Lighting</a></li>
              <li><a href="/shop?category=plants" className="footer-link">Plants</a></li>
              <li><a href="/shop?category=kitchen" className="footer-link">Kitchen</a></li>
              <li><a href="/shop?category=gifts" className="footer-link">Gifts</a></li>
            </ul>
          </div>

          {/* Help Links Column */}
          <div className="footer-col">
            <h3 className="footer-col-title">HELP</h3>
            <ul className="footer-links-list">
              <li><a href="/about" className="footer-link">About Us</a></li>
              <li><a href="/contact" className="footer-link">Contact</a></li>
              <li><a href="#shipping" className="footer-link">Shipping & Returns</a></li>
              <li><a href="#faqs" className="footer-link">FAQs</a></li>
            </ul>
          </div>

          {/* Follow Links Column */}
          <div className="footer-col">
            <h3 className="footer-col-title">FOLLOW</h3>
            <ul className="footer-links-list">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="footer-link">Pinterest</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-newsletter-col">
            <h3 className="footer-col-title">STAY INSPIRED</h3>
            <p className="footer-newsletter-desc">
              Get occasional notes on beautiful spaces, new collections and little things we love.
            </p>

            {isSubscribed ? (
              <div className="footer-subscribed-msg" role="status">
                <span className="subscribed-check">✓</span>
                <span>Thank you for subscribing.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="footer-newsletter-form">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="footer-email-input"
                  required
                  aria-label="Your email address"
                />
                <button type="submit" className="footer-subscribe-btn">
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Area */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            © 2026 AESTIA. All rights reserved.
          </div>
          <div className="footer-legal-links">
            <a href="#privacy" className="footer-legal-link">Privacy Policy</a>
            <span className="legal-separator">|</span>
            <a href="#terms" className="footer-legal-link">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
