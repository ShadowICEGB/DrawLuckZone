<script lang="ts">
    import { onMount } from 'svelte';
    import { setSupportSubjectValue, supportSubjectValue } from '$lib/store';

    let messageContent: string = "";

    
    // Set the email subject
    function setSubject(): void {
        const mailtoLink: string = `mailto:spinluckzone@gmail.com?subject=${encodeURIComponent($supportSubjectValue)}&body=${encodeURIComponent(messageContent)}`;
        window.location.href = mailtoLink;
    }
    
    onMount(() => {
        setSupportSubjectValue("Allgemeine Anfrage"); // default value
    });
</script>

<main>
    <div class="container">
        <h1 class="text-center mb-20 tracking-wider" style="font-size: clamp(30px, 4vw, 50px);">Kontaktformular</h1>
        <form on:submit|preventDefault={setSubject} enctype="text/plain" class="relative left-1/2 -translate-x-1/2 flex flex-col items-center p-6 justify-center" style="max-width: 700px;">

            <div class="flex flex-col w-full">
                <span class="mb-2">Supportart</span>
                <select bind:value={$supportSubjectValue} class="bg-transparent rounded-xl" required style="border: 1px solid var(--ghostyText);">
                    <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
                    <option value="Bug report">Bug report</option>
                    <option value="Datenschutz">Datenschutz</option>
                    <option value="Feedback/Vorschläge">Feedback/Vorschläge</option>
                    <option value="Anderes">Anderes</option>
                </select>
            </div>
                            
            <div class="flex flex-col w-full mt-10">
                <span class="mb-2">Nachrichteninhalt</span>
                <textarea bind:value={messageContent} class="bg-transparent rounded-xl" rows="4" placeholder="" required style="border: 1px solid var(--ghostyText);" />
            </div>

            <button type="submit" class="mt-14 px-12 py-3 rounded-xl btnSubmit" style="background-color: var(--ghostyBg);color: var(--ghostyText);">Absenden</button>
        </form>
    </div>
</main>

<style class="postcss">
    select option { background-color: var(--primaryBg); }
    .btnSubmit { box-shadow: 0px 0px 7px 1px var(--ghostyBg); }
</style>
