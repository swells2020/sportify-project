import React, { useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../react-contexts/AuthenticationContext";

const PasswordReset = (props) => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const emailRef = useRef();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      navigate("/login");
    } catch {
      setError("Failed to reset password, please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Send Help!
            </Button>
          </Form>
          <div className="text-center mt-3">
            <Link to="/login">Return to login page.</Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default PasswordReset;
