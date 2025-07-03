function initializeApp () {
  /*
  * Задача №1
  *    Дано в html: три елементи з класом item.
  *    При кліку на кожен з елементів додати клас active,
  *    при повторному кліку прибрати клас
  **/
  const firstTaskBtns = document.querySelector('.first-task');
  firstTaskBtns.addEventListener('click', event => {
    let target = event.target;
    if (target.classList.contains('first-task__item')) {
      target.classList.toggle('first-task__item--active')
    }
  })

/*
* Задача №2
*    Дано в css/scss: body прозорий
*    При повному завантаженню сторінки додати клас до body який прибирає прозорість.
**/


/*
* Задача №3
*    Дано в html: header main footer
*    При наведенні курсору на header змінювати колір фону у footer.
*    Коли курсор йде з header повертати початковий фон для footer.
**/

/*
* Задача №4
*    Дано в html: текст, елемент з класом item, текст. Так, що елемент з класом item за межами в'юпотрта.
*    Створити функцію яка будує інтервал який буде змінювати контент в елементі item виводячи цифру
*     яка збільшується на одиницю: 1 2 3 ... і т.д.
*    Затримка між зміною числа, та до якого числа має працювати інтервал має задаватись в дата атрибутах елемента item.
*    Функція має запустатить коли ми доскролюємо до елементу item (його видно), і не запускатись повторно.
* */

}
document.addEventListener('DOMContentLoaded', initializeApp);