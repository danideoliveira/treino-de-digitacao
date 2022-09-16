import { words } from '../../constants/wordsList.js'
import { DarkMode } from '../../modules/darkMode.js';

class Start {
    constructor() {
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

    randomNumber(max = words.length, min = 0) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    setRandomWord() {
        const p = document.querySelector('.random-word > p');
        const input = document.querySelector('.typed-word');
        p.innerText = words[this.randomNumber()];
        input.setAttribute('maxlength', p.textContent.length);
    }

    resetTimer() {
        const timerElement = document.querySelector('.div-timer-secondary > p');
        timerElement.textContent = 15;
    }

    setTimer() {
        const timerElement = document.querySelector('.div-timer-secondary > p');
        const randomWord = document.querySelector('.random-word > p');
        const typedWord = document.querySelector('.typed-word');

        const newTimer = setTimeout(() => {
            if (Number(timerElement.textContent) !== 0) {
                timerElement.textContent = Number(timerElement.textContent) - 1;
                this.setTimer();

            } else {
                clearTimeout(newTimer);
                timerElement.style.color = 'red';

                if (randomWord.textContent !== typedWord.value) {
                    timerElement.classList.toggle('tada');

                    randomWord.classList.remove('correct');
                    randomWord.classList.add('incorrect');
                    randomWord.classList.toggle('wobble');

                    setTimeout(() => {
                        randomWord.classList.toggle('wobble');
                        timerElement.classList.toggle('tada');
                        typedWord.focus();
                    }, 1000);

                    setTimeout(() => {
                        start.setRandomWord();
                        randomWord.classList.remove('incorrect');
                        typedWord.value = '';
                        typedWord.focus();
                        timerElement.textContent = 15;
                        this.setTimer();
                        timerElement.style.color = 'black';
                    }, 1500);
                    
                } else {
                    this.checkAnswer();
                }
                
            }
        }, 1000);
    }

    checkAnswer() {
        const typedWord = document.querySelector('.typed-word');
        const randomWord = document.querySelector('.random-word > p');
        const counterElement = document.querySelector('.counter');
        const timerElement = document.querySelector('.div-timer-secondary > p');

        if (randomWord.textContent !== typedWord.value) {
            randomWord.classList.remove('correct');
            randomWord.classList.add('incorrect');
            randomWord.classList.toggle('wobble');

            setTimeout(() => {
                randomWord.classList.toggle('wobble');
                typedWord.focus();
            }, 1000);


        } else {
            randomWord.classList.remove('incorrect');
            randomWord.classList.add('correct');

            randomWord.classList.toggle('tada');

            setTimeout(() => {
                randomWord.classList.toggle('tada');
            }, 1000);

            setTimeout(() => {
                start.setRandomWord();
                randomWord.classList.remove('correct');
                typedWord.value = '';
                typedWord.focus();
                counterElement.innerText = Number(counterElement.textContent) + 1;
                timerElement.textContent = 15;
                timerElement.style.color = 'black';
                this.setTimer();
            }, 1500);
        }
    }
}

const start = new Start();