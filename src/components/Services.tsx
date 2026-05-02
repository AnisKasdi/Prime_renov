export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="section-header reveal">

        <h2 className="section-title">
          Nos <strong>Services</strong>
        </h2>
      </div>
      <div className="services-grid">
        <div className="service-card reveal">
          <div className="service-num">01</div>
          <h3 className="service-title">Architecture Résidentielle</h3>
          <p className="service-desc">
            Conception de maisons individuelles, villas et appartements sur mesure.
            De l'esquisse au permis de construire, nous accompagnons chaque étape
            de votre projet privé.
          </p>
        </div>
        <div className="service-card reveal reveal-d1">
          <div className="service-num">02</div>
          <h3 className="service-title">Architecture Commerciale</h3>
          <p className="service-desc">
            Bureaux, commerces, hôtels et équipements publics. Nous créons des
            espaces de travail et de réception qui reflètent l'identité et les
            valeurs de votre entreprise.
          </p>
        </div>
        <div className="service-card reveal reveal-d2">
          <div className="service-num">03</div>
          <h3 className="service-title">Rénovation & Réhabilitation</h3>
          <p className="service-desc">
            Transformation d'espaces existants, réhabilitation de bâtiments
            anciens, extension et surélévation. Donner une seconde vie à votre
            patrimoine bâti.
          </p>
        </div>
      </div>
    </section>
  );
}
