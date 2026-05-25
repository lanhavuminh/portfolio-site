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
      {#if image.endsWith('.mp4')}
        <video
          src="{basePath}/{image}"
          autoplay
          loop
          muted
          playsinline
          class="w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        ></video>
      {:else}
        <img
          src="{basePath}/{image}"
          alt={image}
          loading="lazy"
          class="fade-in w-full h-auto rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          onload={(e) => (e.currentTarget as HTMLElement).classList.add('loaded')}
        />
      {/if}
    </div>
  {/each}
</div>
