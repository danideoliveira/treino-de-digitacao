import { words } from '../../constants/wordsList.js'
import { DarkMode } from '../../modules/darkMode.js';

const customPrototypes = {
    randomNumber(max = words.length, min = 0) {
        return Math.floor(Math.random() * (max - min) + min);
    },

    setRandomWord() {
        const p = document.querySelector('.random-word > p');
        const input = document.querySelector('.typed-word');
        p.innerText = words[this.randomNumber()];
        input.setAttribute('maxlength', p.textContent.length);
    },

    setTimer() {
        const timerElement = document.querySelector('.div-timer-secondary > p');
        const randomWord = document.querySelector('.random-word > p');
        const typedWord = document.querySelector('.typed-word');

        if (!timerElement) return;

        const newTimer = setTimeout(() => {
            if (Number(timerElement.textContent) !== this.TIME_OVER) {
                timerElement.textContent = Number(timerElement.textContent) - 1;
                this.setTimer();
                this.initialTimer++;

            } else {
                clearTimeout(newTimer);
                timerElement.classList.add('time-over');

                if (randomWord.textContent !== typedWord.value) {
                    timerElement.classList.toggle('tada');
                    this.isIncorrect(typedWord, randomWord);

                    setTimeout(() => {
                        this.setRandomWord();
                        timerElement.classList.toggle('tada');
                        randomWord.classList.remove('incorrect');
                        typedWord.value = this.CLEAR_INPUT;
                        typedWord.focus();
                        if (timerElement) timerElement.textContent = Number(timerElement.textContent) + this.initialTimer;
                        this.initialTimer = this.RESET_TIMER;
                        this.setTimer();
                        timerElement.classList.remove('time-over');
                    }, 1500);

                } else {
                    this.isCorrect(typedWord, randomWord);
                    setTimeout(() => {
                        this.setTimer();
                        timerElement.classList.remove('time-over');
                    }, 1500)
                }
            }
        }, 1000);
    },

    isCorrect(typedWord, randomWord) {
        const counterElement = document.querySelector('.counter');
        const timerElement = document.querySelector('.div-timer-secondary > p');
        const btnSubmit = document.querySelector('.btn-submit');

        randomWord.classList.remove('incorrect');
        randomWord.classList.add('correct');
        randomWord.classList.toggle('tada');
        btnSubmit.setAttribute('disabled', true);

        setTimeout(() => {
            randomWord.classList.toggle('tada');
        }, 1000);

        setTimeout(() => {
            this.setRandomWord();
            btnSubmit.removeAttribute('disabled');
            randomWord.classList.remove('correct');
            typedWord.value = this.CLEAR_INPUT;
            typedWord.focus();
            counterElement.innerText = Number(counterElement.textContent) + 1;
            if (timerElement) timerElement.textContent = Number(timerElement.textContent) + this.initialTimer;
            this.initialTimer = this.RESET_TIMER;
        }, 1500);
    },

    isIncorrect(typedWord, randomWord) {
        const btnSubmit = document.querySelector('.btn-submit');

        randomWord.classList.remove('correct');
        randomWord.classList.add('incorrect');
        randomWord.classList.toggle('wobble');
        btnSubmit.setAttribute('disabled', true);

        setTimeout(() => {
            randomWord.classList.toggle('wobble');
            btnSubmit.removeAttribute('disabled');
            typedWord.focus();
        }, 1000);
    },

    checkAnswer() {
        const typedWord = document.querySelector('.typed-word');
        const randomWord = document.querySelector('.random-word > p');

        (randomWord.textContent !== typedWord.value)
            ? setStart.isIncorrect(typedWord, randomWord)
            : setStart.isCorrect(typedWord, randomWord)
    }
};

function Start() {
    this.RESET_TIMER = 0;
    this.TIME_OVER = 0;
    this.CLEAR_INPUT = '';
    this.initialTimer = 0;
    this.setTimer();
    this.setRandomWord();
    const btnSubmit = document.querySelector('.btn-submit');
    const input = document.querySelector('.typed-word');
    input.focus();

    btnSubmit.addEventListener('click', this.checkAnswer);
    input.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            btnSubmit.click();
        }
    });
}

Start.prototype = customPrototypes;
const setStart = new Start();