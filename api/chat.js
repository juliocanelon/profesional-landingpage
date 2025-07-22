// pages/api/chat.js

import { skills }    from '../src/data/skills.js';
import { education } from '../src/data/education.js';
import { projects }  from '../src/data/projects.js';
import { contact }   from '../src/data/contact.js';
import { profileJulio } from '../src/data/profile-julio.js';  

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

  // Construir la KB
  const kbLines = [];

  // Habilidades
  kbLines.push('=== HABILIDADES ===');
  for (const [cat, items] of Object.entries(skills)) {
    kbLines.push(`${cat}: ${items.join(', ')}`);
  }

  // Educación
  kbLines.push('\n=== EDUCACIÓN ===');
  education.forEach((e) => kbLines.push('- ' + e));

  // Proyectos
  kbLines.push('\n=== PROYECTOS ===');
  projects.forEach((p) =>
    kbLines.push(`- ${p.title} (${p.role}): ${p.description}`)
  );

  // Contacto
  kbLines.push('\n=== CONTACTO ===');
  kbLines.push(`Email: ${contact.email}`);
  kbLines.push(`LinkedIn: ${contact.linkedin}`);
  kbLines.push(`GitHub: ${contact.github}`);

  // Perfil unificado
  kbLines.push('\n=== PERFIL COMPLETO ===');
  kbLines.push(`Nombre: ${profileJulio.name}`);
  kbLines.push(`Título: ${profileJulio.title}`);
  kbLines.push(`Ubicación: ${profileJulio.location}`);
  kbLines.push(`Resumen: ${profileJulio.summary}`);
  if (Array.isArray(profileJulio.titles)) {
    kbLines.push(`Cargos / Roles: ${profileJulio.titles.join(', ')}`);
  }
  if (profileJulio.languages) {
    const langs = Object.entries(profileJulio.languages)
      .map(([lang, lvl]) => `${lang}: ${lvl}`)
      .join('; ');
    kbLines.push(`Idiomas: ${langs}`);
  }
  if (Array.isArray(profileJulio.certifications)) {
    kbLines.push(`Certificaciones: ${profileJulio.certifications.join(', ')}`);
  }
  if (Array.isArray(profileJulio.awards)) {
    kbLines.push(`Premios y Reconocimientos: ${profileJulio.awards.join(', ')}`);
  }
  if (Array.isArray(profileJulio.publications)) {
    kbLines.push(`Publicaciones / Hobbies: ${profileJulio.publications.join(', ')}`);
  }
  if (Array.isArray(profileJulio.experience)) {
    kbLines.push(`Experiencia profesional: ${profileJulio.experience.join(', ')}`);
  }
  if (Array.isArray(profileJulio.academicExperience)) {
    kbLines.push(`Experiencia academica: ${profileJulio.academicExperience.join(', ')}`);
  }
  if (Array.isArray(profileJulio.talks)) {
    kbLines.push(`Charlas y ponencias: ${profileJulio.talks.join(', ')}`);
  }

  const systemPrompt = `
Eres "Chatbot Julio Canelon IA".  
Solo puedes usar la siguiente información para responder.  
No inventes ni supongas nada.  
Responde de forma clara y concisa.  
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
