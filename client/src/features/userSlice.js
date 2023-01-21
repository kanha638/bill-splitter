import { createSlice } from "@reduxjs/toolkit";

const val = JSON.parse(localStorage.getItem("user"));
let check = false;
if (val) check = true;

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("user")),
    isLoggedIn: check,
    isPending: false,
    isErrors: false,
  },
  reducers: {
    AuthStart: (state) => {
      state.isErrors = false;
      state.isPending = true;
    },
    AuthError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
    },
    AuthSuccess: (state, action) => {
      state.isErrors = false;
      state.isPending = false;
      state.userInfo = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isLoggedIn = true;
    },
    LogOutStart: (state) => {
      state.isErrors = false;
      state.isPending = true;
    },
    LogOutSuccess: (state) => {
      state.userInfo = null;
      state.isPending = false;
      state.isLoggedIn = false;
      localStorage.clear();
    },
    LogoutError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
    },
  },
});

export const {
  AuthError,
  AuthStart,
  AuthSuccess,
  LogOutStart,
  LogOutSuccess,
  LogoutError,
} = userSlice.actions;

export const selectUser = (state) => state.user.userInfo;
export const UserState = (state) => state.user;
export default userSlice.reducer;
