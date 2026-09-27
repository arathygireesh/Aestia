import React from 'react';
import './ShopByCategory.css';

const CATEGORIES = [
  {
    id: 'home-decor',
    name: 'Home Decor',
    image: '/images/categories/home-decor.jpg',
    alt: 'Curated minimalist home decor and ceramic vase',
  },
  {
    id: 'lighting',
    name: 'Lighting',
    image: '/images/categories/lighting.jpg',
    alt: 'Warm sculptural ambient paper lamp',
  },
  {
    id: 'plants',
    name: 'Plants',
    image: '/images/categories/plants.jpg',
    alt: 'Lush indoor olive tree in artisanal terracotta planter',
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    image: '/images/categories/kitchen.jpg',
    alt: 'Handcrafted stoneware ceramic dinnerware and kitchenware',
  },
  {
    id: 'gifts',
    name: 'Gifts',
    image: '/images/categories/gifts.jpg',
    alt: 'Thoughtfully wrapped artisan gift box with natural twine',
  },
];

export default function ShopByCategory() {
  const handleCategoryClick = (e, catId) => {
    e.preventDefault();
    window.history.pushState({}, '', `/shop?category=${catId}`);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="shop-category-section" id="categories" aria-labelledby="category-heading">
      <div className="category-container">
        <header className="category-header">
          <h2 id="category-heading" className="category-title">
            SHOP BY CATEGORY
          </h2>
          <p className="category-subtitle">
            Find something that feels like you.
          </p>
        </header>

        <div className="category-grid" role="list">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              onClick={(e) => handleCategoryClick(e, cat.id)}
              className="category-card"
              role="listitem"
              aria-label={`Explore ${cat.name}`}
            >
              <div className="category-image-wrap">
                <img
                  src={cat.image}
                  alt={cat.alt}
                  className="category-image"
                  loading="lazy"
                />
              </div>

              <div className="category-content">
                <h3 className="category-name">{cat.name}</h3>
                <span className="category-explore">
                  Explore <span className="explore-arrow">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
