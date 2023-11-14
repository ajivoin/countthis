<script lang="ts">
    export let onClick: () => any;
    export let onFocus: () => any;
    export let onBlur: () => any;
    export let ariaLabel: string;
</script>

<button
    on:click={onClick}
    on:focus={onFocus}
    on:mouseenter={onFocus}
    on:blur={onBlur}
    on:mouseleave={onBlur}
    aria-label={ariaLabel}
>
    <slot />
</button>

<style>
    button {
        width: 2em;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 0;
        background-color: transparent;
        touch-action: manipulation;
        font-size: 2rem;
    }

    button:hover {
        background-color: var(--color-bg-1);
    }
</style>
