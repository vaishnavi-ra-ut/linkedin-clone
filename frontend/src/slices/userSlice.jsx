import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: storedUser,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload)); // Save in localStorage
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("user"); // Remove from localStorage
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
