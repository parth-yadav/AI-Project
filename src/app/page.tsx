"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../lib/useAuth";
import Hero from "@/components/Hero";
import PopularProducts from "@/components/PopularProducts";
import Collections from "@/components/Collections";
import Promotions from "@/components/Promotions";
import LoyaltyBonus from "@/components/LoyaltyBonus";
import BrandStory from "@/components/BrandStory";
import Loader from "@/components/Loader";

export default function Home() {
  const { user } = useAuth();
  const [heroData, setHeroData] = useState<any>(null);
  const [collectionData, setCollectionData] = useState<any>(null);
  const [featuredData, setFeaturedData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from APIs
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch Hero Data
        const heroResponse = await fetch("/api/admin/landingpage/hero");
        const hero = await heroResponse.json();
        setHeroData(hero);

        // Fetch Collection Data
        const collectionResponse = await fetch(
          "/api/admin/landingpage/collection"
        );
        const collections = await collectionResponse.json();
        setCollectionData(collections);

        // Fetch Featured Data
        const featuredResponse = await fetch("/api/admin/landingpage/featured");
        const featured = await featuredResponse.json();
        setFeaturedData(featured);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (!user) return null; // Prevents flickering

  if (loading) {
    return <div className="">
      <Loader />
     </div>;
  }

  return (
    <>
      {/* Hero Section */}
      <Hero data={heroData} />

      {/* Popular Products Section */}
      <PopularProducts />

      {/* Collections Section */}
      <Collections data={collectionData} />

      {/* Promotions Section */}
      <Promotions data={featuredData} />

      {/* Featured Products Section */}
      <LoyaltyBonus />

      {/* Brand Story Section */}
      <BrandStory />
    </>
  );
}
