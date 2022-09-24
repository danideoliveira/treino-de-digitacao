function mouseOver() {
    const element = document.querySelectorAll('.div-form > form > button');
    const body = document.querySelector('body')

    element.forEach(currentElement => {
        const img = currentElement.children[0];
        const p = currentElement.children[1];

        currentElement.addEventListener('mouseover', () => {
            if (!body.classList.contains('dark')) return;

            if (body.classList.contains('dark')) {
                img.classList.add('mouse-over');
                p.classList.add('mouse-over');
            } else {
                img.classList.remove('mouse-over');
                p.classList.remove('mouse-over');
            }
        });

        currentElement.addEventListener('mouseout', () => {
            if (!body.classList.contains('dark')) return;

            if (body.classList.contains('dark')) {
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