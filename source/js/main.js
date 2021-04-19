'use strict';

(function(){
  const anchors = document.querySelectorAll('a.scroll');
  const pageFooter = document.querySelector('.page-footer');
  const accordionBlocks = document.querySelectorAll('.page-footer__block');
  const popupButton = document.querySelector('.page-header__button');
  const popup = document.querySelector('.popup');
  const popupForm = popup.querySelector('form');
  const popupName = popup.querySelector('#feedback-popup-name');
  const popupPhone = popup.querySelector('#feedback-popup-phone');
  const popupText = popup.querySelector('#feedback-popup-text');
  const popupButtonClose = popup.querySelector('.popup__close');
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  let isStorageSupport = true;

  let storageName = '';
  let storagePhone = '';
  let storageText = '';

  pageFooter.classList.remove('page-footer--nojs');

  try {
    storageName = localStorage.getItem('name');
    storagePhone = localStorage.getItem('phone');
    storageText = localStorage.getItem('text');
  } catch (err) {
    isStorageSupport = false;
  }

  for (let input of phoneInputs) {
    const mask = IMask(input, {
      mask: `+{7}(000)000-00-00`
    })
  };

  const openPopup = (evt) => {
    evt.preventDefault();
    document.body.style.overflowY = 'hidden';
    popup.classList.add('popup--opened');

    if (popupName) {
      popupName.focus();
      popupName.value = storageName;
    }

    if (popupPhone) {
      popupPhone.value = storagePhone;
    }

    if (popupText) {
      popupText.value = storageText;
    }

    popup.addEventListener('click', onPopupClick);
    window.addEventListener('keydown', onEscPress);
    popupForm.addEventListener('submit', setLocalStorageValues);
  };

  const closePopup = function ()  {
    document.body.style.overflowY = 'visible';
    popup.classList.remove('popup--opened');

    popup.removeEventListener('click', onPopupClick);
    window.removeEventListener('keydown', onEscPress);
    popupForm.removeEventListener('submit', setLocalStorageValues)
  };

  const onPopupClick = function (evt) {
    const target = evt.target;
    if (target.classList.contains('popup') || target === popupButtonClose) {
      closePopup();
    }
  };

  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  const setLocalStorageValues = () => {
    if (isStorageSupport) {
      localStorage.setItem('name', popupName.value);
      localStorage.setItem('phone', popupPhone.value);
      localStorage.setItem('text', popupText.value);
    }
  };

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

  const toggleAccordion = (block) => {
    const button = block.querySelector('.accordion');
    const panel = block.querySelector('.page-footer__panel');
    block.classList.toggle('page-footer__block--opened');
    button.classList.toggle('accordion--opened');
    panel.classList.toggle('page-footer__panel--opened');
  }

  const closeAllAccordion = () => {
    accordionBlocks.forEach(block => {
      block.classList.remove('page-footer__block--opened');
      const button = block.querySelector('.accordion');
      const panel = block.querySelector('.page-footer__panel');
      button.classList.remove('accordion--opened');
      panel.classList.remove('page-footer__panel--opened');
    });
  };

  accordionBlocks.forEach(block => {
    block.addEventListener('click', function () {
      if (!block.classList.contains('page-footer__block--opened')) {
        closeAllAccordion();
        toggleAccordion(this);
      } else {
        toggleAccordion(this);
      }
    });
  });

  popupButton.addEventListener('click', openPopup);
})();
