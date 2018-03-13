'use strict';
const canvas = document.querySelector('canvas');
//canvas.style.backgroundColor = 'black';
const ctx = canvas.getContext('2d');

canvas.addEventListener('click', generateCanvas);


function generateCanvas() {
    // очищаем холст от прошлой прорисовки
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const star = getRandom(200, 400);
    for (let key = 0; key < star; key++) {
        // размер, яркость, x, y
        const size = getRandom(0, 1.1);
        const bright = getRandom(0.8, 1);
        const x = getRandom(0, canvas.width);
        const y = getRandom(0, canvas.height);
        getCanvas(x, y, size, getColor(), bright);
    }
}

function getCanvas(x, y, size, color, bright) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.globalAlpha = bright;
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
}



function getColor() {
    const color = Math.floor(getRandom(0, 3));
    switch (color) {
        case 0:
            return '#ffffff';
            break;
        case 1:
            return '#ffe9c4';
            break;
        case 2:
            return '#d4fbff';
            break;
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}