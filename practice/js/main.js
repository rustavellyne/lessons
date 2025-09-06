window.addEventListener('load', function() {
  const hamburger = document.querySelector('.burger-btn');
  hamburger.addEventListener('click', e => e.target.classList.toggle('opened'))
});