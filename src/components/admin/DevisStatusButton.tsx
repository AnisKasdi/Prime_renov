'use client';

import { useTransition } from 'react';
import { updateDevisStatus } from '@/actions/demandes';

const STATUSES = ['Nouveau', 'Traité', 'Archivé'];

const statusStyle: Record<string, { bg: string; color: string; border: string }> = {
  Nouveau:  { bg: 'rgba(30,77,140,0.08)',  color: 'var(--blue-dark)',  border: 'var(--blue-dark)' },
  Traité:   { bg: 'rgba(30,107,74,0.08)', color: 'var(--green-dark)', border: 'var(--green-dark)' },
  Archivé:  { bg: 'rgba(100,100,100,0.08)', color: 'var(--gray-400)', border: 'var(--gray-300)' },
};

export default function DevisStatusButton({ id, status }: { id: number; status: string }) {
  const [isPending, startTransition] = useTransition();
  const next = STATUSES[(STATUSES.indexOf(status) + 1) % STATUSES.length];
  const s = statusStyle[status] ?? statusStyle['Nouveau'];

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() => startTransition(() => updateDevisStatus(id, next))}
      title={`Passer à : ${next}`}
      style={{
        padding: '4px 12px',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        border: `1px solid ${s.border}`,
        borderRadius: '3px',
        cursor: isPending ? 'not-allowed' : 'pointer',
        backgroundColor: s.bg,
        color: s.color,
        opacity: isPending ? 0.5 : 1,
        transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {status}
    </button>
  );
}
