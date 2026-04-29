import { prisma } from '@/lib/prisma';
import { deleteTestimonial } from '@/actions/testimonials';
import DeleteButton from '@/components/DeleteButton';
import AddTestimonialForm from '@/components/admin/AddTestimonialForm';

export const revalidate = 0;

export default async function AdminTestimonials() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { id: 'desc' } });

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>Gestion des Avis Clients</h1>
      
      <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: '1fr 1fr' }}>
        {/* Liste des avis */}
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Avis Existants</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {testimonials.map((t) => (
              <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
                <div style={{ flex: 1, marginRight: '16px' }}>
                  <h3 style={{ fontWeight: 600 }}>{t.name} <span style={{ color: 'gold' }}>{Array(t.rating).fill('★').join('')}</span></h3>
                  <span style={{ fontSize: '13px', color: 'var(--gray-600)' }}>{t.role}</span>
                  <p style={{ fontSize: '14px', marginTop: '8px' }}>"{t.text}"</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                  <a href={`/admin/testimonials/${t.id}/edit`} style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 600, color: 'var(--blue-dark)', border: '1px solid var(--blue-dark)', borderRadius: '4px', textDecoration: 'none' }}>
                    Modifier
                  </a>
                  <DeleteButton id={t.id} deleteAction={deleteTestimonial} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire d'ajout */}
        <AddTestimonialForm />
      </div>
    </div>
  );
}
