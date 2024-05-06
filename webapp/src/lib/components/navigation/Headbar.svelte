<script lang="ts">
    import { getDrawerStore, AppBar, Drawer, popup, type DrawerSettings, type PopupSettings } from "@skeletonlabs/skeleton";
    const drawerStore = getDrawerStore();
    import Sidebar from "./Sidebar.svelte";
    let isSidebarOpen = false;
    import { onMount } from "svelte";

    const popupSetting: PopupSettings = {event:'click',target:'popupSetting',placement:'bottom'};
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

    // Get the current Date in the format of "Sat 25 Feb"
    let date = new Date();
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let day = days[date.getDay()];
    let month = months[date.getMonth()];
    let currentDate = `${day} ${date.getDate()} ${month}`;
</script>

<div class="headbar mt-2 relative rounded-2xl">
    <AppBar border="rounded-2xl" padding="" background="">
        <div class="navElement flex justify-between items-center px-6 w-screen">
            <div class="trail w-1/2 relative h-16 flex items-center rounded-l-2xl">
                <div class="flex items-center">
                    <button class="lg:hidden" on:click={openSidebar}>
                        <span>
                            <svg viewBox="0 0 100 80" class="fill-token w-4 h-4" style="background-color: #fff;">
                                <rect width="100" height="20"></rect>
                                <rect y="30" width="100" height="20"></rect>
                                <rect y="60" width="100" height="20"></rect>
                            </svg>
                        </span>
                    </button>
                </div>
            </div>
            <div class="lead w-1/2 pr-1 flex items-center justify-end rounded-r-2xl">
                <div class="date rounded-2xl w-36 h-10 mr-5 flex items-center justify-center" style="background-color: var(--ghostyBg);">
                    <i class="fa-regular fa-calendar mr-3" style="color: var(--ghostyText);font-size:15px;"></i>
                    <p style="color: var(--ghostyText);font-size:15px;">{currentDate}</p>
                </div>
                <div>
                    <button class="w-10 h-10 flex justify-center items-center" use:popup={popupSetting} style="background-color: var(--ghostyBg);border-radius:50%;">
                        <i class="fa-solid fa-gear" style="color: var(--ghostyText);font-size:20px;"></i>
                    </button>
                    <div class="card p-4 variant-filled-primary" data-popup="popupSetting">
                        <p>Settings</p>
                        <div class="language mt-5">
                            <span>Language</span>
                            <ul class="flex justify-center items-center">
                                <li>DE</li>
                                <li class="ml-2">EN</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AppBar>
</div>

<style lang="postcss">

</style>
