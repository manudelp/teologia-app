# Teología

Plataforma de estudio para la materia Teología (Ingeniería, USAL Pilar). Contiene flashcards, cheatsheets de repaso y preguntas de práctica alineadas con las clases de la profesora.

## Estructura

```
teologia/
├── app/                  ← Aplicación web (React + Vite)
│   ├── public/data/      ← contenido.json (flashcards, cheatsheets, preguntas)
│   └── src/              ← Código fuente
├── scripts/              ← Pipeline de transcripción y reforma de contenido
│   ├── audios/           ← Audios de clase (.m4a)
│   ├── transcripciones/  ← Transcripciones (Whisper)
│   └── plans/            ← Análisis y planes de reforma
└── CONTENIDO_TEOLOGIA.md
```

## Uso rápido

```bash
cd app
npm install
npm run dev
```

## Contenido

El material de estudio está en `app/public/data/contenido.json`:

- **116 flashcards** — conceptos clave con pregunta/respuesta
- **27 cheatsheets** — resúmenes visuales por capítulo (tablas, listas, comparaciones)
- **43 preguntas** — estilo examen (cortas y desarrollo)
- **16 capítulos** — desde Teología Fundamental hasta Sacramentos

Todo el contenido está alineado con las 8 clases dictadas (marzo–mayo 2026) y priorizado según lo que la profesora enfatiza como "pregunta de examen".

## Pipeline de contenido

Ver [`scripts/README.md`](scripts/README.md) para el proceso completo de transcripción, análisis y reforma del contenido.
