import React from 'react';

function Footer() {
  return (
    <footer className="text-center py-3">
      <div className="container">
        <p>© {new Date().getFullYear()} Julio C. Canelón Rangel. Todos los derechos reservados.</p>
        <a href="#hero" className="btn btn-secondary back-to-top">Volver arriba</a>
      </div>
    </footer>
  );
}

export default Footer;
