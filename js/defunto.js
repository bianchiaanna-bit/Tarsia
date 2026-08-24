fetch("dati/defunti.json")

.then(response => response.json())

.then(defunti => {


let parametri = new URLSearchParams(window.location.search);

let id = parametri.get("id");


let persona = defunti[id];


let scheda = document.getElementById("scheda");


// nome corretto

let nomeCompleto = persona["Cognome e Nome"]
.toLowerCase()
.replace(/\b\w/g, letter => letter.toUpperCase());



// funzione creazione scheda

function creaScheda(foto) {


scheda.innerHTML = `


<a href="index.html" class="torna">
← Torna alla ricerca
</a>



<h2>${nomeCompleto}</h2>




<div class="scheda-contenuto">



<div class="dati-defunto">



<p>
Libro Archivio:
${persona["Libro Archivio"] || ""}
</p>



<p>
Sesso:
${persona["Sesso"] === "M" ? "Maschio" : persona["Sesso"] === "F" ? "Femmina" : ""}
</p>



<p>
Nato:
${persona["gg/mm  (Nascita)"] || ""}
${persona["Anno  (Nascita)"] || ""}
</p>



<p>
Deceduto:
${persona["gg/mm  (Decesso)"] || ""}
${persona["Anno  (Decesso)"] || ""}
</p>



<p>
Età:
${persona["Età "] || ""} anni
</p>





<h3 class="titolo-posizione">
Posizione nel cimitero
</h3>




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




<a href="planimetria.html" class="pulsante">
Visualizza posizione sulla mappa
</a>



</div>




<div class="foto-defunto">

${foto}

</div>



</div>



`;



}




// gestione foto


if(persona["Codice Foto"]) {


let percorsoFoto = 
`immagini/foto/${persona["Codice Foto"]}.webp`;



fetch(percorsoFoto)

.then(response => {


if(response.ok){


creaScheda(`


<img 
src="${percorsoFoto}"
alt="${nomeCompleto}">


`);



}else{


creaScheda(`


<div class="foto-mancante">

<img 
src="immagini/angelo-nuvole.webp"
alt="Immagine commemorativa">


<a href="contatti.html" class="scheda-button">

Proponi una fotografia

</a>


</div>


`);


}


})

.catch(() => {


creaScheda(`


<div class="foto-mancante">


<img 
src="immagini/angelo-nuvole.webp"
alt="Immagine commemorativa">



<a href="contatti.html" class="scheda-button">

Proponi una fotografia

</a>



</div>


`);


});



} else {



creaScheda(`


<div class="foto-mancante">


<img 
src="immagini/angelo-nuvole.webp"
alt="Immagine commemorativa">



<a href="contatti.html" class="scheda-button">

Proponi una fotografia

</a>



</div>


`);



}



})


.catch(error => {

console.error("Errore caricamento dati:", error);

});