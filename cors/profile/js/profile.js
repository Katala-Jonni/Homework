'use strict';
const content = document.querySelector('.content');
const pic = document.querySelector('[data-pic]');
const name = document.querySelector('[data-name]');
const position = document.querySelector('[data-position]');
const description = document.querySelector('[data-description]');
const technologies = document.querySelector('[data-technologies]');
const profileUrl = 'https://neto-api.herokuapp.com/profile/me?jsonp=parseProfile';

loadDataProfile(profileUrl)
    .then(getPofile)
    .catch(error => console.log(error.message));


function loadDataProfile(data) {
    return new Promise((resolve, reject) => {
        window.parseProfile = resolve;
        const script = document.createElement('script');
        script.src = data;
        document.body.appendChild(script);
    });
}

function getPofile(profile) {
    pic.src = profile.pic;
    name.textContent = profile.name;
    position.textContent = profile.position;
    description.textContent = profile.description;
    getTechnologiesUrl(profile.id);
    content.style.display = 'initial';
}

function getTechnologiesUrl(id) {
    loadDataTechnologies(`https://neto-api.herokuapp.com/profile/${id}/technologies?jsonp=parseTechnologies`)
        .then(res => {
            for (let tech of res) {
                technologies.innerHTML += `<span class="devicons devicons-${tech}"></span>`;
            }
        })
        .catch(error => console.log(error.message));
}

function loadDataTechnologies(data) {
    return new Promise((resolve, reject) => {
        window.parseTechnologies = resolve;
        const script = document.createElement('script');
        script.src = data;
        document.body.appendChild(script);
    });
}