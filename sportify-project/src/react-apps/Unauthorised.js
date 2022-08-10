import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Button, Container, Modal } from "react-bootstrap";
import { useState } from "react"
import Home from "../react-pages/Home";
import SignUp from "../react-components/Signup";
import Login from "../react-components/LogIn";
import PasswordReset from "../react-components/PasswordReset";

const Unauthorised = (props) => {
  const [show, setShow] = useState(false);
  const [loginComponent, setLoginComponent] = useState('Log In')


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Container>
        <h1>UnauthorisedApp</h1>
        <h2>Not signed in.</h2>
        <nav>
          <Link to="/home">
            <Button>Home</Button>
          </Link>
          <Button variant="primary" onClick={handleShow}>
          Login
        </Button>
  
        <Modal show={show} onHide={handleClose}>
        {(loginComponent === 'Log In') ? <Login setLoginComponent={setLoginComponent} /> : null}
        {(loginComponent === 'Sign Up') ? <SignUp setLoginComponent={setLoginComponent} /> : null}
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
        </Routes>
      </Container>
    </div>
  );
};

export default Unauthorised;
