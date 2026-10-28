"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/HomeHero";
import FeaturedStaysSection from "@/components/FeaturedStaysSection";
import WhyBookDirect from "@/components/WhyBookDirect";
import LucknowNeighborhoods from "@/components/LucknowNeighborhoods";
import HostPmsSpotlight from "@/components/HostPmsSpotlight";
import Testimonials from "@/components/Testimonials";
import MobileAppBanner from "@/components/MobileAppBanner";
import FaqSection from "@/components/FaqSection";
import CtaBanner from "@/components/CtaBanner";
import FloatingWidget from "@/components/FloatingWidget";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchCriteria, setSearchCriteria] = useState<{
    location: string;
    guests: number;
    category: string;
  } | null>(null);

  const handleHeroSearch = (criteria: { location: string; guests: number; category: string }) => {
    setSearchCriteria(criteria);
  };

  const handleSelectCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (searchCriteria) {
      setSearchCriteria({ ...searchCriteria, category: cat });
    }
  };

  const handleSelectNeighborhood = (locId: string) => {
    setSelectedCategory(locId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#ff2800]/10 selection:text-[#ff2800]">
      <Navbar showBanner={true} />
      
      <main className="flex-grow">
        {/* Luxury Hero & Search Capsule */}
        <HomeHero
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onSearch={handleHeroSearch}
        />

        {/* 18 Curated Residences Showcase (Direct on Homepage!) */}
        <FeaturedStaysSection
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          searchCriteria={searchCriteria}
        />

        {/* Why Book Directly with Homey India (0% Fee, 2-Way Lock, Concierge) */}
        <WhyBookDirect />

        {/* Neighborhood Guides: Explore Lucknow */}
        <LucknowNeighborhoods
          onSelectNeighborhood={handleSelectNeighborhood}
        />

        {/* Host Channel Manager & PMS Spotlight */}
        <HostPmsSpotlight />

        {/* Real Guest & Host Testimonials */}
        <Testimonials />

        {/* Mobile Experience & PWA Install */}
        <MobileAppBanner />

        {/* FAQ Section */}
        <FaqSection />

        {/* High Conversion CTA Banner */}
        <CtaBanner />
      </main>

      <FloatingWidget />
      <Footer />
    </div>
  );
}
