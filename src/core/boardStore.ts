import { generateCardList } from '$utils/cards';
import { writable } from 'svelte/store';
import type { BoardState, PlayingCard } from './types';

const DEFAULT_AMOUNT_OF_PAIRS = 3;

const getDefaultState = (cards: PlayingCard[]): BoardState => ({
	cards,
	availablePairs: cards.length / 2,
	foundPairs: [],
	guesses: 0,
	activePair: { first: undefined, second: undefined }
});

export const boardState = writable(getDefaultState(generateCardList(DEFAULT_AMOUNT_OF_PAIRS)));

export const setDefaultState = () =>
	boardState.set(getDefaultState(generateCardList(DEFAULT_AMOUNT_OF_PAIRS)));

export const updateBoardSize = (size: number) => {
	const cards = generateCardList(size);
	boardState.set(getDefaultState(cards));
};

export const showFirstGuess = (card: PlayingCard) => {
	boardState.update((state) => ({
		...state,
		activePair: {
			first: card
		}
	}));
};

export const showSecondGuess = (card: PlayingCard) => {
	boardState.update((state) => ({
		...state,
		guesses: (state.guesses += 1),
		activePair: {
			...state.activePair,
			second: card
		}
	}));
};

export const recordSuccessfulGuess = (card: PlayingCard) => {
	boardState.update((state) => {
		const { id } = state.activePair.first!; //eslint-disable-line
		return {
			...state,
			activePair: { first: undefined, second: undefined },
			foundPairs: [...state.foundPairs, id, card.id],
			availablePairs: (state.availablePairs -= 1)
		};
	});
};

export const recordFailedGuess = () => {
	boardState.update((state) => {
		const { id } = state.activePair.first!; //eslint-disable-line
		return {
			...state,
			activePair: { first: undefined, second: undefined }
		};
	});
};
