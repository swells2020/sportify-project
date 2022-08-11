import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineBell, AiOutlineUser } from "react-icons/ai";
import { useAuth } from '../react-contexts/AuthenticationContext';

function NavBar({setShow}) {
  const { currentUser } = useAuth();
  const handleShow = () => setShow(true);
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
      {currentUser ? <Nav.Link href={`/users/${currentUser.uid}`}>
          <AiOutlineUser size={35} />
        </Nav.Link> : <Nav.Link onClick={handleShow}><AiOutlineUser size={35} /> </Nav.Link>}
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;
