import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Alert, Button, Container } from "react-bootstrap";

import { useAuth } from "../react-contexts/AuthenticationContext";

import Home from "../react-pages/Home";

const Authorised = (props) => {
  const [error, setError] = useState();
  const { currentUser, logOut } = useAuth();

  async function handleSignOut() {
    setError("");
    try {
      await logOut();
    } catch {
      setError("Failed to sign out, please try again");
    }
  }

  return (
    <Container>
      <h1>AuthorisedApp</h1>
      <h2>Signed in as {currentUser.email}</h2>
      <nav>
        <Button onClick={handleSignOut}>Sign Out</Button>
        {error && <Alert variant="danger">{error}</Alert>}
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Container>
  );
};

export default Authorised;
