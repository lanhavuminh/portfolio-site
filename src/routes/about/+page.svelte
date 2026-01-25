<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-1">
  <main class="bg-[#fffef9] flex-1 p-6">
    <div class="flex items-center justify-center h-full gap-8">
      <div class="flex-1 flex items-center justify-end">
        <p class="text-xl max-w-lg">
          {data.text}
        </p>
      </div>
      <div class="flex-1">
        <img src={data.contact.imageAbout} alt="Lan Ha Vu Minh" class="max-w-full h-auto" />
      </div>
    </div>
  </main>
</div>