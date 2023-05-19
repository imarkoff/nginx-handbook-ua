let currentPath = decodeURIComponent(window.location.pathname);
let links = document.querySelectorAll('.nav-link');

links.forEach(function(link) {
    if (link.getAttribute('href') === currentPath) {
        link.parentElement.parentElement.classList.add('show');
        link.classList.add('active');
        link.setAttribute('href', '#');
    }
});