import { FaSignInAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <Link to="/">Goal Setter</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            {user ? (
              <Nav.Link href="/login">
                <Button variant="outline-primary" onClick={onLogout}>
                  Logout
                </Button>
              </Nav.Link>
            ) : (
              <>
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
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
