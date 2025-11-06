import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../api";
import useAuth from "../auth/useAuth";

export default function TripForm({ onSaved }) {
  const { user } = useAuth();
  const [destination, setDestination] = useState("");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/api/trips", {
      user_id: user.id,
      destination,
      start_date,
      end_date
    });
    onSaved && onSaved();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-2">
        <Form.Label>Destination</Form.Label>
        <Form.Control value={destination} onChange={e=>setDestination(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Start Date</Form.Label>
        <Form.Control type="date" value={start_date} onChange={e=>setStartDate(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>End Date</Form.Label>
        <Form.Control type="date" value={end_date} onChange={e=>setEndDate(e.target.value)} />
      </Form.Group>
      <Button type="submit">Save</Button>
    </Form>
  );
}
