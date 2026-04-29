'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

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
        color: '#e05252',
        marginBottom: '20px',
      }}>
        Erreur serveur
      </span>
      <h1 style={{
        fontSize: '40px',
        fontWeight: 300,
        color: 'var(--blue-deep)',
        marginBottom: '16px',
      }}>
        Une erreur est survenue
      </h1>
      <p style={{
        color: 'var(--gray-600)',
        fontSize: '16px',
        marginBottom: '48px',
        maxWidth: '400px',
      }}>
        Quelque chose s'est mal passé. Vous pouvez réessayer ou revenir à l'accueil.
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <button
          onClick={reset}
          style={{
            backgroundColor: 'var(--green-mid)',
            color: 'white',
            border: 'none',
            padding: '14px 32px',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Réessayer
        </button>
        <a href="/" style={{
          backgroundColor: 'var(--blue-dark)',
          color: 'white',
          padding: '14px 32px',
          textDecoration: 'none',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>
          Accueil
        </a>
      </div>
    </div>
  );
}
