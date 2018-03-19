'use strict';
const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');

ws.addEventListener('message', event => {
    const count = document.querySelectorAll('.websocket div');
    removeClass(count);
    addClass(findElement(count, +event.data));
});

ws.addEventListener('error', error => {
    console.log(`Произошла ошибка: ${error.data}`);
});