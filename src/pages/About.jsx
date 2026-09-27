import React from 'react';
import Navbar from '../components/Navbar';
import './About.css';

export default function About({ onOpenSearch }) {
  return (
    <div className="about-page">
      <Navbar onOpenSearch={onOpenSearch} />

      <main className="about-main">
        <div className="about-container">
          {/* Header Section */}
          <header className="about-header">
            <span className="about-tag">ABOUT US</span>
            <h1 className="about-title">ABOUT AESTIA</h1>
            <p className="about-intro">"Make your space feel like you."</p>
            <div className="about-story-lead">
              <p>
                AESTIA is a curated lifestyle store inspired by the beauty of simple, thoughtful spaces.
                We bring together little things that make everyday surroundings feel warmer, calmer and more personal.
              </p>
            </div>
          </header>

          {/* Hero Lifestyle Image */}
          <div className="about-hero-image-wrapper">
            <img
              src="/images/about-lifestyle.jpg"
              alt="Warm, serene living space with natural textures, linen sofa and subtle morning sunlight"
              className="about-hero-image"
              loading="lazy"
            />
          </div>

          {/* 3 Simple Pillars Section */}
          <section className="about-sections-grid" aria-label="Brand pillars">
            <div className="about-section-card">
              <span className="about-card-number">01</span>
              <h2 className="about-card-title">OUR STORY</h2>
              <div className="about-card-divider"></div>
              <p className="about-card-text">
                AESTIA was created around a simple idea — your surroundings should feel like you.
              </p>
            </div>

            <div className="about-section-card">
              <span className="about-card-number">02</span>
              <h2 className="about-card-title">WHAT WE CURATE</h2>
              <div className="about-card-divider"></div>
              <p className="about-card-text">
                We bring together carefully selected pieces for your home and everyday moments,
                from decor and lighting to plants, kitchen essentials and thoughtful gifts.
              </p>
            </div>

            <div className="about-section-card">
              <span className="about-card-number">03</span>
              <h2 className="about-card-title">OUR PHILOSOPHY</h2>
              <div className="about-card-divider"></div>
              <p className="about-card-text">
                Beautiful spaces don't need to be complicated. We believe in simple objects,
                natural tones and little details that make a place feel personal.
              </p>
            </div>
          </section>

          {/* Calm Connection Banner */}
          <section className="about-contact-cta">
            <div className="about-cta-content">
              <h3 className="about-cta-title">Connect with Aestia</h3>
              <p className="about-cta-desc">
                Have a question or looking for curated suggestions for your home?
              </p>
              <a href="/contact" className="about-cta-btn">
                GET IN TOUCH <span className="cta-arrow">→</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
