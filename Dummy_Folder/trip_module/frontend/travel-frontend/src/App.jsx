import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import TripsPage from "./pages/TripsPage";
import ItineraryPage from "./pages/ItineraryPage";

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/itinerary" element={<ItineraryPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
