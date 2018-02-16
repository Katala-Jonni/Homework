'use strict';
document.addEventListener('DOMContentLoaded', getcurrencyConverter);

function getcurrencyConverter() {
    // loader
    const loader = document.getElementById('loader').classList;
    // content
    const content = document.getElementById('content').classList;
    // change from
    const selectFrom = document.querySelector('#from');
    // change to
    const selectTo = document.querySelector('#to');
    // enter value
    const amount = document.getElementById('source');
    // result change
    const result = document.getElementById('result');
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('loadstart', onLoadStart);
    xhr.addEventListener('load', onLoad);
    xhr.addEventListener('error', onError);
    xhr.addEventListener('loadend', onLoadEnd);
    xhr.open(
        'GET',
        'https://neto-api.herokuapp.com/currency',
        true
    );
    xhr.send();
    
    // view loader
    function onLoadStart() {
        console.log('onLoadStart');
        if (loader.contains('hidden')) {
            loader.remove('hidden');
            content.add('hidden');
        }
    }
    // load xhr
    function onLoad() {
        const currencyList = JSON.parse(xhr.responseText);
        if (xhr.status === 200) {
            currencyList.forEach((currency) => {
                selectFrom.innerHTML += `<option title=${currency.title} value='${currency.value}'>${currency.code}</option>`;
                selectTo.innerHTML += `<option title=${currency.title} value='${currency.value}'>${currency.code}</option>`;
                amount.addEventListener('input', () => {
                    getResult();
                });
                selectFrom.addEventListener('input', () => {
                    getResult();
                });
                selectTo.addEventListener('input', () => {
                    getResult();
                });
            });
        } else {
            console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        }
    }
    // result
    function getResult() {
        result.value = amount.value * (selectFrom.value / selectTo.value);
        const sum = result.value.split('');
        const search = sum.indexOf('.');
        if (search === -1) {
            sum.push('.00');
            result.value = sum.join('');
        } else {
            sum.length = search + 3;
            result.value = sum.join('');
        }
    }
    // error connected
    function onError() {
        console.log('Error: ошибка сети!');
    }
    // hidden loader
    function onLoadEnd() {
        console.log('onLoadEnd');
        if (!(loader.contains('hidden'))) {
            loader.add('hidden');
            content.remove('hidden');
        }
        getResult();
    }
}