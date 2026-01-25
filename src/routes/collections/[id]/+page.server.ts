import { loadCollectionPageData } from '$lib/server/collections';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
  try {
    return loadCollectionPageData(params.id);
  } catch (e) {
    throw error(404, `Collection ${params.id} not found`);
  }
};
