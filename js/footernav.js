// поточна сторінка
const currentPage = parseInt($(".nav-link.active").attr("index"));

// Отримання посилання на сторінку з заданим індексом
getPage = function(index) {
    return $("a.nav-link[index='" + (index) + "']").attr("href");
}

// Додавання посилання на кнопку за індексом сторінки
addLink = function(button, index) {
    if (getPage(index)) {
        button.attr("href", getPage(index));
    }
    
    else {
        button.addClass("disabled");
    }
}

addLink($("#btn-prev"), currentPage-1);
addLink($("#btn-next"), currentPage+1);