import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Home from "../pages/Home";
import About from "../pages/About";
import Academics from "../pages/Academics";
import Admission from "../pages/Admission";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";

import AdminDashboard from "../admin/AdminDashboard";
import AdminNotices from "../admin/AdminNotices";
import AdminGallery from "../admin/AdminGallery";

import AdminLogin from "../admin/AdminLogin";
import PrivateRoute from "../admin/PrivateRoute";

// Scroll to top on route change
function ScrollToTopHandler() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollToTopHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/notices"
          element={
            <PrivateRoute>
              <AdminNotices />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/gallery"
          element={
            <PrivateRoute>
              <AdminGallery />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;