'use strict';
window.onload = function() {
    // button
    const button = document.getElementsByClassName('drum-kit__drum');

    for (let btn of button) {
        btn.onclick = () => {
            btn.getElementsByTagName('audio')[0].play();
        }
    }
}