import { readFileSync, readdirSync } from 'fs';
import yaml from 'js-yaml';
import { join } from 'path';

interface Look {
  id: string;
  subtitle: string;
}

interface CollectionItem {
  id: string;
  title: string;
  looks?: Look[];
}

interface CollectionCategory {
  category: string;
  items: CollectionItem[];
}

type Collection = CollectionCategory | CollectionItem;

interface CollectionsData {
  collections: Collection[];
}

function isCategory(item: Collection): item is CollectionCategory {
  return 'category' in item;
}

export function loadCollectionsData(): CollectionsData {
  const yamlContent = readFileSync('content/collections.yaml', 'utf-8');
  return yaml.load(yamlContent) as CollectionsData;
}

export function findCollectionById(id: string): CollectionItem | null {
  const data = loadCollectionsData();

  // Check collections
  for (const collection of data.collections) {
    if (isCategory(collection)) {
      const found = collection.items.find(item => item.id === id);
      if (found) return found;
    } else {
      if (collection.id === id) return collection;
    }
  }

  return null;
}

interface LookData {
  id: string;
  subtitle: string;
  description: string;
  images: string[];
  basePath: string;
}

export function loadCollectionPageData(id: string) {
  const collection = findCollectionById(id);
  if (!collection) {
    throw new Error(`Collection ${id} not found`);
  }

  // Load main description
  const descriptionFile = `collections/${id}.txt`;
  let description = '';
  try {
    description = readFileSync(join('content', descriptionFile), 'utf-8').trim();
  } catch (e) {
    // Description file doesn't exist or is empty
  }

  // Check if collection has looks
  if (collection.looks && collection.looks.length > 0) {
    const looks: LookData[] = collection.looks.map(look => {
      const lookDescriptionFile = `collections/${id}/${look.id}.txt`;
      const lookImagesPath = `/images/${id}/${look.id}`;

      // Load look description
      let lookDescription = '';
      try {
        lookDescription = readFileSync(join('content', lookDescriptionFile), 'utf-8').trim();
      } catch (e) {
        // Description file doesn't exist or is empty
      }

      // Load look images
      const lookStaticPath = join('static', lookImagesPath);
      let lookImages: string[] = [];
      try {
        lookImages = readdirSync(lookStaticPath)
          .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
          .sort();
      } catch (e) {
        // Images directory doesn't exist
      }

      return {
        id: look.id,
        subtitle: look.subtitle,
        description: lookDescription,
        images: lookImages,
        basePath: lookImagesPath
      };
    });

    return {
      title: collection.title,
      description,
      looks
    };
  } else {
    // No looks - load images directly from collection folder
    const imagesPath = `/images/${id}`;
    const staticPath = join('static', imagesPath);
    let images: string[] = [];
    try {
      images = readdirSync(staticPath)
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .sort();
    } catch (e) {
      // Images directory doesn't exist
    }

    return {
      title: collection.title,
      description,
      images,
      basePath: imagesPath
    };
  }
}
