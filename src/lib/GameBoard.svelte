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

	function resetBoard() {
		guesses = 0;
		remainingPairs = images.length;
		activePair = { first: undefined, second: undefined };
		revealed = [];
	}
</script>

<div class="board">
	<div class="details">
		<p>Pairs remaining: {remainingPairs}</p>
		<p>Guesses: {guesses}</p>
	</div>
	{#if remainingPairs === 0}
		<div class="success-block">
			<p class="congratulations-msg">Onneksi olkoon! Kaikki parit löytyivät :)</p>
			<button on:click={resetBoard}>Uusi peli</button>
		</div>
	{/if}
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

	.success-block {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.congratulations-msg {
		font-size: 3rem;
	}

	button {
		border-radius: 6px;
		background-color: hotpink;
		color: white;
		padding: 1rem 0.5rem;
		font-size: 1.5rem;
		cursor: pointer;
		transition: all 0.2s;
	}

	button:hover {
		background-color: white;
		color: hotpink;
	}
</style>
