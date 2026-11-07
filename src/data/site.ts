import siteData from './site.json';
import seoData from './seo.json';

export const site = siteData;
export const seo = seoData;

/** Enlace de WhatsApp con mensaje prellenado (texto plano, se codifica solo). */
export const wa = (msg: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;

/** URL de Instagram a partir del usuario (sin @). */
export const ig = (user: string) => `https://www.instagram.com/${user.replace(/^@/, '')}/`;

/** Iniciales para avatares sin foto. */
export const initials = (name: string) =>
  name
    .replace(/^(Dra?\.|Sr\.|Sra\.)\s*/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
