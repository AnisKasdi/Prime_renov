export default function About() {
  return (
    <section className="section about" id="about">
      <div className="section-header reveal">

        <h2 className="section-title">
          À propos de <strong>l'Atelier</strong>
        </h2>
      </div>
      <div className="about-grid">
        <div>
          <div className="about-text reveal">
            <p>
              Fondé en 2003 par l'architecte Jean-Marie Fontaine, Prime Rénov
              s'est imposé comme une référence de l'architecture
              contemporaine française. Notre approche allie rigueur technique et
              sensibilité poétique.
            </p>
            <p>
              Chaque projet est une conversation entre le lieu, la lumière et
              l'usage. Nous concevons des espaces qui durent — des architectures
              qui s'intègrent à leur environnement tout en affirmant une identité
              forte.
            </p>
            <p>
              Notre équipe pluridisciplinaire de 12 architectes et designers
              intervient à toutes les échelles, du mobilier sur mesure à
              l'urbanisme.
            </p>
          </div>
          <div className="about-stats reveal reveal-d2">
            <div className="stat">
              <div className="stat-num">
                20<span>+</span>
              </div>
              <p className="stat-label label">Années d'expérience</p>
            </div>
            <div className="stat">
              <div className="stat-num">
                150<span>+</span>
              </div>
              <p className="stat-label label">Projets réalisés</p>
            </div>
            <div className="stat">
              <div className="stat-num">3</div>
              <p className="stat-label label">Prix nationaux</p>
            </div>
          </div>
        </div>
        <div className="about-visual reveal reveal-d1">
          <blockquote className="about-quote">
            "L'architecture n'est pas une affaire de forme — c'est une{" "}
            <em>affaire de vie</em>."
          </blockquote>
          <div className="about-sig">
            <strong>Jean-Marie Fontaine</strong>
            <span>Architecte fondateur, Prime Rénov</span>
          </div>
        </div>
      </div>
    </section>
  );
}
