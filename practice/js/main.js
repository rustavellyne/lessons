window.addEventListener('load', function() {
  filtersFeature()
  initSlider();
  initRangeSliders();
  const hamburger = document.querySelector('.burger-btn');
  hamburger.addEventListener('click', e => {
    hamburger.classList.toggle('opened');
    document.documentElement.classList.toggle('menu-open');
    document.body.classList.toggle('no-scroll');
  })
});

function initSlider() {
  const sliderEl = document.querySelector('.testimonials-slider');
  if (sliderEl) {
    const swiper = new Swiper('.testimonials-slider', {
      loop: true,

      navigation: {
        nextEl: '.testimonials-button__next',
        prevEl: '.testimonials-button__prev',
      },
      breakpoints: {
        320: {
          spaceBetween: 10,
          slidesPerView: 1.1,
        },
        640: {
          slidesPerView: 1.5,
          spaceBetween: 14,
        },
        768: {
          slidesPerView: 2.1,
          spaceBetween: 18,
        },
        924: {
          slidesPerView: 2.5,
          spaceBetween: 20,
        },
        1150: {
          slidesPerView: 3,
          spaceBetween: 24,
        }
      },
    });
  }
}

function filtersFeature () {
  const btn = document.querySelector('.filters-btn');
  const catalogGrid = document.querySelector('.catalog__grid');
  if (btn) {
    btn.addEventListener('click', () => {
      catalogGrid.classList.toggle('filter-opened')
    })
  }
}

function initRangeSliders() {
  const priceSlider = document.querySelector('.range-input');
  const priceFilterLabel = document.querySelector('.price-filter__label span');

  if (priceSlider) {
    const slider = rangeSlider(priceSlider, {
      value: [150, 500],
      min: 0,
      max: 1000,
      onInput (values) {
        const [min, max] = values
        console.log(min, max)
        priceFilterLabel.innerText = `${min} - ${max}`
      },
    });
  }
}