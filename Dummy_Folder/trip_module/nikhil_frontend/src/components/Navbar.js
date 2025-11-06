
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function NavBar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={Link} to="/">Travel Planner</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            {!user && <Nav.Link as={Link} to="/login">Login</Nav.Link>}
            {!user && <Nav.Link as={Link} to="/register">Register</Nav.Link>}
            {user && user.role === "user" && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
            {user && user.role === "admin" && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          <Nav>
            {user && (
              <>
                <Navbar.Text className="me-2">Signed in as: <b>{user.role}</b></Navbar.Text>
                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
