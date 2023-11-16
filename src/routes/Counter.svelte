<script lang="ts">
	export let changeBackground: (x: number) => void;
	import { spring } from "svelte/motion";
	import IgnoreIncrementButton from "./IgnoreIncrementButton.svelte";

	let count = 0;
	let previous = 0;
	$: canUndo = false;
	let timeout: NodeJS.Timeout | undefined;

	const displayed_count = spring();
	$: displayed_count.set(count);
	$: offset = modulo($displayed_count, 1);
	$: shouldIncrement = true;

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}

	function stateChange(): void {
		changeBackground(count);
		clearTimeout(timeout);
		timeout = undefined;
		canUndo = false;
	}

	function increment(): number {
		if (!shouldIncrement) return count;
		count += 1;
		stateChange();
		return count;
	}

	function decrement(): number {
		count -= 1;
		stateChange();
		return count;
	}

	function reset(): number {
		previous = count;
		count = 0;
		changeBackground(count);
		canUndo = true;
		timeout = setTimeout(() => {
			canUndo = false;
		}, 5 * 1000);
		return count;
	}

	function undo(): number {
		count = previous;
		previous = 0;
		stateChange();
		return count;
	}
</script>

<!-- svelte-ignore a11y-interactive-supports-focus -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="counter-container" on:click={increment} role="button">
	<div class="counter">
		<IgnoreIncrementButton
			ariaLabel="Decrease the value of the counter by one"
			onClick={decrement}
			onBlur={() => (shouldIncrement = true)}
			onFocus={() => (shouldIncrement = false)}
		>
			<svg aria-hidden="true" viewBox="0 0 1 1">
				<path d="M0,0.5 L1,0.5" />
			</svg>
		</IgnoreIncrementButton>

		<div class="counter-viewport">
			<div
				class="counter-digits"
				style="transform: translate(0, {100 * offset}%)"
			>
				<strong class="hidden" aria-hidden="true"
					>{Math.floor($displayed_count + 1)}</strong
				>
				<strong>{Math.floor($displayed_count)}</strong>
			</div>
		</div>

		{#if !canUndo}
			<IgnoreIncrementButton
				onClick={reset}
				onFocus={() => (shouldIncrement = false)}
				onBlur={() => (shouldIncrement = true)}
				ariaLabel="Reset the counter to zero"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					x="0px"
					y="0px"
					width="100"
					height="100"
					viewBox="0 0 50 50"
				>
					<path
						d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"
					/>
				</svg>
			</IgnoreIncrementButton>
		{/if}

		{#if canUndo}
			<IgnoreIncrementButton
				onClick={undo}
				onFocus={() => (shouldIncrement = false)}
				onBlur={() => (shouldIncrement = true)}
				ariaLabel="Undo a reset"
			>
				<svg viewBox="0 0 21 21">
					<g
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						fill-rule="evenodd"
						stroke-linecap="round"
						stroke-linejoin="round"
						transform="matrix(0 1 1 0 2.5 2.5)"
					>
						<path
							d="m3.98652376 1.07807068c-2.38377179 1.38514556-3.98652376 3.96636605-3.98652376 6.92192932 0 4.418278 3.581722 8 8 8s8-3.581722 8-8-3.581722-8-8-8"
						/>
						<path d="m4 1v4h-4" transform="matrix(1 0 0 -1 0 6)" />
					</g>
				</svg>
			</IgnoreIncrementButton>
		{/if}
	</div>
</div>

<style>
	.counter-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		z-index: 0;
		width: 100%;
	}

	.counter {
		display: flex;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		margin: 1rem 0;
	}

	svg {
		width: 25%;
		height: 25%;
	}

	path {
		vector-effect: non-scaling-stroke;
		stroke-width: 2px;
		stroke: #eee;
	}

	.counter-viewport {
		width: 8em;
		height: 4em;
		overflow: hidden;
		text-align: center;
		position: relative;
	}

	.counter-viewport strong {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;
		font-weight: 400;
		color: var(--color-theme-1);
		font-size: 4rem;
		align-items: center;
		justify-content: center;
	}

	.counter-digits {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.hidden {
		top: -100%;
		user-select: none;
	}
</style>
