import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../slices/postsSlice";
import PostCard from "./PostCard";
import PostInputBox from "./PostInputBox";
import PostModal from "./PostModal";

export default function Feed() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.posts);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="bg-[#f3f2ef] min-h-screen py-6">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Create Post Input Box */}
        <PostInputBox onClick={() => setModalOpen(true)} />

        {/* Modal for Creating a New Post */}
        <PostModal open={isModalOpen} onClose={() => setModalOpen(false)} />

        {/* Feed Section */}
        <div className="space-y-4">
          {loading ? (
            // Skeleton Loader
            <div className="bg-white rounded-lg shadow-sm p-4 space-y-3 animate-pulse border border-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                <div className="flex-1">
                  <div className="w-32 h-3 bg-gray-300 text-gray-700rounded mb-2"></div>
                  <div className="w-24 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-3 bg-gray-200 rounded"></div>
            </div>
          ) : items.length === 0 ? (
            // Empty State
            <div className="bg-white text-gray-700 text-center py-10 rounded-lg shadow-sm border border-gray-300">
              <p className="text-lg font-semibold mb-1">No posts yet</p>
              <p className="text-sm text-gray-500">
                Start a conversation by creating your first post!
              </p>
            </div>
          ) : (
            // Render Posts
            items.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
}
