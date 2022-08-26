const words = [
    "Experiência",
    "Distância",
    "Computador",
    "Flamengo",
    "Símbolo"
];

function randomNumber(max = words.length - 1, min = 0) {
    return Math.floor(Math.random() * (max - min) + min);
}

function setRandomWord() {
    const div = document.querySelector('.random-word');
    const p = document.createElement('p');

    div.appendChild(p);
    p.innerText = words[randomNumber()];
}

setRandomWord();

function checkAnswer() {

}