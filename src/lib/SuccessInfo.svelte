<script lang="ts">
	export let onReset: () => void;
</script>

<div class="success-block">
	<p class="header">Onneksi olkoon!</p>
	<p class="congratulations-msg">Kaikki parit löytyivät :)</p>
	<button on:click={onReset}>Uusi peli</button>
</div>

<style>
	.success-block {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	p {
		margin-bottom: 0;
	}
	.header {
		font-size: 2.5rem;
	}
	.congratulations-msg {
		font-size: 2rem;
		margin-bottom: 1rem;
	}
	button {
		border-radius: 2rem;
		background-color: var(--accent-color);
		color: var(--secondary-color);
		padding: 1rem 0.5rem;
		font-size: 1.5rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	button:hover {
		background-color: var(--secondary-color);
		color: var(--accent-color);
	}
</style>
