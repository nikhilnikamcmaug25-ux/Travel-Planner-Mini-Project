import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import api from "../api";

export default function ItineraryForm({ trip_id, onSaved }) {
  const [activity, setActivity] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/api/itinerary/add", { trip_id, activity, date, time });
    onSaved && onSaved();
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group className="mb-2">
        <Form.Label>Activity</Form.Label>
        <Form.Control value={activity} onChange={e=>setActivity(e.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={e=>setDate(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Time</Form.Label>
        <Form.Control type="time" value={time} onChange={e=>setTime(e.target.value)} />
      </Form.Group>
      <Button type="submit">Add</Button>
    </Form>
  );
}
