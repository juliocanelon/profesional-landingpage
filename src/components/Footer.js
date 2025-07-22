import React from 'react';

function Footer() {
  return (
    <footer className="py-3 bg-light">
      <div className="container">
        <div className="row align-items-center">
          {/* Columna derecha: texto de derechos */}
          <div className="col text-end">
            <p className="mb-0">
              © {new Date().getFullYear()} Julio C. Canelón Rangel. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
