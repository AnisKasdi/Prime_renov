"use client";

import { useRef, useState } from "react";
import { Testimonial } from "@prisma/client";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = x - startX;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    setStartX(e.touches[0].pageX);
    setScrollLeft(trackRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    const x = e.touches[0].pageX;
    const walk = x - startX;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className="section testimonials" id="avis">
      <div className="section-header reveal">
        <span className="section-num label">04</span>
        <h2 className="section-title">
          Ce que disent <strong>nos clients</strong>
        </h2>
      </div>
      <div
        className={`testimonials-track ${isDragging ? "grabbing" : ""}`}
        id="testimonialsTrack"
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {testimonials.map((t) => (
          <div className="testimonial-card" key={t.id}>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`dot ${i >= t.rating ? "empty" : ""}`}></div>
              ))}
            </div>
            <p className="t-text">{t.text}</p>
            <div className="t-author">
              <div className="t-avatar">{t.avatar}</div>
              <div>
                <span className="t-name">{t.name}</span>
                <span className="t-role">{t.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
