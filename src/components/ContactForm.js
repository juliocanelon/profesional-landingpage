import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { contact } from '../data/contact';
import { FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';

function ContactForm() {
  const [values, setValues] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    alert('¡Gracias por tu mensaje!');
    setValues({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <section id="contacto" className="py-5 bg-light">
      <div className="container">
        <SectionTitle title="Contacto" />

        {/* Texto de invitación */}
        <p className="lead mb-4">
          ¿Tienes un proyecto en mente, una duda técnica o simplemente quieres saludar?  
          ¡Me encantaría saber de ti! Completa el formulario y conversemos cómo puedo ayudarte a llevar tu idea al siguiente nivel.
        </p>

        {/* Formulario alineado en una fila */}
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row g-3 align-items-end">
            <div className="col-md-3">
              <label htmlFor="nombre" className="form-label">Nombre</label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                className="form-control"
                value={values.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                className="form-control"
                value={values.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="mensaje" className="form-label">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                className="form-control"
                value={values.mensaje}
                onChange={handleChange}
                required
                minLength="10"
                rows="1"
              />
            </div>

            <div className="col-md-2 text-end">
              <button type="submit" className="btn btn-primary w-100">
                Enviar
              </button>
            </div>
          </div>
        </form>

        {/* Enlaces de contacto con iconos */}
        <div className="mt-4">
          <p>
            <FaEnvelope className="me-2" />
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <p>
            <FaLinkedin className="me-2" />
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </p>
          <p>
            <FaGithub className="me-2" />
            <a href={contact.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;
