import { loadCollectionPageData, loadCollectionsData } from '$lib/server/collections';
import { error } from '@sveltejs/kit';
import type { EntryGenerator, PageServerLoad } from './$types';

export const entries: EntryGenerator = () => {
  const data = loadCollectionsData();
  const ids: { id: string }[] = [];
  for (const collection of data.collections) {
    if ('category' in collection) {
      for (const item of collection.items) {
        ids.push({ id: item.id });
      }
    } else {
      ids.push({ id: collection.id });
    }
  }
  return ids;
};

export const load: PageServerLoad = ({ params }) => {
  try {
    return loadCollectionPageData(params.id);
  } catch (e) {
    throw error(404, `Collection ${params.id} not found`);
  }
};
