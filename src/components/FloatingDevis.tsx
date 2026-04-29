"use client";

import { useEffect, useState } from "react";

export default function FloatingDevis() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sy = window.scrollY;
      const heroEl = document.getElementById("accueil");
      const devisEl = document.getElementById("devis");

      if (heroEl && devisEl) {
        const pastHero = sy > heroEl.offsetHeight * 0.6;
        const onDevis =
          sy >= devisEl.offsetTop - 200 &&
          sy < devisEl.offsetTop + devisEl.offsetHeight - 200;
        
        setVisible(pastHero && !onDevis);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Init

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="#devis"
      className={`floating-devis ${visible ? "visible" : ""}`}
      id="floatingDevis"
      aria-label="Faire mon premier devis"
    >
      <div className="fd-inner">
        <span className="fd-text">Faire mon premier devis</span>
        <span className="fd-dot"></span>
      </div>
    </a>
  );
}
