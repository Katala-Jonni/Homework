'use strict';
window.onload = function(){
	const img = document.getElementById('currentPhoto'); // DOM изображения
	const prev = document.getElementById('prevPhoto'); // Назад
	const next = document.getElementById('nextPhoto'); // Вперед
	let arr = [ // массив изображений
	    'i/breuer-building.jpg',
	    'i/guggenheim-museum.jpg',
	    'i/headquarters.jpg', 'i/IAC.jpg',
	    'i/new-museum.jpg'
	];
	let step = 0; // шаг
	img.src = arr[step]; // первое изображение
	next.onclick = function() { // листаем вперед
	    step = (step + 1) % arr.length;
	    img.src = arr[step];
	}
	prev.onclick = function() { // листаем назад
	    step = (step + arr.length - 1) % arr.length;
	    img.src = arr[step];
	}
}


