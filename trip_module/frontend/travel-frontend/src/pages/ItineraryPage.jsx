import { useState, useEffect } from "react";
import axios from "axios";

function ItineraryPage() {  
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState("");
  const [itinerary, setItinerary] = useState([]);
  const [form, setForm] = useState({
    trip_id: "",
    day_number: "",
    activity: "",
    location: "",
    time: "",
    notes: ""
  });

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    const res = await axios.get("http://localhost:5500/api/trips/view/1");
    setTrips(res.data);
  };

  const fetchItinerary = async (tripId) => {
    const res = await axios.get(`http://localhost:5500/api/itinerary/view/${tripId}`);
    setItinerary(res.data);
  };

  const handleTripChange = (e) => {
    const tripId = e.target.value;
    setSelectedTrip(tripId);
    setForm({ ...form, trip_id: tripId });
    fetchItinerary(tripId);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5500/api/itinerary/add", form);
    fetchItinerary(form.trip_id);
    setForm({ ...form, day_number: "", activity: "", location: "", time: "", notes: "" });
  };

  return (
    <div className="container">
      <h3>🗓️ Manage Itinerary</h3>

      {/* Select Trip */}
      <div className="mb-3">
        <label className="form-label">Select Trip</label>
        <select className="form-select" onChange={handleTripChange} value={selectedTrip}>
          <option value="">-- Choose a Trip --</option>
          {trips.map((t) => (
            <option key={t.trip_id} value={t.trip_id}>
              {t.destination}
            </option>
          ))}
        </select>
      </div>

      {/* Add Itinerary Form */}
      {selectedTrip && (
        <>
          <form onSubmit={handleSubmit} className="row g-3 mb-4">
            <div className="col-md-2">
              <input
                type="number"
                name="day_number"
                placeholder="Day #"
                className="form-control"
                value={form.day_number}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                name="activity"
                placeholder="Activity"
                className="form-control"
                value={form.activity}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                name="location"
                placeholder="Location"
                className="form-control"
                value={form.location}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <input
                name="time"
                placeholder="Time"
                className="form-control"
                value={form.time}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <input
                name="notes"
                placeholder="Notes"
                className="form-control"
                value={form.notes}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <button className="btn btn-success">Add Itinerary</button>
            </div>
          </form>

          {/* View Itinerary List */}
          <h5>🧭 Itinerary for Trip</h5>
          <ul className="list-group">
            {itinerary.map((i) => (
              <li key={i.itinerary_id} className="list-group-item">
                <b>Day {i.day_number}:</b> {i.activity} at {i.location} ({i.time})
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ItineraryPage;
