"use client";

import { useActionState, useEffect, useState } from "react";
import { sendDevis } from "@/actions/email";

export default function DevisForm() {
  const [state, formAction, isPending] = useActionState(sendDevis, null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");

  useEffect(() => {
    if (state?.success) {
      setCurrentStep(1);
      setSelectedType("");
      setSelectedBudget("");
    }
  }, [state?.success]);

  const goStep = (n: number) => setCurrentStep(n);

  return (
    <section className="section devis" id="devis">
      <div className="section-header reveal">

        <h2 className="section-title">
          Demande de <strong>Devis</strong>
        </h2>
      </div>
      <div className="devis-grid">
        {/* Left: process info */}
        <div className="devis-info reveal">
          <p>
            Décrivez votre projet en 3 étapes simples. Nous vous répondons sous
            48h avec une estimation personnalisée et un plan d'action concret.
          </p>

          <p className="process-title label">Comment ça marche</p>
          <div className="process-step">
            <div className="ps-num">01</div>
            <div className="ps-body">
              <div className="ps-title">Décrivez votre projet</div>
              <div className="ps-desc">
                Type, surface, localisation, budget et vos coordonnées — 3 minutes
                suffisent.
              </div>
            </div>
          </div>
          <div className="process-step">
            <div className="ps-num">02</div>
            <div className="ps-body">
              <div className="ps-title">Premier échange (48h)</div>
              <div className="ps-desc">
                Un architecte vous contacte pour qualifier votre besoin et
                répondre à vos questions.
              </div>
            </div>
          </div>
          <div className="process-step">
            <div className="ps-num">03</div>
            <div className="ps-body">
              <div className="ps-title">Étude de faisabilité</div>
              <div className="ps-desc">
                Analyse du site, contraintes réglementaires et première
                estimation budgétaire.
              </div>
            </div>
          </div>
          <div className="process-step">
            <div className="ps-num">04</div>
            <div className="ps-body">
              <div className="ps-title">Proposition & signature</div>
              <div className="ps-desc">
                Présentation d'une esquisse, lettre de mission et démarrage
                officiel du projet.
              </div>
            </div>
          </div>

          <div className="devis-trust">
            <div className="trust-item">Réponse garantie sous 48h</div>
            <div className="trust-item">Premier échange 100 % gratuit</div>
            <div className="trust-item">Devis sans engagement</div>
            <div className="trust-item">
              Disponible en présentiel ou distanciel
            </div>
          </div>
        </div>

        {/* Right: multi-step form */}
        <div className="form-panel reveal reveal-d1">
          {/* Steps progress bar */}
          <div className="steps-bar" id="stepsBar">
            <div
              className={`step-item ${currentStep === 1 ? "active" : ""} ${
                currentStep > 1 ? "done" : ""
              }`}
            >
              <div className="step-num-badge">1</div>
              <span className="step-label-text">Projet</span>
            </div>
            <div className={`step-connector ${currentStep > 1 ? "done" : ""}`}></div>
            <div
              className={`step-item ${currentStep === 2 ? "active" : ""} ${
                currentStep > 2 ? "done" : ""
              }`}
            >
              <div className="step-num-badge">2</div>
              <span className="step-label-text">Détails</span>
            </div>
            <div className={`step-connector ${currentStep > 2 ? "done" : ""}`}></div>
            <div className={`step-item ${currentStep === 3 ? "active" : ""}`}>
              <div className="step-num-badge">3</div>
              <span className="step-label-text">Contact</span>
            </div>
          </div>

          <form action={formAction}>
            {/* Hidden inputs for selections */}
            <input type="hidden" name="type" value={selectedType} />
            <input type="hidden" name="budget" value={selectedBudget} />

            <div className="steps-wrap">
              {/* Step 1 */}
              <div className={`step-panel ${currentStep === 1 ? "active" : ""}`}>
                <div className="form-group" style={{ marginBottom: "28px" }}>
                  <label>Type de projet</label>
                  <div className="type-grid">
                    {[
                      { num: "01", value: "residentiel", name: "Résidentiel", sub: "Maison, villa, appartement" },
                      { num: "02", value: "commercial", name: "Commercial", sub: "Bureau, commerce, hôtel" },
                      { num: "03", value: "renovation", name: "Rénovation", sub: "Transformation, extension" },
                      { num: "04", value: "urbanisme", name: "Urbanisme", sub: "Aménagement, ZAC, lotissement" },
                    ].map((type) => (
                      <div
                        key={type.value}
                        className={`type-card ${selectedType === type.value ? "selected" : ""}`}
                        data-num={type.num}
                        onClick={() => setSelectedType(type.value)}
                      >
                        <div className="type-name">{type.name}</div>
                        <div className="type-sub">{type.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="s1-desc">Description rapide du projet</label>
                  <textarea
                    id="s1-desc"
                    name="desc"
                    rows={4}
                    placeholder="Racontez-nous votre projet en quelques phrases : lieu, contexte, ambitions..."
                  ></textarea>
                </div>
                <div className="step-nav">
                  <span></span>
                  <button className="btn-next-step" onClick={() => goStep(2)} type="button">
                    Étape suivante
                    <span className="arrow" style={{ background: "white", flexShrink: 0 }}></span>
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`step-panel ${currentStep === 2 ? "active" : ""}`}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="s2-surface">Surface estimée</label>
                    <input type="text" id="s2-surface" name="surface" placeholder="ex : 180 m²" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="s2-lieu">Localisation</label>
                    <input type="text" id="s2-lieu" name="lieu" placeholder="Ville ou département" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Budget estimé</label>
                  <div className="budget-tiles">
                    {[
                      { value: "< 100k", label: "< 100 000 €" },
                      { value: "100-300k", label: "100 – 300k €" },
                      { value: "300k-1M", label: "300k – 1M €" },
                      { value: "> 1M", label: "> 1 000 000 €" },
                      { value: "nd", label: "À définir" },
                    ].map((budget) => (
                      <button
                        key={budget.value}
                        type="button"
                        className={`budget-tile ${selectedBudget === budget.value ? "selected" : ""}`}
                        onClick={() => setSelectedBudget(budget.value)}
                      >
                        {budget.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="s2-delai">Délai souhaité</label>
                  <select id="s2-delai" name="delai">
                    <option value="" disabled>Sélectionner...</option>
                    <option value="Dès que possible">Dès que possible</option>
                    <option value="Dans les 6 mois">Dans les 6 mois</option>
                    <option value="Dans l'année">Dans l'année</option>
                    <option value="À plus de 12 mois">À plus de 12 mois</option>
                    <option value="Non défini">Non défini</option>
                  </select>
                </div>
                <div className="step-nav">
                  <button className="btn-back-step" onClick={() => goStep(1)} type="button">
                    <span className="arr-l"></span>Retour
                  </button>
                  <button className="btn-next-step" onClick={() => goStep(3)} type="button">
                    Étape suivante
                    <span className="arrow" style={{ background: "white", flexShrink: 0 }}></span>
                  </button>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`step-panel ${currentStep === 3 ? "active" : ""}`}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="s3-nom">Nom complet</label>
                    <input type="text" id="s3-nom" name="nom" placeholder="Jean Dupont" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="s3-email">Email</label>
                    <input type="email" id="s3-email" name="email" placeholder="jean@exemple.fr" required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="s3-tel">Téléphone</label>
                  <input type="tel" id="s3-tel" name="tel" placeholder="+33 6 00 00 00 00" />
                </div>
                <div className="form-group">
                  <label htmlFor="s3-msg">
                    Message complémentaire{" "}
                    <span style={{ fontWeight: 400, color: "var(--gray-400)" }}>(facultatif)</span>
                  </label>
                  <textarea id="s3-msg" name="msg" rows={3} placeholder="Contraintes particulières, questions, remarques..."></textarea>
                </div>
                <div className="step-nav">
                  <button className="btn-back-step" onClick={() => goStep(2)} type="button">
                    <span className="arr-l"></span>Retour
                  </button>
                  <button
                    type="submit"
                    className="btn-next-step"
                    style={state?.success ? { background: "var(--green-dark)" } : {}}
                    disabled={isPending || !!state?.success}
                  >
                    {state?.success ? (
                      "Envoyé !"
                    ) : isPending ? (
                      "Envoi..."
                    ) : (
                      <>
                        Envoyer ma demande
                        <span className="arrow" style={{ background: "white", flexShrink: 0 }}></span>
                      </>
                    )}
                  </button>
                </div>
                {state?.success && (
                  <div className="form-success" style={{ display: "block" }}>
                    Votre demande a bien été envoyée. Un architecte vous contactera sous 48h.
                  </div>
                )}
                {state?.error && (
                  <div style={{ marginTop: "12px", color: "#e05252", fontSize: "14px" }}>
                    {state.error}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
