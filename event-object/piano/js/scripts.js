'use strict';
window.onload = function() {
    const piano = document.getElementsByTagName('ul')[0];
    const classes = piano.classList;
    const button = document.getElementsByTagName('li');
    const array_li = Array.from(button);
    const music = document.getElementsByTagName('audio');
    const middle = [
        '/sounds/middle/first.mp3',
        '/sounds/middle/second.mp3',
        '/sounds/middle/third.mp3',
        '/sounds/middle/fourth.mp3',
        '/sounds/middle/fifth.mp3'
    ];
    const lower = [
        '/sounds/lower/first.mp3',
        '/sounds/lower/second.mp3',
        '/sounds/lower/third.mp3',
        '/sounds/lower/fourth.mp3',
        '/sounds/lower/fifth.mp3'
    ];
    const higher = [
        '/sounds/higher/first.mp3',
        '/sounds/higher/second.mp3',
        '/sounds/higher/third.mp3',
        '/sounds/higher/fourth.mp3',
        '/sounds/higher/fifth.mp3'
    ];

    function getOn() {
        if (event.shiftKey) {
            const search = classes.contains('middle');
            if (search) {
                classes.remove('middle');
                classes.add('lower');
            }
        }
        if (event.altKey) {
            const search = classes.contains('middle');
            if (search) {
                classes.remove('middle');
                classes.add('higher');
            }
        }
    }

    function getOf() {
        if (!event.shiftKey) {
            const search = classes.contains('lower');
            if (search) {
                classes.remove('lower');
                classes.add('middle');
            }
        }
        if (!event.altKey) {
            const search = classes.contains('higher');
            if (search) {
                classes.remove('higher');
                classes.add('middle');
            }
        }
    }

    function getSound() {

        const song = this.getElementsByTagName('audio')[0];
        if (event.target.nodeName !== 'LI') return false;
        event.target.clicked = true;

        array_li.forEach(function(el, i) {
            if (!el.clicked) return false;
            if (classes.contains('middle')) {
                song.src = middle[i];
            }
            if (classes.contains('lower')) {
                song.src = lower[i];
            }
            if (classes.contains('higher')) {
                song.src = higher[i];
            }
            el.clicked = undefined;
        });
        song.play();
    };

    document.addEventListener('keydown', getOn);
    document.addEventListener('keyup', getOf);
    array_li.map(btn => btn.addEventListener('click', getSound));
}