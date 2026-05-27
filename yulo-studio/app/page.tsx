import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      {/* Temporary dark section to see nav text */}
      <section className="h-screen bg-gray-mid" />
    </main>
  );
}
