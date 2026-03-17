import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

        {/* About / Logo */}
        <div>
          <h1 className="text-xl font-bold mb-4">My School</h1>
          <p className="text-gray-200 leading-relaxed">
            Providing quality education and nurturing students to become
            confident, responsible, and compassionate leaders of tomorrow.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-yellow-400 transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400 transition">About</Link></li>
            <li><Link to="/academics" className="hover:text-yellow-400 transition">Academics</Link></li>
            <li><Link to="/admission" className="hover:text-yellow-400 transition">Admission</Link></li>
            <li><Link to="/gallery" className="hover:text-yellow-400 transition">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-200">123 School Street, City, Country</p>
          <p className="text-gray-200">Email: info@myschool.com</p>
          <p className="text-gray-200">Phone: +1 234 567 890</p>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-blue-800 mt-6 py-4 text-center text-gray-300 text-sm">
        © 2026 My School. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;