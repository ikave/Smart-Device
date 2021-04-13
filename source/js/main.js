'use strict';

(function(){
  const anchors = document.querySelectorAll('a.scroll');

  for (let anchor of anchors) {
    anchor.addEventListener('click', (evt) => {
      evt.preventDefault()
      const blockID = anchor.getAttribute('href');
      document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  };

  const accordionButtons = document.querySelectorAll('.accordion');

  accordionButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const panel = this.nextElementSibling;
      if (this.classList.contains('accordion--opened')) {
        this.classList.remove('accordion--opened');
        this.classList.add('accordion--closed');
        panel.classList.remove('page-footer__panel--opened');
      } else {
        this.classList.remove('accordion--closed');
        this.classList.add('accordion--opened');
        panel.classList.add('page-footer__panel--opened');
      }
    });
  });
})();
