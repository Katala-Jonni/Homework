'use strict';
// buttons
const btnSeatMap = document.querySelector('#btnSeatMap');
const btnSetFull = document.querySelector('#btnSetFull');
const btnSetEmpty = document.querySelector('#btnSetEmpty');
btnSetFull.setAttribute('disabled', true);
btnSetEmpty.setAttribute('disabled', true);
// other
const plane = document.querySelector('#acSelect');
const seatMapTitle = document.querySelector('#seatMapTitle');
const option = plane.querySelectorAll('option');
const seatMapDiv = document.querySelector('#seatMapDiv');
// bottom info about total order
const totalPax = document.querySelector('#totalPax');
const totalAdult = document.querySelector('#totalAdult');
const totalHalf = document.querySelector('#totalHalf');

const wrap = document.createElement('div');
wrap.className = 'row seating-row text-center';
let fragSeatWrap;

// h2
let count = 1;

btnSetFull.addEventListener('click', onReservation);
btnSetEmpty.addEventListener('click', onFree);
btnSeatMap.addEventListener('click', onViewPlane);

function onReservation() {
    event.preventDefault();
    const reserve = document.querySelectorAll('.seat');
    reserve.forEach(el => {
        const rand = random(1, 3);
        if (rand === 1) {
            el.classList.contains('adult') ? el.classList.add('adult') : el.classList.add('half');
        } else {
            el.classList.contains('half') ? el.classList.add('half') : el.classList.add('adult');
        }
    });
    showSeat();
}


function random(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function onFree() {
    event.preventDefault();
    const empty = document.querySelectorAll('.seat');
    empty.forEach(el => {
        el.classList.remove('adult');
        el.classList.remove('half');
    });
    clearSeat();
}

function onViewPlane() {
    event.preventDefault();
    const searchValue = Array.from(option).find(el => el.value === plane.value);
    seatMapTitle.textContent = searchValue.textContent;
    fetch(`https://neto-api.herokuapp.com/plane/${plane.value}`)
        .then(res => res.json())
        .then(showPlaces);
}

function showPlaces(place) {
    seatMapDiv.textContent = ' ';
    for (let i = 0; i < place.scheme.length; i++) {
        createElement(place, place.scheme[i]);
    }
    count = 1;
    btnSetFull.removeAttribute('disabled');
    btnSetEmpty.removeAttribute('disabled');
    const seat = document.querySelectorAll('.seat');
    seat.forEach(el => el.addEventListener('click', onChangeSeat));
}


function onChangeSeat(elem) {

    if (event.altKey) {
        this.classList.remove('adult');
        this.classList.toggle('half');
    } else {
        this.classList.remove('half');
        this.classList.toggle('adult');
    }
    showSeat();
}

function showSeat() {
    const adult = document.querySelectorAll('.adult');
    const half = document.querySelectorAll('.half');
    totalAdult.textContent = adult.length;
    totalHalf.textContent = half.length;
    totalPax.textContent = adult.length + half.length;
}

function clearSeat() {
    const adult = document.querySelectorAll('.adult');
    const half = document.querySelectorAll('.half');
    totalAdult.textContent = 0;
    totalHalf.textContent = 0;
    totalPax.textContent = 0;
}

function getFragmentSeat(place) {

    const fragSeatFirstHalf = document.createDocumentFragment();
    const fragSeatSecondHalf = document.createDocumentFragment();
    const fullSeat = document.createDocumentFragment();

    for (let key = 0; key < place.letters6.length; key++) {
        if (key < 3) {
            fragSeatFirstHalf.appendChild(getPlaces(place.letters6[key]));
        } else {
            fragSeatSecondHalf.appendChild(getPlaces(place.letters6[key]));
        }
    }
    // фрагменты для 6 мест
    const firstHalfWrap = getPlacesWrap(fragSeatWrap);
    const secondHalfWrap = getPlacesWrap(fragSeatWrap);
    firstHalfWrap.appendChild(fragSeatFirstHalf);
    secondHalfWrap.appendChild(fragSeatSecondHalf);
    fullSeat.appendChild(firstHalfWrap);
    fullSeat.appendChild(secondHalfWrap);

    return fullSeat;
}

function getPlaces(el) {
    return getValidateElement('div', { class: 'col-xs-4 seat' }, [
        getValidateElement('span', { class: 'seat-label' }, el)
    ])
}

function getPlacesNull(el) {
    return getValidateElement('div', { class: 'col-xs-4 no-seat' });
}

function getPlacesWrap(el) {
    el = document.createElement('div');
    el.className = 'col-xs-5';
    return el;
}

function getFragmentFourSeat(place) {

    const fragSeatFirstHalf = document.createDocumentFragment();
    const fragSeatSecondHalf = document.createDocumentFragment();
    const fullSeat = document.createDocumentFragment();
    let nullElement = getPlacesNull(place);
    for (let key = 0; key < place.letters4.length; key++) {
        if (key < 2) {
            fragSeatFirstHalf.appendChild(getPlaces(place.letters4[key]));
        } else {
            fragSeatSecondHalf.appendChild(getPlaces(place.letters4[key]));
        }
    }
    // фрагменты для 4 мест
    const firstHalfWrap = getPlacesWrap(fragSeatWrap);
    const secondHalfWrap = getPlacesWrap(fragSeatWrap);
    firstHalfWrap.appendChild(nullElement);
    firstHalfWrap.appendChild(fragSeatFirstHalf);
    secondHalfWrap.appendChild(fragSeatSecondHalf);
    fullSeat.appendChild(firstHalfWrap);
    fullSeat.appendChild(secondHalfWrap);

    return fullSeat;
}

function getValidateElement(tag, attr, child) {
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

function createElement(place, num) {
    let seat;

    if (num === 0) {
        seat = getPlacesNull(place);
    } else if (num === 4) {
        seat = getFragmentFourSeat(place);
    } else {
        seat = getFragmentSeat(place);
    }

    const wrap = document.createElement('div');
    wrap.className = 'row seating-row text-center';

    const rowNumber = document.createElement('div');
    rowNumber.className = 'col-xs-1 row-number';

    const heading = document.createElement('h2');
    heading.textContent = count++;
    rowNumber.appendChild(heading);
    wrap.appendChild(rowNumber);
    wrap.appendChild(seat);
    seatMapDiv.appendChild(wrap);
    return seatMapDiv;
}