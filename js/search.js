/* Пошук ключового виразу по сторінках */

// Список шляхів до сторінок
let pagePaths = [];

// переглядає наявні посилання в сайдбарі (тільки ті, що в підменю), та додає їх у список 
const submenuItems = document.querySelectorAll('#nav_accordion .submenu a.nav-link');
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
      // чи вдалося отримати доступ до сторінки
      if (response.ok) {
        return response.text();
      }
      throw new Error('Network response was not ok.');
    })
    .then(function(pageContent) {
      var parser = new DOMParser();

      var doc = parser.parseFromString(pageContent, 'text/html'); // парсить цілу сторінку

      var mainContent = doc.querySelector('main').textContent; // обмежує пошук по блоку з потрібним вмістом
      var icon = doc.querySelector('link[rel="icon"]'); // зберігає іконку сайту

      // якщо ключовий вираз у сторінці знайдено (не дивлячись на регістр)
      // .trim - прибирає лишні пропускі на початку та в кінці ключового виразу
      if (mainContent.toLowerCase().includes(inputValue.toLowerCase().trim())) {
        // додати елемент в список заголовок, посилання, іконку (якщо вона існує), яке потім буде виводитись в пошуку
        pageLinks.push({ title: doc.title, link: pagePath, icon: icon ? icon.href : '' });
      }
    })
    .catch(function(error) {
      console.log('Error loading page:', error);
    });
}


// форма пошуку, поле пошуку та меню сторінок
var searchForm = document.getElementById('search-form');
var searchInput = document.getElementById('search-input');
var searchMenu = document.getElementById('search-menu');


var inputValue = ''; // зберігає введене значення, що у полі пошуку
var searchTimeout; // зберігає ідентифікатор таймера

// Додавання обробника події до форми
searchInput.addEventListener('input', function(event) {
  event.preventDefault(); // Зупинка перезавантаження сторінки

  clearTimeout(searchTimeout); // Скасувати попередній таймер, якщо він існує

  inputValue = searchInput.value; // Оновити значення змінної inputValue

  // якщо запит порожній
  if (!inputValue.trim()) {
    // очистити список знайдених результатів та вийти з функції
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
        
        // створити нови список
        var ul = document.createElement('ul');
        ul.classList.add('list-group');

        // якщо ключове слово десь було знайдено
        if (pageLinks.length > 0) {

          // створити блок з посиланням на сторінку
          pageLinks.forEach(function(result) {
            var li = document.createElement('li');
            li.classList.add('list-group-item', 'list-group-item-action');

            // заголовок сторінки, та саме посиланя
            var link = document.createElement('a');
            link.textContent = result.title;
            link.href = result.link;
          
            // іконка сторінки
            var icon = document.createElement('img');
            icon.src = result.icon;
          
            // посилання 
            li.addEventListener('click', function() {
              window.location.href = result.link;
            });

            li.appendChild(icon);
            li.appendChild(link);
            ul.appendChild(li);
          });
          
        } else {
          // створити єдиний елемент в списку, який вказує юзеру, що такого запиту ніде не знайдено
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
  }, 200); // Запустити запит на пошук після паузи в 200 мілісекунд без введення (для уникнення повторення сторінок в пошуку)

  searchInput.value = inputValue; // Встановлення введеного значення у полі пошуку після оновлення списку
});


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