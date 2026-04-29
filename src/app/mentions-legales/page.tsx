import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales — Prime Rénov',
  description: 'Mentions légales du site Prime Rénov, cabinet d\'architecture.',
};

export default function MentionsLegales() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '80px 40px',
      fontFamily: 'var(--font-plus-jakarta-sans)',
      color: 'var(--gray-900)',
      lineHeight: 1.7,
    }}>
      <Link href="/" style={{
        fontSize: '13px',
        color: 'var(--gray-400)',
        textDecoration: 'none',
        display: 'inline-block',
        marginBottom: '48px',
        letterSpacing: '0.05em',
      }}>
        ← Retour à l'accueil
      </Link>

      <h1 style={{ fontSize: '36px', fontWeight: 300, marginBottom: '8px', color: 'var(--blue-deep)' }}>
        Mentions <strong style={{ fontWeight: 700 }}>légales</strong>
      </h1>
      <p style={{ color: 'var(--gray-400)', fontSize: '14px', marginBottom: '64px' }}>
        Conformément aux articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004.
      </p>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-mid)', marginBottom: '16px' }}>
          Éditeur du site
        </h2>
        <p><strong>Raison sociale :</strong> Prime Rénov</p>
        <p><strong>Forme juridique :</strong> [SARL / SAS / EURL — à compléter]</p>
        <p><strong>Capital social :</strong> [X XXX €]</p>
        <p><strong>SIRET :</strong> [XXX XXX XXX XXXXX]</p>
        <p><strong>Numéro de TVA intracommunautaire :</strong> [FR XX XXX XXX XXX]</p>
        <p><strong>Siège social :</strong> [Adresse complète, Code postal Ville, France]</p>
        <p><strong>Téléphone :</strong> [+33 X XX XX XX XX]</p>
        <p><strong>Email :</strong> [contact@primerenov.fr]</p>
        <p><strong>Directeur de la publication :</strong> [Nom du dirigeant]</p>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-mid)', marginBottom: '16px' }}>
          Hébergement
        </h2>
        <p><strong>Hébergeur :</strong> Vercel Inc.</p>
        <p><strong>Adresse :</strong> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</p>
        <p><strong>Site :</strong> <a href="https://vercel.com" style={{ color: 'var(--blue-mid)' }}>vercel.com</a></p>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-mid)', marginBottom: '16px' }}>
          Propriété intellectuelle
        </h2>
        <p>
          L'ensemble des éléments constituant ce site (textes, graphiques, logiciels, photographies, images, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses) sont la propriété exclusive de Prime Rénov ou font l'objet d'une autorisation d'utilisation.
        </p>
        <p style={{ marginTop: '12px' }}>
          Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l'autorisation écrite préalable de Prime Rénov.
        </p>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-mid)', marginBottom: '16px' }}>
          Données personnelles
        </h2>
        <p>
          Les informations recueillies via les formulaires de contact et de devis sont destinées exclusivement à Prime Rénov pour répondre à vos demandes. Elles ne sont ni cédées, ni vendues à des tiers.
        </p>
        <p style={{ marginTop: '12px' }}>
          Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Pour exercer ce droit, contactez-nous à : <a href="mailto:contact@primerenov.fr" style={{ color: 'var(--blue-mid)' }}>contact@primerenov.fr</a>.
        </p>
        <p style={{ marginTop: '12px' }}>
          Pour en savoir plus, consultez notre{' '}
          <Link href="/politique-confidentialite" style={{ color: 'var(--blue-mid)' }}>
            politique de confidentialité
          </Link>.
        </p>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-mid)', marginBottom: '16px' }}>
          Cookies
        </h2>
        <p>
          Ce site utilise uniquement un cookie de session strictement nécessaire au fonctionnement de l'espace d'administration (authentification). Ce cookie est HTTP-only, sécurisé, et n'est déposé que lors de la connexion à l'interface d'administration. Il ne contient aucune donnée personnelle.
        </p>
        <p style={{ marginTop: '12px' }}>
          Aucun cookie publicitaire, analytique ou de tracking tiers n'est utilisé sur ce site.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-mid)', marginBottom: '16px' }}>
          Responsabilité
        </h2>
        <p>
          Prime Rénov s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site, dont elle se réserve le droit de modifier le contenu à tout moment et sans préavis. Prime Rénov ne peut garantir l'exhaustivité des informations présentes sur ce site.
        </p>
      </section>
    </div>
  );
}
