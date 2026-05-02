import { prisma } from '@/lib/prisma';
import { deleteSlot } from '@/actions/agenda';
import DeleteButton from '@/components/DeleteButton';
import AddSlotForm from '@/components/admin/AddSlotForm';

export const revalidate = 0;

const PLATFORM: Record<string, string> = { teams: 'Teams', meet: 'Meet', phone: 'Téléphone' };
const PLATFORM_COLOR: Record<string, string> = {
  teams: 'rgba(0,120,212,0.1)',
  meet:  'rgba(52,168,83,0.1)',
  phone: 'rgba(100,100,100,0.08)',
};
const PLATFORM_TEXT: Record<string, string> = {
  teams: '#0078d4',
  meet:  '#34a853',
  phone: 'var(--gray-500)',
};

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Europe/Paris' }).format(d);
}
function fmtTime(d: Date) {
  return new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' }).format(d);
}
function fmtDay(d: Date) {
  return new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}

export default async function AdminAgenda() {
  const slots = await prisma.timeSlot.findMany({
    where: { date: { gte: new Date() } },
    orderBy: { date: 'asc' },
    include: { booking: true },
  });

  const past = await prisma.timeSlot.count({ where: { date: { lt: new Date() } } });

  // Group by date string
  const grouped = slots.reduce((acc, s) => {
    const key = fmtDay(s.date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(s);
    return acc;
  }, {} as Record<string, typeof slots>);

  const bookedCount = slots.filter(s => s.isBooked).length;
  const freeCount = slots.filter(s => !s.isBooked).length;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 300, color: 'var(--gray-900)', marginBottom: '6px' }}>
          Agenda & <strong style={{ fontWeight: 700 }}>Rendez-vous</strong>
        </h1>
        <div style={{ display: 'flex', gap: '20px', fontSize: '13px', color: 'var(--gray-400)' }}>
          <span>{freeCount} créneau{freeCount > 1 ? 'x' : ''} disponible{freeCount > 1 ? 's' : ''}</span>
          <span style={{ color: 'var(--green-dark)', fontWeight: 600 }}>{bookedCount} réservé{bookedCount > 1 ? 's' : ''}</span>
          {past > 0 && <span>{past} passé{past > 1 ? 's' : ''}</span>}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '32px', alignItems: 'start' }}>
        {/* Left: slot list */}
        <div>
          {Object.keys(grouped).length === 0 ? (
            <div style={{ backgroundColor: 'white', border: '1px solid var(--gray-200)', borderRadius: '8px', padding: '48px', textAlign: 'center', color: 'var(--gray-400)', fontSize: '14px' }}>
              Aucun créneau à venir. Créez-en un depuis le formulaire.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {Object.entries(grouped).map(([day, daySlots]) => (
                <div key={day}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '10px' }}>
                    {fmtDate(daySlots[0].date)}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {daySlots.map(slot => (
                      <div key={slot.id} style={{
                        backgroundColor: 'white',
                        border: `1px solid ${slot.isBooked ? 'rgba(30,107,74,0.2)' : 'var(--gray-200)'}`,
                        borderLeft: `3px solid ${slot.isBooked ? 'var(--green-dark)' : 'var(--gray-300)'}`,
                        borderRadius: '6px',
                        padding: '16px 20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '16px',
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: slot.booking ? '10px' : 0 }}>
                            <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--gray-900)' }}>
                              {fmtTime(slot.date)}
                            </span>
                            <span style={{ fontSize: '11px', color: 'var(--gray-400)' }}>{slot.duration} min</span>
                            <span style={{
                              fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '3px',
                              backgroundColor: PLATFORM_COLOR[slot.meetType] ?? 'rgba(0,0,0,0.05)',
                              color: PLATFORM_TEXT[slot.meetType] ?? 'var(--gray-500)',
                            }}>
                              {PLATFORM[slot.meetType] ?? slot.meetType}
                            </span>
                            {slot.meetUrl && (
                              <a href={slot.meetUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'var(--green-dark)', textDecoration: 'none' }}>
                                ↗ Lien
                              </a>
                            )}
                            {slot.isBooked ? (
                              <span style={{ fontSize: '10px', fontWeight: 700, backgroundColor: 'rgba(30,107,74,0.1)', color: 'var(--green-dark)', padding: '2px 8px', borderRadius: '3px' }}>
                                Réservé
                              </span>
                            ) : (
                              <span style={{ fontSize: '10px', color: 'var(--gray-400)' }}>Libre</span>
                            )}
                          </div>

                          {slot.booking && (
                            <div style={{ paddingTop: '10px', borderTop: '1px solid var(--gray-200)', display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                              <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--gray-900)' }}>{slot.booking.nom}</span>
                              <a href={`mailto:${slot.booking.email}`} style={{ fontSize: '13px', color: 'var(--blue-dark)', textDecoration: 'none' }}>{slot.booking.email}</a>
                              {slot.booking.tel && <span style={{ fontSize: '13px', color: 'var(--gray-500)' }}>{slot.booking.tel}</span>}
                              {slot.booking.sujet && (
                                <span style={{ fontSize: '12px', color: 'var(--gray-400)', fontStyle: 'italic' }}>"{slot.booking.sujet}"</span>
                              )}
                            </div>
                          )}
                        </div>

                        <DeleteButton id={slot.id} deleteAction={deleteSlot} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: create form */}
        <div style={{ position: 'sticky', top: '32px' }}>
          <AddSlotForm />
        </div>
      </div>
    </div>
  );
}
