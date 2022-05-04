/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	interface Locals {
		userid: string;
	}

	// interface Platform {}

	// interface Session {}

	// interface Stuff {}

	declare interface PlayingCard {
		id: string;
		path: string;
	}
}

declare global {
	type PlayingCard = {
		id: string;
		path: string;
		order: number;
	};
}
