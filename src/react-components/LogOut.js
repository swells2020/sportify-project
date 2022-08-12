import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";

import { useAuth } from "../react-contexts/AuthenticationContext";

const SignOut = (props) => {
  const [error, setError] = useState();
  const { logOut } = useAuth();

  async function handleSignOut() {
    setError("");
    try {
      await logOut();
    } catch {
      setError("Failed to sign out, please try again");
    }
  }
  return (
    <>
      <Button onClick={handleSignOut}>Sign Out</Button>
      {error && <Alert variant="danger">{error}</Alert>}
    </>
  );
};

export default SignOut;
