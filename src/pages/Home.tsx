import Navigation from "@/sections/Navigation";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Menu from "@/sections/Menu";
import Experience from "@/sections/Experience";
import Gallery from "@/sections/Gallery";
import Testimonials from "@/sections/Testimonials";
import Locations from "@/sections/Locations";
import Reservation from "@/sections/Reservation";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import AIChat from "@/components/AIChat";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navigation />
      <Hero />
      <About />
      <Menu />
      <Experience />
      <Gallery />
      <Testimonials />
      <Locations />
      <Reservation />
      <Contact />
      <Footer />
      <AIChat />
    </div>
  );
}
