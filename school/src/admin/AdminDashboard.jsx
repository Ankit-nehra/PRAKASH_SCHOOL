import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // remove JWT
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="pt-24 max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-blue-900">
            Admin Dashboard
          </h1>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          <Link to="/admin/notices">
            <div className="p-8 bg-white shadow-md rounded-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300 border">
              
              <div className="flex items-center gap-4 mb-3">
                <div className="text-3xl">📢</div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Manage Notices
                </h2>
              </div>

              <p className="text-gray-600">
                Add, edit, or delete school notices displayed on the website.
              </p>

            </div>
          </Link>

          <Link to="/admin/gallery">
            <div className="p-8 bg-white shadow-md rounded-xl hover:shadow-2xl hover:-translate-y-1 transition duration-300 border">
              
              <div className="flex items-center gap-4 mb-3">
                <div className="text-3xl">🖼️</div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Manage Gallery
                </h2>
              </div>

              <p className="text-gray-600">
                Upload new images or remove old images from the gallery.
              </p>

            </div>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;