<script lang="ts">
  interface Props {
    instagram: string;
    linkedin: string;
    ual: string;
  }

  let { instagram, linkedin, ual }: Props = $props();
</script>

<footer class="bg-[var(--color-bg)] p-4 w-full text-2xl">
  <a href="https://www.instagram.com/{instagram}/" target="_blank" rel="noopener" aria-label="Instagram" class="fa-brands fa-instagram"></a>
  <a href={linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" class="fa-brands fa-linkedin"></a>
  <a href={ual} target="_blank" rel="noopener">ual</a>
</footer>