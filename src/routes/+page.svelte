<script lang="ts">
	import Counter from "./Counter.svelte";

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}

	let count = 0;

	const gradients = [
		["#e73c7e", "#23a6d5"],
		["red", "yellow"],
		["#fcb045", "#833ab4"],
		["#020024", "#00d4ff"],
		["rgb(182, 244, 146)", "rgb(51, 139, 147)"],
	];

	function changeBackground(n: number): void {
		count = n;
	}
</script>

<svelte:head>
	<title>Count THIS!</title>
	<meta name="description" content="Count THIS!" />
</svelte:head>

<section
	style="--bg: {`linear-gradient(${
		(360 * modulo(count, gradients.length ** 2)) / gradients.length ** 2
	}deg, ${gradients[modulo(count, gradients.length)][0]}, ${
		gradients[modulo(count, gradients.length)][1]
	})`}"
>
	<Counter {changeBackground} />
</section>

<style>
	section {
		background-image: var(--bg);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		width: 100%;
	}
</style>
