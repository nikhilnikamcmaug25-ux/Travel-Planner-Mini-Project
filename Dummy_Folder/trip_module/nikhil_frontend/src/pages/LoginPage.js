import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api";
import useAuth from "../auth/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const { login } = useAuth();
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const res = await api.post("/api/users/login", { email, password });
      const token = res.data.token;
      if (!token) {
        setErr("No token returned");
        return;
      }
      login(token);
      // route based on role
      const role = res.data.role || (JSON.parse(atob(token.split('.')[1])).role);
      if (role === "admin") nav("/admin");
      else nav("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.message || error.message);
    }
  };

  return (
    <Container style={{ maxWidth: 480 }}>
      <h2 className="mb-3">Login</h2>
      {err && <Alert variant="danger">{err}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        </Form.Group>
        <Button type="submit">Login</Button>
      </Form>
    </Container>
  );
}
