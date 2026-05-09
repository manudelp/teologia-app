# Formato del JSON de contenido

Archivo: `public/data/contenido.json`

## Estructura top-level

```json
{
  "metadata": { ... },
  "chapters": [ ... ],
  "flashcards": [ ... ],
  "cheatsheet": [ ... ],
  "questions": [ ... ]
}
```

## metadata

```json
{
  "examDate": "2026-05-29",
  "subject": "Teologia",
  "lastUpdated": "2026-05-07",
  "coversUntil": "Capitulo XIV - La Iglesia",
  "pendingTopics": ["Sacramentos: Bautismo, Confirmacion, ..."]
}
```

## chapters

```json
{
  "id": "cap15",
  "number": "XV",
  "title": "Los Sacramentos",
  "part": "Gracia, Iglesia, Sacramentos"
}
```

- `id`: identificador unico (formato `capN`)
- `number`: numero romano para display
- `title`: nombre del capitulo
- `part`: seccion tematica a la que pertenece

## flashcards

```json
{
  "id": "fc-129",
  "chapterId": "cap15",
  "front": "Pregunta o concepto",
  "back": "Respuesta o definicion",
  "priority": "alta",
  "mnemonic": "Opcional - frase mnemotecnica"
}
```

- `id`: unico, formato `fc-NNN`
- `chapterId`: referencia a un chapter.id existente
- `priority`: `"alta"` | `"media"` | `"baja"`
- `mnemonic`: (opcional) solo para listas largas

## cheatsheet

El campo `content` cambia segun el `type`:

### type: "list"

```json
{
  "id": "ch-017",
  "chapterId": "cap15",
  "type": "list",
  "title": "Los 7 Sacramentos",
  "content": ["Bautismo", "Confirmacion", "Eucaristia", "..."],
  "mnemonic": "Opcional"
}
```

### type: "table"

```json
{
  "id": "ch-018",
  "chapterId": "cap15",
  "type": "table",
  "title": "Sacramentos de iniciacion",
  "content": {
    "headers": ["Sacramento", "Materia", "Forma"],
    "rows": [
      ["Bautismo", "Agua", "Yo te bautizo..."],
      ["...", "...", "..."]
    ]
  }
}
```

### type: "comparison"

```json
{
  "id": "ch-019",
  "chapterId": "cap15",
  "type": "comparison",
  "title": "Sacramentos de vivos vs de muertos",
  "content": {
    "items": [
      { "label": "De vivos", "description": "Se reciben en estado de gracia" },
      { "label": "De muertos", "description": "Confieren la gracia (Bautismo, Penitencia)" }
    ]
  }
}
```

## questions

```json
{
  "id": "q-033",
  "chapterId": "cap15",
  "type": "desarrollo",
  "question": "Explique los sacramentos de iniciacion cristiana.",
  "answer": "Respuesta modelo completa...",
  "priority": "alta"
}
```

- `type`: `"corta"` (1-2 oraciones) o `"desarrollo"` (varios parrafos)

## Merge no destructivo

El loader de la app hace merge por ID:

- Si actualizas el JSON con contenido nuevo (ej: sacramentos), el progreso de Leitner
  sobre cards existentes con el mismo `id` se mantiene intacto en localStorage.
- Solo se pierden datos de progreso si CAMBIAS el `id` de una card existente.
- Para agregar contenido: agrega el chapter nuevo al array `chapters`, y las flashcards/
  cheatsheet/questions con sus `chapterId` apuntando al nuevo chapter.
- Los IDs deben ser unicos globalmente. Usa el patron `fc-NNN`, `ch-NNN`, `q-NNN`
  con numeros consecutivos al ultimo existente.

## Tips para extender

1. Agrega el chapter al array `chapters`
2. Agrega flashcards con IDs consecutivos (fc-129, fc-130, ...)
3. Agrega secciones de chuleta (ch-017, ch-018, ...)
4. Agrega preguntas (q-033, q-034, ...)
5. Actualiza `metadata.lastUpdated` y `metadata.coversUntil`
6. Elimina el topic de `metadata.pendingTopics`
