<script lang="ts">
	import raspberrypi2 from '$lib/assets/raspberrypi2.png';
	import Icon from '@iconify/svelte';
</script>

<div class="mx-auto max-w-2xl">
	<div class="mx-auto flex max-w-sm flex-col items-center gap-5 p-5 text-center">
		<h1 class="text-9xl">pi</h1>
		<p>
			visit <a
				class="text-gray-500 underline"
				href="https://github.com/engageintellect/pi-server-homepage">pi-server-homepage</a
			> to read the documentation
		</p>

		<div class="flex w-full gap-2">
			<a
				href="https://pi.engage-dev.com"
				class="flex w-full items-center justify-between gap-2 rounded-md bg-gray-900 px-5 py-2 text-white"
			>
				<div>home</div>
				<Icon icon="mdi:home" class="h-5 w-5" />
			</a>
			<a
				href="https://pi.engage-dev.com/pb/_/"
				class="flex w-full items-center justify-between gap-2 rounded-md bg-gray-900 px-5 py-2 text-white"
			>
				<div>db</div>

				<Icon icon="simple-icons:pocketbase" class="h-5 w-5" />
			</a>
		</div>
	</div>

	<div class="flex w-full">
		<img
			src="https://cdn3.botland.store/121185/raspberry-pi-5-4gb-.jpg"
			alt="Raspberry Pi"
			class="w-full"
		/>
	</div>

	<div class="flex w-full">
		<img src={raspberrypi2} alt="Raspberry Pi" class="w-full" />
	</div>
</div>
