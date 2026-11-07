// Datos estructurados (JSON-LD) generados desde los archivos de contenido.
// Todo lo que se edita en el panel (servicios, membresías, contacto, SEO) se refleja aquí solo.
import { site, seo } from '../data/site';
import servicios from '../data/servicios.json';
import membresias from '../data/membresias.json';
import nosotros from '../data/nosotros.json';
import hero from '../data/hero.json';

export function buildSchema(siteUrl: URL, pageUrl: URL, title: string, description: string) {
  const abs = (p: string) => new URL(p, siteUrl).href;
  const base = siteUrl.href.replace(/\/$/, '');
  const orgId = `${base}/#organization`;
  const founderId = `${base}/#founder`;
  const websiteId = `${base}/#website`;

  const address: Record<string, string> = {
    '@type': 'PostalAddress',
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: site.countryCode,
  };
  if (seo.streetAddress) address.streetAddress = seo.streetAddress;
  if (seo.postalCode) address.postalCode = seo.postalCode;

  const org: Record<string, unknown> = {
    '@type': 'ProfessionalService',
    '@id': orgId,
    name: site.name,
    alternateName: site.tagline,
    legalName: site.legalName,
    description: seo.description,
    url: `${base}/`,
    logo: { '@type': 'ImageObject', url: abs(site.logo) },
    image: [abs(seo.ogImage || hero.image)],
    telephone: `+${site.whatsapp}`,
    email: site.email,
    address,
    areaServed: seo.areaServed.map((a) =>
      a === site.countryName ? { '@type': 'Country', name: a } : { '@type': 'City', name: a },
    ),
    openingHoursSpecification: seo.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+${site.whatsapp}`,
      email: site.email,
      contactType: 'customer service',
      availableLanguage: ['es'],
    },
    sameAs: seo.sameAs,
    founder: { '@id': founderId },
    knowsAbout: servicios.items.map((s) => s.title),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de marketing digital',
      itemListElement: [
        ...servicios.items.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, description: s.text, provider: { '@id': orgId } },
        })),
        ...membresias.items.map((m) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: `${m.name} — manejo integral de redes sociales`,
            description: `${m.text} Incluye: ${m.features.join('; ')}.`,
            provider: { '@id': orgId },
          },
        })),
      ],
    },
  };
  if (seo.latitude && seo.longitude) {
    org.geo = { '@type': 'GeoCoordinates', latitude: Number(seo.latitude), longitude: Number(seo.longitude) };
  }
  if (seo.googleMapsUrl) org.hasMap = seo.googleMapsUrl;

  const founder = {
    '@type': 'Person',
    '@id': founderId,
    name: seo.founder,
    jobTitle: seo.founderRole,
    image: abs(nosotros.image),
    worksFor: { '@id': orgId },
    sameAs: nosotros.instagram ? [`https://www.instagram.com/${nosotros.instagram.replace(/^@/, '')}/`] : [],
  };

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${base}/`,
    name: site.name,
    inLanguage: 'es-CO',
    publisher: { '@id': orgId },
  };

  const webpage = {
    '@type': 'WebPage',
    '@id': `${pageUrl.href}#webpage`,
    url: pageUrl.href,
    name: title,
    description,
    inLanguage: 'es-CO',
    isPartOf: { '@id': websiteId },
    about: { '@id': orgId },
    primaryImageOfPage: { '@type': 'ImageObject', url: abs(seo.ogImage || hero.image) },
  };

  return { '@context': 'https://schema.org', '@graph': [org, founder, website, webpage] };
}
