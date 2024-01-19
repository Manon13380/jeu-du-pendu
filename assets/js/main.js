let words = {
    easy: ["CRAYON", "CHIEN", "LOGO", "BROUHAHA", "AVION"],
    medium: ["ANGORA", "POULPE", "BILLARD", "OXYGENE", "LOSANGE"],
    hard: ["JAZZ", "MOULT", "COCCYX", "CHLOROPHYLLE", "SYMPTOME"]
}
let letterArray = [
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["K", "L", "M", "N", "O", "P", "Q", "R", "S"],
    ["T", "U", "V", "W", "X", "Y", "Z"]
]
let level = "";
let wordArray = [];
let findWord = [];
let index = 0;
let hidenWord = "";
let numbErreur = 0;
let numbWord = 0;
let myAudio = new Audio();

function playAudio(urlsong) {
    myAudio.src = urlsong;
    myAudio.autoplay = true;
}

function start() {
    document.querySelector(".button").style.display = "none";
    document.querySelector(".difficult").style.display = "block";
}

function displayLetter() {
    let letterContainer = document.querySelector("#letterContainer");
    letterArray.forEach((row) => {
        let line = document.createElement('div')
        line.classList.add("ligne")
        letterContainer.appendChild(line)
        row.forEach(letter => {
            let para = document.createElement("p");
            para.classList.add("letter");
            para.innerText = letter;
            para.addEventListener("click", function clic() {
                ChoiceLetters(para);
                para.removeEventListener("click", clic);
            })
            line.appendChild(para)
        });
    })
}

function next() {
    displayLetter();
    document.querySelector("#restart").style.display = "none";
    document.querySelector("#next").style.display = "none";
    index++;
    document.querySelector("#findWord").innerHTML = `Mot à trouvé (${index + 1}/${wordArray.length}) :`
    findWord = [];
    hidenWord = "";
    selectedWord();
    numbErreur = 0;
    document.querySelector('.try').innerHTML = `Il te reste ${4-numbErreur} essai(s)`;
    document.querySelector(".image").src = `./assets/images/pendu${numbErreur}.png`;
    document.querySelector('.result').innerHTML = "";
    document.querySelector('.result').style.backgroundColor = "transparent";
    color = "";
    btn = "none";
    str = "";
    
}

function restart() {
    document.querySelector(".gamePad").style.display = "none";
    document.querySelector(".difficult").style.display = "block";
    index = 0;
    document.querySelector('.result').innerHTML = "";
    document.querySelector('.result').style.backgroundColor = "transparent";
    findWord = [];
    hidenWord = "";
    numbErreur = 0;
    document.querySelector('.try').innerHTML = `Il te reste ${4-numbErreur} essai(s)`;
    document.querySelector(".image").src = `./assets/images/pendu${numbErreur}.png`;
    color = "";
    btn = "none";
    str = "";
}

function difficultChoice(el) {
    displayLetter();
    document.querySelector("#restart").style.display = "none";
    document.querySelector("#next").style.display = "none";
    document.querySelector(".difficult").style.display = "none";
    document.querySelector(".gamePad").style.display = "block";
    level = el.innerHTML;
    switch (level) {
        case ("Facile"): {
            wordArray = randomizeArray(words.easy);
            break;
        }
        case ("Moyen"): {
            wordArray = randomizeArray(words.medium)
            break;
        }
        default: {
            wordArray = randomizeArray(words.hard)
            break;
        }
    }
    document.querySelector("#findWord").innerHTML = `Mot à trouvé (${index + 1}/${wordArray.length}) :`
    selectedWord();
}

function selectedWord() {
    findWord = wordArray[index];
    for (let i = 0; i < findWord.length; i++) {
        hidenWord += "_";

    }
    document.querySelector(".word").innerHTML = hidenWord;
}

function ChoiceLetters(el) {
    let ind = findWord.indexOf(el.innerText);
    let str = "";
    if (ind != -1) {
        for (let i = 0; i < findWord.length; i++) {
            if (findWord[i] == el.innerText) {
                str += el.innerText
            } else {
                str += hidenWord[i]
            }
        }
        playAudio('./assets/song/correct.wav');
        hidenWord = str;
        document.querySelector(".word").innerHTML = hidenWord;
        el.style.color = "rgb(5, 55, 5)";
        el.style.cursor = "default";
    }
    else {
        playAudio('./assets/song/faux.wav');
        numbErreur++;
        el.style.color = "red";
        el.style.cursor = "default";
        document.querySelector(".image").src = `./assets/images/pendu${numbErreur}.png`;
    }
    document.querySelector('.try').innerHTML = `Il te reste ${4-numbErreur} essai(s)`;
    result();

}

function result() {
    let sentence = "";
    let color = "";
    let btn = "inlinenone";
    let backgroundColor = "transparent";
    if (findWord == hidenWord) {
        letterContainer.innerHTML = "";
        sentence = "Felicitation !";
        color = "rgb(5, 55, 5)";
        numbWord++;
        btn = "inline"
        backgroundColor = "rgba(255, 255, 255, 0.3)"
        document.querySelector("#restart").style.display = "none";
        if (index == wordArray.length - 1) {
            btn = "none";
            setTimeout(() => {
                EndOfGame();
            }, 2000);
        }

    }

    else if (numbErreur == 4) {
        letterContainer.innerHTML = "";
        sentence = `Dommage, le mot à trouver était ${findWord}`;
        color = "red";
        backgroundColor = "rgba(255, 255, 255, 0.3)";
        if (index == wordArray.length - 1) {
            btn = "none";
            setTimeout(() => {
                EndOfGame();
            }, 2000);
        }
        else {
            btn = "inline"
            document.querySelector("#restart").style.display = btn;
        }
    }
    document.querySelector('.result').innerHTML = sentence;
    document.querySelector('.result').style.color = color;
    document.querySelector("#next").style.display = btn;
    document.querySelector('.result').style.backgroundColor = backgroundColor;
    document.querySelectorAll()
}

function EndOfGame() {
    letterContainer.innerHTML = "";
    document.querySelector('.result').innerHTML = "";
    document.querySelector('.result').style.backgroundColor = "transparent";
    document.querySelector('#findWord').innerHTML = "";
    document.querySelector('.word').innerHTML = `Fin de la partie, tu as trouvé ${numbWord} mot(s) sur ${wordArray.length}`;
    document.querySelector("#restart").style.display = "inline";

}

function randomizeArray(tab) {
    let j = 0;
    let temp = "";
    for (let i = tab.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = tab[i];
        tab[i] = tab[j];
        tab[j] = temp;
    }
    return tab;
}

// fonction exemple de fetch
 async function getWord() {
    let response = await fetch('https://trouve-mot.fr/api/random')
    let data = await response.json();
    return data;
}

