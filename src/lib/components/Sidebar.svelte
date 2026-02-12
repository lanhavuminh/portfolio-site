<script lang="ts">
  import { page } from '$app/stores';

  interface CollectionItem {
    id: string;
    title: string;
    descriptionFile: string;
    imagesPath: string;
  }

  interface CollectionCategory {
    category: string;
    items: CollectionItem[];
  }

  type Collection = CollectionCategory | CollectionItem;

  interface Props {
    collections: Collection[];
  }

  let { collections }: Props = $props();

  let collectionsOpen = $state(false);
  let categoryStates = $state<Record<string, boolean>>({});

  function isCategory(item: Collection): item is CollectionCategory {
    return 'category' in item;
  }

  function isActive(path: string): boolean {
    return $page.url.pathname === path;
  }
</script>


<aside class="bg-[var(--color-bg)] w-64 p-4">
  <nav class="space-y-2">
    <ul class="space-y-2">
      <li>
        <button
          onclick={() => collectionsOpen = !collectionsOpen}
          class="nav-text w-full text-left text-lg hover:text-gray-900 flex items-center justify-between"
        >
          COLLECTIONS
          <svg
            class="w-5 h-5 transition-transform duration-200 {collectionsOpen ? 'rotate-180' : ''}"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        {#if collectionsOpen}
          <ul class="ml-4 mt-2 space-y-1">
            {#each collections as collection}
              {#if isCategory(collection)}
                <li>
                  <button
                    onclick={() => categoryStates[collection.category] = !categoryStates[collection.category]}
                    class="nav-text w-full text-left text-base hover:text-gray-900 flex items-center justify-between"
                  >
                    {collection.category}
                    <svg
                      class="w-4 h-4 transition-transform duration-200 {categoryStates[collection.category] ? 'rotate-180' : ''}"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  {#if categoryStates[collection.category]}
                    <ul class="ml-4 mt-1 space-y-1">
                      {#each collection.items as item}
                        <li><a href="/collections/{item.id}" class="nav-text block text-sm {isActive('/collections/' + item.id) ? 'text-[var(--color-active)]' : 'hover:text-gray-900'}">{item.title}</a></li>
                      {/each}
                    </ul>
                  {/if}
                </li>
              {:else}
                <li><a href="/collections/{collection.id}" class="nav-text block text-base {isActive('/collections/' + collection.id) ? 'text-[var(--color-active)]' : 'hover:text-gray-900'}">{collection.title}</a></li>
              {/if}
            {/each}
          </ul>
        {/if}
      </li>
      <li>
        <a href="/press" class="nav-text w-full text-left text-lg {isActive('/press') ? 'text-[var(--color-active)]' : 'hover:text-gray-900'} flex items-center justify-between">PRESS</a>
      </li>
      <li>
        <a href="/about" class="nav-text w-full text-left text-lg {isActive('/about') ? 'text-[var(--color-active)]' : 'hover:text-gray-900'} flex items-center justify-between">ABOUT</a>
      </li>
      <li>
        <a href="/contact" class="nav-text w-full text-left text-lg {isActive('/contact') ? 'text-[var(--color-active)]' : 'hover:text-gray-900'} flex items-center justify-between">CONTACT</a>
      </li>
    </ul>
  </nav>
</aside>