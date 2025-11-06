import React, { useState } from "react";
import { Modal, Button, Tab, Nav, Form, Alert } from "react-bootstrap";
import { apiRequest } from "../api";

export default function AuthModal({ show, handleClose }) {
  const [activeTab, setActiveTab] = useState("login");
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleLogin(e) {
    e.preventDefault();
    setError(""); setMessage("");
    try {
      const res = await apiRequest("/users/login", "POST", form);
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      setMessage("Login successful!");
      setTimeout(() => handleClose(), 1000);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setError(""); setMessage("");
    try {
      await apiRequest("/users/register", "POST", form);
      setMessage("Account created! Please login.");
      setActiveTab("login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{activeTab === "login" ? "Login" : "Sign Up"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <Tab.Container activeKey={activeTab} onSelect={setActiveTab}>
          <Nav variant="tabs" className="mb-3 justify-content-center">
            <Nav.Item><Nav.Link eventKey="login">Login</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link eventKey="signup">Sign Up</Nav.Link></Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="login">
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleChange}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" type="password" placeholder="Enter password" onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" className="w-100" type="submit">Login</Button>
              </Form>
            </Tab.Pane>

            <Tab.Pane eventKey="signup">
              <Form onSubmit={handleSignup}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" onChange={handleChange} placeholder="Enter name"/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" type="email" onChange={handleChange} placeholder="Enter email"/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" type="password" onChange={handleChange} placeholder="Create password"/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="success" className="w-100" type="submit">Sign Up</Button>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
}
