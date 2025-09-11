window.addEventListener('load', function() {
  const hamburger = document.querySelector('.burger-btn');
  hamburger.addEventListener('click', e => {
    hamburger.classList.toggle('opened');
    document.documentElement.classList.toggle('menu-open');
    document.body.classList.toggle('no-scroll');
  })
});