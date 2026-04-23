import HeroSection from "./HeroSection";
import ExploreSection from "./TourSection";
import FeaturedDestinations from "./FeaturedDestinations";
import BlogSection from "./BlogSection";
import ThemeBanner from "../../components/theme/ThemeBanner";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <ThemeBanner />
      <HeroSection />
      <ExploreSection />
      <FeaturedDestinations />
      <BlogSection />
    </div>
  );
}
