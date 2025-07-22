import React from 'react';
import SectionTitle from './SectionTitle';

// Importamos los datos
import { aboutData } from '../data/about';  // o '../data/about.json' si es JSON

function About() {
  return (
    <section id="sobre-mi" className="py-5 bg-light">
      <div className="container">
        {/* Título desde datos */}
        <SectionTitle title={aboutData.title} />

        {/* Múltiples párrafos desde datos */}
        {aboutData.paragraphs.map((text, idx) => (
          <p key={idx}>{text}</p>
        ))}
      </div>
    </section>
  );
}

export default About;