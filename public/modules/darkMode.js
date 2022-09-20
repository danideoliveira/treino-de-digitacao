import { darkModeElements } from '../constants/darkModeElements.js'

export class DarkMode {
    constructor(arr) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') this.setDarkMode(arr);

        const btnDarkMode = document.querySelector('.btn-dark-mode');
        btnDarkMode.addEventListener('click', () => {
            this.setDarkMode(arr);
            this.toggleLocalStorage();
        });
    }

    setDarkMode(arr) {
        for(let currentElement of arr) {
            const { element } = currentElement;
            const el = document.querySelector(element);
            if(!el) continue;        
            el.classList.toggle('dark');
        }
    }

    toggleLocalStorage() {
        const body = document.querySelector('body');
        (!body.classList.contains('dark'))
            ? localStorage.setItem('theme', 'light')
            : localStorage.setItem('theme', 'dark')
    }
}

const setDarkMode = new DarkMode(darkModeElements);

function mouseOver() {
    const element = document.querySelectorAll('.div-form > form > button');
    const body = document.querySelector('body')
    
    element.forEach(currentElement => {
        const img = currentElement.children[0];
        const p = currentElement.children[1];

        currentElement.addEventListener('mouseover', () => {
            if(!body.classList.contains('dark')) return;

            if(body.classList.contains('dark')) {
                img.classList.add('mouse-over');
                p.classList.add('mouse-over');
            } else {
                img.classList.remove('mouse-over');
                p.classList.remove('mouse-over');
            }
        });

        currentElement.addEventListener('mouseout', () => { 
            if(!body.classList.contains('dark')) return;

            if(body.classList.contains('dark')) {
                img.classList.remove('mouse-over');
                p.classList.remove('mouse-over');
            } else {
                img.classList.add('mouse-over');
                p.classList.add('mouse-over');
            }
        });
    })
}

mouseOver();