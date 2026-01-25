import { readdirSync } from 'fs';
import { join } from 'path';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
  // Load images from filesystem
  const staticPath = join('static', '/images/press');
  let images: string[] = [];
  try {
    images = readdirSync(staticPath)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .sort();
  } catch (e) {
    // Images directory doesn't exist
  }

  return {
    images,
    basePath: '/images/press'
  };
};
