'use strict';
document.addEventListener('DOMContentLoaded', getSlider);

function getSlider() {
    // buttons
    const prev = document.querySelector('a[data-action = "prev"]');
    const next = document.querySelector('a[data-action = "next"]');
    const first = document.querySelector('a[data-action="first"]');
    const last = document.querySelector('a[data-action="last"]');
    // clicks
    prev.addEventListener('click', event => getSlide('prev'));
    next.addEventListener('click', event => getSlide('next'));
    first.addEventListener('click', event => getSlide('first'));
    last.addEventListener('click', event => getSlide('last'));

    // first slide
    firstSlide();

    function firstSlide() {
        const activeSlide = document.querySelector('li').classList.add('slide-current');
        prev.classList.add('disabled');
        first.classList.add('disabled');
    }

    // slide
    function getSlide(element) {
        const slide = document.querySelector('.slide-current');
        let activeSlide;

        switch (element) {
            case 'next':
                activeSlide = slide.nextElementSibling;
                break;
            case 'prev':
                activeSlide = slide.previousElementSibling;
                break;
            case 'first':
                activeSlide = slide.parentElement.firstElementChild;
                break;
            case 'last':
                activeSlide = slide.parentElement.lastElementChild;
                break;
        }

        slide.classList.remove('slide-current');
        activeSlide.classList.add('slide-current');
        activeSlide.nextElementSibling ? next.classList.remove('disabled') : next.classList.add('disabled');
        activeSlide.nextElementSibling ? last.classList.remove('disabled') : last.classList.add('disabled');
        activeSlide.previousElementSibling ? prev.classList.remove('disabled') : prev.classList.add('disabled');
        activeSlide.previousElementSibling ? first.classList.remove('disabled') : first.classList.add('disabled');
    }
}