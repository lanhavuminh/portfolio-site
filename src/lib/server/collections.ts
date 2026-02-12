import { readFileSync, readdirSync } from 'fs';
import yaml from 'js-yaml';
import { join } from 'path';

interface Section {
  id: string;
  subtitle: string;
}

interface CollectionItem {
  id: string;
  title: string;
  sections?: Section[];
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

interface SectionData {
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

  // Check if collection has sections
  if (collection.sections && collection.sections.length > 0) {
    const sections: SectionData[] = collection.sections.map(section => {
      const sectionDescriptionFile = `collections/${id}/${section.id}.txt`;
      const sectionImagesPath = `/media/${id}/${section.id}`;

      // Load section description
      let sectionDescription = '';
      try {
        sectionDescription = readFileSync(join('content', sectionDescriptionFile), 'utf-8').trim();
      } catch (e) {
        // Description file doesn't exist or is empty
      }

      // Load section images
      const sectionStaticPath = join('static', sectionImagesPath);
      let sectionImages: string[] = [];
      try {
        sectionImages = readdirSync(sectionStaticPath)
          .filter(file => /\.(jpg|jpeg|png|gif|webp|mp4)$/i.test(file))
          .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
      } catch (e) {
        // Images directory doesn't exist
      }

      return {
        id: section.id,
        subtitle: section.subtitle,
        description: sectionDescription,
        images: sectionImages,
        basePath: sectionImagesPath
      };
    });

    return {
      title: collection.title,
      description,
      sections
    };
  } else {
    // No sections - load images directly from collection folder
    const imagesPath = `/media/${id}`;
    const staticPath = join('static', imagesPath);
    let images: string[] = [];
    try {
      images = readdirSync(staticPath)
        .filter(file => /\.(jpg|jpeg|png|gif|webp|mp4)$/i.test(file))
        .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
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
