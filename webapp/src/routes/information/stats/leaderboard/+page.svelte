<script lang="ts">
    import {truncate} from '$lib/functions/truncate';
    import type { LeaderboardStats } from '$lib/types';
    import pokal from '$lib/images/other/pokal.png';
    import user from '$lib/images/other/profileBG.jpg';

    let testArray: LeaderboardStats = [
        {place:'2',short:'nd',name:'DanRuffy',highsore:'1.200.000',img:user},
        {place:'1',short:'st',name:'ShadowICE',highsore:'1.600.800',img:user},
        {place:'3',short:'rd',name:'bastimzt',highsore:'800.000',img:user},
        // 4th
        {place:'4',short:'th',name:'hosenmatz',highsore:'300.000',img:user},
        {place:'5',short:'th',name:'pickme',highsore:'250.000',img:user},
        {place:'6',short:'th',name:'pipsquek',highsore:'',img:user},
        {place:'7',short:'th',name:'LELELELEL',highsore:'224.000',img:user},
        {place:'8',short:'th',name:'TOLOOONNGGGG',highsore:'180.000',img:user},
        {place:'9',short:'th',name:'Keck',highsore:'40.000',img:user}
    ];
</script>

<main>
    <div class="container">
        <h1 class="text-center mb-20 tracking-wider" style="font-size: clamp(30px, 4vw, 50px);">Leaderboard</h1>
        <div class="board flex flex-col items-center">
            <div class="top3 flex items-center justify-center flex-wrap">
                {#each testArray as list, i}
                {#if i < 3}
                {#if i === 1}
                <div class="relative item w-52 mx-5 mb-20 flex flex-col items-center firstPlace">
                    <div class="img relative w-28 h-28" style="border-radius: 50%;">
                        <span class="absolute -top-3 -left-3 font-bold" style="font-size: 50px;color: var(--accentColor);">
                            {list.place}
                            <span class="absolute -top-1" style="font-size: 30px;color: var(--accentColor);">{list.short}</span>
                        </span>
                        <img src="{list.img}" alt="UserPB" class="w-full h-full object-cover" style="border-radius: 50%;" draggable="false">
                        <img src="{pokal}" alt="pokal" class="w-14 absolute -top-4 -right-6" draggable="false">
                    </div>
                    <h1 class="uppercase font-bold text-center mt-2" style="color: var(--ghostyText);">
                        {truncate(list.name, 9) || 'undefined'}<br>
                        <span style="color: var(--warning);">{list.highsore || 'xx.xxx.xxx'}</span>
                    </h1>
                </div>
                {:else}
                <div class="relative item w-52 mx-5 flex flex-col items-center">
                    <div class="img relative w-28 h-28" style="border-radius: 50%;">
                        <span class="absolute font-bold -top-4 -left-4" style="font-size: 50px;color: var(--accentColor);">
                            {list.place}
                            <span class="absolute -top-1" style="font-size: 30px;color: var(--accentColor);">{list.short}</span>
                        </span>
                        <img src="{list.img}" alt="UserPB" class="w-full h-full object-cover" style="border-radius: 50%;" draggable="false">
                    </div>
                    <h1 class="uppercase font-bold text-center mt-2" style="color: var(--ghostyText);">
                        {truncate(list.name, 9) || 'undefined'}<br>
                        <span style="color: var(--warning);">{list.highsore || 'xx.xxx.xxx'}</span>
                    </h1>
                </div>
                {/if}
                {/if}
                {/each}
            </div>
            <div class="rest mt-20 flex flex-wrap items-center justify-center" style="max-width: 1200px;">
                {#each testArray as list, i}
                {#if i > 2}
                <div class="item my-5 mx-20 w-96 rounded-full flex items-center">
                    <span class="relative font-bold" style="font-size: 30px;color: var(--accentColor);">
                        {list.place}
                        <span class="absolute -top-1" style="font-size: 16px;color: var(--accentColor);">{list.short}</span>
                    </span>
                    <div class="imgBx z-50 ml-8" style="border-radius: 50%;width: 88px;height: 64px;">
                        <img src="{list.img}" alt="UserPB" class="w-full h-full object-cover" style="border-radius: 50%;" draggable="false">
                    </div>
                    <h1 class="font-bold w-full -ml-5 py-2 px-1 flex pl-12 items-center rounded-full" style="background-color: var(--ghostyBg);">
                        <span style="color: var(--ghostyText);" class="uppercase font-bold w-32 -ml-4">{truncate(list.name, 9) || 'undefined'}</span>
                        <span style="color: var(--warning);" class="uppercase font-bold ml-2">{list.highsore || 'xx.xxx.xxx'}</span>
                    </h1>
                </div>
                {/if}
                {/each}
            </div>
        </div>
    </div>
</main>

<style class="postcss">
    @media screen and (max-width: 577px) {
        .firstPlace { margin-top: 80px; }
    }
</style>
