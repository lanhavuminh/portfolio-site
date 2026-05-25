import { loadSpecialProjectPageData, loadSpecialProjectsData } from '$lib/server/special-projects';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => {
  const projects = loadSpecialProjectsData();
  return projects.map(p => ({ id: p.id }));
};

export const load: PageServerLoad = ({ params }) => {
  try {
    return loadSpecialProjectPageData(params.id);
  } catch (e) {
    throw error(404, `Special project ${params.id} not found`);
  }
};
