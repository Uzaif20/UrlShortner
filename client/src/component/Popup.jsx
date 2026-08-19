const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white w-full max-w-sm mx-4 rounded-2xl shadow-xl p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Error</h2>

        <p className="text-gray-600 mb-6">{message}</p>

        <button
          onClick={onClose}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg
          hover:bg-blue-700 transition"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default Popup;
