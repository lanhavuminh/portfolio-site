<script lang="ts">
  import Paragraph from '$lib/components/Paragraph.svelte';
  import ImageGallery from '$lib/components/ImageGallery.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-1">
  <main class="bg-[var(--color-bg)] flex-1 p-6 min-w-[1024px]">
    <h2 class="text-3xl font-medium mb-6">{data.title}</h2>

    {#if data.description}
      <Paragraph text={data.description} />
    {/if}

    {#if data.sections}
      <!-- Collection with sections -->
      {#each data.sections as section}
        <div class="mt-12">
          <h3 class="text-2xl font-medium mb-4">{section.subtitle}</h3>

          {#if section.description}
            <Paragraph text={section.description} />
          {/if}

          <ImageGallery images={section.images} basePath={section.basePath} />
        </div>
      {/each}
    {:else}
      <!-- Collection without sections -->
      <ImageGallery images={data.images} basePath={data.basePath} />
    {/if}
  </main>
</div>
