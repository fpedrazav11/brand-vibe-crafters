// /llms.txt: resumen en texto plano para asistentes de IA (ChatGPT, Perplexity, Gemini, Claude).
// Se genera con el mismo contenido del sitio, así que se mantiene al día solo.
import type { APIRoute } from 'astro';
import { site, seo } from '../data/site';
import servicios from '../data/servicios.json';
import membresias from '../data/membresias.json';
import metodo from '../data/metodo.json';
import casos from '../data/casos.json';
import contacto from '../data/contacto.json';

export const GET: APIRoute = ({ site: url }) => {
  const u = (h: string) => new URL(h, url).href;
  const lines = [
    `# ${site.name}`,
    '',
    `> ${seo.description}`,
    '',
    `${site.name} (${site.legalName}) es una agencia de marketing digital en ${site.city}, ${site.countryName}, dirigida por ${seo.founder} (${seo.founderRole}).`,
    '',
    '## Servicios',
    ...servicios.items.map((s) => `- ${s.title}: ${s.text}`),
    '',
    '## Membresías de manejo integral de redes',
    ...membresias.items.map((m) => `- ${m.name} (${m.category}): ${m.text} Incluye: ${m.features.join('; ')}. ${m.excludes}`),
    ...membresias.notes.map((n) => `- ${n.bold} ${n.text}`),
    '',
    '## Cómo trabajan',
    ...metodo.steps.map((s, i) => `${i + 1}. ${s.title}${s.badge ? ` (${s.badge})` : ''}: ${s.text}`),
    '',
    '## Casos de éxito',
    ...casos.items.map((c) => `- ${c.title} — ${c.kicker}: ${c.text}`),
    '',
    '## Contacto',
    `- WhatsApp: ${site.whatsappDisplay} (https://wa.me/${site.whatsapp})`,
    `- Correo: ${site.email}`,
    `- Instagram: https://www.instagram.com/${site.instagram}/`,
    `- Ubicación: ${contacto.location}`,
    ...contacto.hours.map((h) => `- Horario: ${h}`),
    '',
    '## Enlaces',
    `- [Servicios](${u('/#servicios')})`,
    `- [Casos de éxito](${u('/#casos')})`,
    `- [Membresías](${u('/#membresias')})`,
    `- [Contacto](${u('/#contacto')})`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
