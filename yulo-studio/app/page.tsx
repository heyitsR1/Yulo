import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClickScrollSection from "@/components/ClickScrollSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ClickScrollSection />
    </main>
  );
}
