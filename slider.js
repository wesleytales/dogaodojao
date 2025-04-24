const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
let counter = 1;
const slideWidth = slides[0].clientWidth;

slider.style.transform = `translateX(-${slideWidth}px)`;

function slideNext() {
    slider.style.transition = 'transform 0.5s ease-in-out';
    counter++;
    slider.style.transform = `translateX(-${slideWidth * counter}px)`;
}

slider.addEventListener('transitionend', () => {
    if (counter === slides.length - 1) { // Verifica se é o último slide (a cópia)
        setTimeout(() => { // Adiciona um pequeno atraso
            slider.style.transition = 'none';
            counter = 1;
            slider.style.transform = `translateX(-${slideWidth}px)`;
            slider.offsetHeight;
            slider.style.transition = 'transform 0.5s ease-in-out';
        }, 0); // O atraso de 0ms garante que seja executado após a conclusão da transição
    }
});

setInterval(slideNext, 3000);

slides.forEach(slide => {
    slide.addEventListener('click', () => {
        const link = slide.dataset.link;
        if (link) {
            window.location.href = link;
        }
    });
});

