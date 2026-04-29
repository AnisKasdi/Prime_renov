'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/actions/auth';

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Tableau de bord', exact: true },
    { href: '/admin/projects', label: 'Gestion des Projets', exact: false },
    { href: '/admin/testimonials', label: 'Gestion des Avis', exact: false },
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--blue-deep)',
      color: 'white',
      padding: '32px 0',
      display: 'flex',
      flexDirection: 'column',
      flexShrink: 0,
    }}>
      <div style={{ padding: '0 32px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '32px', height: '32px', border: '1px solid var(--green-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--green-mid)' }}>
            P-R
          </div>
          <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em' }}>Admin Panel</span>
        </div>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 16px' }}>
        {links.map(({ href, label, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                padding: '12px 16px',
                color: isActive ? 'white' : 'rgba(255,255,255,0.55)',
                textDecoration: 'none',
                fontSize: '14px',
                borderRadius: '4px',
                backgroundColor: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--green-mid)' : '2px solid transparent',
                transition: 'all 0.2s',
                display: 'block',
              }}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: '0 32px' }}>
        <form action={logout}>
          <button type="submit" style={{
            background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            Se déconnecter
          </button>
        </form>
      </div>
    </aside>
  );
}
