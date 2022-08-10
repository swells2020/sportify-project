import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

import Home from "../react-components/Home";
import Header from "../react-components/Header";
import NavBar from "../react-components/NavBar";
import SignUp from "../react-components/Signup";
import Login from "../react-components/LogIn";
import PasswordReset from "../react-components/PasswordReset";
import SingleEvent from "../react-components/SingleEvent";

const Unauthorised = (props) => {
  return (
    <div>
      <Container>
        <Header />
        <nav>
          <Link to="/home">
            <Button>Home</Button>
          </Link>
          <Link to="/signup">
            <Button>SignUp</Button>
          </Link>
          <Link to="/login">
            <Button>LogIn</Button>
          </Link>
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
        <NavBar />
        <p>UnauthorisedApp</p>
        <p>Not signed in.</p>
      </Container>
    </div>
  );
};

export default Unauthorised;
