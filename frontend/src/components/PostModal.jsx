import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../slices/postsSlice";

export default function PostModal({ open, onClose }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  if (!open) return null;

  const handlePost = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setLoading(true);
    try {
      await dispatch(createPost(text)).unwrap();
      setText("");
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-3 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Create a post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:bg-gray-100 rounded-full p-1"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">
                {user?.name || "User"}
              </p>
              <p className="text-sm text-gray-500">Post to Anyone 🌍</p>
            </div>
          </div>

          {/* Text Input */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you want to talk about?"
            className="w-full text-gray-800 placeholder-gray-500 p-2 text-base border-none focus:ring-0 resize-none h-32"
            autoFocus
          />

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Bottom Bar */}
          <div className="flex justify-end">
            <button
              onClick={handlePost}
              disabled={loading || !text.trim()}
              className={`px-5 py-2 rounded-full font-medium transition-colors ${
                text.trim()
                  ? "bg-[#0a66c2] text-white hover:bg-[#004182]"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
