const EditUrlPopup = ({ editValue, setEditValue, onClose, onSave }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Edit URL</h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl"
          >
            ✕
          </button>
        </div>

        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Original URL
        </label>

        <input
          type="url"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          className="w-full px-4 py-3 border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUrlPopup;
