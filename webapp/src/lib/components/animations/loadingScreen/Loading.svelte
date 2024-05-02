<script lang="ts">
    import { Circle2 } from 'svelte-loading-spinners';
    import logo from '$lib/images/logos/SpinLuckZone.png';

    export let timer = 0;
</script>

{#if timer < 100}
<div class="loading absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col uppercase transition-all" style="background-color: var(--primaryBg);z-index: 100;">
    <span class="font-bold">spinluckzone</span>
    <span class="font-bold mt-7" style="font-size: clamp(20px,4vw,30px);">loading website</span>
    <div class="my-12 relative">
        <Circle2 size="140" colorOuter="var(--accentColor)" colorCenter="var(--ghostyBg)" colorInner="var(--ghostyText)" unit="px" durationOuter="1s" durationCenter="3s" durationInner="5s" />
        <img src="{logo}" alt="logo" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24">
    </div>
    <span class="font-bold">Loading .. {timer}%</span>
</div>
{/if}

<style>

</style>
