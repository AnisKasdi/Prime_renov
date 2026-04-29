"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      setScrolled(sy > 60);

      // Active nav link
      const sections = document.querySelectorAll("section[id]");
      let currentActive = "";
      sections.forEach((s) => {
        const htmlElement = s as HTMLElement;
        if (sy >= htmlElement.offsetTop - 100) {
          currentActive = htmlElement.id;
        }
      });
      if (currentActive) {
        setActiveSection(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav id="nav" className={scrolled ? "scrolled" : ""}>
      <a href="#accueil" className="nav-logo" onClick={closeMenu}>
        <div className="nav-logo-mark">P·R</div>
        <div>
          <span className="nav-logo-name">Prime Rénov</span>
          <span className="nav-logo-sub">Cabinet d'Architecture</span>
        </div>
      </a>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`} id="navLinks">
        <li>
          <a
            href="#accueil"
            data-nav="accueil"
            className={activeSection === "accueil" ? "active" : ""}
            onClick={closeMenu}
          >
            Accueil
          </a>
        </li>
        <li>
          <a
            href="#projets"
            data-nav="projets"
            className={activeSection === "projets" ? "active" : ""}
            onClick={closeMenu}
          >
            Projets
          </a>
        </li>
        <li>
          <a
            href="#services"
            data-nav="services"
            className={activeSection === "services" ? "active" : ""}
            onClick={closeMenu}
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#avis"
            data-nav="avis"
            className={activeSection === "avis" ? "active" : ""}
            onClick={closeMenu}
          >
            Avis
          </a>
        </li>
        <li>
          <a
            href="#devis"
            className={`nav-cta ${activeSection === "devis" ? "active" : ""}`}
            data-nav="devis"
            onClick={closeMenu}
          >
            Devis
          </a>
        </li>
        <li>
          <a
            href="#contact"
            data-nav="contact"
            className={activeSection === "contact" ? "active" : ""}
            onClick={closeMenu}
          >
            Contact
          </a>
        </li>
      </ul>
      <button
        className="nav-toggle"
        id="navToggle"
        aria-label="Menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  );
}
