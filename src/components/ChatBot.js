// pages/api/chat.js

import { skills } from '../data/skills.js';
import { education } from '../data/education.js';
import { projects } from '../data/projects.js';
import { contact } from '../data/contact.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Leer el prompt del body
  let body = '';
  for await (const chunk of req) {
    body += chunk;
  }
  let prompt;
  try {
    ({ prompt } = JSON.parse(body || '{}'));
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });
  }

  // Construye la KB a partir de tus datos
  function buildKnowledgeBase() {
    const lines = [];

    lines.push('=== HABILIDADES ===');
    Object.entries(skills).forEach(([category, items]) => {
      lines.push(`${category}: ${items.join(', ')}`);
    });

    lines.push('\n=== EDUCACIÓN ===');
    education.forEach((entry) => {
      lines.push(`- ${entry}`);
    });

    lines.push('\n=== PROYECTOS ===');
    projects.forEach((p) => {
      lines.push(`- ${p.title} (${p.role}): ${p.description}`);
    });

    lines.push('\n=== CONTACTO ===');
    lines.push(`Email: ${contact.email}`);
    lines.push(`LinkedIn: ${contact.linkedin}`);
    lines.push(`GitHub: ${contact.github}`);

    return lines.join('\n');
  }

  const knowledgeBase = buildKnowledgeBase();

  // Mensajes para OpenAI: primero el sistema con la KB, luego el usuario
  const messages = [
    {
      role: 'system',
      content: `
Eres "Chatbot Julio Canelon IA".  
Sólo puedes usar la siguiente información para responder.  
Si la pregunta no está en estos datos, responde: "Lo siento, no dispongo de esa información."  

${knowledgeBase}
      `.trim()
    },
    { role: 'user', content: prompt }
  ];

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages,
        temperature: 0
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText);
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';
    return res.status(200).json({ reply });
  } catch (error) {
    console.error('OpenAI error:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
}
