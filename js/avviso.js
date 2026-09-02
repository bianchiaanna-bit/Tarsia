document.addEventListener("DOMContentLoaded", function(){

    const avviso = document.getElementById("avviso-costruzione");
    const chiudi = document.getElementById("chiudi-avviso");

    if(!avviso || !chiudi) return;

    if(sessionStorage.getItem("avvisoChiuso") === "true"){
        avviso.style.display = "none";
    }

    chiudi.addEventListener("click", function(){
        avviso.style.display = "none";
        sessionStorage.setItem("avvisoChiuso", "true");
    });

});