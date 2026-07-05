import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import StatsSection from "../components/home/StatsCounter";

// Local images
import classroomImage from "../assets/images/classroom1.png";
import teacher1 from "../assets/images/teacher1.png";
import teacher2 from "../assets/images/teacher2.png";
import teacher3 from "../assets/images/teacher3.png";
import teacher4 from "../assets/images/teacher4.png";

function Academics() {
  const curriculum = [
    {
      title: "Primary School",
      description: "Foundation years with focus on literacy, numeracy, creativity, and social skills.",
      icon: "📚",
    },
    {
      title: "Middle School",
      description: "Developing critical thinking, in-depth knowledge across subjects, and co-curricular skills.",
      icon: "🧮",
    },
    {
      title: "Senior School",
      description: "Advanced programs preparing students for higher education and competitive exams.",
      icon: "🎓",
    },
  ];

  const activities = [
    { title: "Sports", description: "Encouraging teamwork and physical fitness.", icon: "🏀" },
    { title: "Arts & Music", description: "Developing creativity and expression.", icon: "🎨" },
    { title: "Clubs & Societies", description: "Fostering leadership and collaboration.", icon: "🤝" },
  ];

  const departments = [
    { name: "Science Department", desc: "Physics, Chemistry, Biology", img: teacher1 },
    { name: "Mathematics Department", desc: "Math & Computer Science", img: teacher2 },
    { name: "Languages", desc: "English, Hindi, French", img: teacher3 },
    { name: "Arts & Music", desc: "Visual Arts, Music, Drama", img: teacher4 },
  ];

  return (
    <div>
      <Navbar />

      {/* Hero / Intro */}
      <section className="grid md:grid-cols-2 gap-10 items-center pt-20 max-w-7xl mx-auto px-6">
        <div>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Our Academic Excellence</h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            At ABC Public School, we provide a comprehensive curriculum that fosters academic excellence, creativity, and holistic development. Our students excel in both academics and co-curricular activities.
          </p>
        </div>
        <div>
          <img src={classroomImage} alt="Classroom" className="w-full rounded-lg shadow-lg" />
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Curriculum</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {curriculum.map((item, idx) => (
            <div key={idx} className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-xl transition">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{item.icon}</span>
                <h3 className="text-2xl font-semibold text-blue-900">{item.title}</h3>
              </div>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Departments / Faculty */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Departments & Faculty</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {departments.map((dept, idx) => (
            <div key={idx} className="p-6 bg-white rounded-lg shadow hover:shadow-xl transition text-center">
              <img
                src={dept.img}
                alt={dept.name}
                className="w-32 h-32 mx-auto mb-4 rounded-full object-cover shadow-lg"
              />
              <h3 className="text-xl font-semibold mb-2">{dept.name}</h3>
              <p className="text-gray-700 text-sm">{dept.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Activities / Extra-curricular */}
      <section className="py-12 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">Extra-Curricular Activities</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {activities.map((item, idx) => (
            <div key={idx} className="p-6 bg-gray-50 rounded-lg shadow hover:shadow-xl transition text-center">
              <span className="text-5xl mb-3 block">{item.icon}</span>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Call to Action */}
      <section className="text-center bg-gray-100 py-12 rounded-lg my-12 mx-6 md:mx-auto max-w-2xl">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Join Our School Community</h2>
        <p className="text-gray-700 mb-6">
          Discover a place where students grow academically and personally.
        </p>
      <Link to="/admission">
        <button className="bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-800 transition">
          Apply for Admission
        </button>
       </Link>
      </section>

      <Footer />
    </div>
  );
}

export default Academics;