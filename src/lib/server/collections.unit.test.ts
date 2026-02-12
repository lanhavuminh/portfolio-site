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
    test('should return null for non-existent collection', () => {
      const collection = findCollectionById('non-existent-id');

      expect(collection).toBeNull();
    });
  });

  describe('loadCollectionPageData', () => {
    test('should throw error for non-existent collection', () => {
      expect(() => {
        loadCollectionPageData('fake-collection');
      }).toThrow('Collection fake-collection not found');
    });
  });
});
