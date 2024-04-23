/*
* Truncate a string to a certain length
* @param text: string
* @param length: number
* @returns string
*/
export const truncate = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
};
