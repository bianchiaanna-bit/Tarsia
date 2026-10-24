const API = "https://cimitero-worker.cimiteroditarsia.workers.dev";

// Foto da rimuovere durante la modifica del defunto
let rimuoviFotoRichiesta = false;

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

// =========================================================
// MAPPATURA LOCULO + ZONA → VIA
// =========================================================

const MAPPATURA_LOCULI_VIE = {

    "Lato A": {
        "1": "via Reggio C.",
        "2": "via Reggio C.",
        "3": "via Reggio C.",
        "4": "via Reggio C.",
        "5": "via Reggio C.",
        "6": "via Reggio C.",
        "7": "via Reggio C.",
        "8": "via Reggio C.",
        "9": "via Reggio C.",
        "10": "via Reggio C.",
        "11": "via Reggio C.",
        "12": "via Reggio C.",
        "13": "via Reggio C.",
        "14": "via Reggio C.",
        "15": "via Reggio C.",
        "16": "via Reggio C.",
        "17": "via Reggio C.",
        "18": "via Reggio C.",

        "19": "via Foggia",
        "20": "via Foggia",
        "21": "via Foggia",
        "22": "via Foggia",
        "23": "via Foggia",
        "23 BIS": "via Foggia",
        "24": "via Foggia",
        "24 BIS": "via Foggia",
        "25": "via Foggia",
        "26": "via Foggia",
        "27": "via Foggia",
        "28": "via Foggia",
        "29": "via Foggia",

        "30": "via Salerno",
        "31": "via Salerno",
        "32": "via Salerno",
        "33": "via Salerno",
        "34": "via Salerno",
        "35": "via Salerno",
        "36": "via Salerno",
        "37": "via Salerno",

        "38": "via Pisa",
        "38 BIS": "via Pisa",
        "39": "via Pisa",
        "40": "via Pisa",

        "41": "via Sassari",
        "42": "via Sassari",
        "43": "via Sassari",
        "44": "via Sassari",
        "44 BIS": "via Sassari",

        "45": "via Reggio C.",

        "46": "via Sassari",
        "47": "via Sassari",
        "48": "via Sassari",
        "49": "via Sassari",
        "50": "via Sassari",
        "51": "via Sassari",

        "52": "via Ragusa",
        "53": "via Ragusa",
        "54": "via Ragusa",

        "55": "via Foggia",

        "56": "via Ragusa",
        "56 BIS": "via Reggio C.",
        "57": "via Ragusa",
        "58": "via Ragusa",
        "59": "via Ragusa",
        "60": "via Ragusa",

        "61": "via Como",
        "61 BIS": "via Como",
        "62": "via Como",
        "63": "via Como",
        "64": "via Como",
        "65": "via Como",
        "66": "via Como",
        "67": "via Reggio C.",
        "67 BIS": "via Reggio C.",
        "68": "via Como",
        "69": "via Como",
        "70": "via Como",
        "71": "via Como",
        "72": "via Como",
        "73": "via Como",

        "74": "via Salerno",
        "74 BIS": "via Salerno",
        "75": "via Salerno",
        "76": "via Salerno",
        "77": "via Salerno",
        "78": "via Salerno",
        "79": "via Salerno",

        "0A": "via Salerno",
        "0B": "via Reggio C.",
        "0C": "via Reggio C."
    },

    "Lato B": {
        "80": "via Brescia",
        "80 BIS": "via Brescia",
        "81": "via Brescia",
        "82": "via Brescia",
        "83": "via Brescia",
        "84": "via Brescia",
        "85": "via Brescia",
        "86": "via Brescia",
        "87": "via Brescia",
        "88": "via Brescia",
        "89": "via Brescia",
        "90": "via Brescia",
        "91": "via Brescia",
        "92": "via Brescia",
        "93": "via Brescia",
        "94": "via Brescia",
        "95": "via Brescia",
        "96": "via Brescia",
        "97": "via Brescia",

        "98": "via Ferrara",
        "99": "via Ferrara",
        "100": "via Ferrara",
        "101": "via Ferrara",
        "102": "via Ferrara",
        "103": "via Ferrara",
        "104": "via Ferrara",
        "105": "via Ferrara",
        "106": "via Ferrara",
        "107": "via Ferrara",
        "108": "via Ferrara",
        "109": "via Ferrara",
        "110": "via Ferrara",
        "111": "via Ferrara",
        "112": "via Ferrara",

        "112 BIS": "via Bergamo",

        "113": "via Bergamo",
        "114": "via Bergamo",
        "115": "via Bergamo",
        "116": "via Bergamo",
        "117": "via Bergamo",
        "117 BIS": "via Bergamo",
        "118": "via Bergamo",
        "119": "via Bergamo",
        "120": "via Bergamo",
        "121": "via Bergamo",
        "122": "via Bergamo",
        "123": "via Bergamo",
        "124": "via Bergamo",
        "125": "via Bergamo",
        "126": "via Bergamo",
        "127": "via Bergamo",

        "128": "via Catania",
        "129": "via Catania",
        "130": "via Catania",

        "131": "via Ferrara",
        "132": "via Ferrara",
        "133": "via Ferrara",
        "134": "via Ferrara",
        "135": "via Ferrara",
        "136": "via Ferrara",

        "137": "via Enna",
        "138": "via Enna",
        "139": "via Enna",
        "140": "via Enna",
        "141": "via Enna",
        "142": "via Enna",
        "143": "via Enna",
        "144": "via Enna",

        "145": "via Varese",
        "146": "via Varese",
        "147": "via Varese",
        "148": "via Varese",
        "149": "via Varese",
        "150": "via Varese",
        "151": "via Varese",
        "152": "via Varese",

        "153": "via Belluno",
        "154": "via Belluno",
        "155": "via Belluno",
        "156": "via Belluno",
        "157": "via Belluno",
        "158": "via Belluno",
        "159": "via Belluno",
        "160": "via Belluno",

        "161": "via Ancona",
        "162": "via Ancona",
        "163": "via Ancona",
        "164": "via Ancona",
        "165": "via Ancona",
        "166": "via Ancona",
        "167": "via Ancona",
        "168": "via Ancona",

        "169": "via Catania",
        "169 BIS": "via Catania",
        "170": "via Catania"
    },

    "Centrale": {
        "1": "via Napoli",
        "2": "via Napoli",
        "3": "via Napoli",
        "4": "via Napoli",
        "5": "via Napoli",
        "5 BIS": "via Napoli",
        "6": "via Napoli",
        "7": "via Napoli",
        "8": "via Napoli",
        "9": "via Napoli",
        "9A": "via Napoli",
        "9B": "via Napoli",
        "9C": "via Napoli",

        "10": "via Cagliari",
        "11": "via Cagliari",
        "12": "via Cagliari",
        "13": "via Cagliari",
        "14": "via Cagliari",
        "15": "via Cagliari",
        "16": "via Cagliari",
        "17": "via Cagliari",
        "18": "via Cagliari",
        "19": "via Cagliari",
        "20": "via Cagliari",
        "21": "via Cagliari",
        "22": "via Cagliari",
        "23": "via Cagliari",

        "24": "via Firenze",
        "25": "via Firenze",
        "26": "via Firenze",
        "27": "via Firenze",
        "28": "via Firenze",
        "29": "via Firenze",
        "30": "via Firenze",
        "31": "via Firenze",
        "32": "via Firenze",
        "33": "via Firenze",
        "34": "via Firenze",
        "35": "via Firenze",
        "36": "via Firenze",
        "37": "via Firenze",
        "38": "via Firenze",

        "39": "via Roma",
        "40": "via Roma",
        "41": "via Roma",

        "42": "via Milano",
        "42 BIS": "via Milano",

        "43": "via Roma",
        "44": "via Roma",
        "45": "via Roma",
        "46": "via Roma",
        "47": "via Roma",

        "48": "via Napoli",
        "49": "via Napoli",
        "50": "via Napoli",
        "51": "via Napoli",
        "52": "via Napoli",
        "53": "via Napoli",
        "54": "via Napoli",
        "55": "via Napoli",
        "56": "via Napoli",
        "57": "via Napoli",
        "58": "via Napoli",
        "59": "via Napoli",
        "60": "via Napoli",

        "61": "via Cagliari",
        "62": "via Cagliari",
        "63": "via Cagliari",
        "64": "via Cagliari",
        "65": "via Cagliari",
        "66": "via Cagliari",
        "67": "via Cagliari",
        "68": "via Cagliari",
        "69": "via Cagliari",
        "70": "via Cagliari",
        "71": "via Cagliari",

        "72": "via Milano",
        "73": "via Milano",
        "74": "via Milano",

        "75": "via Messina",
        "76": "via Messina",
        "77": "via Messina",
        "78": "via Messina",
        "79": "via Messina",
        "80": "via Messina",
        "81": "via Messina",
        "82": "via Messina",
        "83": "via Messina",
        "84": "via Messina",
        "85": "via Messina",
        "86": "via Messina",
        "87": "via Messina",
        "88": "via Messina",
        "89": "via Messina",
        "90": "via Messina",
        "91": "via Messina",
        "92": "via Messina",
        "93": "via Messina",

        "94": "via Milano",
        "95": "via Milano",
        "96": "via Milano",

        "97": "via Trento",
        "98": "via Trento",
        "99": "via Trento",
        "100": "via Trento",
        "101": "via Trento",
        "102": "via Trento",
        "103": "via Trento",
        "104": "via Trento",
        "105": "via Trento",
        "106": "via Trento",

        "107": "via Napoli",

        "108": "via Trento",
        "109": "via Trento",
        "110": "via Trento",
        "111": "via Trento",
        "112": "via Trento",
        "113": "via Trento",
        "114": "via Trento",
        "115": "via Trento",

        "116": "via Milano",
        "117": "via Milano",
        "118": "via Milano",

        "119": "via Padova",
        "120": "via Padova",
        "121": "via Padova",
        "122": "via Padova",
        "123": "via Padova",
        "124": "via Padova",
        "125": "via Padova",
        "126": "via Padova",

        "127": "via Milano",
        "128": "via Milano",
        "129": "via Milano",
        "130": "via Milano",
        "131": "via Milano",
        "132": "via Milano",
        "133": "via Milano",
        "134": "via Milano",
        "135": "via Milano",

        "136": "via Bologna",
        "137": "via Bologna",
        "138": "via Bologna",
        "139": "via Bologna",
        "140": "via Bologna",
        "141": "via Bologna",
        "142": "via Bologna",
        "143": "via Bologna",
        "144": "via Bologna",
        "145": "via Bologna",
        "146": "via Bologna",
        "147": "via Bologna",
        "148": "via Bologna",
        "149": "via Bologna",
        "150": "via Bologna",
        "151": "via Bologna",
        "152": "via Bologna",
        "153": "via Bologna",
        "154": "via Bologna",
        "155": "via Bologna",
        "156": "via Bologna",

        "157": "via Arezzo",
        "158": "via Arezzo",
        "159": "via Arezzo",
        "160": "via Arezzo",
        "161": "via Arezzo",
        "162": "via Arezzo",
        "163": "via Arezzo",
        "164": "via Arezzo",
        "165": "via Arezzo",
        "166": "via Arezzo",
        "167": "via Arezzo",
        "168": "via Arezzo",
        "169": "via Arezzo",

        "170": "via Firenze",
        "171": "via Firenze",
        "172": "via Firenze",
        "173": "via Firenze",
        "174": "via Firenze",
        "175": "via Firenze",
        "176": "via Firenze",
        "177": "via Firenze",
        "178": "via Firenze",
        "179": "via Firenze",
        "180": "via Firenze",
        "181": "via Firenze",
        "182": "via Firenze",
        "183": "via Firenze",
        "184": "via Firenze",
        "185": "via Firenze",

        "186": "via Roma",
        "187": "via Roma",

        "188": "via Verona",
        "189": "via Verona",
        "190": "via Verona",
        "191": "via Verona",
        "192": "via Verona",
        "193": "via Verona",
        "194": "via Verona",
        "195": "via Verona",
        "196": "via Verona",
        "197": "via Verona",

        "198": "via Cosenza",
        "199": "via Cosenza",
        "200": "via Cosenza",
        "201": "via Cosenza",
        "202": "via Cosenza",
        "203": "via Cosenza",
        "204": "via Cosenza",
        "205": "via Cosenza",
        "206": "via Cosenza",
        "207": "via Cosenza",
        "208": "via Cosenza",
        "209": "via Cosenza",
        "210": "via Cosenza",
        "211": "via Cosenza",
        "212": "via Cosenza",
        "213": "via Cosenza",
        "214": "via Cosenza",
        "215": "via Cosenza",

        "216": "via Venezia",
        "217": "via Venezia",
        "218": "via Venezia",
        "219": "via Venezia",
        "220": "via Venezia",
        "221": "via Venezia",
        "222": "via Venezia",
        "223": "via Venezia",
        "224": "via Venezia",
        "225": "via Venezia",

        "226": "via Roma",
        "227": "via Roma",
        "228": "via Roma",
        "229": "via Roma",
        "230": "via Roma",

        "231": "via Torino",
        "232": "via Torino",
        "233": "via Torino",
        "234": "via Torino",
        "235": "via Torino",
        "236": "via Torino",
        "237": "via Torino",
        "238": "via Torino",
        "239": "via Torino",
        "240": "via Torino",
        "241": "via Torino",
        "242": "via Torino",
        "243": "via Torino",
        "244": "via Torino",
        "245": "via Torino",
        "246": "via Torino",
        "247": "via Torino",
        "248": "via Torino",
        "249": "via Torino",
        "250": "",
        "251": "via Torino",
        "252": "via Torino",
        "253": "via Torino",
        "254": "via Torino",
        "255": "via Torino",
        "256": "via Torino",
        "257": "via Torino",
        "258": "via Torino",
        "259": "via Torino",
        "260": "via Torino",
        "261": "via Torino",
        "262": "via Torino",
        "263": "via Torino",
        "264": "via Torino",

        "265": "via Roma",
        "266": "via Roma",
        "267": "via Roma",

        "268": "via Genova",
        "269": "via Genova",
        "270": "via Genova",
        "271": "via Genova",
        "272": "via Genova",
        "273": "via Genova",
        "274": "via Genova",
        "275": "via Genova",
        "276": "via Genova",
        "277": "via Genova",
        "278": "via Genova",
        "279": "via Genova",
        "280": "via Genova",
        "281": "via Genova",
        "282": "via Genova",
        "283": "via Genova",

        "284": "via Cosenza",

        "285": "via Genova",
        "286": "via Genova",
        "287": "via Genova",
        "288": "via Genova",
        "289": "via Genova",
        "290": "via Genova",
        "291": "via Genova",
        "292": "via Genova",
        "293": "via Genova",
        "294": "via Genova",

        "295": "via Roma",
        "296": "via Roma",
        "297": "via Roma",
        "298": "via Roma",

        "299": "via Aosta",
        "300": "via Aosta",
        "300 BIS": "via Genova",
        "301": "via Aosta",
        "302": "via Aosta",
        "303": "via Aosta",
        "304": "via Aosta",
        "305": "via Aosta",
        "306": "via Aosta",
        "307": "via Aosta",
        "308": "via Aosta",
        "309": "via Aosta",
        "310": "via Aosta",
        "311": "via Aosta",
        "312": "via Aosta",

        "313": "via Roma",
        "314": "via Roma",
        "315": "via Roma",
        "316": "via Roma",

        "317": "via Bari",
        "318": "via Bari",
        "319": "via Bari",
        "320": "via Bari",
        "321": "via Bari",
        "322": "via Bari",
        "323": "via Bari",
        "324": "via Bari",
        "325": "via Bari",
        "326": "via Bari",
        "327": "via Bari",
        "327 BIS": "via Bari",
        "328": "via Bari",
        "329": "via Bari",
        "330": "via Bari",
        "331": "via Bari",
        "332": "via Bari",
        "333": "via Bari",

        "334": "via Roma",

        "335": "via Verona",
        "336": "via Verona",
        "337": "via Verona",
        "338": "via Verona",
        "339": "via Verona",
        "340": "via Verona",
        "341": "via Verona",
        "342": "via Verona",
        "343": "via Verona",

        "344": "via Cosenza",
        "345": "via Cosenza",
        "346": "via Cosenza",
        "347": "via Cosenza",
        "348": "via Cosenza",
        "349": "via Cosenza",
        "350": "via Cosenza",
        "351": "via Cosenza",

        "352": "via Venezia",
        "353": "via Venezia",
        "354": "via Venezia",
        "355": "via Venezia",
        "356": "via Venezia",
        "357": "via Venezia",
        "358": "via Venezia",
        "359": "via Venezia",
        "360": "via Venezia",
        "361": "via Venezia",
        "362": "via Venezia",
        "363": "via Venezia",
        "364": "via Venezia",
        "365": ["via Venezia", "via Palermo"],
        "366": "via Aosta"
    }
};


// =========================================================
// NORMALIZZAZIONE LOCULO
// =========================================================

function normalizzaLoculo(valore) {
    return String(valore || "")
        .trim()
        .toUpperCase()
        .replace(/\s+/g, " ");
}


// =========================================================
// AGGIORNAMENTO AUTOMATICO DELLA VIA
// =========================================================

function aggiornaViaDaLoculo(zonaId, loculoId, viaId) {

    const zona = document.getElementById(zonaId);
    const loculo = document.getElementById(loculoId);
    const via = document.getElementById(viaId);

    if (!zona || !loculo || !via) {
        return;
    }

    const zonaValore = zona.value.trim();
    const loculoValore = normalizzaLoculo(loculo.value);

    if (!zonaValore || !loculoValore) {
        return;
    }

    const mappaZona = MAPPATURA_LOCULI_VIE[zonaValore];

    if (!mappaZona) {
        return;
    }

    const risultato = mappaZona[loculoValore];

    // Nessuna corrispondenza
    if (risultato === undefined) {
        return;
    }

    // Loculo senza via
    if (risultato === "") {
        via.value = "";
        return;
    }

    // Più vie possibili: lascia scegliere manualmente
    if (Array.isArray(risultato)) {
        return;
    }

    // Corrispondenza unica
    via.value = risultato;
}


// =========================================================
// COLLEGAMENTO AUTOMATICO DEI CAMPI
// =========================================================

function inizializzaMappaturaLoculi() {

    const configurazioni = [
        {
            zona: "zona",
            loculo: "posizione-loculo",
            via: "via"
        },
        {
            zona: "operatore-zona",
            loculo: "operatore-posizione-loculo",
            via: "operatore-via"
        }
    ];

    configurazioni.forEach(config => {

        const zona = document.getElementById(config.zona);
        const loculo = document.getElementById(config.loculo);

        if (!zona || !loculo) {
            return;
        }

        zona.addEventListener("change", () => {
            aggiornaViaDaLoculo(
                config.zona,
                config.loculo,
                config.via
            );
        });

        loculo.addEventListener("change", () => {
            aggiornaViaDaLoculo(
                config.zona,
                config.loculo,
                config.via
            );
        });

        loculo.addEventListener("blur", () => {
            aggiornaViaDaLoculo(
                config.zona,
                config.loculo,
                config.via
            );
        });
    });
}


// Avvio automatico
document.addEventListener("DOMContentLoaded", () => {
    inizializzaMappaturaLoculi();
});
    
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
// RIMOZIONE FOTO ADMIN
// =====================================================

const pulsanteRimuoviFoto =
    document.getElementById("rimuovi-foto");

if (pulsanteRimuoviFoto) {

    pulsanteRimuoviFoto.addEventListener(
        "click",
        function () {

            mostraAvviso(
                "conferma",
                "Rimuovere la fotografia?",
                "La fotografia verrà rimossa dalla scheda del defunto.",
                function () {

                    rimuoviFotoRichiesta = true;

                    pulsanteRimuoviFoto.style.display =
                        "none";

                    const anteprima =
                        document.getElementById(
                            "anteprima-foto"
                        );

                    const immagine =
                        document.getElementById(
                            "anteprima-foto-img"
                        );

                    const nomeFotoAttuale =
                        document.getElementById(
                            "nome-foto-attuale"
                        );

                    if (anteprima) {
                        anteprima.style.display =
                            "none";
                    }

                    if (immagine) {
                        immagine.src = "";
                    }

                    if (nomeFotoAttuale) {
                        nomeFotoAttuale.textContent =
                            "";

                        nomeFotoAttuale.style.display =
                            "none";
                    }

                }
            );

        }
    );
}


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
                    type="text"
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
                            : "0.5";
                }
            }
        );
    }


    if (pulsanteCancella) {

        pulsanteCancella.style.opacity =
            "0.5";

        pulsanteCancella.addEventListener(
            "click",
            function () {

                campoRicerca.value =
                    "";

                applicaRicercaArchivio();

                campoRicerca.focus();

                pulsanteCancella.style.opacity =
                    "0.5";
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

            const pulsanteRimuoviFoto =
                document.getElementById(
                    "rimuovi-foto"
                );

            const nomeFotoAttuale =
                document.getElementById(
                    "nome-foto-attuale"
                );

            rimuoviFotoRichiesta =
                false;

            if (anteprima) {
                anteprima.style.display =
                    "none";
            }

            if (immagine) {
                immagine.src =
                    "";
            }

            if (pulsanteRimuoviFoto) {
                pulsanteRimuoviFoto.style.display =
                    "none";
            }

            if (nomeFotoAttuale) {
                nomeFotoAttuale.textContent =
                    "";

                nomeFotoAttuale.style.display =
                    "none";
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
// CHIUDI MODIFICA DEFUNTO
// =====================================================

const pulsanteChiudiModifica =
    document.getElementById(
        "chiudi-modifica"
    );

if (pulsanteChiudiModifica) {

    pulsanteChiudiModifica.addEventListener(
        "click",
        function () {

            document.getElementById(
                "modifica-defunto"
            ).style.display =
                "none";

            document.getElementById(
                "form-messaggio"
            ).textContent =
                "";

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


        // =============================================
        // ZONA
        // =============================================

        const zonaNormalizzata =
            normalizzaZonaCimitero(
                defunto.zona
            );

        document.getElementById(
            "zona"
        ).value =
            zonaNormalizzata;


        // =============================================
        // VIA
        // =============================================

        let viaDaMostrare =
            defunto.via || "";


        // Se la Via non è presente nel database,
        // viene suggerita in base a Zona + Loculo.
        if (!viaDaMostrare) {

            viaDaMostrare =
                determinaViaDaLoculo(
                    zonaNormalizzata,
                    defunto.posizione_loculo
                );
        }


        document.getElementById(
            "via"
        ).value =
            viaDaMostrare;


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

        const pulsanteRimuoviFoto =
            document.getElementById(
                "rimuovi-foto"
            );

        const nomeFotoAttuale =
            document.getElementById(
                "nome-foto-attuale"
            );


        if (campoFoto) {
            campoFoto.value =
                "";
        }

        rimuoviFotoRichiesta =
            false;


        if (
            defunto.foto &&
            anteprima &&
            immagine
        ) {

            immagine.src =
                `${API}${defunto.foto}`;

            anteprima.style.display =
                "block";

            if (pulsanteRimuoviFoto) {
                pulsanteRimuoviFoto.style.display =
                    "inline-block";
            }

            if (nomeFotoAttuale) {
                nomeFotoAttuale.textContent =
                    "Foto attuale: " +
                    defunto.foto
                        .split("/")
                        .pop();

                nomeFotoAttuale.style.display =
                    "block";
            }

        } else {

            if (anteprima) {
                anteprima.style.display =
                    "none";
            }

            if (immagine) {
                immagine.src =
                    "";
            }

            if (pulsanteRimuoviFoto) {
                pulsanteRimuoviFoto.style.display =
                    "none";
            }

            if (nomeFotoAttuale) {
                nomeFotoAttuale.textContent =
                    "";

                nomeFotoAttuale.style.display =
                    "none";
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


            if (
                id &&
                rimuoviFotoRichiesta
            ) {

                dati.append(
                    "rimuovi_foto",
                    "1"
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

    mostraAvviso(
        "conferma",
        "Ripristinare il defunto?",
        "Il record verrà reinserito nell'archivio principale.",
        async function () {

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

                    mostraAvviso(
                        "errore",
                        "Errore",
                        risultato.errore ||
                        "Errore durante il ripristino."
                    );

                    return;
                }


                await caricaCancellati();

                await caricaArchivio();


                mostraAvviso(
                    "successo",
                    "Ripristino completato",
                    risultato.messaggio ||
                    "Il defunto è stato ripristinato correttamente."
                );

            }

            catch (errore) {

                console.error(errore);

                mostraAvviso(
                    "errore",
                    "Errore di collegamento",
                    "Non è stato possibile completare il ripristino."
                );
            }
        }
    );
}


// =====================================================
// ELIMINAZIONE
// =====================================================

async function eliminaDefunto(id) {

    mostraAvviso(
        "conferma",
        "Eliminare il defunto?",
        "Il record verrà spostato nell'elenco dei defunti eliminati e potrà essere ripristinato.",
        async function () {

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

                    mostraAvviso(
                        "errore",
                        "Errore",
                        risultato.errore ||
                        "Errore durante l'eliminazione."
                    );

                    return;
                }


                await caricaArchivio();


                mostraAvviso(
                    "successo",
                    "Eliminazione completata",
                    risultato.messaggio ||
                    "Il defunto è stato eliminato correttamente."
                );

            }

            catch (errore) {

                console.error(errore);

                mostraAvviso(
                    "errore",
                    "Errore di collegamento",
                    "Non è stato possibile completare l'eliminazione."
                );
            }
        }
    );
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


                if (!risposta.ok) {

                    throw new Error(
                        dati.errore ||
                        "Errore durante l'anteprima."
                    );
                }


                // -------------------------------------------------
                // CONSERVA IL FILE ORIGINALE
                // -------------------------------------------------

                fileImportazionePronto =
                    file;


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

                // -------------------------------------------------
                // INVIA NUOVAMENTE IL FILE AL WORKER
                // -------------------------------------------------

                const formData =
                    new FormData();

                formData.append(
                    "file",
                    fileImportazionePronto
                );


                const risposta =
                    await fetch(
                        `${API}/api/admin/importa-nuovi/conferma`,
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

                    await caricaArchivio();

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

                console.error(errore);


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