/*
 * Задача №1
 * Отримати в константу елемент <body>
*/
const body = document.body

/*
 * Задача №2
 * Написати функцію, яка додає в <body> список UL
 * з певною кількістю LI (кількість має передаватись як параметр функції, також мати значення за замовченням)
*/
const createAndAppendList = ({ parent, qty = 3, type = 'ul', where = 'beforeend' }) => {
  const list = document.createElement(type);
  for (let i = 1; i <= qty; i++) {
    const li = document.createElement('li');
    const text = document.createTextNode(`Пункт #${i}`);
    li.append(text);
    list.append(li)
  }
  parent.insertAdjacentElement(where, list)
}
createAndAppendList({ parent: body, type: 'ol', where: 'afterbegin' });

/*
 * Задача №3
 * Додати до елементу <body> класс loaded.
 * Потім перевірити чи є клас loaded у елемента <body>
 * і, якщо є, додати стиль кольору тексту зедлений.
*/
body.classList.add('loaded');
body.classList.contains('loaded') && (body.style.color = 'green');

/*
 * Задача №4
 * Дано в html: три елементи з класом item.
 * Треба отримати ці елементи в константу, кожному додати клас active,
 * та перезаписати контент всередені кожного елемента на "Елемент №(тут порядковий номер елементу починаючи з 1)".
*/
const items = document.querySelectorAll('.item');
for (const [index, el] of items.entries()) {
  el.classList.add('active');
  el.textContent = `Елемент #${index + 1}`;
}

/*
 * Задача №5
 * Дано в html: текст, далі кнопка з класом button.
 * Треба прокрутити скрол сторінки до кнопки
*/
const btn = document.querySelector('.button');
if (btn) {
  btn.scrollIntoView({
    block: 'center',
    inline: 'center',
    behavior: 'smooth'
  });
}

/*
 * Задача №6
 * Дано в html: посилання з класом link
 * Треба додати до посилання дата атрибут зі значенням 100
 * Потім отримати значення атрибута, та, якщо значення менше ніж 200
 * пофарбувати колір тексту посилання в червоний
*/
const link = document.querySelector('.link');
if (link) {
  let score = parseFloat(link.dataset.score) || 0;
  if (score < 200) {
    link.style.color = 'red';
  }
}
