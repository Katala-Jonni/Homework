'use strinct';
const socket = new WebSocket('wss://neto-api.herokuapp.com/mouse');
console.log(socket);
socket.addEventListener('open', () => console.log('Открыто'));
window.addEventListener('click', getClick);

function getClick(event) {
    socket.send(JSON.stringify({
        x: event.pageX,
        y: event.pageY
    }));
}
socket.addEventListener('error', () => console.log('error'));
socket.addEventListener('close', () => console.log('закрыто'));

showBubbles(socket);