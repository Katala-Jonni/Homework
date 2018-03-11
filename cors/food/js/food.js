'use strict';

const pic = document.querySelector('[data-pic]');
const title = document.querySelector('[data-title]');
const ingredients = document.querySelector('[data-ingredients]');
const rating = document.querySelector('[data-rating]');
const star = document.querySelector('[data-star]');
const votes = document.querySelector('[data-votes]');
const consumers = document.querySelector('[data-consumers]');

const urlFood = 'https://neto-api.herokuapp.com/food/42';
const urlFoodRating = 'https://neto-api.herokuapp.com/food/42/rating';
const urlFoodConsumers = 'https://neto-api.herokuapp.com/food/42/consumers';


loadData(urlFood)
    .then(getInfoFood)
    .catch(error => console.log(error.message));

loadData(urlFoodRating)
    .then(getFoodRating)
    .catch(error => console.log(error.message));

loadData(urlFoodConsumers)
    .then(getFoodConsumers)
    .catch(error => console.log(error.message));

function loadData(data) {
    return new Promise((resolve, reject) => {
    	const parseFood = getRandom('callback');
        window[parseFood] = resolve;
        const script = document.createElement('script');
        script.src = `${data}?jsonp=${parseFood}`;
        document.body.appendChild(script);
    });
}

function getRandom(elem) {
    return elem + Math.round(Math.random() * 1000);
}

function getInfoFood(data) {
    pic.style.backgroundImage = `url(${data.pic})`;
    title.textContent = data.title;
    ingredients.textContent = data.ingredients.join(', ');
}


function getFoodRating(rate) {
    const countStar = (rate.rating * 100) / 10;
    star.style.width = `${countStar}%`;
    rating.textContent = rate.rating.toFixed(2);
    votes.textContent = `(${rate.votes} оценок)`;
}

function getFoodConsumers(data) {
    for (let user of data.consumers) {
        consumers.innerHTML += `<img src=${user.pic} title=${user.name}>`;
    }
    consumers.innerHTML += `<span>(+${data.total})</span>`;
}
