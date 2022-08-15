import React, { useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../react-contexts/AuthenticationContext";
import "./signup.css";

const SignUp = ({ setLoginComponent }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const locationRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const navigate = useNavigate();
  const { signUp } = useAuth();

  function switchComponent() {
    setLoginComponent("Log In");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(
        usernameRef.current.value,
        firstNameRef.current.value,
        lastNameRef.current.value,
        locationRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
    } catch (error) {
      setError("Failed to create an account, please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <header className="loginHeader">
        <h2 className="text-center mb-4">Sign Up</h2>

        <div className="loginHeaderDiv">
          <div className="loginHeaderButtons">
            <button
              onClick={switchComponent}
              style={{
                background: "transparent",
                border: "none",
                padding: "10px",
              }}
            >
              Log In
            </button>
          </div>
          <div className="loginHeaderButtons">
            <button
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #000",
                padding: "10px",
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="username">
            <Form.Label className="mt-2">Username</Form.Label>
            <Form.Control
              type="username"
              ref={usernameRef}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="firstName">
            <Form.Label className="mt-2">First Name</Form.Label>
            <Form.Control
              type="firstName"
              ref={firstNameRef}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="lastName">
            <Form.Label className="mt-2">Last Name</Form.Label>
            <Form.Control
              type="lastName"
              ref={lastNameRef}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="Location">
            <Form.Label className="mt-2">Location</Form.Label>
            <Form.Control
              type="location"
              ref={locationRef}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="email">
            <Form.Label className="mt-2">Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required></Form.Control>
          </Form.Group>
          <Form.Group id="password">
            <Form.Label className="mt-2">Password</Form.Label>
            <Form.Control
              type="password"
              ref={passwordRef}
              required
            ></Form.Control>
          </Form.Group>
          <Form.Group id="password">
            <Form.Label className="mt-2">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              ref={passwordConfirmRef}
              required
            ></Form.Control>
          </Form.Group>
          <Button disabled={loading} type="submit" className="w-100 mt-4">
            Sign Up
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default SignUp;
