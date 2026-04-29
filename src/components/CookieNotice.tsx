'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie_notice_dismissed')) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    localStorage.setItem('cookie_notice_dismissed', '1');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '24px',
      right: '24px',
      maxWidth: '560px',
      backgroundColor: 'var(--blue-deep)',
      color: 'white',
      padding: '20px 24px',
      borderRadius: '6px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      fontSize: '13px',
      lineHeight: 1.5,
    }}>
      <p style={{ margin: 0, flex: 1, color: 'rgba(255,255,255,0.75)' }}>
        Ce site utilise uniquement un cookie technique nécessaire à son fonctionnement. Aucun traceur publicitaire.{' '}
        <Link href="/politique-confidentialite" style={{ color: 'var(--green-light)', textDecoration: 'underline' }}>
          En savoir plus
        </Link>
      </p>
      <button
        onClick={dismiss}
        style={{
          flexShrink: 0,
          backgroundColor: 'var(--green-mid)',
          color: 'white',
          border: 'none',
          padding: '8px 20px',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          borderRadius: '3px',
          whiteSpace: 'nowrap',
        }}
      >
        J'ai compris
      </button>
    </div>
  );
}
