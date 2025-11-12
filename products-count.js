document.addEventListener('DOMContentLoaded', function () {
    let gallery = document.querySelectorAll('.gallery-item');
    let paragraph = document.querySelector('.main__products-number');

    paragraph.textContent = String(gallery.length) + ' products';
})