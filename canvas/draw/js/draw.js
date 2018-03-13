'use strict';
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');
console.log(ctx);

ctx.beginPath();
ctx.fill();


setCanvasSize();

function onResize(){
	clearCanvas();
	setCanvasSize();
}

function setCanvasSize(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}


window.addEventListener('resize', onResize);
canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', onMouseDown);
canvas.addEventListener('mouseup', onMouseUp);
// canvas.addEventListener('mouseenter', onMouseEnter);
canvas.addEventListener('mouseleave', onMouseLeave);
canvas.addEventListener('dblclick', onDblClick);

function onResize(){
	console.log('resize');
}
function onMouseMove(){
	console.log('onMouseMove');
}
function onMouseDown(){
	console.log('onMouseDown');
}
function onMouseUp(){
	console.log('onMouseUp');
}
/*function onMouseEnter(){
	console.log('onMouseEnter');
}*/
function  onMouseLeave(){
	console.log('resize');
}
function  onDblClick(){
	console.log('onDblClick');
	clearCanvas();
}

function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}