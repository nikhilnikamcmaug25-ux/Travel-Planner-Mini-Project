import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Alert,
  Spinner,
  Tabs,
  Tab,
} from "react-bootstrap";
import {
  getAllUsers,
  deleteUser,
  getAllTrips,
  getAllItineraries,
} from "../api";
import { useNavigate } from "react-router-dom";

const PRIMARY_TEAL = "#1abc9c";
const SECONDARY_SLATE = "#34495e";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [trips, setTrips] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!token || role !== "admin") {
      navigate("/");
      return;
    }
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [usersData, tripsData, itineraryData] = await Promise.all([
        getAllUsers(token),
        getAllTrips(token),
        getAllItineraries(token),
      ]);
      setUsers(usersData);
      setTrips(tripsData);
      setItineraries(itineraryData);
      setLoading(false);
    } catch (err) {
      setStatus({ type: "error", message: err.message });
      setLoading(false);
    }
  }

  async function handleDeleteUser(id) {
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
    <Container style={{ paddingTop: "80px" }}>
      <h1
        className="fw-bold mb-4 text-center"
        style={{ color: SECONDARY_SLATE }}
      >
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
        <Tabs
          defaultActiveKey="users"
          className="mb-4"
          fill
          style={{ fontWeight: "600" }}
        >
          {/* USERS */}
          <Tab eventKey="users" title="Users">
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
                      <td>{user.role}</td>
                      <td>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Tab>

          {/* TRIPS */}
          <Tab eventKey="trips" title="Trips">
            <Table bordered hover responsive className="shadow-sm">
              <thead style={{ backgroundColor: PRIMARY_TEAL, color: "white" }}>
                <tr>
                  <th>Trip ID</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Destination</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {trips.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No trips found.
                    </td>
                  </tr>
                ) : (
                  trips.map((trip) => (
                    <tr key={trip.trip_id}>
                      <td>{trip.trip_id}</td>
                      <td>{trip.user_name}</td>
                      <td>{trip.user_email}</td>
                      <td>{trip.destination}</td>
                      <td>{trip.start_date}</td>
                      <td>{trip.end_date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Tab>

          {/* ITINERARIES */}
          <Tab eventKey="itineraries" title="Itineraries">
            <Table bordered hover responsive className="shadow-sm">
              <thead style={{ backgroundColor: PRIMARY_TEAL, color: "white" }}>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Email</th>
                  <th>Destination</th>
                  <th>Activity</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {itineraries.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      No itineraries found.
                    </td>
                  </tr>
                ) : (
                  itineraries.map((i) => (
                    <tr key={i.id}>
                      <td>{i.id}</td>
                      <td>{i.user_name}</td>
                      <td>{i.user_email}</td>
                      <td>{i.destination}</td>
                      <td>{i.activity}</td>
                      <td>{i.date}</td>
                      <td>{i.time}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Tab>
        </Tabs>
      )}
    </Container>
  );
}
