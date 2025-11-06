import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaRocket, FaUsers, FaMobileAlt, FaGlobeAmericas, FaMapMarkedAlt, FaPlaneDeparture } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Mission from '/src/assets/Mission.png';
import Home from '/src/pages/Home.jsx'
import Nikhil from '/src/assets/Nikhil.png';
import Himanshu from '/src/assets/Himanshu.png';
import Gaurav from '/src/assets/Gaurav.png';
import Travel from "/src/assets/Travel.png"; // Using Travel as a temporary placeholder image for all three

// --- Design Palette Constants (Refined) ---
const PRIMARY_TEAL = '#1abc9c'; // Main Brand Color - Energetic
const SECONDARY_SLATE = '#34495e'; // Deep Accent Color - Strong Contrast
const LIGHT_GRAY = '#f8f9fa'; // Neutral Background
const WARNING_YELLOW = '#ffc107'; // A vibrant yellow for highlights and accents

// --- TEAM DATA (Placed outside the component for clean code) ---
const teamMembers = [
    { name: "Nikhil Nikam", title: "Software Developer", image: Nikhil, quote: "CDAC Kharghar." },
    { name: "Gaurav Patil", title: "Software Developer", image: Gaurav, quote: "CDAC Kharghar." },
    { name: "Himanshu Patil", title: "Software Developer", image: Himanshu, quote: "CDAC Kharghar." },
];

export default function About() {
    return (
        <div className="py-5 bg-white">
            <Container style={{ paddingTop: '60px' }}>

                {/* Hero Header Section - More Engaging */}
                <Row className="text-center mb-5">
                    <Col>
                        <FaGlobeAmericas size={80} style={{ color: PRIMARY_TEAL }} className="mb-3 animate-pulse" />
                        <h1 className="display-3 fw-bolder mb-3" style={{ color: SECONDARY_SLATE }}>
                            About Traveleva: Your Journey, Simplified.
                        </h1>
                        <p className="lead fs-4 fw-light mx-auto" style={{ color: PRIMARY_TEAL, maxWidth: '800px' }}>
                            We believe in a world where travel planning is exciting, not exhausting. Discover how we're changing the way you explore.
                        </p>
                    </Col>
                </Row>

                {/* Mission & Vision Section - Visually Richer */}
                <div className="my-5 p-5 text-white rounded-4 shadow-lg"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${Mission})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                    <Row className="justify-content-center">
                        <Col lg={10} className="text-center">
                            <h2 className="fw-bolder mb-4" style={{ color: WARNING_YELLOW }}>Our Vision: Explore with Freedom</h2>
                            <p className="fs-5 mb-4 opacity-75">
                                Our vision is to empower every traveler with the tools to embark on seamless, memorable adventures. We're building a future where your itinerary is a dynamic, intelligent companion, adapting to your needs and preferences.
                            </p>
                            <h3 className="fw-bold mb-3" style={{ color: PRIMARY_TEAL }}>Our Mission: Simplify, Optimize, Inspire</h3>
                            <p className="fs-5 opacity-75">
                                At Traveleva, we fuse cutting-edge AI with intuitive design to transform chaotic travel planning into an effortless, enjoyable process. We aim to inspire more journeys by removing the common barriers of logistics and coordination.
                            </p>
                        </Col>
                    </Row>
                </div>

                {/* Why Choose Traveleva - Card Grid with Icons */}
                <div className="py-5 bg-light rounded-4 my-5">
                    <Container>
                        <h3 className="text-center fw-bold mb-5" style={{ color: SECONDARY_SLATE }}>Discover the Traveleva Difference</h3>
                        <Row className="g-4 justify-content-center">
                            <Col md={4}>
                                <Card className="h-100 p-4 border-0 shadow-sm text-center card-hover-brighten">
                                    <FaRocket size={50} style={{ color: PRIMARY_TEAL }} className="mb-3 mx-auto" />
                                    <h5 style={{ color: SECONDARY_SLATE }} className="fw-bold">Intelligent Routing</h5>
                                    <p className="text-muted">Our AI crafts the optimal path for your trip, minimizing travel time and maximizing exploration.</p>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="h-100 p-4 border-0 shadow-sm text-center card-hover-brighten">
                                    <FaUsers size={50} style={{ color: PRIMARY_TEAL }} className="mb-3 mx-auto" />
                                    <h5 style={{ color: SECONDARY_SLATE }} className="fw-bold">Real-time Collaboration</h5>
                                    <p className="text-muted">Plan seamlessly with friends and family. Share, edit, and finalize itineraries together, instantly.</p>
                                </Card>
                            </Col>
                            <Col md={4}>
                                <Card className="h-100 p-4 border-0 shadow-sm text-center card-hover-brighten">
                                    <FaMobileAlt size={50} style={{ color: PRIMARY_TEAL }} className="mb-3 mx-auto" />
                                    <h5 style={{ color: SECONDARY_SLATE }} className="fw-bold">Offline Access</h5>
                                    <p className="text-muted">Your entire itinerary is available offline on our mobile app, ensuring peace of mind wherever you go.</p>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>

                {/* Our Story - More prominent with an image */}
                <Row className="my-5 align-items-center">
                    <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
                        <FaMapMarkedAlt size={70} style={{ color: WARNING_YELLOW }} className="mb-3" />
                        <h2 className="fw-bolder mb-3" style={{ color: SECONDARY_SLATE }}>Our Journey: From Frustration to Innovation</h2>
                        <p className="fs-5 text-muted">
                            Traveleva was born out of a shared frustration with cumbersome travel planning. We experienced firsthand the chaos of multiple spreadsheets and conflicting ideas.
                        </p>
                        <p className="fs-5 text-muted">
                            We believed modern travelers deserved a tool that was as dynamic and exciting as their adventures. So, we set out to build it—a platform that empowers, not overwhelms.
                        </p>
                    </Col>
                    <Col md={6}>
                        <img
                            src={Travel}
                            alt="Journey mapping"
                            className="img-fluid rounded-4 shadow-lg"
                            style={{ border: `5px solid ${PRIMARY_TEAL}` }}
                        />
                    </Col>
                </Row>

                {/* Inspiring Quote Block - More colorful */}
                <div className="text-center py-5 px-4 my-5 rounded-4 shadow-md" style={{ backgroundColor: PRIMARY_TEAL, color: 'white' }}>
                    <p className="display-6 fw-bold mb-2">
                        "The world is a book, and those who do not travel read only one page."
                    </p>
                    <footer className="blockquote-footer text-white-50 fs-5 mt-3">
                        Saint Augustine
                    </footer>
                </div>

                {/* Call to Action - Bright and clear */}
                <Row className="text-center my-5">
                    <Col>
                        <h2 className="fw-bolder mb-4" style={{ color: SECONDARY_SLATE }}>Ready to Plan Your Next Great Escape?</h2>
                        <Button
                            as={Link}
                            to="/"
                            variant="warning"
                            size="lg"
                            className="fw-bold shadow-lg px-5 py-3 text-dark text-uppercase letter-spacing-1"
                        >
                            Start Planning Now <FaPlaneDeparture className="ms-2" />
                        </Button>
                    </Col>
                </Row>

                {/* 7. Team Section - Clean 3-Member Grid (Added Here!) */}
                <Row className="text-center my-5 pt-5 border-top" style={{ borderColor: LIGHT_GRAY }}>
                    <Col>
                        <h2 className="fw-bold mb-5" style={{ color: PRIMARY_TEAL }}>Meet The Team</h2>
                    </Col>
                </Row>

                <Row className="justify-content-center g-4 mb-5">
                    {teamMembers.map((member, index) => (
                        <Col md={4} key={index}>
                            <Card className="h-100 border-0 shadow-lg text-center p-4 card-hover-brighten">
                                {/* Photo */}
                                <div className="mx-auto mb-3 overflow-hidden"
                                    style={{ width: '150px', height: '150px', borderRadius: '50%', border: `5px solid ${PRIMARY_TEAL}` }}
                                >
                                    <img src={member.image} alt={member.name} className="img-fluid" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
                                </div>
                                
                                {/* Details */}
                                <Card.Body className="p-0">
                                    <h4 className="fw-bolder mb-1" style={{ color: SECONDARY_SLATE }}>{member.name}</h4>
                                    <p className="text-muted fw-bold mb-3">{member.title}</p>
                                    <p className="fst-italic small" style={{ color: PRIMARY_TEAL }}>"{member.quote}"</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* General Team Statement */}
                <Row className="justify-content-center mb-5">
                    <Col md={10} className="text-center">
                        <p className="lead fst-italic text-muted">
                            The Horizon Team's dedication lies in transforming complex logistics into simple, delightful interactions, ensuring every journey is an adventure worth remembering.
                        </p>
                    </Col>
                </Row>


            </Container>

        </div>
    );
}