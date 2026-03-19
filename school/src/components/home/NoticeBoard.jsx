import { useEffect, useState } from "react";
import axios from "axios";
import { startLoading, stopLoading } from "../Loader"; // ✅ import loader

function NoticeBoard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    async function fetchNotices() {
      startLoading(); // ✅ start top progress bar
      try {
        const res = await axios.get(
          "https://prakash-school-server-ru7x.onrender.com/api/notices"
        );
        setNotices(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        stopLoading(); // ✅ stop progress bar after data fetch
      }
    }
    fetchNotices();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">
          Latest Notices
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div
              key={notice._id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col"
            >
              {/* Optional Image */}
              {notice.image && (
                <img
                  src={`https://prakash-school-server-ru7x.onrender.com/uploads/${notice.image}`}
                  alt={notice.title}
                  className="w-full h-48 object-cover rounded mb-4"
                />
              )}

              {/* Title & Marker */}
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">{notice.title}</h3>
                {notice.marker && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                    Important
                  </span>
                )}
              </div>

              {/* Date Badge */}
              <span className="text-gray-500 text-sm mb-2">{notice.date}</span>

              {/* Description */}
              {notice.description && (
                <p className="text-gray-700 text-sm mb-2">{notice.description}</p>
              )}

              {/* Optional File Attachment */}
              {notice.attachment && (
                <a
                  href={`https://prakash-school-server-ru7x.onrender.com/uploads/${notice.attachment}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-900 text-sm underline"
                >
                  View Attachment
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NoticeBoard;
