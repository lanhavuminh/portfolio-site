<script lang="ts">
	interface Props {
		mobileNavOpen: boolean;
		ontoggle: () => void;
		instagram: string;
		linkedin: string;
		ual: string;
	}

	let { mobileNavOpen, ontoggle, instagram, linkedin, ual }: Props = $props();
</script>

<header class="h-16 max-lg:landscape:h-20 lg:h-40 w-full bg-[var(--color-bg)] p-4 lg:pb-10 pl-6 flex items-center lg:items-start justify-between">
	<h1>
		<a href="/" class="lhvm">Lan Ha Vu Minh</a>
	</h1>
	<div class="flex items-center gap-3 pt-3">
		<a href="https://www.instagram.com/{instagram}/" target="_blank" rel="noopener" aria-label="Instagram" class="fa-brands fa-instagram text-lg lg:text-2xl"></a>
		<a href={linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" class="fa-brands fa-linkedin text-lg lg:text-2xl"></a>
		<a href={ual} target="_blank" rel="noopener" class="text-base lg:text-2xl">ual</a>
		<button onclick={ontoggle} aria-label="Toggle navigation" class="lg:hidden text-lg ml-1">
			<i class="fa-fw fa-solid fa-bars"></i>
		</button>
	</div>
</header>
