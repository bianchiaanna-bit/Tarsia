let parametri = new URLSearchParams(window.location.search);

let id = parametri.get("id");

fetch(`https://cimitero-worker.cimiteroditarsia.workers.dev/api/defunti/${id}`)

    .then(response => {

        if (!response.ok) {
            throw new Error("Defunto non trovato");
        }

        return response.json();

    })

    .then(risposta => {

        let persona = risposta.defunto;

        let scheda =
            document.getElementById("scheda");


        // --------------------------------------
        // NOME CORRETTO
        // --------------------------------------

        let nomeCompleto =
            persona.cognome_nome
                .toLowerCase()
                .replace(
                    /\b\w/g,
                    lettera => lettera.toUpperCase()
                );


        // --------------------------------------
        // FUNZIONE CREAZIONE SCHEDA
        // --------------------------------------

        function creaScheda(foto) {

            scheda.innerHTML = `

            <a href="index.html" class="torna">
                ← Torna alla ricerca
            </a>

            <h2>${nomeCompleto}</h2>

            <div class="scheda-contenuto">

                <div class="dati-defunto">

                    <p>
                        Sesso:
                        ${
                            persona.sesso === "M"
                            ? "Maschio"
                            : persona.sesso === "F"
                            ? "Femmina"
                            : "—"
                        }
                    </p>

                    <p>
                        Nato:
                        ${persona.giorno_mese_nascita || "—"}
                        ${persona.anno_nascita || ""}
                    </p>

                    <p>
                        Deceduto:
                        ${persona.giorno_mese_decesso || "—"}
                        ${persona.anno_decesso || ""}
                    </p>

                    <p>
                        Età:
                        ${
                            persona.eta
                            ? `${persona.eta} anni`
                            : "—"
                        }
                    </p>


                    <h3 class="titolo-posizione">
                        Posizione nel cimitero
                    </h3>

                    <p>
                        Zona:
                        ${persona.zona || "—"}
                    </p>

                    <p>
                        Via:
                        ${persona.via || "—"}
                    </p>

                    <p>
                        Loculo:
                        ${persona.posizione_loculo || "—"}
                    </p>


                    ${
                        persona.osservazioni
                        ? `
                        <p>
                            <strong>Osservazioni:</strong>
                            ${persona.osservazioni}
                        </p>
                        `
                        : ""
                    }


                    <a
                        href="planimetria.html"
                        class="pulsante">
                        Visualizza posizione sulla mappa
                    </a>

                </div>


                <div class="foto-defunto">

                    ${foto}

                </div>

            </div>

            `;
        }


        // --------------------------------------
        // GESTIONE FOTO
        // --------------------------------------

        if (persona.foto) {

            creaScheda(`

                <img
                    src="https://cimitero-worker.cimiteroditarsia.workers.dev/api/foto/${encodeURIComponent(persona.foto)}"
                    alt="${nomeCompleto}">

            `);

        } else {

            creaScheda(`

                <div class="foto-mancante">

                    <img
                        src="immagini/angelo-nuvole.webp"
                        alt="Immagine commemorativa">

                    <a
                        href="contatti.html"
                        class="scheda-button">
                        Proponi una fotografia
                    </a>

                </div>

            `);

        }

    })


// --------------------------------------
// ERRORE CARICAMENTO
// --------------------------------------

.catch(errore => {

    console.error(
        "Errore caricamento defunto:",
        errore
    );

    document.getElementById("scheda").innerHTML = `

        <p>
            Defunto non trovato.
        </p>

        <a
            href="index.html"
            class="torna">
            ← Torna alla ricerca
        </a>

    `;

});