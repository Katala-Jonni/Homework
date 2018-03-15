'use strict';
// buttons
const btnSeatMap = document.querySelector('#btnSeatMap');
const btnSetFull = document.querySelector('#btnSetFull');
const btnSetEmpty = document.querySelector('#btnSetEmpty');
const plane = document.querySelector('#acSelect');
const seatMapTitle = document.querySelector('#seatMapTitle');
const option = plane.querySelectorAll('option');

btnSeatMap.addEventListener('click', onViewPlane);

function onViewPlane() {
    event.preventDefault();
    //seatMapTitle.textContent = ' ';
    const search = Array.from(option).find(el => el.value === plane.value);
      console.log(search)
          seatMapTitle.textContent = search.textContent
    fetch(`https://neto-api.herokuapp.com/plane/${plane.value}`)
        .then(res => res.json())
        .then(getPlaces)
}

function getPlaces(place) {


    

    //seatMapTitle.textContent
    //	plane.querySelector('option')
    console.log(place);

}