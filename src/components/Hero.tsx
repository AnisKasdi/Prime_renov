import Image from "next/image";
import primeRenov from "../Prime_renov.jpg";

export default function Hero() {
  return (
    <section className="hero" id="accueil">
      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-origin">Fondé en 2003 — Paris, France</p>
          <h1 className="hero-headline">
            Concevoir<br />
            <em>l'espace,</em><br />
            sublimer<br />
            <strong>la lumière.</strong>
          </h1>
          <p className="hero-sub">
            Prime Rénov transforme vos projets en espaces durables et
            empreints d'une esthétique singulière. De la villa privée à
            l'immeuble de bureau, chaque ligne compte.
          </p>
          <div className="hero-actions">
            <a href="#projets" className="btn-primary">
              Découvrir nos projets
              <span className="arrow"></span>
            </a>
            <a href="#devis" className="btn-ghost">
              Obtenir un devis
            </a>
          </div>
        </div>
        <div className="hero-geo">
          <div className="geo-wrap">
            <div className="geo-outer">
              <div className="geo-corner geo-corner--tl"></div>
              <div className="geo-corner geo-corner--tr"></div>
              <div className="geo-corner geo-corner--bl"></div>
              <div className="geo-corner geo-corner--br"></div>
              <Image
                src={primeRenov}
                alt="Prime Renov Logo"
                fill
                priority
                style={{ objectFit: "contain", padding: "10px" }}
              />
            </div>
            <div className="geo-line-h"></div>
            <div className="geo-line-v"></div>
            <div className="geo-dot"></div>
            <span className="geo-label geo-label--tl">Élévation — 01</span>
            <span className="geo-label geo-label--br">Ech. 1:100</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line"></div>
        <span className="scroll-text">Défiler</span>
      </div>
    </section>
  );
}
