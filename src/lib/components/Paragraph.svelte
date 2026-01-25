<script lang="ts">
  interface Props {
    text: string;
  }

  let { text }: Props = $props();
</script>

<div class="mb-8">
  <p class="text-gray-700 leading-relaxed">{text}</p>
</div>
