import { readdirSync } from 'fs';
import { join } from 'path';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
  // Load images from filesystem
  const staticPath = join('static', '/media/press');
  let images: string[] = [];
  try {
    images = readdirSync(staticPath)
      .filter(file => /\.(jpg|jpeg|png|gif|webp|mp4)$/i.test(file))
      .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  } catch (e) {
    // Images directory doesn't exist
  }

  return {
    images,
    basePath: '/media/press'
  };
};
