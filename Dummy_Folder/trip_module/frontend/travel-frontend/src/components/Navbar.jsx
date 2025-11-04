import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Travel Planner</Link>
        <div>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/trips">Trips</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/itinerary">Itinerary</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
