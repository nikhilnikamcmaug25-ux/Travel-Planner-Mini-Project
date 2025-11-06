import React, {useEffect, useState} from "react";
import api from "../api";
import { Table } from "react-bootstrap";

export default function ContactsListAdmin(){
  const [rows, setRows] = useState([]);
  useEffect(()=> { api.get("/api/contact").then(r=> setRows(r.data)).catch(console.error); }, []);
  return (
    <div className="container">
      <h4>Contacts</h4>
      <Table striped>
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Subject</th><th>Message</th></tr></thead>
        <tbody>{rows.map(c => <tr key={c.id}><td>{c.id}</td><td>{c.name}</td><td>{c.email}</td><td>{c.subject}</td><td>{c.message}</td></tr>)}</tbody>
      </Table>
    </div>
  );
}
