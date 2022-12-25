<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import GameBoard from '$lib/GameBoard.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<GameBoard />
	<SvelteToast
		options={{ duration: 1000, dismissable: false, reversed: true, intro: { y: 192 } }}
	/>
</section>

<style>
	section {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>
