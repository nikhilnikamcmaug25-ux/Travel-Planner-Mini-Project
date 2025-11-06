import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import api from "../api";
import ItineraryForm from "./ItineraryForm";

export default function TripDetails({ trip, onUpdate }) {
  const [itinerary, setItinerary] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const loadItinerary = async () => {
    const res = await api.get(`/api/itinerary/${trip.trip_id}`);
    setItinerary(res.data);
  };

  useEffect(()=> { loadItinerary(); }, [trip]);

  return (
    <div>
      <h4>{trip.destination}</h4>
      <p>From: {trip.start_date} To: {trip.end_date}</p>

      <ListGroup className="mb-3">
        {itinerary.map(item => (
          <ListGroup.Item key={item.itinerary_id}>
            <strong>{item.activity}</strong> — {item.date} {item.time}
            <Button size="sm" variant="danger" className="float-end" onClick={async ()=>{
              await api.delete(`/api/itinerary/delete/${item.itinerary_id}`);
              loadItinerary();
            }}>Delete</Button>
          </ListGroup.Item>
        ))}
      </ListGroup>

      <Button onClick={() => setShowAdd(true)}>Add Itinerary Item</Button>

      {showAdd && <ItineraryForm trip_id={trip.trip_id} onSaved={() => { setShowAdd(false); loadItinerary(); }} />}
    </div>
  );
}
