import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Academics", path: "/academics" },
    { name: "Admission", path: "/admission" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];

  const loginLinks = [
    { name: "Student", path: "/student" },
    { name: "Teacher", path: "/teacher" },
    { name: "Admin", path: "/admin" },
  ];

  const isLoginActive = loginLinks.some(
    (item) => location.pathname === item.path
  );

  return (
    <nav className="bg-blue-900 text-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/school-logo.png"
            alt="Prakash Public School Logo"
            className="h-10 w-10 object-contain"
          />

          <h1 className="text-lg md:text-xl font-bold">
            PRAKASH PUBLIC SCHOOL
          </h1>
        </Link>


        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 font-medium items-center">

          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`hover:text-yellow-400 transition ${
                  location.pathname === link.path
                    ? "border-b-2 border-yellow-400"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}


          {/* Login Dropdown */}
          <li className="relative">

            <button
              onClick={() => setLoginOpen(!loginOpen)}
              className={`hover:text-yellow-400 transition ${
                isLoginActive
                  ? "border-b-2 border-yellow-400"
                  : ""
              }`}
            >
              Login ▾
            </button>


            {loginOpen && (
              <ul className="absolute right-0 mt-3 w-40 bg-white text-black rounded-md shadow-lg overflow-hidden">

                {loginLinks.map((item) => (
                  <li key={item.path}>

                    <Link
                      to={item.path}
                      onClick={() => setLoginOpen(false)}
                      className={`block px-4 py-2 transition ${
                        location.pathname === item.path
                          ? "bg-yellow-400 text-black"
                          : "hover:bg-yellow-400"
                      }`}
                    >
                      {item.name}
                    </Link>

                  </li>
                ))}

              </ul>
            )}

          </li>

        </ul>


        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >

            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >

              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}

            </svg>

          </button>

        </div>

      </div>



      {/* Mobile Menu */}
      {isOpen && (

        <ul className="md:hidden bg-blue-900 px-6 pb-4 space-y-3">


          {links.map((link) => (

            <li key={link.path}>

              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block hover:text-yellow-400 transition ${
                  location.pathname === link.path
                    ? "border-l-4 border-yellow-400 pl-2"
                    : ""
                }`}
              >
                {link.name}
              </Link>

            </li>

          ))}



          {/* Mobile Login Dropdown */}

          <li>

            <button
              onClick={() => setLoginOpen(!loginOpen)}
              className={`hover:text-yellow-400 transition ${
                isLoginActive
                  ? "border-b-2 border-yellow-400"
                  : ""
              }`}
            >
              Login ▾
            </button>



            {loginOpen && (

              <ul className="ml-4 mt-2 space-y-2">

                {loginLinks.map((item) => (

                  <li key={item.path}>

                    <Link
                      to={item.path}
                      onClick={() => {
                        setLoginOpen(false);
                        setIsOpen(false);
                      }}

                      className={`block transition ${
                        location.pathname === item.path
                          ? "text-yellow-400 border-l-4 border-yellow-400 pl-2"
                          : "hover:text-yellow-400"
                      }`}
                    >
                      {item.name}
                    </Link>

                  </li>

                ))}

              </ul>

            )}

          </li>


        </ul>

      )}

    </nav>
  );
}

export default Navbar;
