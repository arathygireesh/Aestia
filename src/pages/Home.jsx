import React from 'react';
import Navbar from '../components/Navbar';
import HeroSequence from '../components/HeroSequence';
import ShopByCategory from '../components/ShopByCategory';
import './Home.css';

export default function Home({ onOpenSearch }) {
  return (
    <div className="home-page">
      <Navbar onOpenSearch={onOpenSearch} />
      <main>
        {/* Pinned 240-Frame Scroll Sequence (500vh) */}
        <HeroSequence />

        {/* Shop By Category Section */}
        <ShopByCategory />
      </main>
    </div>
  );
}
