import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Button, Container, Modal } from "react-bootstrap";
import { useState } from "react";
import Home from "../react-components/Home";
import Header from "../react-components/Header";
import SignUp from "../react-components/Signup";
import Login from "../react-components/LogIn";
import PasswordReset from "../react-components/PasswordReset";
import SingleEvent from "../react-components/SingleEvent";
import NavBar from "../react-components/NavBar";
import UserProfile from "../react-components/UserProfile";

const Unauthorised = (props) => {
  const [show, setShow] = useState(false);
  const [loginComponent, setLoginComponent] = useState("Log In");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Container>
        {/* <Header /> */}
        <nav>
          <Modal show={show} onHide={handleClose}>
            {loginComponent === "Log In" ? (
              <Login setLoginComponent={setLoginComponent} />
            ) : null}
            {loginComponent === "Sign Up" ? (
              <SignUp setLoginComponent={setLoginComponent} />
            ) : null}
            {loginComponent === "Forgotten Password" ? (
              <PasswordReset setLoginComponent={setLoginComponent} />
            ) : null}
          </Modal>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/events/:eventId" element={<SingleEvent />} />
          <Route path="/users/:userId" element={<UserProfile />} />
        </Routes>
        <NavBar setShow={setShow} />
      </Container>
    </div>
  );
};

export default Unauthorised;
