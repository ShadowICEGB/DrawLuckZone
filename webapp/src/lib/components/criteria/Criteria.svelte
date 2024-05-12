<script lang="ts">
    // Import variable values from config file
    import { points, pointsCriteria, drawButtonsState, playerRoundpoints } from '$lib/config';
    import { heldCards, gameStats } from '$lib/store';
    import { spin } from '$lib/functions/spin';

    // Points per criteria
    const pointsValue: any = points;

    // Handle criteria click, only clickable if the criteria is fulfilled
    function handleCriteriaClick(index: number) {
        if (pointsCriteria[index].used === false && pointsCriteria[index].fulfilled === true) {
            pointsCriteria[index].used = true;
            
            // reset draw buttons
            drawButtonsState[1] = false;
            drawButtonsState[2] = false;

            // reset holded cards
            $heldCards = [false, false, false, false, false];

            // Add points
            $gameStats.pointsPerRound += pointsValue[index + 1];

            // trigger new spin
            spin(0);
        }
    }
</script>

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

<style>
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
</style>