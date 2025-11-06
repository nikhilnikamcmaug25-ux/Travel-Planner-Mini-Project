import React, { useEffect, useState } from "react";
import { Container, Button, Row, Col, Card, Modal } from "react-bootstrap";
import api from "../api";
import useAuth from "../auth/useAuth";
import TripForm from "./TripForm";
import TripDetails from "./TripDetails";

export default function UserDashboard() {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState(null);

  const fetchTrips = async () => {
    try {
      const res = await api.get(`/api/trips/${user.id}`);
      setTrips(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=> { if (user) fetchTrips(); }, [user]);

  return (
    <Container>
      <Row className="mb-3">
        <Col><h3>Your Trips</h3></Col>
        <Col className="text-end">
          <Button onClick={()=> setShowForm(true)}>Add Trip</Button>
        </Col>
      </Row>

      <Row>
        {trips.map(trip => (
          <Col md={4} key={trip.trip_id} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{trip.destination}</Card.Title>
                <Card.Text>From: {trip.start_date || "N/A"} To: {trip.end_date || "N/A"}</Card.Text>
                <Button className="me-2" onClick={() => setSelectedTrip(trip)}>Details</Button>
                <Button variant="danger" onClick={async () => {
                  await api.delete(`/api/trips/${trip.trip_id}`);
                  fetchTrips();
                }}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showForm} onHide={()=>setShowForm(false)}>
        <Modal.Header closeButton><Modal.Title>Add Trip</Modal.Title></Modal.Header>
        <Modal.Body>
          <TripForm onSaved={()=>{ setShowForm(false); fetchTrips(); }} />
        </Modal.Body>
      </Modal>

      <Modal show={!!selectedTrip} size="lg" onHide={()=>setSelectedTrip(null)}>
        <Modal.Header closeButton><Modal.Title>Trip Details</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedTrip && <TripDetails trip={selectedTrip} onUpdate={fetchTrips} />}
        </Modal.Body>
      </Modal>
    </Container>
  );
}
