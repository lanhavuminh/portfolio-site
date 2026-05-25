<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-1">
  <main class="bg-[var(--color-bg)] flex-1 p-6 lg:min-w-[1024px]">
    <div class="flex items-center justify-center h-full gap-8 max-lg:portrait:flex-col max-lg:landscape:items-start">
      <div class="flex-1 flex items-center justify-end max-lg:portrait:justify-center max-lg:landscape:items-start max-lg:landscape:pt-2 max-lg:portrait:order-2">
        <p class="text-[15px] lg:text-xl max-w-lg">
          {data.text}
        </p>
      </div>
      <div class="flex-1 max-lg:portrait:order-1 max-lg:landscape:shrink-0">
        <img src={data.contact.imageAbout} alt="Lan Ha Vu Minh" class="fade-in w-full h-auto lg:w-auto lg:max-h-[70vh] max-lg:landscape:h-[calc(100vh-8rem)] max-lg:landscape:w-auto" onload={(e) => (e.currentTarget as HTMLElement).classList.add('loaded')} />
      </div>
    </div>
  </main>
</div>
