import React, { useEffect, useState } from "react";
import { Container, Table, Button, Alert, Spinner } from "react-bootstrap";
import { getAllUsers, deleteUser } from "../api";
import { useNavigate } from "react-router-dom";

const PRIMARY_TEAL = "#1abc9c";
const SECONDARY_SLATE = "#34495e";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/"); // redirect if not admin
      return;
    }
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      const data = await getAllUsers(token);
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setStatus({ type: "error", message: err.message });
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id, token);
      setStatus({ type: "success", message: "User deleted successfully!" });
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    }
  }

  return (
    <Container style={{ paddingTop: "100px" }}>
      <h1 className="fw-bold mb-4 text-center" style={{ color: SECONDARY_SLATE }}>
        👨‍💼 Admin Dashboard
      </h1>

      {status.message && (
        <Alert
          variant={status.type === "success" ? "success" : "danger"}
          className="text-center"
        >
          {status.message}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" style={{ color: PRIMARY_TEAL }} />
        </div>
      ) : (
        <Table bordered hover responsive className="shadow-sm">
          <thead style={{ backgroundColor: PRIMARY_TEAL, color: "white" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4 text-muted">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge bg-${user.role === "admin" ? "danger" : "secondary"}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
