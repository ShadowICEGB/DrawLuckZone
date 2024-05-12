/**
 * @description Config file to define the default values of specific variables or arrays
 * @alias default
 * @name Config
*/

// Defines how many points are assigned per criterion
export const points = {
    1: 23000, // kleeblatt
    2: 25000, // mond
    3: 26000, // herz
    4: 21000, // stern
    5: 28000, // krone
    6: 22000, // hufeisen
    7: 5000, // joker
    8: 10000, // 2er
    9: 35000, // full house
    10: 50000, // alle eimal
    11: 80000, // 4er
    12: 100000 // 5er
}; // 425000 in total
export const pointsCriteria: { name: string; fulfilled: boolean; used: boolean }[] = [
    { name: "🍀🍀🍀", fulfilled: false, used: false },
    { name: "🌙🌙🌙", fulfilled: false, used: false },
    { name: "❤️❤️❤️", fulfilled: false, used: false },
    { name: "⭐⭐⭐", fulfilled: false, used: false },
    { name: "👑👑👑", fulfilled: false, used: false },
    { name: "🧲🧲🧲", fulfilled: false, used: false },
    { name: "🃏", fulfilled: false, used: false },
    { name: "⚡⚡", fulfilled: false, used: false },
    { name: "⚡⚡⚡➕🔴🔴", fulfilled: false, used: false },
    { name: "⚡🟥🔴🟢🔶", fulfilled: false, used: false },
    { name: "⚡⚡⚡⚡", fulfilled: false, used: false },
    { name: "⚡⚡⚡⚡⚡", fulfilled: false, used: false }
];

// Handle the state of the two draw buttons
export const drawButtonsState: boolean[] = [false, false, false];

// Gamestats
export const isGameStarting: boolean = false;
export const startGame: boolean = false;
export const finishGame: boolean = false;
export const gameStartingCountdown: number = 7;
export const spinning: boolean = false;

// Round Stats
export const currentRound: number = 1;
export const playerTotalPoints: number = 0;
export const playerGoalPoints: number = 250000;
export const playerRoundpoints: number = 0;
export const timeLeft: number = 180; // Game timer of 3 minutes
export const playername: string = "ShadowICE";
export const playerHighscore: string = "0";




export const cardImages: string[] = ["herz", "stern", "krone", "kleeblatt", "hufeisen", "mond"];