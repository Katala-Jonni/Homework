'use strict';
const wallpaper = document.querySelector('img[data-wallpaper]');
const username = document.querySelector('h3[data-username]');
const description = document.querySelector('p[data-description]');
const pic = document.querySelector('img[data-pic]');
const tweets = document.querySelector('output[data-tweets]');
const followers = document.querySelector('output[data-followers]');
const following = document.querySelector('output[data-following]');

function loadData(url) {
    return new Promise((resolve, reject) => {
        window.functionName = resolve;
        const script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);
    });
}

function callback(data) {
    wallpaper.src = data.wallpaper;
    username.textContent = data.username;
    description.textContent = data.description;
    pic.src = data.pic;
    tweets.value = data.tweets;
    followers.value = data.followers;
    following.value = data.following;
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp?jsonp=functionName')
    .then(res => callback(res))
    .catch(er => console.log(er));