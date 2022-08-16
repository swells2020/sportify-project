import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { useAuth } from "../react-contexts/AuthenticationContext";

const PrivateRoute = ({ children, redirectRoute, ...rest }) => {
  const currentUser = useAuth();

  return (
    <Routes>
      <Route>{!currentUser ? <Navigate  to={redirectRoute}/> : children}</Route>
    </Routes>
  );
};

export default PrivateRoute;
