'use strict';
const chat = document.querySelector('.chat');
const chatStatus = chat.querySelector('.chat-status');
const messageBox = chat.querySelector('.message-box');
const messageInput = chat.querySelector('.message-input');
const messageSubmit = chat.querySelector('.message-submit');
const messagesContent = chat.querySelector('.messages-content');
const person = chat.querySelector('.message.message-personal');
const buddy = chat.querySelector('.message>figure+span[class="message-text"]').parentElement;
const loading = chat.querySelector('.loading > figure + span');

const socket = new WebSocket('wss://neto-api.herokuapp.com/chat');

socket.addEventListener('open', openSocket);
socket.addEventListener('message', messageSocket);
socket.addEventListener('error', errorSocket);
socket.addEventListener('close', closeSocket);
window.addEventListener('beforeunload', () => socket.close(1000, 'Ваше соединение прервано'));
messageSubmit.addEventListener('click', postMessage);

function openSocket() {
    chatStatus.textContent = chatStatus.dataset.online;
    messageSubmit.disabled = false;
    getMessageStatus('Пользователь в сети');
}

function postMessage(event) {

    event.preventDefault();
    getPersonMessage();
    socket.send(messageInput.value);
    messageInput.value = "";
}

function getPersonMessage() {

    const clonePerson = person.cloneNode(true);
    clonePerson.innerHTML = '';
    clonePerson.innerHTML += `<span class="message-text">${messageInput.value}</span>
    						<div class="timestamp">${getTime(new Date)}</div>`;
    messagesContent.appendChild(clonePerson);
}

function messageSocket() {

    if (event.data === '...') {
        getLoading();
    }
    getRemoveLoading();
    getBuddyMessage(event.data);
}

function getLoading() {
    const newDivElement = document.createElement('div');
    newDivElement.className = 'message info';
    loading.textContent = 'Собеседник печатает сообщение';
    newDivElement.appendChild(loading);
    messagesContent.appendChild(newDivElement);
}

function getRemoveLoading() {
    const removeLoad = chat.querySelectorAll('.message.info');
    if (!removeLoad) return;
    Array.from(removeLoad).forEach(el => el.parentElement.removeChild(el));
}

function getBuddyMessage(event) {

    const cloneBuddy = buddy.cloneNode(true);
    cloneBuddy.innerHTML = '';
    cloneBuddy.innerHTML += `<figure class="avatar"><img src="./i/profile-80.jpg" /></figure>
							<span class="message-text">${event}</span>
    						<div class="timestamp">${getTime(new Date)}</div>`;
    messagesContent.appendChild(cloneBuddy);
}

function getTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    return (`${hours}:${minutes}`);
}

function closeSocket() {
    chatStatus.textContent = chatStatus.dataset.offline;
    messageSubmit.disabled = true;
    getMessageStatus('Пользователь не в сети');
}

function getMessageStatus(statusText) {
    const messageWrapper = chat.querySelector(`.message.message-status`).cloneNode(false);
    messageWrapper.innerHTML = `<span class="message-text">${statusText}</span>`;
    messagesContent.appendChild(messageWrapper);
    messagesContent.removeChild(messagesContent.firstChild);
}

function errorSocket(error) {
    console.log(error.data);
}