<script lang="ts">
    import { getDrawerStore, AppRail, Drawer, popup, type DrawerSettings, type PopupSettings } from "@skeletonlabs/skeleton";
    const drawerStore = getDrawerStore();
    const closeSidebar = () => drawerStore.close();
    import { page } from "$app/stores";
	import { goto } from "$app/navigation";

    let style = 'lg:block max-lg:hidden';

    // Check if Drawer is open
    $: isOpen = $drawerStore.open;
    $: if (isOpen) {style = '';} else {style = 'lg:block max-lg:hidden';}
</script>

<svelte:head>
    <link href='https://fonts.googleapis.com/css?family=Vibur:400' rel='stylesheet' type='text/css'>    
    <link href='https://fonts.googleapis.com/css?family=Sacramento:400' rel='stylesheet' type='text/css'>
</svelte:head>

<div class="sidebar ${style} overflow-hidden ml-6 py-4 h-full relative top-1/2 -translate-y-1/2 rounded-2xl">
    <AppRail width="w-64" border="rounded-2xl" background="" >
        <div class="w-full h-full py-5 flex flex-col justify-between items-center">
            <nav>
                <div class="logo pt-5 placeholder-tertiary-100">
                    <h1 class="neonText py-12 px-7 select-none">pick<span class="neonText">UP</span></h1>
                </div>
                <div class="routes mt-28 text-center">
                    <span class="headerUL font-bold tracking-widest uppercase">Navigation</span>
                    <ul class="navList w-full mt-2">
                        <li class="navItem w-full flex items-center justify-between">
                            <a href="/" class="text-sm select-none"><i class="fa-solid fa-home w-7 iconGlow"></i><span>Homepage</span></a>
                        </li>
                        <li class="navItem w-full flex items-center justify-between mt-1">
                            <a href="/game" class="text-sm select-none"><i class="fa-solid fa-gamepad w-7 iconGlow"></i><span>Game</span></a>
                        </li>
                    </ul>
                </div>
                <hr>
                <div class="stats text-center">
                    <span class="headerUL font-bold tracking-widest uppercase">Statistiken</span>
                    <ul class="navList w-full mt-2">
                        <li class="navItem w-full flex items-center justify-between">
                            <a href="/statistics/highscores" class="text-sm select-none"><i class="fa-solid fa-star w-7 iconGlow"></i><span>Highscore</span></a>
                        </li>
                        <li class="navItem w-full flex items-center justify-between mt-1">
                            <a href="/statistics/user" class="text-sm select-none"><i class="fa-solid fa-table w-7 iconGlow"></i><span>Tabelle</span></a>
                        </li>
                    </ul>
                </div>
                <hr>
                <div class="settings text-center">
                    <span class="headerUL font-bold tracking-widest uppercase">Einstellungen</span>
                    <ul class="navList w-full mt-2">
                        <li class="navItem w-full flex items-center justify-between">
                            <a href="/profile" class="text-sm select-none"><i class="fa-solid fa-address-card w-7 iconGlow"></i><span>Profil</span></a>
                        </li>
                        <li class="navItem w-full flex items-center justify-between mt-1">
                            <a href="/contact" class="text-sm select-none"><i class="fa-solid fa-envelope w-7 iconGlow"></i><span>Kontakt</span></a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="user w-full flex items-center justify-between">
                <div class="avatar w-16 h-16 flex items-center">
                    <img src="/user.png" alt="userIMG" class="object-cover w-full h-full" draggable="false">
                    <div class="userData">
                        <p class="ml-3 font-bold userName">Username</p>
                    </div>
                </div>
                <button on:click={() => goto('/auth')}><i class="fa-solid fa-right-from-bracket text-xl"></i></button>
            </div>
        </div>
    </AppRail>
</div>

<style lang="postcss">
    img {border-radius: 50%;filter: drop-shadow(1px 1px 4px #ff00ff);}
    .userName {text-shadow: 3px 2px 5px #ff00ff;}
    .logo {font-family: "Sacramento", sans-serif;}
    hr {
        position: relative;
        background-color: rgba(var(--color-secondary-500) / 1);
        border-radius: 2rem;
        width: 100%;
        margin: 20px auto;
    }
    .iconGlow {filter: drop-shadow(1px 1px 4px #ff00ff);}
    h1 {
        border: 0.2rem solid #fff;
        border-radius: 2rem;
        animation: pulsate 1.5s infinite alternate;  
        box-shadow: 0 0 .2rem #fff,
            0 0 2px #fff,
            0 0 10px #bc13fe,
            0 0 10px #bc13fe,
            0 0 30px #bc13fe,
            inset 0 0 20px #bc13fe; 
    }
    .neonText {
        font-size: 40px;
        color: #fff;
        text-shadow:
            0 0 7px #ff00ff,
            0 0 10px #ff00ff,
            0 0 15px #ff00ff,
            0 0 21px #ff00ff,
            0 0 28px #ff00ff,
            0 0 34px #ff00ff,
            0 0 39px #ff00ff,
            0 0 45px #ff00ff;
    }
    span.neonText {animation: flicker 1.5s infinite alternate; }
    /* Flickering animation */
    @keyframes flicker {
        0%, 18%, 22%, 25%, 53%, 57%, 100% {
            text-shadow:
                0 0 7px #ff00ff,
                0 0 10px #ff00ff,
                0 0 15px #ff00ff,
                0 0 21px #ff00ff,
                0 0 28px #ff00ff,
                0 0 34px #ff00ff,
                0 0 39px #ff00ff,
                0 0 45px #ff00ff;
        }
        20%, 24%, 55% {text-shadow: none;}    
    }
    @keyframes pulsate {
        100% {
            text-shadow:
                0 0 7px #ff00ff,
                0 0 10px #ff00ff,
                0 0 15px #ff00ff,
                0 0 21px #ff00ff,
                0 0 28px #ff00ff,
                0 0 34px #ff00ff,
                0 0 39px #ff00ff,
                0 0 45px #ff00ff;
        }
        0% {
            text-shadow:
                0 0 7px #ff00ff,
                0 0 10px #ff00ff,
                0 0 15px #ff00ff,
                0 0 21px #ff00ff,
                0 0 28px #ff00ff,
                0 0 34px #ff00ff,
                0 0 39px #ff00ff,
                0 0 45px #ff00ff;
        }
    }
</style>
