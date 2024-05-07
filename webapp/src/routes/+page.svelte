<script lang="ts">
    import sonyFigur from '$lib/images/other/SonyFigure.png';
    import logo from "$lib/images/logos/SpinLuckZone.png";
    import { goto } from '$app/navigation';
    import anleitungBG from '$lib/images/other/anleitung.png';
    import leaderboardBG from '$lib/images/other/leaderboard.png';
    import tutorialBG from '$lib/images/other/tutorial.png';

    const arrayBox = [
        {name:'spielanleitung',text:'Anleitung',link:'/information/guide',imgBG:anleitungBG},
        {name:'Leaderboard',text:'Highscoretabelle',link:'/information/stats/leaderboard',imgBG:leaderboardBG},
        {name:'Spieltutorial',text:'Tutorial',link:'/information/tutorial',imgBG:tutorialBG}
    ];
</script>

<main>
    <div class="container">
        <div class="greetingBox mt-20 rounded-3xl p-12 relative">
            <div class="content relative">
                <h1 class="font-bold flex items-center" style="font-size: clamp(16px,4vw,30px);color: var(--accentColor);">
                    Draw<span style="color: var(--textColorBrighter);">LuckZone</span>
                    <img src="{logo}" alt="logo" class="w-10 ml-2" draggable="false">
                </h1>
                <p class="w-full lg:w-3/5 mt-5 font-medium" style="color: var(--textColor);">
                    Willkommen bei unserer Web-App, einem aufregenden Glücksspiel ohne Wetteinsatz! Hier dreht sich alles darum, 
                    so viele Punkte wie möglich zu sammeln, während du auf aufregende Muster abzielst. Keine Sorge, es geht nicht 
                    um Geld - unser Ziel ist es, dir jede Menge Unterhaltung zu bieten, während du versuchst, die vorgegebenen 
                    Muster zu rollen und sie dann für Punkte einzulösen. Genieße die Spannung des Spiels, halte Ausschau nach den 
                    gewünschten Kombinationen und sieh zu, wie deine Punktzahl steigt. Bereit für eine unterhaltsame Herausforderung? 
                    Dann leg los und zeige dein Glück!
                </p>
                <button class="mt-8 py-2 px-6 rounded-xl font-bold uppercase btnGo transition-all" style="background-color: var(--accentColor);" on:click={() => goto('/information/guide')}>Loslegen</button>
            </div>
            <img src="{sonyFigur}" alt="sonyFigur" draggable="false" class="absolute right-14 -top-14 invisible lg:visible" style="width: clamp(150px,8vw,280px);filter: drop-shadow(0px 0px 7px #d6d9df);">
        </div>
        <div class="links mt-32">
            <h1 class="tracking-wider uppercase relative headinglinks w-96" style="font-size: clamp(17px,4vw,25px);padding-left: 18px;">Alles auf ein Blick 🔥</h1>
            <div class="boxContainer flex flex-wrap justify-center mt-10 float-left">
                {#each arrayBox as box}
                <div class="box w-96 h-72 m-5 rounded-2xl flex flex-col justify-between" style="background-color: #222047;padding: 7px;box-shadow: 0px 0px 10px #000;">
                    <img src="{box.imgBG}" alt="box.img" draggable="false" class="w-full object-cover rounded-xl imgBox" style="height: 75%;">
                    <div class="contentBox flex justify-between items-center mb-2" style="padding: 0px 7px;">
                        <div class="details">
                            <h1 class="uppercase font-bold" style="font-size: 18px;">{box.name}</h1>
                            <p class="" style="font-size: 12px;">{box.text}</p>
                        </div>
                        <button class="py-1 px-4 rounded-xl font-bold" style="background-color: var(--accentColor);" on:click={() => goto(box.link)}>Link</button>
                    </div>
                </div>
                {/each}
            </div>
        </div>
    </div>
</main>

<style class="postcss">
    .greetingBox {
        background-image: url("$lib/images/game/neonBG.jpg");
        background-size: cover;
        background-position: center;
        box-shadow: 0px 0px 10px #000;
    }
    .greetingBox::before {
        content: '';
        position: absolute;
        top: 0px;left: 0px;
        width: 100%;height: 100%;
        border-radius: 24px;
        background: linear-gradient(90deg, #000000ca 20%, #00000068, #000000ca 80%);
    }
    .imgBox {box-shadow: 0px 0px 5px #0000007b;}
    .btnGo {
        box-shadow: 0 0 .2rem var(--accentColor),
            0 0 2px var(--textColorBrighter),
            0 0 5px var(--accentColor),
            0 0 5px var(--accentColor),
            0 0 15px var(--accentColor),
            inset 0 0 10px var(--accentColor); 
    }
</style>
