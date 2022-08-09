import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineBell, AiOutlineUser } from "react-icons/ai";

function NavBar() {
  return (
    <Nav activeKey="/home">
      <Nav.Item>
        <Nav.Link href="/">
          <AiOutlineHome size={35} />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/alerts">
          <AiOutlineBell size={35} />
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/profile">
          <AiOutlineUser size={35} />
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;
