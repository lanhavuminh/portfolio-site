import { readFileSync } from 'fs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
  let text = '';
  try {
    text = readFileSync('content/about.txt', 'utf-8').trim();
  } catch (e) {
    // File doesn't exist
  }

  return {
    text
  };
};
