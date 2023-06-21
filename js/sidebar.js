/* Розкриває / приховує підменю; Додає індекси до посилань */

// вибирає весі розкриваючі списки
document.querySelectorAll('.sidebar .nav-link').forEach(function(element) {

  // розкриває / приховує підменю при натисканні на заголовок підменю
  element.addEventListener('click', function (e) {

    // Знаходить наступний елемент після поточного елемента
    let nextEl = element.nextElementSibling;
    // Знаходить батьківський елемент поточного елемента
    let parentEl  = element.parentElement;	

    if(nextEl) {
      e.preventDefault();	// Забороняє перехід за посиланням при кліку
      
      let mycollapse = new bootstrap.Collapse(nextEl);
      
      if(nextEl.classList.contains('show')){
        mycollapse.hide(); // Ховає розкрите підменю, якщо воно вже відкрите
      } else {
        mycollapse.show(); // Відкриває розкрите підменю, якщо воно закрите
          
        // Знаходить всі інші розкриті підменю в батьківському елементі
        var opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
        
        // Якщо існує відкрите підменю, закриває всі інші підменю
        if(opened_submenu){
          new bootstrap.Collapse(opened_submenu);
        }
      }
    }
  });
});


// Всі посилання в меню
const menuLinks = $("#nav_accordion a.nav-link[href]")

// Нумерація до кожного посилання
menuLinks.each(function(index, link) {
  // якщо елемент у списку має посилання
  if (link.hasAttribute("href")) {
    link.setAttribute("index", index); // Додається номер до тексту посилання
  }
}); 
