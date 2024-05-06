import { type Writable, writable } from "svelte/store";

export const supportSubjectValue: Writable<string> = writable('');
export const setSupportSubjectValue = (value: string) => {supportSubjectValue.set(value)};



export const cards: Writable<string[]> = writable(['⭐','⭐','⭐','⭐','⭐']);
export const setCards = (value: string[]) => {cards.set(value)};