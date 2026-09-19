import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Preloader } from './components/preloader/Preloader';
import { CustomCursor } from './components/cursor/CustomCursor';
import { Navbar } from './components/navigation/Navbar';
import { FullScreenMenu } from './components/navigation/FullScreenMenu';
import { HeroExperience } from './components/hero/HeroExperience';
import { CollectionSection } from './components/collection/CollectionSection';
import { ProductGallery3D } from './components/gallery/ProductGallery3D';
import { OutfitComparison } from './components/comparison/OutfitComparison';
import { AIStyleStudio } from './components/style-studio/AIStyleStudio';
import { LookBuilder } from './components/look-builder/LookBuilder';
import { SmartSizeGuide } from './components/size-guide/SmartSizeGuide';
import { TrendingHorizontal } from './components/trending/TrendingHorizontal';
import { EditorialCollage } from './components/social/EditorialCollage';
import { StoreLocator } from './components/stores/StoreLocator';
import { InnerCircleLoyalty } from './components/loyalty/InnerCircleLoyalty';
import { CartDrawer } from './components/commerce/CartDrawer';
import { QuickViewModal } from './components/commerce/QuickViewModal';
import { WishlistModal } from './components/commerce/WishlistModal';
import { SearchModal } from './components/commerce/SearchModal';
import { Footer } from './components/footer/Footer';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  // Initialize Lenis smooth inertial scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    setLenisInstance(lenis);

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (lenisInstance) {
      lenisInstance.scrollTo(`#${sectionId}`, { offset: -60, duration: 1.4 });
    } else {
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-obsidian text-ivory selection:bg-champagne selection:text-obsidian">
      {/* 35mm film grain overlay */}
      <div className="film-grain" />

      {/* Luxury Custom Dynamic Cursor */}
      <CustomCursor />

      {/* Cinematic Opening Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Floating Dynamic Navbar */}
      <Navbar
        onOpenMenu={() => setIsMenuOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Full-Screen Editorial Menu */}
      <FullScreenMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Main Experience Stream */}
      <main className="relative z-10">
        {/* Section 01: Hero 3D Experience */}
        <HeroExperience
          onExploreClick={() => handleNavigate('collection')}
          onEnterExperience={() => handleNavigate('gallery')}
        />

        {/* Section 02: Permanent Archival Collection (01 — 06) */}
        <CollectionSection />

        {/* Section 03: 3D Turntable & Material Inspection */}
        <ProductGallery3D />

        {/* Section 04: Before & After Outfit Transformation Matrix */}
        <OutfitComparison />

        {/* Section 05: AI Style Studio */}
        <AIStyleStudio />

        {/* Section 06: Complete Look Builder Studio */}
        <LookBuilder />

        {/* Section 07: Smart Precision Fit Algorithm */}
        <SmartSizeGuide />

        {/* Section 08: Trending Editorial Horizontal Momentum Scroll */}
        <TrendingHorizontal />

        {/* Section 09: Asymmetric Visual Diary & Lookbook Collage */}
        <EditorialCollage />

        {/* Section 10: Global Flagship Boutiques Locator */}
        <StoreLocator />

        {/* Section 11: The Inner Circle VIP Loyalty Ecosystem */}
        <InnerCircleLoyalty />
      </main>

      {/* Architectural Brand Footer */}
      <Footer />

      {/* Commerce Overlays */}
      <CartDrawer />
      <QuickViewModal />
      <WishlistModal />
      <SearchModal />
    </div>
  );
};
