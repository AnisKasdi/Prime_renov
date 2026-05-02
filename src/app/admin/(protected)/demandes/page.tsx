import { prisma } from '@/lib/prisma';
import { deleteDevisRequest } from '@/actions/demandes';
import DeleteButton from '@/components/DeleteButton';
import DevisStatusButton from '@/components/admin/DevisStatusButton';

export const revalidate = 0;

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
}

export default async function AdminDemandes() {
  const demandes = await prisma.devisRequest.findMany({ orderBy: { createdAt: 'desc' } });

  const total = demandes.length;
  const nouveau = demandes.filter(d => d.status === 'Nouveau').length;

  return (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 300, color: 'var(--gray-900)', marginBottom: '6px' }}>
          Demandes & <strong style={{ fontWeight: 700 }}>Devis</strong>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--gray-400)' }}>
          {total} demande{total > 1 ? 's' : ''} au total
          {nouveau > 0 && <span style={{ marginLeft: '8px', backgroundColor: 'var(--blue-dark)', color: 'white', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '10px' }}>{nouveau} nouveau{nouveau > 1 ? 'x' : ''}</span>}
        </p>
      </div>

      {demandes.length === 0 ? (
        <div style={{ backgroundColor: 'white', border: '1px solid var(--gray-200)', borderRadius: '8px', padding: '48px', textAlign: 'center', color: 'var(--gray-400)', fontSize: '14px' }}>
          Aucune demande reçue pour l'instant
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {demandes.map((d) => (
            <div key={d.id} style={{
              backgroundColor: 'white',
              border: `1px solid ${d.status === 'Nouveau' ? 'rgba(30,77,140,0.25)' : 'var(--gray-200)'}`,
              borderLeft: `3px solid ${d.status === 'Nouveau' ? 'var(--blue-dark)' : d.status === 'Traité' ? 'var(--green-dark)' : 'var(--gray-300)'}`,
              borderRadius: '6px',
              padding: '20px 24px',
              opacity: d.status === 'Archivé' ? 0.6 : 1,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
                {/* Info principale */}
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--gray-900)' }}>{d.nom}</span>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: '2px',
                      backgroundColor: d.source === 'devis' ? 'rgba(30,107,74,0.1)' : 'rgba(100,100,100,0.08)',
                      color: d.source === 'devis' ? 'var(--green-dark)' : 'var(--gray-500)',
                    }}>
                      {d.source === 'devis' ? 'Devis' : 'Contact'}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: 'var(--gray-500)', marginBottom: '10px' }}>
                    <a href={`mailto:${d.email}`} style={{ color: 'var(--blue-dark)', textDecoration: 'none' }}>{d.email}</a>
                    {d.tel && <span style={{ marginLeft: '12px' }}>{d.tel}</span>}
                    <span style={{ marginLeft: '12px', color: 'var(--gray-400)' }}>{formatDate(d.createdAt)}</span>
                  </div>

                  {/* Détails devis */}
                  {d.source === 'devis' && (d.type || d.surface || d.lieu || d.budget || d.delai) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                      {d.type && <span style={tagStyle}>{d.type}</span>}
                      {d.surface && <span style={tagStyle}>Surface : {d.surface}</span>}
                      {d.lieu && <span style={tagStyle}>{d.lieu}</span>}
                      {d.budget && <span style={tagStyle}>Budget : {d.budget}</span>}
                      {d.delai && <span style={tagStyle}>Délai : {d.delai}</span>}
                    </div>
                  )}

                  {/* Message */}
                  {(d.msg || d.desc) && (
                    <p style={{ fontSize: '13px', color: 'var(--gray-600)', margin: 0, fontStyle: 'italic', borderLeft: '2px solid var(--gray-200)', paddingLeft: '10px' }}>
                      "{d.msg || d.desc}"
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end', flexShrink: 0 }}>
                  <DevisStatusButton id={d.id} status={d.status} />
                  <DeleteButton id={d.id} deleteAction={deleteDevisRequest} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const tagStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 600,
  padding: '3px 8px',
  backgroundColor: 'var(--gray-50)',
  border: '1px solid var(--gray-200)',
  borderRadius: '3px',
  color: 'var(--gray-600)',
};
