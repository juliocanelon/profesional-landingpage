// Si usas Next.js, crea: /pages/api/chat.js
// Si usas Vercel sin Next, crea: /api/chat.js

import { skills }    from '../../src/data/skills.js';
import { education } from '../../src/data/education.js';
import { projects }  from '../../src/data/projects.js';
import { contact }   from '../../src/data/contact.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body || {};
  if (typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Invalid request' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });
  }

  // Armar la KB
  const kbLines = [];
  kbLines.push('=== HABILIDADES ===');
  for (const [cat, items] of Object.entries(skills)) {
    kbLines.push(`${cat}: ${items.join(', ')}`);
  }
  kbLines.push('\n=== EDUCACIÓN ===');
  education.forEach((e) => kbLines.push('- ' + e));
  kbLines.push('\n=== PROYECTOS ===');
  projects.forEach((p) =>
    kbLines.push(`- ${p.title} (${p.role}): ${p.description}`)
  );
  kbLines.push('\n=== CONTACTO ===');
  kbLines.push(`Email: ${contact.email}`);
  kbLines.push(`LinkedIn: ${contact.linkedin}`);
  kbLines.push(`GitHub: ${contact.github}`);

  const systemPrompt = `
Eres "Chatbot Julio Canelon IA".  
Solo puedes usar la siguiente información para responder.  
No inventes ni supongas nada.
Responde de forma clara y concisa.  
No uses emojis ni lenguaje informal.
Si te preguntan algo que no esté en estos datos, responde:  
"Lo siento, no dispongo de esa información."  

${kbLines.join('\n')}
  `.trim();

  try {
    const aiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        temperature: 0,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: prompt },
        ],
      }),
    });

    if (!aiRes.ok) {
      const text = await aiRes.text();
      throw new Error(text);
    }
    const { choices } = await aiRes.json();
    const reply = choices?.[0]?.message?.content || '';
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('OpenAI error:', err);
    return res.status(500).json({ error: err.message || 'Server error' });
  }
}
