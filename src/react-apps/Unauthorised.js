import React from "react";
import { Link, Routes, Route } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

import Home from "../react-pages/Home";
import SignUp from "../react-components/Signup";
import Login from "../react-components/LogIn";
import PasswordReset from "../react-components/PasswordReset";

const Unauthorised = (props) => {
  return (
    <div>
      <Container>
        <h1>UnauthorisedApp</h1>
        <h2>Not signed in.</h2>
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
        </Routes>
      </Container>
    </div>
  );
};

export default Unauthorised;
