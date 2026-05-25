import { readFileSync } from 'fs';
import yaml from 'js-yaml';
import type { CollectionItem } from './collections';
import { loadPageData } from './collections';

interface SpecialProjectsData {
  'special-projects': CollectionItem[];
}

export function loadSpecialProjectsData(): CollectionItem[] {
  const yamlContent = readFileSync('content/special-projects.yaml', 'utf-8');
  const data = yaml.load(yamlContent) as SpecialProjectsData;
  return data['special-projects'];
}

export function findSpecialProjectById(id: string): CollectionItem | null {
  const projects = loadSpecialProjectsData();
  return projects.find(p => p.id === id) ?? null;
}

export function loadSpecialProjectPageData(id: string) {
  const project = findSpecialProjectById(id);
  if (!project) {
    throw new Error(`Special project ${id} not found`);
  }

  return loadPageData(project, 'special-projects');
}
