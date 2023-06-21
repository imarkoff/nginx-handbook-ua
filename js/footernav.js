/* Кнопки назад / далі */

// індекс поточної сторінки в сайдбарі
const currentPage = parseInt($(".nav-link.active").attr("index"));

// функція отримання посилання на сторінку з заданим індексом
getPage = function(index) {
    return $("a.nav-link[index='" + (index) + "']").attr("href");
}

// Додавання посилання на кнопку за індексом сторінки
addLink = function(button, index) {
    // якщо сторінка з таким індексом існує
    if (getPage(index)) {
        button.attr("href", getPage(index));
    }
    
    else {
        button.addClass("disabled"); // робить кнопку неактивною
    }
}

// додавання посилань для кнопок назад / далі
addLink($("#btn-prev"), currentPage - 1);
addLink($("#btn-next"), currentPage + 1);