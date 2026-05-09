# Scripts — Extracción y Reforma de Contenido

## Propósito

Este directorio contiene el pipeline para **extraer el audio de las clases de Teología** y usar esas transcripciones para **reformar el contenido de estudio** (`contenido.json`) de manera que refleje fielmente cómo la profesora enseña.

## Principio rector

**Minimizar la cantidad de estudio sin remover temas importantes.** Si hay demasiadas cards es imposible completarlo todo. Menos es más. El objetivo es un set compacto, efectivo y visualmente agradable.

## Flujo de trabajo

```
Audios de clase (.m4a)
        │
        ▼
┌─────────────────────┐
│  transcribir_clases  │  ← Whisper large-v3 (Metal/Apple Silicon)
│      .ipynb          │
└─────────────────────┘
        │
        ▼
Transcripciones (.txt)
        │
        ▼
┌─────────────────────┐
│  Análisis manual     │  ← Identificar temas, énfasis, lenguaje
│  + planes de batch   │
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│  Reforma de          │  ← Aplicar cambios al contenido.json
│  contenido.json      │     por batches ordenados
└─────────────────────┘
```

## Estructura

```
scripts/
├── README.md                  ← Este archivo
├── transcribir_clases.ipynb   ← Notebook de transcripción (Whisper + Metal)
├── audios/                    ← Audios de clase (.m4a)
├── transcripciones/           ← Salida: texto plano de cada clase
└── plans/                     ← Planes de reforma por batch
    ├── implementacion.md      ← Plan general de batches
    └── analisis-clases.md     ← Análisis detallado de cada clase
```

---

## Criterios de reforma del contenido

1. **Minimizar** — reducir sin remover temas importantes. Consolidar cards redundantes. Eliminar lo que la profesora no toca.
2. **Solo lo que dice la profesora** — no inventar contenido ni agregar de fuentes externas.
3. **Lenguaje fiel** — usar las mismas palabras y expresiones que ella usa, pero sin informalizar el tono de los textos.
4. **Priorizar lo que enfatiza** — lo que repite, lo que pregunta directamente, lo que dice "esto es importante" o "pregunta de examen".
5. **Formato del examen** — preguntas abarcativas, respuestas cortas, escrito y presencial.
6. **Consolidar, no expandir** — fusionar cards redundantes, eliminar contenido que la profesora no toca. El objetivo es un set compacto y efectivo.

---

## Reglas de escritura del contenido (contenido.json)

### Flashcards

- El `front` es la pregunta o concepto. Corto y directo.
- El `back` es la respuesta. Debe poder leerse como respuesta de examen.
- No informalizar. Mantener tono académico pero claro.
- Incorporar las fórmulas exactas de la profesora cuando las repite (ej: "querer determinar por sí solo lo que está bien y lo que está mal, sin Dios").
- Si una card tiene más de 4-5 líneas de texto, probablemente debería ser un cheatsheet.

### Cheatsheets — Reglas de formato

Los cheatsheets usan 3 tipos: `list`, `table`, `comparison`. La clave es **variar** según el contenido:

#### Cuándo usar cada tipo:

| Tipo | Usar cuando... | Ejemplo |
|------|---------------|---------|
| `list` | Hay jerarquía, agrupaciones, o mezcla de conceptos | Fe, Revelación, Iglesia |
| `table` | Son datos paralelos/estructurados con columnas claras | Atributos de Dios, Estados de la naturaleza, Dogmas marianos |
| `comparison` | Son pares cortos label-descripción tipo glosario | Tipos de culto, Errores fe/razón |

#### Reglas para `list`:

**Viñetas planas** (se renderizan con bullet ámbar):
```json
"Texto directo sin prefijo especial"
```
Usar cuando el item es autocontenido y no necesita explicación adicional.

**Headers con sub-items** (header en fondo gris + children indentados con borde ámbar):
```json
"Titulo del concepto",
"  - Explicación o detalle 1",
"  - Explicación o detalle 2"
```
Usar cuando un concepto necesita desglose. El header es el "qué", los children son el "cómo/por qué".

**NO abusar de sub-items.** Si el sub-item es solo una aclaración corta, integrarlo en la misma línea del bullet padre. Solo usar sub-items cuando realmente hay múltiples puntos subordinados.

**Ejemplo malo:**
```json
"VIRTUDES CARDINALES: Prudencia, Justicia, Fortaleza, Templanza",
"  - Remedian las 4 heridas del pecado original"
```

**Ejemplo bueno:**
```json
"VIRTUDES CARDINALES: Prudencia, Justicia, Fortaleza, Templanza. Remedian las 4 heridas del pecado original."
```

**Items numerados** (se renderizan con número ámbar en vez de bullet):
```json
"1. Primer paso",
"2. Segundo paso"
```
Usar cuando el ORDEN importa o cuando la profesora los enumera explícitamente (ej: "5 condiciones para una buena confesión", "4 fines de la Misa").

**Dividers** (línea horizontal con título centrado en uppercase):
```json
"— TITULO DE SECCION —"
```
Usar para separar bloques temáticos dentro de un mismo cheatsheet. Da respiro visual.

#### Regla de oro para elegir formato:

- **¿Es un dato corto y paralelo a otros?** → tabla o comparison
- **¿Tiene jerarquía natural (concepto → explicación)?** → list con sub-items
- **¿Es una lista plana de items independientes?** → list con bullets
- **¿Tiene un orden que importa?** → list con números
- **¿Es texto que se explica solo?** → bullet plano (sin sub-items ni headers)

#### Anti-patrones a evitar:

1. **Todo comparison** — se ve monótono, como un muro de "label — desc"
2. **Todo bullets** — se ve como un documento sin estructura
3. **Sub-items innecesarios** — si solo hay 1 sub-item, integrarlo en el padre
4. **"TITULO: descripción larga"** en bullets planos — mejor usar header + sub-items
5. **Cheatsheets de más de ~15 items** — probablemente hay que dividir o usar tabla

---

## Reglas de desarrollo (app)

### Tipos de datos (contenido.json)

```typescript
// Flashcard
{
  id: string,          // fc-001, fc-002...
  chapterId: string,   // cap1, cap2...
  front: string,       // pregunta
  back: string,        // respuesta
  priority: "alta" | "media" | "baja"
}

// Cheatsheet
{
  id: string,          // ch-001, ch-002...
  chapterId: string,
  type: "list" | "table" | "comparison",
  title: string,
  content: string[] | TableData | ComparisonData,
  priority: "alta" | "media" | "baja"
}

// TableData = { headers: string[], rows: string[][] }
// ComparisonData = { items: { label: string, description: string }[] }
```

### Convenciones de IDs

- Flashcards: `fc-001` a `fc-999`
- Cheatsheets: `ch-001` a `ch-999`
- Questions: `q-001` a `q-999`
- No duplicar IDs nunca

### Vista "Repaso" (ChuletaView)

- Solo renderiza **cheatsheets** (no flashcards ni questions)
- Si un capítulo no tiene cheatsheets, muestra "No hay contenido de repaso"
- Cada capítulo debe tener al menos 1 cheatsheet

### Sintaxis especial en listas

| Patrón en el JSON | Renderizado |
|---|---|
| `"Texto normal"` | Bullet ámbar + texto |
| `"1. Texto"` | Número ámbar + texto |
| `"Titulo con sub-items"` seguido de `"  - sub"` | Header gris + children indentados |
| `"— TITULO —"` | Divider horizontal con texto centrado |

---

## Cómo usar

### 1. Transcribir una clase nueva

Poner el audio en `audios/` y ejecutar el notebook `transcribir_clases.ipynb`.

```bash
pip install mlx-whisper mutagen
brew install ffmpeg
```

### 2. Analizar la transcripción

Leer la transcripción e identificar:
- Qué temas cubre
- Qué enfatiza y repite
- Qué preguntas hace a los alumnos
- Qué ejemplos y analogías usa
- Qué distinciones marca (ej: "esto NO es lo mismo que...")

### 3. Aplicar la reforma

Modificar `app/public/data/contenido.json` siguiendo los criterios de arriba. Verificar con `npx tsc --noEmit`.

---

## Estado actual del contenido

| Métrica | Original | Actual | Reducción |
|---------|----------|--------|----------|
| Flashcards | 250 | 116 | -54% |
| Cheatsheets | 67 | 27 | -60% |
| Questions | 60 | 43 | -28% |
| Capítulos | 17 | 16 | -1 |

Todo alineado con las 8 clases de la profesora (6 mar → 8 may 2026).

### Distribución de prioridades

**Flashcards:**
| Prioridad | Cantidad | % | Criterio |
|-----------|----------|---|----------|
| Alta | 42 | 36% | "Pregunta de examen", definiciones que repite en cada clase |
| Media | 24 | 21% | Importante pero no lo primero que estudiaría |
| Baja | 50 | 43% | Detalle complementario |

**Questions:**
| Prioridad | Cantidad | % | Criterio |
|-----------|----------|---|----------|
| Alta | 19 | 44% | Lo que la profesora haría en el examen |
| Media | 24 | 56% | Segundo nivel, importante pero no crítico |

### Criterio para asignar prioridades

- **Alta**: la profesora lo marca explícitamente como "pregunta de examen", lo repite en CADA clase, o es una definición fundamental que pregunta a los alumnos directamente.
- **Media**: contenido importante que la profesora cubre pero no enfatiza como crítico. Segundo nivel de estudio.
- **Baja**: detalle complementario, temas que la profesora apenas roza o que están cubiertos por otros items de mayor prioridad.
