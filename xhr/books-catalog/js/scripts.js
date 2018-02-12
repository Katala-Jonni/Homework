'use strict';
const content = document.getElementById('content');
const xhr = new XMLHttpRequest();
xhr.addEventListener('loadstart', onLoadStart);
xhr.addEventListener('load', onLoad);
xhr.addEventListener('error', onError);
xhr.addEventListener('loadend', onLoadEnd);
xhr.open(
    'GET',
    'https://neto-api.herokuapp.com/book/',
    true
);
xhr.send();

function onLoadStart() {
    console.log('LoadStart');
}

function onLoad() {
    const bookList = JSON.parse(xhr.responseText);
    content.innerHTML = '';
    if (xhr.status !== 200) {
        console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
    } else {
        bookList.map((book, i) => {
            content.innerHTML += '<li><img></li>';
            let list = content.getElementsByTagName('li')[i];
            list.getElementsByTagName('img')[0].src = book.cover.small;
            list.dataset.title = book.title;
            list.dataset.author = book.author.name;
            list.dataset.info = book.info;
            list.dataset.price = book.price;
        });
    }
}

function onError() {
    console.log('Ошибка Error');
}

function onLoadEnd() {
    console.log('LoadEnd');
}