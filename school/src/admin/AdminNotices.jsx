import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import Navbar from "../components/layout/Navbar";

function AdminNotices() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [attachment, setAttachment] = useState(null);
  const [marker, setMarker] = useState(false);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const { data } = await axios.get("/notices");
        setNotices(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchNotices();
  }, []);

  const addNotice = async () => {
    if (!title || !date) return alert("Enter title and date");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("marker", marker);
    if (image) formData.append("image", image);
    if (attachment) formData.append("attachment", attachment);

    try {
      await axios.post("/notices", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTitle("");
      setDescription("");
      setDate("");
      setImage(null);
      setAttachment(null);
      setMarker(false);

      const { data } = await axios.get("/notices");
      setNotices(data);
    } catch (err) {
      console.error(err);
      alert("Failed to add notice");
    }
  };

  const deleteNotice = async (id) => {
    if (!window.confirm("Delete this notice?")) return;

    try {
      await axios.delete(`/notices/${id}`);
      setNotices((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-24 max-w-6xl mx-auto px-6">

        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Notice Management
        </h1>

        {/* Add Notice Form */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-6">Add New Notice</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="font-medium mb-1">Title *</label>
              <input
                className="border p-2 rounded"
                placeholder="Notice title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Date *</label>
              <input
                type="date"
                className="border p-2 rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="font-medium mb-1">Description</label>
              <textarea
                className="border p-2 rounded"
                placeholder="Notice description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Image (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Attachment (PDF, DOCX, optional)</label>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setAttachment(e.target.files[0])}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={marker}
                onChange={(e) => setMarker(e.target.checked)}
              />
              <span className="font-medium">Mark as Important</span>
            </div>

            <div className="flex justify-end md:col-span-2">
              <button
                onClick={addNotice}
                className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition"
              >
                Add Notice
              </button>
            </div>
          </div>
        </div>

        {/* Notices Table */}
        <div className="bg-white shadow-md rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-4">Date</th>
                <th className="p-4">Title</th>
                <th className="p-4">Description</th>
                <th className="p-4">Image</th>
                <th className="p-4">Attachment</th>
                <th className="p-4 text-center">Marker</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {notices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center p-6 text-gray-500">
                    No notices available
                  </td>
                </tr>
              ) : (
                notices.map((n) => (
                  <tr
                    key={n._id}
                    className={`border-b hover:bg-gray-50 transition ${n.marker ? "bg-yellow-50" : ""}`}
                  >
                    <td className="p-4">{n.date}</td>
                    <td className="p-4 font-medium">{n.title}</td>
                    <td className="p-4">{n.description || "-"}</td>
                    <td className="p-4">
                      {n.image ? (
                        <img
                          src={`https://prakash-school-server-ru7x.onrender.com/uploads/${n.image}`}
                          alt="notice"
                          className="h-16 w-16 object-cover rounded"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-4">
                      {n.attachment ? (
                        <a
                          href={`https://prakash-school-server-ru7x.onrender.com/uploads/${n.attachment}`}
                          target="_blank"
                          className="text-blue-700 underline"
                        >
                          {n.attachment}
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {n.marker && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
                          Important
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => deleteNotice(n._id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminNotices;
