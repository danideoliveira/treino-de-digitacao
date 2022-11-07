import { words } from '../../constants/wordsList.js'
import { DarkMode } from '../../modules/darkMode.js';

let contLetra = 0;
const listaTeste = [];
let jafoi = 0;

const customPrototypes = {
    randomNumber(max = words.length, min = 0) {
        return Math.floor(Math.random() * (max - min) + min);
    },

    setRandomWord() {
        //listaTeste.length = 0;
        const p = document.querySelector('.random-word');
        //const input = document.querySelector('.typed-word');
        const isDark = document.querySelector('.box').classList.contains('dark');

        const teste2 = Array.from(words[this.randomNumber()]);
        for (let i = 0; i < teste2.length; i++) {
            const div = document.createElement('div');
            const sup = document.createElement('sup');
            div.classList.add('letras');
            if (isDark) div.classList.add('dark');

            if (teste2[i] === " ") {
                div.style.padding = `${5}px`;
            }

            div.innerHTML += teste2[i];
            div.appendChild(sup);
            p.appendChild(div);
        }

        const div = document.createElement('div');
        div.classList.add('letras');
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
        this.primeiraLetra();
        //input.setAttribute('maxlength', p.textContent.length);
    },

    setTimer() {
        const timerElement = document.querySelector('.div-timer-secondary > p');
        const randomWord = document.querySelectorAll('.random-word > div');
        const randomWordDiv = document.querySelector('.random-word');
        const typedWord = document.querySelector('.typed-word');

        const arrPalavra = Array.from(randomWord);
        const newArr = [];

        // --
        arrPalavra.forEach(el => {
            if (el.firstChild === null) return;
            newArr.push(el.firstChild.textContent);
        });
        const palavraAleatoria = newArr.join("");
        const digitado = listaTeste.join("");

        if (!timerElement) return;

        const newTimer = setTimeout(() => {
            if (Number(timerElement.textContent) !== this.TIME_OVER) {
                timerElement.textContent = Number(timerElement.textContent) - 1;
                this.setTimer();
                this.initialTimer++;

            } else {
                clearTimeout(newTimer);
                //jafoi = 1;
                timerElement.classList.add('time-over');

                if (palavraAleatoria !== digitado) {
                    timerElement.classList.toggle('tada');
                    this.isIncorrect(randomWord);

                    setTimeout(() => {
                        randomWord.forEach(word => {
                            randomWordDiv.removeChild(word);
                        });
                        //listaTeste.length = 0;


                        this.setRandomWord();
                        timerElement.classList.toggle('tada');
                        //randomWord.classList.remove('incorrect');
                        // typedWord.value = this.CLEAR_INPUT;
                        // typedWord.focus();
                        if (timerElement) timerElement.textContent = Number(timerElement.textContent) + this.initialTimer;
                        this.initialTimer = this.RESET_TIMER;
                        this.setTimer();
                        timerElement.classList.remove('time-over');
                        listaTeste.length = 0;
                        contLetra = 0;
                    }, 1500);

                } else {
                    jafoi++
                    this.isCorrect(randomWord);
                    setTimeout(() => {
                        this.setTimer();
                        timerElement.classList.remove('time-over');
                    }, 1500)
                }
            }
        }, 1000);
    },

    isCorrect(randomWords) {
        if(jafoi > 1) return;
        jafoi = 1;

        const counterElement = document.querySelector('.counter');
        const timerElement = document.querySelector('.div-timer-secondary > p');
        // const btnSubmit = document.querySelector('.btn-submit');
        const randomWord = document.querySelector('.random-word');

        randomWords.forEach(word => {
            word.classList.remove('incorrect');
            word.classList.add('correct');
            word.classList.toggle('tada');
            // btnSubmit.setAttribute('disabled', true);

            setTimeout(() => {
                word.classList.toggle('tada');
            }, 1000);

            setTimeout(() => {
                word.classList.remove('correct');
                randomWord.removeChild(word);
            }, 1400)

        });

        setTimeout(() => {
            listaTeste.length = 0;
            //console.log(listaTeste);
            this.setRandomWord();

            // btnSubmit.removeAttribute('disabled');
            //typedWord.value = this.CLEAR_INPUT;
            //typedWord.focus();
            counterElement.innerText = Number(counterElement.textContent) + 1;
            if (timerElement) timerElement.textContent = Number(timerElement.textContent) + this.initialTimer;
            this.initialTimer = this.RESET_TIMER;

            // -----
            contLetra = 0;
            //this.primeiraLetra();
            jafoi = 0;
        }, 1500);

        //this.startEvents();
    },

    isIncorrect(randomWords) {
        if(jafoi > 1) return;
        jafoi = 1;

        // const btnSubmit = document.querySelector('.btn-submit');

        randomWords.forEach(word => {
            // word.classList.remove('correct');
            // word.classList.add('incorrect');
            word.classList.toggle('wobble');
            // btnSubmit.setAttribute('disabled', true);

            setTimeout(() => {
                word.classList.toggle('wobble');
                // word.classList.remove('incorrect');
                // btnSubmit.removeAttribute('disabled');
                //typedWord.focus();
                jafoi = 0;
            }, 1500);
        });

    },

    checkAnswer() {
        const typedWord = document.querySelector('.typed-word');
        const randomWord = document.querySelectorAll('.random-word > div');

        const arrPalavra = Array.from(randomWord);
        const newArr = [];

        // --
        arrPalavra.forEach(el => {
            if (el.firstChild === null) return;
            newArr.push(el.firstChild.textContent);
        });
        const palavraAleatoria = newArr.join("");
        //console.log(palavraAleatoria);

        //--

        const digitado = listaTeste.join("");
        //console.log(digitado);


        // const digitando = document.querySelector('.digitando');
        //

        (palavraAleatoria !== digitado)
            ? setStart.isIncorrect(randomWord)
            : setStart.isCorrect(randomWord)
    },

    primeiraLetra() {
        const randomWord = document.querySelectorAll('.random-word > div');
        const teste = Array.from(randomWord);

        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            //console.log(teste[0].textContent === key.textContent);
            if (key.classList.contains(teste[0].textContent)) {
                key.classList.add('current-key');
            }

            if (this.eShifter(teste[0].textContent) === 'sim') {
                if (key.classList.contains('leftshift')) {
                    key.classList.add('current-shift');
                }
            }

            else if(this.letrasAcentuadas(teste[0].textContent));

            // if(
            //     teste[0].textContent === '0' || teste[0].textContent === '1' ||
            //     teste[0].textContent === '2' || teste[0].textContent === '3' ||
            //     teste[0].textContent === '4' || teste[0].textContent === '5' ||
            //     teste[0].textContent === '6' || teste[0].textContent === '7' ||
            //     teste[0].textContent === '8' || teste[0].textContent === '9' 
            //     ) {
            //     if(key.classList.contains('leftshift')) {
            //         key.style.backgroundColor = "white";
            //     }
            // }
        })
    },

    letrasAcentuadas(proximaLetra) {
        const aguda = ['á', 'é', 'í', 'ó', 'ú'];
        const crase = ['à', 'è', 'ì', 'ò', 'ù'];
        const circunflexo = ['â', 'ê', 'î', 'ô', 'û'];
        const til = ['ã', 'õ'];

        const keys = document.querySelectorAll('.key');


        const letraAcentuada = proximaLetra.toLowerCase();
        keys.forEach(key => {
            if (aguda.includes(letraAcentuada)) {
                if (key.classList.contains('´') || key.classList.contains(proximaLetra.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))) {
                    key.classList.add('current-key');
                }

                else {
                    key.classList.remove('current-key');

                }

                if (proximaLetra === proximaLetra.toUpperCase()) {
                    if (key.classList.contains('leftshift')) {
                        key.classList.add('current-shift');
                    }
                }

                return;
            };

            if (crase.includes(letraAcentuada)) {
                if (key.classList.contains('`') || key.classList.contains(proximaLetra.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))) {
                    key.classList.add('current-key');
                }

                else {
                    key.classList.remove('current-key');

                }

                if (key.classList.contains('leftshift')) {
                    key.classList.add('current-shift');

                }

                return;
            };

            if (til.includes(letraAcentuada)) {
                if (key.classList.contains('~') || key.classList.contains(proximaLetra.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))) {
                    key.classList.add('current-key');
                }

                else {
                    key.classList.remove('current-key');

                }

                if (proximaLetra === proximaLetra.toUpperCase()) {
                    if (key.classList.contains('leftshift')) {
                        key.classList.add('current-shift');

                    }
                }

                return;
                ;
            };

            if (circunflexo.includes(letraAcentuada)) {
                if (key.classList.contains('^') || key.classList.contains(proximaLetra.normalize('NFD').replace(/[\u0300-\u036f]/g, ""))) {
                    key.classList.add('current-key');

                }

                else {
                    key.classList.remove('current-key');

                }

                if (key.classList.contains('leftshift')) {
                    key.classList.add('current-shift');
                }

                return;

            };
        });

    },

    eShifter(proximaLetra) {
        const simbolos = ['!', '@', '#', '$', '%', '¨', '&', '*', '(', ')', '_', '+', '{', '}', ':', '?', '"', '|', '`'];
        const maiusculas = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        if (simbolos.includes(proximaLetra) || maiusculas.includes(proximaLetra)) return 'sim';
    },

    setKeyPress(e) {
        if (e.key === 'Enter') return;
        const randomWord = document.querySelectorAll('.random-word > .letras');
        if (contLetra === Array.from(randomWord).length - 2) {
            const keys = document.querySelectorAll('.key');

            keys.forEach(key => {
                if (key.classList.contains('Enter')) {
                    key.style.backgroundColor = '#00ff1f';
                    key.style.boxShadow = `${1}px ${1}px ${20}px ${0}px lime`;
                    key.style.border = 'none';
                }
            });
        }
        if (contLetra > Array.from(randomWord).length - 2) return;

        let letraAtual = randomWord[contLetra].firstChild.textContent;
        if (!randomWord[contLetra]) return;
        //if(!randomWord[contLetra + 1].firstChild) return;
        //console.log(randomWord[contLetra + 1].firstChild === null);
        const typedWord = document.querySelector('.typed-word');
        // const palavraDigitada = typedWord.value;
        // const digitando = document.querySelector('.digitando');


        if (e.key === letraAtual) {
            if (letraAtual === " ") randomWord[contLetra].classList.add('correct-space');
            listaTeste.push(letraAtual);
            randomWord[contLetra].classList.add('correct');
            //digitando.textContent = listaTeste.join("");

            const keys = document.querySelectorAll('.key');

            keys.forEach(key => {
                key.classList.remove('current-shift');
                if (listaTeste.length + 1 === Array.from(randomWord).length) {
                    key.classList.remove('current-key');

                    return;
                };

                if (randomWord[contLetra + 1].firstChild === null) return;
                let proximaLetra = randomWord[contLetra + 1].firstChild.textContent;

                this.letrasAcentuadas(proximaLetra);


                if (key.classList.contains(proximaLetra)) {
                    key.classList.add('current-key');
                } else {
                    key.classList.remove('current-key');

                }

                if (proximaLetra === " ") {
                    if (key.classList.contains('space')) {
                        key.classList.add('current-key');
                    } else {
                        key.classList.remove('current-key');

                    }
                }

                else if (this.eShifter(proximaLetra) === 'sim') {
                    if (key.classList.contains('leftshift')) {
                        key.classList.add('current-shift');
                    }
                }

                // if (
                //     proximaLetra === '0' || proximaLetra === '1' ||
                //     proximaLetra === '2' || proximaLetra === '3' ||
                //     proximaLetra === '4' || proximaLetra === '5' ||
                //     proximaLetra === '6' || proximaLetra === '7' ||
                //     proximaLetra === '8' || proximaLetra === '9'
                // ) {
                //     if (key.classList.contains('leftshift')) {
                //         key.classList.remove('current-shift');

                //     }
                // }

            });

            contLetra++;
        } else {
            if (letraAtual === " ") randomWord[contLetra].classList.add('incorrect-space');
            randomWord[contLetra].classList.add('incorrect');
            randomWord[contLetra].lastChild.textContent = e.key;
            randomWord[contLetra].firstElementChild.classList.add('visible');
            listaTeste.push(e.key);
            contLetra++;
            //digitando.textContent = `Você digitou: ${e.key}`;
        }
    },

    setKeyUp(e) {
        const randomWord = document.querySelectorAll('.random-word > .letras');

        if (e.key === "Backspace") {
            if (contLetra > 0) {
                const keys = document.querySelectorAll('.key');
                let letraAtual = randomWord[contLetra - 1].firstChild.textContent;

                keys.forEach(key => {
                    if (key.classList.contains('Enter')) {
                        key.style.backgroundColor = '#878787';
                        key.style.border = `${2}px solid black`;
                        key.style.boxShadow = `${2}px ${1}px ${2}px ${0}px black`;

                    }
                    key.classList.remove('current-shift');
                    this.letrasAcentuadas(letraAtual);

                    if (key.classList.contains(letraAtual)) {
                        key.classList.add('current-key');
                    } else {
                        key.classList.remove('current-key');

                    }

                    if ((letraAtual === " ")) {
                        if (key.classList.contains('space')) {
                            key.classList.add('current-key');
                        } else {
                            key.classList.remove('current-key');

                        }
                    }

                    else if (this.eShifter(letraAtual) === 'sim') {
                        if (key.classList.contains('leftshift')) {
                            key.classList.add('current-shift');
                        }
                    }

                    // if(
                    //     letraAtual === '0' || letraAtual === '1' ||
                    //     letraAtual === '2' || letraAtual === '3' ||
                    //     letraAtual === '4' || letraAtual === '5' ||
                    //     letraAtual === '6' || letraAtual === '7' ||
                    //     letraAtual === '8' || letraAtual === '9'
                    //     ) {
                    //     if(key.classList.contains('leftshift')) {
                    //         key.style.backgroundColor = "white";
                    //     }
                    // }
                });

                listaTeste.pop();
                contLetra--;
                randomWord[contLetra].classList.remove('incorrect');
                randomWord[contLetra].classList.remove('correct');
                randomWord[contLetra].classList.remove('correct-space');
                randomWord[contLetra].classList.remove('incorrect-space');
                //randomWord[contLetra].firstElementChild.textContent = "";
                randomWord[contLetra].firstElementChild.classList.remove('visible');
                // if (isDark) {
                //     randomWord[contLetra].classList.add('default');
                //     randomWord[contLetra].classList.add('default-space');
                // }

                //digitando.textContent = listaTeste.join("");


                console.log(listaTeste);
            }
        }

        if (e.key === "Enter") {
            e.preventDefault();
            jafoi++;
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
    this.setTimer();
    this.setRandomWord();
    this.primeiraLetra();
    // const btnSubmit = document.querySelector('.btn-submit');
    // const input = document.querySelector('.typed-word');
    //input.focus();

    this.startEvents();


    // btnSubmit.addEventListener('click', this.checkAnswer);
    // input.addEventListener('keyup', (e) => {
    //     if (e.key === 'Enter') {
    //         e.preventDefault();
    //         btnSubmit.click();
    //     }
    // });

    
}

Start.prototype = customPrototypes;
const setStart = new Start();