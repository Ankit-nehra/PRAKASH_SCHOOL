
import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import schoolImage from "../assets/images/school-building.png";

function About() {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const { data } = await axios.get("/achievements");
      setAchievements(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="pt-20 max-w-7xl mx-auto px-6 py-12 space-y-16">

        {/* Hero */}
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
              className="rounded-lg shadow-lg w-full"
            />

          </div>

        </section>

        {/* Mission Vision */}

        <section className="grid md:grid-cols-2 gap-10">

          <div className="bg-gray-50 p-6 rounded-lg shadow">

            <h2 className="text-2xl font-semibold text-blue-900 mb-3">
              Our Mission
            </h2>

            <p className="text-gray-700">
              To provide an environment that nurtures curiosity,
              creativity and critical thinking, preparing students
              to become responsible global citizens.
            </p>

          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow">

            <h2 className="text-2xl font-semibold text-blue-900 mb-3">
              Our Vision
            </h2>

            <p className="text-gray-700">
              To be recognized as a leading educational institution
              committed to excellence, integrity and holistic
              development.
            </p>

          </div>

        </section>

        {/* ACHIEVEMENTS */}

        <section>

          <h2 className="text-3xl font-bold text-blue-900 text-center mb-10">
            Our Achievements
          </h2>

          {loading ? (

            <div className="flex justify-center items-center py-20">

              <div className="w-14 h-14 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>

            </div>

          ) : achievements.length === 0 ? (

            <p className="text-center text-gray-500">
              No achievements available.
            </p>

          ) : (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {achievements.map((item) => (

                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition"
                >

                  {item.image && (

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-56 object-cover"
                    />

                  )}

                  <div className="p-5">

                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {item.category}
                    </span>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mb-4">
                      {item.description}
                    </p>

                    {item.studentName && (

                      <p className="text-sm mb-1">

                        <span className="font-semibold">
                          Student :
                        </span>{" "}
                        {item.studentName}

                      </p>

                    )}

                    {item.studentClass && (

                      <p className="text-sm mb-1">

                        <span className="font-semibold">
                          Class :
                        </span>{" "}
                        {item.studentClass}

                      </p>

                    )}

                    {item.achievementDate && (

                      <p className="text-sm text-gray-500 mt-3">

                        📅{" "}
                        {new Date(
                          item.achievementDate
                        ).toLocaleDateString("en-IN")}

                      </p>

                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

      </div>

      <Footer />

    </div>
  );
}

export default About;
