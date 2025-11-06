import React, {useEffect, useState} from "react";
import api from "../api";
import { Table } from "react-bootstrap";

export default function FeedbackListAdmin(){
  const [f, setF] = useState([]);
  useEffect(()=> {
    api.get("/api/feedback") // your admin GET assumes /api/feedback protected and admin role
      .then(res => setF(res.data)).catch(console.error);
  }, []);
  return (
    <div className="container">
      <h4>Feedback</h4>
      <Table striped>
        <thead><tr><th>ID</th><th>User</th><th>Message</th><th>Created</th></tr></thead>
        <tbody>{f.map(x => <tr key={x.id}><td>{x.id}</td><td>{x.user_name}</td><td>{x.message}</td><td>{x.created_at}</td></tr>)}</tbody>
      </Table>
    </div>
  );
}
