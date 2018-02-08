'use stict';
window.onload = function() {
    const button = document.getElementsByTagName('a');
    const view = document.getElementById('view');

    function getAnimate() {
        event.preventDefault();
        for (let btn of button) {
            btn.classList.remove('gallery-current');
        }
        let img = this.getElementsByTagName('img')[0];
        this.classList.add('gallery-current');
        view.src = this.href;
        view.title = img.title;
    }
    for (let btn of button) {
        btn.addEventListener('click', getAnimate);
    }
}