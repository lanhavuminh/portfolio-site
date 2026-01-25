<script lang="ts">
  interface Props {
    images: string[];
    basePath: string;
  }

  let { images, basePath }: Props = $props();
</script>

<div class="columns-3 gap-4">
  {#each images as image}
    <div class="mb-4 break-inside-avoid">
      <img
        src="{basePath}/{image}"
        alt={image}
        loading="lazy"
        class="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
      />
    </div>
  {/each}
</div>
