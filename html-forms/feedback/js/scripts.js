'use strict';
document.addEventListener('DOMContentLoaded', getFeedback);

function getFeedback() {
    // inputs
    const inputs = document.querySelectorAll('input, textarea');
    // submit
    const submit = document.querySelector('button[type = "submit"]');
    // edit submit
    const editButton = document.querySelector('main button.button-contact');
    // form
    const form = document.querySelector('form.contentform');
    // message section
    const main = document.getElementById('output');
    // validate every input
    inputs.forEach(input => {
        input.addEventListener('input', getCompleteInput);
    });
    // validate index
    function regExp(string) {
        return string.replace(/\D/g, '');
    }
    // function - validate input and index
    function getCompleteInput() {
        const forbidEntry = Array.from(inputs).find(input => input.name === 'zip');
        forbidEntry.value = regExp(forbidEntry.value);
        const values = Array.from(inputs).every(input => input.value);
        if (values) {
            submit.disabled = false;
        } else {
            submit.disabled = true;
        }
    }

    submit.addEventListener('click', getMessage);
    editButton.addEventListener('click', getMessage);

    function getMessage(event) {
        event.preventDefault();
        inputs.forEach(input => {
            const text = main.querySelector(`output#${input['name']}`);
            if (text) {
                text.value = input.value;
            }
        });
        form.classList.contains('hidden') ? form.classList.remove('hidden') : form.classList.add('hidden');
        main.classList.contains('hidden') ? main.classList.remove('hidden') : main.classList.add('hidden');
    }
}