import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import api from "../api";
import useAuth from "../auth/useAuth";

export default function FeedbackForm() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/feedback", { user_id: user.id, message });
      setOk("Feedback submitted");
      setMessage("");
    } catch (err) {
      setOk("Failed to send");
    }
  };

  return (
    <Container style={{ maxWidth: 600 }}>
      <h3>Feedback</h3>
      {ok && <Alert variant="info">{ok}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={4} value={message} onChange={e=>setMessage(e.target.value)} required />
        </Form.Group>
        <Button type="submit" className="mt-2">Send</Button>
      </Form>
    </Container>
  );
}
