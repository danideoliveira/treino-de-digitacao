import { words } from '../../constants/wordsList.js'
import { DarkMode } from '../../modules/darkMode.js';

let initialTimer = 0;

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
        const initialTimerValue = timerElement.textContent;
    }

    setTimer() {
        const timerElement = document.querySelector('.div-timer-secondary > p');
        const randomWord = document.querySelector('.random-word > p');
        const typedWord = document.querySelector('.typed-word');
        
        const newTimer = setTimeout(() => {
            if (Number(timerElement.textContent) !== 0) {
                timerElement.textContent = Number(timerElement.textContent) - 1;
                this.setTimer();
                initialTimer++;

            } else {
                clearTimeout(newTimer);
                timerElement.style.color = '#da3232';

                if (randomWord.textContent !== typedWord.value) {
                    timerElement.classList.toggle('tada');
                    this.isIncorrect(typedWord, randomWord);
                    
                    setTimeout(() => {
                        start.setRandomWord();
                        timerElement.classList.toggle('tada');
                        randomWord.classList.remove('incorrect');
                        typedWord.value = '';
                        typedWord.focus();
                        timerElement.textContent = Number(timerElement.textContent) + initialTimer;
                        initialTimer = 0;
                        timerElement.style.color = 'black';
                        start.setTimer();
                    }, 1500);

                } else {
                    this.isCorrect(typedWord, randomWord);  
                    setTimeout(() => {
                        start.setTimer();
                    }, 1500)              
                }

                setTimeout(() => {
                    (timerElement.classList.contains('dark'))
                    ? timerElement.style.color = '#1a1a1a'
                    : timerElement.style.color = '#f5f5f5'   
                }, 1500);

            }
        }, 1000);
    }

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
            start.setRandomWord();
            btnSubmit.removeAttribute('disabled');
            randomWord.classList.remove('correct');
            typedWord.value = '';
            typedWord.focus();
            counterElement.innerText = Number(counterElement.textContent) + 1;
            timerElement.textContent = Number(timerElement.textContent) + initialTimer;
            initialTimer = 0;
        }, 1500);
    }

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
    }

    checkAnswer() {
        const typedWord = document.querySelector('.typed-word');
        const randomWord = document.querySelector('.random-word > p');

        (randomWord.textContent !== typedWord.value)
        ? start.isIncorrect(typedWord, randomWord)
        : start.isCorrect(typedWord, randomWord)
    }
}

const start = new Start();