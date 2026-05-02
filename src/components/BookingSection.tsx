'use client';

import { useState, useTransition } from 'react';
import { bookSlot } from '@/actions/agenda';

export type SlotData = {
  id: number;
  date: string; // ISO string
  duration: number;
  meetType: string;
  meetUrl: string;
};

const DAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const MONTHS = ['jan', 'fév', 'mar', 'avr', 'mai', 'juin', 'juil', 'août', 'sep', 'oct', 'nov', 'déc'];
const PLATFORM: Record<string, string> = { teams: 'Microsoft Teams', meet: 'Google Meet', phone: 'Appel téléphonique' };

function groupByDay(slots: SlotData[]) {
  const map = new Map<string, SlotData[]>();
  for (const slot of slots) {
    const d = new Date(slot.date);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(slot);
  }
  return map;
}

function formatTime(iso: string) {
  return new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' }).format(new Date(iso));
}

export default function BookingSection({ slots }: { slots: SlotData[] }) {
  const grouped = groupByDay(slots);
  const days = Array.from(grouped.keys());

  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SlotData | null>(null);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  const slotsForDay = selectedDay ? (grouped.get(selectedDay) ?? []) : [];

  function selectDay(key: string) {
    setSelectedDay(key);
    setSelectedSlot(null);
    setError('');
  }

  function selectSlot(slot: SlotData) {
    setSelectedSlot(slot);
    setError('');
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedSlot) return;
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await bookSlot(selectedSlot.id, null, fd);
      if (res.success) setDone(true);
      else setError(res.error ?? 'Une erreur est survenue.');
    });
  }

  if (done && selectedSlot) {
    const d = new Date(selectedSlot.date);
    const dateStr = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' }).format(d);
    const timeStr = formatTime(selectedSlot.date);
    return (
      <section className="section booking" id="rendez-vous">
        <div className="booking-success">
          <div className="booking-success-icon">✓</div>
          <h2 className="booking-success-title">Rendez-vous confirmé !</h2>
          <p className="booking-success-date">{dateStr} à {timeStr}</p>
          <p className="booking-success-sub">Un email de confirmation vous a été envoyé avec tous les détails.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section booking" id="rendez-vous">
      <div className="section-header reveal">
        <h2 className="section-title">
          Prenez <strong>Rendez-vous</strong>
        </h2>
      </div>

      <div className="booking-layout reveal reveal-d1">
        {/* Left: info */}
        <div className="booking-info">
          <p className="booking-intro">
            Échangez directement avec nos architectes pour discuter de votre projet de rénovation, obtenir des conseils personnalisés et définir ensemble les grandes lignes de votre futur espace.
          </p>
          <div className="booking-features">
            <div className="booking-feature">
              <span className="bf-line" />
              <span>Consultation sans engagement</span>
            </div>
            <div className="booking-feature">
              <span className="bf-line" />
              <span>30 à 60 minutes selon vos besoins</span>
            </div>
            <div className="booking-feature">
              <span className="bf-line" />
              <span>Teams, Google Meet ou appel</span>
            </div>
            <div className="booking-feature">
              <span className="bf-line" />
              <span>Confirmation immédiate par email</span>
            </div>
          </div>
        </div>

        {/* Right: widget */}
        <div className="booking-widget">
          {slots.length === 0 ? (
            <div className="booking-empty">
              Aucun créneau disponible pour le moment.<br />Revenez bientôt ou <a href="#contact">contactez-nous</a>.
            </div>
          ) : (
            <>
              {/* Step 1: Date */}
              <div className="booking-step">
                <span className="booking-step-label">01 — Choisissez une date</span>
                <div className="booking-dates">
                  {days.map(key => {
                    const firstSlot = grouped.get(key)![0];
                    const d = new Date(firstSlot.date);
                    const isSelected = selectedDay === key;
                    const count = grouped.get(key)!.length;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => selectDay(key)}
                        className={`booking-date-pill${isSelected ? ' selected' : ''}`}
                      >
                        <span className="bdp-day">{DAYS[d.getDay()]}</span>
                        <span className="bdp-num">{d.getDate()}</span>
                        <span className="bdp-month">{MONTHS[d.getMonth()]}</span>
                        {count > 1 && <span className="bdp-count">{count}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Time */}
              {selectedDay && (
                <div className="booking-step">
                  <span className="booking-step-label">02 — Choisissez un créneau</span>
                  <div className="booking-times">
                    {slotsForDay.map(slot => {
                      const isSelected = selectedSlot?.id === slot.id;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => selectSlot(slot)}
                          className={`booking-time-pill${isSelected ? ' selected' : ''}`}
                        >
                          <span className="btp-time">{formatTime(slot.date)}</span>
                          <span className="btp-dur">{slot.duration} min · {PLATFORM[slot.meetType] ?? slot.meetType}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Form */}
              {selectedSlot && (
                <div className="booking-step">
                  <span className="booking-step-label">03 — Vos coordonnées</span>
                  <form onSubmit={handleSubmit} className="booking-form">
                    <div className="booking-form-row">
                      <div className="booking-field">
                        <label>Nom complet *</label>
                        <input name="nom" required placeholder="Jean Dupont" />
                      </div>
                      <div className="booking-field">
                        <label>Email *</label>
                        <input name="email" type="email" required placeholder="jean@exemple.fr" />
                      </div>
                    </div>
                    <div className="booking-form-row">
                      <div className="booking-field">
                        <label>Téléphone</label>
                        <input name="tel" type="tel" placeholder="06 12 34 56 78" />
                      </div>
                      <div className="booking-field">
                        <label>Sujet</label>
                        <input name="sujet" placeholder="Rénovation cuisine, extension…" />
                      </div>
                    </div>
                    {error && <p className="booking-error">{error}</p>}
                    <button type="submit" disabled={isPending} className="booking-submit">
                      {isPending ? 'Réservation en cours…' : 'Confirmer le rendez-vous'}
                      {!isPending && <span className="arrow" />}
                    </button>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
