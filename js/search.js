// Список шляхів до сторінок
var pagePaths = [];

// Отримання елементу ul з ідентифікатором nav_accordion
var navAccordion = document.getElementById('nav_accordion');

// Перегляд кожного підпункту меню з класом nav-link
var submenuItems = navAccordion.querySelectorAll('.submenu a.nav-link');
submenuItems.forEach(function(submenuItem) {
  var pagePath = submenuItem.getAttribute('href');
  pagePaths.push(pagePath);
});

// Зберігання посилань на сторінки з ключовим словом
var pageLinks = [];
  
// Функція для завантаження сторінки і пошуку ключового слова
function searchKeywordInPage(pagePath) {
  return fetch(pagePath)
    .then(function(response) {
      if (response.ok) {
        return response.text();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(pageContent) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(pageContent, 'text/html');
      var mainContent = doc.querySelector('main').textContent;
      var icon = doc.querySelector('link[rel="icon"]');
      if (mainContent.toLowerCase().includes(inputValue.toLowerCase().trim())) {
        pageLinks.push({ title: doc.title, link: pagePath, icon: icon ? icon.href : '' });
      }
    })
    .catch(function(error) {
      console.log('Error loading page:', error);
    });
}


// Отримання посилання на форму, поле пошуку та меню сторінок
var searchForm = document.getElementById('search-form');
var searchInput = document.getElementById('search-input');
var searchMenu = document.getElementById('search-menu');


var inputValue = ''; // Змінна для збереження введеного значення у полі пошуку
var searchTimeout; // Змінна для збереження ідентифікатора таймера

// Додавання обробника події до форми
searchInput.addEventListener('input', function(event) {
  event.preventDefault(); // Зупинка перезавантаження сторінки

  clearTimeout(searchTimeout); // Скасувати попередній таймер, якщо він існує

  inputValue = searchInput.value; // Оновити значення змінної inputValue

  if (!inputValue.trim()) {
    // Якщо запит порожній, очистити список знайдених результатів та вийти з функції
    searchMenu.innerHTML = '';
    return;
  }

  searchTimeout = setTimeout(function() {
    pageLinks = []; // Очищення списку посилань перед новим пошуком

    // Пошук ключового слова і збереження посилань на сторінки
    var promises = pagePaths.map(function(pagePath) {
      return searchKeywordInPage(pagePath);
    });

    Promise.all(promises)
      .then(function() {
        var searchMenu = document.getElementById('search-menu');
        searchMenu.innerHTML = ''; // Очистити попередні результати пошуку
        
        var ul = document.createElement('ul');
        ul.classList.add('list-group');

        if (pageLinks.length > 0) {

          pageLinks.forEach(function(result) {
            var li = document.createElement('li');
            li.classList.add('list-group-item', 'list-group-item-action');

            var link = document.createElement('a');
            link.textContent = result.title;
            link.href = result.link;
          
            var icon = document.createElement('img');
            icon.src = result.icon;
          
            li.addEventListener('click', function() {
              window.location.href = result.link;
            });

            li.appendChild(icon);
            li.appendChild(link);
            ul.appendChild(li);
          });
          
        } else {
          var li = document.createElement('li');
          li.classList.add('list-group-item', 'disabled');
          li.textContent = 'Нічого не знайдено.';
          ul.appendChild(li);
        }

        searchMenu.appendChild(ul);
      })
      .catch(function(error) {
        console.log('Помилка при завантаженні сторінок:', error);
      });
  }, 200); // Запустити запит на пошук після паузи в 150 мілісекунд без введення

  searchInput.value = inputValue; // Встановлення введеного значення у полі пошуку після оновлення списку
});


// Додавання обробника події до документу
document.addEventListener('click', function(event) {
  // Перевірка, чи елемент, на який було натиснуто, знаходиться в межах меню або пошуку
  if (!searchForm.contains(event.target) && !searchMenu.contains(event.target)) {
    // Сховати меню, якщо було натиснуто поза ним
    searchMenu.style.display = 'none';
  } else {
    // Відновлення видимості меню
   searchMenu.style.display = 'block';
  }
});