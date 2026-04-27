# 🧡 Página Web – Mónica Magaña · Diputada Local
## Estructura de archivos

```
monica-magana/
├── index.html      ← Estructura HTML completa
├── styles.css      ← Todos los estilos (colores, tipografía, layout)
├── main.js         ← Lógica: navbar, carrusel, animaciones
├── logo-partido.png       ← [AGREGAR] Logo del partido
├── video-fondo.mp4        ← [AGREGAR] Video de fondo del hero
├── monica-foto.jpg        ← [AGREGAR] Foto oficial de Mónica
└── qr-whatsapp.png        ← [AGREGAR] Imagen QR de WhatsApp
```

---

## ✅ Lista de personalización (todo lo que debes reemplazar)

### 1. Logo del partido
- Archivo: `logo-partido.png`
- Aparece en: Navbar y Footer

### 2. Video de fondo (Hero)
- Archivo: `video-fondo.mp4`
- Si no tienes video, puedes reemplazar el tag `<video>` por una imagen así:
  ```html
  <img src="tu-imagen.jpg" class="hero-video" style="object-fit:cover;" />
  ```

### 3. Foto de Mónica
- Archivo: `monica-foto.jpg`
- Sección "Sobre mí", lado izquierdo
- Recomendado: foto vertical (3:4), alta resolución

### 4. Texto biográfico
- En `index.html`, busca los comentarios `<!-- AGREGA -->` o `<!-- DESCRIBE -->`
- Edita los párrafos de la sección `#sobre-mi`

### 5. Tarjetas de logros (carrusel)
- 6 tarjetas en la sección `#logros`
- Cada una tiene: ícono emoji, título, descripción, año
- Puedes agregar o quitar tarjetas copiando el bloque `.card`

### 6. WhatsApp
- En `index.html`, reemplaza el número en:
  ```html
  <a href="https://wa.me/5213312345678" ...>
  ```
  Usa el formato: `https://wa.me/521` + número sin espacios ni guiones
- Genera tu QR en: https://qr.io · usa la misma URL de wa.me
- Guarda como `qr-whatsapp.png`

### 7. Redes sociales (Footer)
- Busca los comentarios `<!-- REEMPLAZA -->` en el footer
- Actualiza los `href` con tus URLs reales de Instagram, Facebook, Twitter/X, TikTok

### 8. Programas gubernamentales (Footer)
- Sección "Programas Sociales" en el footer
- Agrega o reemplaza los links con los programas más relevantes para tu distrito

---

## 🎨 Cambiar colores

En `styles.css`, al inicio están las variables CSS:

```css
:root {
  --orange:       #FF6600;   /* Color principal naranja */
  --orange-dark:  #CC4E00;   /* Naranja oscuro (hover) */
  --orange-light: #FF8C3A;   /* Naranja claro (acentos) */
}
```

---

## 🚀 Cómo verlo en local

1. Abre la carpeta en VS Code
2. Instala la extensión **Live Server**
3. Click derecho en `index.html` → "Open with Live Server"

O simplemente abre `index.html` directo en tu navegador.

---

## 📦 Para subir a internet (hosting)

Opciones gratuitas recomendadas:
- **Netlify**: arrastra la carpeta en netlify.com/drop
- **GitHub Pages**: sube a un repositorio público y activa Pages
- **Vercel**: conecta tu repositorio y despliega automáticamente
