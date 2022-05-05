<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import GameBoard from '$lib/GameBoard.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Etsi parit</h1>
	<GameBoard />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		margin: 0;
		padding: 1rem;
		background-color: hotpink;
		width: 100%;
		font-size: 3rem;
	}
</style>
