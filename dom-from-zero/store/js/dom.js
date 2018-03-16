'use strict';

function createElement(block) {

    if ((typeof block === 'string') || (typeof block === 'number')) {
        return document.createTextNode(block.toString());
    }
    if ((block === undefined) || (block === null) || (block === false)) {
        return document.createTextNode('');
    }
    if (block instanceof Array) {
        return block.reduce(function(frag, elem) {
            frag.appendChild(createElement(elem));
            return frag;
        }, document.createDocumentFragment());
    }

    const element = document.createElement(block.name || 'div');
    block.props && Object.keys(block.props).forEach(function(key) {
        if (block.props[key]) element.setAttribute(key, block.props[key]);
    });

    if (block.childs) element.appendChild(createElement(block.childs));

    return element;
}