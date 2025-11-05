import React, { useState } from "react";
import { Modal, Button, Tab, Nav, Form } from "react-bootstrap";

export default function AuthModal({ show, handleClose }) {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <Modal 
        show={show} 
        onHide={handleClose} 
        centered
        style={{ zIndex: 2000 }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{activeTab === "login" ? "Login" : "Sign Up"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <Tab.Pane eventKey="login">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email / Phone</Form.Label>
                  <Form.Control type="text" placeholder="Enter email or phone" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter password" />
                </Form.Group>
                <Button variant="primary" className="w-100">
                  Login
                </Button>
              </Form>
            </Tab.Pane>

            <Tab.Pane eventKey="signup">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email address" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" placeholder="Enter phone number" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Create password" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select>
                    <option value="user">User (Standard)</option>
                    <option value="creator">Creator/Service Provider</option>
                    <option value="admin">Admin</option>
                  </Form.Select>
                </Form.Group>
                
                <Button variant="success" className="w-100"> Sign Up </Button>
              </Form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
}