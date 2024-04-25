<script lang="ts">
	// import raspberrypi2 from '$lib/assets/raspberrypi2.png';
	import { fade, slide } from 'svelte/transition';

	import raspberrypi from '$lib/assets/raspberrypi.png';
	import raspberrypi2 from '$lib/assets/raspberrypi2.png';
	import { onMount, onDestroy } from 'svelte';
	import Icon from '@iconify/svelte';
	import type { PageData } from './$types';
	// export let data: PageData;
	import {
		PUBLIC_GITHUB_URL,
		PUBLIC_POCKETBASE_URL,
		PUBLIC_API_URL,
		PUBLIC_WEB_SOCKET_URL
	} from '$env/static/public';

	let ws: WebSocket;

	type EndpointKey =
		| 'hostname'
		| 'uptime'
		| 'memoryUsed'
		| 'memoryAvailable'
		| 'cpuUsage'
		| 'diskUsage'
		| 'systemLoad'
		| 'packageCount'
		| 'runningProcesses'
		| 'networkLatency'
		| 'networkPorts'
		| 'runningServices';

	const endpoints: Record<EndpointKey, string> = {
		hostname: '/api/pi/hostname',
		uptime: '/api/pi/uptime',
		memoryUsed: '/api/pi/memory/used',
		memoryAvailable: '/api/pi/memory/available',
		cpuUsage: '/api/pi/cpu/usage',
		diskUsage: '/api/pi/disk/usage',
		systemLoad: '/api/pi/load',
		packageCount: '/api/pi/package-count',
		runningProcesses: '/api/pi/processes',
		networkLatency: '/api/pi/network/latency',
		networkPorts: '/api/pi/network/ports',
		runningServices: '/api/pi/services/running'
	};

	let piData: Record<EndpointKey, any> = {
		hostname: null,
		uptime: null,
		memoryUsed: null,
		memoryAvailable: null,
		cpuUsage: null,
		diskUsage: null,
		systemLoad: null,
		packageCount: null,
		runningProcesses: null,
		networkLatency: null,
		networkPorts: null,
		runningServices: null
	};

	const fetchData = async (key: EndpointKey) => {
		const res = await fetch(endpoints[key]);
		piData[key] = await res.json();
	};

	const fetchDataForAllKeys = () => {
		Object.keys(endpoints).forEach((key) => fetchData(key as EndpointKey));
	};

	// let stuff: any;
	// let engage: any;
	// let pb: any;

	onMount(() => {
		fetchDataForAllKeys(); // Initial fetch
		// Establish WebSocket connection after 5 seconds
		setTimeout(() => {
			ws = new WebSocket(PUBLIC_WEB_SOCKET_URL);
			ws.onmessage = (event) => {
				const newData = JSON.parse(event.data);
				Object.keys(newData).forEach((key) => {
					piData[key as keyof typeof piData] = newData[key as keyof typeof newData];
				});
			};

			ws.onerror = (error) => {
				console.error('WebSocket error:', error);
			};

			ws.onclose = () => {
				console.log('WebSocket connection closed');
			};

			// const pingEndpoints = async () => {
			// 	const resStuff = await fetch('/api');
			// 	stuff = await resStuff.json();
			// 	// const resEngage = await fetch('/api/engage/hello');
			// 	// engage = await resEngage.json();
			// };

			// pingEndpoints();
		}, 5000); // 5-second delay
	});

	onDestroy(() => {
		if (ws) {
			ws.close();
		}
	});
</script>

<div class="mx-auto h-screen w-full max-w-2xl p-4">
	<div class="mx-auto flex max-w-md flex-col items-center gap-5">
		<div class="text-9xl">pi</div>
		<div>
			read the <a class="text-blue-500 underline" href={PUBLIC_GITHUB_URL}>docs</a> for more info.
		</div>
		<div class="mx-auto my-5 flex w-full gap-2">
			<a
				href="/"
				class="flex w-full items-center justify-between gap-2 rounded bg-neutral-900 px-4 py-2 text-white"
			>
				<div>home</div>
				<Icon icon="mdi:home" class="h-7 w-7" />
			</a>
			<a
				href={PUBLIC_POCKETBASE_URL}
				class="flex w-full items-center justify-between gap-2 rounded bg-neutral-900 px-4 py-2 text-white"
			>
				<div>db</div>
				<Icon icon="simple-icons:pocketbase" class="h-7 w-7" />
			</a>
			<a
				href={PUBLIC_API_URL}
				class="flex w-full items-center justify-between gap-2 rounded bg-neutral-900 px-4 py-2 text-white"
			>
				<div>api</div>
				<Icon icon="mynaui:api" class="h-7 w-7" />
			</a>
		</div>
	</div>

	<div class="relative">
		<img src={raspberrypi} alt="raspberrypi" class="w-full drop-shadow-lg" />

		{#if piData?.networkPorts !== null}
			<div
				in:fade={{ duration: 500 }}
				class="absolute left-[8.5%] top-[13.25%] flex h-[21.5%] w-[11%] items-center justify-center overflow-auto rounded bg-gradient-to-b from-neutral-500 to-stone-400 p-2 text-sm text-white shadow"
			>
				<!-- {piData.networkPorts} -->
				<div
					class="flex h-full w-full scale-75 flex-col items-start text-xs sm:scale-100 sm:text-sm"
				>
					{#each piData.networkPorts as port}
						<div class="drop-shadow">
							{port}
						</div>
					{/each}
				</div>
			</div>
		{/if}
		{#if piData?.memoryUsed !== null}
			<div
				in:fade={{ duration: 500 }}
				class="absolute left-[29.75%] top-[21%] flex h-[17%] w-[15%] items-center justify-center rounded bg-zinc-800 p-2 text-white"
			>
				<div class="text-xs sm:text-xl">
					{piData.memoryUsed}%
				</div>
			</div>
		{/if}
		{#if piData?.cpuUsage !== null}
			<div
				in:fade={{ duration: 500 }}
				class="absolute bottom-[28%] left-[28%] flex h-[28%] w-[18.25%] items-center justify-center rounded bg-stone-300 p-2 sm:text-base"
			>
				<div class="text-sm sm:text-lg md:text-xl">
					{piData.cpuUsage}%
				</div>
			</div>
		{/if}
		{#if piData?.diskUsage !== null}
			<div
				in:fade={{ duration: 500 }}
				class="absolute right-[28.25%] top-[26.75%] flex h-[20%] w-[13%] items-center justify-center rounded bg-zinc-800 p-2 text-white"
			>
				<div class="scale-75 text-xs sm:scale-100 sm:text-base">
					{piData.diskUsage}%
				</div>
			</div>
		{/if}
	</div>

	<!-- {#if stuff} -->

	<!-- <div class="mx-auto my-5 max-w-md">
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
	</div> -->
</div>

<div class="relative h-screen w-full bg-neutral-900 text-white">
	<div class="mx-auto flex h-full w-full max-w-md items-center justify-center px-5">
		<div class="flex flex-col items-center gap-5">
			<div class="text-5xl md:text-7xl">hello world</div>
			<img src={raspberrypi2} alt="raspberrypi2" class="w-full" />
		</div>
	</div>
	<div class="absolute bottom-5 flex w-full justify-center text-white">
		<a href={PUBLIC_GITHUB_URL} class="text-white underline">@engageintellect</a>
	</div>
</div>

<!-- {JSON.stringify(piData)} -->
