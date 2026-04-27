# 🎯 LÍNEA DEL TIEMPO INTERACTIVA - INSTRUCCIONES

## ✅ Cambios Realizados

Tu página ha sido transformada con un diseño **estilo Apple** más profesional y moderno:

### 1. **Sección Crucigrama COMENTADA** ✓
- La sección del crucigrama ha sido comentada (comentarios HTML) para evitar bugs
- Puedes descmentarla después si lo necesitas, o eliminarla permanentemente

### 2. **Nueva Línea del Tiempo Interactiva** ✓
- **Ubicación:** Reemplaza visualmente al crucigrama
- **Estilo:** Minimalista y moderno tipo Apple
- **Funcionalidad:**
  - Click en cualquier punto abre un **modal popup elegante**
  - Muestra foto, logro e impacto real
  - Cierra con X, ESC o click en fondo

### 3. **Navbar Actualizado** ✓
- Link "Crucigrama" → "Trayectoria" 
- Navega directamente a `#timeline`

### 4. **Ruleta Mantiene** ✓
- La sección de ruleta con videos funciona exactamente igual

---

## 🎨 Personalización de la Línea del Tiempo

### Editar Contenido de Puntos

Abre **`main.js`** y busca la sección `LÍNEA DEL TIEMPO INTERACTIVA`:

```javascript
const timelineData = {
  '2018': {
    title: 'Título del año',
    description: 'Descripción larga que aparece en el popup',
    impact: 'Impacto real con números y resultados',
    image: 'img/tu_imagen.jpg'  // ← REEMPLAZA ESTA RUTA
  },
  // ... más años
};
```

### Personaliza Cada Año:

```javascript
'2018': {
  title: 'Inicio en servicio público',
  description: 'Comenzó mi trayectoria en la administración pública, enfocándose en políticas de inclusión y acceso a servicios básicos para comunidades vulnerables.',
  impact: 'Participación activa en 5 programas municipales con impacto en más de 2,000 familias.',
  image: 'img/foto_2018.jpg'  // Pon tu foto aquí
},
'2020': {
  title: 'Tu título aquí',
  description: 'Tu descripción aquí',
  impact: 'Tu impacto aquí',
  image: 'img/foto_2020.jpg'
},
```

### Agregar/Quitar Años

Para agregar un nuevo punto (ej: 2026):

**1. En `index.html`**, dentro de `.timeline-track`, agrega:
```html
<!-- PUNTO 2026 -->
<div class="timeline-item" data-year="2026">
  <div class="timeline-dot"></div>
  <div class="timeline-content">
    <span class="timeline-year">2026</span>
    <h3 class="timeline-title">Tu título aquí</h3>
    <p class="timeline-preview">Preview corto</p>
  </div>
</div>
```

**2. En `main.js`**, dentro de `timelineData`, agrega:
```javascript
'2026': {
  title: 'Tu evento 2026',
  description: 'Descripción detallada',
  impact: 'Impacto real',
  image: 'img/foto_2026.jpg'
},
```

---

## 🖼️ Imágenes Recomendadas

| Año | Foto Recomendada | Tamaño |
|-----|------------------|--------|
| 2018 | Foto de inicio en política | 600x600 px |
| 2020 | Con comunidad/logros | 600x600 px |
| 2022 | Evento legislativo | 600x600 px |
| 2024 | Foto oficial como diputada | 600x600 px |

**Ubica tus imágenes en:** `img/` (carpeta del proyecto)

---

## 🎯 Estilos y Colores

La línea del tiempo usa la **paleta de colores existente:**
- **Naranja primario:** `#FF6600` (para puntos y acentos)
- **Blanco:** `#FFFFFF` (fondo)
- **Negro:** `#0D0D0D` (texto)

### Cambiar Color de Puntos (Avanzado)

En `styles.css`, busca:
```css
.timeline-dot {
  border: 3px solid var(--orange);  /* ← Cambia este color */
}
```

---

## 📱 Responsive

La línea del tiempo es **completamente responsive**:
- **Desktop:** Alternancia izquierda-derecha
- **Tablet:** 2 columnas
- **Mobile:** 1 columna con timeline a la izquierda

---

## 🔧 Troubleshooting

### El modal no abre
- Verifica que `id="timelineModal"` exista en HTML
- Comprueba que los `data-year` coincidan con las claves en `timelineData`

### Las imágenes no se ven
- Verifica la ruta: debe ser relativa desde la raíz (ej: `img/mi_foto.jpg`)
- Comprueba que el archivo existe en la carpeta `img/`

### La línea vertical no se ve
- Está detrás de los items. Esto es intencional para el diseño minimalista.
- Para hacerla más visible, edita en `styles.css`:
  ```css
  .timeline-line {
    width: 3px;  /* Aumenta de 2px a 3px */
    background: linear-gradient(to bottom, var(--orange), var(--orange), transparent);
  }
  ```

---

## 🚀 Próximos Pasos Recomendados

1. **Reemplaza imágenes** con fotos reales
2. **Personaliza textos** con información real
3. **Prueba en mobile** (abre DevTools: F12)
4. **Elimina sección crucigrama** si ya no la usarás (o déjala comentada)
5. **Agrega más puntos** si tienes hitos adicionales

---

## 📊 Datos de Ejemplo (Completo)

Si quieres copiar y pegar, usa esto:

```javascript
const timelineData = {
  '2018': {
    title: 'Inicio en servicio público',
    description: 'Comenzó mi trayectoria en la administración pública, enfocándome en políticas de inclusión y acceso a servicios básicos para comunidades vulnerables.',
    impact: 'Participación activa en 5 programas municipales con impacto en más de 2,000 familias. Establecimiento de base comunitaria en el distrito.',
    image: 'img/foto_2018.jpg'
  },
  '2020': {
    title: 'Primera iniciativa social',
    description: 'Lanzamiento de programas de apoyo comunitario enfocados en educación, salud y emprendimiento durante tiempos difíciles.',
    impact: '500+ beneficiarios directos en programas de capacitación. 50 microempresas apoyadas. Reconocimiento estatal por iniciativa social.',
    image: 'img/foto_2020.jpg'
  },
  '2022': {
    title: 'Proyecto comunitario aprobado',
    description: 'Aprobación de iniciativa legislativa para fortalecer infraestructura comunitaria y acceso a servicios de salud especializados.',
    impact: '3 centros comunitarios construidos. 1,500+ personas beneficiadas. Presupuesto legislativo de $2.5M asignado exitosamente.',
    image: 'img/foto_2022.jpg'
  },
  '2024': {
    title: 'Diputada Local',
    description: 'Electa como Diputada Local por Jalisco, siendo la más votada del distrito 10. Compromiso renovado de representar y servir con excelencia.',
    impact: 'Más de 150,000 votos. Mandato para 3 años. Compromiso con agenda legislativa pro-comunidad basada en escucha activa.',
    image: 'img/foto_2024.jpg'
  }
};
```

---

**¡Tu página ahora es un producto premium profesional! 🎉**
