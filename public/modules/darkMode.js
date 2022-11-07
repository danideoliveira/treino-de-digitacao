import { darkModeElements } from '../constants/darkModeElements.js'

const darkModePrototypes = {
    setDarkMode(arr) {
        for (let currentElement of arr) {
            const { element } = currentElement;
            const el = document.querySelectorAll(element);
            if (!el) continue;

            el.forEach(currentEl => {
                currentEl.classList.toggle('dark');
            })
        }
    },

    toggleLocalStorage() {
        const body = document.querySelector('body');
        (!body.classList.contains('dark'))
            ? localStorage.setItem('theme', 'light')
            : localStorage.setItem('theme', 'dark')
    }
};

export function DarkMode(arr) {
    const currentTheme = localStorage.getItem('theme');
    const btnDarkMode = document.querySelector('.btn-dark-mode');
    const darkModeIcon = document.querySelector('.btn-dark-mode > img');
    const MOON_ICON_PATH = 'assets/img/moon_icon.png';
    const SUN_ICON_PATH = 'assets/img/icon_sun.png';

    if (currentTheme === 'dark') {
        darkModeIcon.setAttribute('src', SUN_ICON_PATH)
        this.setDarkMode(arr);
    }

    btnDarkMode.addEventListener('click', () => {   
        (darkModeIcon.getAttribute('src') === MOON_ICON_PATH)
        ? darkModeIcon.setAttribute('src', SUN_ICON_PATH)
        : darkModeIcon.setAttribute('src', MOON_ICON_PATH)

        this.setDarkMode(arr);
        this.toggleLocalStorage();
        btnDarkMode.blur()
    });
}

DarkMode.prototype = darkModePrototypes;
const setDarkMode = new DarkMode(darkModeElements);