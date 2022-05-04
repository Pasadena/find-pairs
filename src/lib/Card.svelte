<script lang="ts">
	export let card: PlayingCard = undefined;
	export let revealed = false;
	export let active = false;
	export let onCardSelected: (card: PlayingCard) => void;

	function onClick() {
		onCardSelected(card);
	}
</script>

<div class="card" on:click={onClick}>
	{#if !revealed}
		{#if active}
			<img src={card.path} alt={card.id} />
		{:else}
			<img src="images/question_mark.png" alt={card.id} />
		{/if}
	{/if}
</div>

<style>
	.card {
		border: 1px solid salmon;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: border 0.2s ease-in-out;
		overflow: hidden;
	}

	.card:hover {
		cursor: pointer;
		border: 1px solid rgb(168, 114, 250);
		box-shadow: 1px 1px 5px rgb(182, 145, 236);
	}

	.card img {
		height: 200px;
		width: 100%;
		flex-grow: 0;
		object-fit: cover;
	}
</style>
