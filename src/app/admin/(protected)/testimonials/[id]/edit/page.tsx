import { prisma } from '@/lib/prisma';
import { updateTestimonial } from '@/actions/testimonials';
import { notFound } from 'next/navigation';

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await prisma.testimonial.findUnique({ where: { id: parseInt(id) } });

  if (!t) notFound();

  const action = updateTestimonial.bind(null, t.id);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <a href="/admin/testimonials" style={{ color: 'var(--gray-600)', textDecoration: 'none', fontSize: '13px' }}>
          ← Retour aux avis
        </a>
        <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Modifier l'avis</h1>
      </div>

      <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', border: '1px solid var(--gray-200)', maxWidth: '600px' }}>
        <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Nom du client</label>
              <input name="name" required defaultValue={t.name} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Initiales (Avatar)</label>
              <input name="avatar" required maxLength={2} defaultValue={t.avatar} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600 }}>Rôle / Projet</label>
            <input name="role" required defaultValue={t.role} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600 }}>Note (1 à 5)</label>
            <input name="rating" type="number" min="1" max="5" defaultValue={t.rating} required style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600 }}>Témoignage</label>
            <textarea name="text" required rows={4} defaultValue={t.text} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px', resize: 'vertical' }}></textarea>
          </div>
          <button type="submit" style={{ backgroundColor: 'var(--green-mid)', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, marginTop: '8px' }}>
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  );
}
