import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import EmailChip from "@/components/EmailChip";
import HeroSection from "@/components/HeroSection";
import ClickScrollSection from "@/components/ClickScrollSection";
import ServicesSection from "@/components/ServicesSection";
import WorkCTA from "@/components/WorkCTA";
import AboutSection from "@/components/AboutSection";
import CTACard from "@/components/CTACard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SmoothScroll />
      <Preloader />
      <EmailChip />
      <Navbar />
      <HeroSection />
      <ClickScrollSection />
      <ServicesSection />
      <WorkCTA />
      <AboutSection />
      <CTACard />
      <Footer />
    </main>
  );
}
