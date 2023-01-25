import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../api/event";
import { EventsData, eventSelector } from "../features/eventSlice";
import img from "../Images/logo.png";
import { EventCard } from "./EventCard";
export const EventList = () => {
  const dispatch = useDispatch();
  const eventData = useSelector(eventSelector);
  const [currentList, setCurrentList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      await getAllEvents(dispatch, setEventList, setCurrentList);
    };
    return () => {
      fetchEvents();
    };
  }, []);

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
      {openForm && (
        <form className="py-4 w-45 border px-5">
          <div className="relative z-0 w-full mb-6 group ">
            <input
              type="text"
              name="name"
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-gray-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Event Name
            </label>
          </div>

          <div className="relative z-0 w-full mb-6 group">
            <textarea
              type="text"
              name="desc"
              id="floating_description"
              className=" h-20 block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_description"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      )}

      <div className="flex gap-4 my-6 flex-wrap justify-start">
        {currentList.map((data, idx) => {
          return <EventCard key={idx} name={data.name} desc={data.desc} />;
        })}
        {currentList.map((data, idx) => {
          return <EventCard key={idx} name={data.name} desc={data.desc} />;
        })}
        {currentList.map((data, idx) => {
          return <EventCard key={idx} name={data.name} desc={data.desc} />;
        })}
        {currentList.map((data, idx) => {
          return <EventCard key={idx} name={data.name} desc={data.desc} />;
        })}
        {currentList.map((data, idx) => {
          return <EventCard key={idx} name={data.name} desc={data.desc} />;
        })}
        {currentList.map((data, idx) => {
          return <EventCard key={idx} name={data.name} desc={data.desc} />;
        })}
        {currentList.map((data, idx) => {
          return <EventCard key={idx} name={data.name} desc={data.desc} />;
        })}
        {currentList.map((data, idx) => {
          return <EventCard key={idx} name={data.name} desc={data.desc} />;
        })}
        {currentList.map((data, idx) => {
          return <EventCard key={idx} name={data.name} desc={data.desc} />;
        })}
        {currentList.map((data, idx) => {
          return <EventCard key={idx} name={data.name} desc={data.desc} />;
        })}
        {currentList.map((data, idx) => {
          return <EventCard key={idx} name={data.name} desc={data.desc} />;
        })}
        {currentList.map((data, idx) => {
          return <EventCard key={idx} name={data.name} desc={data.desc} />;
        })}
        {/* {currentList.map((data, idx) => {
          return (
            <EventCard
              key={idx}
              name={"Family Function for only our family"}
              desc={
                "Hello this is kanha tiwari i am the best person her i want to say one thing that i am the best"
              }
            />
          );
        })} */}
      </div>
    </div>
  );
};
