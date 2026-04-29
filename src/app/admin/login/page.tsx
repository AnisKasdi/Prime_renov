'use client';

import { useActionState } from 'react';
import { login } from '@/actions/auth';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--blue-deep)',
      color: 'white',
      fontFamily: 'var(--font-plus-jakarta-sans)'
    }}>
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: '40px',
        borderRadius: '8px',
        border: '1px solid rgba(255,255,255,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 300, marginBottom: '8px', color: 'white' }}>
          Administration
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', marginBottom: '32px' }}>
          Veuillez vous authentifier pour continuer
        </p>
        
        <form action={formAction} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="password" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green-mid)' }}>
              Mot de passe
            </label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              required 
              placeholder="••••••••"
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '12px 16px',
                color: 'white',
                outline: 'none',
                width: '100%'
              }}
            />
          </div>
          
          {state?.error && (
            <p style={{ color: '#ff6b6b', fontSize: '13px', margin: 0 }}>
              {state.error}
            </p>
          )}
          
          <button 
            type="submit" 
            disabled={isPending}
            style={{
              backgroundColor: 'var(--green-mid)',
              color: 'var(--blue-dark)',
              border: 'none',
              padding: '14px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: isPending ? 'not-allowed' : 'pointer',
              marginTop: '10px',
              transition: 'background 0.3s'
            }}
          >
            {isPending ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
