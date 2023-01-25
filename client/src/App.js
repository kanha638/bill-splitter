import React from "react";
import Dashboard from "./Components/Dashboard";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserState } from "./features/userSlice";

const App = () => {
  const userState = useSelector(UserState);
  return (
    <div style={{ height: "100vh" }}>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              userState?.isLoggedIn === true ? <Dashboard /> : <SignIn />
            }
          />
          <Route
            path="/signin"
            element={
              userState?.isLoggedIn === true ? <Dashboard /> : <SignIn />
            }
          />
          <Route
            path="/signup"
            element={
              userState?.isLoggedIn === true ? <Dashboard /> : <SignUp />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
