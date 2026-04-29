import { prisma } from '@/lib/prisma';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminDashboard() {
  const [projectCount, testimonialCount, recentProjects] = await Promise.all([
    prisma.project.count(),
    prisma.testimonial.count(),
    prisma.project.findMany({ orderBy: { id: 'desc' }, take: 4 }),
  ]);

  const stats = [
    { label: 'Projets', value: projectCount, href: '/admin/projects', color: 'var(--blue-dark)' },
    { label: 'Témoignages', value: testimonialCount, href: '/admin/testimonials', color: 'var(--green-dark)' },
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '48px', maxWidth: '600px' }}>
        {stats.map(({ label, value, href, color }) => (
          <Link key={href} href={href} style={{ textDecoration: 'none' }}>
            <div style={{
              backgroundColor: 'white',
              border: '1px solid var(--gray-200)',
              padding: '32px',
              borderRadius: '8px',
              borderTop: `3px solid ${color}`,
              transition: 'box-shadow 0.2s',
              cursor: 'pointer',
            }}>
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

      {/* Recent projects */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--gray-900)' }}>Derniers projets</h2>
          <Link href="/admin/projects" style={{ fontSize: '12px', color: 'var(--green-dark)', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.06em' }}>
            Voir tout →
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div style={{ backgroundColor: 'white', border: '1px solid var(--gray-200)', borderRadius: '8px', padding: '48px', textAlign: 'center', color: 'var(--gray-400)', fontSize: '14px' }}>
            Aucun projet pour l'instant
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentProjects.map((p) => (
              <div key={p.id} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                border: '1px solid var(--gray-200)',
                borderRadius: '6px',
                padding: '16px 20px',
              }}>
                <div>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--gray-900)', display: 'block' }}>{p.name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>{p.cat} — {p.year}</span>
                </div>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: p.status === 'Livré' ? 'var(--green-dark)' : 'var(--blue-mid)',
                  backgroundColor: p.status === 'Livré' ? 'rgba(30,107,74,0.08)' : 'rgba(30,77,140,0.08)',
                  padding: '4px 10px',
                  borderRadius: '3px',
                }}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div style={{ marginTop: '48px', paddingTop: '40px', borderTop: '1px solid var(--gray-200)' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: '16px' }}>
          Actions rapides
        </h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Link href="/admin/projects" style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: 'var(--blue-dark)',
            color: 'white',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: '4px',
          }}>
            + Ajouter un projet
          </Link>
          <Link href="/admin/testimonials" style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: 'var(--green-dark)',
            color: 'white',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: '4px',
          }}>
            + Ajouter un avis
          </Link>
          <Link href="/" target="_blank" style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: 'white',
            color: 'var(--gray-600)',
            border: '1px solid var(--gray-200)',
            textDecoration: 'none',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            borderRadius: '4px',
          }}>
            Voir le site ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
