import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <Link to="/">Goal Setter</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/login">
              {" "}
              <Link to="/login">
                <FaSignInAlt />
                Login
              </Link>
            </Nav.Link>
            <Nav.Link href="/register">
              <Link to="/register">
                <FaUser />
                Register
              </Link>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
