'use strict';
document.addEventListener('DOMContentLoaded', getResult);

function getResult() {
    // count task
    let count = 0;
    // indicator end tasks
    const listTasks = document.querySelector('.list-block');
    // tasks
    const tasks = document.getElementsByTagName('input');
    // total tasks
    const totalTasks = document.querySelector('output');

    for (let task of tasks) {
        task.addEventListener('click', getTasks);
    }
    Array.from(tasks).filter(task => task.checked ? getTasks.call(task) : totalTasks.value = `${count} из ${tasks.length}`);

    function getTasks() {
        if (this.checked) {
            totalTasks.value = `${++count} из ${tasks.length}`;
        } else {
            totalTasks.value = `${--count} из ${tasks.length}`;
        }
        count === tasks.length ? listTasks.classList.add('complete') : listTasks.classList.remove('complete');
    }
}