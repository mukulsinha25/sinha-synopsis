import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const handleHomeClick = (e) => {
    e.preventDefault();

    // If already on home, scroll to top
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Always force landing page on GitHub Pages
      window.location.href = "/sinhasynopsis/";
    }
  };

  return (
    <nav className="nav">
      {/* Home (same tag + same styling as others) */}
      <a href="/sinhasynopsis/" onClick={handleHomeClick}>
        Home
      </a>

      <Link to="/about">About</Link>
      <Link to="/blogs">Blogs</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;
