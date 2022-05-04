export type PlayingCard = {
	id: string;
	path: string;
};

export type ActivePair = {
	first?: PlayingCard;
	second?: PlayingCard;
};
