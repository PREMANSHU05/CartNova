import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import RecentlyViewed from "../components/RecentlyViewed";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main className="home-page">
      <Hero />

      <Categories />

      <FeaturedProducts />

      <RecentlyViewed />

      <Footer />
    </main>
  );
};

export default Home;
