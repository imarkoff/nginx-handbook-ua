/* Підключає html елементи на сторінку, де це потрібно, 
  а потім скрипти, які використовують ці елементи */

// сайдбар
$(function() {
  $("#sidebar").load("/elements/sidebar.html", function() {
   $.getScript("/js/activeSidebar.js");
   $.getScript("/js/sidebar.js");
   $.getScript("/js/hamburger.js");
  });
});

// верхня панель
$(function() {
  $("#navbar").load("/elements/navbar.html", function() {
    $.getScript("/js/search.js");
  });
});

// кнопки назад / далі
$(function() {
  $("#footernav").load("/elements/footernav.html", function() {
    $.getScript("/js/footernav.js");
  });
});