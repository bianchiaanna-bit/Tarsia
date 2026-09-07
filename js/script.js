let defunti = [];

fetch("dati/defunti.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(
                "Impossibile caricare defunti.json"
            );
        }

        return response.json();
    })
    .then(dati => {
        defunti = dati;

        console.log(
            "Defunti caricati:",
            defunti.length
        );
    })
    .catch(error => {
        console.error(
            "Errore nel caricamento dei defunti:",
            error
        );

        document.getElementById("risultati").innerHTML = `
            <p>
                Errore nel caricamento dell'archivio.
            </p>
        `;
    });


function nomeFormattato(nome) {
    return nome
        .toLowerCase()
        .replace(
            /\b\w/g,
            lettera => lettera.toUpperCase()
        );
}


function cercaDefunto() {

    let testo = document
        .getElementById("cerca")
        .value
        .toLowerCase()
        .trim();


    let contenitore =
        document.getElementById("risultati");


    contenitore.innerHTML = "";


    if (testo === "") {
        contenitore.innerHTML = `
            <p>
                Inserisci un nome o un cognome.
            </p>
        `;

        return;
    }


    let risultati = defunti.filter(persona => {

        let nome =
            persona["Cognome e Nome"];


        if (!nome) {
            return false;
        }


        return nome
            .toLowerCase()
            .includes(testo);

    });


    if (risultati.length === 0) {

        contenitore.innerHTML = `
            <p>
                Nessun defunto trovato.
            </p>
        `;

        return;
    }


    risultati.forEach(persona => {

        contenitore.innerHTML += `

            <div class="risultato-card">

                <h3>
                    ${nomeFormattato(
                        persona["Cognome e Nome"]
                    )}
                </h3>

                <p>
                    Deceduto:
                    ${persona["Anno  (Decesso)"] || ""}
                </p>

                <a
                    href="defunto.html?id=${defunti.indexOf(persona)}"
                    class="scheda-button"
                >
                    Visualizza scheda
                </a>

            </div>

        `;

    });

}


document
    .getElementById("cerca")
    .addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {
                cercaDefunto();
            }

        }
    );
