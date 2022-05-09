<script lang="ts">
	import { type PlayingCard, CardState } from '$core/types';

	export let card: PlayingCard;
	export let state: CardState = CardState.INACTIVE;
	export let onCardSelected: (card: PlayingCard) => void;

	function onClick() {
		if (![CardState.FOUND, CardState.ACTIVE].includes(state)) {
			onCardSelected(card);
		}
	}
</script>

<div class="card {state == CardState.FOUND && 'found'}" on:click={onClick}>
	{#if state !== CardState.FOUND}
		<img src={state === CardState.ACTIVE ? card.path : 'images/question_mark.png'} alt={card.id} />
	{/if}
</div>

<style>
	.card {
		height: 100%;
		width: 100%;
		border: 1px solid salmon;
		border-radius: 1rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: border 0.2s ease-in-out;
		overflow: hidden;
	}

	.card.found {
		border: none;
	}

	.card:hover {
		cursor: pointer;
		border: 1px solid rgb(168, 114, 250);
		box-shadow: 1px 1px 5px rgb(182, 145, 236);
	}

	.card.found:hover {
		border: none;
		box-shadow: none;
		cursor: none;
		pointer-events: none;
	}

	.card img {
		height: 100%;
		width: 100%;
		flex-grow: 0;
		object-fit: cover;
	}
</style>
