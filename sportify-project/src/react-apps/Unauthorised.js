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

const Unauthorised = (props) => {
  const [show, setShow] = useState(false);
  const [loginComponent, setLoginComponent] = useState("Log In");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Container>
        <Header />

        <nav>
          <Link to="/home">
            <Button>Home</Button>
          </Link>
          <Button variant="primary" onClick={handleShow}>
            Login
          </Button>

          <Modal show={show} onHide={handleClose}>
            {loginComponent === "Log In" ? (
              <Login setLoginComponent={setLoginComponent} />
            ) : null}
            {loginComponent === "Sign Up" ? (
              <SignUp setLoginComponent={setLoginComponent} />
            ) : null}
          </Modal>
          <Link to="/passwordreset">
            <Button>PasswordReset</Button>
          </Link>
        </nav>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/passwordreset" element={<PasswordReset />} />
          <Route path="/events/:eventId" element={<SingleEvent />} />
        </Routes>
        <NavBar setShow={setShow} />
        <NavBar />
        <p>UnauthorisedApp</p>
        <p>Not signed in.</p>
      </Container>
    </div>
  );
};

export default Unauthorised;
