window.onload = function () {

    letöltés();

}


var kérdések;
var kérdésSzáma;

function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
        );
}

function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésMegjelenítés(0);
    kérdésSzáma = 0;
}

function kérdésMegjelenítés(kérdés) {

    let ide_kerdes = document.getElementById("kérdés_szöveg");
    ide_kerdes.innerHTML = kérdések.teszt[kérdés].questionText;

    document.getElementById("válasz1").innerHTML = kérdések.teszt[kérdés].answer1;
    document.getElementById("válasz2").innerHTML = kérdések.teszt[kérdés].answer2;
    document.getElementById("válasz3").innerHTML = kérdések.teszt[kérdés].answer3;

    document.getElementById("válasz1").style.backgroundColor = "white";
    document.getElementById("válasz2").style.backgroundColor = "white";
    document.getElementById("válasz3").style.backgroundColor = "white";

    document.getElementById("válasz1").style.color = "black";
    document.getElementById("válasz2").style.color = "black";
    document.getElementById("válasz3").style.color = "black";

    let kep = document.getElementById("kép1");

    /*kérdés_szöveg.innerHTML = kérdések[kérdés.innertext].questionText*/
    kep.src = "https://szoft1.comeback.hu/hajo/" + kérdések.teszt[kérdés].image;
   /* for (var i = 1; i < 4; i++) {
        let elem_kerdes = document.getElementById("válasz" + i);
        elem_kerdes.innerHTML = kérdések[kérdés]["válasz" + i];


    }*/
    
}

function visszaLépés() {
    if (kérdésSzáma > 0) {
        kérdésSzáma--;
        kérdésMegjelenítés(kérdésSzáma);
    }
    else {
        kérdésSzáma = kérdések.teszt.length - 1;
        kérdésMegjelenítés(kérdésSzáma);
    }


}

function előreLépés() {
    if (kérdésSzáma < kérdések.teszt.length-1) {
        kérdésSzáma++;
        kérdésMegjelenítés(kérdésSzáma);
    }
    else {
        kérdésSzáma = 0;
        kérdésMegjelenítés(kérdésSzáma);
    }

}

function színezés(válaszSzáma) {
    if (válaszSzáma == kérdések.teszt[kérdésSzáma].correctAnswer) {
        
        document.getElementById("válasz"+válaszSzáma).style.backgroundColor="green";
        document.getElementById("válasz"+válaszSzáma).style.color="white";
    }
    else {
        document.getElementById("válasz" + válaszSzáma).style.backgroundColor = "red";
        document.getElementById("válasz" + válaszSzáma).style.color = "white"; 
    }

}