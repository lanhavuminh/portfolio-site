import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'fs';
import yaml from 'js-yaml';
import { join } from 'path';

describe('Collections YAML validation', () => {
  it('should have valid YAML syntax', () => {
    const yamlContent = readFileSync('content/collections.yaml', 'utf-8');
    expect(() => yaml.load(yamlContent)).not.toThrow();
  });

  it('should have collections array', () => {
    const yamlContent = readFileSync('content/collections.yaml', 'utf-8');
    const data = yaml.load(yamlContent) as any;
    expect(data).toHaveProperty('collections');
    expect(Array.isArray(data.collections)).toBe(true);
  });

  it('should have valid collection structure', () => {
    const yamlContent = readFileSync('content/collections.yaml', 'utf-8');
    const data = yaml.load(yamlContent) as any;

    data.collections.forEach((collection: any) => {
      if ('category' in collection) {
        // Category with items
        expect(collection).toHaveProperty('category');
        expect(collection).toHaveProperty('items');
        expect(Array.isArray(collection.items)).toBe(true);

        collection.items.forEach((item: any) => {
          expect(item).toHaveProperty('id');
          expect(item).toHaveProperty('title');
          expect(typeof item.id).toBe('string');
          expect(typeof item.title).toBe('string');
        });
      } else {
        // Standalone collection
        expect(collection).toHaveProperty('id');
        expect(collection).toHaveProperty('title');
        expect(typeof collection.id).toBe('string');
        expect(typeof collection.title).toBe('string');
      }
    });
  });

  it('should have unique collection IDs', () => {
    const yamlContent = readFileSync('content/collections.yaml', 'utf-8');
    const data = yaml.load(yamlContent) as any;

    const ids = new Set<string>();
    data.collections.forEach((collection: any) => {
      if ('category' in collection) {
        collection.items.forEach((item: any) => {
          expect(ids.has(item.id)).toBe(false);
          ids.add(item.id);
        });
      } else {
        expect(ids.has(collection.id)).toBe(false);
        ids.add(collection.id);
      }
    });
  });

  it('should have valid sections structure when present', () => {
    const yamlContent = readFileSync('content/collections.yaml', 'utf-8');
    const data = yaml.load(yamlContent) as any;

    data.collections.forEach((collection: any) => {
      const processItem = (item: any) => {
        if (item.sections) {
          expect(Array.isArray(item.sections)).toBe(true);
          item.sections.forEach((section: any) => {
            expect(section).toHaveProperty('id');
            expect(section).toHaveProperty('subtitle');
            expect(typeof section.id).toBe('string');
            expect(typeof section.subtitle).toBe('string');
          });
        }
      };

      if ('category' in collection) {
        collection.items.forEach(processItem);
      } else {
        processItem(collection);
      }
    });
  });
});

describe('Contact YAML validation', () => {
  it('should have valid YAML syntax', () => {
    const yamlContent = readFileSync('content/contact.yaml', 'utf-8');
    expect(() => yaml.load(yamlContent)).not.toThrow();
  });

  it('should have required contact fields', () => {
    const yamlContent = readFileSync('content/contact.yaml', 'utf-8');
    const data = yaml.load(yamlContent) as any;

    expect(data).toHaveProperty('contact');
    expect(data.contact).toHaveProperty('email');
    expect(data.contact).toHaveProperty('instagram');
    expect(data.contact).toHaveProperty('linkedin');
    expect(data.contact).toHaveProperty('ual');
    expect(data.contact).toHaveProperty('imageAbout');
    expect(data.contact).toHaveProperty('imageContact');

    expect(typeof data.contact.email).toBe('string');
    expect(typeof data.contact.instagram).toBe('string');
    expect(typeof data.contact.linkedin).toBe('string');
    expect(typeof data.contact.ual).toBe('string');
    expect(typeof data.contact.imageAbout).toBe('string');
    expect(typeof data.contact.imageContact).toBe('string');
  });

  it('should have valid email format', () => {
    const yamlContent = readFileSync('content/contact.yaml', 'utf-8');
    const data = yaml.load(yamlContent) as any;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(data.contact.email)).toBe(true);
  });

  it('should have valid URLs', () => {
    const yamlContent = readFileSync('content/contact.yaml', 'utf-8');
    const data = yaml.load(yamlContent) as any;

    expect(data.contact.linkedin.startsWith('http')).toBe(true);
    expect(data.contact.ual.startsWith('http')).toBe(true);
  });

  it('should have existing contact image', () => {
    const yamlContent = readFileSync('content/contact.yaml', 'utf-8');
    const data = yaml.load(yamlContent) as any;

    const imageAboutPath = join('static', data.contact.imageAbout);
    expect(existsSync(imageAboutPath), `Contact image missing at ${data.contact.imageAbout}`).toBe(true);

    const imageContactPath = join('static', data.contact.imageContact);
    expect(existsSync(imageContactPath), `Contact image missing at ${data.contact.imageContact}`).toBe(true);
  });
});
