import React, { useState } from "react";
import api from "../api/axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../slices/userSlice";

export default function AuthForm({ onLogin }) {
  const dispatch = useDispatch(); // ✅ added this
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

   const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister ? "/auth/register" : "/auth/login";
      const payload = isRegister
        ? form
        : { email: form.email, password: form.password };
      const res = await api.post(url, payload);

      // ✅ Sync Redux instantly so Navbar updates
      dispatch(loginSuccess(res.data.user));

      // ✅ Call existing App.jsx login logic
      onLogin(res.data);
    } catch (err) {
      setError(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f3f2ef] px-4">
      {/* LinkedIn Logo */}
      <div className="flex items-center mb-6">
        <img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt="LinkedIn"
          className="w-10 h-10 mr-2"
        />
        <h1 className="text-3xl font-bold text-[#0a66c2] tracking-tight">
          LinkedIn
        </h1>
      </div>

      {/* Auth Card */}
      <div className="bg-white w-full max-w-md rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">
          {isRegister ? "Join LinkedIn now" : "Sign in"}
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          {isRegister
            ? "Make the most of your professional life."
            : "Stay updated on your professional world."}
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-3">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          {isRegister && (
            <div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
              />
            </div>
          )}

          <div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
            />
          </div>

          <div>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              type="password"
              className="w-full border border-gray-300 rounded text-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-[#0a66c2] text-white font-semibold rounded-full hover:bg-[#004182] transition"
          >
            {isRegister ? "Agree & Join" : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsRegister(false);
                  setError("");
                }}
                className="text-[#0a66c2] font-medium hover:underline"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              New to LinkedIn?{" "}
              <button
                onClick={() => {
                  setIsRegister(true);
                  setError("");
                }}
                className="text-[#0a66c2] font-medium hover:underline"
              >
                Join now
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-gray-500">
        LinkedIn Corporation © {new Date().getFullYear()}
      </p>
    </div>
  );
}
