import React, { useState } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import api from "../api";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/contact", { name, email, subject, message });
      setOk("Message sent");
      setName(""); setEmail(""); setSubject(""); setMessage("");
    } catch (err) {
      setOk("Failed to send");
    }
  };

  return (
    <Container style={{ maxWidth: 600 }}>
      <h3>Contact Us</h3>
      {ok && <Alert variant="info">{ok}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control value={name} onChange={e=>setName(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Subject</Form.Label>
          <Form.Control value={subject} onChange={e=>setSubject(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={4} value={message} onChange={e=>setMessage(e.target.value)} required />
        </Form.Group>
        <Button type="submit">Send</Button>
      </Form>
    </Container>
  );
}
