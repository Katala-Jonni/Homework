'use strict';
document.addEventListener('DOMContentLoaded', getResult);

function getResult() {
    const tabHeader = document.querySelectorAll('nav a');
    const preloader = document.querySelector('#preloader');
    const content = document.querySelector('#content');
    const xhr = new XMLHttpRequest();

    for (let clickHeader of tabHeader) {
        clickHeader.addEventListener('click', getActive);
    }
    
    getActive.call(tabHeader[0]);

    function getActive(event) {

        if (event) {
            event.preventDefault();
        }
        for (let key of tabHeader) {
            key.classList.remove('active');
        }
        this.classList.add('active');
        let link = this.href;

        xhr.addEventListener('loadstart', onLoadStart);
        xhr.addEventListener('load', onLoad);
        xhr.addEventListener('loadend', onLoadEnd);
        xhr.open('GET', link, true);
        xhr.send();
    }

    function onLoadStart() {
        preloader.classList.remove('hidden');
    }

    function onLoad() {
        content.innerHTML = xhr.responseText;
    }

    function onLoadEnd() {
        preloader.classList.add('hidden');
    }
}