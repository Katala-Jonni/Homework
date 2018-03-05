'use strict';
// sign-in
const signIn = document.querySelector('.sign-in-htm');
const signInSubmit = signIn.querySelector('.button');
const signInOutput = signIn.querySelector('.error-message');
const signInUrl = 'https://neto-api.herokuapp.com/signin';

// sign-up
const signUp = document.querySelector('.sign-up-htm');
const signUpSubmit = signUp.querySelector('.button');
const signUpOutput = signUp.querySelector('.error-message');
const signUpUrl = 'https://neto-api.herokuapp.com/signup';

signInSubmit.addEventListener('click', onSignIn);
signUpSubmit.addEventListener('click', onSignUp);

function onSignIn(event) {
    event.preventDefault(event);
    getAuthorization(signInUrl, new FormData(signIn));
}

function onSignUp(event) {
    event.preventDefault(event);
    getAuthorization(signUpUrl, new FormData(signUp));
}

function getAuthorization(url, data) {
    const formData = {};
    for (let key of data) {
        formData[key[0]] = key[1];
    }
    fetch(url, {
            body: JSON.stringify(formData),
            credentials: 'same-origin',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if (200 <= res.status && res.status < 300) {
                return res;
            }
            throw new Error(response.statusText);
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                throw new Error(res.message);
            }
            switch (url) {
                case signInUrl:
                    signInOutput.textContent = `«Пользователь ${res.name} успешно авторизован»`;
                    break;
                case signUpUrl:
                    signUpOutput.textContent = `Пользователь ${res.name} успешно зарегистрирован`;
                    break;
            }
        })
        .catch(error => {
            switch (url) {
                case signInUrl:
                    signInOutput.textContent = error.message;
                    break;
                case signUpUrl:
                    signUpOutput.textContent = error.message;
                    break;
            }
        });
}