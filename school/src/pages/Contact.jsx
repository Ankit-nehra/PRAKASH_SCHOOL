import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

function Contact() {
  return (
    <div>
      <Navbar />

      {/* Hero / Intro */}
{/* Hero / Intro */}
<section className="bg-blue-50 py-16 pt-32">
  <div className="max-w-4xl mx-auto text-center px-6">
    <h1 className="text-4xl font-bold text-blue-900 mb-4">Get in Touch</h1>
    <p className="text-gray-700">
      We would love to hear from you! Reach out to us for inquiries, feedback, or admissions.
    </p>
  </div>
</section>

      {/* Contact Form & Info */}
      <section className="py-12 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Send a Message</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button
              type="submit"
              className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4 bg-blue-50 p-6 rounded-lg shadow">
            <FaMapMarkerAlt className="text-blue-900 text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Address</h3>
              <p>Hari Nagar, Panipat, Haryana, India</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-blue-50 p-6 rounded-lg shadow">
            <FaEnvelope className="text-blue-900 text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Email</h3>
              <p>info@myschool.com</p>
            </div>
          </div>

          <div className="flex items-start gap-4 bg-blue-50 p-6 rounded-lg shadow">
            <FaPhone className="text-blue-900 text-2xl mt-1" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Phone</h3>
              <p>+91 12345 67890</p>
            </div>
          </div>

          {/* Google Map */}
          <div className="mt-6 w-full h-64 rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="School Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.859485482546!2d76.966380875082!3d29.391879482021603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb7e89d3f8b21%3A0x5f52d27bca6aa9d4!2sHari%20Nagar%2C%20Panipat%2C%20Haryana%2C%20India!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              className="border-0"
            ></iframe>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}

export default Contact;