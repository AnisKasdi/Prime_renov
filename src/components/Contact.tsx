"use client";

import { useActionState, useEffect, useRef } from "react";
import { sendContact } from "@/actions/email";

export default function Contact() {
  const [state, formAction, isPending] = useActionState(sendContact, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  return (
    <section className="section contact" id="contact">
      <div className="section-header reveal">

        <h2 className="section-title">
          Nous <strong>Contacter</strong>
        </h2>
      </div>
      <div className="contact-grid">
        <div className="contact-info reveal">
          <p>
            Notre équipe est disponible du lundi au vendredi, de 9h à 18h. Nous
            serons heureux de répondre à toute question ou demande
            d'information.
          </p>
          <div className="contact-details">
            <div className="contact-item">
              <span className="item-label label">Adresse</span>
              <p>12 Rue de la Paix, 75001 Paris</p>
            </div>
            <div className="contact-item">
              <span className="item-label label">Téléphone</span>
              <p>+33 1 42 00 00 00</p>
            </div>
            <div className="contact-item">
              <span className="item-label label">Email</span>
              <p>contact@primerenov.fr</p>
            </div>
            <div className="contact-item">
              <span className="item-label label">Horaires</span>
              <p>Lun – Ven, 9h – 18h</p>
            </div>
          </div>
        </div>
        <div className="form-panel reveal reveal-d1">
          <form ref={formRef} action={formAction} id="contactForm">
            <div className="form-group">
              <label htmlFor="c-nom">Nom</label>
              <input
                type="text"
                id="c-nom"
                name="nom"
                placeholder="Votre nom"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="c-email">Email</label>
              <input
                type="email"
                id="c-email"
                name="email"
                placeholder="votre@email.fr"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="c-msg">Message</label>
              <textarea
                id="c-msg"
                name="msg"
                rows={5}
                placeholder="Votre message..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="btn-submit"
              style={state?.success ? { background: "var(--green-mid)" } : {}}
              disabled={isPending || !!state?.success}
            >
              {state?.success ? (
                "Envoyé !"
              ) : isPending ? (
                "Envoi..."
              ) : (
                <>
                  Envoyer le message{" "}
                  <span
                    className="arrow"
                    style={{ background: "white", flexShrink: 0 }}
                  ></span>
                </>
              )}
            </button>
            {state?.success && (
              <div className="form-success" style={{ display: "block" }}>
                Votre message a bien été envoyé. Merci !
              </div>
            )}
            {state?.error && (
              <div
                style={{
                  marginTop: "12px",
                  color: "#e05252",
                  fontSize: "14px",
                }}
              >
                {state.error}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
