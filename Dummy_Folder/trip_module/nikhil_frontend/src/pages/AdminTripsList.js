import React, {useEffect, useState} from "react";
import api from "../api";
import { Table, Button } from "react-bootstrap";

export default function AdminTripsList(){
  const [trips, setTrips] = useState([]);
  useEffect(()=> {
    api.get("/api/admin/trips") // you may need to add admin route in backend or reuse /api/trips/all
      .then(res=> setTrips(res.data)).catch(console.error);
  }, []);
  return (
    <div className="container">
      <h4>All Trips</h4>
      <Table striped>
        <thead><tr><th>ID</th><th>User</th><th>Destination</th><th>Dates</th><th>Action</th></tr></thead>
        <tbody>
          {trips.map(t=>(
            <tr key={t.trip_id}>
              <td>{t.trip_id}</td>
              <td>{t.user_id}</td>
              <td>{t.destination}</td>
              <td>{t.start_date} - {t.end_date}</td>
              <td><Button variant="danger" onClick={async ()=>{ await api.delete(`/api/trips/${t.trip_id}`); setTrips(trips.filter(x=>x.trip_id!==t.trip_id))}}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
