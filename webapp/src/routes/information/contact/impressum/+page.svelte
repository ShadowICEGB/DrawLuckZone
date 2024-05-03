<script lang="ts">
    export let name = 'Noah Trier';
    export let age = 20;
    export let country = 'Germany';
    export let state = 'Hessen';
</script>

<main>
    <div class="container">
        <h1 class="uppercase tracking-widest font-bold" style="font-size: clamp(30px,4vw,40px);">Impressum</h1>
        <section class="mt-20">
            <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h2>
            <p>
                {name} - {age} age<br>
                {country}, {state}
            </p>
        </section>
        <section>
            <h2>Kontakt</h2>
            <p>
                Name: {name}<br>
                Alter: {age} Jahre<br>
                Land: {country}<br>
                Bundesland: {state}
            </p>
            <p>
                Für Fragen oder Anregungen können Sie uns unter der folgenden E-Mail-Adresse
                erreichen: <a href="mailto:spinluckzone@gmail.de" class="italic" style="color: var(--accentColor);">spinluckzone@gmail.de</a>
            </p>
        </section>
        <section>
            <h2>Haftungsausschluss</h2>
            <p>
                Die Inhalte dieser Webseite sind frei erfunden und dienen ausschließlich
                zu Unterhaltungszwecken. Jegliche Ähnlichkeiten mit realen Personen,
                Orten oder Ereignissen sind rein zufällig.
            </p>
            <p>
                Es ist nicht gestattet, Inhalte dieser Webseite anderweitig zu nutzen,
                zu kopieren oder zu reproduzieren, es sei denn, es liegt eine ausdrückliche
                Zustimmung des Rechteinhabers vor.
            </p>
            <p>
                Der Zugriff auf nicht erlaubte Ressourcen oder das Spiegeln dieser Webseite
                für andere Zwecke ist strengstens untersagt.
            </p>
        </section>
        <section>
            <h2>Haftung für Links</h2>
            <p>
                Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
                für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
                sind ausschließlich deren Betreiber verantwortlich.
            </p>
        </section>
        <section>
            <h2>Urheberrecht</h2>
            <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
                Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
                Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen
                des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
                Autors bzw. Erstellers.
            </p>
            <p>
                Alle auf der Webseite verwendeten Bilder, Grafiken, Texte oder sonstige Inhalte sind 
                entweder im Besitz des Betreibers oder werden mit entsprechender Genehmigung verwendet. 
                Jegliche Verwendung dieser Inhalte ohne ausdrückliche Genehmigung ist untersagt.
            </p>
        </section>
        <section>
            <h2>Datenschutzerklärung</h2>
            <p>
                Diese Webseite sammelt, speichert oder verarbeitet personenbezogenen Daten ihrer Nutzer. 
                Diese werden ausschließlich für die Authentifizierung genutzt.
            </p>
        </section>
        <section>
            <h2>Nutzungsbedingungen</h2>
            <p>
                Die Nutzung dieser Webseite erfolgt auf eigene Gefahr. Der Betreiber übernimmt keine 
                Haftung für Schäden, die durch die Nutzung dieser Webseite entstehen könnten. Die Nutzung 
                der Webseite ist nur zu legalen Zwecken gestattet. Jegliche Nutzung dieser Webseite für 
                illegale oder unangemessene Zwecke ist untersagt.
            </p>
        </section>
        <section>
            <h2>Gesetzliche Hinweise</h2>
            <p>
                Diese Webseite unterliegt den gesetzlichen Bestimmungen der Bundesrepublik Deutschland. 
                Bei Streitigkeiten ist das Gericht am Standort des Betreibers zuständig.
            </p>
        </section>
    </div>
</main>

<style lang="css">
    section { margin-bottom: 40px; }
    h1, h2 { color: var(--accentColor); }
    h2 { margin-bottom: 5px; }
    p { line-height: 1.6;color: var(--textColorDarker); }
</style>
