<script lang="ts">
    import imgDev from "$lib/images/placeholder/user.png";
    import type { ContentType } from "$lib/types";
    
    let contentArray: ContentType[] = [
        {
            "dev": "Noah Trier", // devname
            "img": imgDev, // devimg
            "version": "V 0.0.0", // application version
            "role": "Admin", // devrole
            "content": "release", // release, beta, alpha, early access, hotfix, security
            "status": "done", // done, new
            "headline": "Grundgerüst 🛠️",
            "textContent": "Grundgerüst, Globale Styles, Frameworks und diverse Projekt Einstellungen wurden erstellt und oder eingebunde.",
            "tags": { 
                "MVP": "MVP", // MVP
                "Ready": "Ready", // Ready
                "Beta": "Beta", // Beta, Alpha, Release
                "Optimization": "Optimization" // 
            }
        },
        {
            "dev": "Noah Trier",
            "img": imgDev,
            "version": "V 0.0.1",
            "role": "Admin",
            "content": "release",
            "status": "done",
            "headline": "Changelog Route hinzugefügt 🔥",
            "textContent": "Changelog Route wurde erstellt. Hier werden alle Änderungen und Updates festgehalten.",
            "tags": { 
                "MVP": "MVP",
                "Ready": "Ready",
                "Beta": "Beta",
                "Enhancement": "Enhancement",
                "Optimization": "Optimization"
            }
        },
        {
            "dev": "Noah Trier",
            "img": imgDev,
            "version": "V 0.0.2",
            "role": "Admin",
            "content": "release",
            "status": "done",
            "headline": "Homepage Layout und Design 🏠",
            "textContent": "Die Homepage wurde mit Inhalten gefüllt und designed. Ab sofort ist die Homepage nicht mehr leer.",
            "tags": { 
                "MVP": "MVP",
                "Ready": "Ready",
                "Beta": "Release",
                "Optimization": "Optimization"
            }
        },
        {
            "dev": "Noah Trier",
            "img": imgDev,
            "version": "V 0.0.3",
            "role": "Admin",
            "content": "hotfix",
            "status": "done",
            "headline": "Game - Total Points 🛠️",
            "textContent": "Ein Bug wurde behoben. Dieser Bug sorgte dafür, dass die Gesamtpunktzahl falsch berechnet wurde. Dieser Bug wurde behoben und es werden nun die Punkte korrekt berechnet.",
            "tags": { 
                "MVP": "MVP",
                "Ready": "Ready",
                "Beta": "Release",
                "Enhancement": "Enhancement",
                "Security": "Secure",
                "Optimization": "Optimization"
            }
        },
        {
            "dev": "Noah Trier",
            "img": imgDev,
            "version": "V 0.1.3",
            "role": "Admin",
            "content": "release",
            "status": "done",
            "headline": "Impressum Page 🖺",
            "textContent": "Die Impressum Route wurde hinzugefügt und mit Inhalten befüllt. Ab sofort findet man dort alle rechtlichen Informationen, ebenso Kontaktdaten.",
            "tags": { 
                "MVP": "MVP",
                "Ready": "Ready",
                "Beta": "Release",
                "Security": "Secure",
            }
        },
        {
            "dev": "Noah Trier",
            "img": imgDev,
            "version": "V 0.1.4",
            "role": "Admin",
            "content": "release",
            "status": "done",
            "headline": "Kontakt Page 🆘",
            "textContent": "Die Kontakt Route wurde hinzugefügt und mit Inhalten befüllt. Ab sofort kann man ein Formular ausfüllen und den Support kontaktieren. ",
            "tags": { 
                "MVP": "MVP",
                "Ready": "Ready",
                "Beta": "Release",
                "Security": "Secure",
                "Enhancement": "Enhancement",
            }
        },
        {
            "dev": "Noah Trier",
            "img": imgDev,
            "version": "V 0.1.8",
            "role": "Admin",
            "content": "release",
            "status": "done",
            "headline": "Leaderboard Design 🔥",
            "textContent": "Die Leaderboard Route wurde erstellt und hinzugefügt. Dort werden alle Highscore der Top 10 abgebildet.",
            "tags": { 
                "MVP": "MVP",
                "Ready": "Ready",
                "Beta": "Release",
                "Security": "Secure",
                "Enhancement": "Enhancement",
            }
        }
    ].reverse();
</script>

<main>
    <div class="container relative">
        <h1 class="text-center mb-20 tracking-wider" style="font-size: clamp(30px, 4vw, 50px);">Changelog</h1>
        {#each contentArray as content}
        <div class="box flex flex-col mt-10 p-4 rounded-xl">
            <div class="headline flex justify-between items-center mb-5">
                <div class="dev flex">
                    <img src="{content.img}" alt="userIMG" class="w-12 h-12 mt-5" style="border-radius: 50%;" draggable="false">
                    <div class="txt flex items-center ml-3">
                        <h2 class="font-bold" style="font-size: 16px;">{content.dev}</h2>
                        <p class="py-1 px-3 ml-1 rounded-xl lg:ml-3" style="background-color: var(--ghostyBg);color: var(--ghostyText);">{content.role}</p>
                    </div>
                </div>
                <div class="version flex items-center">
                    <h2 class="italic">{content.version}</h2>
                    <p class="py-1 px-3 ml-2 rounded-xl lg:ml-5" style="background-color: var(--ghostyBg);color: var(--ghostyText);">{content.content}</p>
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
                <div class="tags flex items-center mt-10 flex-wrap">
                    {#each Object.keys(content.tags) as tag}
                    <p class="px-3 mt-2 mr-2 rounded-xl" style="background-color: var(--ghostyBg); color: var(--ghostyText); font-size:10px;">
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
