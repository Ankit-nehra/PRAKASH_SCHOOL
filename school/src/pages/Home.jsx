import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import NoticeBoard from "../components/home/NoticeBoard";
import AcademicsSection from "../components/home/AcademicsSection";
import GalleryPreview from "../components/home/GalleryPreview"; 
import PrincipalMessage from "../components/home/PrincipalMessage";
import StatsCounter from "../components/home/StatsCounter";

function Home() {
  return (
    <div>

      <Navbar />

      <Hero />

      <AboutPreview />

      <NoticeBoard />

      <StatsCounter />

      <AcademicsSection />

      <GalleryPreview />

      <PrincipalMessage />

      <Footer />

    </div>
  );
}

export default Home;