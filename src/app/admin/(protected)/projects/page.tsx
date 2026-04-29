import { prisma } from '@/lib/prisma';
import { addProject, deleteProject } from '@/actions/projects';
import DeleteButton from '@/components/DeleteButton';

export const revalidate = 0;

export default async function AdminProjects() {
  const projects = await prisma.project.findMany({ orderBy: { id: 'desc' } });

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>Gestion des Projets</h1>
      
      <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: '1fr 1fr' }}>
        {/* Liste des projets */}
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Projets Existants</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {projects.map((p) => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
                <div>
                  <h3 style={{ fontWeight: 600 }}>{p.name}</h3>
                  <span style={{ fontSize: '13px', color: 'var(--gray-600)' }}>{p.cat} - {p.year}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <a href={`/admin/projects/${p.id}/edit`} style={{ padding: '6px 12px', fontSize: '12px', fontWeight: 600, color: 'var(--blue-dark)', border: '1px solid var(--blue-dark)', borderRadius: '4px', textDecoration: 'none' }}>
                    Modifier
                  </a>
                  <DeleteButton id={p.id} deleteAction={deleteProject} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formulaire d'ajout */}
        <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '8px', border: '1px solid var(--gray-200)' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Ajouter un Projet</h2>
          <form action={addProject} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Nom du projet</label>
              <input name="name" required style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Catégorie</label>
                <input name="cat" required style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} placeholder="ex: Résidentiel" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Filtre (minuscule)</label>
                <input name="catFilter" required style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} placeholder="ex: residentiel" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Année</label>
                <input name="year" required style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Image (Upload)</label>
                <input type="file" name="imageFile" accept="image/*" required style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Description</label>
              <textarea name="desc" required rows={4} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px', resize: 'vertical' }}></textarea>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Client</label>
                <input name="client" required style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Surface</label>
                <input name="surface" required style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Lieu</label>
                <input name="location" required style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600 }}>Statut</label>
                <input name="status" required style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} placeholder="ex: Livré" />
              </div>
            </div>

            <button type="submit" style={{ backgroundColor: 'var(--blue-dark)', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, marginTop: '16px' }}>
              Ajouter le projet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
