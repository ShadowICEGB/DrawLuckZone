<script lang="ts">
    import { getDrawerStore, AppRail, Drawer, popup, type DrawerSettings, type PopupSettings } from "@skeletonlabs/skeleton";
    const drawerStore = getDrawerStore();
    const closeSidebar = () => drawerStore.close();
	import { goto } from "$app/navigation";
    import SpinLuckZone from '$lib/images/logos/SpinLuckZone.png';
	import { onMount } from "svelte";

    let style: string = 'lg:block max-lg:hidden';

    // Check if Drawer is open
    $: isOpen = $drawerStore.open;
    $: if (isOpen) {style = '';} else {style = 'lg:block max-lg:hidden';}

    // Toggle Sublist
    let indexSubList: boolean[] = [true, false, false];
    const toggleSubList = (index: number) => {
        if (indexSubList[index]) {indexSubList[index] = false;} 
        else {
            // Close all other submenus
            indexSubList.forEach((value, idx) => {
                if (idx !== index) {indexSubList[idx] = false;}
            });
            indexSubList[index] = true;
        }
    }

    // Toggle Active
    let activeIndex: boolean[] = [false, false, false, false, false, false, false, false, false];
    const toggleActive = (index: number) => {
        if (activeIndex[index]) {activeIndex[index] = false;} 
        else {
            // Close all other submenus
            activeIndex.forEach((value, idx) => {
                if (idx !== index) {activeIndex[idx] = false;}
            });
            activeIndex[index] = true;
        }
    }
    
    const checkHomepageActive = () => {
        // Check if the current route is /
        let currentURL: URL = new URL(window.location.href);
        if (currentURL.pathname === '/') {activeIndex = [true, false, false];}
        else if (currentURL.pathname === '/game') {activeIndex = [false, true, false];}
        else if (currentURL.pathname === '/information/stats/leaderboard') {activeIndex = [false, false, true];}
        else if (currentURL.pathname === '/information/stats/achievements') {
            activeIndex = [false, false, false, true];
            indexSubList = [true, false, false];
        }
        else if (currentURL.pathname === '/information/profile') {
            activeIndex = [false, false, false, false, true];
            indexSubList = [true, false, false];
        }
        else if (currentURL.pathname === '/information/changelog') {
            activeIndex = [false, false, false, false, false, true];
            indexSubList = [false, true, false];
        }
        else if (currentURL.pathname === '/information/contact/developer') {
            activeIndex = [false, false, false, false, false, false, true];
            indexSubList = [false, true, false];
        }
        else if (currentURL.pathname === '/information/contact/ticket') {
            activeIndex = [false, false, false, false, false, false, false, true];
            indexSubList = [false, false, true];
        }
        else if (currentURL.pathname === '/information/contact/impressum') {
            activeIndex = [false, false, false, false, false, false, false, false, true];
            indexSubList = [false, false, true];
        }
    }

    onMount(() => {
        checkHomepageActive();
    });
</script>

<div class="sidebar ${style} overflow-hidden ml-3 py-4 h-full relative rounded-2xl z-50" style="background: var(--primaryBg);">
    <AppRail width="w-64" border="rounded-2xl" background="" >
        <div class="w-full h-full flex flex-col justify-between items-center">
            <nav>
                <div class="-mt-9 logo flex flex-col items-center">
                    <img src="{SpinLuckZone}" alt="User" class="rounded-full -ml-2 logoIMG" draggable="false" style="filter: drop-shadow(0px 0px 5px #d9af2d);">
                    <span class="uppercase -mt-5 tracking-widest select-text" style="font-size: 20px;color: var(--textColorBrighter);">DrawLuckZone</span>
                </div>
                <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                <ul class="mt-8">
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <li class="navItem rounded-xl flex justify-center items-center my-2 transition-all" class:active={activeIndex[0]} on:click={() => toggleActive(0)}>
                        <a href="/" class="w-full h-full pl-3 py-2 flex items-center">
                            <i class="fa-regular fa-lemon w-7" style="font-size: 20px;" draggable="false"></i>
                            <span>Homepage</span>
                        </a>
                    </li>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <li class="navItem rounded-xl flex justify-center items-center my-2 transition-all" class:active={activeIndex[1]} on:click={() => toggleActive(1)}>
                        <a href="/game" class="w-full h-full pl-3 py-2 flex items-center">
                            <i class="fa-regular fa-chess-knight w-7" style="font-size: 20px;" draggable="false"></i>
                            <span>Game</span>
                        </a>
                    </li>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <li class="navItem rounded-xl flex justify-center items-center my-2 transition-all" class:active={activeIndex[2]} on:click={() => toggleActive(2)}>
                        <a href="/information/stats/leaderboard" class="w-full h-full pl-3 py-2 flex items-center">
                            <i class="fa-regular fa-clipboard w-7" style="font-size: 20px;margin-bottom: 2px;" draggable="false"></i>
                            <span>Leaderboard</span>
                        </a>
                    </li>
                </ul>
                <!-- OTHER -->
                <div class="mt-16 pl-3" style="width: 98.7%;">
                    <span style="color: var(--textColorBrighter);">OTHER</span>
                    <div class="relative mt-4">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <span class="relative flex items-center justify-between cursor-pointer" on:click={() => toggleSubList(0)}>
                            <p>
                                <i class="fa-regular fa-user w-7" style="font-size: 20px;"></i>User
                            </p>
                            <i class="{indexSubList[0] ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'}"></i>
                        </span>
                        <span class="line absolute w-1 rounded-xl" style="background: var(--secondaryBg);left: 6px;margin-top:4px;height: 62%;" class:hidden={!indexSubList[0]}></span>
                        <ul class="subList relative pl-10" class:hidden={!indexSubList[0]}>
                            <li class="mt-3 relative flex navItem rounded-xl transition-all" class:active={activeIndex[3]}>
                                <a href="/information/stats/achievements" class="w-full h-full pl-2 py-2" on:click={() => toggleActive(3)}>Achievements</a>
                                <span class="line absolute top-1/2 -translate-y-1/2 w-7 h-1 rounded-xl" style="background: var(--secondaryBg);left: -34px;" class:hidden={!indexSubList[0]}></span>
                            </li>
                            <li class="mt-3 relative flex navItem rounded-xl transition-all" class:active={activeIndex[4]}>
                                <a href="/information/profile" class="w-full h-full pl-2 py-2" on:click={() => toggleActive(4)}>Profile</a>
                                <span class="line absolute top-1/2 -translate-y-1/2 w-7 h-1 rounded-xl" style="background: var(--secondaryBg);left: -34px;" class:hidden={!indexSubList[0]}></span>
                            </li>
                        </ul>
                    </div>
                    <div class="relative mt-6">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <span class="relative flex items-center justify-between cursor-pointer" on:click={() => toggleSubList(1)}>
                            <p>
                                <i class="fa-regular fa-file-code w-7" style="font-size: 20px;"></i>Development
                            </p>
                            <i class="{indexSubList[1] ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'}"></i>
                        </span>
                        <span class="line absolute w-1 rounded-xl" style="background: var(--secondaryBg);left: 6px;margin-top:4px;height: 62%;" class:hidden={!indexSubList[1]}></span>
                        <ul class="subList relative pl-10" class:hidden={!indexSubList[1]}>
                            <li class="mt-3 relative flex navItem rounded-xl transition-all" class:active={activeIndex[5]}>
                                <a href="/information/changelog" class="w-full h-full pl-2 py-2" on:click={() => toggleActive(5)}>Changelog</a>
                                <span class="line absolute top-1/2 -translate-y-1/2 w-7 h-1 rounded-xl" style="background: var(--secondaryBg);left: -34px;" class:hidden={!indexSubList[1]}></span>
                            </li>
                            <li class="mt-3 relative flex navItem rounded-xl transition-all" class:active={activeIndex[6]}>
                                <a href="/information/contact/developer" class="w-full h-full pl-2 py-2" on:click={() => toggleActive(6)}>Developer</a>
                                <span class="line absolute top-1/2 -translate-y-1/2 w-7 h-1 rounded-xl" style="background: var(--secondaryBg);left: -34px;" class:hidden={!indexSubList[1]}></span>
                            </li>
                        </ul>
                    </div>
                    <div class="relative mt-6">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <span class="relative flex items-center justify-between cursor-pointer" on:click={() => toggleSubList(2)}>
                            <p>
                                <i class="fa-regular fa-circle-question w-7" style="font-size: 20px;"></i>Support
                            </p>
                            <i class="{indexSubList[2] ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'}"></i>
                        </span>
                        <span class="line absolute w-1 rounded-xl" style="background: var(--secondaryBg);left: 8px;margin-top:4px;height: 62%;" class:hidden={!indexSubList[2]}></span>
                        <ul class="subList relative pl-10" class:hidden={!indexSubList[2]}>
                            <li class="mt-3 relative flex navItem rounded-xl transition-all" class:active={activeIndex[7]}>
                                <a href="/information/contact/ticket" class="w-full h-full pl-2 py-2" on:click={() => toggleActive(7)}>Kontakt</a>
                                <span class="line absolute top-1/2 -translate-y-1/2 w-6 h-1 rounded-xl" style="background: var(--secondaryBg);left: -30px;" class:hidden={!indexSubList[2]}></span>
                            </li>
                            <li class="mt-3 relative flex navItem rounded-xl transition-all" class:active={activeIndex[8]}>
                                <a href="/information/contact/impressum" class="w-full h-full pl-2 py-2" on:click={() => toggleActive(8)}>Impressum</a>
                                <span class="line absolute top-1/2 -translate-y-1/2 w-6 h-1 rounded-xl" style="background: var(--secondaryBg);left: -30px;" class:hidden={!indexSubList[2]}></span>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="user mt-10 mb-5">
                <button on:click={() => goto('/auth')} class="flex items-center justify-center">
                    <i class="fa-solid fa-right-from-bracket text-xl"></i>
                    <p class="ml-3 font-bold userName">Log out</p>
                </button>
            </div>
        </div>
    </AppRail>
</div>

<style lang="postcss">
    li.active {
        background-color: var(--accentColor);
        box-shadow: 0px 0px 7px 0px var(--accentColor);
    }
    li.active a span {color: var(--textColorBrighter) !important;}
    li.active a i {color: var(--textColorBrighter) !important;}
    li.active a {color: var(--textColorBrighter) !important;}
    .navItem { width: 98.7%; }
    .navItem:hover {
        background-color: var(--accentColor);
        box-shadow: 0px 0px 7px 0px var(--accentColor);
    }
    :where(.navItem:hover) a span,:where(.navItem:hover) a i, :where(.navItem:hover) a {color: var(--textColorBrighter) !important;}
    .subList { display: hidden; }
    .subList:not(.hidden) { display: block; }
</style>
