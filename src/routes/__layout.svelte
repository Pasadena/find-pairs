<script lang="ts">
	import '../app.css';
	import GameDetails from '$lib/GameDetails.svelte';
</script>

<header>
	<h1>Etsi parit</h1>
</header>

<main>
	<slot />
</main>

<footer><GameDetails /></footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
	header {
		background-color: var(--primary-color);
		width: 100%;
		margin: 0;
		padding: 1rem;
		box-sizing: border-box;
	}

	footer {
		background-color: var(--primary-color);
	}

	h1 {
		color: var(--secondary-color);
		font-size: 3rem;
		padding: 0;
		margin: 0;
	}
</style>
