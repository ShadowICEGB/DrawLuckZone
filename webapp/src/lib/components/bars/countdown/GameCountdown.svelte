<script lang="ts">
    export let timeLeft;
    $: timePercentage = (timeLeft / 180) * 100;
</script>

<div class="time-left relative overflow-hidden rounded-2xl h-full">
    <div class="bar absolute top-0 left-0 w-full h-full rounded-2xl flex justify-center items-center" style="width: {timePercentage}%; transition: all .1s ease-in-out;background: linear-gradient(30deg, var(--ghostyBg), var(--ghostyText);"></div>
</div>

<style class="css">
    .time-left { border: 1px solid var(--ghostyBg);}
</style>
