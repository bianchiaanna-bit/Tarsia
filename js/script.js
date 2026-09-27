let defunti = [];

function nomeFormattato(nome) {
    return nome
        .toLowerCase()
        .replace(/\b\w/g, lettera => lettera.toUpperCase());
}

function cercaDefunto() {

    let testo = document
        .getElementById("cerca")
        .value
        .trim();

    let contenitore =
        document.getElementById("risultati");

    contenitore.innerHTML = "";

    if (testo === "") {
        return;
    }

    fetch(
    `https://cimitero-worker.cimiteroditarsia.workers.dev/api/defunti/cerca?q=${encodeURIComponent(testo)}`
)
    .then(response => {

        if (!response.ok) {
            throw new Error("Errore nella ricerca");
        }

        return response.json();

    })
    .then(risultati => {

        if (risultati.defunti.length === 0) {

            contenitore.innerHTML = `
                <p>Nessun defunto trovato.</p>
            `;

            return;
        }

        risultati.defunti.forEach(persona => {

            contenitore.innerHTML += `

                <div class="risultato-card">

                    <h3>
                        ${nomeFormattato(persona.cognome_nome)}
                    </h3>

                    <p>
                        Deceduto:
                        ${persona.anno_decesso || ""}
                    </p>

                    <a
                        href="defunto.html?id=${persona.id}"
                        class="scheda-button">
                        Visualizza scheda
                    </a>

                </div>

            `;

        });

    })
    .catch(errore => {

        console.error(
            "Errore ricerca defunto:",
            errore
        );

        contenitore.innerHTML = `
            <p>
            Si è verificato un errore nella ricerca.
            </p>
        `;

    });
}

document
    .getElementById("cerca")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {
            cercaDefunto();
        }

    });