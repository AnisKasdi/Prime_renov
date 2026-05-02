'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { createSlot } from '@/actions/agenda';

const inp = { padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px', width: '100%', fontFamily: 'inherit', fontSize: '13px' } as const;
const lbl = { fontSize: '12px', fontWeight: 600, color: 'var(--gray-600)', display: 'block', marginBottom: '4px' } as const;
const fld = { display: 'flex', flexDirection: 'column' as const };

export default function AddSlotForm() {
  const [state, formAction, isPending] = useActionState(createSlot, null);
  const formRef = useRef<HTMLFormElement>(null);
  const datetimeRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state?.success]);

  // Build ISO timestamp from local date+time before submit
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (date && time && datetimeRef.current) {
      datetimeRef.current.value = new Date(`${date}T${time}:00`).toISOString();
    }
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
      <h2 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: 'var(--gray-900)' }}>Nouveau créneau</h2>

      {state?.success && (
        <div style={{ marginBottom: '14px', padding: '10px 14px', backgroundColor: '#f0fdf4', border: '1px solid #86efac', borderRadius: '6px', color: '#166534', fontSize: '13px' }}>
          Créneau créé.
        </div>
      )}
      {state?.error && (
        <div style={{ marginBottom: '14px', padding: '10px 14px', backgroundColor: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '6px', color: '#991b1b', fontSize: '13px' }}>
          {state.error}
        </div>
      )}

      <form ref={formRef} action={formAction} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <input ref={datetimeRef} type="hidden" name="datetime" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={fld}>
            <label style={lbl}>Date</label>
            <input type="date" min={today} required style={inp} value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div style={fld}>
            <label style={lbl}>Heure</label>
            <input type="time" required style={inp} value={time} onChange={e => setTime(e.target.value)} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={fld}>
            <label style={lbl}>Durée (min)</label>
            <select name="duration" style={inp}>
              <option value="15">15 min</option>
              <option value="30" defaultValue="30">30 min</option>
              <option value="45">45 min</option>
              <option value="60">1 heure</option>
            </select>
          </div>
          <div style={fld}>
            <label style={lbl}>Plateforme</label>
            <select name="meetType" style={inp}>
              <option value="teams">Microsoft Teams</option>
              <option value="meet">Google Meet</option>
              <option value="phone">Appel téléphonique</option>
            </select>
          </div>
        </div>

        <div style={fld}>
          <label style={lbl}>Lien réunion (optionnel)</label>
          <input type="url" name="meetUrl" placeholder="https://teams.microsoft.com/..." style={inp} />
          <span style={{ fontSize: '11px', color: 'var(--gray-400)', marginTop: '3px' }}>Si vide, le lien sera envoyé manuellement au client.</span>
        </div>

        <button
          type="submit"
          disabled={isPending || !date || !time}
          style={{
            backgroundColor: (!date || !time || isPending) ? 'var(--gray-400)' : 'var(--blue-dark)',
            color: 'white', border: 'none', padding: '11px', borderRadius: '4px',
            cursor: (!date || !time || isPending) ? 'not-allowed' : 'pointer',
            fontWeight: 700, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase',
          }}
        >
          {isPending ? 'Création...' : '+ Créer le créneau'}
        </button>
      </form>
    </div>
  );
}
