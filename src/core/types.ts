export type BoardState = {
	cards: PlayingCard[];
	availablePairs: number;
	foundPairs: string[];
	guesses: number;
	activePair: ActivePair;
};

export enum CardState {
	FOUND = 'found',
	ACTIVE = 'active',
	INACTIVE = 'inactive',
	DISABLED = 'disabled'
}

export type PlayingCard = {
	id: string;
	path: string;
};

export type ActivePair = {
	first?: PlayingCard;
	second?: PlayingCard;
};
