


// Points per criteria
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