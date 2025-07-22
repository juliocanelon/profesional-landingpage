import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { FaComments, FaPaperPlane } from 'react-icons/fa';

function ChatBot() {
  const [messages, setMessages] = useState([]);          // { role, text }
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const scrollRef = useRef(null);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Mantener el scroll siempre abajo cuando llegan nuevos mensajes
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (show) scrollToBottom();
  }, [messages, show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    setError(null);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error del servidor');
      }
      if (data.reply) {
        setMessages((msgs) => [...msgs, { role: 'assistant', text: data.reply }]);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      <Button
        variant="primary"
        onClick={handleShow}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}
      >
        <FaComments size={24} />
      </Button>

      {/* Modal del chatbot */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Chatbot Julio Canelon IA</Modal.Title>
        </Modal.Header>

        <Modal.Body
          ref={scrollRef}
          style={{ maxHeight: '60vh', overflowY: 'auto', padding: '1rem' }}
        >
          {/* Mensaje de bienvenida */}
          {messages.length === 0 && (
            <div className="mb-3">
              <div className="p-2 rounded bg-light text-dark">
                ¡Hola! Soy tu Chatbot Julio Canelon IA. Pregúntame sobre mi experiencia en desarrollo de software, inteligencia artificial, liderazgo técnico y más.
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
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
          <Form className="w-100" onSubmit={handleSubmit}>
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

export default ChatBot;
