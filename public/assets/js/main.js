import { words } from '../../constants/wordsList.js'
import { DarkMode } from '../../modules/darkMode.js';

const customPrototypes = {
    randomNumber(max = words.length, min = 0) {
        return Math.floor(Math.random() * (max - min) + min);
    },

    setRandomWord() {
        const p = document.querySelector('.random-word');
        const isDark = document.querySelector('.box').classList.contains('dark');

        const wordDrawnArray = Array.from(words[this.randomNumber()]);

        for (let i = 0; i < wordDrawnArray.length; i++) {
            const div = document.createElement('div');
            const sup = document.createElement('sup');
            div.classList.add('letter');
            if (isDark) div.classList.add('dark');

            if (wordDrawnArray[i] === " ") {
                div.style.padding = `${5}px`;
            }

            div.innerHTML += wordDrawnArray[i];
            div.appendChild(sup);
            p.appendChild(div);
        }

        const div = document.createElement('div');
        div.classList.add('letter');
        p.appendChild(div);
        
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            if (key.classList.contains('Enter')) {
                key.style.backgroundColor = '#878787';
                key.style.border = `${2}px solid black`;
                key.style.boxShadow = `${2}px ${1}px ${2}px ${0}px black`;
                
            }
            
            key.classList.remove('current-key');
            key.classList.remove('current-shift');
        });

        this.firstLetter();
    },

    setTimer() {
        const timerElement = document.querySelector('.div-timer-secondary > p');
        const randomWord = document.querySelectorAll('.random-word > div');
        const randomWordDiv = document.querySelector('.random-word');
        const typedWord = document.querySelector('.typed-word');

        const separateLetters = Array.from(randomWord);
        const newArr = [];

        separateLetters.forEach(el => {
            if (el.firstChild === null) return;
            newArr.push(el.firstChild.textContent);
        });

        const wordDrawn = newArr.join("");
        const whatWasTyped = this.verificationArray.join("");

        if (!timerElement) return;

        const newTimer = setTimeout(() => {
            if (Number(timerElement.textContent) !== this.TIME_OVER) {
                timerElement.textContent = Number(timerElement.textContent) - 1;
                this.setTimer();
                this.initialTimer++;

            } else {
                clearTimeout(newTimer);
                timerElement.classList.add('time-over');

                if (wordDrawn !== whatWasTyped) {
                    timerElement.classList.toggle('tada');
                    this.isIncorrect(randomWord);

                    setTimeout(() => {
                        randomWord.forEach(word => {
                            randomWordDiv.removeChild(word);
                        });

                        this.setRandomWord();
                        timerElement.classList.toggle('tada');
                        if (timerElement) timerElement.textContent = Number(timerElement.textContent) + this.initialTimer;
                        this.initialTimer = this.RESET_TIMER;
                        this.setTimer();
                        timerElement.classList.remove('time-over');
                        this.verificationArray.length = 0;
                        this.letterCounter = 0;
                    }, 1500);

                } else {
                    this.wasPressed++
                    this.isCorrect(randomWord);
                    setTimeout(() => {
                        this.setTimer();
                        timerElement.classList.remove('time-over');
                    }, 1500)
                }
            }
        }, 1000);
    },

    isCorrect(wordDrawnLetters) {
        if(this.wasPressed > 1) return;
        this.wasPressed = 1;

        const counterElement = document.querySelector('.counter');
        const timerElement = document.querySelector('.div-timer-secondary > p');
        const randomWordDiv = document.querySelector('.random-word');

        wordDrawnLetters.forEach(letter => {
            letter.classList.remove('incorrect');
            letter.classList.add('correct');
            letter.classList.toggle('tada');

            setTimeout(() => {
                letter.classList.toggle('tada');
            }, 1000);

            setTimeout(() => {
                letter.classList.remove('correct');
                randomWordDiv.removeChild(letter);
            }, 1400)

        });

        setTimeout(() => {
            this.verificationArray.length = 0;
            this.setRandomWord();

            counterElement.innerText = Number(counterElement.textContent) + 1;
            if (timerElement) timerElement.textContent = Number(timerElement.textContent) + this.initialTimer;
            this.initialTimer = this.RESET_TIMER;

            this.letterCounter = 0;
            this.wasPressed = 0;
        }, 1500);
    },

    isIncorrect(wordDrawnLetters) {
        if(this.wasPressed > 1) return;
        this.wasPressed = 1;

        wordDrawnLetters.forEach(letter => {
            letter.classList.toggle('wobble');

            setTimeout(() => {
                letter.classList.toggle('wobble');
                this.wasPressed = 0;
            }, 1500);
        });

    },

    checkAnswer() {
        const wordDrawnLetters = document.querySelectorAll('.random-word > div');

        const separateLetters = Array.from(wordDrawnLetters);
        const newArr = [];

        separateLetters.forEach(el => {
            if (el.firstChild === null) return;
            newArr.push(el.firstChild.textContent);
        });

        const wordDrawn = newArr.join("");
        const whatWasTyped = this.verificationArray.join("");

        (wordDrawn !== whatWasTyped)
            ? setStart.isIncorrect(wordDrawnLetters)
            : setStart.isCorrect(wordDrawnLetters)
    },

    firstLetter() {
        const randomWord = document.querySelectorAll('.random-word > div');
        const separateLetters = Array.from(randomWord);
        const firstLetter = separateLetters[0].textContent;
        const keys = document.querySelectorAll('.key');
        
        keys.forEach(key => {
            if (key.classList.contains(firstLetter)) key.classList.add('current-key');

            if (this.needsToPressShift(firstLetter) === 'yes') {
                if (key.classList.contains('leftshift')) key.classList.add('current-shift');
            }

            else if(this.accentedLetters(firstLetter));
        })
    },

    accentedLetters(currentLetter) {
        const acute = ['á', 'é', 'í', 'ó', 'ú'];
        const crasis = ['à', 'è', 'ì', 'ò', 'ù'];
        const circumflex = ['â', 'ê', 'î', 'ô', 'û'];
        const tilde = ['ã', 'õ'];

        const keys = document.querySelectorAll('.key');
        const letterWithoutAccent = currentLetter.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

        const accentedLetter = currentLetter.toLowerCase();
        
        keys.forEach(key => {
            if (acute.includes(accentedLetter)) {
                (key.classList.contains('´') || key.classList.contains(letterWithoutAccent)) 
                    ? key.classList.add('current-key')
                    : key.classList.remove('current-key');

                if (currentLetter === currentLetter.toUpperCase()) {
                    if (key.classList.contains('leftshift')) key.classList.add('current-shift');      
                }

                return;
            };

            if (crasis.includes(accentedLetter)) {
                (key.classList.contains('`') || key.classList.contains(letterWithoutAccent))
                    ? key.classList.add('current-key')
                    : key.classList.remove('current-key');

                if (key.classList.contains('leftshift')) key.classList.add('current-shift');

                return;
            };

            if (tilde.includes(accentedLetter)) {
                (key.classList.contains('~') || key.classList.contains(letterWithoutAccent))
                    ? key.classList.add('current-key')
                    : key.classList.remove('current-key');

                if (currentLetter === currentLetter.toUpperCase()) {
                    if (key.classList.contains('leftshift')) key.classList.add('current-shift');
                }

                return;
                ;
            };

            if (circumflex.includes(accentedLetter)) {
                (key.classList.contains('^') || key.classList.contains(letterWithoutAccent))
                    ? key.classList.add('current-key')
                    : key.classList.remove('current-key');

                if (key.classList.contains('leftshift')) key.classList.add('current-shift');
                return;
            };
        });

    },

    needsToPressShift(currentLetter) {
        const symbols = ['!', '@', '#', '$', '%', '¨', '&', '*', '(', ')', '_', '+', '{', '}', ':', '?', '"', '|', '`'];
        const capitalLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        if (symbols.includes(currentLetter) || capitalLetters.includes(currentLetter)) return 'yes';
    },

    setKeyPress(e) {
        if (e.key === 'Enter') return;
        const randomWord = document.querySelectorAll('.random-word > .letter');

        if (this.letterCounter === Array.from(randomWord).length - 2) {
            const keys = document.querySelectorAll('.key');

            keys.forEach(key => {
                if (key.classList.contains('Enter')) {
                    key.style.backgroundColor = '#00ff1f';
                    key.style.boxShadow = `${1}px ${1}px ${20}px ${0}px lime`;
                    key.style.border = 'none';
                }
            });
        }

        if (this.letterCounter > Array.from(randomWord).length - 2) return;

        let currentLetter = randomWord[this.letterCounter].firstChild.textContent;
        if (!randomWord[this.letterCounter]) return;

        if (e.key === currentLetter) {
            if (currentLetter === " ") randomWord[this.letterCounter].classList.add('correct-space');
            this.verificationArray.push(currentLetter);
            randomWord[this.letterCounter].classList.add('correct');

            const keys = document.querySelectorAll('.key');

            keys.forEach(key => {
                key.classList.remove('current-shift');
                if (this.verificationArray.length + 1 === Array.from(randomWord).length) {
                    key.classList.remove('current-key')
                    return;
                };

                if (randomWord[this.letterCounter + 1].firstChild === null) return;
                let nextLetter = randomWord[this.letterCounter + 1].firstChild.textContent;

                this.accentedLetters(nextLetter);


                (key.classList.contains(nextLetter)) 
                    ? key.classList.add('current-key')          
                    : key.classList.remove('current-key');
                

                if (nextLetter === " ") {
                    (key.classList.contains('space')) 
                        ? key.classList.add('current-key')
                        : key.classList.remove('current-key');   
                }

                else if (this.needsToPressShift(nextLetter) === 'yes') {
                    if (key.classList.contains('leftshift')) key.classList.add('current-shift');
                }
            });

            this.letterCounter++;
        } else {
            if (currentLetter === " ") randomWord[this.letterCounter].classList.add('incorrect-space');
            randomWord[this.letterCounter].classList.add('incorrect');
            randomWord[this.letterCounter].lastChild.textContent = e.key;
            randomWord[this.letterCounter].firstElementChild.classList.add('visible');
            this.verificationArray.push(e.key);
            this.letterCounter++;
        }
    },

    setKeyUp(e) {
        const randomWord = document.querySelectorAll('.random-word > .letter');

        if (e.key === "Backspace") {
            if (this.letterCounter > 0) {
                const keys = document.querySelectorAll('.key');
                let currentLetter = randomWord[this.letterCounter - 1].firstChild.textContent;

                keys.forEach(key => {
                    if (key.classList.contains('Enter')) {
                        key.style.backgroundColor = '#878787';
                        key.style.border = `${2}px solid black`;
                        key.style.boxShadow = `${2}px ${1}px ${2}px ${0}px black`;

                    }
                    
                    key.classList.remove('current-shift');
                    this.accentedLetters(currentLetter);

                    (key.classList.contains(currentLetter)) 
                        ? key.classList.add('current-key')
                        : key.classList.remove('current-key');

                    if (currentLetter === " ") {
                        (key.classList.contains('space')) 
                            ? key.classList.add('current-key')
                            : key.classList.remove('current-key');
                    }

                    else if (this.needsToPressShift(currentLetter) === 'yes') {
                        if (key.classList.contains('leftshift')) key.classList.add('current-shift');
                    }
                });

                this.verificationArray.pop();
                this.letterCounter--;
                randomWord[this.letterCounter].classList.remove('incorrect');
                randomWord[this.letterCounter].classList.remove('correct');
                randomWord[this.letterCounter].classList.remove('correct-space');
                randomWord[this.letterCounter].classList.remove('incorrect-space');
                randomWord[this.letterCounter].firstElementChild.classList.remove('visible');
            }
        }

        if (e.key === "Enter") {
            e.preventDefault();
            this.wasPressed++;
            this.checkAnswer();
        }
    },

    startEvents() {
        window.addEventListener('keypress', e => this.setKeyPress(e));
        window.addEventListener('keyup', e => this.setKeyUp(e));
    }
};

function Start() {
    this.RESET_TIMER = 0;
    this.TIME_OVER = 0;
    this.CLEAR_INPUT = '';
    this.initialTimer = 0;
    this.letterCounter = 0;
    this.verificationArray = [];
    this.wasPressed = 0;
    this.setTimer();
    this.setRandomWord();
    this.firstLetter();
    this.startEvents(); 
}

Start.prototype = customPrototypes;
const setStart = new Start();