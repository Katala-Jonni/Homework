'use strict';
window.onload = function() {
    const button = document.getElementsByClassName('drum-kit__drum');

    for (let btn of button) {
        btn.onclick = () => {
            const song = btn.getElementsByTagName('audio')[0];
            song.pause();
            song.currentTime = 0;
            song.play();
        }
    }
}