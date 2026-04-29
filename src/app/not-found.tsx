import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--gray-50)',
      fontFamily: 'var(--font-plus-jakarta-sans)',
      textAlign: 'center',
      padding: '40px',
    }}>
      <span style={{
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--green-mid)',
        marginBottom: '20px',
      }}>
        Erreur 404
      </span>
      <h1 style={{
        fontSize: '48px',
        fontWeight: 300,
        color: 'var(--blue-deep)',
        marginBottom: '16px',
        lineHeight: 1.1,
      }}>
        Page introuvable
      </h1>
      <p style={{
        color: 'var(--gray-600)',
        fontSize: '16px',
        marginBottom: '48px',
        maxWidth: '400px',
      }}>
        La page que vous recherchez n'existe pas ou a été déplacée.
      </p>
      <Link href="/" style={{
        backgroundColor: 'var(--blue-dark)',
        color: 'white',
        padding: '14px 36px',
        textDecoration: 'none',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}>
        Retour à l'accueil
      </Link>
    </div>
  );
}
