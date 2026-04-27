# 📹 Configuración de Videos - Crucigrama y Ruleta

¡Hola! Has agregado exitosamente el **crucigrama interactivo** y la **ruleta de propuestas** a tu página. Ahora necesitas configurar los videos. Aquí está el paso a paso:

---

## 🎬 VIDEO DEL CRUCIGRAMA (Mensaje especial de Mónica)

### Ubicación en el código:
[index.html](index.html#L245) - Busca la sección "CRUCIGRAMA INTERACTIVO"

### Instrucciones:
1. Coloca tu video en la carpeta `img/` 
2. Renómbralo a: `video_monica.mp4` (o personaliza el nombre)
3. En [index.html](index.html) busca esta línea en la sección de recompensa:
   ```html
   <source src="img/video_monica.mp4" type="video/mp4">
   ```
4. **Reemplaza** `img/video_monica.mp4` con la ruta correcta de tu video

**Duración recomendada**: 30 segundos a 1 minuto (impacto máximo)

---

## 🎡 VIDEOS DE LA RULETA (6 propuestas)

### Ubicación en el código:
[main.js](main.js) - Busca la sección "RULETA DE PROPUESTAS"

### Instrucciones:

1. **Coloca 6 videos en la carpeta `img/`** con estos nombres:
   - `propuesta1.mp4` → Iniciativa de Protección
   - `propuesta2.mp4` → Becas Educativas
   - `propuesta3.mp4` → Brigadas Médicas
   - `propuesta4.mp4` → Empoderamiento Femenino
   - `propuesta5.mp4` → Reforestación
   - `propuesta6.mp4` → Infraestructura

2. **O personaliza los nombres**: En [main.js](main.js) busca el objeto `proposals`:
   ```javascript
   const proposals = [
     {
       title: 'Iniciativa de Protección 👧',
       description: 'Protección de niñas, niños y adolescentes en el estado',
       video: 'img/propuesta1.mp4'  // ← REEMPLAZA AQUÍ
     },
     ...
   ];
   ```

### Duración recomendada para videos de propuestas:
- **15-30 segundos** cada uno (perfecto para viralizar)
- Formato vertical (9:16) o cuadrado (1:1) es más viral en redes

---

## ✅ CHECKLIST DE CONFIGURACIÓN

- [ ] Video de Mónica colocado en `img/video_monica.mp4`
- [ ] Ruta actualizada en `index.html` si usas otro nombre
- [ ] 6 videos de propuestas colocados en `img/`
- [ ] Rutas actualizadas en `main.js` si usas otros nombres
- [ ] Probaste hacer clic en "Verificar Respuestas" en el crucigrama
- [ ] Probaste hacer clic en "GIRAR RULETA"

---

## 🎯 RESPUESTAS CORRECTAS DEL CRUCIGRAMA (Para referencia)

Si necesitas cambiar las preguntas, actualiza en [main.js](main.js):

```javascript
const correctAnswers = {
  h1: 'niños',              // "niñas, niños y ___"
  h3: 'media',              // "educación ___ superior"
  h5: 'reforestación',      // "proyecto de ___ ambiental"
  v2: 'emprendimiento',     // "talleres de ___"
  v4: 'médicas',            // "brigadas ___"
  v6: 'mejora'              // "obra pública para ___ de infraestructura"
};
```

---

## 🚀 CONTENIDO VIRAL TIPS

### Para la Ruleta:
✅ Usa videos cortos y punchy (15-30 segundos)
✅ Cada video muestra UNA propuesta clave
✅ Incluye call-to-action ("Comparte esto", "Vota por Mónica", etc.)
✅ Formato vertical = mejor para Instagram Reels y TikTok

### Para el Crucigrama:
✅ El video de recompensa debe ser memorable
✅ Ideal: un saludo, promesa o mensaje positivo
✅ Incluye call-to-action para compartir

---

## 📱 CÓMO COMPARTIR

Los usuarios pueden compartir:
- ✅ El crucigrama (después de completarlo)
- ✅ Cada propuesta de la ruleta
- ✅ En Facebook, Twitter y WhatsApp

---

## ⚠️ FORMATO DE VIDEO RECOMENDADO

| Parámetro | Recomendación |
|-----------|--------------|
| **Codec** | H.264 |
| **Bitrate** | 2-5 Mbps |
| **Resolución** | 720p o 1080p |
| **Formato** | MP4 |
| **Tamaño máx** | 50 MB (para cargar rápido) |

---

## 🔧 TROUBLESHOOTING

**P: El video no aparece**
R: Verifica que:
- El archivo está en la carpeta `img/`
- La ruta en el código es correcta
- El nombre del archivo es exacto (mayúsculas importan)

**P: El crucigrama no valida las respuestas**
R: Las respuestas son case-insensitive pero deben ser exactas. Verifica `correctAnswers` en main.js

**P: La ruleta no gira**
R: Asegúrate que el navegador soporta Canvas. Prueba en Chrome o Firefox recientes.

---

¡Listo! Tu página interactiva está lista para viral. 🚀
