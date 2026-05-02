import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 0;

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
}

export default async function AdminDashboard() {
  const [projectCount, testimonialCount, demandeCount, newDemandeCount, recentProjects, recentDemandes] = await Promise.all([
    prisma.project.count(),
    prisma.testimonial.count(),
    prisma.devisRequest.count(),
    prisma.devisRequest.count({ where: { status: 'Nouveau' } }),
    prisma.project.findMany({ orderBy: { id: 'desc' }, take: 4 }),
    prisma.devisRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 4 }),
  ]);

  const stats = [
    { label: 'Projets', value: projectCount, href: '/admin/projects', color: 'var(--blue-dark)' },
    { label: 'Témoignages', value: testimonialCount, href: '/admin/testimonials', color: 'var(--green-dark)' },
    { label: 'Demandes', value: demandeCount, badge: newDemandeCount, href: '/admin/demandes', color: '#7c3aed' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, color: 'var(--gray-900)', marginBottom: '6px' }}>
          Tableau de <strong style={{ fontWeight: 700 }}>bord</strong>
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--gray-400)', letterSpacing: '0.02em' }}>
          Vue d'ensemble du contenu
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '48px', maxWidth: '800px' }}>
        {stats.map(({ label, value, badge, href, color }) => (
          <Link key={href} href={href} style={{ textDecoration: 'none' }}>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid var(--gray-200)',
              padding: '32px',
              borderRadius: '8px',
              borderTop: `3px solid ${color}`,
              transition: 'box-shadow 0.2s',
              cursor: 'pointer',
              position: 'relative',
            }}>
              {badge != null && badge > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  backgroundColor: color,
                  color: 'white',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '10px',
                }}>
                  {badge} nouveau{badge > 1 ? 'x' : ''}
                </span>
              )}
              <span style={{ fontSize: '48px', fontWeight: 800, color, lineHeight: 1, display: 'block', marginBottom: '8px' }}>
                {value}
              </span>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
                {label}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '48px' }}>
        {/* Recent projects */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--gray-900)' }}>Derniers projets</h2>
            <Link href="/admin/projects" style={{ fontSize: '12px', color: 'var(--green-dark)', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.06em' }}>
              Voir tout →
            </Link>
          </div>

          {recentProjects.length === 0 ? (
            <div style={{ backgroundColor: 'white', border: '1px solid var(--gray-200)', borderRadius: '8px', padding: '32px', textAlign: 'center', color: 'var(--gray-400)', fontSize: '14px' }}>
              Aucun projet pour l'instant
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {recentProjects.map((p) => (
                <div key={p.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  border: '1px solid var(--gray-200)',
                  borderRadius: '6px',
                  padding: '14px 18px',
                  opacity: p.visible ? 1 : 0.55,
                }}>
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gray-900)', display: 'block' }}>{p.name}</span>
                    <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>{p.cat} — {p.year}</span>
                  </div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: p.visible ? (p.status === 'Livré' ? 'var(--green-dark)' : 'var(--blue-mid)') : 'var(--gray-400)',
                    backgroundColor: p.visible ? (p.status === 'Livré' ? 'rgba(30,107,74,0.08)' : 'rgba(30,77,140,0.08)') : 'rgba(0,0,0,0.04)',
                    padding: '3px 8px',
                    borderRadius: '3px',
                  }}>
                    {p.visible ? p.status : 'Masqué'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent demandes */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--gray-900)' }}>Dernières demandes</h2>
            <Link href="/admin/demandes" style={{ fontSize: '12px', color: 'var(--green-dark)', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.06em' }}>
              Voir tout →
            </Link>
          </div>

          {recentDemandes.length === 0 ? (
            <div style={{ backgroundColor: 'white', border: '1px solid var(--gray-200)', borderRadius: '8px', padding: '32px', textAlign: 'center', color: 'var(--gray-400)', fontSize: '14px' }}>
              Aucune demande pour l'instant
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {recentDemandes.map((d) => (
                <div key={d.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  border: `1px solid ${d.status === 'Nouveau' ? 'rgba(30,77,140,0.2)' : 'var(--gray-200)'}`,
                  borderLeft: `3px solid ${d.status === 'Nouveau' ? 'var(--blue-dark)' : d.status === 'Traité' ? 'var(--green-dark)' : 'var(--gray-300)'}`,
                  borderRadius: '6px',
                  padding: '14px 18px',
                }}>
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gray-900)', display: 'block' }}>{d.nom}</span>
                    <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>{d.email} — {formatDate(d.createdAt)}</span>
                  </div>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: d.status === 'Nouveau' ? 'var(--blue-dark)' : d.status === 'Traité' ? 'var(--green-dark)' : 'var(--gray-400)',
                    backgroundColor: d.status === 'Nouveau' ? 'rgba(30,77,140,0.08)' : d.status === 'Traité' ? 'rgba(30,107,74,0.08)' : 'rgba(0,0,0,0.04)',
                    padding: '3px 8px',
                    borderRadius: '3px',
                  }}>
                    {d.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ paddingTop: '40px', borderTop: '1px solid var(--gray-200)' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px' }}>
          Actions rapides
        </h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/admin/projects" style={{
            display: 'inline-block', padding: '12px 24px', backgroundColor: 'var(--blue-dark)', color: 'white',
            textDecoration: 'none', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '4px',
          }}>
            + Ajouter un projet
          </Link>
          <Link href="/admin/testimonials" style={{
            display: 'inline-block', padding: '12px 24px', backgroundColor: 'var(--green-dark)', color: 'white',
            textDecoration: 'none', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '4px',
          }}>
            + Ajouter un avis
          </Link>
          <Link href="/admin/demandes" style={{
            display: 'inline-block', padding: '12px 24px', backgroundColor: '#7c3aed', color: 'white',
            textDecoration: 'none', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '4px',
          }}>
            Voir les demandes{newDemandeCount > 0 ? ` (${newDemandeCount})` : ''}
          </Link>
          <Link href="/" target="_blank" style={{
            display: 'inline-block', padding: '12px 24px', backgroundColor: 'white', color: 'var(--gray-600)',
            border: '1px solid var(--gray-200)', textDecoration: 'none', fontSize: '12px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '4px',
          }}>
            Voir le site ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
