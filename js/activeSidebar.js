/* Підсвічує сторінку в сайдбарі, на якій ми наразі знаходимось */

let currentPath = decodeURIComponent(window.location.pathname); // сторінка, на якій ми наразі знаходимося
let links = document.querySelectorAll('.nav-link'); // всі посилання, що в сайдбарі

// дивиться, на якій ми зараз сторінці
links.forEach(function(link) {
    // якщо посилання на сторінку рівна тій, на якій ми наразі знаходимося
    if (link.getAttribute('href') === currentPath) {
        // додає класи, які позначають об'єкт за активний
        link.parentElement.parentElement.classList.add('show');
        link.classList.add('active');

        link.setAttribute('href', '#'); // видаляє посилання, де ми наразі знаходимося
    }
});