import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** All published projects, sorted by `order`, then newest year first. */
export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order || b.data.year - a.data.year);
}

/** Cover first, then screenshots — what the carousel shows. */
export function gallery(p: Project) {
  return [{ src: p.data.cover, alt: p.data.coverAlt || `${p.data.title} cover` }, ...p.data.screenshots];
}

export function statusLabel(p: Project) {
  return p.data.status === 'released' ? `Released ${p.data.year}` : 'In development';
}
