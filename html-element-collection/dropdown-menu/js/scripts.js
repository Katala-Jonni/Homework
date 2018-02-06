'use strict';
window.onload = function() {
    // button
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
    // если на данный класс повешено много выпадающих списков
    for (const btn of butChek) {
        btn.onclick = foo;
    }
    // button.onclick = foo;



}