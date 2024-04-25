<script lang="ts">
	import raspberryPi from '$lib/assets/images/raspberrypi.png';
</script>

<div class="mx-auto max-w-2xl">
	<div class="mx-auto flex max-w-sm flex-col items-center gap-5 p-5 text-center">
		<h1 class="text-9xl">pi</h1>
		<p>
			Visit <a
				class="text-gray-500 underline"
				href="https://github.com/engageintellect/pi-server-homepage">pi-server-homepage</a
			> to read the documentation
		</p>

		<div class="flex w-full gap-5">
			<a href="https://pi.engage-dev.com" class="w-full rounded-md bg-gray-900 px-5 py-2 text-white"
				>home</a
			>
			<a
				href="https://pi.engage-dev.com/pb/_/"
				class="w-full rounded-md bg-gray-900 px-5 py-2 text-white">db</a
			>
		</div>
	</div>

	<div class="flex w-full">
		<img src={raspberryPi} alt="Raspberry Pi" class="w-full" />
	</div>
</div>
