import AboutUs from "@/components/modules/Home/AboutUs";
import HeroSection from "@/components/modules/Home/Hero";
import FeaturedProperties from "@/components/modules/Home/Featured";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProperties />
      <AboutUs />
    </div>
  );
}
