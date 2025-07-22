import React from 'react';

function Hero() {
  return (
    <section id="hero" className="text-center py-5" style={{ backgroundImage: 'url(hero-bg.jpg)' }}>
      <div className="container">
        <img src="profile-julio.jpg" alt="Julio Canelón" className="rounded-circle mb-3" width="150" />
        <h1>Ingeniero en Informática & Líder Técnico en Banca Digital</h1>
        <p className="lead">+15 años creando soluciones de software. Ahora tu socio estratégico en Inteligencia Artificial.</p>
        <a href="#portafolio" className="btn btn-primary me-2">Ver Portafolio</a>
        <a href="#contacto" className="btn btn-success">Contáctame</a>
      </div>
    </section>
  );
}

export default Hero;
