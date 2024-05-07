<script lang="ts">
    // Import Components
    import GameCountdown from '$lib/components/bars/countdown/GameCountdown.svelte';

    // Import game functions
    import { truncate } from '$lib/functions/truncate';

    // Import images
    import logo from '$lib/images/logos/SpinLuckZone.png';

    // Gamestats
    let round: number = 1;
    let totalPoints: number = 0;
    let goalPoints: number = 250000;
    let timeLeft: number = 180; // 3 Minutes
    let highlightHeaderStep1: boolean = false;

    $: playerStats = [
        {icon: 'fa-regular fa-user',content: `${truncate('ShadowICE', 10)}`,displayHeader: 'Spielername'}, // Playername
        {icon: 'fa-regular fa-star',content: '1875643',displayHeader: 'Highscore'}, // Current Highscore
        {icon: 'fa-regular fa-clock',content: `${round}`,displayHeader: 'Runde'}, // Round
        {icon: 'fa-regular fa-lightbulb',content: `${totalPoints}`,displayHeader: 'Punkte'}, // TotalPoints
        {icon: 'fa-regular fa-flag',content: `${goalPoints}`,displayHeader: 'Benötigte Punkte'} // GoalPoints
    ];

    const startTutorial = () => {
        highlightHeaderStep1 = true;
    }
    startTutorial();
</script>

<main>
    <div class="container -mt-14">
        <h1 class="text-center mb-5 tracking-wider flex items-center justify-center flex-wrap heading">
            <img src="{logo}" alt="logo" class="w-20 logoImg">
            DrawLuckZone
            <img src="{logo}" alt="logo" class="w-20 logoImg">
        </h1>
        <div class="gameBoard">
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
                {#if highlightHeaderStep1}
                <div class="highlighter absolute top-2 left-0 w-full h-full" style="border: 5px solid #f00;">
                    <div class="content absolute left-1/2 -translate-x-1/2" style="top: 400px;">
                        <h1>Erklärbär</h1>
                        <p>Header hier dies das stats</p>
                    </div>
                </div>
                {/if}
            </header>
            <div class="game flex flex-col items-center">

            </div>
        </div>
    </div>
</main>

<style lang="postcss">
    .heading { font-size: clamp(30px, 4vw, 50px); }
    @media screen and (max-width: 409px) {.heading { font-size: 20px; }}
    @media screen and (max-width: 470px) {.logoImg { width: 50px; }}
    @media screen and (max-width: 479px) {.btnCustom:last-child { margin-top: 10px; }}
    @media screen and (max-width: 328px) {.heading img { display: none; } .heading {margin-top: 50px;}}
</style>
