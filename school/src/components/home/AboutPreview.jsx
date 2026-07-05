import { Link } from "react-router-dom";
import schoolImage from "../../assets/images/school.png";

function AboutPreview() {
  return (
    <section className="py-16 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        {/* Image */}
        <div>
          <img
            src={schoolImage}
            alt="School Building"
            className="rounded-lg shadow-lg w-full"
          />
        </div>

        {/* Content */}
        <div>

          <h2 className="text-3xl font-bold mb-4 text-blue-900">
            About Our School
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Our school is dedicated to providing quality education
            and creating an environment where students grow
            academically, socially, and morally. We aim to build
            confident and responsible citizens for the future.
          </p>

          <Link to="/about">
            <button className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-700">
              Read More
            </button>
          </Link>

        </div>

      </div>

    </section>
  );
}

export default AboutPreview;