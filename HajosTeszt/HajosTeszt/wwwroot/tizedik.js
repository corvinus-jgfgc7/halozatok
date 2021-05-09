/*window.onload = function () {

    kérdésBetöltés(1);

}*/

/*window.onload = init;*/
/*document.addEventListener("DOMContentLoaded", init);*/


//var kérdések;
var kérdésSzáma = 1;
var helyesVálasz;

var hotList = [];           //Az éppen gyakoroltatott kérdések listája 
var questionsInHotList = 3; //Ez majd 7 lesz, teszteléshez jobb a 3. 
var displayedQuestion;      //A hotList-ből éppen ez a kérdés van kint
var numberOfQuestions;      //Kérdések száma a teljes adatbázisban
var nextQuestion = 1;       //A következő kérdés száma a teljes listában
var timerHandler;

document.addEventListener("DOMContentLoaded", () => {
    for (let i = 0; i < questionsInHotList; i++) {
        hotList[i] = {
            question: {},
            goodAnswers: 0,

        }
        /*hotList[i] = {};
        hotList[i].goodAnswers = 0;*/
    }


    //Kérdések száma
    fetch("questions/count").then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    //Előre-hátra gombok
    document.getElementById("elore").addEventListener("click", előre);
    document.getElementById("hatra").addEventListener("click", hátra);

    // Mentett állapot olvasása
    if (localStorage.getItem("hotList")) {
        hotList = JSON.Parse(localStorage.getItem("hotList"));
    }
    if (localStorage.getItem("displayedQuestion")) {
        hotList = parseInt(localStorage.getItem("displayedQuestion"));
    }
    if (localStorage.getItem("nextQuestion")) {
        hotList = parseInt(localStorage.getItem("nextQuestion"));
    }

    if (hotList.length === 3) {
        
        for (let i = 0; i < questionsInHotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    } else {
        kérdésMegjelenítés();
    }
});

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error(`Hibás letöltés: ${result.status}`);
                return null;
            }
            else {
                return result.json();
            }
        })
        .then(q => {
            hotList[destination].question = q;
            hotList[destination].goodAnswers = 0;
            console.log(`A ${questionNumber}. kérdés letöltve a hotList ${destination}. helyére`)
            if (displayedQuestion === undefined && destination === 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }

        })

}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText;
    document.getElementById("válasz1").innerText = kérdés.answer1;
    document.getElementById("válasz2").innerText = kérdés.answer2;
    document.getElementById("válasz3").innerText = kérdés.answer3;
    if (kérdés.image) {
        document.getElementById("kép1").src = kérdés.image;
        document.getElementById("kép1").style.display = "block";
    }
    else {
        document.getElementById("kép1").style.display = "none";
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    }
    helyesVálasz = kérdés.correctAnswer;

    for (var i = 1; i <= 3; i++) document.getElementById("válasz" + i).classList.remove("jó", "rossz");
    document.getElementById("válaszok").style.pointerEvents = "auto";

}

function előre() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion === questionsInHotList) displayedQuestion = 0;
    kérdésMegjelenítés();
}

function hátra() {
    displayedQuestion--;
    if (displayedQuestion<0) displayedQuestion = questionsInHotList - 1;
    kérdésMegjelenítés();
}

function választás(n) {
    let kérdés = hotList[displayedQuestion].question;
    if (n === kérdés.correctAnswer) {
        document.getElementById("válasz" + n).classList.add("jó");
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers === 3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
            //kérdéslista vége
        }
    } else {
        hotList[displayedQuestion].goodAnswers = 0;
        document.getElementById("válasz" + n).classList.add("rossz");
        document.getElementById("válasz" + kérdés.correctAnswer).classList.add("jó");
    }

    document.getElementById("válaszok").style.pointerEvents = "none";
    timerHandler = setTimeout(előre, 3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
    
}

/*function kérdésBetöltés(id) {
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
}*/

/*function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(
            result => {
                if (!result.ok) {
                    console.error(`Hibás letöltés: ${response.status}`)
                }
                else {
                    return result.json()
                }
            }
        )
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`)
                if (displayedQuestion == undefined && destination == 0) { //!!!!!!!!!!!!!
                    displayedQuestion = 0;
                    kérdésMegjelenítés();
                }
            }
        );
}

function init() {
    for (var i = 0; i < questionsInHotList; i++) {
        let q = {
            question: {},
            goodAnswers: 0
        }
        hotList[i] = q;
    }

    //Első kérdések letöltése
    for (var i = 0; i < questionsInHotList; i++) {
        kérdésBetöltés(nextQuestion, i);
        nextQuestion++;
    }
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
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
}*/


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

/*function visszaLépés() {
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

}*/



