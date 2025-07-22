import React from 'react';

function Hero() {
  // Esta función buscará el botón flotante del ChatBot por su id y simulará el click
  const openChatBot = () => {
    const chatBtn = document.getElementById('open-chatbot-button');
    if (chatBtn) chatBtn.click();
  };

  return (
    <section
      id="hero"
      className="text-center py-5"
      style={{ backgroundImage: 'url(hero-bg.png)' }}
    >
      <div className="container">
        <img
          src="profile-julio.jpg"
          alt="Julio Canelón"
          className="rounded-circle mb-3"
          width="150"
        />
        <h1>Ingeniero en Informática & Líder Técnico en Banca Digital</h1>
        <p className="lead">
          +15 años creando soluciones de software. Ahora tu socio estratégico en
          Inteligencia Artificial.
        </p>
        <a href="#portafolio" className="btn btn-primary me-2">
          Ver Portafolio
        </a>
        <a href="#contacto" className="btn btn-success me-2">
          Contáctame
        </a>
        <button
          type="button"
          className="btn btn-info"
          onClick={openChatBot}
        >
          Conversa con mi versión IA
        </button>
      </div>
    </section>
  );
}

export default Hero;
