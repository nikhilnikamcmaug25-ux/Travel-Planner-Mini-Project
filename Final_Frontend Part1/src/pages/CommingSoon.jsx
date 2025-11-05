import React from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Badge } from 'react-bootstrap';
import { FaPaperPlane, FaRobot, FaLock, FaGlobe } from 'react-icons/fa';

// --- Placeholder Image for Service Launch ---
const SERVICE_HERO_IMAGE = 'https://images.unsplash.com/photo-1510103503287-950f156d43e2?auto=format&fit=crop&w=1800&q=80';

const ComingSoonFeaturePage = () => {
  return (
    <div 
      className="d-flex align-items-center justify-content-center text-white" 
      style={{
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${SERVICE_HERO_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        paddingTop: '40px', // Minor padding for overall layout
        paddingBottom: '40px',
      }}
    >
      <Container style={{ maxWidth: '850px' }}>
        <Row className="justify-content-center">
          <Col lg={10} className="text-center p-4 p-md-5 bg-dark-subtle rounded-4 shadow-lg" style={{ backdropFilter: 'blur(3px)', backgroundColor: 'rgba(0, 0, 0, 0.4)' }}>
            
            {/* --- Badge & Title --- */}
            <Badge bg="warning" text="dark" className="p-2 mb-3 fw-bold fs-6">
              <FaPaperPlane className="me-2" /> LAUNCHING SOON
            </Badge>

            <h1 className="display-4 fw-bolder mb-3" style={{ color: '#28a745' }}>
              Introducing Traveleva AI Autopilot
            </h1>
            <p className="lead mb-5 fw-light">
              We're building the future of travel planning. Our new AI Autopilot feature will instantly generate, optimize, and manage complex itineraries—leaving you with nothing but the adventure.
            </p>

            <hr className="my-5 border-secondary" />

            {/* --- Feature Highlights --- */}
            <Row className="text-start mb-5 g-4">
              <Col md={4}>
                <h5 className="fw-bold mb-2"><FaRobot className="me-2 text-warning" /> Instant Optimization</h5>
                <p className="text-light-emphasis small">
                  Generate a full day's route in seconds, factoring in traffic, opening hours, and travel time.
                </p>
              </Col>
              <Col md={4}>
                <h5 className="fw-bold mb-2"><FaGlobe className="me-2 text-warning" /> Global Intelligence</h5>
                <p className="text-light-emphasis small">
                  Access deep local knowledge, guided tours, and hidden gems across hundreds of destinations.
                </p>
              </Col>
              <Col md={4}>
                <h5 className="fw-bold mb-2"><FaLock className="me-2 text-warning" /> Budget & Safety First</h5>
                <p className="text-light-emphasis small">
                  Automatic budget tracking and real-time safety advisories integrated into your plan.
                </p>
              </Col>
            </Row>

            {/* --- Call to Action (Waitlist) --- */}
            <h3 className="fw-bold mb-3">Be the First to Experience Autopilot</h3>
            <p className="mb-4">
              Join the exclusive waitlist and we'll notify you the moment this revolutionary feature goes live.
            </p>

            <InputGroup className="mx-auto" style={{ maxWidth: '500px' }}>
              <FormControl
                placeholder="Enter your email address"
                aria-label="Email address for waitlist"
                className="py-3 border-0"
              />
              <Button variant="success" className="fw-bold px-4">
                Join Waitlist
              </Button>
            </InputGroup>
            <p className="mt-2 small text-muted">
              *We respect your privacy. No spam, guaranteed.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ComingSoonFeaturePage;