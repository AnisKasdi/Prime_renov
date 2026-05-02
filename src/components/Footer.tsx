import Image from "next/image";
import primeRenov from "../Prime_renov.jpg";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-col brand-col">
          <a href="#accueil" className="footer-logo">
            <div className="footer-logo-mark" style={{ border: "none", width: "64px", height: "64px" }}>
              <Image src={primeRenov} alt="Prime Renov Logo" width={64} height={64} style={{ objectFit: "contain" }} />
            </div>
            <div>
              <span className="footer-wordmark">Prime Rénov</span>
              <span className="footer-sub">Cabinet d'Architecture</span>
            </div>
          </a>
          <p className="footer-desc">
            Créateurs d'espaces durables et empreints d'une esthétique singulière. Nous transformons vos visions en réalité architecturale, de la villa privée à l'immeuble de bureaux.
          </p>
        </div>
        
        <div className="footer-col">
          <h4 className="footer-col-title">Navigation</h4>
          <ul className="footer-links">
            <li><a href="#accueil">Accueil</a></li>
            <li><a href="#projets">Nos Projets</a></li>
            <li><a href="#services">Nos Services</a></li>
            <li><a href="#avis">Avis Clients</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Contact</h4>
          <ul className="footer-contact">
            <li>12 Rue de l'Architecture, 75001 Paris</li>
            <li>contact@prime-renov.fr</li>
            <li>+33 1 23 45 67 89</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-col-title">Réseaux Sociaux</h4>
          <div className="footer-socials">
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copy">
          © {year} Prime Rénov — Tous droits réservés.
        </p>
        <ul className="footer-legal">
          <li><a href="/mentions-legales">Mentions légales</a></li>
          <li><a href="/politique-confidentialite">Politique de confidentialité</a></li>
        </ul>
      </div>
    </footer>
  );
}
