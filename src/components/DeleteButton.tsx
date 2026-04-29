'use client';

import { useState, useActionState, useEffect } from 'react';

type ActionState = { error?: string; success?: boolean } | null;

export default function DeleteButton({ id, deleteAction }: { id: number, deleteAction: any }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const actionWithId = deleteAction.bind(null, id);
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(actionWithId, null);

  useEffect(() => {
    if (state?.success) {
      setShowConfirm(false);
    }
  }, [state]);

  if (!showConfirm) {
    return (
      <button 
        type="button" 
        onClick={() => setShowConfirm(true)}
        style={{ backgroundColor: '#ff4757', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', height: 'fit-content' }}
      >
        Supprimer
      </button>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '12px', border: '1px solid #ff4757', borderRadius: '6px', backgroundColor: '#fff5f5' }}>
      <p style={{ fontSize: '12px', fontWeight: 600, color: '#ff4757', margin: 0 }}>Mot de passe requis</p>
      <form action={formAction} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <input 
            type="password" 
            name="password" 
            required 
            placeholder="••••••••" 
            style={{ padding: '6px', border: '1px solid #ff4757', borderRadius: '4px', fontSize: '12px', width: '120px' }}
          />
          {state?.error && <span style={{ color: '#ff4757', fontSize: '11px' }}>{state.error}</span>}
        </div>
        <button 
          type="submit" 
          disabled={isPending}
          style={{ backgroundColor: '#ff4757', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: isPending ? 'not-allowed' : 'pointer', fontSize: '12px' }}
        >
          {isPending ? '...' : 'Valider'}
        </button>
        <button 
          type="button" 
          onClick={() => setShowConfirm(false)}
          style={{ backgroundColor: 'transparent', color: '#666', border: '1px solid #ccc', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
        >
          Annuler
        </button>
      </form>
    </div>
  );
}
