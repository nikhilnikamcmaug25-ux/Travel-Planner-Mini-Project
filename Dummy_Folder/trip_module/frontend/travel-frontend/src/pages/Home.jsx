import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

function HomePage() {
  return (
    <div
      className="home-container text-white"
      style={{
        width: "100vw",                     // full viewport width
        marginLeft: "calc(50% - 50vw)",     // shift to left so it's full width
        marginRight: "calc(50% - 50vw)",    // likewise
        minHeight: "100vh",
        background: "linear-gradient(135deg, #001f3f, #005f73, #0a9396, #94d2bd)",
        animation: "gradientShift 15s ease infinite",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Hero Section */}
      <div className="container-fluid d-flex flex-column justify-content-center align-items-center text-center py-5">
        <motion.h1
          className="display-3 fw-bold mb-3"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            textShadow: "0px 0px 15px rgba(255, 255, 255, 0.4)",
            letterSpacing: "2px",
          }}
        >
          🌍 Plan Your Dream Trip
        </motion.h1>

        <motion.p
          className="lead mb-4 px-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            maxWidth: "700px",
            textShadow: "0 0 10px rgba(0,0,0,0.3)",
          }}
        >
          Organize your itineraries, track your adventures, and make every journey unforgettable.
        </motion.p>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link to="/trips" className="btn btn-lg btn-success px-5 py-3 shadow-lg fw-semibold">
            ✈️ Start Planning
          </Link>
        </motion.div>
      </div>

      {/* Destination Highlights */}
      <div className="container my-5">
        <h2 className="text-center mb-5 fw-bold">Explore Top Destinations</h2>
        <div className="row g-4">
          {[
            { city: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
            { city: "Tokyo", img: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c" },
            { city: "Bali", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
            { city: "Dubai", img: "https://images.unsplash.com/photo-1526481280698-8fcc2d50e84b" },
          ].map((dest, i) => (
            <motion.div
              key={i}
              className="col-md-3 col-sm-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className="destination-card position-relative rounded-4 shadow-lg overflow-hidden"
                style={{
                  backgroundImage: `url(${dest.img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "300px",
                  filter: "brightness(0.9)",
                }}
              >
                <div
                  className="position-absolute w-100 h-100 d-flex align-items-end justify-content-center"
                  style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    color: "white",
                  }}
                >
                  <h4 className="fw-bold mb-3">{dest.city}</h4>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-dark bg-opacity-50 mt-5">
        <small>© {new Date().getFullYear()} Travel Planner — Crafted with passion for explorers.</small>
      </footer>

      {/* Gradient Animation */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}

export default HomePage;
