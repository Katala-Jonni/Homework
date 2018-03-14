'use strict';

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

window.addEventListener('resize', onResize);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
canvas.addEventListener('mouseleave', onMouseLeave);
canvas.addEventListener('dblclick', onDblClick);


const curves = [];
// shift
let weird = false;
// зажата левая кнопка или нет
let drawing = false;
// массив curves изменился или нет
let needsRepaint = false;
// толщина линии
let brush = 100;
// линия true/false
let brushSize = false;
// значение цвета
let countColor = 0;

function getColor() {
    if (weird) {
        if (countColor <= 0) {
            return countColor;
        }
        countColor--;
    } else {
        if (countColor >= 359) {
            return countColor;
        }
        countColor++;
    }
    return countColor;
}

function getLineWidth() {
    if (brushSize) {
        if (brush <= 5) {
            brushSize = false;
            brush++;
        } else {
            brush--;
        }

    } else {
        if (brush >= 100) {
            brushSize = true;
            brush--;
        } else {
            brush++;
        }
    }
}

setCanvasSize();


// линия Безье
function smoothCurveBetween(p1, p2) {
    ctx.lineWidth = p1.brush;
    ctx.strokeStyle = `hsl(${p1.countColor},100%,50%)`;
    const cp = p1.map((coord, idx) => (coord + p2[idx]) / 2);
    ctx.quadraticCurveTo(...p1, ...cp);
}

// точки
function smoothCurve(points) {
    ctx.beginPath();
    ctx.lineWidth = points.brush;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.moveTo(...points[0]);
    for (let i = 1; i < points.length - 1; i++) {
        smoothCurveBetween(points[i], points[i + 1]);
    }
    ctx.stroke();
}
// начальная точка
function circle(points) {
    ctx.beginPath();
    ctx.fillStyle = `hsl(${points.countColor}, 100%, 50%)`;
    ctx.arc(...points, points.brush / 2, 0, Math.PI * 2);
    ctx.fill();
}
// размер холста
function setCanvasSize() {
    canvas.width = window.screen.availWidth;
    canvas.height = window.screen.availHeight;
}

function onResize() {
    clearCanvas();
    curves.length = 0;
    needsRepaint = true;
}

function onMouseMove() {
    if (drawing) {
        weird = event.shiftKey;
        const point = [event.offsetX, event.offsetY];
        point.countColor = countColor;
        point.brush = brush;
        curves[curves.length - 1].push(point);
        needsRepaint = true;
    }
}

function onMouseDown() {
    drawing = true;
    weird = event.shiftKey;
    const curve = [];
    const point = [event.offsetX, event.offsetY];
    point.countColor = countColor;
    point.brush = brush;
    curve.push(point);
    curves.push(curve);
    needsRepaint = true;
}

function onMouseUp() {
    drawing = false;
}

function onMouseLeave() {
    drawing = false;
}

function onDblClick() {
    clearCanvas();
    curves.length = 0;
    needsRepaint = true;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function rendering() {
    clearCanvas();
    curves.forEach(curve => {
        circle(curve[0]);
        smoothCurve(curve);
    });
}

function tick() {

    getColor();
    getLineWidth();

    if (needsRepaint) {
        rendering();
        needsRepaint = false;
    }

    window.requestAnimationFrame(tick);
}

tick();