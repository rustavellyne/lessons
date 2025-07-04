function $(selector) {
  return document.querySelector(selector);
}
function ref (value, handler) {
  return new Proxy({ value }, {
    set(target, prop, val) {
      target[prop] = val;
      handler(val);
    }
  });
}
/*
* Задача №2
*    Дано в css/scss: body прозорий
*    При повному завантаженню сторінки додати клас до body який прибирає прозорість.
**/
function stopLoader () {
  const preloader = $('.preloader');
  if (preloader) preloader.classList.add('loaded');

}

function startApp () {
  /*
  * Задача №1
  *    Дано в html: три елементи з класом item.
  *    При кліку на кожен з елементів додати клас active,
  *    при повторному кліку прибрати клас
  **/
  const firstTaskBtns = $('.first-task');
  if (firstTaskBtns) {
    firstTaskBtns.addEventListener('click', event => {
      let target = event.target;
      if (target.classList.contains('first-task__item')) {
        target.classList.toggle('first-task__item--active')
      }
    })
  }

  /*
  * Задача №3
  *    Дано в html: header main footer
  *    При наведенні курсору на header змінювати колір фону у footer.
  *    Коли курсор йде з header повертати початковий фон для footer.
  **/
  const header = $('.header');
  const footer = $('.footer');
  if (header && footer) {
    const initialFooterBGC = footer.style.backgroundColor;
    header.addEventListener('mouseenter', event => {
      const r = event.offsetX % 255
      const g = event.offsetY % 255
      const b = Math.floor(Math.random() * 256);
      footer.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    });
    header.addEventListener('mouseleave', event => {
      footer.style.backgroundColor = initialFooterBGC;
    })
  }

  /*
  * Задача №4
  *    Дано в html: текст, елемент з класом item, текст. Так, що елемент з класом item за межами в'юпотрта.
  *    Створити функцію яка будує інтервал який буде змінювати контент в елементі item виводячи цифру
  *     яка збільшується на одиницю: 1 2 3 ... і т.д.
  *    Затримка між зміною числа, та до якого числа має працювати інтервал має задаватись в дата атрибутах елемента item.
  *    Функція має запустатить коли ми доскролюємо до елементу item (його видно), і не запускатись повторно.
  * */
  function useCounter(elem) {
    const counterLimit = Number(elem.dataset.counterMax) || 5;
    const interval = Number(elem.dataset.counterInterval) || 1;
    const counter = ref(0, (value) => elem.textContent = `Counter: ${value}`);
    const hasReachedLimit = () => counter.value >= counterLimit;
    return { hasReachedLimit, interval, counter };
  }
  const counterElement = $('.fourth-task__item');
  if (counterElement) {
    const { counter, interval, hasReachedLimit } = useCounter(counterElement);
    const runCounter = () => {
      const intervalId = setInterval(() => {
        if (hasReachedLimit()) {
          return clearInterval(intervalId);
        }
        counter.value++;
      }, interval * 500)
      return intervalId;
    }
    let intervalId;
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !intervalId) {
          intervalId = runCounter();
        }
        if (intervalId && !entry.isIntersecting) {
          clearInterval(intervalId)
          intervalId = null;
        }
      })
    }, {
      root: $('.fourth-task'),
      threshold: 1.0,
    })
    counterObserver.observe(counterElement)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    stopLoader();
    startApp();
  }, 1000)
});