import React from 'react';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import { PRODUCTS, CATEGORIES, COLLECTIONS } from '../data/products';
import './Shop.css';

export default function Shop({
  currentCategory = 'all',
  currentCollection = null,
  onSelectCategory,
  onSelectCollection,
  onOpenSearch,
}) {
  // Check if a collection is active
  const activeCollectionObj = currentCollection
    ? COLLECTIONS.find((c) => c.id.toLowerCase() === currentCollection.toLowerCase())
    : null;

  // Active Category Object
  const activeCategoryObj = (!activeCollectionObj && currentCategory)
    ? (CATEGORIES.find((c) => c.id.toLowerCase() === currentCategory.toLowerCase()) || CATEGORIES[0])
    : (activeCollectionObj ? null : CATEGORIES[0]);

  // Determine filtered products
  let filteredProducts = PRODUCTS;
  let pageTag = 'ALL PRODUCTS';
  let pageTitle = 'SHOP';
  let pageSubtitle = 'Curated objects crafted for tranquility, warmth, and mindful living.';

  if (activeCollectionObj) {
    pageTag = 'COLLECTION';
    pageTitle = activeCollectionObj.name;
    pageSubtitle = activeCollectionObj.description;
    filteredProducts = PRODUCTS.filter(
      (p) =>
        (p.collections && p.collections.includes(activeCollectionObj.id)) ||
        (activeCollectionObj.productIds && activeCollectionObj.productIds.includes(p.id))
    );
  } else if (activeCategoryObj && activeCategoryObj.id !== 'all') {
    pageTag = 'CATEGORY';
    pageTitle = activeCategoryObj.name.toUpperCase();
    pageSubtitle = `Thoughtful selection of ${activeCategoryObj.name.toLowerCase()} designed to elevate your everyday space.`;
    filteredProducts = PRODUCTS.filter(
      (p) => p.category.toLowerCase() === activeCategoryObj.id.toLowerCase()
    );
  }

  const handleCategoryClick = (catId, e) => {
    e.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      const url = catId === 'all' ? '/shop' : `/shop?category=${catId}`;
      window.history.pushState({}, '', url);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  const handleCollectionClick = (collId, e) => {
    e.preventDefault();
    if (onSelectCollection) {
      onSelectCollection(collId);
    } else {
      const url = `/shop?collection=${collId}`;
      window.history.pushState({}, '', url);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  return (
    <div className="shop-page">
      <Navbar onOpenSearch={onOpenSearch} />

      <main className="shop-main">
        <div className="shop-container">
          {/* Header */}
          <header className="shop-header">
            <span className="shop-tag">{pageTag}</span>
            <h1 className="shop-title">{pageTitle}</h1>
            <p className="shop-subtitle">{pageSubtitle}</p>

            {/* Filter Pills */}
            <nav className="shop-filter-bar" aria-label="Filter products">
              {/* All / Category Pills */}
              {CATEGORIES.map((cat) => {
                const isActive = !activeCollectionObj && (activeCategoryObj?.id === cat.id);
                return (
                  <button
                    key={cat.id}
                    onClick={(e) => handleCategoryClick(cat.id, e)}
                    className={`shop-filter-pill ${isActive ? 'active' : ''}`}
                    aria-pressed={isActive}
                  >
                    {cat.name}
                  </button>
                );
              })}

              {/* Active Collection Filter Pill if applicable */}
              {activeCollectionObj && (
                <button
                  onClick={(e) => handleCollectionClick(activeCollectionObj.id, e)}
                  className="shop-filter-pill active"
                  aria-pressed="true"
                >
                  {activeCollectionObj.name} ✕
                </button>
              )}
            </nav>
          </header>

          {/* Product Grid */}
          <div className="shop-product-grid" role="list">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="shop-empty-state">
              <p>No products found for this selection.</p>
              <button
                onClick={(e) => handleCategoryClick('all', e)}
                className="shop-reset-btn"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
