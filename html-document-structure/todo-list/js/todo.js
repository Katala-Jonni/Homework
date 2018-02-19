'use strict';
const list = document.querySelectorAll('input');
const undone = document.querySelector('.undone');
const done = document.querySelector('.done');

Array.from(list).forEach(task => {
    task.addEventListener('click', getResult);
});

function getResult() {
    if (this.hasAttribute('checked')) {
        undone.appendChild(this.parentNode);
        this.removeAttribute('checked');
    } else {
        done.appendChild(this.parentNode);
        this.setAttribute('checked', true);
    }
}