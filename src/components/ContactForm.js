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

    // Reemplaza con tus propias credenciales de EmailJS
    const SERVICE_ID = 'service_hgvwusm';
    const TEMPLATE_ID = 'template_unapty9';
    const USER_ID = 'juliocanelon@gmail.com';

    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        from_name:  values.nombre,
        from_email: values.email,
        message:    values.mensaje,
      },
      USER_ID
    )
    .then(() => {
      alert('¡Correo enviado con éxito!');
      setValues({ nombre: '', email: '', mensaje: '' });
    })
    .catch((err) => {
      console.error('ERROR envío email:', err);
      alert('Hubo un error al enviar el correo. Intenta de nuevo más tarde.');
    });
  };

  return (
    <section id="contacto" className="py-5 bg-light">
      <div className="container">
        <SectionTitle title="Contacto" />

        <p className="lead mb-4">
          ¿Tienes un proyecto en mente, una duda técnica o simplemente quieres saludar?  
          ¡Me encantaría saber de ti! Completa el formulario y conversemos cómo puedo ayudarte a llevar tu idea al siguiente nivel.
        </p>
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
