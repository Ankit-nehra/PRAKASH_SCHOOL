import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Local images
import schoolImage from "../assets/images/school-building.png";

function About() {
  return (
    <div>
      <Navbar />

      <div className="pt-20 max-w-7xl mx-auto px-6 py-12 space-y-16">

        {/* Hero / Intro */}
        <section className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
              About Our School
            </h1>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our school has been committed to providing quality education,
              nurturing creativity, and building responsible future leaders.
              We combine academic excellence with co-curricular activities
              to ensure holistic development of every student.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Join us to be part of a vibrant learning community where
              students grow academically, socially, and morally.
            </p>
          </div>

          <div>
            <img
              src={schoolImage}
              alt="School Building"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="grid md:grid-cols-2 gap-10">
          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-3 text-blue-900">Our Mission</h2>
            <p className="text-gray-700">
              To provide an environment that nurtures curiosity, creativity,
              and critical thinking, preparing students to become responsible
              and successful global citizens.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-3 text-blue-900">Our Vision</h2>
            <p className="text-gray-700">
              To be recognized as a leading educational institution committed
              to excellence, integrity, and holistic development of students.
            </p>
          </div>
        </section>

        {/* History / Achievements */}
        <section>
          <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
            Our Achievements
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-blue-50 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">Established 1995</h3>
              <p className="text-gray-700">Over 25 years of academic excellence.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">500+ Students</h3>
              <p className="text-gray-700">A thriving learning community across grades.</p>
            </div>
            <div className="p-6 bg-blue-50 rounded-lg shadow text-center">
              <h3 className="text-xl font-semibold mb-2">Top Academic Awards</h3>
              <p className="text-gray-700">Consistently recognized for excellence in academics and extracurriculars.</p>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}

export default About;