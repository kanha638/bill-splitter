import axios from "axios";
import {
  FetchEventError,
  FetchEventsStart,
  FetchEventSuccess,
} from "../features/eventSlice";

const API = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });

export const getAllEvents = async (
  dispatch,
  setEventData = () => {},
  setCurrentList = () => {}
) => {
  dispatch(FetchEventsStart());
  try {
    const result = await API.get("/api/event/events/my", {
      withCredentials: true,
    });
    console.log(result.data);
    dispatch(FetchEventSuccess(result.data));
    setEventData(result.data);
    setCurrentList(result.data);
  } catch (error) {
    dispatch(FetchEventError(error.response));
  }
};
