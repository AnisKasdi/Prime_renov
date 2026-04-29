"use client";

import { useActionState, useEffect, useRef } from "react";
import { addTestimonial } from "@/actions/testimonials";

const input = { padding: "8px", border: "1px solid var(--gray-200)", borderRadius: "4px" } as const;
const label = { fontSize: "13px", fontWeight: 600 } as const;
const field = { display: "flex", flexDirection: "column", gap: "4px" } as const;

export default function AddTestimonialForm() {
  const [state, formAction, isPending] = useActionState(addTestimonial, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) formRef.current?.reset();
  }, [state?.success]);

  return (
    <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "8px", border: "1px solid var(--gray-200)" }}>
      <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>Ajouter un Avis</h2>

      {state?.success && (
        <div style={{ marginBottom: "16px", padding: "12px 16px", backgroundColor: "#f0fdf4", border: "1px solid #86efac", borderRadius: "6px", color: "#166534", fontSize: "14px", fontWeight: 500 }}>
          Avis ajouté avec succès.
        </div>
      )}
      {state?.error && (
        <div style={{ marginBottom: "16px", padding: "12px 16px", backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "6px", color: "#991b1b", fontSize: "14px", fontWeight: 500 }}>
          {state.error}
        </div>
      )}

      <form ref={formRef} action={formAction} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <div style={field}>
            <label style={label}>Nom du client</label>
            <input name="name" required style={input} />
          </div>
          <div style={field}>
            <label style={label}>Initiales (Avatar)</label>
            <input name="avatar" required maxLength={2} style={input} placeholder="ex: ML" />
          </div>
        </div>
        <div style={field}>
          <label style={label}>Rôle / Projet</label>
          <input name="role" required style={input} placeholder="ex: Projet résidentiel — Paris" />
        </div>
        <div style={field}>
          <label style={label}>Note (1 à 5)</label>
          <input name="rating" type="number" min="1" max="5" defaultValue="5" required style={input} />
        </div>
        <div style={field}>
          <label style={label}>Témoignage</label>
          <textarea name="text" required rows={4} style={{ ...input, resize: "vertical" }}></textarea>
        </div>
        <button
          type="submit"
          disabled={isPending}
          style={{ backgroundColor: isPending ? "#94a3b8" : "var(--blue-dark)", color: "white", border: "none", padding: "12px", borderRadius: "4px", cursor: isPending ? "not-allowed" : "pointer", fontWeight: 600, marginTop: "8px" }}
        >
          {isPending ? "Ajout en cours..." : "Ajouter l'avis"}
        </button>
      </form>
    </div>
  );
}
