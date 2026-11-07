# Brand Vibe Crafters — Astro + Panel de edición + SEO

Sitio en Astro 5, publicado en Netlify, con panel de edición en `/admin` (Decap CMS) y capa SEO completa.
Todo el contenido vive en `src/data/*.json`: el panel edita esos archivos, hace commit en GitHub y Netlify vuelve a publicar solo (1–2 minutos).

---

## 1. Subir a GitHub

```bash
cd brand-vibe-astro
git init
git add .
git commit -m "Sitio Brand Vibe en Astro"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/brand-vibe-crafters.git
git push -u origin main
```

Luego abre `public/admin/config.yml` y cambia esta línea por tu usuario/repositorio real:

```yaml
repo: TU-USUARIO/brand-vibe-crafters
```

Haz commit y push de ese cambio.

## 2. Publicar en Netlify

1. Netlify → **Add new site → Import an existing project → GitHub** → elige el repositorio.
2. Netlify lee `netlify.toml` solo (build `npm run build`, carpeta `dist`, Node 22). Solo dale **Deploy**.
3. En **Site configuration → Site details → Change site name** ponle un nombre limpio, por ejemplo `brandvibecrafters` → `brandvibecrafters.netlify.app`.

No hay que configurar el dominio en el código: Netlify pasa la variable `URL` al build y con ella se generan el canonical, el sitemap, las og:image y el robots.txt. Cuando conectes un dominio propio, todo se actualiza en el siguiente deploy.

## 3. Activar el panel `/admin`

El panel inicia sesión con GitHub a través del OAuth de Netlify (Git Gateway ya está deprecado en Netlify, por eso no se usa).

**a) Crear la app OAuth en GitHub**
GitHub → Settings → Developer settings → **OAuth Apps → New OAuth App**
- Application name: `Panel Brand Vibe`
- Homepage URL: `https://brandvibecrafters.netlify.app`
- Authorization callback URL: **`https://api.netlify.com/auth/done`**

Guarda el **Client ID** y genera un **Client Secret**.

**b) Conectarla en Netlify**
Netlify → tu sitio → **Site configuration → Access & security → OAuth → Install provider** → GitHub → pega Client ID y Secret.

**c) Entrar**
Abre `https://brandvibecrafters.netlify.app/admin/` → **Iniciar sesión con GitHub**.

**¿Quién puede editar?** Cualquier cuenta de GitHub con permiso de escritura en el repo. Para darle acceso a Paula: repo → Settings → Collaborators → Add people.

### Editar en local (opcional)
```bash
npx decap-server      # terminal 1
npm run dev           # terminal 2 → http://localhost:4321/admin/
```

## 4. Qué se edita desde el panel

**Ajustes generales**
- *Datos de la marca y contacto:* WhatsApp, correo, Instagram, logos, botón principal.
- *SEO y Google:* título, meta descripción, imagen para compartir, verificación de Search Console y Bing, GA4, dirección, horario y perfiles para Google.

**Secciones de la página** (en el orden en que aparecen)
Portada · Logos · Cifras · Servicios · Diferencia · Casos de éxito · Testimonios · Branding · Más proyectos · Membresías · Cómo trabajamos · Nosotros y equipo · Charlas · Contacto · Aviso de privacidad.

Las imágenes que se suben desde el panel quedan en `public/assets/uploads/`.

---

## 5. SEO incluido

| Elemento | Qué hace |
|---|---|
| Title, meta description, canonical | Editables desde el panel; canonical absoluto con el dominio de Netlify |
| Open Graph + Twitter Card | Vista previa correcta al compartir en WhatsApp, Facebook, LinkedIn y X |
| JSON-LD (`@graph`) | `ProfessionalService` (negocio local) + `Person` (fundadora) + `WebSite` + `WebPage`, con horario, zona atendida, contacto, perfiles y catálogo de servicios y membresías. Se arma solo desde el contenido |
| `robots.txt` dinámico | Bloquea `/admin/`. En deploy previews bloquea todo |
| `meta robots` | `noindex` automático fuera de producción y en la 404 |
| `sitemap-index.xml` | Generado en cada build, sin la 404 |
| `llms.txt` | Resumen del negocio para ChatGPT, Perplexity, Gemini y Claude (GEO), generado desde el contenido |
| 404 personalizada | Con salida a inicio y a WhatsApp |
| Rendimiento | Imagen principal con `fetchpriority="high"` y precarga, fuentes precargadas, videos ocultos sin precarga, caché larga para JS, CSS y fuentes (`netlify.toml`) |
| Seguridad | HSTS, nosniff, Referrer-Policy, Permissions-Policy, X-Frame-Options |
| Medición (opcional) | Con GA4 activo, cada clic a WhatsApp o correo se registra como evento `generate_lead` |

### Pendientes recomendados (requieren datos del negocio)
1. **Search Console:** verificar la propiedad (pegar el código en *SEO y Google*) y enviar `sitemap-index.xml`.
2. **Google Business Profile:** pegar el enlace de la ficha en *SEO y Google → Enlace a la ficha*, y la dirección si atienden en oficina.
3. **Imagen para compartir 1200×630:** hoy se usa la foto vertical de la portada; una horizontal se ve mejor en WhatsApp y LinkedIn.
4. **GA4:** si se activa, actualizar el aviso de privacidad (hoy dice que no hay cookies de seguimiento).

## Comandos
```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera /dist
npm run preview
```
