<script lang="ts">
	import Card from './Card.svelte';
	import { images } from '$utils/images';
	import type { BoardState, PlayingCard } from '$core/types';
	import { CardState } from '$core/types';
	import SuccessInfo from './SuccessInfo.svelte';

	const cards = [
		...images,
		...images.map((image) => ({
			...image,
			id: `${image.id}_2`
		}))
	].sort((a, b) => 0.5 - Math.random());

	let boardState: BoardState = {
		availablePairs: cards.length / 2,
		foundPairs: [],
		guesses: 0,
		activePair: { first: undefined, second: undefined }
	};
	let currentTimeout: ReturnType<typeof setTimeout>;

	function clearPossibleTimeout() {
		if (currentTimeout) {
			clearTimeout(currentTimeout);
		}
	}

	function onFirstCardRevealed(card: PlayingCard) {
		boardState = {
			...boardState,
			activePair: {
				first: card
			}
		};
	}

	function onSecondCardRevealed(card: PlayingCard) {
		let { activePair, foundPairs, availablePairs, guesses } = boardState;
		const { path, id } = activePair.first!;
		if (path === card.path) {
			currentTimeout = setTimeout(() => {
				boardState = {
					...boardState,
					activePair: { first: undefined, second: undefined },
					foundPairs: [...foundPairs, id, card.id],
					availablePairs: (availablePairs -= 1)
				};
			}, 1000);
		} else {
			currentTimeout = setTimeout(() => {
				boardState = {
					...boardState,
					activePair: { first: undefined, second: undefined }
				};
			}, 1000);
		}
		boardState = {
			...boardState,
			guesses: (guesses += 1),
			activePair: {
				...activePair,
				second: card
			}
		};
	}

	function onGuess(card: PlayingCard) {
		const { activePair } = boardState;
		clearPossibleTimeout();
		if (activePair.first) {
			onSecondCardRevealed(card);
		} else {
			onFirstCardRevealed(card);
		}
	}

	function resetBoard() {
		boardState = {
			availablePairs: cards.length,
			foundPairs: [],
			guesses: 0,
			activePair: { first: undefined, second: undefined }
		};
	}
</script>

<div class="board">
	<div class="details">
		<p>Pareja jäljellä: {boardState.availablePairs}</p>
		<p>Arvauksia: {boardState.guesses}</p>
	</div>
	{#if boardState.availablePairs === 0}
		<SuccessInfo onReset={resetBoard} />
	{/if}
	<div class="cards">
		{#each cards ?? [] as card}
			<Card
				{card}
				onCardSelected={onGuess}
				state={boardState.foundPairs.includes(card.id)
					? CardState.FOUND
					: [boardState.activePair.first?.id, boardState.activePair.second?.id].includes(card.id)
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
		grid-auto-rows: 200px;
	}

	@media (min-width: 600px) {
		.cards {
			grid-template-columns: 1fr 1fr 1fr;
			grid-auto-rows: 400px;
		}
	}
	.details {
		display: flex;
		justify-content: space-between;
		font-size: 1.5rem;
		font-weight: 600;
	}
</style>
