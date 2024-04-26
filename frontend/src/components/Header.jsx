import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { userLogout } from "../features/users/userLogin";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  const { loading, userInfo, error } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  return (
    <Navbar
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
      collapseOnSelect
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">Toomz</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer to="/movielist">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i>MovieList
              </Nav.Link>
            </LinkContainer>
            {userInfo._id ? (
              <>
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i className="fa fa-user"></i>Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={() => dispatch(userLogout())}>
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i>Login
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
