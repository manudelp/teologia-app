# Scripts — Extracción y Reforma de Contenido

## Propósito

Este directorio contiene el pipeline para **extraer el audio de las clases de Teología** y usar esas transcripciones para **reformar el contenido de estudio** (`contenido.json`) de manera que refleje fielmente cómo la profesora enseña.

El objetivo no es inventar contenido ni agregar información externa, sino **alinear el material de estudio con el modus operandi real de la profesora**: su lenguaje, sus énfasis, sus ejemplos, las preguntas que hace en clase, y las distinciones que considera importantes.

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
    └── batch1-gracia.md       ← Detalle del batch 1
```

## Criterios de reforma

1. **Solo lo que dice la profesora** — no se inventa contenido ni se agrega de fuentes externas.
2. **Lenguaje fiel** — usar las mismas palabras y expresiones que ella usa en clase.
3. **Priorizar lo que enfatiza** — lo que repite, lo que pregunta directamente, lo que dice "esto es importante".
4. **Formato del examen** — preguntas abarcativas, respuestas cortas, escrito.
5. **Enriquecer, no reemplazar** — se reforma y expande el contenido existente, no se borra.

## Cómo usar

### 1. Transcribir una clase nueva

Poner el audio en `audios/` y ejecutar el notebook `transcribir_clases.ipynb`.

Requisitos:
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

### 3. Crear plan de batch

Documentar en `plans/` qué secciones del `contenido.json` se van a reformar y qué se va a agregar, comparando el contenido actual con lo que dice la profesora.

### 4. Aplicar la reforma

Modificar `app/public/data/contenido.json` siguiendo el plan. Verificar con `npm run build`.
