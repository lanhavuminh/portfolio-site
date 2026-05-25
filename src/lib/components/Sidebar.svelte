<script lang="ts">
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';
	import type { Collection, CollectionItem, CollectionCategory } from '$lib/server/collections';

	interface Props {
		collections: Collection[];
		specialProjects: CollectionItem[];
	}

	let { collections, specialProjects }: Props = $props();

	let collectionsOpen = $state(false);
	let specialProjectsOpen = $state(false);
	let categoryStates = $state<Record<string, boolean>>({});

	function isCategory(item: Collection): item is CollectionCategory {
		return 'category' in item;
	}

	function isActive(path: string): boolean {
		return $page.url.pathname === path;
	}
</script>

<aside class="w-full lg:w-64 bg-[var(--color-bg)] p-4 pt-6 max-lg:pt-3 lg:pt-10 max-lg:landscape:pl-0 lg:pl-6">
	<nav class="space-y-4 max-lg:space-y-2">
		<ul class="space-y-4 max-lg:space-y-2">
			<li>
				<button
					onclick={() => { collectionsOpen = !collectionsOpen; if (collectionsOpen) specialProjectsOpen = false; }}
					class="nav-text flex w-full items-center justify-between text-left max-lg:text-sm lg:text-xl hover:text-gray-900"
				>
					COLLECTIONS
					<svg
						class="h-5 w-5 transition-transform duration-200 {collectionsOpen ? 'rotate-180' : ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</button>
				{#if collectionsOpen}
					<ul class="mt-2 ml-4 space-y-1" transition:slide={{ duration: 150 }}>
						{#each collections as collection}
							{#if isCategory(collection)}
								<li>
									<button
										onclick={() => {
											const wasOpen = categoryStates[collection.category];
											categoryStates = {};
											if (!wasOpen) categoryStates[collection.category] = true;
										}}
										class="nav-text flex w-full items-center justify-between text-left max-lg:text-sm lg:text-base hover:text-gray-900"
									>
										{collection.category}
										<svg
											class="h-4 w-4 transition-transform duration-200 {categoryStates[
												collection.category
											]
												? 'rotate-180'
												: ''}"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M19 9l-7 7-7-7"
											></path>
										</svg>
									</button>
									{#if categoryStates[collection.category]}
										<ul class="mt-1 ml-4 space-y-1" transition:slide={{ duration: 150 }}>
											{#each collection.items as item}
												<li>
													<a
														href="/collections/{item.id}"
														class="nav-text block text-sm {isActive('/collections/' + item.id)
															? 'text-[var(--color-active)]'
															: 'hover:text-gray-900'}">{item.title}</a
													>
												</li>
											{/each}
										</ul>
									{/if}
								</li>
							{:else}
								<li>
									<a
										href="/collections/{collection.id}"
										class="nav-text block max-lg:text-sm lg:text-base {isActive('/collections/' + collection.id)
											? 'text-[var(--color-active)]'
											: 'hover:text-gray-900'}">{collection.title}</a
									>
								</li>
							{/if}
						{/each}
					</ul>
				{/if}
			</li>
			<li>
				<button
					onclick={() => { specialProjectsOpen = !specialProjectsOpen; if (specialProjectsOpen) collectionsOpen = false; }}
					class="nav-text flex w-full items-center justify-between text-left max-lg:text-sm lg:text-xl hover:text-gray-900"
				>
					SPECIAL PROJECTS
					<svg
						class="h-5 w-5 transition-transform duration-200 {specialProjectsOpen
							? 'rotate-180'
							: ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"
						></path>
					</svg>
				</button>
				{#if specialProjectsOpen}
					<ul class="mt-2 ml-4 space-y-1" transition:slide={{ duration: 150 }}>
						{#each specialProjects as project}
							<li>
								<a
									href="/special-projects/{project.id}"
									class="nav-text block max-lg:text-sm lg:text-base {isActive('/special-projects/' + project.id)
										? 'text-[var(--color-active)]'
										: 'hover:text-gray-900'}">{project.title}</a
								>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
			<li>
				<a
					href="/press"
					class="nav-text w-full text-left max-lg:text-sm lg:text-xl {isActive('/press')
						? 'text-[var(--color-active)]'
						: 'hover:text-gray-900'} flex items-center justify-between">PRESS</a
				>
			</li>
			<li>
				<a
					href="/about"
					class="nav-text w-full text-left max-lg:text-sm lg:text-xl {isActive('/about')
						? 'text-[var(--color-active)]'
						: 'hover:text-gray-900'} flex items-center justify-between">ABOUT</a
				>
			</li>
			<li>
				<a
					href="/contact"
					class="nav-text w-full text-left max-lg:text-sm lg:text-xl {isActive('/contact')
						? 'text-[var(--color-active)]'
						: 'hover:text-gray-900'} flex items-center justify-between">CONTACT</a
				>
			</li>
		</ul>
	</nav>
</aside>
