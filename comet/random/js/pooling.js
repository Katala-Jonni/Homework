'use strict';

setInterval(() => {
    fetch('https://neto-api.herokuapp.com/comet/pooling')
        .then(res => res.json())
        .then(showGenerate)
        .catch(error => console.log(`Произошла ошибка: ${error}`));
}, 5000);

function showGenerate(res) {
    const pooling = document.querySelectorAll('.pooling div');
    removeClass(pooling);
    addClass(findElement(pooling, res));
}

function removeClass(elem) {
    for (let key of elem) {
        key.classList.remove('flip-it');
    }
}

function addClass(elem){
	elem.classList.add('flip-it');
}

function findElement(elem, data){
	return Array.from(elem).find(el => +el.textContent === data);
}