import React from "react";

export default function MessageDialog({ message, onOk, onCancel }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-96 text-center shadow-lg">
        {/* الرسالة */}
        <p className="text-white text-lg mb-6">{message}</p>

        {/* الأزرار */}
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            Cancel
          </button>
          <button
            onClick={onOk}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
