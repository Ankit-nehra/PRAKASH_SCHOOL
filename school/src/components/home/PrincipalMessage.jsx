import { Link } from "react-router-dom";
import principalImage from "../../assets/images/principal.jpeg";

function PrincipalMessage() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src={principalImage}
            alt="Principal"
            className="w-72 h-72 md:w-80 md:h-80 object-contain rounded-full shadow-lg"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">
            Message from Our Principal
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Welcome to our school! We are committed to providing a nurturing
            and inspiring environment for all our students. Our focus is on
            academic excellence, personal growth, and developing lifelong
            skills. We believe in shaping confident, responsible, and
            compassionate future leaders.
          </p>

          <Link to="/about">
            <button className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              Read More
            </button>
          </Link>
        </div>

      </div>
    </section>
  );
}

export default PrincipalMessage;