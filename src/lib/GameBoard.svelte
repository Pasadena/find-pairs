<script lang="ts">
	import Card from './Card.svelte';
	import { generateCardList, IMAGE_COUNT } from '$utils/cards';
	import type { BoardState, PlayingCard } from '$core/types';
	import { CardState } from '$core/types';
	import SuccessInfo from './SuccessInfo.svelte';

	let cards = generateCardList(3);
	$: pairCount = cards.length / 2;

	let boardState: BoardState = {
		availablePairs: cards.length / 2,
		foundPairs: [],
		guesses: 0,
		activePair: { first: undefined, second: undefined }
	};
	let currentTimeout: ReturnType<typeof setTimeout>;

	function setBoardSize(e: Event) {
		if (e.target) {
			const size = (e.target as HTMLSelectElement).value;
			cards = generateCardList(Number(size));
			resetBoard();
		}
	}

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
	<div class="board-controls">
		<div class="details">
			<p>Pareja jäljellä: {pairCount}</p>
			<p>Arvauksia: {boardState.guesses}</p>
		</div>
		<div class="size-container">
			<label for="size-select">Pareja:</label>
			<select id="size-select" on:change={setBoardSize} value={pairCount}>
				{#each Array(IMAGE_COUNT) as _, i}
					<option id={String(i + 1)} selected={i === cards.length}>{i + 1}</option>
				{/each}
			</select>
		</div>
	</div>

	{#if boardState.availablePairs === 0}
		<SuccessInfo onReset={resetBoard} />
	{/if}
	<div
		class="cards"
		style="grid-template-columns: repeat({Math.min(pairCount, 3)}, minmax(100px, 400px));"
	>
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

	.board-controls {
		display: flex;
		font-size: 1.2rem;
		font-weight: 600;
	}

	.size-container {
		margin-top: 0.5rem;
		margin-left: auto;
	}

	p {
		margin-top: 0.5rem;
		margin-bottom: 0.5rem;
	}

	select {
		min-width: 100px;
		font-size: 1.2rem;
	}
	.cards {
		display: grid;
		align-items: center;
		justify-content: center;
		row-gap: 1rem;
		column-gap: 1rem;
	}

	@media (min-width: 600px) {
		.cards {
			grid-auto-rows: 400px;
		}
		.board-controls {
			font-size: 1.5rem;
		}
	}
</style>
