import { useState } from "react";
import Navbar from "../component/Navbar";
import axios from "axios";
import { Navigate, redirect } from "react-router-dom";

const Home = () => {
  const [url, setUrl] = useState("");
  const handleShortenUrl = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:8080/api/urls",
        {
          url: url,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setUrl("");
      redirect(myUrls.jsx);

      console.log("URL CREATED:", response.data);
    } catch (error) {
      console.log("ERROR:", error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6">
        <div className="text-center pt-20 pb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2
          bg-blue-50 text-blue-600 rounded-full text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Simple. Fast. Powerful.
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            Shorten your links.
            <br />
            <span className="text-blue-600">Share with confidence.</span>
          </h2>

          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
            Create short, memorable links in seconds and keep track of your
            clicks with ease.
          </p>
        </div>

        {/* URL Shortener Card */}
        <div className="max-w-3xl mx-auto">
          <div
            className="bg-white rounded-2xl shadow-xl
          border border-slate-200 p-6 md:p-8"
          >
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Enter your long URL
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                placeholder="https://example.com/your-long-url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-5 py-4 border border-slate-300
                rounded-xl outline-none text-slate-700
                focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition"
              />

              <button
                type="button"
                onClick={handleShortenUrl}
                className="px-7 py-4 bg-blue-600 text-white
                font-semibold rounded-xl hover:bg-blue-700
                active:scale-95 transition"
              >
                Shorten URL
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-3">
              Your URL will be securely processed and shortened.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16 pb-20">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <span className="text-xl">🔗</span>
            </div>

            <h3 className="font-bold text-slate-800 text-lg">Easy to Share</h3>

            <p className="text-sm text-slate-500 mt-2">
              Turn long URLs into short and memorable links.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mb-4">
              <span className="text-xl">⚡</span>
            </div>

            <h3 className="font-bold text-slate-800 text-lg">Lightning Fast</h3>

            <p className="text-sm text-slate-500 mt-2">
              Generate your shortened URL instantly.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="w-11 h-11 bg-purple-50 rounded-xl flex items-center justify-center mb-4">
              <span className="text-xl">📊</span>
            </div>

            <h3 className="font-bold text-slate-800 text-lg">Track Clicks</h3>

            <p className="text-sm text-slate-500 mt-2">
              Keep track of how many times your links are visited.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
