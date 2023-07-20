import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import profile from "../../assets/profile.png";
import "./_Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { signOut } from "@firebase/auth";
import { setUser } from "../../redux/features/users/userSlice";
import { auth } from "../../lib/firebase";

export default function Header() {
  const { user, isLoading } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    console.log("Logout");
    signOut(auth)
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {});
  };

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand className="fw-bold" href="/">
          Bookies📚
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link className="text-dark me-0 me-lg-2 my-0" href="/">
              Home
            </Nav.Link>
            <Nav.Link className="text-dark me-0 me-lg-2 my-0" href="/all-books">
              All Books
            </Nav.Link>
            {user.email && (
              <Nav.Link
                className="text-dark me-0 me-lg-2 my-0"
                href="/add-new-book"
              >
                Add New
              </Nav.Link>
            )}
            <Nav.Link
              className="text-dark me-0 me-lg-2 my-0"
              href="/announcements"
            >
              Announcements
            </Nav.Link>

            {user.email ? (
              <NavDropdown
                title={<img src={profile} alt="" width="40" height="40" />}
                id="profile-dropdown"
              >
                <NavDropdown.Item eventKey="4.0" disabled>
                  Name
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="4.1">
                  <FontAwesomeIcon className="me-2" icon={faUser} /> Profile
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="4.2" onClick={handleLogout}>
                  <FontAwesomeIcon className="me-2" icon={faRightFromBracket} />{" "}
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link
                  className="text-dark me-0 me-lg-2 my-0"
                  href="/signup"
                >
                  Signup
                </Nav.Link>
                <Nav.Link className="text-dark me-0 me-lg-2 my-0" href="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
