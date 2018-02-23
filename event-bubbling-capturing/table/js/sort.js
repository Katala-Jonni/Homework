'use strict';

function handleTableClick(event) {

    if (event.target.tagName === 'TD') return;

    table.dataset.sortBy = event.target.dataset.propName;
    let field = event.target.dataset.propName;
    let direction = (event.target.dataset.dir === '-1') ? event.target.dataset.dir = '1' : event.target.dataset.dir = '-1';

    sortTable(field, direction);

}