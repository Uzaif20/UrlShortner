const ShortUrlPopup = ({ shortCode, onClose }) => {
  const shortUrl = `http://localhost:8080/${shortCode}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      alert("Short URL copied!");
    } catch (error) {
      console.log("Copy failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center px-4 z-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-slate-900">Your Short URL</h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            value={shortUrl}
            readOnly
            className="flex-1 px-4 py-3 border border-slate-300 rounded-xl bg-slate-50 text-sm"
          />

          <button
            onClick={handleCopy}
            className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            📋 Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortUrlPopup;
