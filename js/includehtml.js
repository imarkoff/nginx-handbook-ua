$(function() {
  $("#sidebar").load("/elements/sidebar.html", function() {
   $.getScript("/js/activeSidebar.js");
   $.getScript("/js/sidebar.js");
   $.getScript("/js/hamburger.js");
  });
});

$(function() {
  $("#navbar").load("/elements/navbar.html", function() {
    $.getScript("/js/search.js");
  });
});

$(function() {
  $("#footernav").load("/elements/footernav.html", function() {
    $.getScript("/js/footernav.js");
  });
});