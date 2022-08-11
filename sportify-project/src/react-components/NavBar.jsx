import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { useAuth } from '../react-contexts/AuthenticationContext';

function NavBar({setShow}) {
  const { currentUser } = useAuth();
  const handleShow = () => setShow(true);
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
      {currentUser ? <Nav.Link href={`/users/${currentUser.uid}`}>
          <AiOutlineUser size={40} />
        </Nav.Link> : <Nav.Link onClick={handleShow}><AiOutlineUser size={35} /> </Nav.Link>}

      </Nav.Item>
    </Navbar>
  );
}

export default NavBar;
