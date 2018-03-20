'use strict';
document.addEventListener('DOMContentLoaded', getSlider);

function getSlider() {

    // buttons
    const prev = document.querySelector('a[data-action = "prev"]');
    const next = document.querySelector('a[data-action = "next"]');
    const first = document.querySelector('a[data-action="first"]');
    const last = document.querySelector('a[data-action="last"]');

    const slides = document.querySelector('.slides').firstElementChild.classList.add('slide-current');

    let activeSlide = document.querySelector('.slide-current');

    next.addEventListener('click', getSlide);
    last.addEventListener('click', getSlide);
    prev.addEventListener('click', getSlide);
    first.addEventListener('click', getSlide);

    function checkActiveSlide() {
        if (!activeSlide.previousElementSibling) {
            prev.classList.add('disabled');
            first.classList.add('disabled');
        } else {
            prev.classList.remove('disabled');
            first.classList.remove('disabled');
        }

        if (!activeSlide.nextElementSibling) {
            next.classList.add('disabled');
            last.classList.add('disabled');
        } else {
            next.classList.remove('disabled');
            last.classList.remove('disabled');

        }
    }

    checkActiveSlide();

    // slide

    function getSlide(click) {
        if(event.currentTarget.classList.contains('disabled')){
            return;
        }
        activeSlide.classList.remove('slide-current');

        switch (click.target) {
            case next:
                activeSlide = activeSlide.nextElementSibling;
                break;
            case prev:
                activeSlide = activeSlide.previousElementSibling;
                break;
            case first:
                activeSlide = activeSlide.parentElement.firstElementChild;
                break;
            case last:
                activeSlide = activeSlide.parentElement.lastElementChild;
                break;
        }

        activeSlide.classList.add('slide-current');
        checkActiveSlide();
    }
}