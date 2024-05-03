import { type Writable, writable } from "svelte/store";

export const supportSubjectValue: Writable<string> = writable('');
export const setSupportSubjectValue = (value: string) => {supportSubjectValue.set(value)};
