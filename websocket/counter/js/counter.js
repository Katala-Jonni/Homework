'use strict';
const counter = document.querySelector('.counter');
const errors = document.querySelector('output.errors');

const socket = new WebSocket('wss://neto-api.herokuapp.com/counter');
socket.addEventListener('open', () => {});
socket.addEventListener('message', getCounter);

function getCounter() {
    let message = JSON.parse(event.data);
    counter.textContent = message.connections;
    errors.value = message.errors;
}

window.addEventListener('beforeunload', () => {
    socket.addEventListener('close', () => {});
    socket.close(1000, 'Соединение завершено');
});