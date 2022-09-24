export function decreaseTimer() {
    const btnDecrease = document.querySelector('.decrease-timer');
    const inputTimerValue = document.querySelector('.timer-value');
    const MIN_VALUE = 5;

    btnDecrease.addEventListener('click', () => {
        if(inputTimerValue.value <= MIN_VALUE) return;
        inputTimerValue.value = Number(inputTimerValue.value) - 1;
    });
}

decreaseTimer();

export function increaseTimer() {
    const btnIncrease = document.querySelector('.increase-timer');
    const inputTimerValue = document.querySelector('.timer-value');
    const MAX_VALUE = 90;

    btnIncrease.addEventListener('click', () => {
        if(inputTimerValue.value >= MAX_VALUE) return;
        inputTimerValue.value = Number(inputTimerValue.value) + 1;
    });
}

increaseTimer();