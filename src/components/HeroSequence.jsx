import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroSequence.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;

export default function HeroSequence() {
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);

  // Helper to format frame filename: ezgif-frame-001.jpg ... ezgif-frame-240.jpg
  const getFramePath = (index) => {
    const frameNum = String(index + 1).padStart(3, '0');
    return `/hero-frames/ezgif-frame-${frameNum}.jpg`;
  };

  // Render a specific frame index directly to the HTML5 Canvas
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    if (w === 0 || h === 0) return;

    const clampedIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, index));
    currentFrameRef.current = clampedIndex;
    const img = imagesRef.current[clampedIndex];

    if (img && img.complete && img.naturalWidth !== 0) {
      // Cover fit calculation for 16:9 frame onto canvas
      const imgW = img.naturalWidth || 1280;
      const imgH = img.naturalHeight || 720;
      const scale = Math.max(w / imgW, h / imgH);
      const x = (w - imgW * scale) / 2;
      const y = (h - imgH * scale) / 2;

      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, x, y, imgW * scale, imgH * scale);
    }
  };

  // 1. Preload all 240 frames
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages = new Array(TOTAL_FRAMES);

    const onImageLoaded = () => {
      loadedCount++;
      const currentProgress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      setProgress(currentProgress);

      if (loadedCount >= TOTAL_FRAMES) {
        setLoading(false);
      }
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedImages[i] = img;
        onImageLoaded();
      };
      img.onerror = () => {
        loadedImages[i] = img;
        onImageLoaded();
      };
    }

    imagesRef.current = loadedImages;
  }, []);

  // 2. Setup ScrollTrigger and Canvas sizing once preloading is complete
  useEffect(() => {
    if (loading) return;

    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = w * dpr;
      canvas.height = h * dpr;

      renderFrame(currentFrameRef.current);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Initial render of Frame 1 (index 0)
    renderFrame(0);

    // GSAP ScrollTrigger configuration:
    // Pins sticky wrapper throughout the 500vh container, mapping scroll progress to frame index
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: stickyRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pinSpacing: false,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(self.progress * (TOTAL_FRAMES - 1)))
          );
          renderFrame(frameIndex);
        },
      });

      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [loading]);

  return (
    <div className="hero-scroll-container" ref={containerRef}>
      {loading && (
        <div className="hero-loading-overlay">
          <div className="hero-loader-content">
            <span className="loader-brand">AESTIA</span>
            <div className="loader-bar-bg">
              <div
                className="loader-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="loader-percentage">{progress}%</span>
            <span className="loader-subtitle">Loading frames...</span>
          </div>
        </div>
      )}

      <div className="hero-sticky-wrapper" ref={stickyRef}>
        <canvas className="hero-canvas" ref={canvasRef} />

        <div className="hero-content-overlay">
          <div className="hero-text-container">
            <p className="hero-tagline-small">CURATED INTERIORS & OBJECTS</p>
            <h1 className="hero-title">
              MAKE YOUR SPACE<br />
              <span>FEEL LIKE YOU.</span>
            </h1>
            <p className="hero-description">
              Discover beautiful little things,<br />
              curated for your everyday aesthetic.
            </p>
            <div className="hero-actions">
              <button className="btn-primary">
                EXPLORE COLLECTION
              </button>
            </div>
          </div>
          
          <div className="hero-scroll-indicator">
            <span className="scroll-dot" />
            <span className="scroll-text">SCROLL TO DISCOVER</span>
          </div>
        </div>
      </div>
    </div>
  );
}
