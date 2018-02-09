'use strict';
window.onload = function() {
    // находим нужные элементы
    const navigation = document.getElementsByTagName('nav')[0];
    const secret = document.getElementsByClassName('secret')[0];

    function getNavigation() {
        if (!event.ctrlKey) {
            return;
        }
        if (!event.altKey) {
            return;
        }
        switch (event.code) {
            case 'KeyT':
                navigation.classList.toggle('visible');
                break;
        }
    }
    document.addEventListener('keydown', getNavigation);

    // исходное слово
    const secretWord = [
        'KeyY',
        'KeyT',
        'KeyN',
        'KeyJ',
        'KeyK',
        'KeyJ',
        'KeyU',
        'KeyB',
        'KeyZ'
    ].join('');

    // поступающие клавиши
    const arr = [];

    function getSecret(event) {
        arr.push(event.code);
        const word = arr.join('').substr(-secretWord.length);
        if (word === secretWord) {
            secret.classList.add('visible');
        }
    }

    document.addEventListener('keydown', getSecret);

}