window.onload = function () {

    kérdésBetöltés(1);

}


//var kérdések;
var kérdésSzáma = 1;
var helyesVálasz;

function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data));
}    

function kérdésMegjelenítés(kérdés) {
    console.log(kérdés);
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    if (kérdés.image == "") {
        document.getElementById("kép1").src = "nincskep.png";
    }
    else {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    }
    helyesVálasz = kérdés.correctAnswer;

    document.getElementById("válasz1").style.backgroundColor = "white";
    document.getElementById("válasz2").style.backgroundColor = "white";
    document.getElementById("válasz3").style.backgroundColor = "white";

    document.getElementById("válasz1").style.color = "black";
    document.getElementById("válasz2").style.color = "black";
    document.getElementById("válasz3").style.color = "black";
}


/*function letöltés() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letöltésBefejeződött(data)
        );
}*/

/*function letöltésBefejeződött(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kérdések = d;
    kérdésMegjelenítés(0);
    kérdésSzáma = 0;
}*/

/*function kérdésMegjelenítés(kérdés) {

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

    let kep = document.getElementById("kép1");*/

    /*kérdés_szöveg.innerHTML = kérdések[kérdés.innertext].questionText*/
    //kep.src = "https://szoft1.comeback.hu/hajo/" + kérdések.teszt[kérdés].image;
   /* for (var i = 1; i < 4; i++) {
        let elem_kerdes = document.getElementById("válasz" + i);
        elem_kerdes.innerHTML = kérdések[kérdés]["válasz" + i];


    }*/
    
//}

function visszaLépés() {
    if (kérdésSzáma > 1) {
        kérdésSzáma--;
        kérdésBetöltés(kérdésSzáma);
    }
    else {
        kérdésSzáma = 10;
        kérdésBetöltés(kérdésSzáma);
    }


}

function előreLépés() {
    if (kérdésSzáma < 10) {
        kérdésSzáma++;
        kérdésBetöltés(kérdésSzáma);
    }
    else {
        kérdésSzáma = 1;
        kérdésBetöltés(kérdésSzáma);
    }

}

function színezés(válaszSzáma) {
    if (válaszSzáma == helyesVálasz) {
        
        document.getElementById("válasz"+válaszSzáma).style.backgroundColor="green";
        document.getElementById("válasz"+válaszSzáma).style.color="white";
    }
    else {
        document.getElementById("válasz" + válaszSzáma).style.backgroundColor = "red";
        document.getElementById("válasz" + válaszSzáma).style.color = "white"; 
    }

}



