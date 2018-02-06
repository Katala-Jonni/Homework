'use strict';
window.onload = function() {
    // title a song
    const title = document.getElementsByTagName('span')[0];
    // audio
    const audioElem = document.getElementsByTagName('audio')[0];
    // next
    const nextButton = document.getElementsByClassName('next')[0];
    // back
    const backButton = document.getElementsByClassName('back')[0];
    // stop
    const stop = document.getElementsByClassName('stop')[0];
    // play
    const buttonPlay = document.getElementsByClassName('playstate')[0];
    // visual
    const mediaplayer = document.getElementsByClassName('mediaplayer')[0];
    // step of array
    let count = 0;
    // collection classes
    const searchClass = mediaplayer.classList;
    // array with title of song
    const arr = [
        'LA Chill Tour',
        'LA Fusion Jam',
        'This is it band'
    ];
    // array with song
    const mp3 = [
        '/mp3/LA Chill Tour.mp3',
        '/mp3/LA Fusion Jam.mp3',
        '/mp3/This is it band.mp3'
    ];
    // remove class
    function removeClass() {
        searchClass.remove('play');
    }
    // click play
    buttonPlay.onclick = () => {
        mediaplayer.classList.toggle('play') ? audioElem.play() : audioElem.pause()
    }
    // click next
    nextButton.onclick = () => {
        count = ++count % arr.length;
        title.title = arr[count];
        audioElem.src = mp3[count];
        removeClass();
    }
    // click back
    backButton.onclick = () => {
        count = (count + arr.length - 1) % arr.length;
        title.title = arr[count];
        audioElem.src = mp3[count];
        removeClass();
    }
    // click stop
    stop.onclick = () => {
        audioElem.pause();
        audioElem.currentTime = 0;
        removeClass();
    }
}