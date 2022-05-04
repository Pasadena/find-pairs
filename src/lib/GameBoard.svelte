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
	function onGuess(card: PlayingCard) {
		console.log('FOO', activePair, card);
		if (activePair.first) {
			activePair.second = card;
			if (activePair.first.path === card.path) {
				revealed.push(activePair.first.id);
				revealed.push(card.id);
				revealed = revealed;
			}
			setTimeout(() => (activePair = { first: undefined, second: undefined }), 1000);
		} else {
			activePair.first = card;
		}
	}
</script>

<div>
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
	.cards {
		width: 100%;
		display: grid;
		row-gap: 1rem;
		column-gap: 1rem;
		grid-template-columns: 200px 200px 200px;
	}
	.details {
		display: flex;
		justify-content: space-between;
	}
</style>
