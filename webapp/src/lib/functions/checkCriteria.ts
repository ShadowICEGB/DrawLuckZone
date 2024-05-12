// Import variable values from config file
import { pointsCriteria } from '$lib/config';
import { cards } from '$lib/store';
import { get } from 'svelte/store';


// Check criteria
export function checkCriteria() {
    // Reset all criteria to false
    pointsCriteria.forEach(criteria => {
        criteria.fulfilled = false;
    });
    
    const currentCards: string[] = get(cards);
    const uniqueCards: string[] = currentCards;


    // Count how many times each card appears
    const kleeblattCount = currentCards.filter(card => card === 'kleeblatt').length;
    const hufeisenCount = currentCards.filter(card => card === 'hufeisen').length;
    const mondCount = currentCards.filter(card => card === 'mond').length;
    const herzCount = currentCards.filter(card => card === 'herz').length;
    const sternCount = currentCards.filter(card => card === 'stern').length;
    const kroneCount = currentCards.filter(card => card === 'krone').length;
    const jokerCount = currentCards.filter(card => card === card).length;

    // Check if any criteria is 3 times the same card
    if (kleeblattCount >= 3) {pointsCriteria[0].fulfilled = true;}
    if (mondCount >= 3) {pointsCriteria[1].fulfilled = true;}
    if (herzCount >= 3) {pointsCriteria[2].fulfilled = true;}
    if (sternCount >= 3) {pointsCriteria[3].fulfilled = true;}
    if (kroneCount >= 3) {pointsCriteria[4].fulfilled = true;}
    if (hufeisenCount >= 3) {pointsCriteria[5].fulfilled = true;}

    // Check if any criteria is 1 joker that can be used as any criteria
    if (jokerCount >= 1) {pointsCriteria[6].fulfilled = true;} else {pointsCriteria[6].fulfilled = false;}

    // Check if any criteria is at least 2 times the same card
    if (uniqueCards.filter(card => currentCards.filter(c => c === card).length >= 2).length >= 2) {
        pointsCriteria[7].fulfilled = true;
    } else {pointsCriteria[7].fulfilled = false;}

    // Check if any criteria is full house
    if (uniqueCards.every(card => currentCards.filter(c => c === card).length === 2 || currentCards.filter(c => c === card).length === 3)) {
        pointsCriteria[8].fulfilled = true;
    }

    // Check if any criteria is 5 different cards
    if (uniqueCards.every(card => currentCards.filter(c => c === card).length === 1)) {
        pointsCriteria[9].fulfilled = true;
    }

    // Check if any criteria is 4 times the same card
    if (uniqueCards.some(card => currentCards.filter(c => c === card).length === 4)) {
        pointsCriteria[10].fulfilled = true;
    }

    // Check if any criteria is 5 times the same card
    if (uniqueCards.some(card => currentCards.filter(c => c === card).length === 5)) {
        pointsCriteria[10].fulfilled = true;
        pointsCriteria[11].fulfilled = true;
    }
}
