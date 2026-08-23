let defunti = [];


fetch("dati/defunti.json")
.then(response => response.json())
.then(dati => {

    defunti = dati;

    console.log("Defunti caricati:", defunti.length);

});



function nomeFormattato(nome){

    return nome
    .toLowerCase()
    .replace(/\b\w/g, lettera => lettera.toUpperCase());

}



function cercaDefunto(){


    let testo = document
    .getElementById("cerca")
    .value
    .toLowerCase()
    .trim();



    let risultati = defunti.filter(persona =>

        persona["Cognome e Nome"]
        .toLowerCase()
        .includes(testo)

    );



    let contenitore =
    document.getElementById("risultati");



    contenitore.innerHTML = "";



    if(risultati.length === 0){

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
            ${nomeFormattato(persona["Cognome e Nome"])}
            </h3>



            <p> 
            Deceduto:
            ${persona["Anno  (Decesso)"] || ""}
            </p>


            <p>
            Nato:
            ${persona["Anno  (Nascita)"] || ""}
            </p>


            <p>
            Zona:
            ${persona["Zona "] || ""}
            </p>


            <p>
            Via:
            ${persona["Via"] || ""}
            </p>


            <p>
            Loculo:
            ${persona["Posizione Loculo"] || ""}
            </p>



            <a 
            href="defunto.html?id=${defunti.indexOf(persona)}"
            class="scheda-button">

            Visualizza scheda

            </a>


        </div>


        `;


    });


}
document.getElementById("cerca")
.addEventListener("keypress", function(event){

    if(event.key === "Enter"){

        cercaDefunto();

    }

});