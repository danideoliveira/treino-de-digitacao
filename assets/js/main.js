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
    const typedWord = document.querySelector('.typed-word');
    const randomWord = document.querySelector('.random-word > p');
    const divCheckAnswer = document.querySelector('.check-answer');

    const p = document.querySelector('.check-answer > p');

    (randomWord.textContent !== typedWord.value) 
    ? p.innerText = "Incorreto"
    : p.innerText = "Correto"
}

const btnSubmit = document.querySelector('.btn-submit');
btnSubmit.addEventListener('click', checkAnswer);