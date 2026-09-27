import { createSlice } from "@reduxjs/toolkit";
const saved = JSON.parse(localStorage.getItem("attendanceUser") || "null");
const initialState = {
  token: localStorage.getItem("attendanceToken"),
  user: saved,
};
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (s, a) => {
      s.token = a.payload.token;
      s.user = a.payload.user;
      localStorage.setItem("attendanceToken", a.payload.token);
      localStorage.setItem("attendanceUser", JSON.stringify(a.payload.user));
    },
    logout: (s) => {
      s.token = null;
      s.user = null;
      localStorage.removeItem("attendanceToken");
      localStorage.removeItem("attendanceUser");
    },
  },
});
export const { setAuth, logout } = slice.actions;
export default slice.reducer;
