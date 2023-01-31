import { createSlice } from "@reduxjs/toolkit";

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    isPending: false,
    isErrors: false,
  },
  reducers: {
    FetchEventsStart: (state) => {
      state.isErrors = false;
      state.isPending = true;
    },
    FetchEventSuccess: (state, action) => {
      state.isErrors = false;
      state.isPending = false;
      state.events = action.payload;
    },
    FetchEventError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
      if (action.payload.status === 401) {
        localStorage.clear();
      }
    },
    createEventStart: (state) => {
      state.isErrors = false;
      state.isPending = true;
    },
    createEventSuccess: (state, action) => {
      state.isErrors = false;
      state.isPending = false;
    },
    createEventError: (state, action) => {
      state.isErrors = true;
      state.isPending = false;
    },
  },
});

export const {
  FetchEventError,
  FetchEventSuccess,
  FetchEventsStart,
  createEventError,
  createEventStart,
  createEventSuccess,
} = eventSlice.actions;

export const EventsData = (state) => state.event.events;

export const eventSelector = (state) => state.event;

export default eventSlice.reducer;
