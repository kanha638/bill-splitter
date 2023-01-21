import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SignUpUser } from "../api/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState(false);
  const changeHandler = (e) => {
    setFormError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.username
    ) {
      if (formData.password === formData.confirmPassword) {
        await SignUpUser(formData, dispatch, navigate);
      } else {
        alert("Both Password Should match");
      }
    } else {
      setFormError(true);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-200 ">
        <div
          id="form"
          className="block bg-slate-50 p-6 rounded-xl shodow-md shadow-slate-300 w-90 "
        >
          <form onSubmit={submitHandler}>
            <h2 className="text-blue-700 text-3xl font-semibold my-4">
              Sign-Up
            </h2>
            <div id="fullName" className="flex flex-row">
              <div id="firstName" className="w-1/2 mr-1">
                <label for="fname" className="text-sm">
                  First Name
                </label>
                <br />
                <input
                  type="text"
                  name="firstName"
                  onChange={changeHandler}
                  id="fname"
                  className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"
                />
              </div>

              <div id="lastName" className="w-1/2 mr-1">
                <label for="lname" className="text-sm">
                  Last Name
                </label>
                <br />
                <input
                  type="text"
                  name="lastName"
                  id="lname"
                  onChange={changeHandler}
                  className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"
                />
              </div>
            </div>
            <label for="email" className="text-sm">
              Username
            </label>
            <br />
            <input
              type="text"
              name="username"
              id="email"
              onChange={changeHandler}
              className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"
            />
            <label for="email" className="text-sm">
              Email
            </label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              onChange={changeHandler}
              className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"
            />
            <label
              for="password"
              className="text-sm"
              style={{ marginTop: "20px" }}
            >
              Password
            </label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              onChange={changeHandler}
              className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"
            />
            <label for="confirmPassword" className="text-sm my-10">
              Confirm Password
            </label>
            <br />
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              onChange={changeHandler}
              className="h-8 w-full rounded-md border border-slate-300 text-sm pl-2 bg-transparent outline-blue-600 shadow-sm"
            />
            <input
              type="submit"
              name=""
              id="signUp"
              className="bg-blue-700 w-full h-10 my-7 cursor-pointer text-white rounded-md hover:bg-blue-600 hover:outline outline-2 outline-blue-600 outline-offset-2 text-sm"
            />
            <br />
            <p className="text-xs my-2">
              Already have a account?{" "}
              <Link to="/signin" className="text-blue-600">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
