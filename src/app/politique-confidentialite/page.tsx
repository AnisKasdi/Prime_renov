import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Prime Rénov',
  description: 'Politique de confidentialité et protection des données personnelles de Prime Rénov.',
};

export default function PolitiqueConfidentialite() {
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
        Politique de <strong style={{ fontWeight: 700 }}>confidentialité</strong>
      </h1>
      <p style={{ color: 'var(--gray-400)', fontSize: '14px', marginBottom: '64px' }}>
        Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-mid)', marginBottom: '16px' }}>
          Responsable du traitement
        </h2>
        <p>
          Prime Rénov, [forme juridique], dont le siège social est situé [adresse complète], est responsable du traitement de vos données personnelles dans le cadre de l'utilisation du présent site.
        </p>
        <p style={{ marginTop: '12px' }}>Contact : <a href="mailto:contact@primerenov.fr" style={{ color: 'var(--blue-mid)' }}>contact@primerenov.fr</a></p>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-mid)', marginBottom: '16px' }}>
          Données collectées
        </h2>
        <p>Nous collectons uniquement les données que vous nous communiquez volontairement via nos formulaires :</p>
        <ul style={{ marginTop: '12px', paddingLeft: '24px' }}>
          <li><strong>Formulaire de contact :</strong> nom, adresse email, message</li>
          <li><strong>Formulaire de devis :</strong> nom, email, téléphone, description du projet, localisation, budget, délai</li>
        </ul>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-mid)', marginBottom: '16px' }}>
          Finalités et base légale
        </h2>
        <p>Les données sont collectées pour :</p>
        <ul style={{ marginTop: '12px', paddingLeft: '24px' }}>
          <li>Répondre à vos demandes de contact (base légale : intérêt légitime)</li>
          <li>Établir des devis et vous contacter en vue d'une relation commerciale (base légale : exécution de mesures précontractuelles)</li>
        </ul>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-mid)', marginBottom: '16px' }}>
          Destinataires des données
        </h2>
        <p>
          Vos données sont transmises exclusivement à l'équipe de Prime Rénov via le service d'envoi d'emails Resend (Resend Inc., États-Unis, certifié conforme au Data Privacy Framework UE-USA). Elles ne sont ni vendues, ni partagées avec d'autres tiers.
        </p>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-mid)', marginBottom: '16px' }}>
          Durée de conservation
        </h2>
        <p>
          Vos données sont conservées pendant la durée nécessaire au traitement de votre demande, puis supprimées. En l'absence de suite commerciale, les données sont effacées dans un délai de 12 mois suivant le dernier contact.
        </p>
      </section>

      <section style={{ marginBottom: '48px' }}>
        <h2 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-mid)', marginBottom: '16px' }}>
          Vos droits
        </h2>
        <p>Conformément au RGPD, vous disposez des droits suivants :</p>
        <ul style={{ marginTop: '12px', paddingLeft: '24px' }}>
          <li>Droit d'accès à vos données personnelles</li>
          <li>Droit de rectification</li>
          <li>Droit à l'effacement (« droit à l'oubli »)</li>
          <li>Droit à la portabilité</li>
          <li>Droit d'opposition au traitement</li>
        </ul>
        <p style={{ marginTop: '12px' }}>
          Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@primerenov.fr" style={{ color: 'var(--blue-mid)' }}>contact@primerenov.fr</a>. Nous répondrons dans un délai de 30 jours.
        </p>
        <p style={{ marginTop: '12px' }}>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noreferrer" style={{ color: 'var(--blue-mid)' }}>CNIL</a>.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-mid)', marginBottom: '16px' }}>
          Cookies
        </h2>
        <p>
          Ce site n'utilise aucun cookie de tracking ou d'analyse. Le seul cookie déposé est un cookie de session sécurisé, strictement nécessaire au fonctionnement de l'espace d'administration. Il ne nécessite pas de consentement au sens de l'article 82 de la loi Informatique et Libertés.
        </p>
      </section>
    </div>
  );
}
