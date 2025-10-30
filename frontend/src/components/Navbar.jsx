import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { useNavigate } from "react-router-dom";

import {
  FaHome,
  FaUsers,
  FaBriefcase,
  FaCommentDots,
  FaBell,
} from "react-icons/fa";

export default function LinkedInNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    // 1) clear redux
    dispatch(logout());
    // 2) clear any app-level persistence used by App.jsx
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // 3) ensure axios auth header removed (if you use it)
    try {
      // if you have an axios instance exported as api (optional)
      // import api at top: import api from '../api/axios';
      // delete api.defaults.headers.common["Authorization"];
      // But we don't assume import to avoid changing other files.
      // So just redirect + reload.
    } catch (e) {
      /* ignore */
    }
    // 4) redirect to login
    navigate("/login");
    // 5) reload the page so App.jsx picks up cleared localStorage and updates its local state
    //    (necessary because App.jsx holds local state and won't react to redux-only changes)
    setTimeout(() => window.location.reload(), 50);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    console.log("Searching for:", value);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 ">
      <div className="max-w-7xl mx-14 px-4 py-2 flex items-center justify-between">
        {/* LEFT: Logo + Search */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              className="w-8 h-8"
            />
          </div>

          <div className="hidden md:flex items-center bg-gray-100 px-3 py-1 rounded-full w-64 focus-within:ring-2 focus-within:ring-[#0077B5] border-1 border-gray-500">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
              alt="search"
              className="w-4 h-4 opacity-60 mr-2"
            />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
              className="bg-transparent outline-none text-sm w-full text-gray-700 "
            />
          </div>
        </div>

        {/* CENTER: Navigation icons */}
        <div className="hidden md:flex items-center gap-8 text-gray-600">
          <div className="flex flex-col items-center hover:text-[#0077B5] cursor-pointer">
            <FaHome size={20} />
            <span className="text-xs">Home</span>
          </div>
          <div className="flex flex-col items-center hover:text-[#0077B5] cursor-pointer">
            <FaUsers size={20} />
            <span className="text-xs">My Network</span>
          </div>
          <div className="flex flex-col items-center hover:text-[#0077B5] cursor-pointer">
            <FaBriefcase size={20} />
            <span className="text-xs">Jobs</span>
          </div>
          <div className="flex flex-col items-center hover:text-[#0077B5] cursor-pointer">
            <FaCommentDots size={20} />
            <span className="text-xs">Messaging</span>
          </div>
          <div className="flex flex-col items-center hover:text-[#0077B5] cursor-pointer relative">
            <FaBell size={20} />
            <span className="text-xs">Notifications</span>
            <span className="absolute -top-1 right-2 bg-red-600 text-white text-[10px] rounded-full px-1.5">
              3
            </span>
          </div>
        </div>

        {/* RIGHT: Profile + Login/Logout */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  /* optionally open profile */ 
                }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                  alt="profile"
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-sm font-medium text-gray-700">
                  {currentUser.name || "User"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="text-sm text-white bg-[#0077B5] px-3 py-1 rounded hover:bg-[#006097] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="text-sm text-white bg-[#0077B5] px-3 py-1 rounded hover:bg-[#006097] transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
