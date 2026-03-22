import HeroSection from "./HeroSection";
import ExploreSection from "./ExploreSection";
import FeaturedDestinations from "./FeaturedDestinations";
import BlogSection from "./BlogSection";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <HeroSection />
      <ExploreSection />
      <FeaturedDestinations />
      <BlogSection />
    </div>
  );
}
