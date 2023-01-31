import axios from "axios";
import {
  createEventError,
  createEventStart,
  createEventSuccess,
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

export const createNewEvent = async (dispatch, data, setFlag = () => {}) => {
  dispatch(createEventStart());
  try {
    const result = await API.post("/api/event/create", data, {
      withCredentials: true,
    });
    dispatch(createEventSuccess(result.data));
    setFlag((flag) => !flag);
  } catch (error) {
    console.log(error);
    dispatch(createEventError(error.response));
  }
};
