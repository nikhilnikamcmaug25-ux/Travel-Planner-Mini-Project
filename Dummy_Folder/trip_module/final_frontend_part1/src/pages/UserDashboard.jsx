// frontend/src/pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import { Container, Button, Form, Table, Alert, Spinner, Collapse } from "react-bootstrap";
import {
  addTrip,
  getTrips,
  deleteTrip,
  submitFeedback,
  addItinerary,
  getItineraries,
  deleteItinerary,
} from "../api";

export default function UserDashboard() {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id"); // make sure login stores this
  const role = localStorage.getItem("role");

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tripData, setTripData] = useState({ destination: "", start_date: "", end_date: "" });
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  // itinerary
  const [itineraryData, setItineraryData] = useState({ activity: "", date: "", time: "" });
  const [openTrip, setOpenTrip] = useState(null);
  const [itineraries, setItineraries] = useState({});
  const [standaloneItinerary, setStandaloneItinerary] = useState({
    trip_id: "",
    activity: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    if (!token || role !== "user") {
      setStatus({ type: "error", message: "Access denied. Only users allowed." });
      setLoading(false);
      return;
    }
    loadTrips();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadTrips() {
    try {
      setLoading(true);
      const tripsRes = await getTrips(userId, token);
      setTrips(tripsRes || []);
      setLoading(false);
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to load trips" });
      setLoading(false);
    }
  }

  async function handleAddTrip(e) {
    e.preventDefault();
    try {
      await addTrip({ user_id: userId, ...tripData }, token);
      setStatus({ type: "success", message: "Trip added successfully!" });
      setTripData({ destination: "", start_date: "", end_date: "" });
      await loadTrips();
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to add trip" });
    }
  }

  async function handleDeleteTrip(trip_id) {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;
    try {
      await deleteTrip(trip_id, token);
      setTrips((prev) => prev.filter((t) => t.trip_id !== trip_id));
      setStatus({ type: "success", message: "Trip deleted successfully!" });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to delete trip" });
    }
  }

  async function handleFeedbackSubmit(e) {
    e.preventDefault();
    try {
      await submitFeedback({ user_id: userId, message: feedback }, token);
      setFeedback("");
      setStatus({ type: "success", message: "Feedback submitted!" });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to submit feedback" });
    }
  }

  async function toggleItinerary(trip_id) {
    if (openTrip === trip_id) {
      setOpenTrip(null);
      return;
    }
    setOpenTrip(trip_id);
    try {
      const data = await getItineraries(trip_id, token);
      setItineraries((prev) => ({ ...prev, [trip_id]: data || [] }));
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to load itineraries" });
    }
  }

  async function handleAddItinerary(e, trip_id) {
    e.preventDefault();
    try {
      await addItinerary({ trip_id, ...itineraryData }, token);
      setItineraryData({ activity: "", date: "", time: "" });
      const data = await getItineraries(trip_id, token);
      setItineraries((prev) => ({ ...prev, [trip_id]: data || [] }));
      setStatus({ type: "success", message: "Itinerary added!" });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to add itinerary" });
    }
  }

  async function handleDeleteItinerary(itineraryId, trip_id) {
    if (!window.confirm("Delete this itinerary item?")) return;
    try {
      await deleteItinerary(itineraryId, token);
      const updated = (itineraries[trip_id] || []).filter((i) => i.id !== itineraryId);
      setItineraries((prev) => ({ ...prev, [trip_id]: updated }));
      setStatus({ type: "success", message: "Itinerary deleted!" });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to delete itinerary" });
    }
  }

  async function handleAddStandaloneItinerary(e) {
    e.preventDefault();
    try {
      await addItinerary(standaloneItinerary, token);
      setStatus({ type: "success", message: "Itinerary added successfully!" });
      setStandaloneItinerary({ trip_id: "", activity: "", date: "", time: "" });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to add itinerary" });
    }
  }

  return (
    <Container style={{ paddingTop: "100px" }}>
      <h1 className="fw-bold text-center mb-4">🧳 User Dashboard</h1>

      {status.message && (
        <Alert variant={status.type === "error" ? "danger" : "success"}>{status.message}</Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {/* ===== ADD TRIP ===== */}
          <h4>Add a New Trip</h4>
          <Form onSubmit={handleAddTrip} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter destination"
                value={tripData.destination}
                onChange={(e) => setTripData({ ...tripData, destination: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={tripData.start_date}
                onChange={(e) => setTripData({ ...tripData, start_date: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={tripData.end_date}
                onChange={(e) => setTripData({ ...tripData, end_date: e.target.value })}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add Trip
            </Button>
          </Form>

          {/* ===== ADD ITINERARY (standalone) ===== */}
          <h4 className="mt-5">Add Itinerary for a Trip</h4>
          <Form onSubmit={handleAddStandaloneItinerary} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>Trip ID</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Trip ID"
                value={standaloneItinerary.trip_id}
                onChange={(e) =>
                  setStandaloneItinerary({ ...standaloneItinerary, trip_id: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Activity</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter activity"
                value={standaloneItinerary.activity}
                onChange={(e) =>
                  setStandaloneItinerary({ ...standaloneItinerary, activity: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={standaloneItinerary.date}
                onChange={(e) =>
                  setStandaloneItinerary({ ...standaloneItinerary, date: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter time (e.g. 10:00 AM)"
                value={standaloneItinerary.time}
                onChange={(e) =>
                  setStandaloneItinerary({ ...standaloneItinerary, time: e.target.value })
                }
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Add Itinerary
            </Button>
          </Form>

          {/* ===== TRIPS TABLE ===== */}
          <h4>Your Trips</h4>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Destination</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No trips found.
                  </td>
                </tr>
              ) : (
                trips.map((t) => (
                  <React.Fragment key={t.trip_id}>
                    <tr>
                      <td>{t.trip_id}</td>
                      <td>{t.destination}</td>
                      <td>{t.start_date}</td>
                      <td>{t.end_date}</td>
                      <td>
                        <Button variant="outline-primary" size="sm" onClick={() => toggleItinerary(t.trip_id)}>
                          📋 Itinerary
                        </Button>{" "}
                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteTrip(t.trip_id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>

                    {/* COLLAPSIBLE ITINERARY SECTION */}
                    <tr>
                      <td colSpan="5" style={{ padding: 0, border: "none" }}>
                        <Collapse in={openTrip === t.trip_id}>
                          <div className="p-3 bg-light border-top">
                            <h6>Itinerary for {t.destination}</h6>
                            <Form onSubmit={(e) => handleAddItinerary(e, t.trip_id)} className="mb-3">
                              <div className="d-flex flex-wrap gap-2">
                                <Form.Control
                                  type="text"
                                  placeholder="Activity"
                                  value={itineraryData.activity}
                                  onChange={(e) =>
                                    setItineraryData({ ...itineraryData, activity: e.target.value })
                                  }
                                  required
                                />
                                <Form.Control
                                  type="date"
                                  value={itineraryData.date}
                                  onChange={(e) =>
                                    setItineraryData({ ...itineraryData, date: e.target.value })
                                  }
                                  required
                                />
                                <Form.Control
                                  type="time"
                                  value={itineraryData.time}
                                  onChange={(e) =>
                                    setItineraryData({ ...itineraryData, time: e.target.value })
                                  }
                                  required
                                />
                                <Button type="submit" variant="success">
                                  Add
                                </Button>
                              </div>
                            </Form>

                            <Table bordered size="sm">
                              <thead>
                                <tr>
                                  <th>ID</th>
                                  <th>Activity</th>
                                  <th>Date</th>
                                  <th>Time</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {!itineraries[t.trip_id] || itineraries[t.trip_id].length === 0 ? (
                                  <tr>
                                    <td colSpan="5" className="text-center text-muted">
                                      No itinerary items.
                                    </td>
                                  </tr>
                                ) : (
                                  itineraries[t.trip_id].map((i) => (
                                    <tr key={i.id}>
                                      <td>{i.id}</td>
                                      <td>{i.activity}</td>
                                      <td>{i.date}</td>
                                      <td>{i.time}</td>
                                      <td>
                                        <Button
                                          variant="outline-danger"
                                          size="sm"
                                          onClick={() => handleDeleteItinerary(i.id, t.trip_id)}
                                        >
                                          Delete
                                        </Button>
                                      </td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </Table>
                          </div>
                        </Collapse>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </Table>

          {/* ===== FEEDBACK ===== */}
          <h4 className="mt-5">Submit Feedback</h4>
          <Form onSubmit={handleFeedbackSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success">
              Send Feedback
            </Button>
          </Form>
        </>
      )}
    </Container>
  );
}
