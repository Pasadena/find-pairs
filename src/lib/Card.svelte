<script lang="ts">
	import { type PlayingCard, CardState } from '$core/types';

	export let card: PlayingCard;
	export let state: CardState = CardState.INACTIVE;
	export let onCardSelected: (card: PlayingCard) => void;

	function onClick() {
		if (state === CardState.INACTIVE) {
			onCardSelected(card);
		}
	}
</script>

<div
	class="card"
	class:found={state == CardState.FOUND}
	class:disabled={state == CardState.DISABLED}
	on:click={onClick}
>
	{#if state !== CardState.FOUND}
		<img
			src={state === CardState.ACTIVE ? card.path : 'images/question-mark-icon.svg'}
			alt={card.id}
			class:question-mark={state !== CardState.ACTIVE}
		/>
	{/if}
</div>

<style>
	.card {
		height: 100%;
		width: 100%;
		border: 1px solid var(--primary-color);
		border-radius: 1rem;
		box-shadow: 1px 1px 3px var(--primary-color);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: border 0.2s ease-in-out;
		overflow: hidden;
	}

	.card.found {
		border: none;
		box-shadow: none;
	}

	.card.disabled {
		pointer-events: none;
		opacity: 0.4;
	}

	.card:hover {
		cursor: pointer;
		border: 1px solid var(--accent-color);
		box-shadow: 2px 2px 5px var(--accent-color);
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
		object-fit: cover;
	}

	img.question-mark {
		height: 90%;
		object-fit: unset;
	}
</style>
