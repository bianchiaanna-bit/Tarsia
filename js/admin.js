const API = "";

// =====================================================
// ELEMENTI PRINCIPALI
// =====================================================

const loginForm =
    document.getElementById("login-form");

const loginMessaggio =
    document.getElementById("login-messaggio");

const adminArea =
    document.getElementById("admin-area");

const operatoreArea =
    document.getElementById("operatore-area");


// =====================================================
// CALCOLO ETÀ
// =====================================================

function estraiGiornoMese(valore) {

    if (!valore) {
        return null;
    }

    const parti =
        String(valore)
            .trim()
            .split(/[\/\-.]/);

    if (parti.length < 2) {
        return null;
    }

    const giorno =
        Number(parti[0]);

    const mese =
        Number(parti[1]);

    if (
        !Number.isInteger(giorno) ||
        !Number.isInteger(mese) ||
        giorno < 1 ||
        giorno > 31 ||
        mese < 1 ||
        mese > 12
    ) {
        return null;
    }

    return {
        giorno,
        mese
    };
}


function calcolaEta(
    giornoMeseNascita,
    annoNascita,
    giornoMeseDecesso,
    annoDecesso
) {

    if (
        annoNascita === "" ||
        annoNascita === null ||
        annoNascita === undefined ||
        annoDecesso === "" ||
        annoDecesso === null ||
        annoDecesso === undefined
    ) {
        return "";
    }

    const annoN =
        Number(annoNascita);

    const annoD =
        Number(annoDecesso);

    if (
        !Number.isInteger(annoN) ||
        !Number.isInteger(annoD) ||
        annoN < 1 ||
        annoD < 1 ||
        annoD < annoN
    ) {
        return "";
    }

    let eta =
        annoD - annoN;

    const nascita =
        estraiGiornoMese(
            giornoMeseNascita
        );

    const decesso =
        estraiGiornoMese(
            giornoMeseDecesso
        );

    if (nascita && decesso) {

        if (
            decesso.mese < nascita.mese ||
            (
                decesso.mese === nascita.mese &&
                decesso.giorno < nascita.giorno
            )
        ) {
            eta--;
        }
    }

    return eta >= 0 ? eta : "";
}


// =====================================================
// AGGIORNA ETÀ ADMIN
// =====================================================

function aggiornaEtaAdmin() {

    const campoEta =
        document.getElementById("eta");

    if (!campoEta) {
        return;
    }

    const campoNascita =
        document.getElementById(
            "giorno-mese-nascita"
        );

    const campoAnnoNascita =
        document.getElementById(
            "anno-nascita"
        );

    const campoDecesso =
        document.getElementById(
            "giorno-mese-decesso"
        );

    const campoAnnoDecesso =
        document.getElementById(
            "anno-decesso"
        );

    if (
        !campoNascita ||
        !campoAnnoNascita ||
        !campoDecesso ||
        !campoAnnoDecesso
    ) {
        return;
    }

    campoEta.value =
        calcolaEta(
            campoNascita.value,
            campoAnnoNascita.value,
            campoDecesso.value,
            campoAnnoDecesso.value
        );
}


// =====================================================
// AGGIORNA ETÀ OPERATORE
// =====================================================

function aggiornaEtaOperatore() {

    const campoEta =
        document.getElementById(
            "operatore-eta"
        );

    if (!campoEta) {
        return;
    }

    const campoNascita =
        document.getElementById(
            "operatore-giorno-mese-nascita"
        );

    const campoAnnoNascita =
        document.getElementById(
            "operatore-anno-nascita"
        );

    const campoDecesso =
        document.getElementById(
            "operatore-giorno-mese-decesso"
        );

    const campoAnnoDecesso =
        document.getElementById(
            "operatore-anno-decesso"
        );

    if (
        !campoNascita ||
        !campoAnnoNascita ||
        !campoDecesso ||
        !campoAnnoDecesso
    ) {
        return;
    }

    campoEta.value =
        calcolaEta(
            campoNascita.value,
            campoAnnoNascita.value,
            campoDecesso.value,
            campoAnnoDecesso.value
        );
}


// =====================================================
// EVENTI CALCOLO ETÀ ADMIN
// =====================================================

[
    "giorno-mese-nascita",
    "anno-nascita",
    "giorno-mese-decesso",
    "anno-decesso"
].forEach(function (id) {

    const elemento =
        document.getElementById(id);

    if (elemento) {

        elemento.addEventListener(
            "input",
            aggiornaEtaAdmin
        );

        elemento.addEventListener(
            "change",
            aggiornaEtaAdmin
        );
    }
});


// =====================================================
// EVENTI CALCOLO ETÀ OPERATORE
// =====================================================

[
    "operatore-giorno-mese-nascita",
    "operatore-anno-nascita",
    "operatore-giorno-mese-decesso",
    "operatore-anno-decesso"
].forEach(function (id) {

    const elemento =
        document.getElementById(id);

    if (elemento) {

        elemento.addEventListener(
            "input",
            aggiornaEtaOperatore
        );

        elemento.addEventListener(
            "change",
            aggiornaEtaOperatore
        );
    }
});


// =====================================================
// ANTEPRIMA FOTO
// =====================================================

function collegaAnteprimaFoto(
    inputId,
    contenitoreId,
    immagineId
) {

    const input =
        document.getElementById(inputId);

    const contenitore =
        document.getElementById(
            contenitoreId
        );

    const immagine =
        document.getElementById(
            immagineId
        );

    if (
        !input ||
        !contenitore ||
        !immagine
    ) {
        return;
    }

    input.addEventListener(
        "change",
        function () {

            const file =
                input.files[0];

            if (!file) {

                contenitore.style.display =
                    "none";

                immagine.src =
                    "";

                return;
            }

            const tipiConsentiti = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];

            if (
                !tipiConsentiti.includes(
                    file.type
                )
            ) {

                alert(
                    "Formato foto non consentito. Usa JPG, PNG oppure WEBP."
                );

                input.value = "";

                contenitore.style.display =
                    "none";

                immagine.src =
                    "";

                return;
            }

            if (
                file.size >
                10 * 1024 * 1024
            ) {

                alert(
                    "La fotografia supera il limite massimo di 10 MB."
                );

                input.value = "";

                contenitore.style.display =
                    "none";

                immagine.src =
                    "";

                return;
            }

            const lettore =
                new FileReader();

            lettore.onload =
                function (evento) {

                    immagine.src =
                        evento.target.result;

                    contenitore.style.display =
                        "block";
                };

            lettore.readAsDataURL(
                file
            );
        }
    );
}


// =====================================================
// COLLEGAMENTO ANTEPRIMA FOTO ADMIN
// =====================================================

collegaAnteprimaFoto(
    "foto",
    "anteprima-foto",
    "anteprima-foto-img"
);


// =====================================================
// COLLEGAMENTO ANTEPRIMA FOTO OPERATORE
// =====================================================

collegaAnteprimaFoto(
    "operatore-foto",
    "operatore-anteprima-foto",
    "operatore-anteprima-foto-img"
);


// =====================================================
// LOGIN
// =====================================================

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();

            const username =
                document.getElementById(
                    "username"
                ).value.trim();

            const password =
                document.getElementById(
                    "password"
                ).value;

            try {

                const risposta =
                    await fetch(
                        `${API}/api/admin/login`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    username,
                                    password
                                })
                        }
                    );

                const dati =
                    await risposta.json();

                if (!risposta.ok) {

                    loginMessaggio.textContent =
                        dati.errore ||
                        "Nome utente o password non validi.";

                    return;
                }

                sessionStorage.setItem(
                    "token",
                    dati.token
                );

                sessionStorage.setItem(
                    "ruolo",
                    dati.ruolo
                );

                const login =
                    document.querySelector(
                        ".admin-login"
                    );

                if (login) {
                    login.style.display =
                        "none";
                }

                if (
                    dati.ruolo === "admin"
                ) {

                    adminArea.style.display =
                        "block";

                    operatoreArea.style.display =
                        "none";

                    await caricaArchivio();
                }

                else if (
                    dati.ruolo === "operatore"
                ) {

                    adminArea.style.display =
                        "none";

                    operatoreArea.style.display =
                        "block";

                    const campo =
                        document.getElementById(
                            "operatore-cognome-nome"
                        );

                    if (campo) {
                        campo.focus();
                    }
                }

            }

            catch (errore) {

                console.error(
                    "Errore login:",
                    errore
                );

                loginMessaggio.textContent =
                    "Errore di collegamento con il server.";
            }
        }
    );
}


// =====================================================
// RECUPERO SESSIONE
// =====================================================

window.addEventListener(
    "DOMContentLoaded",
    async function () {

        const token =
            sessionStorage.getItem(
                "token"
            );

        const ruolo =
            sessionStorage.getItem(
                "ruolo"
            );

        if (
            !token ||
            !ruolo
        ) {
            return;
        }

        const login =
            document.querySelector(
                ".admin-login"
            );

        if (login) {
            login.style.display =
                "none";
        }

        if (
            ruolo === "admin"
        ) {

            adminArea.style.display =
                "block";

            operatoreArea.style.display =
                "none";

            await caricaArchivio();

        }

        else if (
            ruolo === "operatore"
        ) {

            adminArea.style.display =
                "none";

            operatoreArea.style.display =
                "block";
        }
    }
);


// =====================================================
// AUTORIZZAZIONE
// =====================================================

function headersAutorizzazione() {

    const token =
        sessionStorage.getItem(
            "token"
        );

    return {

        "Content-Type":
            "application/json",

        "Authorization":
            `Bearer ${token}`
    };
}


// =====================================================
// AUTORIZZAZIONE SOLO TOKEN
// IMPORTANTE PER FORMDATA / FOTO
// =====================================================

function headerSoloAutorizzazione() {

    const token =
        sessionStorage.getItem(
            "token"
        );

    return {
        "Authorization":
            `Bearer ${token}`
    };
}


// =====================================================
// CARICAMENTO ARCHIVIO
// =====================================================

async function caricaArchivio() {

    try {

        const risposta =
            await fetch(
                `${API}/api/admin/defunti`,
                {
                    headers:
                        headersAutorizzazione()
                }
            );

        const dati =
            await risposta.json();

        if (!risposta.ok) {

            document.getElementById(
                "archivio"
            ).textContent =
                dati.errore ||
                "Errore durante il caricamento dell'archivio.";

            return;
        }

        mostraArchivio(dati);

    }

    catch (errore) {

        console.error(
            errore
        );

        document.getElementById(
            "archivio"
        ).textContent =
            "Errore durante il caricamento dell'archivio.";
    }
}


// =====================================================
// CERCA NELL'ARCHIVIO
// =====================================================

function applicaRicercaArchivio() {

    const campo =
        document.getElementById(
            "cerca-archivio"
        );

    const testo =
        campo
            ? campo.value.trim().toLowerCase()
            : "";

    const righe =
        document.querySelectorAll(
            "#archivio tbody tr"
        );

    righe.forEach(
        function (riga) {

            const contenuto =
                riga.dataset.ricerca || "";

            if (
                !testo ||
                contenuto.includes(testo)
            ) {

                riga.style.display =
                    "";

            } else {

                riga.style.display =
                    "none";
            }
        }
    );
}


// =====================================================
// VISUALIZZAZIONE ARCHIVIO
// =====================================================

function mostraArchivio(defunti) {

    const archivio =
        document.getElementById(
            "archivio"
        );

    if (!archivio) {
        return;
    }

    if (!defunti.length) {

        archivio.innerHTML =
            "<p>Nessun record presente nell'archivio.</p>";

        return;
    }


    // =====================================================
    // MEMORIA ORDINAMENTO
    // =====================================================

    if (
        typeof mostraArchivio.colonnaOrdinamento ===
        "undefined"
    ) {

        mostraArchivio.colonnaOrdinamento =
            null;
    }

    if (
        typeof mostraArchivio.direzioneOrdinamento ===
        "undefined"
    ) {

        mostraArchivio.direzioneOrdinamento =
            "asc";
    }


    let html = `

        <div class="admin-ricerca">

            <div class="admin-ricerca-titolo">

                <span class="admin-ricerca-icona">
                    ⌕
                </span>

                <div>

                    <strong>
                        Cerca nell'archivio
                    </strong>

                    <small>
                        Cerca per numero ID, cognome o nome
                    </small>

                </div>

            </div>

            <div class="admin-ricerca-campo">

                <input
                    type="search"
                    id="cerca-archivio"
                    placeholder="Inserisci ID, cognome o nome..."
                    autocomplete="off"
                >

                <button
                    type="button"
                    id="cancella-ricerca"
                    aria-label="Cancella ricerca"
                >
                    ×
                </button>

            </div>

        </div>


        <table>

            <thead>

                <tr>

                    <th
                        class="ordinabile"
                        data-colonna="id"
                    >
                        ID

                        <span class="freccia-ordinamento">
                            ${
                                mostraArchivio.colonnaOrdinamento === "id"
                                    ? (
                                        mostraArchivio.direzioneOrdinamento === "asc"
                                            ? "↑"
                                            : "↓"
                                    )
                                    : "↕"
                            }
                        </span>

                    </th>


                    <th
                        class="ordinabile"
                        data-colonna="cognome_nome"
                    >
                        Cognome e Nome

                        <span class="freccia-ordinamento">
                            ${
                                mostraArchivio.colonnaOrdinamento === "cognome_nome"
                                    ? (
                                        mostraArchivio.direzioneOrdinamento === "asc"
                                            ? "↑"
                                            : "↓"
                                    )
                                    : "↕"
                            }
                        </span>

                    </th>


                    <th
                        class="ordinabile"
                        data-colonna="anno_decesso"
                    >
                        Anno decesso

                        <span class="freccia-ordinamento">
                            ${
                                mostraArchivio.colonnaOrdinamento === "anno_decesso"
                                    ? (
                                        mostraArchivio.direzioneOrdinamento === "asc"
                                            ? "↑"
                                            : "↓"
                                    )
                                    : "↕"
                            }
                        </span>

                    </th>


                    <th
                        class="ordinabile"
                        data-colonna="posizione_loculo"
                    >
                        Posizione

                        <span class="freccia-ordinamento">
                            ${
                                mostraArchivio.colonnaOrdinamento === "posizione_loculo"
                                    ? (
                                        mostraArchivio.direzioneOrdinamento === "asc"
                                            ? "↑"
                                            : "↓"
                                    )
                                    : "↕"
                            }
                        </span>

                    </th>


                    <th
                        class="ordinabile"
                        data-colonna="note"
                    >
                        Note

                        <span class="freccia-ordinamento">
                            ${
                                mostraArchivio.colonnaOrdinamento === "note"
                                    ? (
                                        mostraArchivio.direzioneOrdinamento === "asc"
                                            ? "↑"
                                            : "↓"
                                    )
                                    : "↕"
                            }
                        </span>

                    </th>

                    <th
                        class="ordinabile"
                        data-colonna="pubblicato"
                    >
                        Pubblicato

                        <span class="freccia-ordinamento">
                            ${
                                mostraArchivio.colonnaOrdinamento === "pubblicato"
                                    ? (
                                        mostraArchivio.direzioneOrdinamento === "asc"
                                            ? "↑"
                                            : "↓"
                                    )
                                    : "↕"
                            }
                        </span>

                    </th>


                    <th>
                        Azioni
                    </th>

                </tr>

            </thead>


            <tbody>

    `;


    // =====================================================
    // RIGHE
    // =====================================================

    defunti.forEach(
        function (defunto) {

            const ricerca =
                `${defunto.id} ${(defunto.cognome_nome || "").toLowerCase()}`;

            html += `

                <tr
                    data-ricerca="${ricerca}"
                >

                    <td>
                        ${defunto.id}
                    </td>


                    <td>
                        ${defunto.cognome_nome || ""}
                    </td>


                    <td>
                        ${defunto.anno_decesso || ""}
                    </td>


                    <td>
                        ${defunto.posizione_loculo || ""}
                    </td>

                    <td>
                        ${defunto.note || ""}
                    </td>

                    <td>
                        ${
                            defunto.pubblicato
                                ? "SI"
                                : "NO"
                        }
                    </td>


                    <td>

                        <button
                            type="button"
                            class="bottone-modifica"
                            onclick="modificaDefunto(${defunto.id})"
                        >
                            Modifica
                        </button>


                        <button
                            type="button"
                            class="bottone-elimina"
                            onclick="eliminaDefunto(${defunto.id})"
                        >
                            Elimina
                        </button>

                    </td>

                </tr>

            `;
        }
    );


    html += `

            </tbody>

        </table>

    `;


    archivio.innerHTML =
        html;


    // =====================================================
    // RICERCA
    // =====================================================

    const campoRicerca =
        document.getElementById(
            "cerca-archivio"
        );

    const pulsanteCancella =
        document.getElementById(
            "cancella-ricerca"
        );


    if (campoRicerca) {

        campoRicerca.addEventListener(
            "input",
            function () {

                applicaRicercaArchivio();

                if (pulsanteCancella) {

                    pulsanteCancella.style.opacity =
                        campoRicerca.value
                            ? "1"
                            : "0.35";
                }
            }
        );
    }


    if (pulsanteCancella) {

        pulsanteCancella.style.opacity =
            "0.35";

        pulsanteCancella.addEventListener(
            "click",
            function () {

                campoRicerca.value =
                    "";

                applicaRicercaArchivio();

                campoRicerca.focus();

                pulsanteCancella.style.opacity =
                    "0.35";
            }
        );
    }


    // =====================================================
    // ORDINAMENTO
    // =====================================================

    const intestazioniOrdinabili =
        document.querySelectorAll(
            "#archivio th.ordinabile"
        );


    intestazioniOrdinabili.forEach(
        function (intestazione) {

            intestazione.addEventListener(
                "click",
                function () {

                    const colonna =
                        intestazione.dataset.colonna;


                    // Se clicchiamo la stessa colonna
                    // invertiamo l'ordine

                    if (
                        mostraArchivio.colonnaOrdinamento ===
                        colonna
                    ) {

                        if (
                            mostraArchivio.direzioneOrdinamento ===
                            "asc"
                        ) {

                            mostraArchivio.direzioneOrdinamento =
                                "desc";

                        } else {

                            mostraArchivio.direzioneOrdinamento =
                                "asc";
                        }

                    } else {

                        // Nuova colonna:
                        // partiamo sempre dal crescente

                        mostraArchivio.colonnaOrdinamento =
                            colonna;

                        mostraArchivio.direzioneOrdinamento =
                            "asc";
                    }


                    const direzione =
                        mostraArchivio.direzioneOrdinamento;


                    // =================================================
                    // ORDINAMENTO DEI DATI
                    // =================================================

                    defunti.sort(
                        function (a, b) {

                            let valoreA =
                                a[colonna];

                            let valoreB =
                                b[colonna];


                            if (
                                valoreA === null ||
                                valoreA === undefined
                            ) {

                                valoreA = "";
                            }


                            if (
                                valoreB === null ||
                                valoreB === undefined
                            ) {

                                valoreB = "";
                            }


                            // -----------------------------
                            // ID
                            // -----------------------------

                            if (
                                colonna === "id"
                            ) {

                                valoreA =
                                    Number(
                                        valoreA
                                    );

                                valoreB =
                                    Number(
                                        valoreB
                                    );
                            }


                            // -----------------------------
                            // POSIZIONE
                            // -----------------------------

                            else if (
                                colonna ===
                                "posizione_loculo"
                            ) {

                                valoreA =
                                    Number(
                                        valoreA
                                    );

                                valoreB =
                                    Number(
                                        valoreB
                                    );


                                if (
                                    Number.isNaN(
                                        valoreA
                                    )
                                ) {

                                    valoreA =
                                        Infinity;
                                }


                                if (
                                    Number.isNaN(
                                        valoreB
                                    )
                                ) {

                                    valoreB =
                                        Infinity;
                                }
                            }


                            // -----------------------------
                            // PUBBLICATO
                            // -----------------------------

                            else if (
                                colonna ===
                                "pubblicato"
                            ) {

                                valoreA =
                                    Number(
                                        valoreA
                                    );

                                valoreB =
                                    Number(
                                        valoreB
                                    );
                            }


                            // -----------------------------
                            // TESTO
                            // -----------------------------

                            else {

                                valoreA =
                                    String(
                                        valoreA
                                    )
                                        .toLowerCase()
                                        .trim();

                                valoreB =
                                    String(
                                        valoreB
                                    )
                                        .toLowerCase()
                                        .trim();
                            }


                            // =================================================
                            // CONFRONTO
                            // =================================================

                            let confronto =
                                0;


                           if (
                                colonna === "cognome_nome" ||
                                colonna === "note"
                            ) {

                                confronto =
                                    String(
                                        valoreA
                                    ).localeCompare(
                                        String(
                                            valoreB
                                        ),
                                        "it",
                                        {
                                            sensitivity:
                                                "base"
                                        }
                                    );

                            } else {

                                if (
                                    valoreA <
                                    valoreB
                                ) {

                                    confronto =
                                        -1;
                                }

                                else if (
                                    valoreA >
                                    valoreB
                                ) {

                                    confronto =
                                        1;
                                }
                            }


                            return direzione ===
                                "asc"
                                ? confronto
                                : -confronto;
                        }
                    );


                    // Ridisegna la tabella

                    mostraArchivio(
                        defunti
                    );

                }
            );
        }
    );

}


// =====================================================
// NUOVO DEFUNTO ADMIN
// =====================================================

const nuovoDefunto =
    document.getElementById(
        "nuovo-defunto"
    );

if (nuovoDefunto) {

    nuovoDefunto.addEventListener(
        "click",
        function () {

            document.getElementById(
                "titolo-modifica"
            ).textContent =
                "Inserisci nuovo defunto";

            document.getElementById(
                "form-defunto"
            ).reset();

            document.getElementById(
                "defunto-id"
            ).value =
                "";

            document.getElementById(
                "pubblicato"
            ).checked =
                true;


            const anteprima =
                document.getElementById(
                    "anteprima-foto"
                );

            const immagine =
                document.getElementById(
                    "anteprima-foto-img"
                );


            if (anteprima) {
                anteprima.style.display =
                    "none";
            }

            if (immagine) {
                immagine.src =
                    "";
            }


            aggiornaEtaAdmin();


            document.getElementById(
                "modifica-defunto"
            ).style.display =
                "block";
        }
    );
}


// =====================================================
// CHIUSURA MODULO ADMIN
// =====================================================

const chiudiModifica =
    document.getElementById(
        "chiudi-modifica"
    );

if (chiudiModifica) {

    chiudiModifica.addEventListener(
        "click",
        function () {

            document.getElementById(
                "modifica-defunto"
            ).style.display =
                "none";
        }
    );
}


// =====================================================
// MODIFICA DEFUNTO
// =====================================================

async function modificaDefunto(id) {

    try {

        const risposta =
            await fetch(
                `${API}/api/admin/defunti/${id}`,
                {
                    headers:
                        headersAutorizzazione()
                }
            );

        const defunto =
            await risposta.json();

        if (!risposta.ok) {

            alert(
                defunto.errore ||
                "Errore durante il recupero del record."
            );

            return;
        }


        document.getElementById(
            "defunto-id"
        ).value =
            defunto.id;


        document.getElementById(
            "cognome-nome"
        ).value =
            defunto.cognome_nome || "";


        document.getElementById(
            "sesso"
        ).value =
            defunto.sesso || "";


        document.getElementById(
            "giorno-mese-decesso"
        ).value =
            defunto.giorno_mese_decesso || "";


        document.getElementById(
            "anno-decesso"
        ).value =
            defunto.anno_decesso || "";


        document.getElementById(
            "giorno-mese-nascita"
        ).value =
            defunto.giorno_mese_nascita || "";


        document.getElementById(
            "anno-nascita"
        ).value =
            defunto.anno_nascita || "";


        document.getElementById(
            "posizione-loculo"
        ).value =
            defunto.posizione_loculo || "";


        document.getElementById(
            "zona"
        ).value =
            defunto.zona || "";


        document.getElementById(
            "via"
        ).value =
            defunto.via || "";


        document.getElementById(
            "osservazioni"
        ).value =
            defunto.osservazioni || "";


        document.getElementById(
            "note"
        ).value =
            defunto.note || "";


        document.getElementById(
            "pubblicato"
        ).checked =
            Boolean(
                defunto.pubblicato
            );


        // =============================================
        // FOTO ATTUALE
        // =============================================

        const campoFoto =
            document.getElementById(
                "foto"
            );

        const anteprima =
            document.getElementById(
                "anteprima-foto"
            );

        const immagine =
            document.getElementById(
                "anteprima-foto-img"
            );


        if (campoFoto) {
            campoFoto.value =
                "";
        }


        if (
            defunto.foto &&
            anteprima &&
            immagine
        ) {

            immagine.src =
                `${API}${defunto.foto}`;

            anteprima.style.display =
                "block";

        } else {

            if (anteprima) {
                anteprima.style.display =
                    "none";
            }

            if (immagine) {
                immagine.src =
                    "";
            }
        }


        document.getElementById(
            "titolo-modifica"
        ).textContent =
            "Modifica defunto";


        document.getElementById(
            "modifica-defunto"
        ).style.display =
            "block";


        aggiornaEtaAdmin();

    }

    catch (errore) {

        console.error(
            errore
        );

        alert(
            "Errore durante il recupero del record."
        );
    }
}


// =====================================================
// SALVATAGGIO ADMIN
// =====================================================

const formDefunto =
    document.getElementById(
        "form-defunto"
    );

if (formDefunto) {

    formDefunto.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();


            const id =
                document.getElementById(
                    "defunto-id"
                ).value;


            aggiornaEtaAdmin();


            // =========================================
            // FORMDATA
            // =========================================

            const dati =
                new FormData();


            dati.append(
                "cognome_nome",
                document.getElementById(
                    "cognome-nome"
                ).value
            );


            dati.append(
                "sesso",
                document.getElementById(
                    "sesso"
                ).value
            );


            dati.append(
                "giorno_mese_decesso",
                document.getElementById(
                    "giorno-mese-decesso"
                ).value
            );


            dati.append(
                "anno_decesso",
                document.getElementById(
                    "anno-decesso"
                ).value
            );


            dati.append(
                "giorno_mese_nascita",
                document.getElementById(
                    "giorno-mese-nascita"
                ).value
            );


            dati.append(
                "anno_nascita",
                document.getElementById(
                    "anno-nascita"
                ).value
            );


            dati.append(
                "posizione_loculo",
                document.getElementById(
                    "posizione-loculo"
                ).value
            );


            dati.append(
                "zona",
                document.getElementById(
                    "zona"
                ).value
            );


            dati.append(
                "via",
                document.getElementById(
                    "via"
                ).value
            );


            dati.append(
                "osservazioni",
                document.getElementById(
                    "osservazioni"
                ).value
            );


            dati.append(
                "note",
                document.getElementById(
                    "note"
                ).value
            );


            dati.append(
                "pubblicato",
                document.getElementById(
                    "pubblicato"
                ).checked
                    ? "1"
                    : "0"
            );


            // =========================================
            // FOTO ADMIN
            // =========================================

            const campoFoto =
                document.getElementById(
                    "foto"
                );


            if (
                campoFoto &&
                campoFoto.files.length > 0
            ) {

                dati.append(
                    "foto",
                    campoFoto.files[0]
                );
            }


            try {

                let risposta;


                if (id) {

                    risposta =
                        await fetch(
                            `${API}/api/admin/defunti/${id}`,
                            {
                                method: "PUT",

                                headers:
                                    headerSoloAutorizzazione(),

                                body:
                                    dati
                            }
                        );

                }

                else {

                    risposta =
                        await fetch(
                            `${API}/api/admin/defunti`,
                            {
                                method: "POST",

                                headers:
                                    headerSoloAutorizzazione(),

                                body:
                                    dati
                            }
                        );
                }


                const risultato =
                    await risposta.json();


                if (!risposta.ok) {

                    document.getElementById(
                        "form-messaggio"
                    ).textContent =
                        risultato.errore ||
                        "Errore durante il salvataggio.";

                    return;
                }


                document.getElementById(
                    "form-messaggio"
                ).textContent =
                    risultato.messaggio ||
                    "Salvataggio completato.";


                await caricaArchivio();


                setTimeout(
                    function () {

                        document.getElementById(
                            "modifica-defunto"
                        ).style.display =
                            "none";

                        document.getElementById(
                            "form-messaggio"
                        ).textContent =
                            "";

                    },
                    700
                );

            }

            catch (errore) {

                console.error(
                    errore
                );

                document.getElementById(
                    "form-messaggio"
                ).textContent =
                    "Errore di collegamento con il server.";
            }
        }
    );
}


// =====================================================
// INSERIMENTO OPERATORE
// =====================================================

const formDefuntoOperatore =
    document.getElementById(
        "form-defunto-operatore"
    );

if (formDefuntoOperatore) {

    formDefuntoOperatore.addEventListener(
        "submit",
        async function (evento) {

            evento.preventDefault();


            const messaggio =
                document.getElementById(
                    "operatore-form-messaggio"
                );


            aggiornaEtaOperatore();


            // =========================================
            // FORMDATA OPERATORE
            // =========================================

            const dati =
                new FormData();


            dati.append(
                "cognome_nome",
                document.getElementById(
                    "operatore-cognome-nome"
                ).value
            );


            dati.append(
                "sesso",
                document.getElementById(
                    "operatore-sesso"
                ).value
            );


            dati.append(
                "giorno_mese_decesso",
                document.getElementById(
                    "operatore-giorno-mese-decesso"
                ).value
            );


            dati.append(
                "anno_decesso",
                document.getElementById(
                    "operatore-anno-decesso"
                ).value
            );


            dati.append(
                "giorno_mese_nascita",
                document.getElementById(
                    "operatore-giorno-mese-nascita"
                ).value
            );


            dati.append(
                "anno_nascita",
                document.getElementById(
                    "operatore-anno-nascita"
                ).value
            );


            dati.append(
                "posizione_loculo",
                document.getElementById(
                    "operatore-posizione-loculo"
                ).value
            );


            dati.append(
                "zona",
                document.getElementById(
                    "operatore-zona"
                ).value
            );


            dati.append(
                "via",
                document.getElementById(
                    "operatore-via"
                ).value
            );


            dati.append(
                "osservazioni",
                document.getElementById(
                    "operatore-osservazioni"
                ).value
            );


            dati.append(
                "note",
                document.getElementById(
                    "operatore-note"
                ).value
            );


            // =========================================
            // FOTO OPERATORE
            // =========================================

            const campoFoto =
                document.getElementById(
                    "operatore-foto"
                );


            if (
                campoFoto &&
                campoFoto.files.length > 0
            ) {

                dati.append(
                    "foto",
                    campoFoto.files[0]
                );
            }


            try {

                const risposta =
                    await fetch(
                        `${API}/api/admin/defunti`,
                        {
                            method: "POST",

                            headers:
                                headerSoloAutorizzazione(),

                            body:
                                dati
                        }
                    );


                const risultato =
                    await risposta.json();


                if (!risposta.ok) {

                    messaggio.textContent =
                        risultato.errore ||
                        "Errore durante l'inserimento.";

                    return;
                }


               mostraAvviso(
                "successo",
                "Inserimento completato",
                (risultato.messaggio ||
                "Defunto inserito correttamente.") +
                " ID assegnato: " +
                risultato.id + "."
                );

                formDefuntoOperatore.reset();


                const anteprima =
                    document.getElementById(
                        "operatore-anteprima-foto"
                    );

                const immagine =
                    document.getElementById(
                        "operatore-anteprima-foto-img"
                    );


                if (anteprima) {

                    anteprima.style.display =
                        "none";
                }


                if (immagine) {

                    immagine.src =
                        "";
                }


                aggiornaEtaOperatore();


                document.getElementById(
                    "operatore-cognome-nome"
                ).focus();

            }

            catch (errore) {

                console.error(
                    errore
                );

                messaggio.textContent =
                    "Errore di collegamento con il server.";
            }
        }
    );
}


// =====================================================
// ELENCO ELIMINATI
// =====================================================

const apriCancellati =
    document.getElementById(
        "apri-cancellati"
    );

if (apriCancellati) {

    apriCancellati.addEventListener(
        "click",
        async function () {

            document.getElementById(
                "finestra-cancellati"
            ).style.display =
                "block";

            await caricaCancellati();
        }
    );
}


// =====================================================
// CHIUDI ELENCO ELIMINATI
// =====================================================

const chiudiCancellati =
    document.getElementById(
        "chiudi-cancellati"
    );

if (chiudiCancellati) {

    chiudiCancellati.addEventListener(
        "click",
        function () {

            document.getElementById(
                "finestra-cancellati"
            ).style.display =
                "none";
        }
    );
}


// =====================================================
// CARICAMENTO ELIMINATI
// =====================================================

async function caricaCancellati() {

    const contenitore =
        document.getElementById(
            "cancellati"
        );

    try {

        const risposta =
            await fetch(
                `${API}/api/admin/defunti-cancellati`,
                {
                    headers:
                        headersAutorizzazione()
                }
            );


        const cancellati =
            await risposta.json();


        if (!risposta.ok) {

            contenitore.innerHTML =
                `<p>${
                    cancellati.errore ||
                    "Errore."
                }</p>`;

            return;
        }


        if (!cancellati.length) {

            contenitore.innerHTML =
                "<p>Non ci sono record eliminati.</p>";

            return;
        }


        let html = `

            <table>

                <thead>

                    <tr>

                        <th>ID cancellazione</th>
                        <th>ID originale</th>
                        <th>Cognome e Nome</th>
                        <th>Data cancellazione</th>
                        <th>Operatore</th>
                        <th>Azione</th>

                    </tr>

                </thead>

                <tbody>

        `;


        cancellati.forEach(
            function (defunto) {

                html += `

                    <tr>

                        <td>
                            ${defunto.id_cancellazione}
                        </td>

                        <td>
                            ${defunto.id_originale}
                        </td>

                        <td>
                            ${defunto.cognome_nome || ""}
                        </td>

                        <td>
                            ${defunto.data_cancellazione || ""}
                        </td>

                        <td>
                            ${defunto.operatore || ""}
                        </td>

                        <td>

                            <button
                                type="button"
                                onclick="ripristinaDefunto(${defunto.id_cancellazione})"
                            >
                                Ripristina
                            </button>

                        </td>

                    </tr>

                `;
            }
        );


        html += `

                </tbody>

            </table>

        `;


        contenitore.innerHTML =
            html;

    }

    catch (errore) {

        console.error(
            errore
        );

        contenitore.innerHTML =
            "<p>Errore durante il caricamento dei record eliminati.</p>";
    }
}


// =====================================================
// RIPRISTINO
// =====================================================

async function ripristinaDefunto(
    idCancellazione
) {

    const conferma =
        confirm(
            "Vuoi ripristinare questo defunto nell'archivio principale?"
        );


    if (!conferma) {
        return;
    }


    try {

        const risposta =
            await fetch(
                `${API}/api/admin/defunti-cancellati/${idCancellazione}/ripristina`,
                {
                    method: "PUT",

                    headers:
                        headersAutorizzazione()
                }
            );


        const risultato =
            await risposta.json();


        if (!risposta.ok) {

            alert(
                risultato.errore ||
                "Errore durante il ripristino."
            );

            return;
        }


        alert(
            risultato.messaggio ||
            "Defunto ripristinato correttamente."
        );


        await caricaCancellati();

        await caricaArchivio();

    }

    catch (errore) {

        console.error(
            errore
        );

        alert(
            "Errore di collegamento con il server."
        );
    }
}


// =====================================================
// ELIMINAZIONE
// =====================================================

async function eliminaDefunto(id) {

    const conferma =
        confirm(
            "Sei sicuro di voler eliminare questo defunto?"
        );


    if (!conferma) {
        return;
    }


    try {

        const risposta =
            await fetch(
                `${API}/api/admin/defunti/${id}`,
                {
                    method: "DELETE",

                    headers:
                        headersAutorizzazione()
                }
            );


        const risultato =
            await risposta.json();


        if (!risposta.ok) {

            alert(
                risultato.errore ||
                "Errore durante l'eliminazione."
            );

            return;
        }


        alert(
            risultato.messaggio ||
            "Defunto eliminato correttamente."
        );


        await caricaArchivio();

    }

    catch (errore) {

        console.error(
            errore
        );

        alert(
            "Errore di collegamento con il server."
        );
    }
}


// =====================================================
// RICHIESTA MODIFICA OPERATORE
// =====================================================

const richiediModifica =
document.getElementById(
"richiedi-modifica"
);

if (richiediModifica) {
    richiediModifica.addEventListener(
        "click",
        function () {

            const oggetto =
                "Richiesta modifica archivio cimiteriale Tarsia";

            const corpo =
                "Ciao,\n\n" +
                "segnalo una modifica da fare nell'archivio " +
                "del cimitero di Tarsia.\n\n" +
                "ID del defunto: \n" +
                "Cognome e Nome: \n\n" +
                "Dato da modificare: \n" +
                "Modifica richiesta: \n\n" +
                "Eventuali note:\n\n" +
                "Grazie.";

            window.location.href =
                "mailto:bianchi.tullio@gmail.com" +
                "?cc=bianchi.a.anna@gmail.com" +
                "&subject=" +
                encodeURIComponent(oggetto) +
                "&body=" +
                encodeURIComponent(corpo);
        }
    );
}

// =====================================================
// LOGOUT
// =====================================================

async function eseguiLogout() {

    const token =
        sessionStorage.getItem(
            "token"
        );


    try {

        await fetch(
            `${API}/api/admin/logout`,
            {
                method: "POST",

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }
            }
        );

    }

    catch (errore) {

        console.error(
            errore
        );
    }


    sessionStorage.removeItem(
        "token"
    );

    sessionStorage.removeItem(
        "ruolo"
    );


    location.reload();
}


// =====================================================
// LOGOUT ADMIN
// =====================================================

const logoutAdmin =
    document.getElementById(
        "logout-admin"
    );

if (logoutAdmin) {

    logoutAdmin.addEventListener(
        "click",
        eseguiLogout
    );
}


// =====================================================
// LOGOUT OPERATORE
// =====================================================

const logoutOperatore =
    document.getElementById(
        "logout-operatore"
    );

if (logoutOperatore) {

    logoutOperatore.addEventListener(
        "click",
        eseguiLogout
    );
}


//
// IMPORTAZIONE MASSIVA NUOVI NOMINATIVI
//

const pulsanteApriImportaNuovi = document.getElementById(
    "apri-importa-nuovi"
);

const riquadroImportaNuovi = document.getElementById(
    "importa-nuovi"
);

const inputFileImportaNuovi = document.getElementById(
    "file-importa-nuovi"
);

const pulsanteAnteprimaImportaNuovi = document.getElementById(
    "anteprima-importa-nuovi"
);

const pulsanteConfermaImportaNuovi = document.getElementById(
    "conferma-importa-nuovi"
);

const pulsanteAnnullaImportaNuovi = document.getElementById(
    "annulla-importa-nuovi"
);

const risultatoImportaNuovi = document.getElementById(
    "risultato-importa-nuovi"
);

let fileImportazionePronto = null;


// ---------------------------------------------------------
// APRI / CHIUDI RIQUADRO
// ---------------------------------------------------------

if (pulsanteApriImportaNuovi) {

    pulsanteApriImportaNuovi.addEventListener(
        "click",
        () => {

            riquadroImportaNuovi.style.display = "block";

            risultatoImportaNuovi.innerHTML = "";

            pulsanteConfermaImportaNuovi.style.display = "none";

            fileImportazionePronto = null;

        }
    );

}


if (pulsanteAnnullaImportaNuovi) {

    pulsanteAnnullaImportaNuovi.addEventListener(
        "click",
        () => {

            riquadroImportaNuovi.style.display = "none";

            inputFileImportaNuovi.value = "";

            risultatoImportaNuovi.innerHTML = "";

            pulsanteConfermaImportaNuovi.style.display = "none";

            fileImportazionePronto = null;

        }
    );

}

// ---------------------------------------------------------
// ANTEPRIMA
// ---------------------------------------------------------

if (pulsanteAnteprimaImportaNuovi) {

    pulsanteAnteprimaImportaNuovi.addEventListener(
        "click",
        async () => {

            riquadroImportaNuovi.style.display = "block";

            const file =
                inputFileImportaNuovi.files[0];


            if (!file) {

                mostraAvviso(
                    "attenzione",
                    "File mancante",
                    "Seleziona prima un file Excel."
                );

                return;
            }


            const formData =
                new FormData();

            formData.append(
                "file",
                file
            );


            risultatoImportaNuovi.innerHTML =
                "<p>Controllo del file in corso...</p>";

            pulsanteAnteprimaImportaNuovi.disabled =
                true;


            try {

                const risposta =
                    await fetch(
                        `${API}/api/admin/importa-nuovi/anteprima`,
                        {
                            method: "POST",

                            headers: {
                                Authorization:
                                    `Bearer ${sessionStorage.getItem("token")}`
                            },

                            body: formData
                        }
                    );


                const dati =
                    await risposta.json();
                    riquadroImportaNuovi.style.display = "block";

                if (!risposta.ok) {

                    throw new Error(
                        dati.errore ||
                        "Errore durante l'anteprima."
                    );
                }


                fileImportazionePronto =
                    dati.file;


                // -------------------------------------------------
                // MOSTRA RIEPILOGO NEL RIQUADRO
                // -------------------------------------------------

                risultatoImportaNuovi.innerHTML = `

                    <div class="anteprima-importazione">

                        <h4>
                            Anteprima importazione
                        </h4>

                        <p>
                            <strong>Foglio:</strong>
                            ${dati.foglio}
                        </p>

                        <p>
                            <strong>Nuovi nominativi:</strong>
                            ${dati.numeroNominativi}
                        </p>

                        <p>
                            <strong>Primo ID assegnato:</strong>
                            ${dati.primoId}
                        </p>

                        <p>
                            <strong>Ultimo ID assegnato:</strong>
                            ${dati.ultimoId}
                        </p>

                        <p>
                            <strong>Attenzione:</strong>
                            nessun dato è stato ancora inserito
                            nel database.
                        </p>

                        <p>
                            I nominativi già presenti
                            non verranno modificati né cancellati.
                        </p>

                    </div>

                `;


                // -------------------------------------------------
                // APRE LA FINESTRA DI CONFERMA
                // -------------------------------------------------

                mostraAvviso(
                    "conferma",
                    "Confermare importazione?",
                    "Saranno aggiunti " +
                    dati.numeroNominativi +
                    " nuovi nominativi. " +
                    "Gli ID assegnati saranno dal " +
                    dati.primoId +
                    " al " +
                    dati.ultimoId +
                    ". I nominativi già presenti non verranno modificati né cancellati.",
                    function () {

                        pulsanteConfermaImportaNuovi.click();

                    }
                );


                pulsanteConfermaImportaNuovi.style.display =
                    "inline-block";


            } catch (errore) {

                console.error(errore);


                risultatoImportaNuovi.innerHTML =
                    `<p>Errore: ${errore.message}</p>`;


                fileImportazionePronto =
                    null;


                mostraAvviso(
                    "errore",
                    "Errore durante l'anteprima",
                    errore.message
                );


            } finally {

                pulsanteAnteprimaImportaNuovi.disabled =
                    false;

            }

        }
    );

}


// ---------------------------------------------------------
// CONFERMA IMPORTAZIONE
// ---------------------------------------------------------

if (pulsanteConfermaImportaNuovi) {

    pulsanteConfermaImportaNuovi.addEventListener(
    "click",
    async (evento) => {

        evento.preventDefault();

            if (!fileImportazionePronto) {

                mostraAvviso(
                    "attenzione",
                    "Anteprima necessaria",
                    "Prima di procedere devi eseguire l'anteprima del file."
                );

                return;
            }


            pulsanteConfermaImportaNuovi.disabled =
                true;


            risultatoImportaNuovi.innerHTML =
                "<p>Importazione in corso...</p>";


            try {

                const risposta =
                    await fetch(
                        `${API}/api/admin/importa-nuovi/conferma`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",

                                Authorization:
                                    `Bearer ${sessionStorage.getItem("token")}`
                            },

                            body: JSON.stringify({
                                file:
                                    fileImportazionePronto
                            })
                        }
                    );


                const dati =
                    await risposta.json();


                if (!risposta.ok) {

                    throw new Error(
                        dati.errore ||
                        "Errore durante l'importazione."
                    );
                }


                // -------------------------------------------------
                // RISULTATO NEL RIQUADRO
                // -------------------------------------------------

                risultatoImportaNuovi.innerHTML = `

                    <div class="importazione-completata">

                        <h4>
                            Importazione completata
                        </h4>

                        <p>
                            Sono stati aggiunti
                            <strong>
                                ${dati.inseriti}
                            </strong>
                            nuovi nominativi.
                        </p>

                        <p>
                            ID assegnati:
                            <strong>
                                ${dati.primoId}
                                -
                                ${dati.ultimoId}
                            </strong>
                        </p>

                        <p>
                            I nominativi già presenti
                            non sono stati modificati.
                        </p>

                    </div>

                `;


                // -------------------------------------------------
                // PULIZIA
                // -------------------------------------------------

                pulsanteConfermaImportaNuovi.style.display =
                    "none";

                inputFileImportaNuovi.value =
                    "";

                fileImportazionePronto =
                    null;


                // -------------------------------------------------
                // AGGIORNA ARCHIVIO
                // -------------------------------------------------

                if (
                    typeof caricaArchivio ===
                    "function"
                ) {

                    caricaArchivio();

                }


                // -------------------------------------------------
                // AVVISO FINALE
                // -------------------------------------------------

                mostraAvviso(
                    "successo",
                    "Importazione completata",
                    "Sono stati aggiunti " +
                    dati.inseriti +
                    " nuovi nominativi. " +
                    "ID assegnati: " +
                    dati.primoId +
                    " - " +
                    dati.ultimoId +
                    "."
                );


            } catch (errore) {

                console.error(
                    errore
                );


                risultatoImportaNuovi.innerHTML =
                    `<p>Errore: ${errore.message}</p>`;


                mostraAvviso(
                    "errore",
                    "Errore durante l'importazione",
                    errore.message
                );


            } finally {

                pulsanteConfermaImportaNuovi.disabled =
                    false;

            }

        }
    );

}



// =====================================================
// SISTEMA AVVISI AREA ADMIN
// =====================================================

const finestraAvviso =
    document.getElementById("finestra-avviso");

const avvisoAdmin =
    document.querySelector(".avviso-admin");

const avvisoIcona =
    document.getElementById("avviso-icona");

const avvisoTitolo =
    document.getElementById("avviso-titolo");

const avvisoMessaggio =
    document.getElementById("avviso-messaggio");

const avvisoConferma =
    document.getElementById("avviso-conferma");

const avvisoAnnulla =
    document.getElementById("avviso-annulla");


let funzioneConfermaAvviso = null;


// -----------------------------------------------------
// APRI AVVISO
// -----------------------------------------------------

function mostraAvviso(
    tipo,
    titolo,
    messaggio,
    funzioneConferma = null
) {

    if (!finestraAvviso) {
        return;
    }

    avvisoAdmin.className =
        "avviso-admin " + tipo;

    avvisoTitolo.textContent =
        titolo;

    avvisoMessaggio.textContent =
        messaggio;

    funzioneConfermaAvviso =
        funzioneConferma;


    // -------------------------------------------------
    // ICONA
    // -------------------------------------------------

    if (tipo === "successo") {

        avvisoIcona.textContent = "✓";

    } else if (tipo === "attenzione") {

        avvisoIcona.textContent = "⚠";

    } else if (tipo === "errore") {

        avvisoIcona.textContent = "×";

    } else if (tipo === "conferma") {

        avvisoIcona.textContent = "✓";

    } else {

        avvisoIcona.textContent = "✓";
    }


    // -------------------------------------------------
    // PULSANTI
    // -------------------------------------------------

    if (funzioneConferma) {

        avvisoConferma.textContent =
            "Conferma";

        avvisoAnnulla.style.display =
            "inline-block";

    } else {

        avvisoConferma.textContent =
            "OK";

        avvisoAnnulla.style.display =
            "none";
    }


    finestraAvviso.style.display =
        "flex";
}


// -----------------------------------------------------
// CHIUDI AVVISO
// -----------------------------------------------------

function chiudiAvviso() {

    if (!finestraAvviso) {
        return;
    }

    finestraAvviso.style.display =
        "none";

    funzioneConfermaAvviso =
        null;
}


// -----------------------------------------------------
// PULSANTE OK / CONFERMA
// -----------------------------------------------------

if (avvisoConferma) {

    avvisoConferma.addEventListener(
        "click",
        function () {

            if (funzioneConfermaAvviso) {

                const funzione =
                    funzioneConfermaAvviso;

                chiudiAvviso();

                funzione();

            } else {

                chiudiAvviso();
            }

        }
    );
}


// -----------------------------------------------------
// PULSANTE ANNULLA
// -----------------------------------------------------

if (avvisoAnnulla) {

    avvisoAnnulla.addEventListener(
        "click",
        function () {

            chiudiAvviso();

        }
    );
}


// -----------------------------------------------------
// CLIC SULLO SFONDO
// -----------------------------------------------------

if (finestraAvviso) {

    finestraAvviso.addEventListener(
        "click",
        function (evento) {

            if (
                evento.target ===
                finestraAvviso
            ) {

                chiudiAvviso();

            }

        }
    );
}

// =====================================================
// ESPORTAZIONE ARCHIVIO IN EXCEL
// SOLO AMMINISTRATORE
// =====================================================

const pulsanteEsportaExcel =
    document.getElementById("esporta-archivio-excel");

if (pulsanteEsportaExcel) {


    pulsanteEsportaExcel.addEventListener(
        "click",
        async function () {

            if (
                sessionStorage.getItem("ruolo") !==
                "admin"
            ) {

                mostraAvviso(
                    "errore",
                    "Accesso non autorizzato",
                    "Questa funzione è disponibile solo per l'amministratore."
                );

                return;
            }

            pulsanteEsportaExcel.disabled =
                true;

            try {

                const risposta =
                    await fetch(
                        `${API}/api/admin/esporta-excel`,
                        {
                            method: "GET",

                            headers: {
                                Authorization:
                                    `Bearer ${sessionStorage.getItem("token")}`
                            }
                        }
                    );

                if (!risposta.ok) {

                    let dati = {};

                    try {
                        dati =
                            await risposta.json();
                    } catch (errore) {
                        // Nessun JSON disponibile
                    }

                    throw new Error(
                        dati.errore ||
                        "Errore durante l'esportazione dell'archivio."
                    );
                }

                const file =
                    await risposta.blob();

                const indirizzo =
                    window.URL.createObjectURL(
                        file
                    );

                const link =
                    document.createElement("a");

                link.href =
                    indirizzo;

                link.download =
                    "Lista_Defunti_Tarsia.xlsx";

                document.body.appendChild(
                    link
                );

                link.click();

                link.remove();

                window.URL.revokeObjectURL(
                    indirizzo
                );

                mostraAvviso(
                    "successo",
                    "Esportazione completata",
                    "L'archivio dei defunti è stato esportato correttamente in formato Excel."
                );

            } catch (errore) {

                console.error(
                    "Errore esportazione Excel:",
                    errore
                );

                mostraAvviso(
                    "errore",
                    "Errore durante l'esportazione",
                    errore.message
                );

            } finally {

                pulsanteEsportaExcel.disabled =
                    false;
            }
        }
    );
}