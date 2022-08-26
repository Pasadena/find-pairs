<script lang="ts">
	export let onReset: () => void;
</script>

<div class="success-block">
	<p class="congratulations-msg">Onneksi olkoon! Kaikki parit löytyivät :)</p>
	<button on:click={onReset}>Uusi peli</button>
</div>

<style>
	.success-block {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.congratulations-msg {
		font-size: 3rem;
	}
	button {
		border-radius: 6px;
		background-color: hotpink;
		color: white;
		padding: 1rem 0.5rem;
		font-size: 1.5rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	button:hover {
		background-color: white;
		color: hotpink;
	}
</style>
