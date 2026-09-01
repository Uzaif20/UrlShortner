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

        console.log(response.data);

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

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-slate-900">My URLs</h1>

        <p className="text-slate-500 mt-2">
          Manage and track all your shortened URLs.
        </p>

        <div className="mt-8">
          <input
            type="text"
            placeholder="Search your URLs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {loading && <p className="mt-8 text-slate-500">Loading URLs...</p>}
      </main>
    </div>
  );
};

export default MyUrls;
