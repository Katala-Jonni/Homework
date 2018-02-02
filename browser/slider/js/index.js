'use strict';
window.onload = function() {
    var img = document.getElementById('slider'); // DOM изображение
    let arr = [ // массив для хранения изображений
        'i/airmax.png',
        'i/airmax-jump.png',
        'i/airmax-playground.png',
        'i/airmax-on-foot.png',
        'i/airmax-top-view.png'
    ];
    img.src = arr[arr.length - 1]; // первое изображение на слайде
    let timer = 5000;
    let step = 0; // шаг
    setInterval(() => {
            img.src = arr[step++ % arr.length]; // индекс изображения
        },
        timer);
}