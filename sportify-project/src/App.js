import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { useAuth } from "./react-contexts/AuthenticationContext";

import Authorised from "./react-apps/Authorised";
import Unauthorised from "./react-apps/Unauthorised";

function App() {
  const { currentUser } = useAuth();

  return <Router>{currentUser ? <Authorised /> : <Unauthorised />}</Router>;
}

export default App;
