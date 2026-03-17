import { Link } from "react-router-dom";
import HeroImage from "../../assets/images/hero-section.png";

function Hero() {
  return (
    <section className="relative h-[85vh] flex items-center justify-center text-center text-white">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroImage})` }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-blue-900/80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6">

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          Welcome to <span className="text-yellow-400">Our School</span>
        </h1>

        <p className="text-lg md:text-xl text-blue-100 mb-8">
          Empowering young minds with knowledge, creativity, and values to
          build a brighter future.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          {/* Link to Academics Page */}
          <Link
            to="/academics"
            className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 rounded-lg font-semibold transition"
          >
            Explore Academics
          </Link>

          {/* Link to Admission Page */}
          <Link
            to="/admission"
            className="border border-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg font-semibold transition"
          >
            Apply for Admission
          </Link>

        </div>

      </div>

    </section>
  );
}

export default Hero;