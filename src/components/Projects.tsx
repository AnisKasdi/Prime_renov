"use client";

import { useState } from "react";
import Image from "next/image";

import { Project } from "@prisma/client";

export default function Projects({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getValidImage = (url: string | undefined | null) => {
    if (url && (url.startsWith("/") || url.startsWith("http"))) return url;
    return "/projects/villa_cassini.png";
  };

  const filteredProjects = projects.filter(
    (p) => filter === "all" || p.catFilter === filter
  );

  return (
    <section className="section projects" id="projets">
      <div className="section-header reveal">
        <span className="section-num label">02</span>
        <h2 className="section-title">
          Nos <strong>Projets</strong>
        </h2>
      </div>
      <div className="projects-filter reveal reveal-d1">
        {[
          { label: "Tous", value: "all" },
          { label: "Résidentiel", value: "residentiel" },
          { label: "Commercial", value: "commercial" },
          { label: "Rénovation", value: "renovation" },
          { label: "Urbanisme", value: "urbanisme" },
        ].map((btn) => (
          <button
            key={btn.value}
            className={`filter-btn ${filter === btn.value ? "active" : ""}`}
            onClick={() => setFilter(btn.value)}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="projects-grid reveal reveal-d2">
        {filteredProjects.map((project, index) => (
          <div
            className="project-item"
            key={project.id}
            onClick={() => setSelectedProject(project)}
            style={{ cursor: "pointer" }}
          >
            <div className="project-bg">
              <Image
                src={getValidImage(project.image)}
                alt={project.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <span className="project-num">0{project.id}</span>
            <div className="project-overlay">
              <span className="project-cat">{project.cat}</span>
              <h3 className="project-name">{project.name}</h3>
              <span className="project-year">{project.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Drawer Overlay */}
      <div
        className={`project-drawer-overlay ${selectedProject ? "open" : ""}`}
        onClick={() => setSelectedProject(null)}
      ></div>

      {/* Slide-over Drawer */}
      <div className={`project-drawer ${selectedProject ? "open" : ""}`}>
        {selectedProject && (
          <>
            <button
              className="drawer-close"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>
            <div className="drawer-img-wrap">
              <Image
                src={getValidImage(selectedProject.image)}
                alt={selectedProject.name}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="drawer-content">
              <span className="drawer-cat">{selectedProject.cat}</span>
              <h3 className="drawer-title">{selectedProject.name}</h3>
              <span className="drawer-year">{selectedProject.year}</span>
              <p className="drawer-desc">
                {selectedProject.desc}
              </p>
              <div className="drawer-details-grid">
                <div className="drawer-detail-item">
                  <span className="label">Client</span>
                  <span className="val">{selectedProject.client}</span>
                </div>
                <div className="drawer-detail-item">
                  <span className="label">Surface</span>
                  <span className="val">{selectedProject.surface}</span>
                </div>
                <div className="drawer-detail-item">
                  <span className="label">Lieu</span>
                  <span className="val">{selectedProject.location}</span>
                </div>
                <div className="drawer-detail-item">
                  <span className="label">Statut</span>
                  <span className="val">{selectedProject.status}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
