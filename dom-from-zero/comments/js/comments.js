'use strict';

function showComments(list) {

    const commentsContainer = document.querySelector('.comments');
    const comments = list.map(createComment) //.join('');
    const fragment = comments.reduce((frag, elem) => {
        frag.appendChild(elem);
        return frag;
    }, document.createDocumentFragment());

    commentsContainer.appendChild(fragment);
    commentsContainer.style.whiteSpace = 'pre-line';
}

function el(tag, attr, child) {

    const elem = document.createElement(tag);
    if (typeof attr === 'object') {
        Object.keys(attr).forEach(el => elem.setAttribute(el, attr[el]));
    }
    if (typeof child === 'string' || typeof child === 'number') {
        elem.textContent = child;
    } else if (child instanceof Array) {
        child.forEach(el => elem.appendChild(el));
    }
    return elem;
}

function createComment(comment) {
    return el('div', { class: 'comment-wrap' }, [
        el('div', { class: 'photo', title: comment.author.name }, [
            el('div', { class: 'avatar', style: `background-image: url(${comment.author.pic})` })
        ]),
        el('div', { class: 'comment-block' }, [
            el('p', { class: 'comment-text' }, `${comment.text}`),
            el('div', { class: 'bottom-comment' }, [
                el('div', { class: 'comment-date' }, `${new Date(comment.date).toLocaleString('ru-Ru')}`), ///
                el('ul', { class: 'comment-actions' }, [
                    el('li', { class: 'complain' }, `Пожаловаться`),
                    el('li', { class: 'reply' }, `Ответить`)
                ])
            ])
        ])
    ]);
}

fetch('https://neto-api.herokuapp.com/comments')
    .then(res => res.json())
    .then(showComments);