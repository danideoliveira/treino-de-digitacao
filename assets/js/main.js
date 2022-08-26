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
    const p = document.querySelector('.random-word > p');
    p.innerText = words[randomNumber()];
}

setRandomWord();

function checkAnswer() {
    const typedWord = document.querySelector('.typed-word');
    const randomWord = document.querySelector('.random-word > p');

    const p = document.querySelector('.check-answer > p');

    if(randomWord.textContent !== typedWord.value) {
        randomWord.classList.remove('correct');
        randomWord.classList.add('incorrect');
    } else {
        randomWord.classList.remove('incorrect');
        randomWord.classList.add('correct');

        setTimeout(() => {
            setRandomWord();
            randomWord.classList.remove('correct');
            typedWord.value = '';
        }, 1000);


    }
}

const btnSubmit = document.querySelector('.btn-submit');
btnSubmit.addEventListener('click', checkAnswer);