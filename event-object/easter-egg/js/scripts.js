'use strict';
window.onload = function() {
'use strict';

const menu = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];

function menuOpen(event) {
	if (!(event.ctrlKey & event.altKey)) {
		return;
	}
	switch (event.code) {
		case 'KeyT':
			menu.classList.toggle('visible');
			break;
	}
}

const arrSecretWord = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];
let index = 0;

function getSecret(event) {
    if (event.code === arrSecretWord[index]) {
        index++;
        if (index > 8) {
            secret.classList.add('visible');
        }
    } else if (event.code === 'KeyY') {
        index = 1;
    } else {
        index = 0;
    }
}

document.addEventListener('keydown', getSecret);


}