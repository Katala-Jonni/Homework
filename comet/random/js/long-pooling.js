'use strict';

showLongPooling();

function showLongPooling() {
    const long = document.querySelectorAll('.long-pooling div');

    fetch('https://neto-api.herokuapp.com/comet/long-pooling')
        .then(res => res.json())
        .then(res => {
            removeClass(long);
            addClass(findElement(long, res));
        })
        .then(showLongPooling)
        .catch(error => console.log(`Произошла ошибка: ${error}`));
}