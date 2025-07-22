import React, { useState } from 'react';

function ChatBot() {
  const [messages, setMessages] = useState([]); // { role, text }
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages((msgs) => [...msgs, { role: 'assistant', text: data.reply }]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="my-4 text-center">ChatBot</h2>
        <div className="chat-window">
          {messages.map((msg, idx) => (
            <div key={idx} className={`msg ${msg.role === 'user' ? 'user' : 'bot'}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Escribe tu mensaje..."
          />
          <button type="submit" disabled={loading || !input.trim()}>Enviar</button>
        </form>
      </div>
    </section>
  );
}

export default ChatBot;
