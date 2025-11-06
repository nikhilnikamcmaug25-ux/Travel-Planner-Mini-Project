import React, { useEffect, useState } from "react";
import api from "../api";
import { Table } from "react-bootstrap";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  useEffect(()=> {
    api.get("/api/users").then(res=> setUsers(res.data)).catch(console.error);
  }, []);
  return (
    <div className="container">
      <h4>All Users</h4>
      <Table striped>
        <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>
          {users.map(u => <tr key={u.id}><td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>)}
        </tbody>
      </Table>
    </div>
  );
}
