import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useVisitCounter } from "../hooks/useVisitCounter";

function Layout({ children }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const siteVisits = useVisitCounter("site-total");

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/blogs", label: "Blogs" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="app">
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="site-logo">
            Sinha Synopsis<span>.</span>
          </Link>

          <nav className={`site-nav ${menuOpen ? "open" : ""}`}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={location.pathname === link.to ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main className="site-main">{children}</main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Sinha Synopsis. All rights reserved.</p>
        {siteVisits !== null && (
          <p className="site-footer__visits">
            {siteVisits.toLocaleString()} total site visits
          </p>
        )}
      </footer>
    </div>
  );
}

export default Layout;
