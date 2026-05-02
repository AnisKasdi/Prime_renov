import { prisma } from '@/lib/prisma';
import { deleteProject } from '@/actions/projects';
import DeleteButton from '@/components/DeleteButton';
import AddProjectForm from '@/components/admin/AddProjectForm';
import ToggleVisibilityButton from '@/components/admin/ToggleVisibilityButton';

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
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', backgroundColor: 'white', borderRadius: '8px', border: `1px solid ${p.visible ? 'var(--gray-200)' : 'var(--gray-300)'}`, opacity: p.visible ? 1 : 0.65 }}>
                <div>
                  <h3 style={{ fontWeight: 600 }}>{p.name}</h3>
                  <span style={{ fontSize: '13px', color: 'var(--gray-600)' }}>{p.cat} - {p.year}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <ToggleVisibilityButton id={p.id} visible={p.visible} />
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
        <AddProjectForm />
      </div>
    </div>
  );
}
