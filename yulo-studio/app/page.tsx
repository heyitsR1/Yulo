import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClickScrollSection from "@/components/ClickScrollSection";
import ServicesSection from "@/components/ServicesSection";
import WorkCTA from "@/components/WorkCTA";
import CTACard from "@/components/CTACard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ClickScrollSection />
      <ServicesSection />
      <WorkCTA />
      <CTACard />
      <Footer />
    </main>
  );
}
