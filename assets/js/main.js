import { words } from '../modules/wordsList.js'

class Start {
    constructor() {
        this.setRandomWord();
        const btnSubmit = document.querySelector('.btn-submit');
        const input = document.querySelector('.typed-word');
        input.focus();
        
        btnSubmit.addEventListener('click', this.checkAnswer);
        input.addEventListener('keyup', (e) => {
            if(e.key === 'Enter') {
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
        p.innerText = words[this.randomNumber()];
    }

    checkAnswer() {
        const typedWord = document.querySelector('.typed-word');
        const randomWord = document.querySelector('.random-word > p');
        const counterElement = document.querySelector('.counter');
    
        if(randomWord.textContent !== typedWord.value) {
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
            }, 1500);
        }
    }
}

const start = new Start();


const darkModeElements = [
    {element: '.tips-title'},
    {element: '.counter-title'},
    {element: '.div-img > p'},
    {element: '.div-img > img'},
    {element: '.typed-word'},
    {element: '.container'},
    {element: 'h1'},
    {element: '.box'},
    {element: '.counter'},
    {element: '.random-word > p'},
    {element: '.dark-mode'},
    {element: '.btn-dark-mode'},
    {element: '.btn-dark-mode > img'},
];

class DarkMode {
    constructor(arr) {
        const btnDarkMode = document.querySelector('.btn-dark-mode');
        btnDarkMode.addEventListener('click', () => {
            this.setDarkMode(arr);
        });
    }

    setDarkMode(arr) {
        arr.forEach(currentElement => {
            const { element } = currentElement;
            const el = document.querySelector(element);
            el.style.transition = `${0.5}s all ease`;
    
            el.classList.toggle('dark');
        });
    }
}

const setDarkMode = new DarkMode(darkModeElements);


