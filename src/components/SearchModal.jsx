import React, { useState, useEffect, useRef } from 'react';
import { PRODUCTS } from '../data/products';
import ProductCard from './ProductCard';
import './SearchModal.css';

const POPULAR_SEARCHES = ['Vase', 'Lamp', 'Plant', 'Mug', 'Gift', 'Art'];

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus input when modal opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      // Lock body scroll
      document.body.style.overflow = 'hidden';

      // Handle ESC key press
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = searchTerm.trim().toLowerCase();

  // Filter products by name, category, and description (case-insensitive)
  const results = normalizedQuery
    ? PRODUCTS.filter((product) => {
        const matchName = product.name.toLowerCase().includes(normalizedQuery);
        const matchCategory =
          product.category.toLowerCase().includes(normalizedQuery) ||
          product.categoryName.toLowerCase().includes(normalizedQuery);
        const matchDesc = product.description.toLowerCase().includes(normalizedQuery);

        return matchName || matchCategory || matchDesc;
      })
    : [];

  const handleClear = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (keyword) => {
    setSearchTerm(keyword);
    inputRef.current?.focus();
  };

  const handleViewProduct = (product) => {
    onClose();
    window.history.pushState({}, '', `/product/${product.id}`);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="search-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Search Products">
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="search-header">
          <div className="search-input-container">
            <span className="search-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>

            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product name, category, or description..."
              className="search-input"
              aria-label="Search products"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="search-clear-btn"
                aria-label="Clear search input"
              >
                ✕
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="search-close-btn"
            aria-label="Close search"
          >
            <span className="close-text">Close</span>
            <span className="close-icon">✕</span>
          </button>
        </div>

        {/* Popular / Quick Suggestions */}
        <div className="search-suggestions">
          <span className="suggestions-label">Popular Searches:</span>
          <div className="suggestions-list">
            {POPULAR_SEARCHES.map((item) => (
              <button
                key={item}
                type="button"
                className="suggestion-tag"
                onClick={() => handleSuggestionClick(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Search Content Body */}
        <div className="search-body">
          {normalizedQuery && (
            <div className="search-results-info">
              <span className="results-count">
                {results.length} {results.length === 1 ? 'product' : 'products'} found for "{searchTerm}"
              </span>
            </div>
          )}

          {normalizedQuery && results.length > 0 && (
            <div className="search-results-grid" role="list">
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onViewProduct={handleViewProduct}
                />
              ))}
            </div>
          )}

          {normalizedQuery && results.length === 0 && (
            <div className="search-no-results">
              <div className="no-results-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
              <h3 className="no-results-title">No products found</h3>
              <p className="no-results-text">
                We couldn't find any objects matching "<strong>{searchTerm}</strong>". Try searching for categories like <em>Home Decor</em>, <em>Lighting</em>, <em>Plants</em>, or <em>Kitchen</em>.
              </p>
              <button
                type="button"
                onClick={handleClear}
                className="search-reset-btn"
              >
                Clear Search
              </button>
            </div>
          )}

          {!normalizedQuery && (
            <div className="search-initial-view">
              <span className="initial-hint">Type to start discovering objects for your home.</span>
              <div className="initial-featured">
                <h4 className="featured-heading">All Available Products ({PRODUCTS.length})</h4>
                <div className="search-results-grid" role="list">
                  {PRODUCTS.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onViewProduct={handleViewProduct}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
