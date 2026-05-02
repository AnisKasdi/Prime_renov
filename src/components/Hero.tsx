import Image from "next/image";

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

      </div>
      <div className="hero-scroll">
        <div className="scroll-line"></div>
        <span className="scroll-text">Défiler</span>
      </div>
    </section>
  );
}
