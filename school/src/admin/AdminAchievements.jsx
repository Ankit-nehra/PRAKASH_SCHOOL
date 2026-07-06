import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import Navbar from "../components/layout/Navbar";

function AdminAchievements() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Academic");
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [achievementDate, setAchievementDate] = useState("");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetchAchievements();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const fetchAchievements = async () => {
    try {
      const { data } = await axios.get("/achievements");
      setAchievements(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addAchievement = async () => {
    if (!title || !description) {
      return alert("Title and Description are required");
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("studentName", studentName);
    formData.append("studentClass", studentClass);
    formData.append("achievementDate", achievementDate);

    if (image) {
      formData.append("image", image);
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      await axios.post("/achievements", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },

        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(percent);
        },
      });

      setTitle("");
      setDescription("");
      setCategory("Academic");
      setStudentName("");
      setStudentClass("");
      setAchievementDate("");
      setImage(null);
      setImagePreview(null);

      fetchAchievements();

    } catch (err) {
      console.error(err);
      alert("Failed to add achievement");
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 500);
    }
  };

  const deleteAchievement = async (id) => {
    if (!window.confirm("Delete this achievement?")) return;

    try {
      await axios.delete(`/achievements/${id}`);

      setAchievements((prev) =>
        prev.filter((item) => item._id !== id)
      );
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
          Achievement Management
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-10">

          <h2 className="text-xl font-semibold mb-6">
            Add Achievement
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="font-medium">
                Title *
              </label>

              <input
                className="border rounded p-2 w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="font-medium">
                Category
              </label>

              <select
                className="border rounded p-2 w-full"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <option>Academic</option>
                <option>Sports</option>
                <option>Cultural</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="font-medium">
                Student Name
              </label>

              <input
                className="border rounded p-2 w-full"
                value={studentName}
                onChange={(e) =>
                  setStudentName(e.target.value)
                }
              />
            </div>

            <div>
              <label className="font-medium">
                Class
              </label>

              <input
                className="border rounded p-2 w-full"
                value={studentClass}
                onChange={(e) =>
                  setStudentClass(e.target.value)
                }
              />
            </div>

            <div>
              <label className="font-medium">
                Achievement Date
              </label>

              <input
                type="date"
                className="border rounded p-2 w-full"
                value={achievementDate}
                onChange={(e) =>
                  setAchievementDate(e.target.value)
                }
              />
            </div>

            <div>
              <label className="font-medium">
                Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  setImage(file);

                  if (file) {
                    setImagePreview(
                      URL.createObjectURL(file)
                    );
                  }
                }}
              />

              {image && (
                <div className="mt-3 p-3 border rounded bg-gray-50">

                  <img
                    src={imagePreview}
                    alt=""
                    className="w-24 h-24 rounded object-cover mb-2"
                  />

                  <p className="text-sm">
                    {image.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    {(image.size / 1024).toFixed(2)} KB
                  </p>

                  <button
                    className="mt-2 text-red-500 text-sm"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                  >
                    Remove
                  </button>

                </div>
              )}
            </div>

            <div className="md:col-span-2">

              <label className="font-medium">
                Description *
              </label>

              <textarea
                rows={4}
                className="border rounded p-2 w-full"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />

            </div>

            {uploading && (
              <div className="md:col-span-2">

                <div className="w-full h-3 bg-gray-200 rounded">

                  <div
                    className="bg-blue-700 h-3 rounded"
                    style={{
                      width: `${uploadProgress}%`,
                    }}
                  />

                </div>

                <p className="text-sm mt-1">
                  Uploading {uploadProgress}%
                </p>

              </div>
            )}

            <div className="md:col-span-2 text-right">

              <button
                disabled={uploading}
                onClick={addAchievement}
                className={`px-6 py-2 rounded text-white ${
                  uploading
                    ? "bg-gray-400"
                    : "bg-blue-900 hover:bg-blue-800"
                }`}
              >
                {uploading
                  ? "Uploading..."
                  : "Add Achievement"}
              </button>

            </div>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">

  <div className="overflow-x-auto">

    <table className="w-full min-w-[750px]">

      <thead className="bg-blue-900 text-white">

        <tr>
          <th className="p-3">Image</th>
          <th className="p-3">Title</th>
          <th className="p-3">Category</th>
          <th className="p-3">Student</th>
          <th className="p-3">Class</th>
          <th className="p-3">Date</th>
          <th className="p-3">Action</th>
        </tr>

      </thead>

      <tbody>

        {achievements.map((item) => (

          <tr
            key={item._id}
            className="border-t"
          >

            <td className="p-3">
              {item.image && (
                <img
                  src={item.image}
                  alt=""
                  className="w-16 h-16 rounded object-cover"
                />
              )}
            </td>

            <td className="p-3">{item.title}</td>

            <td className="p-3">{item.category}</td>

            <td className="p-3">
              {item.studentName || "-"}
            </td>

            <td className="p-3">
              {item.studentClass || "-"}
            </td>

            <td className="p-3">
              {item.achievementDate
                ? item.achievementDate.substring(0, 10)
                : "-"}
            </td>

            <td className="p-3">
              <button
                onClick={() =>
                  deleteAchievement(item._id)
                }
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded whitespace-nowrap"
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
  );
}

export default AdminAchievements;
