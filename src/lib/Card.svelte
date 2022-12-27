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
	class:flipped={state == CardState.ACTIVE}
	on:click={onClick}
>
	{#if state !== CardState.FOUND}
		<div class="card-inner">
			<div class="card-front">
				<img src="images/question-mark-icon.svg" alt={card.id} />
			</div>
			<div class="card-back">
				<img src={card.path} alt={card.id} />
			</div>
		</div>
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
		perspective: 1000;
	}

	.card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		transition: transform 0.6s;
		transform-style: preserve-3d;
	}

	.card-front,
	.card-back {
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 100%;
		height: 100%;
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
	}

	.card-front img {
		height: 90%;
	}

	.card-back {
		transform: rotateY(180deg);
	}

	.card-back img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		border-radius: 1rem;
	}

	.flipped .card-inner {
		transform: rotateY(180deg);
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
</style>
