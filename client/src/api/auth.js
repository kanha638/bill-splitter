import axios from "axios";
import {
  AuthError,
  AuthStart,
  AuthSuccess,
  fetchUserError,
  fetchUsersStart,
  fetchUsersSuccess,
  LogoutError,
  LogOutStart,
  LogOutSuccess,
} from "../features/userSlice";

const colors = [
  "#00B8D9",
  "#0052CC",
  "#5243AA",
  "#FF5630",
  "#FF8B00",
  "#FFC400",
  "#36B37E",
  "#00875A",
  "#253858",
  "#666666",
];

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

export const getAllUser = async (dispatch, setUsers = () => {}, userID) => {
  dispatch(fetchUsersStart());
  try {
    const result = await API.get("/api/user/all", {
      withCredentials: true,
    });

    console.log(result.data);

    let users = [];
    let i = 0;
    result.data.forEach((e) => {
      if (e?.id !== userID) {
        const tmp = {
          key: i,
          text: `${e.username}`,
          value: e?.id,
          image: {
            avatar: true,
            src: "https://static.vecteezy.com/system/resources/thumbnails/008/887/406/small/3d-rendering-of-user-icon-on-clean-background-for-mock-up-and-web-banner-cartoon-interface-design-minimal-metaverse-concept-free-photo.jpg",
          },
        };
        users.push(tmp);
        i = i + 1;
      }
    });
    setUsers(users);
    dispatch(fetchUsersSuccess(users));
  } catch (error) {
    console.log(error);
    dispatch(fetchUserError(error.response));
  }
};
