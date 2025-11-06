// frontend/src/pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Form,
  Table,
  Alert,
  Spinner,
  Collapse,
} from "react-bootstrap";
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
  const userId = localStorage.getItem("user_id"); // ensure login stores this
  const role = localStorage.getItem("role");

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tripData, setTripData] = useState({
  trip_name: "",
  destination: "",
  start_date: "",
  end_date: "",
  budget: "",
  description: ""
});
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });

  // itinerary state
  const [itineraryData, setItineraryData] = useState({
    activity: "",
    date: "",
    time: "",
  });
  const [openTrip, setOpenTrip] = useState(null);
  const [itineraries, setItineraries] = useState({}); // { [trip_id]: [items...] }

  // standalone add-itinerary form (optional)
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
      setTripData({
        trip_name: "",
        destination: "",
        start_date: "",
        end_date: "",
        budget: "",
        description: "",
      });
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

  // Toggle and load itineraries for a trip
  async function toggleItinerary(trip_id) {
    if (openTrip === trip_id) {
      setOpenTrip(null);
      return;
    }
    setOpenTrip(trip_id);
    try {
      const data = await getItineraries(trip_id, token);
      // ensure we are using the backend's primary key name; prefer itinerary_id
      setItineraries((prev) => ({ ...prev, [trip_id]: data || [] }));
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to load itineraries" });
    }
  }

  // Add itinerary tied to a trip (collapsible per-trip form)
  async function handleAddItinerary(e, trip_id) {
    e.preventDefault();
    try {
      const payload = { trip_id, ...itineraryData };
      await addItinerary(payload, token);
      setItineraryData({ activity: "", date: "", time: "" });
      const data = await getItineraries(trip_id, token);
      setItineraries((prev) => ({ ...prev, [trip_id]: data || [] }));
      setStatus({ type: "success", message: "Itinerary added!" });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to add itinerary" });
    }
  }

  // Standalone itinerary form (accepts trip_id manually)
  async function handleAddStandaloneItinerary(e) {
    e.preventDefault();
    try {
      await addItinerary(standaloneItinerary, token);
      setStandaloneItinerary({ trip_id: "", activity: "", date: "", time: "" });
      // refresh that trip's itineraries if open
      const tid = standaloneItinerary.trip_id;
      if (tid) {
        const data = await getItineraries(tid, token);
        setItineraries((prev) => ({ ...prev, [tid]: data || [] }));
      }
      setStatus({ type: "success", message: "Itinerary added successfully!" });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to add itinerary" });
    }
  }

  // Delete itinerary item — pass the PK the backend expects (itinerary_id)
  async function handleDeleteItinerary(itineraryId, trip_id) {
    if (!window.confirm("Delete this itinerary item?")) return;
    try {
      await deleteItinerary(itineraryId, token);
      const updated = (itineraries[trip_id] || []).filter((i) => {
        // handle both possible keys from backend
        return (i.itinerary_id || i.id) !== itineraryId;
      });
      setItineraries((prev) => ({ ...prev, [trip_id]: updated }));
      setStatus({ type: "success", message: "Itinerary deleted!" });
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Failed to delete itinerary" });
    }
  }

  return (
    <Container style={{ paddingTop: "100px" }}>
      <h1 className="fw-bold text-center mb-4">🧳 User Dashboard</h1>

      {status.message && (
        <Alert variant={status.type === "error" ? "danger" : "success"}>
          {status.message}
        </Alert>
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
                <Form.Label>Trip Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter trip name"
                  value={tripData.trip_name}
                  onChange={(e) => setTripData({ ...tripData, trip_name: e.target.value })}
                  required
                />
              </Form.Group>
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
              <Form.Group className="mb-3">
                <Form.Label>Budget</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter budget"
                  value={tripData.budget}
                  onChange={(e) => setTripData({ ...tripData, budget: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Describe your trip"
                  value={tripData.description}
                  onChange={(e) => setTripData({ ...tripData, description: e.target.value })}
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Add Trip
              </Button>
            </Form>


          {/* ===== ADD ITINERARY (standalone) ===== */}
          <h4 className="mt-5">Add Itinerary for a Trip (standalone)</h4>
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
                <th>Trip Name</th>
                <th>Destination</th>
                <th>Start</th>
                <th>End</th>
                <th>Budget</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center text-muted">
                    No trips found.
                  </td>
                </tr>
              ) : (
                trips.map((t) => (
                  <React.Fragment key={t.trip_id}>
                    <tr>
                      <td>{t.trip_id}</td>
                      <td>{t.trip_name}</td>
                      <td>{t.destination}</td>
                      <td>{t.start_date}</td>
                      <td>{t.end_date}</td>
                      <td>{t.budget}</td>
                      <td style={{ maxWidth: 200, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {t.description}
                      </td>
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
                      <td colSpan="8" style={{ padding: 0, border: "none" }}>
                        <Collapse in={openTrip === t.trip_id}>
                          <div className="p-3 bg-light border-top">
                            <h6>Itinerary for {t.trip_name || t.destination}</h6>

                            {/* per-trip itinerary form */}
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

                            {/* itinerary table */}
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
                                  itineraries[t.trip_id].map((i) => {
                                    // support both possible key names returned by backend
                                    const id = i.itinerary_id ?? i.id;
                                    return (
                                      <tr key={id}>
                                        <td>{id}</td>
                                        <td>{i.activity}</td>
                                        <td>{i.date}</td>
                                        <td>{i.time}</td>
                                        <td>
                                          <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleDeleteItinerary(id, t.trip_id)}
                                          >
                                            Delete
                                          </Button>
                                        </td>
                                      </tr>
                                    );
                                  })
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
