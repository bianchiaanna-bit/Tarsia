function normalizzaZonaCimitero(zona) {
    const testo = String(zona || "")
        .trim()
        .toLowerCase();

    if (testo === "centrale") {
        return "Centrale";
    }

    if (testo === "lato a" || testo === "latoa") {
        return "Lato A";
    }

    if (testo === "lato b" || testo === "latob") {
        return "Lato B";
    }

    return String(zona || "").trim();
}


function determinaViaDaLoculo(zona, posizione) {

    const zonaNormalizzata =
        normalizzaZonaCimitero(zona);

    const loculo =
        String(posizione || "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, " ");

    if (!loculo) {
        return "";
    }


    // ======================================
    // LATO A
    // ======================================

    if (zonaNormalizzata === "Lato A") {

        const speciali = {

            "0a": "via Salerno",
            "0b": "via Reggio C.",
            "0c": "via Reggio C.",

            "23 bis": "via Foggia",
            "24 bis": "via Foggia",

            "38 bis": "via Pisa",

            "44 bis": "via Sassari",

            "56 bis": "via Reggio C.",

            "61 bis": "via Como",

            "67 bis": "via Reggio C.",

            "74 bis": "via Salerno"

        };

        if (speciali[loculo]) {
            return speciali[loculo];
        }

        const numero = Number(loculo);

        if (!Number.isNaN(numero)) {

            if (numero >= 1 && numero <= 18) {
                return "via Reggio C.";
            }

            if (numero >= 19 && numero <= 29) {
                return "via Foggia";
            }

            if (numero >= 30 && numero <= 37) {
                return "via Salerno";
            }

            if (numero >= 38 && numero <= 40) {
                return "via Pisa";
            }

            if (numero >= 41 && numero <= 44) {
                return "via Sassari";
            }

            if (numero === 45) {
                return "via Reggio C.";
            }

            if (numero >= 46 && numero <= 51) {
                return "via Sassari";
            }

            if (numero >= 52 && numero <= 54) {
                return "via Ragusa";
            }

            if (numero === 55) {
                return "via Foggia";
            }

            if (numero >= 56 && numero <= 60) {
                return "via Ragusa";
            }

            if (numero >= 61 && numero <= 73) {
                return "via Como";
            }

            if (numero >= 74 && numero <= 79) {
                return "via Salerno";
            }
        }
    }


    // ======================================
    // LATO B
    // ======================================

    if (zonaNormalizzata === "Lato B") {

        const speciali = {

            "80 bis": "via Brescia",

            "112 bis": "via Bergamo",

            "117 bis": "via Bergamo",

            "169 bis": "via Catania"

        };

        if (speciali[loculo]) {
            return speciali[loculo];
        }

        const numero = Number(loculo);

        if (!Number.isNaN(numero)) {

            if (numero >= 80 && numero <= 97) {
                return "via Brescia";
            }

            if (numero >= 98 && numero <= 112) {
                return "via Ferrara";
            }

            if (numero >= 113 && numero <= 127) {
                return "via Bergamo";
            }

            if (numero >= 128 && numero <= 130) {
                return "via Catania";
            }

            if (numero >= 131 && numero <= 136) {
                return "via Ferrara";
            }

            if (numero >= 137 && numero <= 144) {
                return "via Enna";
            }

            if (numero >= 145 && numero <= 152) {
                return "via Varese";
            }

            if (numero >= 153 && numero <= 160) {
                return "via Belluno";
            }

            if (numero >= 161 && numero <= 168) {
                return "via Ancona";
            }

            if (numero >= 169 && numero <= 170) {
                return "via Catania";
            }
        }
    }


    // ======================================
    // CENTRALE
    // ======================================

    if (zonaNormalizzata === "Centrale") {

        const speciali = {

            "5 bis": "via Napoli",

            "9a": "via Napoli",
            "9b": "via Napoli",
            "9c": "via Napoli",

            "42 bis": "via Milano",

            "300 bis": "via Genova",

            "327 bis": "via Bari"

        };

        if (speciali[loculo]) {
            return speciali[loculo];
        }


        // 365 Centrale è ambiguo.
        if (loculo === "365") {
            return "";
        }


        const numero = Number(loculo);

        if (!Number.isNaN(numero)) {

            if (numero >= 1 && numero <= 9) {
                return "via Napoli";
            }

            if (numero >= 10 && numero <= 23) {
                return "via Cagliari";
            }

            if (numero >= 24 && numero <= 38) {
                return "via Firenze";
            }

            if (numero >= 39 && numero <= 41) {
                return "via Roma";
            }

            if (numero === 42) {
                return "via Milano";
            }

            if (numero >= 43 && numero <= 47) {
                return "via Roma";
            }

            if (numero >= 48 && numero <= 60) {
                return "via Napoli";
            }

            if (numero >= 61 && numero <= 71) {
                return "via Cagliari";
            }

            if (numero >= 72 && numero <= 74) {
                return "via Milano";
            }

            if (numero >= 75 && numero <= 93) {
                return "via Messina";
            }

            if (numero >= 94 && numero <= 96) {
                return "via Milano";
            }

            if (numero >= 97 && numero <= 106) {
                return "via Trento";
            }

            if (numero === 107) {
                return "via Napoli";
            }

            if (numero >= 108 && numero <= 115) {
                return "via Trento";
            }

            if (numero >= 116 && numero <= 118) {
                return "via Milano";
            }

            if (numero >= 119 && numero <= 126) {
                return "via Padova";
            }

            if (numero >= 127 && numero <= 135) {
                return "via Milano";
            }

            if (numero >= 136 && numero <= 156) {
                return "via Bologna";
            }

            if (numero >= 157 && numero <= 169) {
                return "via Arezzo";
            }

            if (numero >= 170 && numero <= 185) {
                return "via Firenze";
            }

            if (numero >= 186 && numero <= 187) {
                return "via Roma";
            }

            if (numero >= 188 && numero <= 197) {
                return "via Verona";
            }

            if (numero >= 198 && numero <= 215) {
                return "via Cosenza";
            }

            if (numero >= 216 && numero <= 225) {
                return "via Venezia";
            }

            if (numero >= 226 && numero <= 230) {
                return "via Roma";
            }

            if (numero >= 231 && numero <= 264) {
                return "via Torino";
            }

            if (numero >= 265 && numero <= 267) {
                return "via Roma";
            }

            if (numero >= 268 && numero <= 283) {
                return "via Genova";
            }

            if (numero === 284) {
                return "via Cosenza";
            }

            if (numero >= 285 && numero <= 294) {
                return "via Genova";
            }

            if (numero >= 295 && numero <= 298) {
                return "via Roma";
            }

            if (numero >= 299 && numero <= 312) {
                return "via Aosta";
            }

            if (numero >= 313 && numero <= 316) {
                return "via Roma";
            }

            if (numero >= 317 && numero <= 333) {
                return "via Bari";
            }

            if (numero === 334) {
                return "via Roma";
            }

            if (numero >= 335 && numero <= 343) {
                return "via Verona";
            }

            if (numero >= 344 && numero <= 351) {
                return "via Cosenza";
            }

            if (numero >= 352 && numero <= 365) {
                return "via Venezia";
            }

            if (numero === 366) {
                return "via Aosta";
            }
        }
    }


    return "";
}
