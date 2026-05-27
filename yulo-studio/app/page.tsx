import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClickScrollSection from "@/components/ClickScrollSection";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ClickScrollSection />
      <ServicesSection />
    </main>
  );
}
