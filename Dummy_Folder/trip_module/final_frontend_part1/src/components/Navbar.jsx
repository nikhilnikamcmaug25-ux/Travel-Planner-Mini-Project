import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";

export default function AppNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/" || location.pathname === "/home";
  const [solid, setSolid] = useState(!isHome);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    setIsLoggedIn(!!token);
    setRole(storedRole || "");
  }, [location]); // update state when route changes

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }
    const onScroll = () => setSolid(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const brandStyle = solid ? { color: "#0b1220" } : { color: "#fff" };
  const linkClass = () => (solid ? "text-dark mx-2" : "text-white mx-2");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/"); // redirect to home
  };

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className="py-3"
        style={{
          zIndex: 1060,
          backgroundColor: solid ? "rgba(255,255,255,0.98)" : "transparent",
          transition: "background-color 220ms ease, box-shadow 220ms ease",
          boxShadow: solid ? "0 6px 18px rgba(16,24,40,0.06)" : "none",
        }}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" style={{ fontWeight: 700, ...brandStyle }}>
            Traveleva
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="nav-collapse"
            className={solid ? "" : "border-white"}
          />
          <Navbar.Collapse id="nav-collapse" className="justify-content-end">
            <Nav className="align-items-center">
              <Nav.Link as={NavLink} to="/" className={linkClass()}>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/about" className={linkClass()}>
                About
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact" className={linkClass()}>
                Contact
              </Nav.Link>

              {/* 👇 Show admin link if logged in as admin */}
              {role === "admin" && (
                <Nav.Link as={NavLink} to="/admin" className={linkClass()}>
                  Admin
                </Nav.Link>
              )}

              <div className="d-flex ms-3">
                {isLoggedIn ? (
                  <Button
                    variant={solid ? "outline-danger" : "light"}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    variant={solid ? "primary" : "light"}
                    onClick={() => setShowModal(true)}
                  >
                    Login / Signup
                  </Button>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 👇 Auth Modal */}
      <AuthModal show={showModal} handleClose={() => setShowModal(false)} />
    </>
  );
}
