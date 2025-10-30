import React from "react";
import { Image, Video, FileText, Briefcase } from "lucide-react";

export default function PostInputBox({ onClick }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md border border-gray-200">
      {/* Top Input Section */}
      <div className="flex items-center gap-3 p-4">
        <img
          src={
            user?.profilePic ||
            "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          }
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <button
          onClick={onClick}
          className="flex-1 text-left text-gray-600 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200 transition-colors"
        >
          Start a post
        </button>
      </div>

      {/* Divider */}
      <hr className="border-gray-200" />

      {/* Bottom Options */}
      <div className="flex justify-around p-2 text-sm text-gray-500">
        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition">
          <Image className="w-5 h-5 text-blue-500" />
          <span>Photo</span>
        </button>
        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition">
          <Video className="w-5 h-5 text-green-500" />
          <span>Video</span>
        </button>
        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition">
          <FileText className="w-5 h-5 text-orange-500" />
          <span>Article</span>
        </button>
        <button className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 transition">
          <Briefcase className="w-5 h-5 text-purple-500" />
          <span>Job</span>
        </button>
      </div>
    </div>
  );
}
