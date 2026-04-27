# 🧪 GUÍA DE TESTING - Crucigrama y Ruleta

## ✅ CHECKLIST ANTES DE PUBLICAR

### 1. CRUCIGRAMA INTERACTIVO

#### A. Estructura Visual
- [ ] La sección crucigrama es visible al navegar
- [ ] El título "¿Sabes de mis propuestas?" está visible
- [ ] Todas las 6 preguntas se ven correctamente
- [ ] Los inputs están bien diseñados

#### B. Funcionalidad de Inputs
- [ ] Puedo escribir en los inputs
- [ ] Se aceptan mayúsculas y minúsculas
- [ ] El placeholder dice "Respuesta"
- [ ] Hay límite de caracteres visual

#### C. Validación
**PRUEBA 1: Respuestas Correctas**
```
Ingresa:
- H1: "niños"
- H3: "media"
- H5: "reforestación"
- V2: "emprendimiento"
- V4: "médicas"
- V6: "mejora"

Resultado esperado:
✅ ¡CORRECTO! Desbloqueando video especial...
→ Después de 1 segundo, el crucigrama desaparece
→ Aparece sección "🎁 ¡DESBLOQUEADO!"
```

**PRUEBA 2: Respuestas Incorrectas**
```
Ingresa respuestas aleatorias

Resultado esperado:
❌ Algunas respuestas no son correctas. Intenta de nuevo.
→ El crucigrama se mantiene visible
```

**PRUEBA 3: Campos Vacíos**
```
No ingresa nada, hace clic en "Verificar Respuestas"

Resultado esperado:
📝 Completa todas las respuestas primero
```

#### D. Video Desbloqueado
- [ ] Aparece sección con fondo naranja-oscuro
- [ ] Muestra badge "🎁 ¡DESBLOQUEADO!"
- [ ] Título "Mensaje Especial de Mónica"
- [ ] Video carga correctamente
- [ ] Video tiene controles (play, pausa, volumen)
- [ ] Botones de compartir funcionan

#### E. Compartir desde Crucigrama
- [ ] Click en "Facebook" → Abre Facebook
- [ ] Click en "Twitter" → Abre Twitter
- [ ] Click en "WhatsApp" → Abre WhatsApp con mensaje

---

### 2. RULETA DE PROPUESTAS

#### A. Estructura Visual
- [ ] La sección ruleta es visible
- [ ] El canvas (ruleta) se dibuja correctamente
- [ ] La ruleta tiene 6 secciones de colores
- [ ] Hay puntero en la parte superior
- [ ] Botón "GIRAR RULETA" es visible y funcional

#### B. Funcionalidad de Giro
**PRUEBA 1: Primer giro**
```
1. Click en "GIRAR RULETA"
2. Observar:
   - La ruleta gira suavemente
   - La rotación dura ~3 segundos
   - Gira mínimo 5 vueltas completas
   - El giro es aleatorio (cada vez diferente)
```

**PRUEBA 2: Múltiples giros**
```
1. Gira 3-4 veces seguidas
2. Observar:
   - Cada giro es diferente
   - No hay errores en consola
   - El botón se deshabilita durante giro
   - Se habilita después
```

#### C. Resultado del Giro
- [ ] Aparece sección "resultado" después del giro
- [ ] Muestra propuesta (ejemplo: "Becas Educativas 🎒")
- [ ] Muestra descripción de la propuesta
- [ ] Video carga correctamente
- [ ] Video tiene controles

#### D. Botones de Resultado
- [ ] "Girar de Nuevo" - vuelve a girar la ruleta
- [ ] "Compartir 📲" - abre WhatsApp con propuesta

#### E. Animaciones
- [ ] Transiciones suaves
- [ ] Sin stuttering
- [ ] Botón pulsea durante giro

---

### 3. RESPONSIVENESS (Todas las resoluciones)

#### Desktop (1920x1080)
- [ ] Crucigrama bien posicionado
- [ ] Ruleta: lado izquierdo, resultado lado derecho
- [ ] Todos los elementos se ven correctamente
- [ ] Sin barras de scroll horizontal

#### Tablet (768x1024)
- [ ] Elementos se reorganizan a 1 columna si es necesario
- [ ] Videos se ven bien
- [ ] Inputs se expanden adecuadamente
- [ ] Botones son clickeables (sin overlap)

#### Mobile (375x667)
- [ ] Crucigrama: inputs fullwidth
- [ ] Ruleta: canvas responsivo
- [ ] Videos fullwidth
- [ ] Botones stacked verticalmente
- [ ] Navbar hamburger funciona
- [ ] Sin elementos fuera de pantalla

---

### 4. VIDEOS

#### Crucigrama
```
Ubicación esperada: img/video_monica.mp4

Checklist:
- [ ] Archivo existe
- [ ] Formato MP4
- [ ] Duracion: 30-60 segundos
- [ ] Carga correctamente
- [ ] Audio funciona
- [ ] Controles funcionan
- [ ] Se puede compartir
```

#### Ruleta (x6)
```
Ubicaciones esperadas:
- [ ] img/propuesta1.mp4 → Iniciativa Protección
- [ ] img/propuesta2.mp4 → Becas
- [ ] img/propuesta3.mp4 → Brigadas Médicas
- [ ] img/propuesta4.mp4 → Empoderamiento
- [ ] img/propuesta5.mp4 → Reforestación
- [ ] img/propuesta6.mp4 → Infraestructura

Para cada video:
- [ ] Archivo existe
- [ ] Formato MP4
- [ ] Duración: 15-30 segundos
- [ ] Carga correctamente
- [ ] Audio funciona
- [ ] Se ve bien en móvil (vertical si es posible)
```

---

### 5. NAVEGACIÓN

#### Links del Navbar
- [ ] "Crucigrama" → Lleva a #crucigrama (smooth scroll)
- [ ] "Ruleta" → Lleva a #ruleta (smooth scroll)
- [ ] "Contacto" → Lleva a #contacto
- [ ] "Sobre Mí" → Lleva a #sobre-mi
- [ ] "Logros" → Lleva a #logros

#### Links Internos
- [ ] Todos los links # funcionan
- [ ] El navbar se ajusta (altura considerada en scroll)
- [ ] Mobile: hamburger menu abre/cierra
- [ ] Mobile: click en link cierra menú

---

### 6. COMPATIBILIDAD DE NAVEGADORES

Prueba en:
- [ ] Chrome (última versión)
- [ ] Firefox (última versión)
- [ ] Safari (si es Mac)
- [ ] Edge (si es Windows)
- [ ] Mobile Safari (si es iPhone)
- [ ] Chrome Mobile (si es Android)

**Detalles a revisar por navegador:**
- Canvas de ruleta se dibuja
- Videos cargan y reproducen
- Animaciones son suaves
- Inputs funcionan
- Botones respondent al hover/focus

---

### 7. CONSOLA DE NAVEGADOR

```
Abre: F12 o Ctrl+Shift+I → Pestaña "Console"

Debería estar:
✅ LIMPIA (sin errores rojos)

Si hay errores:
❌ Anota el error exacto
❌ Verifica la ruta de los videos
❌ Verifica que los archivos existen
```

---

### 8. PERFORMANCE

#### Carga Inicial
- [ ] Página carga en <3 segundos
- [ ] No se congela
- [ ] Todas las fuentes cargan correctamente

#### Interacción
- [ ] Crucigrama responde inmediatamente
- [ ] Ruleta gira sin lag
- [ ] Videos inician sin delay
- [ ] Botones responden al click

#### Memoria
- [ ] Abre DevTools → Performance
- [ ] Recarga página
- [ ] Ejecuta crucigrama → No memory leak
- [ ] Ejecuta ruleta 5 veces → No memory leak

---

## 📋 CHECKLIST FINAL

```
ANTES DE PUBLICAR:
[ ] Videos colocados en img/
[ ] Todas las pruebas pasan
[ ] Sin errores en consola
[ ] Funciona en mobile
[ ] Funciona en desktop
[ ] Links de redes funcionan
[ ] Animaciones son suaves
[ ] Videos se escuchan bien
[ ] Botones son accesibles
[ ] Responsive en todas resoluciones
```

---

## 🚨 TROUBLESHOOTING

### El crucigrama no valida
**Síntomas:** Siempre dice "respuestas incorrectas"
**Solución:**
1. Abre DevTools (F12)
2. Consola → Escribe: `correctAnswers`
3. Verifica que los valores sean exactos
4. Las respuestas son case-insensitive, pero sin espacios

### La ruleta no gira
**Síntomas:** Botón clickeable pero no pasa nada
**Solución:**
1. Abre DevTools
2. Consola → No hay errores
3. Verifica que el canvas tiene ID `wheelCanvas`
4. Prueba en Chrome (mejor soporte)

### Los videos no cargan
**Síntomas:** Player gris, sin video
**Solución:**
1. Verifica que los archivos existen en `img/`
2. Verifica nombres exactos:
   - `video_monica.mp4`
   - `propuesta1.mp4` ... `propuesta6.mp4`
3. Verifica rutas en index.html y main.js
4. Intenta formato H.264 MP4

### Página lenta/congela
**Síntomas:** Lag al girar, inputs lentos
**Solución:**
1. Verifica tamaño de videos (<50MB cada uno)
2. Reduce resolución a 720p
3. Comprime videos
4. Prueba sin videos primero (usa placeholders)

---

## 📞 PREGUNTAS FRECUENTES - Testing

**P: ¿Qué es un memory leak?**
R: Cuando la página usa cada vez más memoria sin liberarla. Gira la ruleta 10 veces y revisa que el uso de RAM no cambie mucho.

**P: ¿Necesito los 6 videos para que funcione?**
R: No, puedes usar placeholders o dejar `img/propuesta1.mp4` sin existir por ahora. El player mostrará un error, pero la ruleta girará.

**P: ¿Las mayúsculas/minúsculas importan?**
R: No en el crucigrama. Se convierte todo a lowercase antes de validar.

**P: ¿Puedo cambiar las propuestas?**
R: Sí, edita el array `proposals` en main.js y agrega tus propuestas.

---

**Última actualización:** 2025
**Estado:** Listo para testing
