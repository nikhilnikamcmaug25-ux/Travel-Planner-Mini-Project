import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane, FaClock } from "react-icons/fa";
import { sendContactMessage as submitContactForm } from "../api";


const PRIMARY_TEAL = "#1abc9c";
const SECONDARY_SLATE = "#34495e";
const WARNING_YELLOW = "#ffc107";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    try {
      await submitContactForm(formData);
      setStatus({ type: "success", message: "✅ Message sent successfully!" });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", message: "❌ " + err.message });
    }
  };

  return (
    <div className="py-5 bg-white">
      <Container style={{ paddingTop: "70px" }}>
        <Row className="text-center mb-5">
          <Col>
            <FaPaperPlane size={70} style={{ color: PRIMARY_TEAL }} className="mb-3" />
            <h1 className="fw-bolder display-4" style={{ color: SECONDARY_SLATE }}>
              Get in Touch With Us
            </h1>
            <p className="lead text-muted mx-auto" style={{ maxWidth: "700px" }}>
              Have questions, feedback, or partnership ideas? We’d love to hear from you.
            </p>
          </Col>
        </Row>

        {/* Contact Info */}
        <Row className="justify-content-center g-4 mb-5">
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm p-4 h-100">
              <FaMapMarkerAlt size={40} style={{ color: PRIMARY_TEAL }} className="mb-3" />
              <h5 className="fw-bold" style={{ color: SECONDARY_SLATE }}>Our Office</h5>
              <p className="text-muted mb-0">CDAC Kharghar, Mumbai, India</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm p-4 h-100">
              <FaEnvelope size={40} style={{ color: PRIMARY_TEAL }} className="mb-3" />
              <h5 className="fw-bold" style={{ color: SECONDARY_SLATE }}>Email Us</h5>
              <p className="text-muted mb-0">support@traveleva.com</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center border-0 shadow-sm p-4 h-100">
              <FaPhoneAlt size={40} style={{ color: PRIMARY_TEAL }} className="mb-3" />
              <h5 className="fw-bold" style={{ color: SECONDARY_SLATE }}>Call Us</h5>
              <p className="text-muted mb-0">+91 98765 43210</p>
            </Card>
          </Col>
        </Row>

        {/* Contact Form */}
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="p-4 p-md-5 shadow-lg border-0">
              <h3 className="fw-bold mb-4 text-center" style={{ color: PRIMARY_TEAL }}>
                Send Us a Message
              </h3>

              {status.message && (
                <Alert variant={status.type === "success" ? "success" : "danger"}>
                  {status.message}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="fw-semibold">Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mt-3">
                  <Form.Label className="fw-semibold">Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject of your message"
                    required
                  />
                </Form.Group>

                <Form.Group className="mt-3">
                  <Form.Label className="fw-semibold">Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    required
                  />
                </Form.Group>

                <div className="text-center mt-4">
                  <Button
                    size="lg"
                    style={{
                      backgroundColor: PRIMARY_TEAL,
                      borderColor: PRIMARY_TEAL,
                      color: "white",
                      fontWeight: "600",
                      padding: "10px 30px",
                    }}
                    type="submit"
                  >
                    Send Message <FaPaperPlane className="ms-2" />
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>

        <Row className="text-center mt-5">
          <Col>
            <FaClock size={40} style={{ color: WARNING_YELLOW }} className="mb-2" />
            <h5 className="fw-bold" style={{ color: SECONDARY_SLATE }}>Office Hours</h5>
            <p className="text-muted mb-0">Monday - Friday: 9:00 AM to 6:00 PM</p>
            <p className="text-muted">Saturday & Sunday: Closed</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
