<script lang="ts">
	// import raspberrypi2 from '$lib/assets/raspberrypi2.png';
	import raspberrypi from '$lib/assets/raspberrypi.png';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	import { PUBLIC_GITHUB_URL, PUBLIC_POCKETBASE_URL, PUBLIC_API_URL } from '$env/static/public';

	let stuff: any;
	let engage: any;
	let pb: any;

	onMount(() => {
		const pingEndpoints = async () => {
			const resStuff = await fetch('/api');
			stuff = await resStuff.json();
			const resEngage = await fetch('/api/engage/hello');
			engage = await resEngage.json();
		};

		pingEndpoints();
	});
</script>

<div class="mx-auto w-full max-w-2xl p-4">
	<div class="mx-auto flex max-w-md flex-col items-center gap-5">
		<div class="text-9xl">pi</div>
		<div>
			read the <a class="text-blue-500 underline" href={PUBLIC_GITHUB_URL}>docs</a> for more info.
		</div>
		<div class="mx-auto my-5 flex w-full gap-2">
			<a
				href="/"
				class="flex w-full items-center justify-between gap-2 rounded bg-gray-900 px-4 py-2 text-white"
			>
				<div>home</div>
				<Icon icon="mdi:home" class="h-7 w-7" />
			</a>
			<a
				href={PUBLIC_POCKETBASE_URL}
				class="flex w-full items-center justify-between gap-2 rounded bg-gray-900 px-4 py-2 text-white"
			>
				<div>db</div>
				<Icon icon="simple-icons:pocketbase" class="h-7 w-7" />
			</a>
			<a
				href={PUBLIC_API_URL}
				class="flex w-full items-center justify-between gap-2 rounded bg-gray-900 px-4 py-2 text-white"
			>
				<div>api</div>
				<Icon icon="mynaui:api" class="h-7 w-7" />
			</a>
		</div>
	</div>

	<div class="relative">
		<img src={raspberrypi} alt="raspberrypi" class="w-full drop-shadow-lg" />

		<div
			class="absolute left-[8%] top-[13.5%] flex h-[21%] w-[12%] items-center justify-center bg-zinc-300 p-2 text-sm"
		>
			NET?
		</div>
		<div
			class="absolute left-[29.75%] top-[20.5%] flex h-[18%] w-[15%] items-center justify-center bg-gray-900 p-2 text-white"
		>
			MEM?
		</div>
		<div
			class="absolute bottom-[28%] left-[28%] flex h-[28%] w-[18%] items-center justify-center bg-gray-200 p-2"
		>
			CPU
		</div>
		<div
			class="absolute right-[28%] top-[27%] flex h-[19%] w-[13%] items-center justify-center bg-gray-900 p-2 text-white"
		>
			IO
		</div>
	</div>

	<!-- {#if stuff} -->

	<div class="mx-auto my-5 max-w-md">
		<div class="flex items-center gap-2">
			{#if stuff}
				<div class="h-5 w-5 rounded-full bg-emerald-500"></div>
			{:else}
				<div class="h-5 w-5 rounded-full bg-red-500"></div>
			{/if}
			<div>sveltekit server api</div>
		</div>

		<div class="flex items-center gap-2">
			{#if engage}
				<div class="h-5 w-5 rounded-full bg-emerald-500"></div>
			{:else}
				<div class="h-5 w-5 rounded-full bg-red-500"></div>
			{/if}
			<div>engage-dev api</div>
		</div>
	</div>
</div>
