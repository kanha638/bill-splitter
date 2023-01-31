import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Form } from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import { getAllUser } from "../api/auth";
import { createNewEvent } from "../api/event";
import { UserState } from "../features/userSlice";

const friendOptions = [
  {
    key: "Jenny Hess",
    text: "Jenny Hess",
    value: "Jenny Hess",
    image: { avatar: true, src: "/images/avatar/small/jenny.jpg" },
  },
  {
    key: "Elliot Fu",
    text: "Elliot Fu",
    value: "Elliot Fu",
    image: { avatar: true, src: "/images/avatar/small/elliot.jpg" },
  },
  {
    key: "Stevie Feliciano",
    text: "Stevie Feliciano",
    value: "Stevie Feliciano",
    image: { avatar: true, src: "/images/avatar/small/stevie.jpg" },
  },
  {
    key: "Christian",
    text: "Christian",
    value: "Christian",
    image: { avatar: true, src: "/images/avatar/small/christian.jpg" },
  },
  {
    key: "Matt",
    text: "Matt",
    value: "Matt",
    image: { avatar: true, src: "/images/avatar/small/matt.jpg" },
  },
  {
    key: "Justen Kitsune",
    text: "Justen Kitsune",
    value: "Justen Kitsune",
    image: { avatar: true, src: "/images/avatar/small/justen.jpg" },
  },
];

const options = [
  { key: "m", text: "Male", value: "male" },
  { key: "f", text: "Female", value: "female" },
  { key: "o", text: "Other", value: "other" },
];

const initialValue = {
  name: "",
  desc: "",
  invitedUsers: [],
};
const EventForm = ({ setFlag, setOpenForm }) => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const userState = useSelector(UserState);
  const [eventForm, setEventForm] = useState(initialValue);
  useEffect(() => {
    const fetchUsers = async () => {
      if (userState?.allUsers.length === 0) {
        await getAllUser(dispatch, setUsers, userState?.userInfo?.id);
      } else {
        setUsers(userState?.allUsers);
      }
    };
    return () => {
      fetchUsers();
    };
  }, []);
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(eventForm);

    await createNewEvent(dispatch, eventForm, setFlag);
    setOpenForm(false);
  };
  return (
    <>
      {userState?.isPending === false && (
        <Form onSubmit={submitHandler}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Event's Name"
              placeholder="Enter Event Name"
              name="name"
              value={eventForm.name}
              onChange={(e) => {
                setEventForm({ ...eventForm, [e.target.name]: e.target.value });
              }}
            />
          </Form.Group>
          <Form.TextArea
            label="Description"
            placeholder="Tell us more about the event"
            name="desc"
            value={eventForm.desc}
            onChange={(e) => {
              setEventForm({ ...eventForm, [e.target.name]: e.target.value });
            }}
          />

          <Dropdown
            // labeled
            placeholder="Invite/Add Users"
            fluid
            multiple
            search
            selection
            onAddItem={(e) => {
              console.log(e);
            }}
            onChange={(e, data) => {
              setEventForm({ ...eventForm, ["invitedUsers"]: data.value });
            }}
            options={users}
          />

          <Form.Button
            color="black"
            style={{ marginTop: "15px" }}
            type="submit"
          >
            Submit
          </Form.Button>
        </Form>
      )}
    </>
  );
};

export default EventForm;
