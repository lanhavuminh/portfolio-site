<script lang="ts">
	import '../app.css';
	import { slide } from 'svelte/transition';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();

	let mobileNavOpen = $state(false);
</script>

<div
	class="min-h-screen flex flex-col"
	style="--color-text: {data.theme.textColor}; --color-active: {data.theme.activeColor}; --color-bg: {data.theme.backgroundColor};"
>
	<Header
		mobileNavOpen={mobileNavOpen}
		ontoggle={() => mobileNavOpen = !mobileNavOpen}
		instagram={data.contact.instagram}
		linkedin={data.contact.linkedin}
		ual={data.contact.ual}
	/>

	<!-- Portrait drawer: slides down below header -->
	{#if mobileNavOpen}
		<div class="lg:hidden max-lg:portrait:flex max-lg:portrait:flex-col max-lg:landscape:hidden max-lg:portrait:max-h-[calc(100vh-4rem)]" transition:slide={{ duration: 250 }}>
			<div class="flex-1 min-h-0 overflow-y-auto">
				<Sidebar collections={data.collections} specialProjects={data.specialProjects} />
			</div>
			<div class="flex justify-center pb-1 shrink-0">
				<button onclick={() => mobileNavOpen = false} aria-label="Close navigation">
					<i class="fa-solid fa-chevron-up text-lg"></i>
				</button>
			</div>
		</div>
	{/if}

	<div class="flex flex-1">
		<!-- Desktop sidebar -->
		<div class="hidden lg:block">
			<Sidebar collections={data.collections} specialProjects={data.specialProjects} />
		</div>

		{@render children()}

		<!-- Landscape sidebar: slides in from right, sticky so arrow stays visible on scroll -->
		{#if mobileNavOpen}
			<div class="lg:hidden hidden max-lg:landscape:flex max-lg:landscape:flex-col w-52 shrink-0 sticky top-0 self-start max-h-screen" transition:slide={{ axis: 'x', duration: 250 }}>
				<div class="flex-1 min-h-0 overflow-y-auto">
					<Sidebar collections={data.collections} specialProjects={data.specialProjects} />
				</div>
				<div class="flex justify-center pb-2">
					<button onclick={() => mobileNavOpen = false} aria-label="Close navigation">
						<i class="fa-solid fa-chevron-right text-lg"></i>
					</button>
				</div>
			</div>
		{/if}
	</div>


</div>
