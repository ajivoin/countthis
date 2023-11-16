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

	$: angle = (360 * modulo(count, gradients.length ** 2)) / gradients.length;
	$: index = modulo(count, gradients.length);

	function changeBackground(n: number): void {
		count = n;
	}

	function formatGradient(row: string[]): string {
		return row.join(", ");
	}
</script>

<svelte:head>
	<title>Count THIS!</title>
	<meta name="description" content="Count THIS!" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<section
	style="--bg: linear-gradient({angle}deg, {formatGradient(gradients[index])}"
>
	<Counter {changeBackground} />
</section>

<style>
	section {
		-webkit-transition: background-image 0.2s ease-in-out;
		transition: background-image 0.2s ease-in-out;
		background-image: var(--bg);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		width: 100%;
	}

	@media (prefers-reduced-motion) {
		section {
			background-image: linear-gradient(0deg, #e73c7e, #23a6d5);
		}
	}

	@media (prefers-color-scheme: dark) {
		section {
			background-image: none;
			background-color: #111;
		}
	}
</style>
