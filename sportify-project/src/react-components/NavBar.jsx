import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineBell, AiOutlineUser } from "react-icons/ai";

function NavBar() {
  return (
    <Navbar
      activeKey="/home"
      fixed="bottom"
      bg="light"
      className="justify-content-center"
    >
      <Nav.Item style={{ padding: "10px", paddingRight: "30px" }}>
        <Nav.Link href="/">
          <AiOutlineHome size={40} />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item style={{ padding: "10px", paddingRight: "30px" }}>
        <Nav.Link href="/alerts">
          <AiOutlineBell size={40} />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item style={{ padding: "10px" }}>
        <Nav.Link href="/profile">
          <AiOutlineUser size={40} />
        </Nav.Link>
      </Nav.Item>
    </Navbar>
  );
}

export default NavBar;
