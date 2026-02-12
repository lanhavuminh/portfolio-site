<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { LayoutData } from './$types';

	let { children, data }: { children: any; data: LayoutData } = $props();
</script>

<div
	class="min-h-screen flex flex-col"
	style="--color-text: {data.theme.textColor}; --color-active: {data.theme.activeColor}; --color-bg: {data.theme.backgroundColor};"
>
	<Header></Header>
	<div class="flex flex-1">
  	<Sidebar collections={data.collections}></Sidebar>
		{@render children()}
	</div>
	<Footer instagram={data.contact.instagram} linkedin={data.contact.linkedin} ual={data.contact.ual}></Footer>
</div>