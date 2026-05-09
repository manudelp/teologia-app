# App — Plataforma de Estudio

Aplicación web para estudiar Teología. React + TypeScript + Vite + Tailwind.

## Setup

```bash
npm install
npm run dev
```

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Build de producción |
| `npm run preview` | Preview del build |
| `npm run lint` | ESLint |

## Estructura

```
app/
├── public/data/
│   └── contenido.json       ← Todo el contenido de estudio
├── src/
│   ├── components/
│   │   ├── chuleta/         ← Vista "Repaso" (cheatsheets)
│   │   ├── flashcards/      ← Vista "Flashcards"
│   │   ├── preguntas/       ← Vista "Preguntas"
│   │   └── layout/          ← Navegación, filtros
│   ├── context/             ← AppContext (estado global)
│   └── types/               ← TypeScript types
└── index.html
```

## Datos (contenido.json)

El archivo `public/data/contenido.json` contiene:

- `chapters[]` — lista de capítulos con id, número, título y parte
- `flashcards[]` — pregunta/respuesta con prioridad (alta/media/baja)
- `cheatsheet[]` — resúmenes visuales (tipos: list, table, comparison)
- `questions[]` — preguntas de práctica estilo examen

### Tipos de cheatsheet

| Tipo | Uso |
|------|-----|
| `list` | Jerarquía, agrupaciones. Soporta sub-items, números y dividers |
| `table` | Datos paralelos con columnas (headers + rows) |
| `comparison` | Pares cortos label — description |

### Sintaxis especial en listas

| Patrón | Renderizado |
|--------|-------------|
| `"Texto normal"` | Bullet ámbar |
| `"1. Texto"` | Número ámbar |
| `"Header"` + `"  - sub"` | Header destacado + children indentados |
| `"— TITULO —"` | Divider horizontal centrado |

## Vistas

- **Repaso**: renderiza cheatsheets agrupados por capítulo. Filtrable por capítulo.
- **Flashcards**: cards con front/back, navegación por flechas.
- **Preguntas**: preguntas de práctica con respuesta oculta.
- **Stats**: progreso de estudio.
