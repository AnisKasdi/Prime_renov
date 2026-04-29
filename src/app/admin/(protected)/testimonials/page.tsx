import { prisma } from '@/lib/prisma';
import { addTestimonial, deleteTestimonial } from '@/actions/testimonials';
import DeleteButton from '@/components/DeleteButton';

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
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Ajouter un Avis</h2>
          <form action={addTestimonial} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Nom du client</label>
                <input name="name" required style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Initiales (Avatar)</label>
                <input name="avatar" required maxLength={2} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} placeholder="ex: ML" />
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Rôle / Projet</label>
              <input name="role" required style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} placeholder="ex: Projet résidentiel — Paris" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Note (1 à 5)</label>
              <input name="rating" type="number" min="1" max="5" defaultValue="5" required style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Témoignage</label>
              <textarea name="text" required rows={4} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px', resize: 'vertical' }}></textarea>
            </div>

            <button type="submit" style={{ backgroundColor: 'var(--blue-dark)', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, marginTop: '16px' }}>
              Ajouter l'avis
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
