<script lang="ts">
    import { onMount } from 'svelte';
    import { writable, type Writable } from 'svelte/store';
    import { truncate } from '$lib/functions/truncate';
    import { get } from 'svelte/store';

    // Import images
    import kleeblatt from '$lib/images/game/kleeblatt.png';
    import herz from '$lib/images/game/herz.png';
    import mond from '$lib/images/game/mond.png';
    import stern from '$lib/images/game/stern.png';
    import krone from '$lib/images/game/krone.png';
    import hufeisen from '$lib/images/game/hufeisen.png';
    import x from '$lib/images/game/x.png';
    import ziel from '$lib/images/game/ziel.png';

    // Array of all cards
    const cardImages: string[] = ["herz", "stern", "krone", "kleeblatt", "hufeisen", "mond"];
    const pointsCriteria: { name: string; fulfilled: boolean; used: boolean }[] = [
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

    // Points per criteria
    const points: any = {
        1: 4200,
        2: 6800,
        3: 12600,
        4: 18900,
        5: 24000,
        6: 28800,
        7: 35200,
        8: 25600,
        9: 35000,
        10: 60000,
        11: 80000,
        12: 100000
    }; // 574700 in total

    // Gamestats
    let startGame: boolean = false;
    let round: number = 1;
    let totalPoints: number = 0;
    let goalPoints: number = 275000;
    let pointsPerRound: number = 0;
    let timeLeft: number = 180; // 3 Minutes
    let spinning: boolean = false;
    let playername: string = "ShadowICE";
    let drawButtonsDisabled: boolean[] = [false, false, false];
    let gameFinished: boolean = false;
    let isGameStarting: boolean = false;
    let gameStartingCountdown: number = 5;

    // Cards
    let cards: Writable<string[]> = writable(['⭐','⭐','⭐','⭐','⭐']);
    let countdownInterval: NodeJS.Timeout;
    let heldCards: boolean[] = [false, false, false, false, false];

    // Display Game Start Countdown
    const firstGameStart = () => {
        isGameStarting = true;
        const countdown = setInterval(() => {
            if (gameStartingCountdown > 0) {gameStartingCountdown--;} 
            else {
                clearInterval(countdown);
                isGameStarting = false;
                gameStart();
            }
        }, 1000);
    }

    // Start game
    const gameStart = () => {
        startGame = true;

        // Countdown
        countdownInterval = setInterval(() => {
            if (timeLeft > 0) {timeLeft--;} 
            else {
                handleRounds();
                clearInterval(countdownInterval);
            }
        }, 1000);
        spin(0);
    }

    // Get random cards
    function getRandomCard() {return cardImages[Math.floor(Math.random() * cardImages.length)];}

    // Hold cards
    function toggleHold(index: number) {heldCards[index] = !heldCards[index];}

    // Spin cards
    function spin(buttonIndex: number) {
        spinning = true;
        drawButtonsDisabled[buttonIndex] = true;

        // Spin cards
        for (let i = 0; i < 5; i++) {
            if (!heldCards[i]) { 
                cards.update(cards => {
                    cards[i] = getRandomCard();
                    return cards;
                });
            }
        }
        checkCriteria();

        // Check if both buttons are disabled
        if (drawButtonsDisabled[1] && drawButtonsDisabled[2]) {

            // Get all criteria that are not used and fulfilled
            const unusedCriteria = pointsCriteria.filter(criteria => criteria.fulfilled === true && criteria.used === false);
            if (unusedCriteria.length <= 0) {
                handleRounds();
            }
        }
    }

    // Check criteria
     function checkCriteria() {
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

    // Handle criteria click, only clickable if the criteria is fulfilled
    function handleCriteriaClick(index: number) {
        if (pointsCriteria[index].used === false && pointsCriteria[index].fulfilled === true) {
            pointsCriteria[index].used = true;
            
            // reset draw buttons
            drawButtonsDisabled[1] = false;
            drawButtonsDisabled[2] = false;

            // reset holded cards
            heldCards = [false, false, false, false, false];

            // Add points
            pointsPerRound += points[index + 1];
            totalPoints += pointsPerRound;

            // trigger new spin
            spin(0);
        }
    }




    // Handle rounds
    function handleRounds() {
        if (round < 5) {
            pointsCriteria.forEach(criteria => {
                criteria.fulfilled = false;
                criteria.used = false;
            });
            heldCards = [false, false, false, false, false];
            // Check if the goal points are reached
            if (pointsPerRound >= goalPoints) {
                cards.update(cards => {
                    cards = cards.map(() => 'ziel');
                    return cards;
                });
            } else {
                cards.update(cards => {
                    cards = cards.map(() => 'x');
                    return cards;
                });
            }
            round++;
            pointsPerRound = 0;
            timeLeft = 180;
            spinning = false;
            setTimeout(() => {
                drawButtonsDisabled = [false, false, false];
                gameStart();
            }, 5000);
        } else {
            gameFinished = true;
        }
    }





    // Stop game and reset all values
    function stopGame() {
        startGame = false;
        round = 1;
        goalPoints = 18000;
        pointsPerRound = 0;
        timeLeft = 180;
        spinning = false;
        playername = "ShadowICE";
        drawButtonsDisabled = [false, false, false];
        heldCards = [false, false, false, false, false];
        clearInterval(countdownInterval);
        cards.update(cards => {
            cards = cards.map(() => 'x');
            return cards;
        });
    }

    $: timePercentage = (timeLeft / 180) * 100;
    $: pointsPercentage = (pointsPerRound / goalPoints) * 100;

    onMount(() => {
        firstGameStart();
    });
</script>

<main>
    <div class="container">
        {#if gameFinished}
        <div class="finished">
            <h3>Game finished</h3>
            <h4>Total points: {totalPoints}</h4>
        </div>
        {:else}
        <div class="game-board relative top-24 flex items-center justify-between">
            {#if isGameStarting}
            <div class="countdown absolute w-full h-full z-50 flex justify-center items-center" style="background-color: var(--primaryBg);">
                <div class="countdown-inner flex flex-col items-center justify-between mt-10 h-28">
                    <p class="font-bold tracking-widest uppercase" style="font-size: clamp(30px, 4vw, 44px);">Spiel startet in</p>
                    <p class="font-bold italic" style="font-size: clamp(60px, 4vw, 100px);">{gameStartingCountdown}</p>
                </div>
            </div>
            {/if}
            <div class="w-2/3">
                <div class="stats flex items-center">
                    <div class="flex flex-col h-24 justify-center">
                        <button class="btnCustom h-1/2" on:click={stopGame}><span class="relative">Exit</span></button>
                        <div class="btnCustom h-1/2 mt-1"><span class="relative select-none flex justify-center items-center" style="margin-top: 6px;">Round <span class="ml-1">{round}</span>/5</span></div>
                    </div>
                    <div class="w-3/4 h-24 mx-5">
                        <div class="time-left h-1/2 rounded-lg relative overflow-hidden">
                            <div class="bar absolute top-0 left-0 w-full h-full" style="width: {timePercentage}%; transition: all 0.1s ease-in-out;background: linear-gradient(30deg, var(--accentPink), var(--accentPurple), var(--accentBlue));"></div>
                        </div>
                        <div class="goal-points rounded-lg relative border overflow-hidden flex items-center justify-center mt-1">
                            <div class="bar absolute top-0 left-0 w-full h-full" style="width: {pointsPercentage}%; transition: all 0.1s ease-in-out;background: var(--accentPink);"></div>
                            <span class="text-lg font-bold select-none relative">{pointsPerRound}/{goalPoints}</span>
                        </div>
                    </div>
                    <div class="flex flex-col h-24 justify-center">
                        <div class="playername btnCustom h-1/2 w-44 flex justify-center items-center"><span class="relative select-none">{truncate(playername,10)}</span></div>
                        <div class="total-points btnCustom h-1/2 mt-1 flex justify-center items-center"><span class="relative select-none">{totalPoints}</span></div>
                    </div>
                </div>
                <div class="cards my-5 flex items-center justify-center">
                {#each $cards as card, index}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="boxCard relative w-1/3 mx-2 rounded-md h-80 cursor-pointer bg-black" class:hold={heldCards[index]} on:click={() => toggleHold(index)}>
                        <div class="content w-full h-full flex items-center justify-center select-none pb-5" class:spinning={spinning}>
                            {#if card === 'herz'}
                            <img src={herz} alt="herz" class="content w-44 h-44 object-cover" draggable="false" style="filter: drop-shadow(0px 0px 15px #d60314);">
                            {:else if card === 'stern'}
                            <img src={stern} alt="stern" class="content w-44 h-44 object-cover" draggable="false" style="filter: drop-shadow(0px 0px 15px #40a1e8);">
                            {:else if card === 'krone'}
                            <img src={krone} alt="krone" class="content w-44 h-44 object-cover" draggable="false" style="filter: drop-shadow(0px 0px 10px #fbb957);">
                            {:else if card === 'kleeblatt'}
                            <img src={kleeblatt} alt="kleeblatt" class="content w-36 h-36 object-cover" draggable="false" style="filter: drop-shadow(0px 0px 10px #53d664);">
                            {:else if card === 'hufeisen'}
                            <img src={hufeisen} alt="hufeisen" class="content w-44 h-44 object-cover" draggable="false" style="filter: drop-shadow(0px 0px 15px #a2a2a2);">
                            {:else if card === 'mond'}
                            <img src={mond} alt="mond" class="content w-44 h-44 object-cover" draggable="false" style="filter: drop-shadow(0px 0px 10px #e4b936);">
                            {:else}
                            <img src={x} alt="x" class="w-44 h-44">
                            {/if}
                        </div>
                    </div>
                {/each}
                </div>
                <div class="buttons flex justify-evenly items-center">
                    <button on:click={() => spin(1)} class="btnCustom w-52 h-14 text-2xl" disabled={drawButtonsDisabled[1]}>Draw</button>
                    <button on:click={() => spin(2)} class="btnCustom w-52 h-14 text-2xl" disabled={drawButtonsDisabled[2]}>Draw</button>
                </div>
            </div>
            {#if !isGameStarting}
            <div class="w-1/4">
                <div class="points-table flex flex-wrap items-center justify-center">
                    {#each pointsCriteria as criterion, i}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div class="box rounded-xl cursor-pointer w-48 h-20 m-1 mx-2 flex justify-center items-center relative" on:click={() => handleCriteriaClick(i)} class:shine={criterion.fulfilled} class:used={criterion.used}>
                        {criterion.name}
                        <span class="overlay invisible absolute w-full h-full top-1/2 left-1/2 flex items-center justify-center font-bold" class:visible={criterion.used}>{points[i + 1]}</span>
                    </div>
                    {#if i % 2 !== 0 && i !== pointsCriteria.length - 1}
                        <hr class="line-glow my-3">
                    {/if}
                    {/each}
                </div>
            </div>
            {/if}
        </div>
        {/if}
    </div>
</main>

<style class="postcss">
    .overlay { transform: translate(-50%,-50%); backdrop-filter: blur(5px); }
    .hold {
        position: relative;
        background-color: #f00;
    }
    .btnCustom[disabled] {
        background-color: #888; /* Graue Hintergrundfarbe */
        color: #666; /* Graue Schriftfarbe */
        cursor: not-allowed; /* Cursor nicht erlaubt */
    }
    .container { min-height: 800px; }
    .btnCustom {
        position: relative;
        padding: 5px 50px;
        background-color: var(--ghostyBg);
        border-radius: 5px;
        font-weight: bold;
        text-align: center;
    }
    :where(.btnCustom) span { color: var(--ghostyText); }
    .goal-points { height: 45%; }
    .cards { min-height: 400px; }
    .boxCard {
        box-shadow: 0 0 2px #fff,
            0 0 2px #fff,
            0 0 5px #ff00ff,
            0 0 5px #ff00ff,
            0 0 5px #ff00ff,
            inset 0 0 25px #ff00ff; 
    }
    .content { font-size: 100px; }
    .box { 
        font-size: 40px; 
        border: 5px solid #000;
        box-shadow: 0 0 .2rem #000,inset 0 0 15px #000; 
        transition: all 0.1s ease-in-out;
        background: var(--accentPink);
        cursor: default;
    }
    .box.used { 
        position: relative;
        opacity: 0.4;
        background-color: #666 !important;
        border: 3px solid #666 !important;
        transform: scale(1) !important; 
        box-shadow: 0 0 20px #000,inset 0 0 15px #000 !important; 
        cursor: default !important;
    }
    .overlay.visible {visibility: visible;}
    .box.shine { 
        border: 3px solid var(--accentPink);
        background: #95fbfa; 
        cursor: pointer;
    }
    .box.shine:hover { 
        transform: scale(1.05); 
        border: 3px solid var(--accentPink);
        box-shadow: 0 0 20px var(--accentPink),inset 0 0 15px #000; 
        background: var(--accentPink);
    }
    .box:nth-child(2) { padding-bottom: 5px; }
    .box:nth-child(7) { padding-bottom: 10px; }
    .box:nth-child(8) { padding-bottom: 2px; }
    .box:nth-child(13) { font-size: 20px; }
    .box:nth-child(14) { font-size: 25px; }
    .box:nth-child(16) { font-size: 28px; }
    .box:nth-child(17) { font-size: 26px; }
    .time-left, .goal-points { border: 2px solid var(--shadowAccent); }
    .line-glow {
        width: 100%;height: 2px;
        border: none;outline: none;
        box-shadow: 0 0 .2rem #fff,
            0 0 2px #fff,
            0 0 5px #ff00ff,
            0 0 5px #ff00ff,
            0 0 20px #ff00ff,
            inset 0 0 10px #ff00ff; 
    }
</style>