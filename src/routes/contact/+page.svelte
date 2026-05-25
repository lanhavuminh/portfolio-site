<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	function copyEmail() {
		navigator.clipboard.writeText(data.contact.email);
	}
</script>

<div class="flex flex-1">
	<main class="bg-[var(--color-bg)] flex-1 p-6 lg:min-w-[1024px]">
		<div class="flex items-center justify-center h-full gap-16 max-lg:portrait:flex-col max-lg:landscape:items-start">
			<div class="flex-1 flex items-center justify-end max-lg:portrait:justify-center max-lg:portrait:order-2 max-lg:landscape:items-start max-lg:landscape:pt-2">
				<div class="text-2xl max-w-lg space-y-6">
					<p class="text-base italic">{data.contact.note}</p>
					<div class="space-y-3">
						<p>
							<strong>Email:</strong>
							<button onclick={copyEmail} class="hover:underline cursor-pointer"
								>{data.contact.email}</button
							>
						</p>
						<div class="flex flex-col gap-2">
							<a
								href="https://instagram.com/{data.contact.instagram}"
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2 hover:text-gray-600 transition-colors"
							>
								<i class="fa-brands fa-instagram text-2xl"></i>
								<span class="text-lg">@{data.contact.instagram}</span>
							</a>
							<a
								href={data.contact.linkedin}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2 hover:text-gray-600 transition-colors"
							>
								<i class="fa-brands fa-linkedin text-2xl"></i>
								<span class="text-lg">Lan Ha Vu Minh</span>
							</a>
							<a
								href={data.contact.ual}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2 hover:text-gray-600 transition-colors"
							>
								<span class="text-2xl">ual</span>
								<span class="text-lg">showcase</span>
							</a>
						</div>
					</div>
				</div>
			</div>
			<div class="flex-1 max-lg:portrait:order-1 max-lg:landscape:shrink-0">
				<img src={data.contact.imageContact} alt="Lan Ha Vu Minh" class="fade-in w-full h-auto lg:max-w-md max-lg:landscape:h-[calc(100vh-8rem)] max-lg:landscape:w-auto" onload={(e) => (e.currentTarget as HTMLElement).classList.add('loaded')} />
			</div>
		</div>
	</main>
</div>
