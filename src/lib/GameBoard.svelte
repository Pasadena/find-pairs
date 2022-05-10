<script lang="ts">
	import Card from './Card.svelte';
	import { images } from '$utils/images';
	import type { PlayingCard, ActivePair } from '$core/types';
	import { CardState } from '$core/types';

	const cards = [
		...images,
		...images.map((image) => ({
			...image,
			id: `${image.id}_2`
		}))
	].sort((a, b) => 0.5 - Math.random());
	let guesses = 0;
	let remainingPairs = images.length;
	let activePair: ActivePair = { first: undefined, second: undefined };
	let revealed: string[] = [];
	let currentTimeout: ReturnType<typeof setTimeout>;

	function clearPossibleTimeout() {
		if (currentTimeout) {
			clearTimeout(currentTimeout);
		}
	}

	function onFirstCardRevealed(card: PlayingCard) {
		activePair.first = card;
	}

	function onSecondCardRevealed(card: PlayingCard) {
		const { path, id } = activePair.first!;
		if (path === card.path) {
			currentTimeout = setTimeout(() => {
				activePair = { first: undefined, second: undefined };
				revealed = [...revealed, id, card.id];
				remainingPairs -= 1;
			}, 1000);
		} else {
			currentTimeout = setTimeout(
				() => (activePair = { first: undefined, second: undefined }),
				1000
			);
		}
		guesses += 1;
		activePair.second = card;
	}

	function onGuess(card: PlayingCard) {
		clearPossibleTimeout();
		if (activePair.first) {
			onSecondCardRevealed(card);
		} else {
			onFirstCardRevealed(card);
		}
	}
</script>

<div class="board">
	<div class="details">
		<p>Pairs remaining: {remainingPairs}</p>
		<p>Guesses: {guesses}</p>
	</div>
	<div class="cards">
		{#each cards ?? [] as card}
			<Card
				{card}
				onCardSelected={onGuess}
				state={revealed.includes(card.id)
					? CardState.FOUND
					: [activePair.first?.id, activePair.second?.id].includes(card.id)
					? CardState.ACTIVE
					: CardState.INACTIVE}
			/>
		{/each}
	</div>
</div>

<style>
	.board {
		padding: 1rem;
		width: 100%;
		box-sizing: border-box;
	}
	.cards {
		width: 100%;
		display: grid;
		row-gap: 1rem;
		column-gap: 1rem;
		grid-template-columns: 1fr 1fr;
	}

	@media (min-width: 600px) {
		.cards {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}
	.details {
		display: flex;
		justify-content: space-between;
		font-size: 1.5rem;
		font-weight: 600;
	}
</style>
