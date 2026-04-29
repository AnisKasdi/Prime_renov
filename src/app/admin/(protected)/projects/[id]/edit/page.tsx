import { prisma } from '@/lib/prisma';
import { updateProject } from '@/actions/projects';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id: parseInt(id) } });

  if (!project) notFound();

  const action = updateProject.bind(null, project.id);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <a href="/admin/projects" style={{ color: 'var(--gray-600)', textDecoration: 'none', fontSize: '13px' }}>
          ← Retour aux projets
        </a>
        <h1 style={{ fontSize: '24px', fontWeight: 600 }}>Modifier le projet</h1>
      </div>

      <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', border: '1px solid var(--gray-200)', maxWidth: '700px' }}>
        <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600 }}>Nom du projet</label>
            <input name="name" required defaultValue={project.name} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Catégorie</label>
              <input name="cat" required defaultValue={project.cat} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Filtre (slug)</label>
              <input name="catFilter" required defaultValue={project.catFilter} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Année</label>
              <input name="year" required defaultValue={project.year} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Nouvelle image (optionnel)</label>
              <input type="file" name="imageFile" accept="image/*" style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
              <span style={{ fontSize: '12px', color: 'var(--gray-400)' }}>Laisser vide pour conserver l'image actuelle</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600 }}>Description</label>
            <textarea name="desc" required rows={4} defaultValue={project.desc} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px', resize: 'vertical' }}></textarea>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Client</label>
              <input name="client" required defaultValue={project.client} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Surface</label>
              <input name="surface" required defaultValue={project.surface} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Lieu</label>
              <input name="location" required defaultValue={project.location} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600 }}>Statut</label>
              <input name="status" required defaultValue={project.status} style={{ padding: '8px', border: '1px solid var(--gray-200)', borderRadius: '4px' }} />
            </div>
          </div>
          <button type="submit" style={{ backgroundColor: 'var(--green-mid)', color: 'white', border: 'none', padding: '12px', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, marginTop: '8px' }}>
            Enregistrer les modifications
          </button>
        </form>
      </div>
    </div>
  );
}
