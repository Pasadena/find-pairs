<script lang="ts">
	import { IMAGE_COUNT } from '$utils/cards';
	import { boardState, updateBoardSize } from '$core/boardStore';
	import type { BoardState } from '$core/types';

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
</script>

<div class="board-controls">
	<div class="content">
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
</div>

<style>
	.board-controls {
		width: 100%;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.2rem;
		font-weight: 600;
	}

	.content {
		width: 100%;
		display: flex;
		margin-top: 1rem;
		margin-left: 1rem;
		margin-right: 1rem;
	}

	.details {
		justify-self: flex-start;
	}

	.size-container {
		margin-left: auto;
	}

	p {
		margin-top: 0;
		margin-bottom: 0.5rem;
		color: white;
	}

	select {
		min-width: 100px;
		font-size: 1.2rem;
	}

	@media (min-width: 600px) {
		.content {
			width: 50%;
		}
	}
</style>
