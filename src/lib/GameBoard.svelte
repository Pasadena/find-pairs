<script lang="ts">
	import Card from './Card.svelte';
	import { IMAGE_COUNT } from '$utils/cards';
	import type { BoardState, PlayingCard } from '$core/types';
	import { CardState } from '$core/types';
	import SuccessInfo from './SuccessInfo.svelte';
	import {
		boardState,
		recordFailedGuess,
		recordSuccessfulGuess,
		setDefaultState,
		showFirstGuess,
		showSecondGuess,
		updateBoardSize
	} from '$core/boardStore';

	let board: BoardState;
	boardState.subscribe((state) => {
		board = state;
	});
	$: pairCount = board.cards.length / 2;

	function setBoardSize(e: Event) {
		if (e.target) {
			updateBoardSize(Number((e.target as HTMLSelectElement).value));
		}
	}

	function onSecondCardRevealed(card: PlayingCard) {
		let { activePair } = board;
		const { path } = activePair.first!;
		setTimeout(
			() => (path === card.path ? recordSuccessfulGuess(card) : recordFailedGuess()),
			1000
		);
		showSecondGuess(card);
	}

	function onGuess(card: PlayingCard) {
		const { activePair } = board;
		if (activePair.first) {
			onSecondCardRevealed(card);
		} else {
			showFirstGuess(card);
		}
	}

	function resetBoard() {
		setDefaultState();
	}

	function getCardState(card: PlayingCard) {
		if (board.foundPairs.includes(card.id)) {
			return CardState.FOUND;
		} else if ([board.activePair.first?.id, board.activePair.second?.id].includes(card.id)) {
			return CardState.ACTIVE;
		} else if (!!board.activePair.second) {
			return CardState.DISABLED;
		} else {
			return CardState.INACTIVE;
		}
	}
</script>

<div class="board">
	<div class="board-controls">
		<div class="details">
			<p>Pareja jäljellä: {board.availablePairs}</p>
			<p>Arvauksia: {board.guesses}</p>
		</div>
		<div class="size-container">
			<label for="size-select">Pareja:</label>
			<select id="size-select" on:change={setBoardSize} value={pairCount}>
				{#each Array(IMAGE_COUNT) as _, i}
					<option id={String(i + 1)} selected={i === pairCount}>{i + 1}</option>
				{/each}
			</select>
		</div>
	</div>

	{#if board.availablePairs === 0}
		<SuccessInfo onReset={resetBoard} />
	{/if}
	<div
		class="cards"
		style="grid-template-columns: repeat({Math.min(pairCount, 3)}, minmax(100px, 400px));"
	>
		{#each board.cards ?? [] as card}
			<Card {card} onCardSelected={onGuess} state={getCardState(card)} />
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
