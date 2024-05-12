import { type Writable, writable } from "svelte/store";
import type { GameStats } from "./types";

export const supportSubjectValue: Writable<string> = writable('');
export const setSupportSubjectValue = (value: string) => {supportSubjectValue.set(value)};



export const cards: Writable<string[]> = writable(['⭐','⭐','⭐','⭐','⭐']);
export const setCards = (value: string[]) => {cards.set(value)};





export const heldCards: Writable<boolean[]> = writable([false, false, false, false, false,]);
export const setHeldCards = (value: boolean[]) => {heldCards.set(value)};


export const gameStats: Writable<GameStats> = writable({
    playername: '',
    pointsPerRound: '',
    totalPoints: '',
    spinning: false
});
export const setGameStats = (value: GameStats) => {gameStats.set(value)};
