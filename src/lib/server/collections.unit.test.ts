import { describe, test, expect, beforeEach, vi } from 'vitest';
import { loadCollectionsData, findCollectionById, loadCollectionPageData } from './collections';
import { readFileSync, readdirSync } from 'fs';

// We're testing the actual implementation with real files
describe('Collections utility functions', () => {
  describe('loadCollectionsData', () => {
    test('should load and parse YAML data', () => {
      const data = loadCollectionsData();

      expect(data).toHaveProperty('collections');
      expect(Array.isArray(data.collections)).toBe(true);
      expect(data.collections.length).toBeGreaterThan(0);
    });
  });

  describe('findCollectionById', () => {
    test('should find collection in nested category', () => {
      const collection = findCollectionById('lcf-one-ptct');

      expect(collection).not.toBeNull();
      expect(collection?.id).toBe('lcf-one-ptct');
      expect(collection?.title).toBe('Product Technology, Creative Techniques');
    });

    test('should find standalone collection', () => {
      const collection = findCollectionById('fara-x-lcf');

      expect(collection).not.toBeNull();
      expect(collection?.id).toBe('fara-x-lcf');
      expect(collection?.title).toBe('FARA X LCF');
    });

    test('should return null for non-existent collection', () => {
      const collection = findCollectionById('non-existent-id');

      expect(collection).toBeNull();
    });

    test('should find all collections by ID', () => {
      // Test a few known collections
      const ids = ['lcf-one-cpd', 'lcf-two-ppi', 'lcf-three', 'end-of-the-world'];

      ids.forEach(id => {
        const collection = findCollectionById(id);
        expect(collection).not.toBeNull();
        expect(collection?.id).toBe(id);
      });
    });
  });

  describe('loadCollectionPageData', () => {
    test('should load collection without looks', () => {
      const data = loadCollectionPageData('lcf-one-cpd');

      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('description');
      expect(data).toHaveProperty('images');
      expect(data).toHaveProperty('basePath');
      expect(data.basePath).toBe('/images/lcf-one-cpd');
    });

    test('should load collection with looks', () => {
      const data = loadCollectionPageData('lcf-three');

      expect(data).toHaveProperty('title');
      expect(data).toHaveProperty('description');
      expect(data).toHaveProperty('looks');

      if ('looks' in data && data.looks) {
        expect(data.looks.length).toBe(3);

        // Check first look structure
        const look1 = data.looks[0];
        expect(look1).toHaveProperty('id');
        expect(look1).toHaveProperty('subtitle');
        expect(look1).toHaveProperty('description');
        expect(look1).toHaveProperty('images');
        expect(look1).toHaveProperty('basePath');
      }
    });

    test('should throw error for non-existent collection', () => {
      expect(() => {
        loadCollectionPageData('fake-collection');
      }).toThrow('Collection fake-collection not found');
    });

    test('should handle collections with no images gracefully', () => {
      const data = loadCollectionPageData('end-of-the-world');

      expect(data).toHaveProperty('images');
      // Should be empty array if no images exist
      expect(Array.isArray(data.images)).toBe(true);
    });

    test('should load description when available', () => {
      const data = loadCollectionPageData('lcf-three');

      // Description might be empty or have content
      expect(typeof data.description).toBe('string');
    });

    test('should derive correct paths from ID', () => {
      const data = loadCollectionPageData('lcf-two-isp');

      expect(data.basePath).toBe('/images/lcf-two-isp');
    });
  });

  describe('Image loading', () => {
    test('should load images from collection folders', () => {
      const data = loadCollectionPageData('lcf-one-ptct');

      if ('images' in data) {
        // Should only include valid image formats
        data.images.forEach((img: string) => {
          expect(img).toMatch(/\.(jpg|jpeg|png|gif|webp)$/i);
        });
      }
    });

    test('should sort images', () => {
      const data = loadCollectionPageData('lcf-one-cpd');

      if ('images' in data && data.images.length > 1) {
        // Check if sorted (alphabetically)
        const sorted = [...data.images].sort();
        expect(data.images).toEqual(sorted);
      }
    });
  });

  describe('Looks functionality', () => {
    test('should load all looks for lcf-three', () => {
      const data = loadCollectionPageData('lcf-three');

      if ('looks' in data && data.looks) {
        expect(data.looks).toHaveLength(3);

        const lookIds = data.looks.map(l => l.id);
        expect(lookIds).toContain('look-1');
        expect(lookIds).toContain('look-2');
        expect(lookIds).toContain('look-3');

        const subtitles = data.looks.map(l => l.subtitle);
        expect(subtitles).toContain('Look 1 "The Sculpture"');
        expect(subtitles).toContain('Look 2 "The Shadow"');
        expect(subtitles).toContain('Look 3 "The Light"');
      }
    });

    test('should load images for each look', () => {
      const data = loadCollectionPageData('lcf-three');

      if ('looks' in data && data.looks) {
        data.looks.forEach(look => {
          expect(Array.isArray(look.images)).toBe(true);
          expect(look.basePath).toMatch(/^\/images\/lcf-three\//);
        });
      }
    });
  });
});
