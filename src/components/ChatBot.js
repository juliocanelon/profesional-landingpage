// src/components/ChatBot.js
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaComments, FaPaperPlane } from 'react-icons/fa';

export default function ChatBot() {
  const [messages, setMessages] = useState([]);          // { role, text }
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const [show, setShow]         = useState(false);
  const scrollRef               = useRef(null);

  const handleShow  = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (show && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Mensaje de usuario
    setMessages((m) => [...m, { role: 'user', text: input }]);
    setLoading(true);
    setError(null);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Error en servidor');
      }
      const { reply } = await res.json();
      setMessages((m) => [...m, { role: 'assistant', text: reply }]);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          borderRadius: '50%',
          width: 60,
          height: 60,
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
      >
        <FaComments size={24} />
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chatbot Julio Canelon IA</Modal.Title>
        </Modal.Header>

        <Modal.Body
          ref={scrollRef}
          style={{ maxHeight: '60vh', overflowY: 'auto', padding: '1rem' }}
        >
          {messages.length === 0 && (
            <div className="mb-3">
              <div className="p-2 rounded bg-light text-dark">
                ¡Hola! Soy tu Chatbot Julio Canelon IA. Pregúntame sobre mi experiencia en desarrollo de software, IA y liderazgo técnico.
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 d-flex ${
                msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'
              }`}
            >
              <div
                className={`p-2 rounded ${
                  msg.role === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'
                }`}
                style={{ maxWidth: '80%' }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {error && <div className="text-danger">Error: {error}</div>}
        </Modal.Body>

        <Modal.Footer>
          <Form onSubmit={handleSubmit} className="w-100">
            <InputGroup>
              <Form.Control
                placeholder="Escribe tu mensaje..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
              />
              <Button variant="primary" type="submit" disabled={loading || !input.trim()}>
                <FaPaperPlane />
              </Button>
            </InputGroup>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
}
