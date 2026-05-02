import AdminSidebar from '@/components/AdminSidebar';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const newDemandes = await prisma.devisRequest.count({ where: { status: 'Nouveau' } });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--gray-50)', fontFamily: 'var(--font-plus-jakarta-sans)' }}>
      <AdminSidebar newDemandes={newDemandes} />
      <main style={{ flex: 1, padding: '48px', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}
