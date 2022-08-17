
import { useState } from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import {
  AiOutlineHome,
  AiOutlineUnorderedList,
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineHeart,
} from "react-icons/ai";
import { useAuth } from "../react-contexts/AuthenticationContext";
import { useLocation, useNavigate } from 'react-router-dom';
import "./navbar.css";

function NavBar({ setShow }) {
  const [error, setError] = useState();
  const { currentUser } = useAuth();
  const handleShow = () => setShow(true);
  const { logOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    setError("");
    try {
      await logOut();
      navigate("/home")
      
    } catch {
      setError("Failed to sign out, please try again");
    }
  }
  return (
    <Navbar
      fixed="bottom"
      bg="light"
      className="justify-content-center"
      style={{ borderTop: "1px solid #bebebe", height: "60px" }}
    >
      <Nav.Item
        style={{
          padding: "10px",
          paddingRight: "30px",
          textAlign: "center",
          fontSize: "12px",
        }}
      >
        <Nav.Link href="/">
          <AiOutlineHome size={30} />
        </Nav.Link>
        Home
      </Nav.Item>
      <Nav.Item
        style={{
          padding: "10px",
          paddingRight: "30px",
          textAlign: "center",
          fontSize: "12px",
        }}
      >
        {currentUser ? (
          <NavDropdown title={<AiOutlineUser size={30} />} drop="up">
            <NavDropdown.Item href={`/users/${currentUser.uid}`}>
              View Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleSignOut}>Log Out</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Nav.Link onClick={handleShow}>
            <AiOutlineUser size={30} />
          </Nav.Link>
        )}
        Profile
      </Nav.Item>
      <Nav.Item
        style={{
          padding: "10px",
          paddingRight: "30px",
          textAlign: "center",
          fontSize: "12px",
        }}
      >
        {currentUser ? (
          <Nav.Link href="/schedule">
            <AiOutlineCalendar size={30} />
          </Nav.Link>
        ) : (
          <Nav.Link onClick={handleShow}>
            <AiOutlineCalendar size={30} />
          </Nav.Link>
        )}
        Schedule
      </Nav.Item>
      <Nav.Item
        style={{
          padding: "10px",
          paddingRight: "30px",
          textAlign: "center",
          fontSize: "12px",
        }}
      >
        {currentUser ? (
          <Nav.Link href="/feed">
            <AiOutlineUnorderedList size={30} />
          </Nav.Link>
        ) : (
          <Nav.Link onClick={handleShow}>
            <AiOutlineUnorderedList size={30} />
          </Nav.Link>
        )}
        Feed
      </Nav.Item>
      <Nav.Item
        style={{ padding: "10px", textAlign: "center", fontSize: "12px" }}
      >
        {currentUser ? (
          <Nav.Link href="/wishlist">
            <AiOutlineHeart size={30} />
          </Nav.Link>
        ) : (
          <Nav.Link onClick={handleShow}>
            <AiOutlineHeart size={30} />
          </Nav.Link>
        )}
        Wishlist
      </Nav.Item>
    </Navbar>
  );
}

export default NavBar;
