window.addEventListener('load', function() {
  filtersFeature()
  initSlider();
  initRangeSliders();
  initProductSlider();
  initQtyInput();
  initTabs();
  initParallax();
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

function initProductSlider() {
  const navThumbsEl = document.querySelector('.nav-gallery__swiper');
  const mainGalleryEl = document.querySelector('.main-gallery');
  if (navThumbsEl && mainGalleryEl) {
    const nav = new Swiper('.nav-gallery__swiper', {
      loop: true,
      spaceBetween: 12,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesProgress: true, // важливо для синхронізації
      watchSlidesVisibility: true,
      navigation: {
        nextEl: '.nav-gallery__btn--next',
        prevEl: '.nav-gallery__btn--prev',
      },
      breakpoints: {
        480: {
          direction: "vertical",
          slidesPerView: 4,
        },
      }
    });
    const main = new Swiper('.main-gallery', {
      loop: true,
      zoom: {
        enable: true,
        panOnMouseMove: true,
      },
      spaceBetween: 0,
      speed: 300,
      centeredSlides: true,
      slidesPerView: 1,
      effect: "fade",
      thumbs: {
        swiper: nav,
      },
    });
  }
}

function initQtyInput () {
  document.addEventListener('click', (e) => {
    const btn = e.target;
    if (!btn.matches('.qty-input__btn')) return;
    const qtyBlock = btn.closest('.qty-input');
    const qtyInput = qtyBlock.querySelector('.qty-input__input');
    const decr = qtyBlock.querySelector('.qty-input__btn--decrement');
    const incr = qtyBlock.querySelector('.qty-input__btn--increment');
    if (!qtyInput) return;
    const currentValue = parseInt(qtyInput.value);
    const max = parseInt(qtyInput.max) || 999;
    const min = parseInt(qtyInput.min) || 1;

    if (btn.matches('.qty-input__btn--decrement')) {
      qtyInput.value = Math.max(min, currentValue - 1);
    }

    if (btn.matches('.qty-input__btn--increment')) {
      qtyInput.value = Math.min(max, currentValue + 1);
    }
    decr.disabled = qtyInput.value <= min;
    incr.disabled = qtyInput.value >= max;
  });
  document.addEventListener('input', (e) => {
    const input = e.target;
    if (!input.matches('.qty-input__input')) return;
    const min = parseInt(input.min) || 1;
    const max = parseInt(input.max) || 999;
    let currentValue = parseInt(input.value) || min;
    if (currentValue < min) currentValue = min;
    if (currentValue > max) currentValue = max;

    input.value = currentValue;
  });
}

function initTabs () {
  function showTab(btn) {
    const btnActiveClass = 'tabs-nav__button--active';
    const contentActiveClass = 'content-tabs__item--active';
    const tabContainer = btn.closest('.tabs');
    if (!tabContainer) return;
    const target = btn.dataset.tabTarget;
    // 1. hide active buttons - remove tabs-nav__button--active
    tabContainer.querySelectorAll(`.${btnActiveClass}`)
      .forEach(el => el.classList.remove(btnActiveClass));
    // 2. hide active tabs - remove content-tabs__item--active
    tabContainer.querySelectorAll(`.${contentActiveClass}`)
      .forEach(el => el.classList.remove(contentActiveClass));
    // 3. show active buttons - tabs-nav__button--active
    btn.classList.add(btnActiveClass);
    // 4. show active tabs - by target  add class content-tabs__item--active
    const targetContent = tabContainer.querySelector(`[data-tab-content="${target}"]`);
    targetContent.classList.add(contentActiveClass);
  };

  document.addEventListener('click', (e) => {
    const tabBtn = e.target;
    if (tabBtn.hasAttribute('data-tab-target')) {
      showTab(tabBtn)
    }
  })
}

function initParallax () {
  document.addEventListener('scroll', () => {
    const activeParallaxItems = document.querySelectorAll('[data-paralax="active"]');
    if (activeParallaxItems.length) {
      activeParallaxItems.forEach(block => {
        const bgItem = block.querySelector('[data-paralax-item]');
        if (!bgItem) return;
        const viewPortHeight = window.innerHeight;
        const blockHeight = block.offsetHeight;
        const bgItemHeight = bgItem.offsetHeight;
        const scrollHeight = viewPortHeight + blockHeight;
        const { bottom: blockBottom} = block.getBoundingClientRect();
        const percentage = blockBottom / scrollHeight * 100;
        const maxShift = (blockHeight - bgItemHeight) / bgItemHeight * 100;
        const scale = (percentage - 50) / 50;
        const diff = maxShift * scale;
        bgItem.style.cssText = `translate: 0 ${diff}%`;
      })
    }
  });



  const parallaxItems = document.querySelectorAll('[data-paralax]');
  const options = {
    rootMargin: '0px',
    scrollMargin: '0px',
    threshold: 0,
  };
  const callback = (entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (el){
        el.dataset.paralax = entry.isIntersecting ? 'active' : '';
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  parallaxItems.forEach(elem => observer.observe(elem));
}