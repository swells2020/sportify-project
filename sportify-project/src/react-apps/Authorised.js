import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import { useAuth } from "../react-contexts/AuthenticationContext";

import Home from "../react-pages/Home";
import LogOut from "../react-components/LogOut";

const Authorised = (props) => {
  const { currentUser } = useAuth();

  return (
    <Container>
      <h1>AuthorisedApp</h1>
      <h2>Signed in as {currentUser.email}</h2>
      <nav>
        <LogOut />
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Container>
  );
};

export default Authorised;
