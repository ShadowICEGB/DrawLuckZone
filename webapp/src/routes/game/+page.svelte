<script lang="ts">
    // Import Components
    import GameCountdown from '$lib/components/bars/countdown/GameCountdown.svelte';
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';

    // Import variable values from config file
    import { points, pointsCriteria } from '$lib/config';

    // Import all Typescript types
    import type { Stats } from '$lib/types';

    // Import Stores
    import { cards } from '$lib/store';

    // Import game functions
    import { truncate } from '$lib/functions/truncate';

    // Import images
    import kleeblatt from '$lib/images/game/kleeblatt.png';
    import herz from '$lib/images/game/herz.png';
    import mond from '$lib/images/game/mond.png';
    import stern from '$lib/images/game/stern.png';
    import krone from '$lib/images/game/krone.png';
    import hufeisen from '$lib/images/game/hufeisen.png';
    import x from '$lib/images/game/x.png';
    import ziel from '$lib/images/game/ziel.png';
    import logo from '$lib/images/logos/SpinLuckZone.png';




    // Array of all cards
    const cardImages: string[] = ["herz", "stern", "krone", "kleeblatt", "hufeisen", "mond"];
    const criteriaPoints: { name: string; fulfilled: boolean; used: boolean }[] = pointsCriteria;

    // Points per criteria
    const pointsValue: any = points;

    // Gamestats
    let startGame: boolean = false; 
    let round: number = 1;
    let totalPoints: number = 0;
    let goalPoints: number = 250000;
    let pointsPerRound: number = 0;
    let timeLeft: number = 180; // 3 Minutes
    let spinning: boolean = false;
    let playername: string = "ShadowICE";
    let drawButtonsDisabled: boolean[] = [false, false, false];
    let gameFinished: boolean = false;
    let isGameStarting: boolean = false;
    let gameStartingCountdown: number = 7;

    // Cards
    let cardsValue = $cards;
    let countdownInterval: NodeJS.Timeout;
    let heldCards: boolean[] = [false, false, false, false, false];


    $: playerStats = [
        {icon: 'fa-regular fa-user',content: `${truncate('ShadowICE', 10)}`,displayHeader: 'Spielername'}, // Playername
        {icon: 'fa-regular fa-star',content: '1875643',displayHeader: 'Highscore'}, // Current Highscore
        {icon: 'fa-regular fa-clock',content: `${round}`,displayHeader: 'Runde'}, // Round
        {icon: 'fa-regular fa-lightbulb',content: `${totalPoints}`,displayHeader: 'Punkte'}, // TotalPoints
        {icon: 'fa-regular fa-flag',content: `${goalPoints}`,displayHeader: 'Benötigte Punkte'} // GoalPoints
    ];

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
        timeLeft = 180;

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
            pointsPerRound += pointsValue[index + 1];

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
            totalPoints += pointsPerRound;
            // Check if the goal points are reached
            if (pointsPerRound >= goalPoints) {
                cards.update(cards => {
                    cards = cards.map(() => 'ziel');
                    return cards;
                });
            } 
            else {
                cards.update(cards => {
                    cards = cards.map(() => 'x');
                    return cards;
                });
            }
            clearInterval(countdownInterval);
            timeLeft = 180;
            pointsPerRound = 0;
            setTimeout(() => {
                spinning = false;
                round++;
                drawButtonsDisabled = [false, false, false];
                gameStart();
            }, 5000);
        } else {
            totalPoints += pointsPerRound;
            gameFinished = true;
        }
    }

    // Stop game and reset all values
    function stopGame() {
        startGame = false;
        round = 1;
        pointsPerRound = 0;
        timeLeft = 180;
        spinning = false;
        drawButtonsDisabled = [false, false, false];
        heldCards = [false, false, false, false, false];
        clearInterval(countdownInterval);
        cards.update(cards => {
            cards = cards.map(() => 'x');
            return cards;
        });
    }

    onMount(() => {
        firstGameStart();
    });
</script>

<main>
    <div class="container -mt-14">
        <h1 class="text-center mb-5 tracking-wider flex items-center justify-center flex-wrap" style="font-size: clamp(30px, 4vw, 50px);">
            <img src="{logo}" alt="logo" class="w-20">
            DrawLuckZone
            <img src="{logo}" alt="logo" class="w-20">
        </h1>
        <div class="gameBoard">
            {#if gameFinished}
            <div class="finished">
                <h3>Game finished</h3>
                <h4>Total points: {totalPoints}</h4>
            </div>
            {:else}
            {#if isGameStarting}
            <div class="countdown absolute w-full h-96 z-50 flex justify-center items-center" style="background-color: var(--primaryBg);">
                <div class="countdown-inner flex flex-col items-center justify-between mt-10">
                    <p class="font-bold tracking-widest uppercase" style="font-size: clamp(30px, 4vw, 44px);">Spiel startet in</p>
                    <p class="font-bold italic mt-16" style="font-size: clamp(60px, 4vw, 100px);">{gameStartingCountdown}</p>
                </div>
            </div>
            {:else}
            <header>
                <div class="timeline rounded-2xl flex flex-col justify-center items-center">
                    <span class="relative flex justify-center items-center mb-2">
                        Verbleibend: <span class="italic ml-2 mr-1">{timeLeft}</span> Sekunden
                    </span>
                    <div class="h-2 w-3/4 lg:w-1/2"><GameCountdown {timeLeft}/></div>
                </div>
                <div class="stats flex items-center justify-center flex-wrap mt-5">
                    <div class="playerStats flex flex-row items-center flex-wrap">
                    {#each playerStats as stat}
                        <div class="stat flex flex-col">
                            <span class="" style="font-size: clamp(10px,4vw,13px);">{stat.displayHeader}</span>
                            <div class="item py-2 px-6 flex justify-center items-center mr-3 rounded-lg" style="background-color: var(--ghostyBg);">
                                <i class="{stat.icon} mr-2" style="color: var(--ghostyText);"></i>
                                <p style="color: var(--ghostyText);">{stat.content}</p>
                            </div>
                        </div>
                    {/each}
                    </div>
                </div>
            </header>
            <div class="game flex flex-col items-center">
                <div class="board w-full mt-14">
                    <div class="cards flex items-center justify-center flex-wrap">
                        {#each $cards as card, index}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="boxCard relative w-32 h-40 my-2 rounded-md cursor-pointer mx-3 lg:w-40 lg:h-48" style="background-color: var(--primaryBg);" class:hold={heldCards[index]} on:click={() => toggleHold(index)}>
                            <div class="content w-full h-full flex items-center justify-center select-none" class:spinning={spinning}>
                                {#if card === 'herz'}
                                <img src={herz} alt="herz" class="content w-28 h-28 object-cover lg:w-32 lg:h-32" draggable="false" style="filter: drop-shadow(0px 0px 15px #d60314);">
                                {:else if card === 'stern'}
                                <img src={stern} alt="stern" class="content w-28 h-28 object-cover lg:w-32 lg:h-32" draggable="false" style="filter: drop-shadow(0px 0px 15px #40a1e8);">
                                {:else if card === 'krone'}
                                <img src={krone} alt="krone" class="content w-28 h-28 object-cover lg:w-32 lg:h-32" draggable="false" style="filter: drop-shadow(0px 0px 10px #fbb957);">
                                {:else if card === 'kleeblatt'}
                                <img src={kleeblatt} alt="kleeblatt" class="content w-28 h-28 object-cover lg:w-28 lg:h-28" draggable="false" style="filter: drop-shadow(0px 0px 10px #53d664);">
                                {:else if card === 'hufeisen'}
                                <img src={hufeisen} alt="hufeisen" class="content w-28 h-28 object-cover lg:w-32 lg:h-32" draggable="false" style="filter: drop-shadow(0px 0px 15px #a2a2a2);">
                                {:else if card === 'mond'}
                                <img src={mond} alt="mond" class="content w-28 h-28 object-cover lg:w-32 lg:h-32" draggable="false" style="filter: drop-shadow(0px 0px 10px #e4b936);">
                                {:else if card === 'ziel'}
                                <img src={ziel} alt="ziel" draggable="false" class="w-28 h-28 lg:w-32 lg:h-32">
                                {:else}
                                <img src={x} alt="x" draggable="false" class="w-28 h-28 lg:w-32 lg:h-32">
                                {/if}
                            </div>
                        </div>
                        {/each}
                    </div>
                    <div class="buttons flex justify-evenly items-center mt-14 flex-wrap">
                        <button on:click={() => spin(1)} class="btnCustom w-52 h-14 text-2xl uppercase" disabled={drawButtonsDisabled[1]}>Draw</button>
                        <button on:click={() => spin(2)} class="btnCustom w-52 h-14 text-2xl uppercase" disabled={drawButtonsDisabled[2]}>Draw</button>
                    </div>
                </div>
                <div class="criteria flex justify-center items-center mt-10" style="max-width: 800px;">
                    <div class="points-table flex items-center justify-center flex-wrap">
                        {#each pointsCriteria as criterion, i}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div class="box rounded-xl cursor-pointer w-32 h-16 m-1 mx-2 flex justify-center items-center relative lg:w-48 lg:h-20" on:click={() => handleCriteriaClick(i)} class:shine={criterion.fulfilled} class:used={criterion.used}>
                            {criterion.name}
                            <span class="overlay invisible absolute w-full h-full top-1/2 left-1/2 flex items-center justify-center font-bold" class:visible={criterion.used}>
                                {pointsValue[i + 1]}
                            </span>
                        </div>
                        {/each}
                        <span class="mt-3" style="font-size: 12px;">Gesamtpunktzahl möglich: <span class="italic" style="font-size: 12px;">425.000</span></span>
                    </div>
                </div>
            </div>
            {/if}
            {/if}
        </div>
    </div>
</main>

<style lang="postcss">
    .box { 
        font-size: clamp(20px,2vw,30px); 
        border: 5px solid #000;
        box-shadow: 0 0 .2rem #000, inset 0 0 10px #000; 
        transition: all 0.1s ease-in-out;
        background: var(--ghostyBg);
        cursor: default;
    }
    .box.used { 
        position: relative;
        opacity: 1;
        background-color: #666 !important;
        border: 3px solid #666 !important;
        transform: scale(1) !important; 
        box-shadow: 0 0 20px #000,inset 0 0 25px #000 !important; 
        cursor: default !important;
    }
    .overlay.visible {visibility: visible;}
    .box.shine { 
        border: 3px solid var(--accentColor);
        background: var(--accentColor); 
        cursor: pointer;
    }
    .box.shine:hover { 
        transform: scale(1.05); 
        box-shadow: 0 0 10px var(--ghostyText),inset 0 0 25px #000; 
        background: var(--ghostyText);
    }
    .box:nth-child(2) { padding-bottom: 5px; }
    .box:nth-child(5) { padding-bottom: 3px; }
    .box:nth-child(8) { padding-bottom: 2px; }
    .box:nth-child(12) { font-size: clamp(15px,1.5vw,23px); }
    .box:nth-child(11) { font-size: clamp(18px,1.5vw,23px); }
    .box:nth-child(10) { font-size: clamp(15px,1.5vw,20px); }
    .box:nth-child(9) { font-size: clamp(13px,1.5vw,18px); }


    .boxCard {
        box-shadow: 0 0 2px var(--accentColor),
            0 0 5px var(--accentColor),
            inset 0 0 10px var(--accentColor); 
    }
    .boxCard.hold {
        box-shadow: 0 0 2px var(--accentBlue),
            0 0 5px var(--accentBlue),
            inset 0 0 10px var(--accentBlue); 
    }
    .overlay { 
        transform: translate(-50%,-50%); 
        backdrop-filter: blur(20px); 
        color: var(--accentPink); 
        font-size: clamp(15px, 4vw, 30px);
        text-shadow: 0 0 20px var(--accentPink);
    }
    .hold {
        position: relative;
        background-color: var(--ghostyBg);
    }
    .hold::before {
        content: 'HOLD';
        position: absolute;
        top: 50%;left: 50%;
        transform: translate(-50%,-50%);
        width: 100%;height: 100%;
        display: flex;
        justify-content: center;
        padding-top: 30px;
        font-size: clamp(20px,4vw,40px);
        font-weight: bold;
        backdrop-filter: blur(5px);
        font-style: italic;
        z-index: 100;
    }
    .btnCustom[disabled] {
        opacity: 0.4;
        background-color: var(--ghostyBg); 
        color: var(--ghostyText); 
        cursor: not-allowed;
    }
    .btnCustom[disabled]::before {
        content: '';
        position: absolute;
        top: 50%;left: -10px;
        transform: translateY(-50%) rotate(13deg);
        width: 110%;height: 5px;
        background-color: var(--accentBlue);
        border-radius: 10px;
        z-index: -1;
    }
    .btnCustom[disabled]::after {
        content: '';
        position: absolute;
        top: 50%;left: -10px;
        transform: translateY(-50%) rotate(-13deg);
        width: 110%;height: 5px;
        background-color: var(--accentBlue);
        border-radius: 10px;
        z-index: -1;
    }
    .btnCustom {
        position: relative;
        border: 5px solid #000;
        box-shadow: 0 0 .2rem #000, inset 0 0 10px #000; 
        padding: 5px 50px;
        background-color: var(--accentColor);
        border-radius: 15px;
        font-weight: bold;
        text-align: center;
        overflow: hidden;
    }
    :where(.btnCustom) span { color: var(--ghostyText); position: relative; }
</style>
