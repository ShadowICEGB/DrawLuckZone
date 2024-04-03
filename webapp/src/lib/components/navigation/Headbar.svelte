<script lang="ts">
    import { getDrawerStore, AppBar, Drawer, popup, type DrawerSettings, type PopupSettings } from "@skeletonlabs/skeleton";
    const drawerStore = getDrawerStore();
    import Sidebar from "./Sidebar.svelte";
	import { goto } from "$app/navigation";
    let isSidebarOpen = false;

    const popupPlace: PopupSettings = {event:'click',target:'popupPlace',placement:'bottom'};
    const drawerSettings: DrawerSettings = {
        id: 'Navbar',
        bgDrawer: 'transparent',
        border: 'border-none',
        bgBackdrop: 'bg-gradient-to-tr from indigo-800/50',
        width: 'w-[300px]',
        padding: 'p-4',
        rounded: 'rounded-xl',
        shadow: 'shadow-none',
    };

    const openSidebar = () => {
        // toggle Store
        if (isSidebarOpen) {
            drawerStore.close();
            isSidebarOpen = false;
        } else {
            drawerStore.open(drawerSettings);
            isSidebarOpen = true;
        }
    }
</script>

<div class="headbar mt-5 relative left-1/2 -translate-x-1/2 rounded-2xl">
    <AppBar border="rounded-2xl" padding="" background="">
        <div class="navElement flex justify-between items-center px-6 w-screen">
            <div class="trail w-1/2 h-20 flex items-center rounded-l-2xl">
                <div class="flex items-center ml-10">
                    <button class="lg:hidden btn btn-sm mr-2" on:click={openSidebar}>
                        <span>
                            <svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
                                <rect width="100" height="20"></rect>
                                <rect y="30" width="100" height="20"></rect>
                                <rect y="60" width="100" height="20"></rect>
                            </svg>
                        </span>
                    </button>
                    <div class="box lg:block max-lg:hidden">
                        <img src="/kleeblatt.png" alt="kleeblatt" class="w-12 rotate-12" draggable="false">
                    </div>
                </div>
            </div>
            <div class="lead w-1/2 h-20 pr-1 flex items-center justify-end rounded-r-2xl">
                <button class="btn rounded-xl uppercase" on:click={() => goto('/changelog')}><i class="fa-solid fa-clock-rotate-left mr-2"></i> Changelog</button>
                <button class="btn rounded-xl ml-6 uppercase"><a href="https://github.com/ShadowICEGB/PickUp"><i class="fa-brands fa-github mr-2"></i> GitHub</a></button>
            </div>
        </div>
    </AppBar>
</div>

<style lang="postcss">
    .btn { 
        border: 2px solid rgba(var(--color-secondary-500) / 1); 
        box-shadow: 0 0 .2rem #fff,
            0 0 2px #fff,
            0 0 5px #ff00ff,
            0 0 5px #ff00ff,
            0 0 20px #ff00ff,
            inset 0 0 10px #ff00ff; 
    }
    .btn:hover {
        background: rgba(var(--color-secondary-500) / 1);
        box-shadow: 0px 0px 10px 5px rgba(var(--color-secondary-500) / 1);
    }
</style>
