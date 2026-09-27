import React from 'react';
import Navbar from '../components/Navbar';
import { COLLECTIONS } from '../data/products';
import './Collections.css';

export default function Collections({ onOpenSearch }) {
  const handleExplore = (collectionId, e) => {
    e.preventDefault();
    const url = `/shop?collection=${collectionId}`;
    window.history.pushState({}, '', url);
    window.dispatchEvent(new Event('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="collections-page">
      <Navbar onOpenSearch={onOpenSearch} />

      <main className="collections-main">
        <div className="collections-container">
          {/* Header */}
          <header className="collections-header">
            <span className="collections-tag">CURATED SPACES</span>
            <h1 className="collections-title">COLLECTIONS</h1>
            <p className="collections-subtitle">
              "Curated moods for everyday living."
            </p>
          </header>

          {/* 4 Collections Grid */}
          <div className="collections-grid" role="list" aria-label="Collections list">
            {COLLECTIONS.map((collection, index) => (
              <article
                key={collection.id}
                className="collection-card"
                role="listitem"
              >
                <a
                  href={`/shop?collection=${collection.id}`}
                  onClick={(e) => handleExplore(collection.id, e)}
                  className="collection-card-link"
                  aria-label={`Explore ${collection.name} collection`}
                >
                  <div className="collection-image-wrap">
                    <img
                      src={collection.image}
                      alt={`${collection.name} mood - ${collection.description}`}
                      className="collection-image"
                      loading="lazy"
                    />
                    <div className="collection-image-overlay"></div>
                    <span className="collection-index">0{index + 1}</span>
                  </div>

                  <div className="collection-content">
                    <h2 className="collection-name">{collection.name}</h2>
                    <p className="collection-desc">{collection.description}</p>
                    <div className="collection-explore-wrap">
                      <span className="collection-explore-btn">
                        EXPLORE <span className="explore-arrow">→</span>
                      </span>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
