window.onload = function () {

    létrehozás();

}

function létrehozás() {

    let hova = document.getElementById("pascal");

    hova.innerText = "";
    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        hova.appendChild(sor);

        for (var o = 0; o <= s; o++) {

            let szám = document.createElement("div");
            szám.classList.add("elem");
            sor.appendChild(szám);
        }
    }
}

var faktoriálisR = (n) => {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * faktoriálisR(n - 1);
    }

}

function számítás() {
    let n = document.getElementById("nTb").value;
    let n2 = parseInt(n);
    if (n2 && n2<=10 && n2>0) {
        var x = document.getElementsByClassName("elem");
        var i = 0;
        
        for (var s = 0; s < n2; s++) {
            for (var o = 0; o <= s; o++) {
                x[i].innerText = faktoriálisR(s) / (faktoriálisR(o) * faktoriálisR(s - o)); 
                i++;
            }
        }

        /*let er = faktoriálisR(n2);
        document.getElementById("pascal").innerText = er;*/
    }
    else {
        document.getElementById("pascal").innerText = "Hibás paraméter!";
    }

}