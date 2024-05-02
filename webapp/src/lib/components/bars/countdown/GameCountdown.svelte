<script lang="ts">
    export let timeLeft;
    $: timePercentage = (timeLeft / 180) * 100;
</script>

<div class="time-left h-1/2 relative overflow-hidden rounded-2xl">
    <div class="bar absolute top-0 left-0 w-full h-full rounded-2xl flex justify-center items-center" style="width: {timePercentage}%; transition: all .1s ease-in-out;background: linear-gradient(30deg, var(--ghostyBg), var(--ghostyText);">
        {#if timeLeft < 40}
        <span style="font-size: 16px">{timeLeft} Sek</span>
        {:else if timeLeft < 20}
        <span style="font-size: 13px;">{timeLeft}</span>
        {:else}
        <span style="font-size: 18px">{timeLeft} Sekunden</span>
        {/if}
    </div>
</div>

<style class="css">
    .time-left { 
        height: 39px; 
        border: 1px solid var(--ghostyBg);
    }
</style>
