import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-5 mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Traveleva</h5>
            <p className="small text-secondary"> Your ultimate partner for planning seamless, unforgettable journeys around the globe. </p>
            <p className="small text-secondary mb-0">
              Designed for wanderers, built for planners.
            </p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ListGroup variant="flush">
              <ListGroup.Item as={Link} to="/" className="bg-dark text-secondary p-1 border-0">Home</ListGroup.Item>
              <ListGroup.Item as={Link} to="/about" className="bg-dark text-secondary p-1 border-0">About Us</ListGroup.Item>
              <ListGroup.Item as={Link} to="/services" className="bg-dark text-secondary p-1 border-0">Our Services</ListGroup.Item>
              <ListGroup.Item as={Link} to="/faq" className="bg-dark text-secondary p-1 border-0">FAQ</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <h5 className="fw-bold mb-3">Get In Touch</h5>
            <ListGroup variant="flush">
              <ListGroup.Item className="bg-dark text-white p-1 border-0">
                <FaEnvelope className="me-2 text-primary" />
                <a href="mailto:support@traveleva.example" className="text-secondary text-decoration-none small"> support@traveleva.example </a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white p-1 border-0">
                <FaPhone className="me-2 text-primary" />
                <a href="tel:+918005551234" className="text-secondary text-decoration-none small"> +91 800-555-1234 </a>
              </ListGroup.Item>
              <ListGroup.Item className="bg-dark text-white p-1 border-0">
                <FaMapMarkerAlt className="me-2 text-primary" />
                <span className="text-secondary small">Mumbai, India (Mon-Fri, 9am-6pm IST)</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        <hr className="my-4 border-secondary" />
        <Row>
          <Col className="text-center">
            <p className="small text-secondary mb-0"> Traveleva © {currentYear} | All rights reserved. </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}