import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { contact } from '../data/contact';

function ContactForm() {
  const [values, setValues] = useState({ nombre: '', email: '', mensaje: '' });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    alert('Gracias por tu mensaje');
    setValues({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <section id="contacto" className="py-5 bg-light">
      <div className="container">
        <SectionTitle title="Contacto" />
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" name="nombre" className="form-control" value={values.nombre} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" value={values.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <textarea name="mensaje" className="form-control" value={values.mensaje} onChange={handleChange} required minLength="10" />
          </div>
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
        <p>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
        <p>LinkedIn: <a href={contact.linkedin}>Perfil</a></p>
        <p>GitHub: <a href={contact.github}>Repos</a></p>
      </div>
    </section>
  );
}

export default ContactForm;
