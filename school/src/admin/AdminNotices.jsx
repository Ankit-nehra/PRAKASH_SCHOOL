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
    <div className="min-h-screen bg-gray-100 overflow-x-hidden">
      <Navbar />

      <div className="pt-24 max-w-6xl mx-auto px-3 sm:px-4 md:px-6">

        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Notice Management
        </h1>

        {/* FORM */}
        <div className="bg-white shadow-md rounded-xl p-4 sm:p-6 mb-10">

          <h2 className="text-xl font-semibold mb-6">
            Add New Notice
          </h2>

          {/* RESPONSIVE GRID FIX */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">

            <div>
              <label className="font-medium">Title *</label>
              <input
                className="border p-2 rounded w-full min-w-0"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="font-medium">Date *</label>
              <input
                type="date"
                className="border p-2 rounded w-full min-w-0"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-medium">Description</label>
              <textarea
                className="border p-2 rounded w-full min-w-0"
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

            {/* ATTACHMENT */}
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

            {/* MARKER */}
            <div className="flex items-center gap-2 sm:col-span-2">
              <input
                type="checkbox"
                checked={marker}
                onChange={(e) => setMarker(e.target.checked)}
              />
              <span>Mark as Important</span>
            </div>

            {/* PROGRESS */}
            {uploading && (
              <div className="sm:col-span-2">
                <div className="w-full bg-gray-200 h-3 rounded">
                  <div
                    className="bg-blue-600 h-3 rounded"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-sm mt-1">
                  Uploading: {uploadProgress}%
                </p>
              </div>
            )}

            {/* BUTTON */}
            <div className="sm:col-span-2 text-right">
              <button
                onClick={addNotice}
                disabled={uploading}
                className={`px-6 py-2 rounded text-white w-full sm:w-auto ${
                  uploading
                    ? "bg-gray-400"
                    : "bg-blue-900 hover:bg-blue-800"
                }`}
              >
                {uploading ? "Uploading..." : "Add Notice"}
              </button>
            </div>

          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded shadow overflow-hidden">

          <div className="md:max-h-none max-h-[320px] overflow-y-auto">

            <div className="overflow-x-auto">

              <table className="w-full min-w-[750px]">

                <thead className="bg-blue-900 text-white sticky top-0 z-10">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Title</th>
                    <th className="p-3">Description</th>
                    <th className="p-3">Image</th>
                    <th className="p-3">File</th>
                    <th className="p-3">Marker</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {notices.map((n) => (
                    <tr key={n._id} className="border-t">

                      <td className="p-3">{n.date}</td>
                      <td className="p-3">{n.title}</td>
                      <td className="p-3">{n.description || "-"}</td>

                      <td className="p-3">
                        {n.image && (
                          <img
                            src={n.image}
                            className="w-12 h-12 object-cover"
                            alt=""
                          />
                        )}
                      </td>

                      <td className="p-3">
                        {n.attachment && (
                          <a
                            href={`https://docs.google.com/gview?url=${encodeURIComponent(
                              n.attachment
                            )}&embedded=true`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            Preview
                          </a>
                        )}
                      </td>

                      <td className="p-3">
                        {n.marker && "Important"}
                      </td>

                      <td className="p-3">
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

      </div>
    </div>
  );
}

export default AdminNotices;
