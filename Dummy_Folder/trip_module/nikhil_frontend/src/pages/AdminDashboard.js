import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <Container>
      <h3>Admin Dashboard</h3>
      <Row>
        <Col md={3}>
          <Card className="p-3"><Link to="/admin/users">Users</Link></Card>
        </Col>
        <Col md={3}>
          <Card className="p-3"><Link to="/admin/trips">All Trips</Link></Card>
        </Col>
        <Col md={3}>
          <Card className="p-3"><Link to="/admin/feedback">Feedback</Link></Card>
        </Col>
        <Col md={3}>
          <Card className="p-3"><Link to="/admin/contacts">Contacts</Link></Card>
        </Col>
      </Row>
    </Container>
  );
}
