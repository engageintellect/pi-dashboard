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
		PUBLIC_GITHUB_REPO,
		PUBLIC_POCKETBASE_URL,
		PUBLIC_API_URL,
		PUBLIC_WEB_SOCKET_URL
	} from '$env/static/public';

	let ws: WebSocket;

	type EndpointKey =
		| 'hostname'
		| 'os'
		| 'uptime'
		| 'memoryUsed'
		| 'memoryAvailable'
		| 'cpuUsage'
		| 'diskUsage'
		| 'systemLoad'
		| 'packageCount'
		| 'updates'
		| 'runningProcesses'
		| 'networkLatency'
		| 'networkPorts'
		| 'runningServices';

	const endpoints: Record<EndpointKey, string> = {
		hostname: '/api/pi/hostname',
		os: '/api/pi/os',
		uptime: '/api/pi/uptime',
		memoryUsed: '/api/pi/memory/used',
		memoryAvailable: '/api/pi/memory/available',
		cpuUsage: '/api/pi/cpu/usage',
		diskUsage: '/api/pi/disk/usage',
		systemLoad: '/api/pi/load',
		packageCount: '/api/pi/package-count',
		updates: '/api/pi/updates',
		runningProcesses: '/api/pi/processes',
		networkLatency: '/api/pi/network/latency',
		networkPorts: '/api/pi/network/ports',
		runningServices: '/api/pi/services/running'
	};

	let piData: Record<EndpointKey, any> = {
		hostname: null,
		os: null,
		uptime: null,
		memoryUsed: null,
		memoryAvailable: null,
		cpuUsage: null,
		diskUsage: null,
		systemLoad: null,
		packageCount: null,
		updates: null,
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

	const shortenFloat = (num: number) => {
		return num.toFixed(0);
	};
</script>

<div class="flex flex-col">
	<div class="mx-auto h-full min-h-screen w-full max-w-2xl overscroll-none p-4">
		<div class="mx-auto flex w-full flex-col items-center gap-5 px-2">
			<div class="text-9xl">pi</div>

			<div>
				read the <a class="text-blue-500 underline" href={PUBLIC_GITHUB_REPO}>docs</a> for more info.
			</div>
			<div class="mx-auto my-5 flex w-full gap-2">
				<a
					href="#services"
					class="group flex w-full items-center justify-between gap-2 rounded bg-neutral-900 px-4 py-2 text-white"
				>
					<div>services</div>
					<Icon
						icon="mdi:server"
						class="h-7 w-7 transition-all duration-200 sm:group-hover:scale-110"
					/>
				</a>
				<a
					href={PUBLIC_POCKETBASE_URL}
					target="_blank"
					class="group flex w-full items-center justify-between gap-2 rounded bg-neutral-900 px-4 py-2 text-white"
				>
					<div>db</div>
					<Icon
						icon="simple-icons:pocketbase"
						class="h-7 w-7 transition-all duration-200 sm:group-hover:scale-110"
					/>
				</a>
				<a
					href={'/api'}
					target="_blank"
					class="group flex w-full items-center justify-between gap-2 rounded bg-neutral-900 px-4 py-2 text-white"
				>
					<div>api</div>
					<Icon
						icon="mynaui:api"
						class="h-7 w-7 transition-all duration-200 sm:group-hover:scale-110"
					/>
				</a>
			</div>
		</div>

		<div class="relative">
			{#if !piData?.systemLoad}
				<div class="relative h-full w-full">
					<img
						src={raspberrypi}
						alt="raspberrypi"
						class=" w-full opacity-50 drop-shadow-lg saturate-[50%]"
					/>
					<div class="absolute top-0 flex h-full w-full items-center justify-center">
						<div class="flex flex-col items-center justify-center">
							<div class="loading loading-spinner loading-lg scale-[200%]"></div>
						</div>
					</div>
				</div>
			{:else}
				<img
					in:fade={{ duration: 500 }}
					src={raspberrypi}
					alt="raspberrypi"
					class="w-full drop-shadow-lg saturate-[125%]"
				/>
			{/if}

			{#if piData?.networkPorts !== null}
				<div
					in:fade={{ duration: 500 }}
					class="absolute left-[8.5%] top-[13.25%] flex h-[21.5%] w-[11%] items-center justify-center overflow-auto rounded bg-gradient-to-b from-neutral-500/50 to-stone-400 p-2 text-sm text-white shadow"
				>
					<!-- {piData.networkPorts} -->
					<div
						class="flex h-full w-full scale-75 flex-col items-start justify-start text-xs sm:scale-100 sm:text-sm"
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
					class="absolute left-[29.75%] top-[21%] flex h-[17%] w-[15%] items-center justify-center rounded bg-zinc-800/50 p-2 text-white"
				>
					<div class="avatar text-sm sm:text-xl">
						{piData.memoryUsed + '%' || 'loading...'}
					</div>
				</div>
			{/if}
			{#if piData?.cpuUsage !== null}
				<div
					in:fade={{ duration: 500 }}
					class="absolute bottom-[33.5%] left-[28%] flex h-[17%] w-[18.25%] items-center justify-center rounded bg-stone-300/80 p-2 sm:text-base"
				>
					<div class="text-sm sm:text-lg md:text-xl">
						{piData.cpuUsage + '%' || 'loading...'}
					</div>
				</div>
			{/if}
			{#if piData?.diskUsage !== null}
				<div
					in:fade={{ duration: 500 }}
					class="absolute right-[28.25%] top-[26.75%] flex h-[20%] w-[13%] items-center justify-center rounded bg-zinc-800/80 p-2 text-white"
				>
					<div class="text-sm sm:text-base md:text-lg lg:text-xl">
						{Math.floor(piData.diskUsage) + '%' || 'loading...'}
					</div>
				</div>
			{/if}
		</div>

		{#if piData?.systemLoad}
			<div class="flex items-center justify-center gap-2 pt-2">
				<div>
					<Icon icon="material-symbols:arrow-upward" class="h-5 w-5 animate-bounce" />
				</div>

				<div class="text-xs">
					this website, database, and API endpoints are hosted on this raspberry pi.
				</div>
			</div>
		{:else}
			<div class="flex items-center justify-center">
				connecting to raspberry pi<span class="animate-pulse">...</span>
			</div>
		{/if}
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

	{#if piData.packageCount !== null}
		<div
			id="services"
			class="flex h-full min-h-screen w-full items-center bg-neutral-900 text-white"
		>
			<div class="mx-auto w-full max-w-2xl grow p-5 py-10">
				<div class="flex w-full flex-col gap-10 overflow-x-auto md:flex-row md:gap-20">
					<div class="w-full" in:fade={{ duration: 500 }}>
						<div class=" mb-5 text-3xl">system info</div>
						<table class="table-sm table">
							<tbody class="w-full">
								<tr class="w-full border-none">
									<td class="w-1/2">Uptime:</td>
									<td class="w-1/2">{piData.uptime}</td>
								</tr>

								<tr class="w-full border-none">
									<td class="w-1/2">Hostname:</td>
									<td class="w-1/2">{piData?.hostname}</td>
								</tr>
								<tr class="w-full border-none">
									<td class="w-1/2">OS:</td>
									<td class="w-1/2">{piData?.os}</td>
								</tr>

								<tr class="w-full border-none">
									<td class="w-1/2">Packages:</td>
									<td class="w-1/2">{piData?.packageCount}</td>
								</tr>

								<tr class="w-full border-none">
									<td class="w-1/2">Updates:</td>

									{#if piData.updates > 0}
										<td
											in:fade={{ duration: 500 }}
											class="bg-success text-success-content w-1/2 rounded font-bold"
										>
											<div class="flex items-center justify-between">
												{piData?.updates || 'Searching...'}
												<Icon icon="material-symbols-light:package-2-outline" class="h-7 w-7" />
											</div>
										</td>
									{:else}
										<td class="w-1/2">{piData?.updates || 'Searching...'}</td>
									{/if}
								</tr>
							</tbody>
						</table>
					</div>

					<div class=" flex w-full flex-col gap-5">
						<!-- <img src={raspberrypi2} alt="raspberrypi2" class="w-full" /> -->

						{#if piData.runningServices}
							<div class="w-full" in:fade={{ duration: 500 }}>
								<div class=" mb-5 text-3xl">running services</div>
								<div class="h-80 overscroll-auto">
									<div class="border-base-300 h-80 overflow-scroll rounded border">
										<table class="table-sm table">
											<tbody class="w-full">
												{#each piData.runningServices as service}
													<tr class="w-full border-none">
														<td class="flex w-full items-center gap-2">
															<div
																class="from-success h-4 w-4 rounded-full bg-gradient-to-b to-emerald-700"
															></div>
															<div>
																{service}
															</div>
														</td>
													</tr>
												{/each}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
<!-- {JSON.stringify(piData)} -->
