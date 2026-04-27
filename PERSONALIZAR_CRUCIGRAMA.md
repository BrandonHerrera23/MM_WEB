# 🎨 GUÍA VISUAL - Cómo Personalizar el Crucigrama

## 📍 UBICACIÓN DEL CÓDIGO

**Archivo:** main.js
**Línea:** ~178-186 (búsqueda: `const crosswordData`)

---

## 🔍 ENTENDIENDO LA ESTRUCTURA

### El Grid
```javascript
const crosswordData = {
  grid: [
    ['N', 'I', 'Ñ', 'O', 'S', '', ''],    // Fila 0
    ['I', '', '', '', '', '', ''],        // Fila 1
    ['M', 'E', 'D', 'I', 'A', 'S', ''],  // Fila 2
    ...
  ]
}
```

**Explicación:**
- Cada fila es un array de letras
- `''` (comillas vacías) = celda bloqueada (negra)
- Letra = celda activa con esa letra

**Visual:**
```
N I Ñ O S . .
I . . . . . .
M E D I A S .
E . . . . . .
D . . . . . .
I . . . . . .
A . . . . . .

• = letra
. = bloqueada (vacía en el grid)
```

---

## 📋 LAS PALABRAS (PISTAS)

```javascript
const crosswordData = {
  grid: [...],
  words: [
    {
      clue: 'Iniciativa de ley para protección de ___ y adolescentes',
      answer: 'NIÑOS',
      direction: 'H',           // H = horizontal, V = vertical
      row: 0,                   // Comienza en fila 0
      col: 0,                   // Comienza en columna 0
      positions: [[0,0],[0,1],[0,2],[0,3],[0,4]]  // Celdas que ocupa
    },
    ...
  ]
}
```

### Qué significa cada campo:

| Campo | Valor | Ejemplo |
|-------|-------|---------|
| `clue` | La pista completa | "Iniciativa de ley..." |
| `answer` | La respuesta esperada | "NIÑOS" |
| `direction` | Dirección | 'H' o 'V' |
| `row` | Fila de inicio | 0 (primera fila) |
| `col` | Columna de inicio | 0 (primera columna) |
| `positions` | Array de [fila,col] | [[0,0],[0,1]...] |

---

## 📐 CÓMO CALCULAR POSITIONS

### Para NIÑOS horizontal (fila 0, de col 0 a 4)
```
Palabra: N I Ñ O S
Fila:    0 0 0  0  0  (siempre igual en horizontal)
Col:     0 1 2  3  4  (incrementa en 1)

Result: [[0,0], [0,1], [0,2], [0,3], [0,4]]
```

### Para NIÑOS vertical (col 0, de fila 0 a 6)
```
Palabra: N I M E D I A
Fila:    0 1 2 3 4 5 6  (incrementa en 1)
Col:     0 0 0 0 0 0 0  (siempre igual en vertical)

Result: [[0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0]]
```

---

## 🛠️ EJEMPLO: CAMBIAR UNA PALABRA

### Paso 1: Entender la palabra actual
```javascript
{
  clue: 'Iniciativa de ley para protección de ___ y adolescentes',
  answer: 'NIÑOS',
  direction: 'H',
  row: 0,
  col: 0,
  positions: [[0,0],[0,1],[0,2],[0,3],[0,4]]
}
```

### Paso 2: Cambiar solo la pista (SIN cambiar grid)
```javascript
{
  clue: 'Otro significado importante para __',  // ← Cambiar
  answer: 'NIÑOS',  // ← Dejar igual si grid es igual
  direction: 'H',
  row: 0,
  col: 0,
  positions: [[0,0],[0,1],[0,2],[0,3],[0,4]]
}
```

### Paso 3: Si cambias la palabra, actualiza TODO
```javascript
// ANTES: NIÑOS (5 letras)
// AHORA: BECAS (5 letras - mismo tamaño)

{
  clue: 'Programa de ___ para estudiantes',
  answer: 'BECAS',      // ← Nueva palabra
  direction: 'H',
  row: 0,
  col: 0,
  positions: [[0,0],[0,1],[0,2],[0,3],[0,4]]
}

// Y actualizar grid fila 0:
// grid[0] = ['B', 'E', 'C', 'A', 'S', '', '']  // ← Cambiar
```

---

## 🎯 EJEMPLO PRÁCTICO: CREAR UN CRUCIGRAMA NUEVO

### Paso 1: Diseña el grid en papel
```
    0 1 2 3 4 5 6
0   S O L . . . .
1   . . . . . . .
2   L U Z . . . .
3   . . . . . . .
4   . . . . . . .
5   . . . . . . .
6   . . . . . . .

Palabras:
- 1H: SOL (fila 0, cols 0-2)
- 2H: LUZ (fila 2, cols 0-2)
- 1V: SOL (col 0, filas 0-2, pero SOL es S-O-L no S-L-?)
```

Espera, hay un error. Déjame revisar:
```
Col 0 tiene: S (fila 0), L (fila 2), ? (fila 4)
Eso sería S-L-? = SL?, no es palabra

Necesito que se crucen mejor:
- SOL horizontal: S(0,0)-O(0,1)-L(0,2)
- Vertical en col 0: S(0,0) baja pero luego viene L(2,0) que no es O

Mejor:
    0 1 2
0   S O L
1   O . .
2   L . .

- 1H SOL: S(0,0)-O(0,1)-L(0,2)
- 1V SOL: S(0,0)-O(1,0)-L(2,0)
```

### Paso 2: Actualiza el grid en main.js
```javascript
const crosswordData = {
  grid: [
    ['S', 'O', 'L'],
    ['O', '', ''],
    ['L', '', '']
  ],
  words: [...]
}
```

### Paso 3: Define las palabras
```javascript
words: [
  {
    clue: 'Astro que brilla en el cielo',
    answer: 'SOL',
    direction: 'H',
    row: 0,
    col: 0,
    positions: [[0,0], [0,1], [0,2]]
  },
  {
    clue: 'Astro que brilla en la noche',
    answer: 'SOL',  // Sí, la misma palabra en dos direcciones
    direction: 'V',
    row: 0,
    col: 0,
    positions: [[0,0], [1,0], [2,0]]
  }
]
```

### Paso 4: Verifica
- Todos los `row, col` están correctos? ✓
- Todos los `positions` son correctos? ✓
- El `grid` tiene las letras en esas posiciones? ✓
- Las longitudes coinciden? ✓

---

## ⚠️ ERRORES COMUNES

### Error 1: Positions no coinciden con grid
```javascript
// INCORRECTO:
grid: [['N', 'I', 'Ñ']],
words: [{
  positions: [[0,0], [0,1], [0,2], [0,3], [0,4]]  // ← Fuera de rango!
}]

// CORRECTO:
grid: [['N', 'I', 'Ñ', 'O', 'S']],
words: [{
  positions: [[0,0], [0,1], [0,2], [0,3], [0,4]]  // ← Correcto
}]
```

### Error 2: Grid con tamaño inconsistente
```javascript
// INCORRECTO:
grid: [
  ['N', 'I', 'Ñ', 'O', 'S'],
  ['I'],  // ← ¡Menor tamaño!
  ['M', 'E', 'D', 'I', 'A']
]

// CORRECTO:
grid: [
  ['N', 'I', 'Ñ', 'O', 'S', '', ''],
  ['I', '', '', '', '', '', ''],
  ['M', 'E', 'D', 'I', 'A', '', '']
]
```

### Error 3: Answer no coincide con grid
```javascript
// INCORRECTO:
grid[0] = ['N', 'I', 'Ñ', 'O', 'S']
words: [{
  answer: 'NIÑO'  // ← Debería ser NIÑOS
}]

// CORRECTO:
grid[0] = ['N', 'I', 'Ñ', 'O', 'S']
words: [{
  answer: 'NIÑOS'  // ← Coincide
}]
```

---

## 🔢 NUMERACIÓN AUTOMÁTICA

El sistema automaticamente numera las palabras según:
1. Primera palabra es #1
2. Segunda es #2
3. Etc.

**Ejemplo:**
```
Palabra 0 (NIÑOS horizontal) → #1
Palabra 1 (NIÑOS vertical)   → #2
Palabra 2 (MEDIAS horizontal) → #3
...
```

Si una celda es inicio de TWO palabras, muestra ambos números:
```javascript
// Si en (0,0) inician tanto una horizontal como vertical:
// El número sería: "1,2"
```

---

## ✂️ SNIPPET: Copiar y Pegar

### Para agregar una palabra rápidamente:
```javascript
{
  clue: 'TU PISTA AQUÍ',
  answer: 'TUPALABRA',
  direction: 'H',  // o 'V'
  row: 0,          // Modifica según posición
  col: 0,          // Modifica según posición
  positions: [     // Calcula según dirección
    [0,0], [0,1], [0,2]  // Ejemplo para 3 letras horizontal
  ]
}
```

---

## 📱 GRID RECOMENDADO

Para que funcione bien en móvil, usa:
- **7x7** o **8x8** máximo
- Palabras de **5-8 letras**
- Mínimo 3 cruces

```javascript
grid: [
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '']
]
```

---

## 🎬 VALIDACIÓN

El sistema valida verificando:
1. ¿Todas las celdas están llenas? → Si no, error
2. ¿Cada letra coincide con el grid? → Si no, error
3. ¿Todo coincide? → ¡ÉXITO! Desbloquea video

**No necesitas cambiar nada en la lógica de validación**, funciona automáticamente con tu grid.

---

## 🚀 PASO A PASO: CAMBIAR TU CRUCIGRAMA

### 1. Abre main.js en editor
Busca: `const crosswordData = {`

### 2. Diseña nuevo grid (en papel)
Anota filas y columnas

### 3. Actualiza `grid: [...]`
Reemplaza cada fila

### 4. Define cada palabra
Número, pista, posiciones

### 5. Guarda archivo

### 6. Abre index.html en navegador
Scroll a sección crucigrama

### 7. Prueba
¿Se ve bien? ¿Las pistas son correctas?

### 8. Llena el crucigrama
Verifica que la validación funcione

---

## 💡 TIPS PROFESIONALES

✅ Usa palabras cortas (5-8 letras)
✅ Asegúrate que palabras se crucen
✅ Las pistas deben ser claras
✅ Evita palabras obscuras
✅ Prueba en mobile
✅ Haz que sea desafiante pero NO imposible
✅ Relaciona todas las pistas con tus propuestas

---

## 📞 ¿NECESITAS AYUDA?

Si no entiendes:
1. **Positions:** Usa la tabla de ejemplo arriba
2. **Grid:** Dibuja en papel primero
3. **Validación:** El sistema es automático, no toques la lógica
4. **Responsive:** Mantén grid en 7x7 máximo

---

**¡Listo para personalizar tu crucigrama! 🧩**
