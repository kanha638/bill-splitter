import axios from "axios";
import {
  AuthError,
  AuthStart,
  AuthSuccess,
  LogoutError,
  LogOutStart,
  LogOutSuccess,
} from "../features/userSlice";

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

export const SignUpUser = async (data, dispatch, navigate) => {
  dispatch(AuthStart());
  try {
    console.log(data);
    const result = await API.post("/api/auth/register", data, {
      withCredentials: true,
    });
    dispatch(AuthSuccess(result.data));
    navigate("/");
  } catch (error) {
    dispatch(AuthError(error.response));
  }
};

export const SignInUser = async (data, dispatch, navigate) => {
  dispatch(AuthStart());
  try {
    const result = await API.post("/api/auth/login", data, {
      withCredentials: true,
    });
    dispatch(AuthSuccess(result.data));
    navigate("/");
  } catch (error) {
    dispatch(AuthError(error.response));
  }
};

export const LogOutUser = async (dispatch, navigate) => {
  dispatch(LogOutStart());
  try {
    const data = await API.get("/api/auth/logout", { withCredentials: true });
    dispatch(LogOutSuccess());
    navigate("/login");
  } catch (error) {
    console.log(error);
    dispatch(LogoutError(error.response));
  }
};
