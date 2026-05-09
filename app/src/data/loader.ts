import type { ContentData } from '../types';

export async function loadContent(): Promise<ContentData> {
  const res = await fetch('/data/contenido.json');
  if (!res.ok) throw new Error('No se pudo cargar el contenido');
  return res.json();
}
