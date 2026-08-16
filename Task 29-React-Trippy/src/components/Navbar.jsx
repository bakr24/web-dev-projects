import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          Trippy
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/tours">Tours</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <Link to="/tours" className="nav-button">
          Explore Tours
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;