import React from 'react';
import SectionTitle from './SectionTitle';

function About() {
  return (
    <section id="sobre-mi" className="py-5 bg-light">
      <div className="container">
        <SectionTitle title="Sobre mí" />
        <p>
          Ingeniero en Informática con más de 15 años de experiencia en desarrollo de software,
          arquitectura de soluciones y liderazgo técnico en banca, retail y servicios. He trabajado
          diseñando y escalando plataformas basadas en microservicios, integraciones seguras y prácticas
          DevSecOps. También soy docente universitario y un entusiasta de la Inteligencia Artificial aplicada
          a la ingeniería de software y la gestión de proyectos. Mi objetivo actual: evolucionar hacia consultoría
          independiente en IA para organizaciones que buscan modernizar su ecosistema tecnológico.
        </p>
      </div>
    </section>
  );
}

export default About;
