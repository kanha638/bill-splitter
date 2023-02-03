import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewEvent, getAllEvents } from "../api/event";
import { EventsData, eventSelector } from "../features/eventSlice";
import img from "../Images/logo.png";
import chroma from "chroma-js";
import { EventCard } from "./EventCard";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { getAllUser } from "../api/auth";
import { UserState } from "../features/userSlice";
import EventForm from "./EventForm";
import { Button, Icon, Modal } from "semantic-ui-react";

const initialValue = {
  name: "",
  desc: "",
  invitedUsers: [],
};
export const EventList = () => {
  const dispatch = useDispatch();
  const userState = useSelector(UserState);
  const eventData = useSelector(eventSelector);
  const [currentList, setCurrentList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const animatedComponents = makeAnimated();
  const [users, setUsers] = useState([]);
  const [flag, setFlag] = useState(false);

  const [eventForm, setEventForm] = useState(initialValue);

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    multiValue: (styles, { data }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: color.alpha(0.1).css(),
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color,
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "white",
      },
    }),
  };

  useEffect(() => {
    const fetchEvents = async () => {
      await getAllEvents(dispatch, setEventList, setCurrentList);
    };
    const fetchUsers = async () => {
      if (userState?.allUsers.length === 0) {
        await getAllUser(dispatch, setUsers, userState?.userInfo?.id);
      } else {
        setUsers(userState?.allUsers);
      }
    };
    return () => {
      fetchEvents();
      fetchUsers();
    };
  }, [flag]);

  const searchHandler = (val) => {
    const newVal = eventList.filter((e) => {
      return (
        String(e.name).toLowerCase().includes(String(val).toLowerCase()) ||
        String(e.desc).toLowerCase().includes(String(val).toLowerCase())
      );
    });
    setCurrentList(newVal);
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="flex justify-center align-middle flex-wrap">
        <form className=" w-full flex-1 min-w-full  ">
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              onChange={(e) => {
                searchHandler(e.target.value);
              }}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </form>

        <div className="w-100 h-20 py-4 my-5 flex justify-end px-4 rounded-lg flex-1">
          <button
            type="button"
            onClick={() => {
              setOpenForm((value) => !value);
            }}
            class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            {openForm ? "Close" : "New Event"}
          </button>
        </div>
      </div>
      <Modal
        closeOnDimmerClick={false}
        size={"large"}
        open={openForm}
        onClose={() => setOpenForm(false)}
      >
        <Modal.Header>Create New Event</Modal.Header>

        <Modal.Content>
          <EventForm setFlag={setFlag} setOpenForm={setOpenForm} />
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => setOpenForm(false)}>
            Cancel
          </Button>
        </Modal.Actions>
      </Modal>
      <div className="flex gap-4 my-6 flex-wrap justify-center">
        {currentList.map((data, idx) => {
          return <EventCard key={idx} name={data.name} desc={data.desc} />;
        })}
      </div>
    </div>
  );
};
