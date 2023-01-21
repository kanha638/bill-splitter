import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SignInUser } from "../api/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const initialState = {
    email: "",
    password: "",
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
    console.log(formData);
    if (formData.email && formData.password) {
      await SignInUser(formData, dispatch, navigate);
    } else {
      setFormError(true);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-200">
        <div
          id="form"
          className="block bg-slate-50 p-6 rounded-xl shodow-md shadow-slate-300 w-100 "
          style={{
            minWidth: "300px",
          }}
        >
          <form
            action=""
            onSubmit={submitHandler}
            style={{
              minWidth: "300px",
            }}
          >
            <h2 className="text-blue-700 text-3xl font-semibold my-4">
              Sign-In
            </h2>

            <label for="email" className="text-sm">
              Email
            </label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
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
              value={formData.password}
              onChange={changeHandler}
              id="password"
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
              Do not have any account ?{" "}
              <Link to="/signup" className="text-blue-600">
                Sign-Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
