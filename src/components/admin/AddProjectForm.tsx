"use client";

import { useActionState, useEffect, useRef } from "react";
import { addProject } from "@/actions/projects";

const input = { padding: "8px", border: "1px solid var(--gray-200)", borderRadius: "4px" } as const;
const label = { fontSize: "13px", fontWeight: 600 } as const;
const field = { display: "flex", flexDirection: "column", gap: "4px" } as const;

export default function AddProjectForm() {
  const [state, formAction, isPending] = useActionState(addProject, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state?.success]);

  return (
    <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "8px", border: "1px solid var(--gray-200)" }}>
      <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>Ajouter un Projet</h2>

      {state?.success && (
        <div style={{ marginBottom: "16px", padding: "12px 16px", backgroundColor: "#f0fdf4", border: "1px solid #86efac", borderRadius: "6px", color: "#166534", fontSize: "14px", fontWeight: 500 }}>
          Projet ajouté avec succès.
        </div>
      )}
      {state?.error && (
        <div style={{ marginBottom: "16px", padding: "12px 16px", backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "6px", color: "#991b1b", fontSize: "14px", fontWeight: 500 }}>
          {state.error}
        </div>
      )}

      <form ref={formRef} action={formAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={field}>
          <label style={label}>Nom du projet</label>
          <input name="name" required style={input} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={field}>
            <label style={label}>Catégorie</label>
            <input name="cat" required style={input} placeholder="ex: Résidentiel" />
          </div>
          <div style={field}>
            <label style={label}>Filtre (minuscule)</label>
            <input name="catFilter" required style={input} placeholder="ex: residentiel" />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={field}>
            <label style={label}>Année</label>
            <input name="year" required style={input} />
          </div>
          <div style={field}>
            <label style={label}>Image (Upload)</label>
            <input type="file" name="imageFile" accept="image/*" required style={input} />
          </div>
        </div>
        <div style={field}>
          <label style={label}>Description</label>
          <textarea name="desc" required rows={4} style={{ ...input, resize: "vertical" }}></textarea>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={field}>
            <label style={label}>Client</label>
            <input name="client" required style={input} />
          </div>
          <div style={field}>
            <label style={label}>Surface</label>
            <input name="surface" required style={input} />
          </div>
          <div style={field}>
            <label style={label}>Lieu</label>
            <input name="location" required style={input} />
          </div>
          <div style={field}>
            <label style={label}>Statut</label>
            <input name="status" required style={input} placeholder="ex: Livré" />
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending}
          style={{ backgroundColor: isPending ? "#94a3b8" : "var(--blue-dark)", color: "white", border: "none", padding: "12px", borderRadius: "4px", cursor: isPending ? "not-allowed" : "pointer", fontWeight: 600, marginTop: "8px" }}
        >
          {isPending ? "Ajout en cours..." : "Ajouter le projet"}
        </button>
      </form>
    </div>
  );
}
