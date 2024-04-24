<script lang="ts">
    import user from "$lib/images/placeholder/user.png";
    import type { ContentType } from "$lib/types";
    import json from "$lib/configChangeLog.json";
    
    let contentArray: ContentType[] = json.reverse();
</script>

<main>
    <div class="container relative">
        <span class="line absolute top-32 left-1/2 w-1 h-4/5 -z-10" style="background-color: var(--secondaryBg);"></span>
        <h1 class="text-center mb-20 tracking-wider" style="font-size: clamp(30px, 4vw, 60px);">Changelog</h1>
        {#each contentArray as content}
        <div class="box flex flex-col mt-10 p-4 rounded-xl">
            <div class="headline flex justify-between items-center mb-5">
                <div class="dev flex">
                    <img src={user} alt="userIMG" class="w-12 h-12 mt-5" style="border-radius: 50%;">
                    <div class="txt flex items-center ml-3">
                        <h2 class="font-bold" style="font-size: 16px;">{content.dev}</h2>
                        <p class="py-1 px-3 ml-3 rounded-xl" style="background-color: var(--ghostyBg);color: var(--ghostyText);">{content.role}</p>
                    </div>
                </div>
                <div class="version flex items-center">
                    <h2 class="italic">{content.version}</h2>
                    <p class="py-1 px-3 ml-5 rounded-xl" style="background-color: var(--ghostyBg);color: var(--ghostyText);">{content.content}</p>
                </div>
            </div>
            <div class="content p-4 rounded-xl" style="background-color: var(--secondaryBg);">
                <div class="status flex mb-5">
                    <p class="px-3 rounded-xl" style="background-color: var(--ghostyBg); color: var(--ghostyText); font-size:10px;">
                        {content.status}
                    </p>
                </div>
                <h1 class="font-bold mb-5" style="font-size: 20px;">{content.headline}</h1>
                <p style="color: var(--textColorDarker);">
                    {content.textContent}
                </p>
                <div class="tags flex items-center mt-10">
                    {#each Object.keys(content.tags) as tag}
                    <p class="px-3 ml-3 rounded-xl" style="background-color: var(--ghostyBg); color: var(--ghostyText); font-size:10px;">
                        {content.tags[(tag)]}
                    </p>
                    {/each}
                </div>
            </div>
        </div>
        {/each}
    </div>
</main>

<style class="postcss">
    
</style>
