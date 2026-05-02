'use client';

import { useTransition } from 'react';
import { toggleProjectVisibility } from '@/actions/projects';

export default function ToggleVisibilityButton({ id, visible }: { id: number; visible: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => toggleProjectVisibility(id))}
      title={visible ? 'Masquer du site' : 'Afficher sur le site'}
      style={{
        padding: '6px 12px',
        fontSize: '12px',
        fontWeight: 600,
        border: '1px solid',
        borderRadius: '4px',
        cursor: isPending ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s',
        backgroundColor: visible ? 'rgba(30,107,74,0.08)' : 'rgba(100,100,100,0.08)',
        color: visible ? 'var(--green-dark)' : 'var(--gray-400)',
        borderColor: visible ? 'var(--green-dark)' : 'var(--gray-300)',
        opacity: isPending ? 0.5 : 1,
      }}
    >
      {visible ? '● Visible' : '○ Masqué'}
    </button>
  );
}
