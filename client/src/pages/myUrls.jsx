import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../component/Navbar";

const MyUrls = () => {
  const [search, setSearch] = useState("");
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:8080/api/urls", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUrls(response.data);
      } catch (error) {
        console.log("FULL ERROR:", error);
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, []);

  const filteredUrls = urls.filter(
    (url) =>
      url.originalUrl.toLowerCase().includes(search.toLowerCase()) ||
      url.shortCode.toLowerCase().includes(search.toLowerCase()),
  );

  const handleCopy = async (shortCode) => {
    const shortUrl = `http://localhost:8080/${shortCode}`;

    try {
      await navigator.clipboard.writeText(shortUrl);
      alert("Short URL copied successfully!");
    } catch (error) {
      console.log("Failed to copy", error);
    }
  };

  const handleDelete = async (shortCode) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8080/api/urls/${shortCode}`, {
        headers: {
          Authorization : `Bearer ${token}`,
        },
      });
       setUrls((previousUrls) =>
         previousUrls.filter((url) => url.shortCode !== shortCode),
       );
       alert("Short URL Deleted successfully!");
    } catch (error) {
      console.log("DELETE ERROR:", error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Page Heading */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My URLs</h1>

          <p className="text-slate-500 mt-2">
            Manage and track all your shortened URLs.
          </p>
        </div>

        {/* Search */}
        <div className="mt-8">
          <input
            type="text"
            placeholder="Search by URL or short code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 border border-slate-300 rounded-xl outline-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* URLs Table */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-100 border-b border-slate-200 text-sm font-semibold text-slate-600">
            <div className="col-span-6">Original URL</div>

            <div className="col-span-3">Short URL</div>

            <div className="col-span-3 text-center">Clicks</div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading URLs...
            </div>
          ) : filteredUrls.length === 0 ? (
            <div className="p-8 text-center text-slate-500">No URLs found.</div>
          ) : (
            filteredUrls.map((url) => (
              <div
                key={url._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition"
              >
                {/* Original URL */}
                <div className="md:col-span-5">
                  <p className="text-xs text-slate-400 mb-1 md:hidden">
                    Original URL
                  </p>

                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-700 hover:text-blue-600 break-all"
                  >
                    {url.originalUrl}
                  </a>
                </div>

                {/* Short Code */}
                <div className="md:col-span-3">
                  <p className="text-xs text-slate-400 mb-1 md:hidden">
                    Short Code
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="inline-block bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium">
                      {url.shortCode}
                    </span>
                    <button
                      onClick={() => handleCopy(url.shortCode)}
                      className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg 
                    text-sm hover:bg-blue-100 hover:text-blue-600 transition"
                    >
                      📋 Copy
                    </button>
                  </div>
                </div>

                {/* Clicks */}
                <div className="md:col-span-2 md:text-center">
                  <p className="text-xs text-slate-400 mb-1 md:hidden">
                    Clicks
                  </p>
                  <span className="text-sm font-semibold text-slate-700">
                    {url.clicks}
                  </span>
                </div>

                {/* Action */}
                <div className="md:col-span-2 md:text-center gap-2 flex">
                  <p className="text-xs text-slate-400 mb-1 md:hidden">
                    Action
                  </p>
                  <button
                    onClick={() => console.log("Edit:", url)}
                    className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(url.shortCode)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg 
                    text-sm hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default MyUrls;
