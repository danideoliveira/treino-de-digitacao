import { darkModeElements } from './darkModeElements.js'

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