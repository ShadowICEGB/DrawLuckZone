<script lang="ts">
    export let goalPoints: number = 0;
    export let pointsPerRound: number = 0;

    $: pointsPercentage = (pointsPerRound / goalPoints) * 100;
</script>

<div class="goal-points relative overflow-hidden flex items-center justify-center mt-1 rounded-2xl">
    <div class="bar absolute top-0 left-0 w-full h-full rounded-2xl" style="width: {pointsPercentage}%; transition: all 0.1s ease-in-out;background: linear-gradient(60deg, var(--ghostyText), var(--ghostyBg);"></div>
    <span class="text-lg font-bold select-none relative">{pointsPerRound}/{goalPoints}</span>
</div>

<style>
    .goal-points { 
        height: 39px;
        border: 1px solid var(--ghostyBg);
    }
</style>