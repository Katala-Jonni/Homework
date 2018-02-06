'use strict';
window.onload = function() {
    const button = document.getElementsByClassName('wrapper-dropdown')[0];
    // Решение 1
    /*
    button.onclick = () =>{
    	button.classList.toggle('active');
    }
    */

    /*
    // Решение 2
    button.onclick = () => {
        if (button.classList.contains('active')) {
            button.classList.remove('active');
        } else {
            button.classList.add('active');
        }
    }
    */

    // Решение 3
    const butChek = document.getElementsByClassName('wrapper-dropdown');
    // Если данный класс повешен много где и только какой-то
    // элемент является выпадающим списком с этим классом,
    // можем задать нужный индекс в конце и убрать цикл
    // const butChek = document.getElementsByClassName('wrapper-dropdown')[0];
    function foo() {
        this.className = this.className.split(' ').reduce(function(classes, item) {
            if (item === 'active') {
                classes.shift();
            } else {
                classes.push(item);
            }
            return classes;
        }, ['active']).join(' ');
    }
    // если на данный класс повешено много выпадающий списков
    for (const btn of butChek) {
        btn.onclick = foo;
    }
    // butChek.onclick = foo;



}