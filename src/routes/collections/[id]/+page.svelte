<script lang="ts">
  import Paragraph from '$lib/components/Paragraph.svelte';
  import ImageGallery from '$lib/components/ImageGallery.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-1">
  <main class="bg-[#fffef9] flex-1 p-6 min-w-[1024px]">
    <h2 class="text-2xl font-medium mb-6">{data.title}</h2>

    {#if data.description}
      <Paragraph text={data.description} />
    {/if}

    {#if data.looks}
      <!-- Collection with looks -->
      {#each data.looks as look}
        <div class="mt-12">
          <h3 class="text-xl font-medium mb-4">{look.subtitle}</h3>

          {#if look.description}
            <Paragraph text={look.description} />
          {/if}

          <ImageGallery images={look.images} basePath={look.basePath} />
        </div>
      {/each}
    {:else}
      <!-- Collection without looks -->
      <ImageGallery images={data.images} basePath={data.basePath} />
    {/if}
  </main>
</div>
