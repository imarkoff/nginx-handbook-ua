function toggleHidden() {
    $(".sidebar").toggleClass('hidden');
    $("main").toggleClass('submenu_hidden');
}

function resizeToggle() {
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

$("#sidebarToggle").click(function(){
    toggleHidden();
});

$(window).on('resize', function() {
    resizeToggle();
});