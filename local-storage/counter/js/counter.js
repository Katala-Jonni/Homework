'use strict';

const counter = document.querySelector('#counter');
const increment = document.querySelector('#increment');
const decrement = document.querySelector('#decrement');
const reset = document.querySelector('#reset');

localStorage.counter ? counter.textContent = localStorage.counter : counter.textContent = 0;

increment.addEventListener('click', getCounter);
decrement.addEventListener('click', getCounter);
reset.addEventListener('click', getCounter);

function getCounter() {

    if (event.target.id === 'increment') {
        counter.textContent = ++counter.textContent;

    }
    if (event.target.id === 'decrement') {
        if (counter.textContent === '0') return;
        counter.textContent = --counter.textContent;
    }
    if (event.target.id === 'reset') {
        counter.textContent = 0;
    }

    getLocalStorage(counter.textContent);
}

function getLocalStorage(element) {
    localStorage.counter = element;
}