export type BoardState = {
	availablePairs: number;
	foundPairs: string[];
	guesses: number;
	activePair: ActivePair;
};

export enum CardState {
	FOUND = 'found',
	ACTIVE = 'active',
	INACTIVE = 'inactive'
}

export type PlayingCard = {
	id: string;
	path: string;
};

export type ActivePair = {
	first?: PlayingCard;
	second?: PlayingCard;
};
