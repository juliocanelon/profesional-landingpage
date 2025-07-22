import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import ThemeToggle from './ThemeToggle';

function Header({ dark, onToggle }) {
  return (
    <Navbar expand="lg" className="bg-body" fixed="top">
      <div className="container">
        <Navbar.Brand href="#hero">Julio Canelón</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#portafolio">Portafolio</Nav.Link>
            <Nav.Link href="#sobre-mi">Sobre mí</Nav.Link>
            <Nav.Link href="#habilidades">Habilidades</Nav.Link>
            <Nav.Link href="#educacion">Educación</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
            <ThemeToggle dark={dark} onToggle={onToggle} />
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;
