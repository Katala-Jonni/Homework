'use strict';

const socket = new WebSocket('wss://neto-api.herokuapp.com/draw');

window.editor.addEventListener('update', event => canvas.toBlob(img => socket.send(img)));