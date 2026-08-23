const immagine = document.getElementById("planimetria");
const contenitore = document.querySelector(".zoom-container");

let scala = 1;
let origineX = 50;
let origineY = 50;



contenitore.addEventListener("wheel", function(e){

    e.preventDefault();


    const rettangolo = contenitore.getBoundingClientRect();


    origineX = ((e.clientX - rettangolo.left) / rettangolo.width) * 100;

    origineY = ((e.clientY - rettangolo.top) / rettangolo.height) * 100;



    if(e.deltaY < 0){

        scala += 0.15;

    } else {

        scala -= 0.15;

    }



    if(scala < 1){

        scala = 1;

    }


    if(scala > 4){

        scala = 4;

    }



    aggiorna();


});




/* TOUCH MOBILE */


let distanzaIniziale = 0;



contenitore.addEventListener("touchstart", function(e){


    if(e.touches.length === 2){

        distanzaIniziale =
        distanza(e.touches[0], e.touches[1]);

    }


});




contenitore.addEventListener("touchmove", function(e){


    if(e.touches.length === 2){


        e.preventDefault();



        let nuovaDistanza =
        distanza(e.touches[0], e.touches[1]);



        if(nuovaDistanza > distanzaIniziale){

            scala += 0.03;

        } else {

            scala -= 0.03;

        }



        if(scala < 1){

            scala = 1;

        }



        if(scala > 4){

            scala = 4;

        }



        distanzaIniziale = nuovaDistanza;


        aggiorna();

    }


},{passive:false});




function distanza(p1,p2){

return Math.sqrt(

Math.pow(p2.clientX-p1.clientX,2)

+

Math.pow(p2.clientY-p1.clientY,2)

);

}




function aggiorna(){


immagine.style.transformOrigin =
`${origineX}% ${origineY}%`;


immagine.style.transform =
`scale(${scala})`;


}