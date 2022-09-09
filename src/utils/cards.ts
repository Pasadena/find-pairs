import type { PlayingCard } from '$core/types';

const eppu_barbell = 'images/eppu_barbell.jpg';
const malla_virpoja = 'images/malla_virpoja.jpg';
const malla_guitar = 'images/malla_guitar.jpg';

const images: PlayingCard[] = [
	{ id: 'eppu_barbell', path: eppu_barbell },
	{ id: 'malla_virpoja', path: malla_virpoja },
	{ id: 'malla_guitar', path: malla_guitar }
];

export const IMAGE_COUNT = images.length;

const shuffleCards = (cards: PlayingCard[]) => cards.sort(() => 0.5 - Math.random());

export const generateCardList = (seed: number) => {
	const shuffledImages = shuffleCards(images).slice(0, seed);
	return shuffleCards([
		...shuffledImages,
		...shuffledImages.map((image) => ({
			...image,
			id: `${image.id}_2`
		}))
	]);
};
