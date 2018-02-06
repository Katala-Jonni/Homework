'use strict';
window.onload = function() {
    const button = document.getElementsByClassName('drum-kit__drum');

    for (let btn of button) {
        btn.onclick = () => {
            const a = btn.getElementsByTagName('audio')[0].play();
        }
    }
}