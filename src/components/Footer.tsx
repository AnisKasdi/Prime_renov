export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="footer-inner">
        <a href="#accueil" className="footer-logo">
          <div className="footer-logo-mark">P·R</div>
          <span className="footer-wordmark">Prime Rénov</span>
        </a>
        <p className="footer-copy">
          © {year} Prime Rénov — Tous droits réservés
        </p>
        <ul className="footer-links">
          <li><a href="#projets">Projets</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/mentions-legales">Mentions légales</a></li>
          <li><a href="/politique-confidentialite">Confidentialité</a></li>
        </ul>
      </div>
    </footer>
  );
}
