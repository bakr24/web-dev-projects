import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo">
          DevBlog
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>

          <Link to="/category/React">
            React
          </Link>

          <Link to="/category/JavaScript">
            JavaScript
          </Link>

          <Link to="/category/Next.js">
            Next.js
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;