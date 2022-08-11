import React, { useRef, useState } from "react";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../react-contexts/AuthenticationContext";

const Login = ({ setLoginComponent }) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { logIn } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
      navigate("/home");
    } catch {
      setError("Failed to log in, please try again.");
      setLoading(false);
    }
  }

  function switchComponent() {
    setLoginComponent("Sign Up");
  }

  return (
    <>
      <header className="loginHeader">
        <h2 className="text-center mb-4">Log In</h2>

        <div className="loginHeaderDiv">
          <div className="loginHeaderButtons">
            <button
              style={{
                background: "transparent",
                border: "none",
                borderBottom: "1px solid #000",
                padding: "10px",
              }}
            >
              Log In
            </button>
          </div>
          <div className="loginHeaderButtons">
            <button
              onClick={switchComponent}
              style={{
                background: "transparent",
                border: "none",
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
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" ref={emailRef} required></Form.Control>
          </Form.Group>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              ref={passwordRef}
              required
            ></Form.Control>
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-4" type="submit">
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </>
  );
};

export default Login;
