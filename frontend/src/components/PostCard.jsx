import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { useSelector } from "react-redux";

export default function PostCard({ post }) {
  const { currentUser } = useSelector((state) => state.user);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (post?.likes) setLikes(post.likes.length);
  }, [post]);

  if (!post) return null;

  const likeToggle = async () => {
    try {
      const res = await api.post(`/posts/like/${post._id}`);
      setLikes(res.data.likes.length);
    } catch (err) {
      console.error(err);
    }
  };

  const deletePost = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await api.delete(`/posts/${post._id}`);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const created = post.createdAt
    ? new Date(post.createdAt).toLocaleString()
    : "Unknown date";

  // ✅ Get user safely from localStorage (fallback in case Redux isn't populated)
  const localUser = JSON.parse(localStorage.getItem("user") || "{}");
  const loggedInUserId = currentUser?._id || localUser?._id || localUser?.id;

  const isOwner = loggedInUserId === post.user?._id;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">
              {post.user?.name || "Unknown User"}
            </h3>
            <p className="text-xs text-gray-500">{created}</p>
          </div>
        </div>

        {/* ✅ Delete button (visible if post belongs to logged-in user) */}
        {isOwner && (
          <button
            onClick={deletePost}
            title="Delete post"
            className="text-gray-400 hover:text-red-600 text-lg font-bold transition"
          >
            <img className="w-5 m-2" src="data:image/png;base64,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"></img>
          </button>
        )}
      </div>

      {/* Post Text */}
      <p className="mt-3 text-gray-800 text-[15px] leading-relaxed">
        {post.text}
      </p>

      {/* Actions */}
      <div className="mt-4 border-t border-gray-200 pt-2 flex gap-6 text-sm text-gray-600">
        <button
          onClick={likeToggle}
          className="hover:text-blue-600 transition font-medium flex items-center gap-1"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/2415/2415237.png"
            alt="like"
            className="w-4"
          />
         ({likes})
        </button>
      </div>
    </div>
  );
}
