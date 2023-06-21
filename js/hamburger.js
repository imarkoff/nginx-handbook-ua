/* Кнопка меню та реагує на зміну ширини сторінки */

// додає / видаляє клас сховано для головної сторінки і самого сайдбару
function toggleHidden() {
    $(".sidebar").toggleClass('hidden');
    $("main").toggleClass('submenu_hidden');
}

// перевіряє розмір екрану
function resizeToggle() {
    // ховає меню, якщо ширина екрану менше ніж 960px
    if ($(window).width() < 960) {
        $(".sidebar").addClass('hidden');
        $("main").addClass('submenu_hidden');
    }

    else {
        $(".sidebar").removeClass('hidden');
        $("main").removeClass('submenu_hidden');
    }
}

resizeToggle();

// реагує на натискання кнопки меню
$("#sidebarToggle").click(function(){
    toggleHidden();
});

// реагує на зміну розміру екрану
$(window).on('resize', function() {
    resizeToggle();
});