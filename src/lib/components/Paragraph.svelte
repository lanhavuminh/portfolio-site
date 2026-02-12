<script lang="ts">
  interface Props {
    text: string;
  }

  let { text }: Props = $props();
</script>

<div class="mb-8">
  <p class="text-lg leading-relaxed">{text}</p>
</div>
