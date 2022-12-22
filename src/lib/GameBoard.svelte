<script lang="ts">
	import Card from './Card.svelte';
	import GameDetails from './GameDetails.svelte';
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
	import { toastMatchFound, toastNoMatch } from '$core/toasts';

	let board: BoardState;
	boardState.subscribe((state) => {
		board = state;
	});
	$: pairCount = board.cards.length / 2;

	function onSecondCardRevealed(card: PlayingCard) {
		let { activePair } = board;
		const { path } = activePair.first!;
		setTimeout(
			() => (path === card.path ? recordSuccessfulGuess(card) : recordFailedGuess()),
			1000
		);
		path === card.path ? toastMatchFound('Pari löytyi!') : toastNoMatch('Ei paria :(');
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
	// style="grid-template-columns: repeat({Math.min(pairCount, 3)}, minmax(100px, 400px));"
</script>

<div class="board">
	{#if board.availablePairs === 0}
		<SuccessInfo onReset={resetBoard} />
	{/if}
	<div class="cards">
		{#each board.cards ?? [] as card}
			<Card {card} onCardSelected={onGuess} state={getCardState(card)} />
		{/each}
	</div>
	<GameDetails />
</div>

<style>
	.board {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		width: 100%;
		box-sizing: border-box;
	}
	.cards {
		grid-auto-rows: auto;
		grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
		display: grid;
		align-items: center;
		justify-content: center;
		row-gap: 1rem;
		column-gap: 1rem;
		width: 100%;
	}

	@media (min-width: 600px) {
		.cards {
			width: 50%;
			grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		}
	}
</style>
