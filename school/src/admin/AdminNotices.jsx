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

  // ✅ Upload + Preview States
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [attachmentPreview, setAttachmentPreview] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const { data } = await axios.get("/notices");
      setNotices(data);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Cleanup preview URLs
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      if (attachmentPreview) URL.revokeObjectURL(attachmentPreview);
    };
  }, [imagePreview, attachmentPreview]);

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
      setUploading(true);
      setUploadProgress(0);

      await axios.post("/notices", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(percent);
        },
      });

      // ✅ Reset form
      setTitle("");
      setDescription("");
      setDate("");
      setImage(null);
      setAttachment(null);
      setMarker(false);
      setImagePreview(null);
      setAttachmentPreview(null);

      fetchNotices();
    } catch (err) {
      console.error(err);
      alert("Failed to add notice");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 500);
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

        {/* FORM */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-10">
          <h2 className="text-xl font-semibold mb-6">Add New Notice</h2>

          <div className="grid md:grid-cols-2 gap-4">

            {/* Title */}
            <div>
              <label className="font-medium">Title *</label>
              <input
                className="border p-2 rounded w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Date */}
            <div>
              <label className="font-medium">Date *</label>
              <input
                type="date"
                className="border p-2 rounded w-full"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="font-medium">Description</label>
              <textarea
                className="border p-2 rounded w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* IMAGE */}
            <div>
              <label className="font-medium">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  if (file) setImagePreview(URL.createObjectURL(file));
                }}
              />

              {image && (
                <div className="mt-3 p-3 border rounded bg-gray-50">
                  <img
                    src={imagePreview}
                    className="w-24 h-24 object-cover rounded mb-2"
                    alt="preview"
                  />
                  <p className="text-sm">{image.name}</p>
                  <p className="text-xs text-gray-500">
                    {(image.size / 1024).toFixed(2)} KB
                  </p>
                  <button
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="mt-2 text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* FILE */}
            <div>
              <label className="font-medium">Attachment</label>
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setAttachment(file);
                  if (file) setAttachmentPreview(URL.createObjectURL(file));
                }}
              />

              {attachment && (
                <div className="mt-3 p-3 border rounded bg-gray-50">
                  <p className="text-sm">{attachment.name}</p>
                  <p className="text-xs text-gray-500">
                    {(attachment.size / 1024).toFixed(2)} KB
                  </p>

                  {attachment.type === "application/pdf" && (
                    <iframe
                      src={attachmentPreview}
                      className="w-full h-32 mt-2 border rounded"
                      title="preview"
                    />
                  )}

                  <button
                    onClick={() => {
                      setAttachment(null);
                      setAttachmentPreview(null);
                    }}
                    className="mt-2 text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Marker */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={marker}
                onChange={(e) => setMarker(e.target.checked)}
              />
              <span>Mark as Important</span>
            </div>

            {/* PROGRESS */}
            {uploading && (
              <div className="md:col-span-2">
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div
                    className="bg-blue-600 h-3"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm mt-1">
                  Uploading: {uploadProgress}%
                </p>
              </div>
            )}

            {/* BUTTON */}
            <div className="md:col-span-2 text-right">
              <button
                onClick={addNotice}
                disabled={uploading}
                className={`px-6 py-2 text-white rounded ${
                  uploading ? "bg-gray-400" : "bg-blue-900 hover:bg-blue-800"
                }`}
              >
                {uploading ? "Uploading..." : "Add Notice"}
              </button>
            </div>

          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="p-3">Date</th>
                <th>Title</th>
                <th>Description</th>
                <th>Image</th>
                <th>File</th>
                <th>Marker</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {notices.map((n) => (
                <tr key={n._id} className="border-t">
                  <td className="p-3">{n.date}</td>
                  <td>{n.title}</td>
                  <td>{n.description || "-"}</td>

                  <td>
                    {n.image && (
                      <img
                        src={`https://prakash-school-server-ru7x.onrender.com/uploads/${n.image}`}
                        className="w-12 h-12 object-cover"
                        alt=""
                      />
                    )}
                  </td>

                  <td>
                    {n.attachment && (
                      <a
                        href={`https://prakash-school-server-ru7x.onrender.com/uploads/${n.attachment}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    )}
                  </td>

                  <td>{n.marker && "Important"}</td>

                  <td>
                    <button
                      onClick={() => deleteNotice(n._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </div>
  );
}

export default AdminNotices;
