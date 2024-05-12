import { cardImages } from "$lib/config";

// Get random cards
export function getRandomCard() {
    return cardImages[Math.floor(Math.random() * cardImages.length)];
}
