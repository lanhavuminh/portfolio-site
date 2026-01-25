<script lang="ts">
  import ImageGallery from '$lib/components/ImageGallery.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-1">
  <main class="bg-[#fffef9] flex-1 p-6 min-w-[1024px]">
    <ImageGallery images={data.images} basePath={data.basePath} />
  </main>
</div>
