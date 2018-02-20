function getPriceFormatted(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function onDOMContentLoaded() {
    let price = 0;
    let count = 0;
    let totalPrice = document.querySelector('span#cart-count');
    let cartTotalPrice = document.querySelector('span#cart-total-price');
    document.querySelectorAll('button.add').forEach(btn => btn.addEventListener('click', addGoods));

    function addGoods() {
        price += Number(this.dataset.price);
        totalPrice.innerHTML = ++count;
        cartTotalPrice.innerHTML = getPriceFormatted(price);
    }
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);