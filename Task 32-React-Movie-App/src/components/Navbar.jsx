import { Link } from "react-router-dom";

function Navbar({ favoriteCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          🎬 Movie Finder
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/favorites">
            Favorites ({favoriteCount})
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;