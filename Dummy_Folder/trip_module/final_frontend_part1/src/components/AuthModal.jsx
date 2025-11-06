import React, { useState } from "react";
import { Modal, Button, Tab, Nav, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../api";

export default function AuthModal({ show, handleClose }) {
  const [activeTab, setActiveTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Updated Login Function
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // ✅ Save token & role
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.role || "user");

      setMessage("✅ Login successful!");

      // ✅ Redirect logic
      setTimeout(() => {
        handleClose();
        if (res.role === "admin") {
          navigate("/admin"); // Admin goes to dashboard
        } else {
          navigate("/"); // Others go to homepage
        }
      }, 1000);
    } catch (err) {
      setMessage("❌ " + (err.message || "Login failed"));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      setMessage("✅ Registration successful! Please login.");
      setActiveTab("login");
    } catch (err) {
      setMessage("❌ " + (err.message || "Registration failed"));
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered style={{ zIndex: 2000 }}>
      <Modal.Header closeButton>
        <Modal.Title>{activeTab === "login" ? "Login" : "Sign Up"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant="info">{message}</Alert>}
        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Nav variant="tabs" className="mb-3 justify-content-center">
            <Nav.Item>
              <Nav.Link eventKey="login">Login</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="signup">Sign Up</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            {/* LOGIN TAB */}
            <Tab.Pane eventKey="login">
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                  />
                </Form.Group>
                <Button variant="primary" className="w-100" type="submit">
                  Login
                </Button>
              </Form>
            </Tab.Pane>

            {/* SIGNUP TAB */}
            <Tab.Pane eventKey="signup">
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="user">User (Standard)</option>
                    <option value="creator">Creator / Service Provider</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="success" className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
}
