import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import profile from "../../assets/profile.png";
import "./_Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserTie,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand className="fw-bold" href="/">
          Bookies📚
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Nav.Link className="text-dark me-0 me-lg-2 my-0" href="/all-books">
              All Books
            </Nav.Link>
            <Nav.Link
              className="text-dark me-0 me-lg-2 my-0"
              href="/announcements"
            >
              Announcements
            </Nav.Link>

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
              <NavDropdown.Item eventKey="4.2">
                <FontAwesomeIcon className="me-2" icon={faRightFromBracket} />{" "}
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
