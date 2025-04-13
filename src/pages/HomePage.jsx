import AboutSection from "../components/AboutSection";
import CTASection from "../components/CTASection";
import FeaturesSection from "../components/FeaturesSection";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import PreviewSection from "../components/PreviewSection";
import TestimonialsSection from "../components/TestimonialSection";
// import Sidebar from "../components/Sidebar";
// import ThoughtFeed from "../components/ThoughtFeed";
// import LiveUserCount from "../components/LiveUserCount";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PreviewSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
      {/* <div className="flex">
        <Sidebar />
        <div className="flex-1 p-1">
          <LiveUserCount />
          <ThoughtFeed />
        </div>
      </div> */}
    </div>
  );
}
