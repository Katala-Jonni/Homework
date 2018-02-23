'use strict';

list.addEventListener('click', calcCart);

function calcCart(){
	if(!(event.target.dataset.title)) return;
	addToCart(event.target.dataset);
}