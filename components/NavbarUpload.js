import { Nav, Button, Container, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useRouter } from "next/router";

import Link from "next/link";
const NavbarComponent = () => {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const authenticatedUser = useSelector((state) => state.auth.authenticatedUser);

  const onSignOutClick = async () => {
    dispatch(logout());
  };
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img width={40} src="../../../assets/logoteamone.png" />
          <span>Team 1</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto " style={{ width: "100%" }}>
            <Link href={"/Upload/UploadVideo"} passHref>
              <Nav.Link>Video</Nav.Link>
            </Link>
            <Link href={"/Upload/UploadAudio"} passHref>
              <Nav.Link>Audio</Nav.Link>
            </Link>
          </Nav>
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            {authenticatedUser ? (
              <Button variant="outline-danger" disabled={auth.isSignOutLoading} onClick={onSignOutClick}>
                Logout
              </Button>
            ) : (
              <>
                <Link href={"/login"} passHref>
                  <Nav.Link>Login</Nav.Link>
                </Link>
                <Link href={"/register"} passHref>
                  <Nav.Link>Register</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavbarComponent;
