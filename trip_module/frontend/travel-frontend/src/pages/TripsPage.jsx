import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function DashboardPage() {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [itinerary, setItinerary] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTripId, setEditingTripId] = useState(null);

  const [tripForm, setTripForm] = useState({
    user_id: 1,
    trip_name: "",
    destination: "",
    start_date: "",
    end_date: "",
    budget: "",
    description: "",
  });

  const [itForm, setItForm] = useState({
    trip_id: "",
    day_number: "",
    activity: "",
    location: "",
    time: "",
    notes: "",
  });

  // Fetch Trips
  const fetchTrips = async () => {
    try {
      const res = await axios.get("http://localhost:5500/api/trips/view/1");
      if (res.data?.trips) setTrips(res.data.trips);
      else setTrips(res.data);
    } catch (err) {
      console.error("Error fetching trips", err);
    }
  };

  // Fetch Itinerary
  const fetchItinerary = async (tripId) => {
    try {
      const res = await axios.get(`http://localhost:5500/api/itinerary/view/${tripId}`);
      if (res.data?.itinerary) setItinerary(res.data.itinerary);
      else setItinerary(res.data);
    } catch (err) {
      console.error("Error fetching itinerary", err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
    setItForm({ ...itForm, trip_id: trip.trip_id });
    fetchItinerary(trip.trip_id);
  };

  // Add / Update Trip
  const handleTripSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && editingTripId) {
        await axios.put(`http://localhost:5500/api/trips/update/${editingTripId}`, tripForm);
      } else {
        await axios.post("http://localhost:5500/api/trips/add", tripForm);
      }

      setShow(false);
      setIsEditing(false);
      setEditingTripId(null);
      setTripForm({
        user_id: 1,
        trip_name: "",
        destination: "",
        start_date: "",
        end_date: "",
        budget: "",
        description: "",
      });
      fetchTrips();
    } catch (err) {
      console.error("Error saving trip:", err);
    }
  };

  // Add Itinerary
  const handleItinerarySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5500/api/itinerary/add", itForm);
      fetchItinerary(itForm.trip_id);
      setItForm({ ...itForm, day_number: "", activity: "", location: "", time: "", notes: "" });
    } catch (err) {
      console.error("Error adding itinerary:", err);
    }
  };

  // Delete Trip
  const handleDeleteTrip = async (trip_id) => {
    if (window.confirm("Are you sure you want to delete this trip and its itinerary?")) {
      try {
        await axios.delete(`http://localhost:5500/api/trips/delete/${trip_id}`);
        if (selectedTrip && selectedTrip.trip_id === trip_id) {
          setSelectedTrip(null);
          setItinerary([]);
        }
        fetchTrips();
      } catch (err) {
        console.error("Error deleting trip:", err);
      }
    }
  };

  // Edit Trip
  const handleEditTrip = (trip) => {
    setIsEditing(true);
    setEditingTripId(trip.trip_id);
    setTripForm({
      user_id: trip.user_id ?? 1,
      trip_name: trip.trip_name ?? "",
      destination: trip.destination ?? "",
      start_date: trip.start_date ?? "",
      end_date: trip.end_date ?? "",
      budget: trip.budget ?? "",
      description: trip.description ?? "",
    });
    setShow(true);
  };

  // 🗑️ Delete Itinerary
  const handleDeleteItinerary = async (itinerary_id) => {
    if (window.confirm("Delete this itinerary item?")) {
      try {
        await axios.delete(`http://localhost:5500/api/itinerary/delete/${itinerary_id}`);
        fetchItinerary(selectedTrip.trip_id);
      } catch (err) {
        console.error("Error deleting itinerary:", err);
      }
    }
  };

  return (
    <div className="container-fluid py-4" style={{ minHeight: "100vh", background: "#f8fafc" }}>
      <div className="row">
        {/* === Left Panel: Trips === */}
        <div className="col-md-4 border-end bg-white shadow-sm rounded-3 p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="fw-bold text-primary">🌍 My Trips</h4>
            <Button
              variant="success"
              onClick={() => {
                setShow(true);
                setIsEditing(false);
                setEditingTripId(null);
              }}
            >
              + Add
            </Button>
          </div>

          {trips.length === 0 && <div className="text-muted">No trips yet. Add your first trip!</div>}

          {trips.map((t) => (
            <Card
              key={t.trip_id}
              className={`mb-3 shadow-sm border-0 position-relative ${
                selectedTrip?.trip_id === t.trip_id ? "bg-primary text-white" : "bg-light"
              }`}
              style={{ cursor: "pointer" }}
            >
              <Card.Body onClick={() => handleTripSelect(t)}>
                <Card.Title>{t.trip_name}</Card.Title>
                <Card.Subtitle>{t.destination}</Card.Subtitle>
                <div className="small mt-2">
                  {t.start_date} → {t.end_date}
                </div>
                <div className="fw-bold mt-2">₹{t.budget}</div>
              </Card.Body>

              <Button
                variant="outline-primary"
                size="sm"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "48px",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditTrip(t);
                }}
              >
                ✎
              </Button>

              <Button
                variant="danger"
                size="sm"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTrip(t.trip_id);
                }}
              >
                ✕
              </Button>
            </Card>
          ))}
        </div>

        {/* === Right Panel: Itinerary === */}
        <div className="col-md-8 p-4">
          {selectedTrip ? (
            <>
              <h4 className="fw-bold text-success mb-3">
                🧭 Itinerary — {selectedTrip.trip_name || selectedTrip.destination}
              </h4>

              <Form className="row g-2 mb-4" onSubmit={handleItinerarySubmit}>
                <div className="col-md-2">
                  <Form.Control
                    type="number"
                    name="day_number"
                    placeholder="Day #"
                    value={itForm.day_number}
                    onChange={(e) => setItForm({ ...itForm, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <Form.Control
                    name="activity"
                    placeholder="Activity"
                    value={itForm.activity}
                    onChange={(e) => setItForm({ ...itForm, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="col-md-3">
                  <Form.Control
                    name="location"
                    placeholder="Location"
                    value={itForm.location}
                    onChange={(e) => setItForm({ ...itForm, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="col-md-2">
                  <Form.Control
                    name="time"
                    placeholder="Time"
                    value={itForm.time}
                    onChange={(e) => setItForm({ ...itForm, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="col-md-2">
                  <Form.Control
                    name="notes"
                    placeholder="Notes"
                    value={itForm.notes}
                    onChange={(e) => setItForm({ ...itForm, [e.target.name]: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <Button className="w-100" variant="success" type="submit">
                    Add Itinerary
                  </Button>
                </div>
              </Form>

              <ul className="list-group shadow-sm">
                {itinerary.map((i) => (
                  <li
                    key={i.itinerary_id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <b>Day {i.day_number}:</b> {i.activity} — {i.location} ({i.time})
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteItinerary(i.itinerary_id)}
                    >
                      🗑️
                    </Button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="text-muted text-center mt-5">Select a trip to view itinerary</div>
          )}
        </div>
      </div>

      {/* === Add / Edit Trip Modal === */}
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          setIsEditing(false);
          setEditingTripId(null);
        }}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Trip" : "Add Trip"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleTripSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Trip Name</Form.Label>
              <Form.Control
                name="trip_name"
                value={tripForm.trip_name}
                onChange={(e) => setTripForm({ ...tripForm, [e.target.name]: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                name="destination"
                value={tripForm.destination}
                onChange={(e) => setTripForm({ ...tripForm, [e.target.name]: e.target.value })}
                required
              />
            </Form.Group>
            <div className="row">
              <div className="col-md-6 mb-2">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="start_date"
                  value={tripForm.start_date}
                  onChange={(e) => setTripForm({ ...tripForm, [e.target.name]: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-6 mb-2">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="end_date"
                  value={tripForm.end_date}
                  onChange={(e) => setTripForm({ ...tripForm, [e.target.name]: e.target.value })}
                  required
                />
              </div>
            </div>
            <Form.Group className="mb-2">
              <Form.Label>Budget</Form.Label>
              <Form.Control
                type="number"
                name="budget"
                value={tripForm.budget}
                onChange={(e) => setTripForm({ ...tripForm, [e.target.name]: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="description"
                value={tripForm.description}
                onChange={(e) => setTripForm({ ...tripForm, [e.target.name]: e.target.value })}
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100">
              {isEditing ? "Update Trip" : "Save Trip"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashboardPage;
