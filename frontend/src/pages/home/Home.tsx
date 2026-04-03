import HeroSection from "./HeroSection";
import HotToursSection from "./HotToursSection";
import FeaturedDestinations from "./FeaturedDestinations";
import BlogSection from "./BlogSection";

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <HeroSection />
      <HotToursSection />
      <FeaturedDestinations />
      <BlogSection />
    </div>
  );
}
