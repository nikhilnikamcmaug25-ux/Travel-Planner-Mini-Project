import React, { useState } from "react"; // 👈 ADDED useState
import {Container, Row, Col, Button, Card, Carousel, Badge } from "react-bootstrap";
import { FaFeatherAlt, FaUsers, FaSearch, FaArrowRight, FaStar, FaMobileAlt, FaRocket, FaHeartbeat, FaClock, FaCheckCircle, } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
// Adjust the path below if your AuthModal.jsx is not in src/components/
import AuthModal from "../components/AuthModal.jsx"; 
import S1 from "/src/assets/S1.png";
import S2 from "/src/assets/S2.png";
import S4 from "/src/assets/S4.png";
import tokyo from "/src/assets/tokyo.png";
import Chile from "/src/assets/Chile.png";
import Greece from "/src/assets/Greece.png";

// --- DESIGN COLORS ---
const PRIMARY_TEAL = "#1abc9c";
const SECONDARY_SLATE = "#34495e";
const LIGHT_GRAY = "#f8f9fa";

// 1️⃣ HERO SECTION (Carousel) - NOW ACCEPTS PROP
const CarouselHeroSection = ({ setShowModal }) => { // 👈 ACCEPTS PROP
const navigate = useNavigate();

  const slides = [
    {
      src: S4,
      headline: "Discover Your Next Adventure",
      subtext: "Curated itineraries built for unforgettable experiences.",
      buttonText: "Get Started Now",
    },
    {
      src: S2,
      headline: "Travel Smarter, Not Harder",
      subtext: "Stop wasting time backtracking. Start with an efficient route.",
      buttonText: "Manage My Trip",
    },
    {
      src: S1,
      headline: "Collaborate with Your Crew",
      subtext: "Plan together in real-time. Share and edit itineraries instantly.",
      buttonText: "Join the Crew",
    },
  ];

  const slideStyle = (src) => ({
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5)), url(${src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",
    paddingTop: "68px",
  });

  return (
    <Carousel fade controls={true} indicators={true} interval={5000}>
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx}>
          <div
            style={slideStyle(slide.src)}
            className="d-flex align-items-center justify-content-center text-center text-white"
          >
            <Container style={{ maxWidth: 800 }}>
              <h1
                className="display-3 fw-bold mb-3"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
              >
                {slide.headline}
              </h1>
              <p className="lead mb-5 text-shadow-sm">{slide.subtext}</p>

              <Button variant="primary" size="lg" className="shadow-lg"
                onClick={() => setShowModal(true)} // 👈 OPENS MODAL
              >
                {slide.buttonText}
              </Button>
            </Container>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

// 2️⃣ CORE FEATURES SECTION (Unchanged)
const CoreFeaturesSection = () => (
  <Container id="features" className="text-center py-5">
    <h2 className="fw-bold mb-4" style={{ color: PRIMARY_TEAL }}>
      The Power of Seamless Planning
    </h2>
    <Row className="g-4 justify-content-center">
      <Col md={4}>
        <Card className="p-4 border-0 shadow-sm h-100 bg-light">
          <div
            className="mx-auto mb-3"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: PRIMARY_TEAL,
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            <FaSearch />
          </div>
          <Card.Title className="fw-bold">Easy Trip Organizer</Card.Title>
          <Card.Text className="text-muted">
            Plan your days effortlessly — add places, notes, and travel timing in
            one place.
          </Card.Text>
        </Card>
      </Col>

      <Col md={4}>
        <Card className="p-4 border-0 shadow-sm h-100 bg-light">
          <div
            className="mx-auto mb-3"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#28a745",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            <FaFeatherAlt />
          </div>
          <Card.Title className="fw-bold">Quick Itinerary Builder</Card.Title>
          <Card.Text className="text-muted">
            Create, edit, and delete your travel plans in minutes — super easy to
            use.
          </Card.Text>
        </Card>
      </Col>

      <Col md={4}>
        <Card className="p-4 border-0 shadow-sm h-100 bg-light">
          <div
            className="mx-auto mb-3"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#ffc107",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
            }}
          >
            <FaUsers />
            </div>
          <Card.Title className="fw-bold">User-Friendly Planning</Card.Title>
          <Card.Text className="text-muted">
            Plan trips effortlessly with a simple and intuitive interface.
          </Card.Text>
        </Card>
      </Col>
    </Row>
  </Container>
);

// 3️⃣ VALUE SECTION (Unchanged)
const ItineraryValueSection = () => (
    <Container className="my-5 py-5">
      
      <Row className="justify-content-center mb-5">
        <Col md={10} lg={8} className="text-center">
             {/* Updated: Primary Teal Color */}
          <h2 style={{ color: PRIMARY_TEAL, fontWeight: 800, fontSize: "clamp(28px, 4vw, 42px)" }}>
            The Blueprint for an Epic Adventure 🗺️
          </h2>
          <p className="lead text-muted">A smart itinerary is more than a list—it's your stress-free guarantee.</p>
        </Col>
      </Row>

      <Row className="justify-content-center align-items-stretch g-4">
        <Col md={10} lg={10}>
          <Card className="border-0 p-3 p-md-5 shadow-lg bg-white"> 
            <Row className="align-items-center">
              
              {/* Refined: Changed border to a primary color and made text cleaner */}
              <Col md={6} className="pe-md-5 border-end pb-4 pb-md-0" style={{ borderColor: LIGHT_GRAY }}>
                <h3 className="fw-bold mb-4 text-success">Stop Planning, Start Traveling</h3>
                
                <div className="d-flex mb-4 align-items-start">
                    <FaHeartbeat size={30} className="text-danger me-3 mt-1 flex-shrink-0" />
                    <div>
                        {/* Updated: Secondary Slate Color */}
                        <h5 className="fw-bold mb-1" style={{ color: SECONDARY_SLATE }}>Stress-Free Travel Days</h5>
                        <p className="text-muted mb-0">
                            Your itinerary is your **stress saver**. Eliminate on-the-spot decisions and enjoy every moment.
                        </p>
                    </div>
                </div>

                <div className="d-flex mb-4 align-items-start">
                    <FaClock size={30} className="text-warning me-3 mt-1 flex-shrink-0" />
                    <div>
                        {/* Updated: Secondary Slate Color */}
                        <h5 className="fw-bold mb-1" style={{ color: SECONDARY_SLATE }}>Maximum Efficiency</h5>
                        <p className="text-muted mb-0">
                            Optimize your route to avoid wasted energy, backtracking, or circling around.
                        </p>
                    </div>
                </div>

                <div className="d-flex align-items-start">
                    <FaCheckCircle size={30} className="text-success me-3 mt-1 flex-shrink-0" />
                    <div>
                        {/* Updated: Secondary Slate Color */}
                        <h5 className="fw-bold mb-1" style={{ color: SECONDARY_SLATE }}>Cover Every Must-Do</h5>
                        <p className="text-muted mb-0">
                            Leave with no regrets. Know that your plan has covered all the essential stops and hidden gems.
                        </p>
                    </div>
                </div>
              </Col>

              <Col md={6} className="d-flex flex-column align-items-center justify-content-center mt-4 mt-md-0 ps-md-5">
                <div 
                  className="rounded-4 overflow-hidden w-100" 
                  // Updated: Primary Teal Border
                  style={{ 
                    border: `8px solid ${PRIMARY_TEAL}`, 
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)' 
                  }}
                >
                  <img
                    src="https://plus.unsplash.com/premium_vector-1682298683439-45f9fdbd99c6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600"
                    alt="Travel Planning Illustration"
                    className="img-fluid"
                    style={{ maxHeight: '450px', width: '100%', objectFit: 'cover' }}
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
);

// 4️⃣ DESTINATIONS SECTION (Unchanged)
const DestinationsSpotlightSection = () => {
  const destinations = [
    { name: "Kyoto, Japan", image: tokyo, tagline: "Culture & Tradition", rating: 4.8 },
    { name: "Patagonia, Chile", image: Chile, tagline: "Epic Nature Hikes", rating: 4.9 },
    { name: "Santorini, Greece", image: Greece, tagline: "Beaches & Romance", rating: 4.7 },
  ];

  return (
    <div className="py-5" style={{ backgroundColor: LIGHT_GRAY }}>
      <Container>
        <h2 className="text-center fw-bold mb-5" style={{ color: PRIMARY_TEAL }}>
          Explore Our Trending Destinations
        </h2>
        <Row className="g-4">
          {destinations.map((d, index) => (
            <Col md={4} key={index}>
              <Card className="h-100 border-0 shadow-sm" style={{ overflow: "hidden" }}>
                <img
                  src={d.image}
                  alt={d.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <h5 className="fw-bold">{d.name}</h5>
                  <Badge bg="success" className="mb-2">
                    {d.tagline}
                  </Badge>
                  <div className="text-warning mb-3">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar style={{ color: d.rating > 4.8 ? "#ffc107" : "#e9ecef" }} /> (
                    {d.rating})
                  </div>
                  <Button
                    style={{ backgroundColor: SECONDARY_SLATE, borderColor: SECONDARY_SLATE }}
                    className="text-white"
                    size="sm"
                  >
                    View Itineraries
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

// 5️⃣ FINAL CTA - NOW ACCEPTS PROP
const ExcitementCTA = ({ setShowModal }) => ( // 👈 ACCEPTS PROP
  <div style={{ backgroundColor: PRIMARY_TEAL }} className="text-white py-5">
    <Container className="text-center" style={{ maxWidth: "700px" }}>
      <FaRocket size={45} className="mb-3 text-white" />
      <h2 className="fw-bolder mb-3" style={{ fontSize: "clamp(28px, 4vw, 38px)" }}>
        Your Adventure Starts Now!
      </h2>
      <p className="lead mb-4">
        Ready to ditch the spreadsheets? Our smart planner is waiting.
      </p>
      <Button
        variant="warning"
        size="lg"
        className="fw-bold shadow-lg text-dark px-5 py-3"
        onClick={() => setShowModal(true)} // 👈 OPENS MODAL
      >
        Let's Get Started <FaArrowRight className="ms-2" />
      </Button>
    </Container>
  </div>
);


// 6️⃣ EXPORT HOME
export default function Home() {
  // 👈 STATE DEFINITION
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* 👈 PASSING PROP */}
      <CarouselHeroSection setShowModal={setShowModal} />

      <CoreFeaturesSection />
      <ItineraryValueSection/>
      <DestinationsSpotlightSection />
      
      {/* 👈 PASSING PROP */}
      <ExcitementCTA setShowModal={setShowModal} />
      
      {/* 👈 RENDERING MODAL */}
      <AuthModal show={showModal} handleClose={handleClose} />
    </div>
  );
}