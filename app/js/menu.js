'use strict';
(function () {
  var HEADER_HEIGHT_COOFICIENT = 0.14;

  var mainNav = document.querySelector('.main-nav');
  var buns = document.querySelector('.main-nav__buttons');
  var toggle = document.querySelector('.main-nav__toggle-inner');

  mainNav.classList.remove('main-nav--no-js');

  function toggleMenu() {
    buns.addEventListener('click', function (evt) {
      evt.preventDefault();

      if (mainNav.classList.contains('main-nav--closed')) {
        mainNav.classList.remove('main-nav--closed');
        mainNav.classList.add('main-nav--opened');
        toggle.classList.add('main-nav__toggle--show');
        $('.main-nav__list').slideDown();
      } else {
        mainNav.classList.add('main-nav--closed');
        mainNav.classList.remove('main-nav--opened');
        toggle.classList.remove('main-nav__toggle--show');
        $('.main-nav__list').slideUp();
      }
    });

    var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
    var focusableElements = mainNav.querySelectorAll(focusableElementsString);
    focusableElements = Array.prototype.slice.call(focusableElements);
    var firstTabStop = focusableElements[0];
    var lastTabStop = focusableElements[focusableElements.length - 1];
    firstTabStop.focus();
    mainNav.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 9) {
        if (evt.shiftKey) {
          if (document.activeElement === firstTabStop) {
            evt.preventDefault();
            lastTabStop.focus();
          }
        } else {
          if (document.activeElement === lastTabStop) {
            evt.preventDefault();
            firstTabStop.focus();
          }
        }
      }
    });
    
    mainNav.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 27) {
        mainNav.classList.add('main-nav--closed');
        mainNav.classList.remove('main-nav--opened');
        toggle.classList.remove('main-nav__toggle--show');
      }
    });
  }

  $(document).ready(function () {
    var headerHeight = $('.header').outerHeight();
    $('.main-nav__link').click(function (evt) {
      evt.preventDefault();
      var linkHref = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(linkHref).offset().top - HEADER_HEIGHT_COOFICIENT * headerHeight
      }, 1000);
      $('.main-nav__list').slideUp();
      toggle.classList.remove('main-nav__toggle--show');
      mainNav.classList.add('main-nav--closed');
    })
  });
  toggleMenu();
})()